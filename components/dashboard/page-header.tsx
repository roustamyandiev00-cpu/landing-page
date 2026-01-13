"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  actionLabel?: string
  onAction?: () => void
  children?: React.ReactNode
}

export function PageHeader({ title, description, icon: Icon, actionLabel, onAction, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {Icon && (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
          {description && <p className="text-sm sm:text-base text-muted-foreground mt-0.5 sm:mt-1">{description}</p>}
        </div>
      </div>
      {children ? (
        children
      ) : actionLabel ? (
        <Button onClick={onAction} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
