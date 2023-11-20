import "./globals.css"

import type { Metadata } from "next"

import getTicketId from "./actions/getTicketId"
import getInitialMessages from "./actions/getInitialMessages"

import ClientOnly from "./components/ClientOnly"
import { Layout } from "./components"
import { SupportButton } from "./components/SupportButton/SupportButton"

export const metadata: Metadata = {
  title: "23_store",
  description: "Something better than amazon",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-light.png",
        href: "/logo-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ticketId = await getTicketId()
  const initialMessages = await getInitialMessages()

  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <Layout>{children}</Layout>
          <SupportButton initialMessages={initialMessages ?? []} ticketId={ticketId} />
        </ClientOnly>
      </body>
    </html>
  )
}
