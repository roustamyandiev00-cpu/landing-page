"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"

const suggestedPrompts = [
  { icon: FileText, label: "Schrijf een offerte", prompt: "Schrijf een offerte voor een website redesign project" },
  { icon: Receipt, label: "Factuur analyseren", prompt: "Analyseer mijn openstaande facturen en geef advies" },
  { icon: TrendingUp, label: "Financieel rapport", prompt: "Maak een financieel overzicht van deze maand" },
  { icon: Calculator, label: "BTW berekening", prompt: "Help me met de BTW berekening voor Q4 2025" },
]

const chatHistory = [
  {
    role: "assistant",
    content:
      "Hallo! Ik ben je AI Assistent. Ik kan je helpen met het schrijven van offertes, facturen analyseren, financiële rapporten maken en nog veel meer. Waar kan ik je vandaag mee helpen?",
    timestamp: "10:00",
  },
  {
    role: "user",
    content: "Kun je mijn openstaande facturen analyseren?",
    timestamp: "10:02",
  },
  {
    role: "assistant",
    content:
      "Natuurlijk! Ik heb je openstaande facturen geanalyseerd. Hier is een samenvatting:\n\n**Totaal Openstaand:** €12.800\n**Aantal Facturen:** 5\n**Gemiddelde Ouderdom:** 18 dagen\n\n**Aandachtspunten:**\n- Factuur FAC-2025-089 van Global Industries (€3.200) is 12 dagen over de vervaldatum\n- 2 facturen naderen hun vervaldatum binnen 7 dagen\n\n**Aanbeveling:** Stuur een vriendelijke herinnering naar Global Industries. Zal ik een concept e-mail voor je opstellen?",
    timestamp: "10:02",
  },
]

const capabilities = [
  { icon: FileText, title: "Offertes & Facturen", description: "Automatisch opstellen en analyseren" },
  { icon: MessageSquare, title: "Klantcommunicatie", description: "Professionele e-mails schrijven" },
  { icon: TrendingUp, title: "Financiële Analyse", description: "Inzichten en rapporten genereren" },
  { icon: Lightbulb, title: "Bedrijfsadvies", description: "Strategische aanbevelingen" },
]

export default function AiAssistentPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(chatHistory)

  const handleSend = () => {
    if (!message.trim()) return

    setMessages([
      ...messages,
      {
        role: "user",
        content: message,
        timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setMessage("")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader title="AI Assistent" description="Je slimme zakelijke assistent" icon={Sparkles} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Capabilities Sidebar */}
          <div className="space-y-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-4">Mogelijkheden</h3>
                <div className="space-y-3">
                  {capabilities.map((cap) => (
                    <div key={cap.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <cap.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{cap.title}</p>
                        <p className="text-xs text-muted-foreground">{cap.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-4">Snelle Prompts</h3>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt.label}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 bg-transparent"
                      onClick={() => setMessage(prompt.prompt)}
                    >
                      <prompt.icon className="w-4 h-4 mr-2 shrink-0" />
                      <span className="truncate">{prompt.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <Card className="glass-card lg:col-span-3 flex flex-col h-[calc(100vh-220px)]">
            <CardContent className="flex-1 flex flex-col p-4">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "assistant" ? "bg-primary/20" : "bg-muted"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Bot className="w-4 h-4 text-primary" />
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
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-3">
                <Input
                  placeholder="Stel een vraag of geef een opdracht..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="bg-muted/50 border-0"
                />
                <Button onClick={handleSend} className="bg-primary hover:bg-primary/90">
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
