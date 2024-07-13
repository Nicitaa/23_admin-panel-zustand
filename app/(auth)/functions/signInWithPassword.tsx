import axios, { AxiosError } from "axios"
import { UseFormReset } from "react-hook-form"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import supabaseClient from "@/libs/supabase/supabaseClient"

import { TAPIAuthLogin } from "@/api/auth/login/route"
import useUserStore from "@/store/user/userStore"
import { Button } from "@/components/ui"
import { Timer } from "../AuthModal/components"
import { AuthFormData } from "../AuthModal/AuthModal"

export async function signInWithPassword(
  email: string,
  password: string,
  reset: UseFormReset<AuthFormData>,
  router: AppRouterInstance,
  displayResponseMessage: (message: React.ReactNode) => void,
) {
  const userStore = useUserStore.getState()

  try {
    // Check is user with this email doesn't exist and return providers and username
    const response = await axios.post("/api/auth/login", { email: email } as TAPIAuthLogin)
    const { data: user, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    })

    // Check if user with this email already exists (if user first time auth with OAuth)
    // Throw error if user with this email exist with oauth providers (only) - or wrong email/password
    if (signInError) {
      const isCredentialsProvider = response.data.providers?.includes("credentials")
      const isOnlyGoogleProvider =
        Array.isArray(response.data.providers) &&
        response.data.providers.length === 1 &&
        response.data.providers[0] === "google"
      throw new Error(
        isCredentialsProvider
          ? `Wrong email or password`
          : isOnlyGoogleProvider
            ? "You already have account with google"
            : `You already have an account with ${response.data.providers}`,
      )
    }

    // Set user data in localstorage
    if (user.user && response.data.username) {
      userStore.setUser(
        user.user.id,
        response.data.username,
        email,
        user.user.user_metadata.avatar_url ||
          user.user?.identities![0]?.identity_data?.avatar_url ||
          user.user?.identities![1]?.identity_data?.avatar_url,
      )
      reset()
      router.refresh() //refresh to show avatarUrl in navbar

      displayResponseMessage(
        <div className="text-success flex flex-col justify-center items-center">
          You are logged in - you may close this modal
          <Timer label="I close this modal in" seconds={5} action={() => router.replace("/")} />
        </div>,
      )
    } else {
      displayResponseMessage(
        <div className="text-danger flex flex-row">
          <p>No user or username found - contact admin&nbsp;</p>
          <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
            here
          </Button>
        </div>,
      )
      return
    }
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid login credentials") {
      displayResponseMessage(<p className="text-danger">Wrong email or password</p>)
    } else if (error instanceof AxiosError) {
      if (error.response?.data.error === "User exists - check your email\n You might not verified your email") {
        displayResponseMessage(
          <div className="flex flex-col justify-center items-center">
            <p className="text-danger">User exists - check your email</p>
            <p className="text-danger">You might not verified your email</p>
          </div>,
        )
      } else {
        displayResponseMessage(<p className="text-danger">{error.response?.data.error}</p>)
      }
    } else if (error instanceof Error) {
      if (error.message === "You already have account with google") {
        displayResponseMessage(
          <div className="flex flex-col justify-center items-center">
            <p className="text-danger">You already have account with google</p>
            <Button
              variant="link"
              onClick={async () =>
                await supabaseClient.auth.signInWithOAuth({
                  provider: "google",
                  options: { redirectTo: `${location.origin}/auth/callback/oauth?provider=google` },
                })
              }>
              continue with google?
            </Button>
          </div>,
        )
      } else displayResponseMessage(<p className="text-danger">{error.message}</p>)
    } else {
      displayResponseMessage(
        <div className="text-danger flex flex-row">
          <p>An unknown error occurred - contact admin&nbsp;</p>
          <Button className="text-info" href="https://t.me/nicitaacom" variant="link">
            here
          </Button>
        </div>,
      )
    }
  }
}
