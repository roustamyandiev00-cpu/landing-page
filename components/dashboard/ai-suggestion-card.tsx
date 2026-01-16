"use client"

import { Sparkles, X, ArrowRight, AlertTriangle, Info, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAi, AiSuggestion } from "@/lib/ai-context"

interface AiSuggestionCardProps {
    suggestion: AiSuggestion
    compact?: boolean
}

export function AiSuggestionCard({ suggestion, compact = false }: AiSuggestionCardProps) {
    const { dismissSuggestion } = useAi()

    const getIcon = () => {
        switch (suggestion.type) {
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-orange-500" />
            case "automation":
                return <Sparkles className="w-5 h-5 text-purple-500" />
            case "success":
                return <CheckCircle2 className="w-5 h-5 text-green-500" />
            default:
                return <Info className="w-5 h-5 text-blue-500" />
        }
    }

    const getBgColor = () => {
        switch (suggestion.type) {
            case "warning":
                return "bg-orange-500/10 border-orange-500/20"
            case "automation":
                return "bg-purple-500/10 border-purple-500/20"
            case "success":
                return "bg-green-500/10 border-green-500/20"
            default:
                return "bg-blue-500/10 border-blue-500/20"
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
                "relative rounded-xl border p-4 flex gap-4 transition-all hover:shadow-md",
                getBgColor(),
                compact ? "p-3" : "p-4"
            )}
        >
            <div className="shrink-0 mt-0.5">{getIcon()}</div>

            <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-sm text-foreground">{suggestion.title}</h4>
                    <button
                        onClick={() => dismissSuggestion(suggestion.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion.message}
                </p>

                {suggestion.actionLabel && (
                    <div className="pt-2">
                        <Button
                            size="sm"
                            onClick={suggestion.onAction}
                            className={cn(
                                "h-8 text-xs gap-2",
                                suggestion.type === "warning" ? "bg-orange-500 hover:bg-orange-600 text-white" :
                                    suggestion.type === "automation" ? "bg-purple-600 hover:bg-purple-700 text-white" :
                                        "bg-blue-600 hover:bg-blue-700 text-white"
                            )}
                        >
                            {suggestion.type === "automation" && <Sparkles className="w-3 h-3" />}
                            {suggestion.actionLabel}
                            <ArrowRight className="w-3 h-3" />
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
