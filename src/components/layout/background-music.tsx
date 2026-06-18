"use client"

import { cn } from "@/lib/utils"
import { Volume2, VolumeX } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Try to play audio after user interaction
  useEffect(() => {
    // Check localStorage for mute preference
    const savedMute = localStorage.getItem("nhbt-music-muted")
    if (savedMute === "true") {
      setIsMuted(true)
    }

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        const audio = audioRef.current
        if (audio) {
          const savedMuteState = localStorage.getItem("nhbt-music-muted") === "true"
          audio.muted = savedMuteState
          audio.volume = 0.3
          audio.play().then(() => {
            setIsPlaying(true)
          }).catch(() => {
            // Autoplay failed, user will need to click the button
          })
        }
      }
    }

    // Listen for any user interaction
    window.addEventListener("click", handleInteraction, { once: true })
    window.addEventListener("keydown", handleInteraction, { once: true })
    window.addEventListener("touchstart", handleInteraction, { once: true })
    window.addEventListener("scroll", handleInteraction, { once: true })

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
      window.removeEventListener("scroll", handleInteraction)
    }
  }, [hasInteracted])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    // If not playing yet, try to play
    if (!isPlaying) {
      audio.muted = false
      audio.volume = 0.3
      audio.play().then(() => {
        setIsPlaying(true)
        setIsMuted(false)
        localStorage.setItem("nhbt-music-muted", "false")
      }).catch(() => {})
      return
    }

    const newMuted = !isMuted
    audio.muted = newMuted
    setIsMuted(newMuted)
    localStorage.setItem("nhbt-music-muted", String(newMuted))
  }, [isMuted, isPlaying])

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
      />

      {/* Mute/Unmute Button — Top Left */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        onClick={toggleMute}
        className={cn(
          "fixed top-5 left-5 z-[100] flex items-center justify-center",
          "w-11 h-11 rounded-full",
          "bg-white/5 backdrop-blur-xl border border-white/10",
          "hover:bg-white/10 hover:border-white/20 hover:scale-110",
          "transition-all duration-300 ease-out",
          "group cursor-pointer"
        )}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {/* Animated sound waves ring when playing */}
        <AnimatePresence>
          {isPlaying && !isMuted && (
            <>
              <motion.span
                key="ring1"
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-primary/30"
              />
              <motion.span
                key="ring2"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: 0, scale: 1.7 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-primary/20"
              />
            </>
          )}
        </AnimatePresence>

        {/* Icon */}
        <AnimatePresence mode="wait">
          {isMuted || !isPlaying ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
          ) : (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-5 h-5 text-primary group-hover:text-foreground transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
