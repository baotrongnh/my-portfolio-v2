"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { useActiveSection, type SectionId } from "./active-section-context"
import { AnimatePresence, motion } from "motion/react"
import type { Variants } from "motion/react"

const SECTION_IDS: SectionId[] = ["hero", "about", "skill", "project", "contact"]

interface ScrollContainerProps {
  children: React.ReactNode
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  const { activeSection, setActiveSection } = useActiveSection()
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for down, -1 for up

  const touchStartY = useRef(0)
  const touchStartAtBottom = useRef(true)
  const touchStartAtTop = useRef(true)

  const activeIndex = SECTION_IDS.indexOf(activeSection)
  const sections = React.Children.toArray(children)

  const handleNext = useCallback(() => {
    if (activeIndex < SECTION_IDS.length - 1) {
      setDirection(1)
      setActiveSection(SECTION_IDS[activeIndex + 1])
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }, [activeIndex, setActiveSection])

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1)
      setActiveSection(SECTION_IDS[activeIndex - 1])
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }, [activeIndex, setActiveSection])

  const onWheel = (e: React.WheelEvent) => {
    if (isAnimating) return

    const target = e.target as HTMLElement
    const scrollable = target.closest('.can-scroll') as HTMLElement

    if (scrollable) {
      const isAtBottom = Math.abs(scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight) <= 2
      const isAtTop = scrollable.scrollTop <= 0

      // If scrolling down but not at bottom, let native scroll handle it
      if (e.deltaY > 0 && !isAtBottom) return
      // If scrolling up but not at top, let native scroll handle it
      if (e.deltaY < 0 && !isAtTop) return
    }

    if (e.deltaY > 40) handleNext()
    else if (e.deltaY < -40) handlePrev()
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY

    const target = e.target as HTMLElement
    const scrollable = target.closest('.can-scroll') as HTMLElement

    if (scrollable) {
      // Record if the container was already at the boundaries when the touch started
      touchStartAtBottom.current = Math.abs(scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight) <= 2
      touchStartAtTop.current = scrollable.scrollTop <= 0
    } else {
      touchStartAtBottom.current = true
      touchStartAtTop.current = true
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (isAnimating) return

    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchStartY.current - touchEndY

    // Only slide if the swipe distance is significant AND 
    // the container was already at the corresponding boundary when the swipe started
    if (deltaY > 50 && touchStartAtBottom.current) {
      handleNext()
    } else if (deltaY < -50 && touchStartAtTop.current) {
      handlePrev()
    }
  }

  const variants = {
    initial: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      rotateX: direction > 0 ? -10 : 10,
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      rotateX: direction > 0 ? 10 : -10,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  } satisfies Variants

  // Just lock body scroll to prevent standard page scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Listen to keyboard up/down arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return
      if (e.key === "ArrowDown" || e.key === "PageDown") handleNext()
      if (e.key === "ArrowUp" || e.key === "PageUp") handlePrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleNext, handlePrev, isAnimating])

  return (
    <div
      className="w-screen h-dvh overflow-hidden relative"
      style={{ perspective: "1000px" }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeSection}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {sections[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
