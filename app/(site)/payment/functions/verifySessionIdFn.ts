import { Dispatch, SetStateAction } from "react"
import axios, { AxiosError } from "axios"

import { TAPIVerifyPayment, TAPIVerifyPaymentResponse } from "@/api/verify-payment/route"
import useToast from "@/store/ui/useToast"
import { logFn } from "@/utils/logFn"

export async function verifySessionIdFn(
  setIsValidSessionId: Dispatch<SetStateAction<boolean>>,
  session_id: string | null,
  setCurrentStep: Dispatch<SetStateAction<number>>,
) {
  const toast = useToast.getState()

  if (session_id) {
    try {
      const response: TAPIVerifyPaymentResponse = await axios.post(`/api/verify-payment`, {
        session_id,
      } as TAPIVerifyPayment)
      setIsValidSessionId(response.data.valid)
      logFn("sessionId is valid - set step 6")
      setCurrentStep(6)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.includes("No such checkout.session")) {
        toast.show(
          "error",
          "Error verifying payment",
          "Please don't enter random session id trying to hack system - PAY FOR YOUR ORDER",
        )
      } else if (error instanceof AxiosError) {
        toast.show("error", "Error verifying payment", error.response?.data)
      }
    }
  }
}
