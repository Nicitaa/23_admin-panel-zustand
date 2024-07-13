import { RefObject, useEffect } from "react"

export function useScrollToBottom(bottomRef: RefObject<HTMLUListElement>, isDropdown: boolean) {
  useEffect(() => {
    //Timeout needed for focus and scroll to bottom - without it foucs and scrollToBottom doesn't work
    setTimeout(() => {
      // setFocus("message") // TODO - set focus on input
      if (bottomRef.current) {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight
      }
    }, 25)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdown])
}
