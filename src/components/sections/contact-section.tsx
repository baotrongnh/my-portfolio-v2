"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  return (
    <section id="contact" className="fullscreen-section relative pt-16 pb-28" style={{ perspective: "1000px" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-primary/10 rounded-[100%] blur-[120px]" />
      </div>

      <div className="can-scroll w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10 relative">
        <div ref={ref} className="container mx-auto px-4 w-full max-w-5xl min-h-full flex flex-col justify-center py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20, rotateX: -20, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: -20, rotateX: -20, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block py-2 px-1">Connect</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Open for opportunities, collaborations, or just a friendly chat about web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 lg:gap-8 justify-center"
          >
            <div className="glass-card p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                  <a href="mailto:hello@baotrong.dev" className="text-lg font-semibold hover:text-primary transition-colors">
                    hello@baotrong.dev
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                  <p className="text-lg font-semibold">Vietnam</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                  <a href="tel:+84123456789" className="text-lg font-semibold hover:text-primary transition-colors">
                    +84 123 456 789
                  </a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 justify-center lg:justify-start mt-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "https://github.com/baotrongnh" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-card hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form className="glass-card p-6 md:p-8 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-semibold mb-2">Send a message</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground pl-1">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground pl-1">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground pl-1">Message</label>
                <textarea 
                  placeholder="How can I help you?"
                  rows={4}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground resize-none"
                />
              </div>

              <Button className="w-full mt-2 gap-2 h-12 text-base rounded-xl">
                Send Message <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
