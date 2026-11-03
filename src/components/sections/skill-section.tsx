"use client"

import { motion, useInView } from "motion/react"
import type { Variants } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import {
  Braces,
  Code2,
  Database,
  Layers3,
  Paintbrush,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react"

const skills = [
  { key: "languages", icon: Braces, tone: "text-sky-300", glow: "bg-sky-400/10" },
  { key: "frontend", icon: Code2, tone: "text-violet-300", glow: "bg-violet-400/10" },
  { key: "styling", icon: Paintbrush, tone: "text-pink-300", glow: "bg-pink-400/10" },
  { key: "backend", icon: Server, tone: "text-emerald-300", glow: "bg-emerald-400/10" },
  { key: "databases", icon: Database, tone: "text-amber-300", glow: "bg-amber-400/10" },
  { key: "state", icon: Workflow, tone: "text-cyan-300", glow: "bg-cyan-400/10" },
  { key: "ai", icon: Sparkles, tone: "text-fuchsia-300", glow: "bg-fuchsia-400/10" },
  { key: "tools", icon: Layers3, tone: "text-orange-300", glow: "bg-orange-400/10" },
] as const

export default function SkillSection() {
  const t = useTranslations("SkillSection")
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  const containerVariants = {
    hidden: { opacity: 0, rotateX: 20, y: 50, scale: 0.96 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.08,
      },
    },
  } satisfies Variants

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  } satisfies Variants

  return (
    <section id="skill" className="fullscreen-section relative" style={{ perspective: "1000px" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-64 w-64 rounded-full bg-primary/5 blur-[80px] animate-float" />
        <div className="absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-blue-500/5 blur-[100px] animate-float-slow" />
      </div>

      <div className="can-scroll section-scroll relative z-10">
        <div ref={ref} className="container mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4 py-3 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-2 text-center sm:mb-5 md:mb-7"
          >
            <h2 className="mb-2 text-2xl font-bold md:text-4xl">
              {t("title")}{" "}
              <span className="inline-block bg-linear-to-r from-primary to-purple-500 bg-clip-text px-1 py-1 text-transparent">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="mx-auto hidden max-w-2xl text-sm text-muted-foreground sm:block md:text-base">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-1.5 min-[360px]:grid-cols-2 sm:gap-3 lg:grid-cols-4"
          >
            {skills.map((skill, index) => {
              const items = t.raw(`skills.${skill.key}.items`) as string[]
              const Icon = skill.icon

              return (
                <motion.article
                  key={skill.key}
                  variants={itemVariants}
                  className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101018]/80 p-2 shadow-[0_12px_35px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-[#14131e] sm:p-4"
                >
                  <div className={`pointer-events-none absolute -right-8 -top-8 -z-10 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-150 ${skill.glow}`} />
                  <div className="mb-1.5 flex items-start justify-between gap-2 sm:mb-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] sm:h-9 sm:w-9 sm:rounded-xl ${skill.tone}`}>
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.16em] text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-1 min-h-6 text-[10px] font-semibold leading-3 text-foreground sm:mb-2 sm:min-h-8 sm:text-xs sm:leading-snug">
                    {t(`skills.${skill.key}.category`)}
                  </h3>
                  <p className="mt-auto text-[8px] leading-3 text-foreground/65 sm:hidden">
                    {items.join(" · ")}
                  </p>
                  <div className="mt-auto hidden flex-wrap gap-1 sm:flex">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[9px] leading-none text-foreground/75 transition-colors group-hover:border-primary/20 group-hover:bg-primary/[0.07] sm:text-[10px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
