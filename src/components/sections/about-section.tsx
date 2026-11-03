"use client"

import { Button } from "@/components/ui/button"
import { Tilt } from "@/components/ui/tilt"
import { useTranslations } from "next-intl"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"
import { MapPin } from "lucide-react"

const cvPath = "/files/Resume_CV_NguyenHuynhBaoTrong.pdf"

export default function AboutSection() {
  const t = useTranslations("AboutSection")
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  return (
    <section id="about" className="fullscreen-section relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]"
        />
      </div>

      <div className="can-scroll section-scroll z-10 relative">
        <div ref={ref} className="container mx-auto px-4 w-full max-w-6xl min-h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : { opacity: 0, x: -50, rotateY: 20, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="col-span-1 lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[140px] sm:max-w-[220px] lg:max-w-[300px] aspect-[4/5] rounded-3xl border border-white/10 shadow-2xl">
                <Tilt rotationFactor={8} isRevese className="w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    alt={t("imageAlt")}
                    width={500}
                    height={500}
                    src="/images/avatar-2.jpg"
                    className="w-full h-full object-cover rounded-3xl"
                    priority
                  />
                </Tilt>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : { opacity: 0, x: 50, rotateY: -20, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="col-span-1 lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
            >
              <p className="text-xs sm:text-sm font-bold text-primary mb-2 tracking-[0.2em] uppercase">{t("eyebrow")}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.05]">
                <span>{t("titlePrefix")} </span>
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {t("titleName")}
                </span>
              </h2>
              <p className="mt-2 mb-4 text-lg sm:text-xl font-semibold tracking-tight text-foreground/90">
                {t("titleSuffix")}
              </p>

              <div className="glass-card p-4 sm:p-5 mb-4 text-left">
                <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                  {t("bio")}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a href={cvPath} download="Resume_CV_NguyenHuynhBaoTrong.pdf" aria-label="Download CV">
                  <Button size="default" className="rounded-full px-6 hover:scale-105 transition-transform duration-300">
                    {t("downloadCv")}
                  </Button>
                </a>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t("location")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
