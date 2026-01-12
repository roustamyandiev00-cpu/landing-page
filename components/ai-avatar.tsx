"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface AIAvatarProps {
  isTyping?: boolean
  message?: string
  size?: "sm" | "md" | "lg"
}

export function AIAvatar({ isTyping = false, message, size = "md" }: AIAvatarProps) {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (message) {
      setShowMessage(true)
    }
  }, [message])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        animate={isTyping ? { y: [0, -5, 0] } : {}}
        transition={{ repeat: isTyping ? Infinity : 0, duration: 1 }}
      >
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-1`}>
          <div className="w-full h-full rounded-full bg-card overflow-hidden border-2 border-primary/30">
            <Image
              src="/ai-avatar.png"
              alt="AI Assistent"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Online indicator */}
        <motion.div
          className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>

      {/* Typing indicator */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex items-center gap-1 bg-muted px-3 py-2 rounded-full"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech bubble */}
      <AnimatePresence>
        {showMessage && message && !isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tl-none max-w-xs text-sm"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
