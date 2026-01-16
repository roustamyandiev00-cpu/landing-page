"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function WelcomeBanner() {
  const { user } = useAuth()
  const displayName = user?.displayName || user?.email?.split('@')[0] || "Gebruiker"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Welcome Card */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6">
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground mb-1">Welkom terug,</p>
          <h2 className="text-2xl font-bold text-foreground mb-2">{displayName} 👋</h2>
          <p className="text-sm text-muted-foreground max-w-md mb-4">
            Je financiële overzicht van vandaag. Je administratie is helemaal bijgewerkt.
          </p>
          <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
            Naar volledig overzicht
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-4 bottom-0 w-48 h-48 opacity-30">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(250, 80%, 60%)" />
                <stop offset="100%" stopColor="hsl(165, 60%, 50%)" />
              </linearGradient>
            </defs>
            <path
              d="M100,20 Q140,40 160,80 T140,140 Q120,180 80,170 T40,120 Q20,80 60,40 T100,20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle cx="100" cy="100" r="40" fill="url(#gradient)" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* AI Alert Card */}
      {/* AI Action/Insights Card */}
      <div className="glass-card rounded-2xl p-0 flex flex-col overflow-hidden border-l-4 border-l-primary/50">
        <div className="bg-primary/5 p-4 border-b border-border/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">AI Overzicht Vandaag</h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded">
            {new Date().toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="p-4 space-y-3">
          {/* Action Item 1 */}
          <div className="flex gap-3 items-start group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
            <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                2 facturen vervallen bijna
              </p>
              <p className="text-xs text-muted-foreground">Totaal: € 1.250, stuur herinnering →</p>
            </div>
          </div>

          {/* Action Item 2 */}
          <div className="flex gap-3 items-start group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Nieuwe offerte aanvraag
              </p>
              <p className="text-xs text-muted-foreground">Project: &apos;Renovatie Janssens&apos; →</p>
            </div>
          </div>

          {/* Action Item 3 */}
          <div className="flex gap-3 items-start group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
            <div className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Cashflow update
              </p>
              <p className="text-xs text-muted-foreground">+12% t.o.v. vorige maand 📈</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
