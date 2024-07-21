import Image from "next/image"

import useDarkMode from "@/store/ui/darkModeStore"
import { BackToMainButton } from "./components/BackToMainButton"

export function NoCodeFoundError({ message }: { message?: string }) {
  const { isDarkMode } = useDarkMode()

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div
        className={`w-full h-[35vh] relative ${
          isDarkMode ? "bg-[#0a6624]" : "bg-[#20e959]"
        } flex justify-center items-center`}>
        <Image
          className="w-[200px] laptop:w-[250px] desktop:w-[300px]"
          src={
            isDarkMode
              ? "/errors/no-code-found-to-exchange-cookies-for-session-icon-dark.png"
              : "/errors/no-code-found-to-exchange-cookies-for-session-icon-light.png"
          }
          alt="no-code-found"
          width={300}
          height={226}
        />
      </div>
      <p className="text-danger text-center">{message ? message : "No code found to exchange cookies for session"}</p>
      <p className="text-center">You might pressed &quot;Cancel&quot; button when continue with google</p>
      <p className="text-center">To get support contact us here - {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</p>
      <BackToMainButton />
    </div>
  )
}
