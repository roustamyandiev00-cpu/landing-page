"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Building, CreditCard, Bell, Shield, Upload, Save, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { updateUserProfile } from "@/lib/firestore"

export default function InstellingenPage() {
  const { user, profile, refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phone: "",
  })
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyKvK: "",
    companyBTW: "",
    companyIBAN: "",
    companyAddress: "",
    companyCity: "",
    companyPostalCode: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    invoiceReminders: true,
    weeklyReport: false,
    marketingEmails: false,
  })

  useEffect(() => {
    if (profile) {
      setProfileData({
        displayName: profile.displayName || "",
        email: profile.email || "",
        phone: profile.companyPhone || "",
      })
      setCompanyData({
        companyName: profile.companyName || "",
        companyKvK: profile.companyKvK || "",
        companyBTW: profile.companyBTW || "",
        companyIBAN: profile.companyIBAN || "",
        companyAddress: profile.companyAddress || "",
        companyCity: profile.companyCity || "",
        companyPostalCode: profile.companyPostalCode || "",
      })
    }
  }, [profile])

  const handleSaveProfile = async () => {
    if (!user) return
    setLoading(true)
    try {
      await updateUserProfile(user.uid, {
        displayName: profileData.displayName,
        companyPhone: profileData.phone,
      })
      await refreshProfile()
      alert("Profiel opgeslagen!")
    } catch (error) {
      console.error("Error saving profile:", error)
      alert("Er ging iets mis")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCompany = async () => {
    if (!user) return
    setLoading(true)
    try {
      await updateUserProfile(user.uid, companyData)
      await refreshProfile()
      alert("Bedrijfsgegevens opgeslagen!")
    } catch (error) {
      console.error("Error saving company:", error)
      alert("Er ging iets mis")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="Instellingen" description="Beheer je account en voorkeuren" icon={Settings} />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 border border-border">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4" /> Profiel
            </TabsTrigger>
            <TabsTrigger value="company" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building className="w-4 h-4" /> Bedrijf
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4" /> Facturatie
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4" /> Meldingen
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4" /> Beveiliging
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Profiel Informatie</CardTitle>
                <CardDescription>Beheer je persoonlijke gegevens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.photoURL || ""} />
                    <AvatarFallback>{profileData.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Upload className="w-4 h-4" /> Upload Foto
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">JPG, PNG of GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="displayName">Naam</Label>
                    <Input 
                      id="displayName" 
                      value={profileData.displayName} 
                      onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                      className="bg-muted/50 border-0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mailadres</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email} 
                      disabled
                      className="bg-muted/50 border-0 opacity-60" 
                    />
                    <p className="text-xs text-muted-foreground">Email kan niet worden gewijzigd</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefoonnummer</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone} 
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="bg-muted/50 border-0" 
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveProfile} 
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Opslaan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Bedrijfsgegevens</CardTitle>
                <CardDescription>Informatie die op je facturen verschijnt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Bedrijfsnaam</Label>
                    <Input 
                      id="companyName" 
                      value={companyData.companyName} 
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                      className="bg-muted/50 border-0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kvk">KVK Nummer</Label>
                    <Input 
                      id="kvk" 
                      value={companyData.companyKvK} 
                      onChange={(e) => setCompanyData({ ...companyData, companyKvK: e.target.value })}
                      className="bg-muted/50 border-0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="btw">BTW Nummer</Label>
                    <Input 
                      id="btw" 
                      value={companyData.companyBTW} 
                      onChange={(e) => setCompanyData({ ...companyData, companyBTW: e.target.value })}
                      className="bg-muted/50 border-0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN</Label>
                    <Input 
                      id="iban" 
                      value={companyData.companyIBAN} 
                      onChange={(e) => setCompanyData({ ...companyData, companyIBAN: e.target.value })}
                      className="bg-muted/50 border-0" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      value={companyData.companyAddress}
                      onChange={(e) => setCompanyData({ ...companyData, companyAddress: e.target.value })}
                      className="bg-muted/50 border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postcode</Label>
                    <Input
                      id="postalCode"
                      value={companyData.companyPostalCode}
                      onChange={(e) => setCompanyData({ ...companyData, companyPostalCode: e.target.value })}
                      className="bg-muted/50 border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Stad</Label>
                    <Input
                      id="city"
                      value={companyData.companyCity}
                      onChange={(e) => setCompanyData({ ...companyData, companyCity: e.target.value })}
                      className="bg-muted/50 border-0"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleSaveCompany} 
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Opslaan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Huidig Abonnement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div>
                      <h3 className="font-medium text-foreground">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">Onbeperkte facturen en offertes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">
                        €29<span className="text-sm font-normal text-muted-foreground">/maand</span>
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Upgrade
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Betaalmethode</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Verloopt 12/2027</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Wijzigen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Meldingsvoorkeuren</CardTitle>
                <CardDescription>Kies hoe je op de hoogte gehouden wilt worden</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">E-mail meldingen</p>
                      <p className="text-sm text-muted-foreground">Ontvang meldingen via e-mail</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Push meldingen</p>
                      <p className="text-sm text-muted-foreground">Ontvang meldingen in de browser</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Factuur herinneringen</p>
                      <p className="text-sm text-muted-foreground">Herinnering bij openstaande facturen</p>
                    </div>
                    <Switch
                      checked={notifications.invoiceReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, invoiceReminders: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Wekelijks rapport</p>
                      <p className="text-sm text-muted-foreground">Ontvang een wekelijkse samenvatting</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Wachtwoord Wijzigen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Huidig wachtwoord</Label>
                    <Input id="currentPassword" type="password" className="bg-muted/50 border-0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nieuw wachtwoord</Label>
                    <Input id="newPassword" type="password" className="bg-muted/50 border-0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
                    <Input id="confirmPassword" type="password" className="bg-muted/50 border-0" />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Wachtwoord Wijzigen</Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Twee-factor Authenticatie</CardTitle>
                  <CardDescription>Voeg een extra beveiligingslaag toe aan je account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">2FA is uitgeschakeld</p>
                        <p className="text-sm text-muted-foreground">Beveilig je account met een authenticator app</p>
                      </div>
                    </div>
                    <Button variant="outline">Inschakelen</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
