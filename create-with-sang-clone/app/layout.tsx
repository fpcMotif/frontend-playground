import type React from "react"
import type { Metadata } from "next"
import { Funnel_Sans, Funnel_Display, Geist_Mono } from "next/font/google"
import "./globals.css"

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-funnel-sans",
})

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["500", "800"],
  variable: "--font-funnel-display",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Create with Sang",
  description: "Create more value through design in every project",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${funnelSans.variable} ${funnelDisplay.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-black text-white">{children}</body>
    </html>
  )
}
