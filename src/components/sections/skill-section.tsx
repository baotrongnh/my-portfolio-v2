"use client"

import { motion, useInView } from "motion/react"
import type { Variants } from "motion/react"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import {
  Code2,
  Paintbrush,
  Terminal,
  Layout,
  Database,
  Globe
} from "lucide-react"

const skills = [
  {
    key: "frontend",
    icon: <Code2 className="w-6 h-6 text-primary" />,
  },
  {
    key: "styling",
    icon: <Paintbrush className="w-6 h-6 text-blue-400" />,
  },
  {
    key: "architecture",
    icon: <Layout className="w-6 h-6 text-green-400" />,
  },
  {
    key: "tools",
    icon: <Terminal className="w-6 h-6 text-orange-400" />,
  },
  {
    key: "backend",
    icon: <Database className="w-6 h-6 text-purple-400" />,
  },
  {
    key: "optimization",
    icon: <Globe className="w-6 h-6 text-teal-400" />,
  }
] as const

export default function SkillSection() {
  const t = useTranslations("SkillSection")
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  const containerVariants = {
    hidden: { opacity: 0, rotateX: 20, y: 100, scale: 0.9, z: -100 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.15
      }
    }
  } satisfies Variants

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  } satisfies Variants

  return (
    <section id="skill" className="fullscreen-section relative" style={{ perspective: "1000px" }}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] animate-float-slow" />
      </div>

      <div className="can-scroll section-scroll z-10 relative">
        <div ref={ref} className="container mx-auto px-4 w-full max-w-6xl min-h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: -20 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: -20, rotateX: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t("title")} <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block py-2 px-1">{t("titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.key}
                variants={itemVariants}
                className="glass-card p-6 flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{t(`skills.${skill.key}.category`)}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {(t.raw(`skills.${skill.key}.items`) as string[]).map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-foreground/80 group-hover:border-primary/30 transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
