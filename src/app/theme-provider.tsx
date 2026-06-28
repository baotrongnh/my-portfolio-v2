"use client"

import { useEffect } from "react"

export function ThemeProvider({
     children,
     defaultTheme = "dark",
}: {
     children: React.ReactNode
     defaultTheme?: "dark" | "light" | "system"
}) {
     useEffect(() => {
          const root = document.documentElement
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
          const shouldUseDark = defaultTheme === "dark" || (defaultTheme === "system" && prefersDark)

          root.classList.toggle("dark", shouldUseDark)
          root.style.colorScheme = shouldUseDark ? "dark" : "light"
     }, [defaultTheme])

     return <>{children}</>
}
