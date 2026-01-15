"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"

interface Event {
  id: number
  title: string
  time: string
  type: string
  color: string
  location: string
  attendees: number
}

export function EventDetailsDialog({ event, children }: { event: Event; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>{event.attendees} deelnemers</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge>{event.type}</Badge>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Bewerken
            </Button>
            <Button variant="outline" className="flex-1 text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Verwijderen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
