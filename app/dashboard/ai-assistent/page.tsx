"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Send,
  FileText,
  Receipt,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  Calculator,
  Clock,
  Bot,
  User,
  Mic,
  Paperclip,
} from "lucide-react"

const suggestedPrompts = [
  { icon: FileText, label: "Schrijf een offerte", prompt: "Schrijf een offerte voor een badkamer renovatie van 15m²" },
  { icon: Receipt, label: "Factuur maken", prompt: "Maak een factuur voor project ABC Corporation" },
  { icon: TrendingUp, label: "Financieel rapport", prompt: "Maak een financieel overzicht van deze maand" },
  { icon: Calculator, label: "Prijsberekening", prompt: "Bereken de prijs voor tegelwerk 25m² inclusief materiaal" },
]

const initialMessages = [
  {
    role: "assistant",
    content: "Hoi! 👋 Ik ben Nova, je AI assistent. Ik help je met offertes, facturen en alles wat je nodig hebt. Wat kan ik voor je doen?",
    timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
  },
]

const capabilities = [
  { icon: FileText, title: "Offertes & Facturen", description: "Automatisch opstellen" },
  { icon: MessageSquare, title: "Klantcommunicatie", description: "E-mails schrijven" },
  { icon: TrendingUp, title: "Financiële Analyse", description: "Rapporten genereren" },
  { icon: Lightbulb, title: "Bedrijfsadvies", description: "Aanbevelingen" },
]

// Simulated AI responses
const getAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes("offerte") && (lowerMessage.includes("badkamer") || lowerMessage.includes("renovatie"))) {
    return `Perfect! Ik maak een offerte voor de badkamer renovatie. 📝

**Offerte: Badkamer Renovatie 15m²**

| Omschrijving | Aantal | Prijs |
|--------------|--------|-------|
| Tegelwerk (vloer + wand) | 45m² | €2.250 |
| Sanitair installatie | 1 set | €1.850 |
| Loodgieterswerk | 1 | €950 |
| Schilderwerk | 15m² | €375 |
| Materiaalkosten | 1 | €1.200 |

**Subtotaal:** €6.625
**BTW (21%):** €1.391,25
**Totaal:** €8.016,25

Wil je dat ik deze offerte exporteer naar PDF of aanpassingen maak?`
  }
  
  if (lowerMessage.includes("factuur")) {
    return `Ik maak een factuur aan! 📄

**Factuur #FAC-2026-012**
Klant: ABC Corporation
Datum: ${new Date().toLocaleDateString("nl-NL")}

De factuur is aangemaakt en staat klaar in je Facturen overzicht. Wil je dat ik hem direct verstuur naar de klant?`
  }
  
  if (lowerMessage.includes("prijs") || lowerMessage.includes("bereken")) {
    return `Hier is mijn berekening: 🧮

**Tegelwerk 25m²**
- Arbeid: 25m² × €45/m² = €1.125
- Tegels (gemiddeld): 25m² × €35/m² = €875
- Voegmateriaal & lijm: €125
- Klein materiaal: €75

**Totaal excl. BTW:** €2.200
**BTW (21%):** €462
**Totaal incl. BTW:** €2.662

Dit is een indicatie. Wil je een gedetailleerde offerte maken?`
  }
  
  if (lowerMessage.includes("rapport") || lowerMessage.includes("overzicht")) {
    return `Hier is je financieel overzicht van januari 2026: 📊

**Omzet:** €28.450
**Kosten:** €12.320
**Winst:** €16.130

**Top 3 Klanten:**
1. ABC Corporation - €8.500
2. XYZ Tech - €6.200
3. StartUp Hub - €4.800

**Openstaande facturen:** €4.250 (3 facturen)

Wil je meer details of een specifieke analyse?`
  }
  
  return `Ik begrijp je vraag! Laat me je helpen. 

Ik kan je assisteren met:
• Offertes maken en bewerken
• Facturen genereren
• Prijsberekeningen
• Financiële rapporten
• Klantcommunicatie

Kun je me meer details geven over wat je precies nodig hebt?`
}

export default function AiAssistentPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500))

    const aiResponse = {
      role: "assistant",
      content: getAIResponse(message),
      timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
    }

    setIsTyping(false)
    setMessages(prev => [...prev, aiResponse])
  }

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="AI Assistent" description="Je slimme zakelijke assistent" icon={Sparkles} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* AI Avatar Card */}
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-0.5 mx-auto">
                    <div className="w-full h-full rounded-full bg-card overflow-hidden border-2 border-primary/30 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <motion.div
                    className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <h3 className="font-semibold text-foreground">Nova</h3>
                <p className="text-xs text-muted-foreground">AI Assistent</p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-green-500">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Online
                </div>
              </CardContent>
            </Card>

            {/* Capabilities */}
            <Card className="glass-card">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-3 text-sm">Mogelijkheden</h3>
                <div className="space-y-2">
                  {capabilities.map((cap) => (
                    <div key={cap.title} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                        <cap.icon className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">{cap.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Prompts */}
            <Card className="glass-card">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-3 text-sm">Snelle acties</h3>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt.label}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 bg-transparent text-xs"
                      onClick={() => handlePromptClick(prompt.prompt)}
                    >
                      <prompt.icon className="w-3 h-3 mr-2 shrink-0 text-primary" />
                      <span className="truncate">{prompt.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <Card className="glass-card lg:col-span-3 flex flex-col h-[calc(100vh-220px)]">
            <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === "assistant" 
                            ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30" 
                            : "bg-muted"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <Sparkles className="w-4 h-4 text-primary" />
                        ) : (
                          <User className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 ${
                          msg.role === "assistant"
                            ? "bg-muted/50 rounded-tl-none"
                            : "bg-primary text-primary-foreground rounded-tr-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3 opacity-50" />
                          <span className="text-xs opacity-50">{msg.timestamp}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3">
                        <div className="flex items-center gap-1">
                          <motion.span
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                          />
                          <motion.span
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                          />
                          <motion.span
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2 items-center bg-muted/30 rounded-xl p-2">
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Vraag Nova iets..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  className="bg-transparent border-0 focus-visible:ring-0"
                />
                <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={handleSend} 
                  size="icon"
                  className="shrink-0 bg-primary hover:bg-primary/90"
                  disabled={!message.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
