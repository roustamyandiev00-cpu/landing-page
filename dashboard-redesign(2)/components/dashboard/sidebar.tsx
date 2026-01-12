"use client"

import Link from "next/link"
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
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Agenda", href: "/agenda" },
  { icon: Mail, label: "E-mail", href: "/email", badge: 3 },
  { icon: FileText, label: "Offertes", href: "/offertes" },
  { icon: Receipt, label: "Facturen", href: "/facturen" },
  { icon: CreditCard, label: "Uitgaven", href: "/uitgaven" },
  { icon: Building2, label: "Bankieren", href: "/bankieren" },
  { icon: TrendingUp, label: "Inzichten", href: "/inzichten" },
  { icon: Sparkles, label: "AI Assistent", href: "/ai-assistent", highlight: true },
]

const otherItems = [
  { icon: Settings, label: "Instellingen", href: "/instellingen" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg text-foreground">ONYX.AI</span>
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

      {/* Help Card */}
      <div className="p-4">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Hulp nodig?</p>
              <p className="text-xs text-muted-foreground">Vraag onze Smart AI</p>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Chat</Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">v2.1.0 (Beta)</p>
      </div>
    </aside>
  )
}
