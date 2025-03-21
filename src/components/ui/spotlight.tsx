"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({
  className = "",
  fill = "white",
}: SpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.7);

  useEffect(() => {
    // Set initial position to center of element
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setPosition({ x: width / 2, y: height / 2 });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    setPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    // Don't completely hide on leave, just reduce opacity
    setOpacity(0.7);
    
    // Return to center position when mouse leaves
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setPosition({ x: width / 2, y: height / 2 });
    }
  };

  return (
    <motion.div
      ref={divRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${fill}, transparent 60%)`,
        opacity: opacity,
        transition: "opacity 0.3s ease-in-out"
      }}
    />
  );
};

type GridBackgroundProps = {
  className?: string;
  containerClassName?: string;
  dotSize?: number;
  dotColor?: string;
  blurSize?: number;
  backgroundFill?: string;
  dotOpacity?: number;
};

export const GridBackground = ({
  className = "",
  containerClassName = "",
  dotSize = 1,
  dotColor = "#fff",
  blurSize = 0,
  backgroundFill = "",
  dotOpacity = 0.3,
}: GridBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${containerClassName}`}>
      <div
        className={`absolute inset-0 flex items-center justify-center bg-dot-pattern mask-radial-gradient ${className}`}
        style={{
          backgroundSize: `${dotSize * 2}px ${dotSize * 2}px`,
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent 0)`,
          backgroundPosition: `0 0, ${dotSize}px ${dotSize}px`,
          filter: blurSize > 0 ? `blur(${blurSize}px)` : undefined,
          opacity: dotOpacity,
        }}
      />
      {backgroundFill && (
        <div
          className="absolute inset-0 bg-gradient-to-b"
          style={{ backgroundImage: backgroundFill }}
        />
      )}
    </div>
  );
}; 