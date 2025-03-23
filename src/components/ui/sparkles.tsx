"use client";
import React, { useId, useMemo } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import type { ISourceOptions } from "@tsparticles/engine";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize = 0.4,
    maxSize = 1.2,
    speed = 0.3,
    particleColor = "#fff",
    particleDensity = 600,
  } = props;
  
  // Dim the effect by reducing opacity and color intensity
  const dimmedParticleColor = "rgba(255, 255, 255, 0.4)"; // Using rgba with 0.4 opacity
  
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setInit(true);
    });
  }, []);
  const controls = useAnimation();

  useEffect(() => {
    if (init) {
      controls.start({
        opacity: 1,
      });
    }
  }, [init, controls]);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: particleDensity,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ["#ffffff", "#73A7FF", "#2979FF"], // White and light blue colors
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: {
            min: 0.3,
            max: 0.8
          },
        },
        size: {
          value: {
            min: minSize,
            max: maxSize,
          },
        },
        move: {
          direction: "bottom",
          enable: true,
          outModes: {
            default: "out",
          },
          straight: true,
          size: true,
          speed: speed,
          gravity: {
            enable: true,
            acceleration: 0.1,
          },
          trail: {
            enable: true,
            length: 4,
            fillColor: "#000000",
          }
        },
      },
      detectRetina: true,
    }),
    [minSize, maxSize, speed, particleDensity]
  );

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      <Particles
        id={id || `tsparticles-${generatedId}`}
        className="h-full w-full"
        options={options}
      />
    </motion.div>
  );
};