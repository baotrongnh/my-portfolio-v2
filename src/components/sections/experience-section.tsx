"use client"

import { motion, useInView } from "motion/react"
import { useTranslations } from "next-intl"
import { BriefcaseBusiness, Eye } from "lucide-react"
import { useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ExperienceSection() {
  const t = useTranslations("ExperienceSection")
  const ref = useRef(null)
  const [selectedExperience, setSelectedExperience] = useState<{
    company: string
    role: string
    period: string
    description: string
    responsibilities: string[]
    stack: string
  } | null>(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  const experienceItems = t.raw("experience") as Array<{
    company: string
    role: string
    period: string
    description: string
    responsibilities: string[]
    stack: string
  }>

  return (
    <section id="experience" className="fullscreen-section relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <div className="can-scroll section-scroll z-10 relative">
        <div ref={ref} className="container mx-auto px-4 w-full max-w-6xl min-h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-7 md:mb-8"
          >
            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.22em] text-primary/80 mb-2">
              {t("eyebrow")}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              {t("title")} <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block py-2 px-1">{t("titleHighlight")}</span>
            </h2>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="md:col-span-2"
            >
              <div className="glass-card rounded-3xl p-5 md:p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BriefcaseBusiness className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">{t("experienceTitle")}</h3>
                </div>

                <div className="relative space-y-4 md:space-y-5">
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10 md:left-1/2" />
                  {experienceItems.map((item, index) => (
                    <div
                      key={`${item.company}-${index}`}
                      className="relative grid grid-cols-[12px_minmax(0,1fr)] items-start gap-3 md:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] md:gap-4"
                    >
                      <span className="relative z-10 mt-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_rgba(168,85,247,0.15)] md:col-start-2 md:justify-self-center" />
                      <div className={`min-w-0 ${index % 2 === 0 ? "md:col-start-1 md:row-start-1 md:text-right" : "md:col-start-3 md:row-start-1 md:text-left"}`}>
                        <div className={`mb-1 flex flex-col gap-1 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                          <p className="text-base font-semibold">{item.role}</p>
                          <p className="text-sm text-primary/90">{item.company}</p>
                          <span className="text-xs text-muted-foreground">{item.period}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className={`mt-2 h-8 gap-1.5 rounded-full px-3 text-xs text-primary hover:bg-primary/10 hover:text-primary ${index % 2 === 0 ? "md:ml-auto" : ""}`}
                          onClick={() => setSelectedExperience(item)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          {t("viewDetails")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      <Dialog
        open={selectedExperience !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedExperience(null)
        }}
      >
        <DialogContent className="modal-scrollbar max-h-[85vh] overflow-y-auto border-white/10 bg-[#111018] text-foreground sm:max-w-lg">
          {selectedExperience && (
            <>
              <DialogHeader className="pr-6 text-left">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                  {selectedExperience.company}
                </p>
                <DialogTitle className="text-xl font-semibold">
                  {selectedExperience.role}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedExperience.period}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <p className="text-sm leading-7 text-foreground/80">
                  {selectedExperience.description}
                </p>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t("responsibilities")}
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedExperience.responsibilities.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex gap-2.5 text-sm leading-6 text-foreground/75"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t("technologies")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.stack.split(", ").map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
