"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  QrCode,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Headphones,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "QR Codes",
      href: "/admin/qrcodes",
      icon: <QrCode className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white/10 backdrop-blur-lg p-4 transition-transform duration-200 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-white">
                <Headphones className="h-6 w-6" />
                <span className="text-xl font-bold">Audio Hug</span>
              </Link>
              <div className="bg-white/20 rounded-full px-2 py-0.5">
                <span className="text-white text-xs font-bold">DEMO</span>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-white/20",
                    pathname === item.href && "bg-white/20",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-3 text-white text-sm">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-bold">Demo Mode</span>
              </div>
              <p className="text-white/80 text-xs">This is a functional demo. All features are simulated.</p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors hover:bg-white/20"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("flex-1 transition-all duration-200 ease-in-out", sidebarOpen ? "md:ml-64" : "ml-0 md:ml-64")}>
        {children}
      </div>
    </div>
  )
}
