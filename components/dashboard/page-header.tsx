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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      {children ? (
        children
      ) : actionLabel ? (
        <Button onClick={onAction} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
