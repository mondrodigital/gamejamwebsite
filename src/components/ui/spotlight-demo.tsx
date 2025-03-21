"use client";
import React from "react";
import { Spotlight, GridBackground } from "./spotlight";

export function SpotlightDemo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border border-white/10">
      <GridBackground 
        dotColor="rgba(41, 121, 255, 0.4)"
        dotSize={1.5}
        dotOpacity={0.4}
        containerClassName="z-10"
        backgroundFill="linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.9))"
      />
      <Spotlight 
        className="absolute inset-0 z-20" 
        fill="rgba(41, 121, 255, 0.25)" 
      />
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center">
        <h3 className="mb-4 text-3xl font-bold leading-tight text-white">
          Interactive Spotlight Effect
        </h3>
        <p className="max-w-2xl text-lg text-gray-300">
          Move your cursor across this area to see the subtle spotlight effect follow your movements. 
          This creates an engaging interactive experience that brings depth to the interface without 
          overwhelming the content.
        </p>
      </div>
    </div>
  );
} 