"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Video, Plus } from "lucide-react"
import { NewAfspraakDialog } from "@/components/dashboard/new-afspraak-dialog"
import { EventDetailsDialog } from "@/components/dashboard/event-details-dialog"

const daysOfWeek = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"]
const currentMonth = "Januari 2026"

const events = [
  {
    id: 1,
    title: "Kwartaal Review Meeting",
    time: "09:00 - 10:30",
    type: "meeting",
    color: "bg-blue-500",
    location: "Vergaderzaal A",
    attendees: 5,
  },
  {
    id: 2,
    title: "Klant Presentatie - ABC Corp",
    time: "11:00 - 12:00",
    type: "presentation",
    color: "bg-emerald-500",
    location: "Online (Zoom)",
    attendees: 3,
  },
  {
    id: 3,
    title: "Lunch met Investeerder",
    time: "12:30 - 14:00",
    type: "personal",
    color: "bg-amber-500",
    location: "Restaurant De Kas",
    attendees: 2,
  },
  {
    id: 4,
    title: "Product Demo",
    time: "15:00 - 16:00",
    type: "demo",
    color: "bg-purple-500",
    location: "Online (Teams)",
    attendees: 8,
  },
]

const upcomingEvents = [
  { id: 1, title: "Belastingaangifte deadline", date: "15 Jan", type: "deadline" },
  { id: 2, title: "Team Building Event", date: "20 Jan", type: "event" },
  { id: 3, title: "Jaarlijkse Review", date: "25 Jan", type: "meeting" },
]

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(10)

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Agenda" description="Beheer je afspraken en evenementen" icon={Calendar}>
          <NewAfspraakDialog>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nieuwe Afspraak
            </Button>
          </NewAfspraakDialog>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="glass-card lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{currentMonth}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {[1, 2].map((i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {calendarDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-all ${
                      day === selectedDate
                        ? "bg-primary text-primary-foreground"
                        : day === 10
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Events */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vandaag - 10 Januari</CardTitle>
                <Badge variant="secondary">{events.length} afspraken</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className={`w-1 rounded-full ${event.color}`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {event.location.includes("Online") ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.attendees} deelnemers
                      </span>
                    </div>
                  </div>
                  <EventDetailsDialog event={event}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </EventDetailsDialog>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Aankomende Gebeurtenissen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
