"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type AiActionType = "suggestion" | "automation" | "warning" | "info" | "success"

export interface AiLog {
    id: string
    type: AiActionType
    message: string
    timestamp: Date
    context: string // e.g., "invoice", "dashboard", "quote"
    actionTaken?: string
}

export interface AiSuggestion {
    id: string
    type: AiActionType
    title: string
    message: string
    actionLabel?: string
    onAction?: () => void
    onDismiss?: () => void
    context: "dashboard" | "invoice" | "quote" | "expense" | "customer"
    riskLevel?: "low" | "medium" | "high"
}

interface AiContextType {
    suggestions: AiSuggestion[]
    logs: AiLog[]
    aiLevel: "suggestion" | "semi-auto" | "auto"
    setAiLevel: (level: "suggestion" | "semi-auto" | "auto") => void
    addLog: (log: Omit<AiLog, "id" | "timestamp">) => void
    dismissSuggestion: (id: string) => void
    generateDailyInsights: () => void
}

const AiContext = createContext<AiContextType | undefined>(undefined)

export function AiProvider({ children }: { children: React.ReactNode }) {
    const [aiLevel, setAiLevel] = useState<"suggestion" | "semi-auto" | "auto">("semi-auto")
    const [logs, setLogs] = useState<AiLog[]>([])
    const [suggestions, setSuggestions] = useState<AiSuggestion[]>([])

    const addLog = React.useCallback((log: Omit<AiLog, "id" | "timestamp">) => {
        const newLog: AiLog = {
            ...log,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date(),
        }
        setLogs((prev) => [newLog, ...prev])
    }, [])

    const dismissSuggestion = React.useCallback((id: string) => {
        setSuggestions((prev) => prev.filter((s) => s.id !== id))
        addLog({
            type: "info",
            message: "Suggestie genegeerd door gebruiker",
            context: "ai-governance",
            actionTaken: "dismissed",
        })
    }, [addLog])

    // Simulate generating daily insights on mount
    const generateDailyInsights = React.useCallback(() => {
        const newSuggestions: AiSuggestion[] = [
            {
                id: "daily-1",
                type: "warning",
                title: "Cashflow Risico",
                message: "€3.240 openstaand (> 30 dagen). Stuur herinneringen om cashflow te verbeteren.",
                actionLabel: "Stuur herinneringen",
                context: "dashboard",
                riskLevel: "medium",
                onAction: () => {
                    addLog({
                        type: "automation",
                        message: "Bulk herinneringen verstuurd voor 2 facturen",
                        context: "dashboard",
                        actionTaken: "reminders_sent",
                    })
                    dismissSuggestion("daily-1")
                },
            },
            {
                id: "daily-2",
                type: "info",
                title: "BTW Update",
                message: "BTW aangifte over 9 dagen. Verwachte afdracht: €1.240.",
                actionLabel: "Bereid aangifte voor",
                context: "dashboard",
                onAction: () => {
                    addLog({
                        type: "suggestion",
                        message: "BTW voorbereiding gestart",
                        context: "dashboard",
                        actionTaken: "vat_prep_started",
                    })
                    dismissSuggestion("daily-2")
                }
            }
        ]
        setTimeout(() => setSuggestions(newSuggestions), 0)
    }, [addLog, dismissSuggestion])

    useEffect(() => {
        generateDailyInsights()
    }, [generateDailyInsights])

    return (
        <AiContext.Provider
            value={{
                suggestions,
                logs,
                aiLevel,
                setAiLevel,
                addLog,
                dismissSuggestion,
                generateDailyInsights,
            }}
        >
            {children}
        </AiContext.Provider>
    )
}

export function useAi() {
    const context = useContext(AiContext)
    if (context === undefined) {
        throw new Error("useAi must be used within an AiProvider")
    }
    return context
}
