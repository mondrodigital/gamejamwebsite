import React from "react";
import { Meteors } from "@/components/ui/meteors";
import { ArrowRight } from "lucide-react";

const sponsors = [
  { 
    name: "Algorand", 
    description: "Leading blockchain platform powering the future of decentralized applications.",
    link: "https://algorand.com",
    img: () => <img src="/src/components/ui/algorand_full_logo_white.png" alt="Algorand" className="h-12 w-auto mb-6" />
  },
  { 
    name: "Cloudflare", 
    description: "Making the internet faster, safer, and more reliable for everyone.",
    link: "https://cloudflare.com",
    img: () => <img src="/src/components/ui/cloudflare.png" alt="Cloudflare" className="h-12 w-auto mb-6" />
  },
  { 
    name: "Netlify", 
    description: "The fastest way to build, deploy, and scale modern web projects.",
    link: "https://netlify.com",
    img: () => <img src="/src/components/ui/logo-netlify-large-monochrome-darkmode.png" alt="Netlify" className="h-12 w-auto mb-6" />
  },
  { 
    name: "Supabase", 
    description: "The open source Firebase alternative for building scalable applications.",
    link: "https://supabase.com",
    img: () => <img src="/src/components/ui/supabase_BIG.D-94f7cfaf.png" alt="Supabase" className="h-12 w-auto mb-6" />
  },
  { 
    name: "Sentry", 
    description: "Application monitoring and error tracking that helps you ship with confidence.",
    link: "https://sentry.io",
    img: () => <img src="/src/components/ui/sentry-dark.png" alt="Sentry" className="h-12 w-auto mb-6" />
  },
  { 
    name: "Loops", 
    description: "Building the next generation of AI-powered development tools.",
    link: "https://loops.so",
    img: () => <img src="/src/components/ui/loopslogo.png" alt="Loops" className="h-16 w-auto mb-6" />
  },
  { 
    name: "Hacker House", 
    description: "The world's premier hacker house network for builders and creators.",
    link: "https://lu.ma/hsrhackerhouse",
    img: () => <img src="/src/components/ui/hacker.png" alt="Hacker House" className="h-12 w-auto mb-6" />
  },
  { 
    name: "Exa", 
    description: "Pioneering the future of AI-powered search and discovery.",
    link: "https://exa.ai",
    img: () => <img src="/src/components/ui/exa.png" alt="Exa" className="h-12 w-auto mb-6" />
  },
  {
    name: "Bolt.new",
    description: "Build, deploy, and scale your apps",
    link: "https://bolt.new",
    img: () => <img src="/src/components/ui/bolttoo.png" alt="Bolt.new" className="h-12 w-auto mb-6" />
  }
];

export function SponsorsSection() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
            Our Sponsors
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Backed by industry leaders who believe in the power of innovation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {sponsors.map((sponsor, idx) => (
            <div key={sponsor.name} className="w-full relative">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#2979FF] to-[#73A7FF] transform scale-[0.80] rounded-full blur-3xl opacity-20" />
              <div className="relative shadow-xl bg-[#0A0A0A] border border-white/10 px-6 py-8 h-full overflow-hidden rounded-2xl flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-24 relative z-50">
                  {sponsor.img()}
                </div>

                <p className="font-normal text-base text-gray-400 mb-6 relative z-50">
                  {sponsor.description}
                </p>

                <a 
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-500 hover:text-[#2979FF] transition-colors relative z-50"
                >
                  Learn More →
                </a>

                <Meteors number={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 