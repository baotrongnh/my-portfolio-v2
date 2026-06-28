"use client"

import { cn } from "@/lib/utils"
import {
  CodeXml,
  FolderGit2,
  Home,
  Mail,
  User,
  Wrench,
} from "lucide-react"
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { useActiveSection, type SectionId } from "./active-section-context"

const DOCK_ITEMS: { titleKey: string; icon: React.ReactNode; target: SectionId }[] = [
  { titleKey: "home", icon: <Home />, target: "hero" },
  { titleKey: "about", icon: <User />, target: "about" },
  { titleKey: "skills", icon: <Wrench />, target: "skill" },
  { titleKey: "projects", icon: <FolderGit2 />, target: "project" },
  { titleKey: "contact", icon: <Mail />, target: "contact" },
]

export function Dock() {
  return (
    <div className="w-full flex justify-center">
      <div className="fixed bottom-3 z-[90]">
        <FloatingDockDesktop />
        <FloatingDockMobile />
      </div>
    </div>
  )
}

function FloatingDockDesktop() {
  const t = useTranslations("Dock")
  const mouseX = useMotionValue(Infinity)
  const [isHovered, setIsHovered] = useState(false)
  const { activeSection } = useActiveSection()

  return (
    <>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden md:block fixed inset-0 backdrop-blur-xs z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => {
          mouseX.set(Infinity)
          setIsHovered(false)
        }}
        onMouseEnter={() => setIsHovered(true)}
        className={cn(
          "mx-auto hidden h-18 items-end gap-5 rounded-2xl px-6 pb-4 md:flex",
          "bg-gray-50 dark:bg-neutral-900/60 backdrop-blur-2xl relative z-50"
        )}
      >
        <AnimatePresence mode="wait">
          {DOCK_ITEMS.map((item) => (
            <IconContainer
              mouseX={mouseX}
              key={item.target}
              title={t(item.titleKey)}
              icon={item.icon}
              target={item.target}
              isActive={item.target === activeSection}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

function FloatingDockMobile() {
  const t = useTranslations("Dock")
  const [open, setOpen] = useState(false)
  const { activeSection, scrollToSection } = useActiveSection()

  return (
    <div className="relative block md:hidden">
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 backdrop-blur-xs z-40"
            />
            <motion.div
              layoutId="nav"
              className="absolute inset-x-[-3] bottom-full mb-2 flex flex-col gap-2 z-50"
            >
              {DOCK_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.target}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{ delay: (DOCK_ITEMS.length - 1 - idx) * 0.05 }}
                >
                  <button
                    onClick={() => {
                      scrollToSection(item.target)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full",
                      item.target === activeSection
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-50 dark:bg-neutral-900"
                    )}
                    aria-label={t("goTo", { section: t(item.titleKey) })}
                  >
                    <div>{item.icon}</div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800 z-50 relative"
        aria-label={t("toggleNavigation")}
        aria-expanded={open}
      >
        <CodeXml />
      </button>
    </div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  target,
  isActive,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  target: SectionId
  isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollToSection } = useActiveSection()

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 })
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 })
  const widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 })
  const heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 })

  const [hovered, setHovered] = useState(false)

  return (
    <button onClick={() => scrollToSection(target)} aria-label={`Go to ${title}`}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors duration-300",
          isActive
            ? "bg-primary shadow-lg shadow-primary/25"
            : "bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key={`${target}-${isActive}`}
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            "flex items-center justify-center transition-colors duration-300",
            isActive ? "text-primary-foreground" : ""
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </button>
  )
}
