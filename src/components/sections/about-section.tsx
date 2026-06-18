"use client"

import { Button } from "@/components/ui/button"
import { Tilt } from "@/components/ui/tilt"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  return (
    <section id="about" className="fullscreen-section relative pt-16 pb-28">
      {/* Background Elements */}
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

      <div className="can-scroll w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10 relative">
        <div ref={ref} className="container mx-auto px-4 w-full max-w-5xl min-h-full flex flex-col justify-center py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Avatar side */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotateY: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : { opacity: 0, x: -50, rotateY: 20, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end lg:pr-8"
          >
            <div className="relative w-[280px] sm:w-[350px] lg:w-[400px] aspect-square rounded-2xl border border-white/10 shadow-2xl">
              <Tilt rotationFactor={8} isRevese className="w-full h-full rounded-2xl overflow-hidden">
                <Image
                  alt="Bao Trong - Front-end Developer"
                  width={500}
                  height={500}
                  src="/images/avatar-2.jpg"
                  className="w-full h-full object-cover rounded-2xl"
                  priority
                />
              </Tilt>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : { opacity: 0, x: 50, rotateY: -20, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="col-span-1 lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          >
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 tracking-wider uppercase">Who am i?</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance mb-6">
              I'm <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block py-2 px-1">Bao Trong</span>,<br/> a Front-end Developer
            </h3>
            
            <div className="glass-card p-6 md:p-8 mb-8 text-left">
              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base md:text-lg">
                "I'm a frontend developer who loves working with fonts, colors, and making sure
                websites feel welcoming. I enjoy creating simple, clean designs that are easy to use and
                help people have a smooth experience. It's all about making things look nice without
                overcomplicating them!"
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <a href="/CV_NguyenHuynhBaoTrong.pdf" download="CV_NguyenHuynhBaoTrong" aria-label="Download CV">
                <Button size="lg" className="rounded-full px-8 hover:scale-105 transition-transform duration-300">
                  Download CV
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
