import { ReactNode } from "react"
import axios, { AxiosError } from "axios"
import { UseFormGetValues } from "react-hook-form"

import { TAPIAuthRecover } from "@/api/auth/recover/route"
import supabaseClient from "@/libs/supabase/supabaseClient"
import { AuthFormData } from "../AuthModal/AuthModal"
import { Button } from "@/components/ui"
import { getPusherClient } from "@/libs/pusher"

export async function recoverPassword(
  email: string,
  getValues: UseFormGetValues<AuthFormData>,
  displayResponseMessage: (message: ReactNode) => void,
) {
  try {
    const pusherClient = getPusherClient()
    await axios.post("/api/auth/recover", { email: email } as TAPIAuthRecover)
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback/recover`,
    })
    if (error) throw error

    // subscribe pusher to email channel to show message like 'password recovered - stay safe'
    if (getValues("email")) {
      pusherClient.subscribe(getValues("email"))
    }

    // Save email in localstorage to trigger pusher for this channel (api/auth/recover) (expires in 5 min)
    localStorage.setItem("email", JSON.stringify({ value: email, expires: new Date().getTime() + 5 * 60 * 1000 }))

    displayResponseMessage(<p className="text-success">Check your email</p>)
  } catch (error) {
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
