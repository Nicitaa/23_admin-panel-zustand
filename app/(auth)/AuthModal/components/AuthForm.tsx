"use client"

import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"
import { twMerge } from "tailwind-merge"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

import { FormInput } from "@/components/ui/Inputs/Validation"
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai"
import { AuthFormData } from "../AuthModal"
import { Button, Checkbox } from "@/components/ui"
import { ContinueWithButton } from "./ContinueWithButton"
import { AuthContinueWith } from "./AuthContinueWith"

interface AuthFormProps {
  handleSubmit: UseFormHandleSubmit<AuthFormData, undefined>
  onSubmit: (data: AuthFormData) => Promise<void>
  queryParams: "login" | "register" | "recover" | "resetPassword"
  register: UseFormRegister<AuthFormData>
  errors: FieldErrors<AuthFormData>
  isSubmitting: boolean
  isEmailSent: boolean
  responseMessage: ReactNode
}

export function AuthForm({
  handleSubmit,
  onSubmit,
  queryParams,
  register,
  errors,
  isSubmitting,
  isEmailSent,
  responseMessage,
}: AuthFormProps) {
  const pathname = usePathname()

  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      <form className="relative max-w-[450px] w-[75vw] flex flex-col gap-y-2 mb-4" onSubmit={handleSubmit(onSubmit)}>
        {queryParams !== "resetPassword" && (
          <FormInput
            endIcon={<AiOutlineMail size={24} />}
            register={register}
            errors={errors}
            id="email"
            label="Email"
            placeholder="user@big.com"
            disabled={isSubmitting || isEmailSent}
            required
          />
        )}
        {queryParams !== "recover" && (
          <FormInput
            endIcon={<AiOutlineLock size={24} />}
            register={register}
            errors={errors}
            id="password"
            label="Password"
            type="password"
            placeholder={
              queryParams === "register" || queryParams === "resetPassword" ? "NeW-RaNd0m_PasWorD" : "RaNd0m_PasWorD"
            }
            disabled={isSubmitting || isEmailSent}
            required
          />
        )}
        {queryParams === "register" && (
          <FormInput
            endIcon={<AiOutlineUser size={24} />}
            register={register}
            errors={errors}
            id="username"
            label="Username"
            placeholder="HANTARESpeek"
            disabled={isSubmitting || isEmailSent}
            required
          />
        )}

        {/* REMBMBER-ME / FORGOT-PASSWORD */}
        <div className="flex justify-between mb-2">
          <div className={twMerge(`invisible`, queryParams === "login" && "visible")}>
            {/* 'Remember me' now checkbox do nothing - expected !isChecked 1m jwt - isChecked 3m jwt */}
            <Checkbox
              className="bg-background cursor-pointer"
              label="Remember me"
              onChange={() => setIsChecked(isChecked => !isChecked)}
              disabled={isSubmitting}
              isChecked={isChecked}
            />
          </div>
          {queryParams !== "register" && (
            <Button
              href={`${pathname}?modal=AuthModal&variant=${queryParams === "login" ? "recover" : "login"}`}
              variant="link">
              {queryParams === "login" ? "Forgot password?" : "Remember password?"}
            </Button>
          )}
        </div>

        {/* LOGIN/REGISTER BUTTON */}
        <Button variant="default-outline" disabled={isSubmitting || isEmailSent}>
          {queryParams === "login"
            ? "Login"
            : queryParams === "register"
              ? "Register"
              : queryParams === "recover" || queryParams === "resetPassword"
                ? "Reset password"
                : "Send email"}
        </Button>
        <div className="flex justify-center text-center">{responseMessage}</div>
      </form>

      {/* CONTINUE WITH (for login and register only) */}
      {(queryParams === "login" || queryParams === "register") && (
        <AuthContinueWith
          isEmailSent={isEmailSent}
          isSubmitting={isSubmitting}
          queryParams={queryParams}
          pathname={pathname}
        />
      )}
    </>
  )
}
