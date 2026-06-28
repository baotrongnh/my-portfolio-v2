"use client"

import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "@tsparticles/engine";
import type { Engine as SlimEngine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particleColor = "#ffffff";

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine as unknown as SlimEngine);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: particleColor,
            },
            links: {
              color: particleColor,
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
