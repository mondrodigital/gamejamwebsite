"use client";

import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel } from "@/components/ui/logo-carousel";

// Import actual sponsor logo images instead of icons
export const allLogos = [
  { 
    name: "Algorand", 
    id: 1, 
    img: () => <img src="/images/algorand_full_logo_white.png" alt="Algorand" className="h-8 w-auto" />
  },
  { 
    name: "Cloudflare", 
    id: 2, 
    img: () => <img src="/images/cloudflare.png" alt="Cloudflare" className="h-8 w-auto" />
  },
  { 
    name: "Netlify", 
    id: 3, 
    img: () => <img src="/images/logo-netlify-large-monochrome-darkmode.png" alt="Netlify" className="h-8 w-auto" />
  },
  { 
    name: "Supabase", 
    id: 4, 
    img: () => <img src="/images/supabase_BIG.D-94f7cfaf.png" alt="Supabase" className="h-8 w-auto" />
  },
  { 
    name: "Sentry", 
    id: 5, 
    img: () => <img src="/images/sentry-dark.png" alt="Sentry" className="h-8 w-auto" />
  },
  { 
    name: "Loops", 
    id: 6, 
    img: () => <img src="/images/loopslogo.png" alt="Loops" className="h-12 w-auto" />
  },
  { 
    name: "Hacker House", 
    id: 7, 
    img: () => <img src="/images/hacker.png" alt="Hacker House" className="h-8 w-auto" />
  },
  { 
    name: "Exa", 
    id: 8, 
    img: () => <img src="/images/exa.png" alt="Exa" className="h-8 w-auto" />
  },
  {
    id: 9,
    name: "Bolt.new",
    img: () => <img src="/images/bolttoo.png" alt="Bolt.new" className="h-8 w-auto" />,
    link: "https://bolt.new"
  }
];

export function LogoCarouselDemo() {
  return (
    <div className="space-y-2">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-1">
        <div className="text-center">
          <h3 className="text-xl font-medium text-white mb-4">Our Sponsors</h3>
        </div>
        <LogoCarousel columnCount={4} logos={allLogos} /> 
      </div>
    </div>
  );
}