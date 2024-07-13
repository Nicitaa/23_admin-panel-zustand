import axios, { AxiosError } from "axios"
import { ReactNode } from "react"

import { TAPIAuthRecover } from "@/api/auth/recover/route"
import useUserStore from "@/store/user/userStore"
import { Timer } from "../AuthModal/components"
import { Button } from "@/components/ui"

export async function resetPassword(password: string, displayResponseMessage: (message: ReactNode) => void) {
  const userStore = useUserStore.getState()

  try {
    // IMP - check in open and closed databases for this password (enterprice)
    const email = localStorage.getItem("email")
    const parsedEmail = JSON.parse(email ?? "")

    if (parsedEmail.expires > new Date().getTime()) {
      const response = await axios.post("api/auth/reset", {
        email: parsedEmail.value,
        password: password,
      } as TAPIAuthRecover)

      userStore.setUser(
        response.data.user.id,
        response.data.user.user_metadata.username || response.data.user.user_metadata.name,
        response.data.user.email,
        response.data.user.user_metadata.avatar_url ||
          response.data.user?.identities![0]?.identity_data?.avatar_url ||
          response.data.user?.identities![1]?.identity_data?.avatar_url ||
          "",
      )

      localStorage.removeItem("email") // Remove email from localstorage
      displayResponseMessage(
        <div className="text-success flex flex-col justify-center items-center">
          Your password changed - Delete email
          <Timer label="I close this window in" seconds={5} action={() => window.close()} />
        </div>,
      )
    } else {
      localStorage.removeItem("email") // Remove expired data
      throw new Error("You session has expired - recover password quicker next time")
    }
  } catch (error) {
    //This is required to show custom error message (check api/dev_readme.md)
    if (error instanceof AxiosError) {
      displayResponseMessage(<p className="text-danger">{error.response?.data.error}</p>)
    } else if (error instanceof Error) {
      displayResponseMessage(<p className="text-danger">{error.message}</p>)
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
