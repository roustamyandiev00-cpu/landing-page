"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { SidebarProvider, useSidebar } from "./sidebar-context"
import { cn } from "@/lib/utils"

function DashboardContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar()
  
  return (
    <div className={cn(
      "flex-1 flex flex-col transition-all duration-300",
      "md:ml-64",
      collapsed && "md:ml-20"
    )}>
      <Header />
      <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
    </div>
  )
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  )
}
