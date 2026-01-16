"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    description: "Perfect voor zzp'ers",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["30 offertes per maand", "WhatsApp integratie", "PDF export", "500 opgeslagen items", "E-mail support"],
  },
  {
    name: "Professional",
    description: "Voor groeiende bedrijven",
    monthlyPrice: 59,
    yearlyPrice: 590,
    popular: true,
    features: [
      "100 offertes per maand",
      "WhatsApp integratie",
      "PDF, Excel & CSV export",
      "5.000 opgeslagen items",
      "Eigen logo & huisstijl",
      "3 gebruikers inclusief",
      "Prioriteit support",
    ],
  },
  {
    name: "Enterprise",
    description: "Op maat voor grote teams",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Onbeperkte offertes",
      "Alle integraties",
      "API toegang",
      "Onbeperkte items",
      "Onbeperkte gebruikers",
      "Dedicated support",
      "Custom training",
    ],
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Kies je abonnement
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start vandaag met 14 dagen gratis. Geen creditcard nodig.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={cn("text-sm", !isYearly ? "text-foreground font-medium" : "text-muted-foreground")}>
            Maandelijks
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={cn("relative w-14 h-8 rounded-full transition-colors", isYearly ? "bg-primary" : "bg-border")}
          >
            <span
              className={cn(
                "absolute top-1 w-6 h-6 rounded-full bg-card shadow transition-transform",
                isYearly ? "translate-x-7" : "translate-x-1",
              )}
            />
          </button>
          <span className={cn("text-sm", isYearly ? "text-foreground font-medium" : "text-muted-foreground")}>
            Jaarlijks
            <span className="ml-1 text-primary text-xs font-medium">-20%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative bg-card rounded-2xl p-6 lg:p-8 border",
                plan.popular ? "border-primary shadow-xl scale-105" : "border-border",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Meest gekozen
                </span>
              )}

              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

              <div className="mt-6 mb-6">
                {plan.monthlyPrice ? (
                  <>
                    <span className="text-4xl font-bold text-foreground">
                      €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/{isYearly ? "jaar" : "maand"}</span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-foreground">Op aanvraag</span>
                )}
              </div>

              <Button
                className={cn(
                  "w-full h-12",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
                )}
                asChild
              >
                {plan.monthlyPrice ? (
                  <a href="/register">Start gratis proefperiode</a>
                ) : (
                  <a href="mailto:info@archonpro.com">Neem contact op</a>
                )}
              </Button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
