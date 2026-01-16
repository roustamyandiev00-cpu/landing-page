"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmailSettings } from "@/components/dashboard/email-settings"
import { Mail, Settings, CheckCircle, AlertCircle } from "lucide-react"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("email")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5" />
        <h1 className="text-2xl font-bold">Instellingen</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorieën</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "email" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("email")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Configuratie
              </Button>
              
              {/* Future settings tabs */}
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
                disabled
              >
                <Settings className="w-4 h-4 mr-2" />
                Notificaties
                <Badge variant="secondary" className="ml-auto">Binnenkort</Badge>
              </Button>
              
              <Button
                variant={activeTab === "account" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("account")}
                disabled
              >
                <Settings className="w-4 h-4 mr-2" />
                Account
                <Badge variant="secondary" className="ml-auto">Binnenkort</Badge>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "email" && <EmailSettings />}
          
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notificatie Instellingen</CardTitle>
                <CardDescription>
                  Configureer notificaties voor facturen, offertes en meer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Notificatie instellingen komen binnenkort.</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Instellingen</CardTitle>
                <CardDescription>
                  Beheer je account profiel en voorkeuren.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Account instellingen komen binnenkort.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
