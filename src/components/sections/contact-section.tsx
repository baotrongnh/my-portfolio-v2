"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Send, Github, Facebook } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ContactSection() {
  const t = useTranslations("ContactSection")
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  return (
    <section id="contact" className="fullscreen-section relative" style={{ perspective: "1000px" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-primary/10 rounded-[100%] blur-[120px]" />
      </div>

      <div className="can-scroll section-scroll z-10 relative">
        <div ref={ref} className="container mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center px-4 py-4 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20, rotateX: -20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: -20, rotateX: -20, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-3 text-center sm:mb-5 md:mb-8"
          >
            <h2 className="mb-1 text-2xl font-bold sm:mb-2 md:text-4xl">
              {t("titlePrefix")} <span className="inline-block bg-gradient-to-r from-primary to-purple-500 bg-clip-text px-1 py-1 text-transparent">{t("titleHighlight")}</span>
            </h2>
            <p className="mx-auto line-clamp-2 max-w-2xl text-[10px] text-muted-foreground sm:line-clamp-none sm:text-sm md:text-base">
              {t("description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center gap-2 sm:gap-3 lg:gap-6"
            >
              <div className="glass-card grid grid-cols-2 gap-x-3 gap-y-2 p-3 sm:flex sm:flex-col sm:gap-3 sm:p-4">
                <div className="group flex min-w-0 items-center gap-1.5 sm:items-start sm:gap-2">
                  <div className="rounded-lg bg-primary/10 p-1.5 text-primary transition-transform group-hover:scale-110 sm:rounded-xl sm:p-2">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-0.5 text-[9px] font-medium text-muted-foreground sm:text-xs">{t("email")}</h4>
                    <a href="mailto:nhbaotrong@gmail.com" className="break-all text-[9px] font-semibold transition-colors hover:text-primary sm:text-sm">
                      nhbaotrong@gmail.com
                    </a>
                  </div>
                </div>

                <div className="group flex min-w-0 items-center gap-1.5 sm:items-start sm:gap-2">
                  <div className="rounded-lg bg-primary/10 p-1.5 text-primary transition-transform group-hover:scale-110 sm:rounded-xl sm:p-2">
                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-0.5 text-[9px] font-medium text-muted-foreground sm:text-xs">{t("location")}</h4>
                    <p className="text-[9px] font-semibold sm:text-sm">{t("locationValue")}</p>
                  </div>
                </div>

                <div className="group col-span-2 flex min-w-0 items-center gap-1.5 sm:col-span-1 sm:items-start sm:gap-2">
                  <div className="rounded-lg bg-primary/10 p-1.5 text-primary transition-transform group-hover:scale-110 sm:rounded-xl sm:p-2">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-0.5 text-[9px] font-medium text-muted-foreground sm:text-xs">{t("phone")}</h4>
                    <a href="tel:+84332667829" className="text-[10px] font-semibold transition-colors hover:text-primary sm:text-sm">
                      +84 332 667 829
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 sm:justify-start">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com/baotrongnh" },
                  { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/baotrong.nguyenhuynh.52/" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-1.5 glass-card transition-all duration-300 hover:-translate-y-1 hover:bg-primary/20 hover:text-primary sm:p-2"
                    aria-label={social.href.includes("github") ? "GitHub" : "Facebook"}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form className="glass-card flex flex-col gap-2 p-3 sm:p-4" onSubmit={(e) => e.preventDefault()}>
                <h3 className="mb-0.5 text-sm font-semibold sm:text-lg">{t("sendMessage")}</h3>

                <div className="grid grid-cols-2 gap-2">
                  <div className="min-w-0 space-y-1">
                    <label htmlFor="contact-name" className="pl-1 text-[9px] font-medium text-muted-foreground sm:text-xs">{t("name")}</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t("namePlaceholder")}
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-[10px] text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs"
                    />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <label htmlFor="contact-email" className="pl-1 text-[9px] font-medium text-muted-foreground sm:text-xs">{t("email")}</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-[10px] text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-message" className="pl-1 text-[9px] font-medium text-muted-foreground sm:text-xs">{t("message")}</label>
                  <textarea
                    id="contact-message"
                    placeholder={t("messagePlaceholder")}
                    rows={2}
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-[10px] text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 sm:rounded-xl sm:px-3 sm:py-2 sm:text-xs"
                  />
                </div>

                <Button className="mt-1 h-8 w-full gap-2 rounded-lg text-xs sm:h-9 sm:rounded-xl sm:text-sm">
                  {t("submit")} <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
