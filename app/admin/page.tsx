"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  Receipt,
  TrendingUp,
  Search,
  Loader2,
  Euro,
  Calendar,
  Activity,
  ArrowLeft,
} from "lucide-react"
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

interface UserStats {
  uid: string
  email: string
  displayName: string
  createdAt: any
  offertes: number
  facturen: number
  klanten: number
  totalValue: number
  lastActive: any
}

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [users, setUsers] = useState<UserStats[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loadingData, setLoadingData] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOffertes: 0,
    totalFacturen: 0,
    totalValue: 0,
    activeToday: 0,
  })

  useEffect(() => {
    const loadAdminData = async () => {
      if (!db) return

      try {
        // Get all users
        const usersSnapshot = await getDocs(collection(db, "users"))
        const usersData = usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }))

        // Get all offertes
        const offertesSnapshot = await getDocs(collection(db, "offertes"))
        const offertes = offertesSnapshot.docs.map(doc => doc.data())

        // Get all facturen
        const facturenSnapshot = await getDocs(collection(db, "facturen"))
        const facturen = facturenSnapshot.docs.map(doc => doc.data())

        // Get all klanten
        const klantenSnapshot = await getDocs(collection(db, "klanten"))
        const klanten = klantenSnapshot.docs.map(doc => doc.data())

        // Calculate stats per user
        const userStats: UserStats[] = usersData.map((userData: any) => {
          const userOffertes = offertes.filter((o: any) => o.userId === userData.uid)
          const userFacturen = facturen.filter((f: any) => f.userId === userData.uid)
          const userKlanten = klanten.filter((k: any) => k.userId === userData.uid)

          const totalValue = [
            ...userOffertes.map((o: any) => o.amount || 0),
            ...userFacturen.map((f: any) => f.amount || 0),
          ].reduce((sum, val) => sum + val, 0)

          return {
            uid: userData.uid,
            email: userData.email || "Geen email",
            displayName: userData.displayName || userData.name || "Onbekend",
            createdAt: userData.createdAt,
            offertes: userOffertes.length,
            facturen: userFacturen.length,
            klanten: userKlanten.length,
            totalValue,
            lastActive: userData.updatedAt || userData.createdAt,
          }
        })

        // Sort by total value
        userStats.sort((a, b) => b.totalValue - a.totalValue)

        setUsers(userStats)

        // Calculate global stats
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const activeToday = userStats.filter(u => {
          if (!u.lastActive) return false
          const lastActive = u.lastActive.toDate ? u.lastActive.toDate() : new Date(u.lastActive)
          return lastActive >= today
        }).length

        setStats({
          totalUsers: userStats.length,
          totalOffertes: offertes.length,
          totalFacturen: facturen.length,
          totalValue: userStats.reduce((sum, u) => sum + u.totalValue, 0),
          activeToday,
        })

        setLoadingData(false)
      } catch (error) {
        console.error("Error loading admin data:", error)
        setLoadingData(false)
      }
    }

    if (!loading) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      if (!user || user.email !== adminEmail) {
        router.push("/dashboard")
      } else {
        setTimeout(() => setAuthorized(true), 0)
        loadAdminData()
      }
    }
  }, [user, loading, router])

  const filteredUsers = users.filter(
    u =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString("nl-NL", { day: "2-digit", month: "short", year: "numeric" })
  }

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Overzicht van alle gebruikers en activiteit</p>
          </div>
          <Badge variant="default" className="gap-2">
            <Activity className="w-4 h-4" />
            Admin
          </Badge>
        </div>

        {/* Stats Grid */}
        {loadingData ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Data laden...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Totaal Gebruikers</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.totalUsers}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Totaal Offertes</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.totalOffertes}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Totaal Facturen</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.totalFacturen}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Receipt className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Totale Waarde</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        €{stats.totalValue.toLocaleString("nl-NL")}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Euro className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Actief Vandaag</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.activeToday}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Alle Gebruikers ({filteredUsers.length})</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Zoek gebruiker..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-muted/50 border-0"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Gebruiker</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Offertes</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Facturen</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Klanten</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Totale Waarde</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Aangemaakt</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Laatst Actief</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.uid} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-semibold text-sm">
                                  {user.displayName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-foreground">{user.displayName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary">{user.offertes}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary">{user.facturen}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="secondary">{user.klanten}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-foreground">
                              €{user.totalValue.toLocaleString("nl-NL")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-muted-foreground">{formatDate(user.lastActive)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
