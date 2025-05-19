import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Mondrian Ibiza | Audio Hug",
  description: "Personalized audio experiences for The Mondrian Ibiza",
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen">{children}</div>
}
