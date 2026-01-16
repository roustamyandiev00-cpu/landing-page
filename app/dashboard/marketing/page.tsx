"use client"

import { useState } from "react"
import { WavespeedSimple } from "../../../components/wavespeed-simple"

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Marketing Content Generator</h1>
      </div>
      
      <WavespeedSimple />
    </div>
  )
}
