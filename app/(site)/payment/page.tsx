"use client"

import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import { useNoProductsRedirect } from "./hooks/useNoProductsRedirect"
import { Timer } from "@/(auth)/AuthModal/components/Timer"
import { usePaymentSteps } from "./hooks/usePaymentSteps"

export default function Payment() {
  const router = useRouter()
  const status = useSearchParams()?.get("status")
  const session_id = useSearchParams()?.get("session_id")
  const { currentStep, cartStore } = usePaymentSteps(status, session_id)

  useNoProductsRedirect()

  if (!cartStore.products || Object.keys(cartStore.products).length === 0) {
    return null
  }

  return (
    <section
      className="absolute left-[50%] top-[50%] translate-x-[-50%]
     translate-y-[-100%] tablet:translate-y-[-75%] laptop:translate-y-[-50%] 
    flex flex-col text-center justify-center items-center w-full">
      {status === "success" ? (
        <>
          <Image
            src="/success-checkmark.gif"
            alt="Success Checkmark"
            width={256}
            height={256}
            style={{ width: "auto" }}
            priority
          />
          <h1 className="text-2xl mb-2">Your payment is successful</h1>
          <p>Check sent to your email 📨</p>
          <p className="flex flex-row">
            Redirecting to home page in <Timer seconds={4} action={() => router.replace("/")} />
          </p>
        </>
      ) : (
        <>
          <Image
            src="/error-checkmark.gif"
            alt="Error Checkmark"
            width={256}
            height={256}
            style={{ width: "auto" }}
            priority
          />
          <h1 className="text-2xl mb-2">Your payment was canceled</h1>
          <p className="flex flex-row">
            Redirecting to home page in <Timer seconds={4} action={() => router.replace("/")} />
          </p>
        </>
      )}
    </section>
  )
}
