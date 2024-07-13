import { TAPIAuthRegister } from "@/api/auth/register/route"
import axios, { AxiosError } from "axios"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { AuthFormData } from "../AuthModal/AuthModal"
import { UseFormGetValues, UseFormSetFocus } from "react-hook-form"
import { pusherClient } from "@/libs/pusher"
import { Timer } from "../AuthModal/components"
import { Button } from "@/components/ui"
import { resendVerificationEmail } from "./resendVerificationEmail"

export async function signUp(
  username: string,
  email: string,
  password: string,
  isEmailSent: boolean,
  setIsEmailSent: Dispatch<SetStateAction<boolean>>,
  getValues: UseFormGetValues<AuthFormData>,
  setResponseMessage: Dispatch<SetStateAction<ReactNode>>,
  displayResponseMessage: (message: React.ReactNode) => void,
  setFocus: UseFormSetFocus<AuthFormData>,
) {
  try {
    const signUpResponse = await axios
      .post("/api/auth/register", {
        username: username,
        email: email,
        password: password,
      } as TAPIAuthRegister)
      .catch(error => {
        throw error
      })

    setIsEmailSent(true)
    if (getValues("email")) {
      // subscribe pusher to email channel to show message like 'auth completed'
      pusherClient.subscribe(getValues("email"))
    }
    setResponseMessage(<p className="text-success">Check your email</p>)
    setTimeout(() => {
      setResponseMessage(
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p>Don&apos;t revice email?&nbsp;</p>
            <Timer label="resend in" seconds={20}>
              <Button
                type="button"
                variant="link"
                onClick={() => resendVerificationEmail(email, displayResponseMessage, setIsEmailSent, setFocus)}>
                resend
              </Button>
            </Timer>
          </div>
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
        </div>,
      )
    }, 5000)
  } catch (error) {
    if (error instanceof AxiosError) {
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
