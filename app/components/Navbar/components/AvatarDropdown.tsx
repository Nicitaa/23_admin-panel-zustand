"use client"
import Image from "next/image"

import { BsWindow } from "react-icons/bs"
import { TbWorld } from "react-icons/tb"
import { FiPhoneCall } from "react-icons/fi"
import { IoChatboxEllipsesOutline } from "react-icons/io5"

import useUserStore from "@/store/user/userStore"
import LogoutDropdownItem from "./LogoutDropdownItem"
import { SwitchDarkMode } from "@/components"
import { contact } from "@/constant/contacts"
import { DropdownContainer, DropdownItem } from "@/components/ui"
import { useRouter } from "next/navigation"
import useAvatarDropdownClose from "@/hooks/ui/useAvatarDropdownClose"
import { toggleDarkMode } from "@/functions/toggleDarkMode"

export function AvatarDropdown({ role }: { role: string }) {
  const router = useRouter()
  const { isDropdown, openDropdown, closeDropdown, toggle, avatarDropdownRef } = useAvatarDropdownClose()
  const userStore = useUserStore()

  function openAdminPanel() {
    router.push("?modal=AdminPanel")
    closeDropdown()
  }

  function openChangeLanguageModal() {
    router.push("?modal=ChangeLanguage")
    closeDropdown()
  }

  function openSupportTickets() {
    router.push("/support/tickets")
    closeDropdown()
  }

  return (
    <DropdownContainer
      isDropdown={isDropdown}
      toggle={toggle}
      dropdownRef={avatarDropdownRef}
      classNameDropdownContainer="ml-1 z-[102]"
      className="max-w-[200px]"
      username={userStore.username}
      icon={
        <>
          <Image
            className="w-[32px] h-[32px] rounded-full"
            src={userStore.avatarUrl ? userStore.avatarUrl : "/placeholder.jpg"}
            alt="user logo"
            width={32}
            height={32}
          />
        </>
      }>
      {role === "SUPPORT" && (
        <DropdownItem label="Support chat" icon={IoChatboxEllipsesOutline} onClick={openSupportTickets} />
      )}
      <DropdownItem label="Admin panel" icon={BsWindow} onClick={openAdminPanel} />
      <DropdownItem
        className="flex justify-center mobile:hidden"
        label="Support"
        icon={FiPhoneCall}
        href={contact.telegram}
        target="_blank"
      />
      <DropdownItem label="Change language" icon={TbWorld} onClick={openChangeLanguageModal} />
      <DropdownItem className="min-[501px]:hidden" label="Dark mode" icon={SwitchDarkMode} onClick={toggleDarkMode} />
      <LogoutDropdownItem />
    </DropdownContainer>
  )
}
