"use client"
import { MarkTicketAsCompleted } from "./MarkTicketAsCompleted"

interface MobileSidebarProps {
  owner_username: string
}

export function MessagesHeader({ owner_username }: MobileSidebarProps) {
  return (
    <div className="w-full shadow-[inset_0px_4px_6px_rgba(0,0,0,0.4)] bg-foreground">
      <div className="flex flex-row justify-between shadow-[0px_6px_4px_rgba(0,0,0,0.25)] px-4 py-2">
        <div className="flex flex-row gap-x-2 items-center">
          <div className="w-[32px] h-[32px] bg-foreground-accent rounded-full" />
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm">{owner_username}</h2>
            {/* TODO - add active/inactive */}
            <p className="text-xs text-success">Active</p>
            {/* <p className="text-xs">Inactive</p> */}
          </div>
        </div>
        <div
          className="p-2 hover:bg-success/10 duration-150 rounded-md w-fit cursor-pointer"
          role="button"
          onClick={() => {
            /* TODO - OPEN ARE YOU SURE MODAL */
          }}>
          <MarkTicketAsCompleted />
        </div>
      </div>
    </div>
  )
}
