"use client";

import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Apple, Database, Monitor, Store, CreditCard, Code2, Car, Bot, LayoutGrid, Paintbrush, Zap, FileCode, BanknoteIcon, Brain } from "lucide-react";

const allLogos = [
  { name: "Apple", id: 1, img: Apple },
  { name: "Supabase", id: 2, img: Database },
  { name: "Vercel", id: 3, img: Monitor },
  { name: "Lowes", id: 4, img: Store },
  { name: "Ally", id: 5, img: CreditCard },
  { name: "Pierre", id: 6, img: Code2 },
  { name: "BMW", id: 7, img: Car },
  { name: "Claude", id: 8, img: Bot },
  { name: "Nextjs", id: 9, img: LayoutGrid },
  { name: "Tailwind", id: 10, img: Paintbrush },
  { name: "Upstash", id: 11, img: Zap },
  { name: "Typescript", id: 12, img: FileCode },
  { name: "Stripe", id: 13, img: BanknoteIcon },
  { name: "OpenAI", id: 14, img: Brain },
];

export function LogoCarouselDemo() {
  return (
    <div className="space-y-8 py-24">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-16">
        <div className="text-center">
          <GradientHeading size="lg" className="mb-4">Our Sponsors</GradientHeading>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Leading tech companies and organizations supporting the next generation of innovation.
          </p>
        </div>
        <LogoCarousel columnCount={4} logos={allLogos} />
      </div>
    </div>
  );
} 