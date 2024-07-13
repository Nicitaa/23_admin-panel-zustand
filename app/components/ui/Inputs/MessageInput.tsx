"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

import { sendChatMessageFn } from "@/(site)/functions/sendChatMessageFn"
import { getUserId } from "@/utils/getUserId"

interface MessageInputProps {
  className?: string
}

export function MessageInput({ className }: MessageInputProps) {
  const [value, setValue] = useState("")
  const [height, setHeight] = useState(52) // Initialize with the base height for one line
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const userId = getUserId()

  // shift+enter managed by ChatGPT-4 - copy paste all code to it if issues

  useEffect(() => {
    // Recalculate height every time the value changes
    const lineCount = value.split("\n").length

    setHeight(Math.max(42, 42 + (lineCount - 1) * 24)) // Adjust height based on line count, 24px per line
  }, [value])

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        event.preventDefault() // Prevent default behavior for Shift+Enter

        // Insert newline at the current cursor position
        const cursorPosition = event.currentTarget.selectionStart
        const beforeText = value.slice(0, cursorPosition)
        const afterText = value.slice(cursorPosition)
        const newValue = `${beforeText}\n${afterText}`
        setValue(newValue) // Update value to trigger height recalculation

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursorPosition + 1
            // Adjust scrollTop to ensure the new line and cursor are visible
            ensureCursorVisibility(textareaRef.current)
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight // scroll to bottom
          }
        }, 0)
      } else {
        event.preventDefault() // Prevent default form submission on Enter
        // Trim and check if the message is not just spaces or newlines
        if (value.trim().length > 0) {
          setValue("") // Clear the textarea after sending the message
          setHeight(36) // Reset height to initial value after message is sent
          await sendChatMessageFn(value.trim(), userId, router)
        }
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  // Ensure the cursor is visible in the textarea, adjusting scroll if necessary
  function ensureCursorVisibility(textarea: HTMLTextAreaElement) {
    const lineHeight = 24 // Assuming line height is 24px
    const { scrollHeight, clientHeight, scrollTop } = textarea
    const cursorPosition = textarea.selectionStart
    const cursorLine = textarea.value.substring(0, cursorPosition).split("\n").length
    const topLineVisible = Math.ceil(scrollTop / lineHeight) + 1
    const bottomLineVisible = topLineVisible + Math.floor(clientHeight / lineHeight) - 1

    if (cursorLine < topLineVisible || cursorLine > bottomLineVisible) {
      // Align the cursor line to the bottom of the visible area
      const newScrollTop = (cursorLine - Math.floor(clientHeight / lineHeight)) * lineHeight
      textarea.scrollTop = newScrollTop
    }
  }

  return (
    <div className="w-[calc(100%-2px)] bg-foreground-accent p-4">
      <textarea
        ref={textareaRef}
        className={twMerge(
          `w-full !max-h-[61px] min-h-[36px] resize-none hide-scrollbar rounded border border-solid bg-transparent px-4 py-2 mb-1 outline-none text-title`,
          className,
        )}
        placeholder="Enter message..."
        autoFocus
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{
          overflowY: "auto",
          height: `${height}px`, // Use state to manage dynamic height
        }}></textarea>
    </div>
  )
}
