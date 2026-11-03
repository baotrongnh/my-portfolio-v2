"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { motion, useInView } from "motion/react"
import type { Variants } from "motion/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Project = {
  key: string
  title: string
  role: string
  duration: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  gradient: string
  thumbnail: string
}

type ProjectDialogView =
  | { type: "overview" }
  | { type: "project"; project: Project }
  | null

const projectThumbnails: Record<string, string> = {
  homeiq: "/images/homeiq-project-thumb.png",
  lensor: "/images/lensor-project-thumb.png",
  "phu-cuong-logistics": "/images/phucuong-project-thumb.png",
}

function ProjectCard({
  project,
  viewProjectLabel,
  compact = false,
  onSelect,
}: {
  project: Project
  viewProjectLabel: string
  compact?: boolean
  onSelect: (project: Project) => void
}) {
  const visibleTechnologies = project.technologies.slice(0, 2)
  const additionalTechnologyCount = project.technologies.length - visibleTechnologies.length

  return (
    <article className="glass-card group relative flex h-full flex-col overflow-hidden transition-colors hover:border-primary/30">
      <button
        type="button"
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-label={`${viewProjectLabel}: ${project.title}`}
        onClick={() => onSelect(project)}
      />
      <div className={`relative aspect-video w-full overflow-hidden bg-linear-to-br ${project.gradient}`}>
        <Image
          src={project.thumbnail}
          alt={`${project.title} project`}
          fill
          sizes={compact ? "(max-width: 479px) 50vw, (max-width: 1023px) 50vw, 33vw" : "(max-width: 639px) 90vw, 45vw"}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      <div className={`flex grow flex-col ${compact ? "p-2 sm:p-4" : "p-4 sm:p-5"}`}>
        <div className="mb-1 min-w-0 sm:mb-2">
          <h3 className="truncate text-xs font-bold transition-colors group-hover:text-primary sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-0.5 truncate text-[9px] leading-tight text-primary/90 sm:text-xs">
            {project.role}
          </p>
          {!compact && (
            <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-muted-foreground sm:text-[10px] sm:tracking-[0.12em]">
              {project.duration}
            </p>
          )}
        </div>

        <p className="mb-2 truncate text-[9px] leading-snug text-muted-foreground sm:mb-3 sm:text-xs sm:leading-relaxed">
          {project.description}
        </p>

        <div className="mb-1 flex min-w-0 flex-nowrap items-center gap-1 overflow-hidden sm:mb-2 sm:gap-1.5">
          {visibleTechnologies.map((technology) => (
            <span
              key={`${project.key}-${technology}`}
              className={`rounded-md border border-primary/10 bg-primary/10 font-medium text-primary/90 ${compact ? "shrink truncate px-1.5 py-0.5 text-[8px] sm:px-2 sm:py-1 sm:text-[10px]" : "px-2 py-1 text-[10px]"}`}
            >
              {technology}
            </span>
          ))}
          {additionalTechnologyCount > 0 && (
            <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground sm:px-2 sm:py-1 sm:text-[10px]">
              +{additionalTechnologyCount}
            </span>
          )}
        </div>
        <p className="pointer-events-none relative z-20 mt-auto border-t border-white/5 pt-1.5 text-[9px] font-medium text-primary/80 sm:pt-2 sm:text-[10px]">
          {viewProjectLabel}
        </p>
      </div>
    </article>
  )
}

export default function ProjectSection() {
  const t = useTranslations("ProjectSection")
  const ref = useRef(null)
  const [dialogView, setDialogView] = useState<ProjectDialogView>(null)
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" })

  const rawProjects = t.raw("projects") as Record<
    string,
    Omit<Project, "key" | "gradient" | "thumbnail"> & { gradient?: string }
  >
  const projects: Project[] = Object.entries(rawProjects).map(([key, value]) => ({
    key,
    ...value,
    gradient: value.gradient ?? "from-primary/20 to-violet-500/20",
    thumbnail: projectThumbnails[key] ?? "/images/blank-project-thumb.png",
  }))

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
        staggerChildren: 0.2,
      },
    },
  } satisfies Variants

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  } satisfies Variants

  return (
    <section id="project" className="fullscreen-section relative" style={{ perspective: "1000px" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />
      </div>

      <div className="can-scroll section-scroll relative z-10">
        <div ref={ref} className="container mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -20, y: -20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, y: 0 } : { opacity: 0, scale: 0.8, rotateX: -20, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 text-center md:mb-8"
          >
            <h2 className="mb-2 text-2xl font-bold md:text-4xl">
              {t("title")}{" "}
              <span className="inline-block bg-linear-to-r from-primary to-purple-500 bg-clip-text px-1 py-2 text-transparent">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="mx-auto hidden max-w-2xl text-sm text-muted-foreground md:text-base sm:block">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
          >
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.key}
                variants={itemVariants}
                className={index === 3 ? "sm:hidden" : undefined}
              >
                <ProjectCard
                  project={project}
                  viewProjectLabel={t("viewProject")}
                  compact
                  onSelect={(selectedProject) => setDialogView({ type: "project", project: selectedProject })}
                />
              </motion.div>
            ))}
          </motion.div>
          {projects.length > 3 && (
            <div className="mt-5 flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 rounded-full px-5"
                aria-haspopup="dialog"
                onClick={() => setDialogView({ type: "overview" })}
              >
                {t("viewMore")}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={dialogView !== null}
        onOpenChange={(open) => {
          if (!open) setDialogView(null)
        }}
      >
        <DialogContent className="modal-scrollbar max-h-[88vh] overflow-y-auto border-white/10 bg-[#111018] text-foreground sm:max-w-5xl">
          {dialogView?.type === "overview" ? (
            <>
              <DialogHeader className="pr-6 text-left">
                <DialogTitle className="text-xl font-semibold sm:text-2xl">
                  {t("allProjects")}
                </DialogTitle>
                <DialogDescription>{t("allProjectsDescription")}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.key}
                    project={project}
                    viewProjectLabel={t("viewProject")}
                    onSelect={(selectedProject) => setDialogView({ type: "project", project: selectedProject })}
                  />
                ))}
              </div>
            </>
          ) : dialogView?.type === "project" ? (
            <>
              <DialogHeader className="pr-6 text-left">
                <DialogTitle className="text-xl font-semibold sm:text-2xl">
                  {dialogView.project.title}
                </DialogTitle>
                <DialogDescription>
                  {dialogView.project.role} · {dialogView.project.duration}
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={dialogView.project.thumbnail}
                  alt={`${dialogView.project.title} project`}
                  fill
                  sizes="(max-width: 639px) 90vw, 800px"
                  className="object-cover object-center"
                />
              </div>
              <p className="text-sm leading-7 text-foreground/80">
                {dialogView.project.description}
              </p>
              <div className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("technologies")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dialogView.project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {dialogView.project.link && (
                  <Button className="gap-2" asChild>
                    <a href={dialogView.project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {t("liveDemo")}
                    </a>
                  </Button>
                )}
                {dialogView.project.github && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={dialogView.project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      {t("githubRepository")}
                    </a>
                  </Button>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() => setDialogView({ type: "overview" })}
              >
                {t("backToProjects")}
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
