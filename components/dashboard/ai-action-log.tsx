"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Clock, AlertTriangle, CheckCircle, Eye, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIAction {
  id: string
  type: 'reminder_sent' | 'payment_received' | 'overdue_flagged' | 'btw_calculated'
  description: string
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
  details?: string
}

export function AIActionLog() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => Date.now())
  
  // Update time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])
  
  const actions = useMemo(() => {
    const now = currentTime
    return [
      {
        id: '1',
        type: 'reminder_sent' as const,
        description: 'Herinneringen verstuurd naar 3 klanten',
        timestamp: new Date(now - 1000 * 60 * 15), // 15 min ago
        status: 'completed' as const,
        details: 'Fam. Jansen (+30 dagen), Bouwmaat Amsterdam (+14 dagen), Gamma Bouwmarkt (Vandaag)'
      },
      {
        id: '2',
        type: 'payment_received' as const,
        description: 'Betaling ontvangen van Fam. de Vries',
        timestamp: new Date(now - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'completed' as const,
        details: 'Factuur #2024-003 - €1.500,00'
      },
      {
        id: '3',
        type: 'overdue_flagged' as const,
        description: 'Factuur gemarkeerd als te laat',
        timestamp: new Date(now - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'completed' as const,
        details: 'Factuur #2024-001 - €2.500,00 (Fam. Jansen)'
      },
      {
        id: '4',
        type: 'btw_calculated' as const,
        description: 'BTW aangifte voorbereid',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        status: 'completed' as const,
        details: 'Q4 2024: €5.208,00 verschuldigd'
      }
    ]
  }, [currentTime])

  const getTypeIcon = (type: AIAction['type']) => {
    switch (type) {
      case 'reminder_sent': return Bell
      case 'payment_received': return CheckCircle
      case 'overdue_flagged': return AlertTriangle
      case 'btw_calculated': return Clock
      default: return Bell
    }
  }

  const getStatusColor = (status: AIAction['status']) => {
    switch (status) {
      case 'completed': return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10'
      case 'pending': return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10'
      case 'failed': return 'text-red-500 border-red-500/20 bg-red-500/10'
      default: return 'text-muted-foreground border-muted/20 bg-muted/10'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = currentTime
    const minutes = Math.floor((now - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes} min geleden`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} uur geleden`
    const days = Math.floor(hours / 24)
    return `${days} dag${days > 1 ? 'en' : ''} geleden`
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        <Eye className="w-3 h-3 mr-1" />
        Bekijk AI-actiegeschiedenis
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold">AI-actiegeschiedenis</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                {actions.map((action) => {
                  const Icon = getTypeIcon(action.type)
                  return (
                    <div
                      key={action.id}
                      className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">
                            {action.description}
                          </p>
                          <Badge
                            variant="outline"
                            className={cn("text-xs", getStatusColor(action.status))}
                          >
                            {action.status === 'completed' ? 'Voltooid' : 
                             action.status === 'pending' ? 'Bezig' : 'Mislukt'}
                          </Badge>
                        </div>
                        
                        {action.details && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {action.details}
                          </p>
                        )}
                        
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(action.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
