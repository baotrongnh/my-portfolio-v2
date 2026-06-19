"use client"

import { motion, useInView } from "motion/react"
import type { Variants } from "motion/react"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Portfolio V2",
    description: "My personal portfolio website featuring a modern, immersive, scroll-based navigation, background music, and smooth animations.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    link: "#",
    github: "#",
    gradient: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with cart management, user authentication, and payment processing integration.",
    tech: ["React", "TypeScript", "Node.js", "Stripe"],
    link: "#",
    github: "#",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Analytics Dashboard",
    description: "A real-time data visualization dashboard for monitoring system performance and user metrics.",
    tech: ["Vue.js", "D3.js", "Firebase", "Tailwind"],
    link: "#",
    github: "#",
    gradient: "from-orange-500/20 to-red-500/20"
  }
]

export default function ProjectSection() {
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
        staggerChildren: 0.2
      }
    }
  } satisfies Variants

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  } satisfies Variants

  return (
    <section id="project" className="fullscreen-section relative pt-16 pb-28" style={{ perspective: "1000px" }}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" />
      </div>

      <div className="can-scroll w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10 relative">
        <div ref={ref} className="container mx-auto px-4 w-full max-w-6xl min-h-full flex flex-col justify-center py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -20, y: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, y: 0 } : { opacity: 0, scale: 0.8, rotateX: -20, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent inline-block py-2 px-1">Projects</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              A selection of my recent work. Highlighting creative solutions and technical capabilities.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl overflow-hidden glass-card h-full flex flex-col"
              >
                {/* Image Placeholder with Gradient */}
                <div className={`h-48 w-full bg-linear-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <motion.div
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <span className="text-white/50 font-mono text-sm tracking-widest uppercase">Project Preview</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 grow leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                    <Button variant="outline" size="sm" className="flex-1 gap-2 rounded-xl" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="px-3 rounded-xl" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
