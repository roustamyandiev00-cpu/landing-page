
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MenuItemProps {
    item: {
        icon: any
        label: string
        href: string
        highlight?: boolean
        badge?: string | number
    }
    pathname: string
    collapsed: boolean
}

export function MenuItem({ item, pathname, collapsed }: MenuItemProps) {
    const isActive = pathname === item.href
    return (
        <Link
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={cn(
                "w-full flex items-center rounded-lg text-sm transition-all duration-200 relative",
                collapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5",
                isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50",
                item.highlight && !isActive && "text-primary",
            )}
        >
            <item.icon className={cn("w-5 h-5 flex-shrink-0", item.highlight && !isActive && "text-primary")} />
            {!collapsed && (
                <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                            {item.badge}
                        </span>
                    )}
                </>
            )}
            {collapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            )}
        </Link>
    )
}
