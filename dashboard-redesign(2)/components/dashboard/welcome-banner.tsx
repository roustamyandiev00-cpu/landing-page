"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomeBanner() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Welcome Card */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6">
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground mb-1">Welkom terug,</p>
          <h2 className="text-2xl font-bold text-foreground mb-2">Jan de Vries 👋</h2>
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
      <div className="glass-card rounded-2xl p-5 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-medium text-accent uppercase tracking-wider">ONYX.AI Intelligence</p>
          </div>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {'"Opgelet: Je BTW aangifte moet '}
          <span className="text-primary font-medium">binnen 4 dagen</span>
          {' binnen zijn!"'}
        </p>
        <div className="mt-4 flex-1 flex items-end">
          <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden">
            <div className="bg-accent h-full w-3/4 rounded-full transition-all duration-1000" />
          </div>
        </div>
      </div>
    </div>
  )
}
