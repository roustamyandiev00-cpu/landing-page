"use client"

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
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  FolderKanban,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-context"
import { MenuItem } from "./menu-item"

const mainItems: Array<{ icon: any; label: string; href: string }> = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
]

const adminItems: Array<{ icon: any; label: string; href: string }> = [
  { icon: FileText, label: "Offertes", href: "/dashboard/offertes" },
  { icon: Receipt, label: "Facturen", href: "/dashboard/facturen" },
  { icon: CreditCard, label: "Uitgaven", href: "/dashboard/uitgaven" },
  { icon: Package, label: "Werkzaamheden", href: "/dashboard/werkzaamheden" },
  { icon: Building2, label: "Bankieren", href: "/dashboard/bankieren" },
]

const relationItems: Array<{ icon: any; label: string; href: string }> = [
  { icon: Users, label: "Klanten", href: "/dashboard/klanten" },
  { icon: FolderKanban, label: "Projecten", href: "/dashboard/projecten" },
  { icon: Mail, label: "E-mail", href: "/dashboard/email" },
  { icon: Calendar, label: "Agenda", href: "/dashboard/agenda" },
]

const smartItems: Array<{ icon: any; label: string; href: string; highlight?: boolean }> = [
  { icon: TrendingUp, label: "Inzichten", href: "/dashboard/inzichten" },
  { icon: Sparkles, label: "AI Assistent", href: "/dashboard/ai-assistent", highlight: true },
]

const otherItems: Array<{
  icon: any
  label: string
  href: string
}> = [
    { icon: Settings, label: "Instellingen", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help & Support", href: "/dashboard/help" },
  ]

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border flex-col transition-all duration-300 hidden md:flex",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-sidebar-border relative",
        collapsed ? "h-20 justify-center px-2" : "h-36 px-6"
      )}>
        {collapsed ? (
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
        ) : (
          <Image
            src="/logo.png"
            alt="Logo"
            width={280}
            height={100}
            className="h-32 w-auto"
          />
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-sidebar border border-sidebar-border rounded-full flex items-center justify-center hover:bg-sidebar-accent transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Menu</p>
        )}
        {/* Main Group */}
        {mainItems.map((item) => (
          <MenuItem key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
        ))}

        {/* Administratie Group */}
        <div className="pt-2">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              Administratie
            </p>
          )}
          {adminItems.map((item) => (
            <MenuItem key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </div>

        {/* Relaties Group */}
        <div className="pt-2">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              Relaties
            </p>
          )}
          {relationItems.map((item) => (
            <MenuItem key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </div>

        {/* Slim Group */}
        <div className="pt-2">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              Slim
            </p>
          )}
          {smartItems.map((item) => (
            <MenuItem key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
          ))}
        </div>

        <div className="pt-4">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Overig</p>
          )}
          {otherItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "w-full flex items-center rounded-lg text-sm transition-all duration-200",
                  collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Help Card */}
      {!collapsed && (
        <div className="p-4">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Hulp nodig?</p>
                <p className="text-xs text-muted-foreground">Vraag onze Smart AI</p>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/dashboard/ai-assistent">Start Chat</Link>
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">v2.1.0 (Beta)</p>
        </div>
      )}

      {collapsed && (
        <div className="p-2 flex justify-center">
          <Link href="/dashboard/ai-assistent">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
          </Link>
        </div>
      )}
    </aside>
  )
}
