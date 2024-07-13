import Image from "next/image"
import { twMerge } from "tailwind-merge"

import useDarkMode from "@/store/ui/darkModeStore"

interface AuthLogoProps {
  isAuthCompleted: boolean
  isRecoverCompleted: boolean
}

export function AuthLogo({ isAuthCompleted, isRecoverCompleted }: AuthLogoProps) {
  const darkMode = useDarkMode()
  return (
    <Image
      className={twMerge(`${isAuthCompleted || isRecoverCompleted ? "w-[48px] h-[48px]" : "w-[57px] h-[40px]"}`)}
      src={
        isAuthCompleted
          ? darkMode.isDarkMode
            ? "/authentication-completed-dark.png"
            : "/authentication-completed-light.png"
          : isRecoverCompleted
            ? darkMode.isDarkMode
              ? "/recover-completed-dark.png"
              : "/recover-completed-light.png"
            : darkMode.isDarkMode
              ? "/logo-dark.png"
              : "/logo-light.png"
      }
      alt="logo"
      width={64}
      height={64}
    />
  )
}
