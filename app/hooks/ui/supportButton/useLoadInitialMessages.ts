import { useEffect } from "react"
import axios from "axios"

import fetchTicketId from "@/actions/fetchTicketId"
import { useMessagesStore } from "@/store/ui/useMessagesStore"
import { useLoading } from "@/store/ui/useLoading"
import { TAPIMessagesGetMessagesRequest, TAPIMessagesGetMessagesResponse } from "@/api/messages/get-messages/route"

export function useLoadInitialMessages() {
  const { setIsLoading } = useLoading()
  const { setMessages, ticketId: ticketIdInStore, setTicketId } = useMessagesStore()

  useEffect(() => {
    setIsLoading(true)
    try {
      async function getInitialMessagesByTicketIdFn() {
        if (!ticketIdInStore) {
          try {
            const ticketId = await fetchTicketId()
            if (!ticketId) return
            setTicketId(ticketId)
            const response: TAPIMessagesGetMessagesResponse = await axios.post("/api/messages/get-messages", {
              ticketId: ticketId,
            } as TAPIMessagesGetMessagesRequest)
            setMessages(response.data)
          } catch (error) {
            console.log(22, "error - ", error)
          }
        }
      }
      getInitialMessagesByTicketIdFn()
    } catch (error) {
      console.log(13, "useLoadInitialMessages - ", error)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
