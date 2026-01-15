"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Bell, Sun, Moon, ChevronDown, LogOut, Settings, User, FileText, Receipt, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MobileSidebar } from "./mobile-sidebar"
import { SearchDialog } from "./search-dialog"
import { useAuth } from "@/lib/auth-context"
import { signOut } from "@/lib/firebase"

const notifications = [
  { 
    id: 1, 
    title: "Nieuwe offerte geaccepteerd", 
    description: "ABC Corporation heeft offerte #OFF-2026-001 geaccepteerd", 
    time: "5 min geleden", 
    unread: true,
    href: "/dashboard/offertes",
    icon: FileText
  },
  { 
    id: 2, 
    title: "Factuur betaald", 
    description: "Betaling ontvangen van XYZ Tech Solutions", 
    time: "1 uur geleden", 
    unread: true,
    href: "/dashboard/facturen",
    icon: Receipt
  },
  { 
    id: 3, 
    title: "Nieuwe klant aangemeld", 
    description: "StartUp Hub heeft een account aangemaakt", 
    time: "3 uur geleden", 
    unread: false,
    href: "/dashboard/klanten",
    icon: UserPlus
  },
]

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const displayName = user?.displayName || user?.email?.split('@')[0] || "Gebruiker"
  const userEmail = user?.email || ""
  const userInitials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const unreadCount = notifications.filter(n => n.unread).length

  const handleNotificationClick = (href: string) => {
    setNotificationsOpen(false)
  }

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Pages</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Dashboard</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoeken... (⌘K)"
            className="w-64 pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground cursor-pointer"
            onClick={() => setSearchOpen(true)}
            readOnly
          />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-muted-foreground"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notificaties</h3>
              <p className="text-sm text-muted-foreground">{unreadCount} ongelezen</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.href}
                  onClick={() => handleNotificationClick(notification.href)}
                  className={`block p-4 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors ${
                    notification.unread ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    )}
                    <div className={notification.unread ? "" : "ml-5"}>
                      <p className="text-sm font-medium text-foreground">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <Button 
                variant="ghost" 
                className="w-full text-sm text-primary hover:text-primary"
                onClick={() => setNotificationsOpen(false)}
              >
                Alle notificaties bekijken
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {mounted && (resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer hover:opacity-80 transition-opacity outline-none">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.photoURL || "/professional-avatar.png"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-foreground">{displayName}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard/instellingen" className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Mijn Profiel
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/dashboard/instellingen" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Instellingen
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
              <LogOut className="w-4 h-4 mr-2" />
              Uitloggen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
