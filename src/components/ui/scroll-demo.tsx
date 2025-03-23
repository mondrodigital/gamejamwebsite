"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import boltImg from '/images/bolt.png';

export function ScrollDemo() {
  return (
    <div className="relative w-full px-4 sm:px-6 md:px-8">
      {/* Image Section with scroll parallax */}
      <ContainerScroll 
        titleComponent={
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <h1 className="text-4xl font-semibold text-white">
              Build Something <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#2979FF] via-[#73A7FF] to-[#2979FF] animate-text-shimmer">
                Extraordinary
              </span>
            </h1>
          </div>
        }
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={boltImg}
            alt="Bolt Logo"
            className="w-full h-full object-cover"
            style={{
              filter: "drop-shadow(0 0 20px rgba(41, 121, 255, 0.3))"
            }}
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  );
}