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

interface Event {
  id: number
  title: string
  time: string
  type: string
  color: string
  location: string
  attendees: number
}

interface UpcomingEvent {
  id: number
  title: string
  date: string
  type: string
}

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(10)
  const [events, setEvents] = useState<Event[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])

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
              {events.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Geen afspraken vandaag</h3>
                  <p className="text-muted-foreground mb-4">Plan je eerste afspraak</p>
                  <NewAfspraakDialog>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Nieuwe Afspraak
                    </Button>
                  </NewAfspraakDialog>
                </div>
              ) : (
              events.map((event) => (
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
              ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Aankomende Gebeurtenissen</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Geen aankomende gebeurtenissen</p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
