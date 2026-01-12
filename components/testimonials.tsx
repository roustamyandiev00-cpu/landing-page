"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Mark de Vries",
    role: "Aannemer",
    company: "De Vries Bouw",
    image: "/professional-male-contractor-portrait.jpg",
    quote:
      "Sinds ik Buildr gebruik, verstuur ik 3x zoveel offertes. De AI begrijpt precies wat ik bedoel en de prijzen kloppen altijd.",
  },
  {
    name: "Sandra Jansen",
    role: "Schilder",
    company: "Jansen Schilderwerken",
    image: "/professional-female-painter-portrait.jpg",
    quote: "Fantastisch! Ik maak nu offertes direct na de bezichtiging. Klanten zijn onder de indruk van de snelheid.",
  },
  {
    name: "Peter van Dam",
    role: "Loodgieter",
    company: "Van Dam Installaties",
    image: "/professional-male-plumber-portrait.jpg",
    quote: "De beste investering voor mijn bedrijf. Ik bespaar minstens 5 uur per week en win meer opdrachten.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
            Wat onze gebruikers zeggen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Meer dan 5.000 bouwprofessionals gebruiken Buildr dagelijks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
