import { useEffect, useRef, useState } from "react"

export const useIsActiveTab = () => {
  const isActiveRef = useRef<boolean>(false)
  const [trigger, setTrigger] = useState(false) // Used only to trigger re-renders

  // Function to update the isActive state
  const updateIsActiveState = (isActive: boolean) => {
    if (isActiveRef.current !== isActive) {
      isActiveRef.current = isActive
      setTrigger(prev => !prev) // Toggle the trigger to force a re-render
    }
  }

  useEffect(() => {
    if (typeof document === "undefined") return

    // Initial state check
    isActiveRef.current = document.visibilityState === "visible" && document.hasFocus()

    // Handlers that update the active state
    const handleVisibilityChange = () => {
      updateIsActiveState(document.visibilityState === "visible" && document.hasFocus())
    }
    const handleFocus = () => updateIsActiveState(true)
    const handleBlur = () => updateIsActiveState(false)

    // Register event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("blur", handleBlur)

    // Initial check to update state based on the current tab status
    handleVisibilityChange()

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("blur", handleBlur)
    }
  }, [])

  return { isActiveTab: isActiveRef.current }
}
