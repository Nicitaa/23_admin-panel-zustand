"use client"

import { useEffect } from "react"

import useDarkMode from "@/store/ui/darkModeStore"
import useToast from "@/store/ui/useToast"
import { Toast } from "./ui/Toast"
import { AnimatePresence } from "framer-motion"
import { getCookie, setCookie } from "@/utils/helpersCSR"

export default function Layout({ children }: { children: React.ReactNode }) {
  const darkMode = useDarkMode()
  const toast = useToast()

  //children is a server component
  //more info - https://www.youtube.com/watch?v=9YuHTGAAyu0
  useEffect(() => {
    const htmlElement = document.documentElement
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set initial mode based on system preference
    htmlElement.classList.toggle("light", !prefersDarkMode)
    htmlElement.classList.toggle("dark", prefersDarkMode)

    // Update mode when darkMode state changes
    htmlElement.classList.toggle("light", !darkMode.isDarkMode)
    htmlElement.classList.toggle("dark", darkMode.isDarkMode)

    // set anonymousId cookie to getTicketId
    if (!getCookie("anonymousId")) {
      setCookie("anonymousId", `anonymousId_${crypto.randomUUID()}`)
    }
    if (!getCookie("ticketId")) {
      setCookie("ticketId", crypto.randomUUID())
    }
  }, [darkMode.isDarkMode])

  return (
    <div
      className="flex flex-col w-full overflow-hidden min-h-screen
      bg-background text-title
      transition-colors duration-300">
      {children}
      <AnimatePresence>{toast.isOpen && <Toast />}</AnimatePresence>
    </div>
  )
}
