import axios from "axios"
import { Dispatch, SetStateAction } from "react"

import { TAPICustomer, TAPICustomerResponse } from "@/api/customer/route"
import useToast from "@/store/ui/useToast"
import { logFn } from "@/utils/logFn"

export async function getCustomerEmailFn(
  email: string | undefined,
  session_id: string | null,
  setCustomerEmail: Dispatch<SetStateAction<string | null>>,
  setCurrentStep: Dispatch<SetStateAction<number>>,
) {
  const toast = useToast.getState()

  if (email) {
    setCustomerEmail(email)
    logFn("customer email received - set step 3")
    setCurrentStep(3)
  } else {
    try {
      const {
        data: { customerEmail },
      }: TAPICustomerResponse = await axios.post("/api/customer", { session_id } as TAPICustomer)
      if (customerEmail) {
        setCustomerEmail(customerEmail)
      }
      logFn("customer email received - set step 3")
      setCurrentStep(3)
    } catch (error) {
      if (error instanceof Error) {
        toast.show("error", "Error fetching customer", "Please check getCustomerEmailFn - contact support")
      }
    }
  }
}
