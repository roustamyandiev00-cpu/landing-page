"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Beschrijf je project",
    description: "Open de app of stuur een WhatsApp bericht. Beschrijf simpelweg het werk dat je wilt offreren.",
    image: "/mobile-app-chat-interface-construction.jpg",
  },
  {
    number: "02",
    title: "AI maakt de offerte",
    description:
      "Binnen 60 seconden analyseert onze AI je beschrijving en genereert een gedetailleerde offerte met actuele prijzen.",
    image: "/ai-processing-document-construction-quote.jpg",
  },
  {
    number: "03",
    title: "Aanpassen & verzenden",
    description: "Pas de offerte aan waar nodig, exporteer naar PDF en stuur direct naar je klant. Klaar!",
    image: "/professional-pdf-quote-document.jpg",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Zo simpel werkt het
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Van projectbeschrijving naar professionele offerte in drie stappen.
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}
            >
              <div className="flex-1 text-center lg:text-left">
                <span className="text-6xl lg:text-8xl font-serif font-bold text-primary/20">{step.number}</span>
                <h3 className="mt-4 text-2xl lg:text-3xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl transform rotate-3" />
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="relative rounded-2xl shadow-xl border border-border w-full max-w-sm mx-auto"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 h-14">
            Probeer het zelf
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
