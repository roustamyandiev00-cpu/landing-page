"use client"

import { motion } from "framer-motion"
import { MessageSquare, Zap, FileText, Smartphone, Brain, Shield } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Integratie",
    description:
      "Maak offertes direct via WhatsApp. Stuur een bericht en ontvang een professionele offerte binnen enkele minuten.",
  },
  {
    icon: Zap,
    title: "Razendsnelle AI",
    description:
      "Onze AI begrijpt bouwterminologie perfect en genereert nauwkeurige prijzen op basis van actuele marktdata.",
  },
  {
    icon: FileText,
    title: "Professionele Export",
    description: "Exporteer naar PDF, Excel of CSV. Volledig gepersonaliseerd met je eigen logo en huisstijl.",
  },
  {
    icon: Smartphone,
    title: "Altijd Beschikbaar",
    description: "Werk vanaf de bouwplaats, onderweg of thuis. Onze app werkt op alle apparaten, 24/7 beschikbaar.",
  },
  {
    icon: Brain,
    title: "Leert Jouw Prijzen",
    description: "De AI past zich aan jouw prijzen en werkwijze aan. Hoe vaker je het gebruikt, hoe beter het wordt.",
  },
  {
    icon: Shield,
    title: "Veilig & Betrouwbaar",
    description: "Je data is veilig opgeslagen en wordt nooit gedeeld. GDPR-compliant en volledig beveiligd.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Alles wat je nodig hebt voor <span className="text-primary">perfecte offertes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Buildr combineert krachtige AI met een intuïtieve interface. Geen technische kennis vereist.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
