"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users, Video, Edit, Trash2 } from "lucide-react"

interface Event {
  id: number
  title: string
  time: string
  type: string
  color: string
  location: string
  attendees: number
}

interface EventDetailsDialogProps {
  event: Event
  children: React.ReactNode
}

export function EventDetailsDialog({ event, children }: EventDetailsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-background border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-12 rounded-full ${event.color}`} />
            <div>
              <DialogTitle>{event.title}</DialogTitle>
              <DialogDescription>10 Januari 2026</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            {event.location.includes("Online") ? <Video className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>{event.attendees} deelnemers</span>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Dit is een {event.type} afspraak. Klik op bewerken om de details aan te passen of te verwijderen.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 bg-transparent"
          >
            <Trash2 className="w-4 h-4" />
            Verwijderen
          </Button>
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            Bewerken
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
