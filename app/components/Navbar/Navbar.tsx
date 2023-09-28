import Link from "next/link"
import Image from "next/image"

import { FiPhoneCall } from "react-icons/fi"
import { AiOutlinePlus } from "react-icons/ai"

import { Switch } from ".."
import { Language } from "../Language"
import { HamburgerMenu, Logo, NavbarSearch, OpenAuthModalButton, OpenCartModalButton } from "./components"
import NavbarWrapper from "./components/NavbarWrapper"
import { DropdownContainer } from "../ui/DropdownContainer"
import supabaseServer from "@/utils/supabaseServer"
import { DropdownItem } from "../ui/DropdownItem"
import LogoutDropdownItem from "./components/LogoutDropdownItem"

export default async function Navbar() {
  const {
    data: { session },
  } = await supabaseServer.auth.getSession()

  return (
    <NavbarWrapper>
      <div className="flex flex-row gap-x-4 items-center">
        {/* HAMBURGER-ICON + LOGO */}
        <HamburgerMenu />
        <Logo />
      </div>
      {/* SEARCH + LANGUAGE */}
      <div className="flex flex-row gap-x-2">
        <NavbarSearch />
        <Language className="hidden laptop:flex" />
      </div>

      {/* ICONS HELP */}
      <div className="hidden mobile:flex flex-row gap-x-2 items-center ">
        <Switch />
        <OpenCartModalButton />
        <DropdownContainer
          className="before:translate-x-[-300%] translate-x-[35%] w-[125px]"
          icon={<FiPhoneCall size={28} />}>
          <div className="flex flex-col gap-y-2 justify-center items-center px-4 py-2">
            <div className="flex flex-col justify-center items-center">
              <Link className="hover:text-brand text-center" href="https://t.me/nicitaacom" target="_blank">
                Telegram
              </Link>
              <p className="whitespace-nowrap">(response 8s)</p>
            </div>
          </div>
        </DropdownContainer>
        {session ? (
          <DropdownContainer
            classNameDropdownContainer="ml-1"
            className="max-w-[175px]"
            username={"undefined"}
            icon={
              <>
                <Image
                  className="w-[32px] h-[32px] rounded-full"
                  src={false ? "" : "/placeholder.jpg"}
                  alt="user logo"
                  width={32}
                  height={32}
                />
              </>
            }>
            <DropdownItem label="Add product" icon={AiOutlinePlus} href="?modal=AddProduct" />
            <LogoutDropdownItem />
          </DropdownContainer>
        ) : (
          <OpenAuthModalButton />
        )}
      </div>
    </NavbarWrapper>
  )
}
