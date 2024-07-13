import { Button } from "@/components/ui"
import supabaseClient from "@/libs/supabase/supabaseClient"
import { Dispatch, SetStateAction } from "react"
import { AuthFormData } from "../AuthModal/AuthModal"
import { UseFormSetFocus } from "react-hook-form"

export async function resendVerificationEmail(
  email: string,
  displayResponseMessage: (message: React.ReactNode) => void,
  setIsEmailSent: Dispatch<SetStateAction<boolean>>,
  setFocus: UseFormSetFocus<AuthFormData>,
) {
  try {
    const { error: resendError } = await supabaseClient.auth.resend({
      type: "signup",
      email: email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback/credentials`,
      },
    })
    if (resendError) throw resendError

    displayResponseMessage(
      <div className="flex flex-col">
        <div className="text-success flex flex-row justify-center">
          <p>Email resended -&nbsp;</p>
          <Button
            className="text-brand"
            variant="link"
            type="button"
            onClick={() => {
              setIsEmailSent(false)
              setTimeout(() => {
                setFocus("email")
              }, 50)
            }}>
            change email
          </Button>
        </div>
        <p>If you don&apos;t recieve an email - check &apos;Spam&apos; and &apos;All mail&apos;</p>
      </div>,
    )
  } catch (error) {
    if (error instanceof Error) {
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
