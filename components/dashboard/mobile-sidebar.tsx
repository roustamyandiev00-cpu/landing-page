"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  Mail,
  FileText,
  Receipt,
  CreditCard,
  Building2,
  TrendingUp,
  Sparkles,
  Settings,
  HelpCircle,
  Menu,
  X,
  Users,
  FolderKanban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Klanten", href: "/dashboard/klanten" },
  { icon: FolderKanban, label: "Projecten", href: "/dashboard/projecten" },
  { icon: FileText, label: "Offertes", href: "/dashboard/offertes" },
  { icon: Receipt, label: "Facturen", href: "/dashboard/facturen" },
  { icon: Mail, label: "E-mail", href: "/dashboard/email", badge: 3 },
  { icon: Calendar, label: "Agenda", href: "/dashboard/agenda" },
  { icon: CreditCard, label: "Uitgaven", href: "/dashboard/uitgaven" },
  { icon: Building2, label: "Bankieren", href: "/dashboard/bankieren" },
  { icon: TrendingUp, label: "Inzichten", href: "/dashboard/inzichten" },
  { icon: Sparkles, label: "AI Assistent", href: "/dashboard/ai-assistent", highlight: true },
]

const otherItems = [
  { icon: Settings, label: "Instellingen", href: "/dashboard/instellingen" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/help" },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar">
        {/* Logo */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-sidebar-border">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={140} 
            height={45} 
            className="h-12 w-auto"
          />
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                  item.highlight && !isActive && "text-primary",
                )}
              >
                <item.icon className={cn("w-5 h-5", item.highlight && !isActive && "text-primary")} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}

          <div className="pt-4">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Overig</p>
            {otherItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
