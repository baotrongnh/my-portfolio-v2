"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type SectionId = "hero" | "about" | "skill" | "project" | "contact"

interface ActiveSectionContextType {
  activeSection: SectionId
  setActiveSection: (section: SectionId) => void
  scrollToSection: (section: SectionId) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null)

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("hero")

  const scrollToSection = useCallback((section: SectionId) => {
    setActiveSection(section)
  }, [])

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection, scrollToSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext)
  if (!context) {
    throw new Error("useActiveSection must be used within an ActiveSectionProvider")
  }
  return context
}
