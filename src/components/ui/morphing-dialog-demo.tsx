import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

// Import images directly
import evanyouImg from '/images/evanyou.jpg';
import kpImg from '/images/KP.jpg';
import alexalbertImg from '/images/alexalbert.jpg';
import bentrossellImg from '/images/bentrossell.jpg';

type JudgesCardProps = {
  name: string;
  role: string;
  company: string;
  image: string;
  twitter?: string;
  bio?: string;
};

type HostCardProps = {
  name: string;
  role: string;
  company: string;
  image: string;
  twitter?: string;
  bio?: string;
};

const HostsData: HostCardProps[] = [
  {
    name: "Greg Isenberg",
    role: "Founder & CEO",
    company: "Late Checkout",
    image: "/images/greg.jpg",
    twitter: "gregisenberg",
    bio: "Community building expert and entrepreneur helping build the internet's most vibrant communities. Advisor to Reddit's largest communities and founder of Late Checkout. Leading the charge in reimagining how online communities are built and scaled."
  }
];

const JudgesData: JudgesCardProps[] = [
  {
    name: "Logan Paul",
    role: "Founder & CEO",
    company: "Prime Hydration",
    image: "/images/Logan.jpg",
    twitter: "LoganPaul",
    bio: "Serial entrepreneur and digital pioneer with multiple successful ventures in tech and media. Co-founder of Prime Hydration, leading the revolution in sports hydration and building a global brand phenomenon."
  },
  {
    name: "Sara Guo",
    role: "Founder",
    company: "Conviction",
    image: "/images/sarahguo.jpg",
    twitter: "saranormous",
    bio: "Pioneering investor and founder shaping the future of technology and venture capital. Building Conviction to back the next generation of transformative companies."
  },
  {
    name: "Pieter Levels",
    role: "Founder",
    company: "Nomad List & Remote OK",
    image: "/images/levels.jpg",
    twitter: "levelsio",
    bio: "Solo founder building profitable startups. Pioneer of the digital nomad movement and creator of Nomad List and Remote OK. Advocate for bootstrapped entrepreneurship and remote work culture."
  },
  {
    name: "Theo",
    role: "Founder",
    company: "Ping.gg",
    image: "/images/theo.jpg",
    twitter: "theo",
    bio: "Serial entrepreneur and developer advocate. Creator of Ping.gg and influential voice in the developer tooling space, known for innovative approaches to technical content creation."
  },
  {
    name: "Evan You",
    role: "Creator",
    company: "Vue.js",
    image: evanyouImg,
    twitter: "youyuxi",
    bio: "Open source innovator and creator of Vue.js, one of the world's most popular JavaScript frameworks. Pioneering the future of web development with cutting-edge tools and frameworks."
  },
  {
    name: "KP",
    role: "Founder",
    company: "Riverside.fm",
    image: kpImg,
    twitter: "thisiskp_",
    bio: "Tech entrepreneur revolutionizing remote content creation. Founder of Riverside.fm, building the future of professional recording and streaming technology."
  },
  {
    name: "Alex Albert",
    role: "Founder",
    company: "Maybe Finance",
    image: alexalbertImg,
    twitter: "alexalbert__",
    bio: "Financial technology innovator and entrepreneur. Building Maybe Finance to democratize access to professional-grade financial planning and analysis tools."
  },
  {
    name: "Ben Tossell",
    role: "Founder",
    company: "Makerpad",
    image: bentrossellImg,
    twitter: "bentossell",
    bio: "No-code pioneer and community builder. Founder of Makerpad, empowering the next generation of makers to build without traditional coding."
  }
];

export function HostCardMorphing() {
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Hosts</h2>
      <div className="flex justify-center">
        {HostsData.map((host, idx) => (
          <div className="w-full max-w-[300px]" key={idx}>
            <HostCard {...host} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HostCard({ name, role, company, image, twitter, bio }: HostCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-black p-6 rounded-xl flex flex-col items-center text-center cursor-pointer relative overflow-hidden border border-white/10 hover:border-white/20 transition-all ${isOpen ? 'no-hover-transform' : ''} min-h-[300px]`}
        onClick={() => setIsOpen(true)}
      >
        {/* Blue Light Gradients at Top */}
        <div className="absolute inset-x-0 top-0 z-0">
          <div className="absolute inset-x-4 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-4 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-px w-3/4" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-px w-1/4" />
        </div>

        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-400/20 relative z-10">
          <img
            src={image}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="font-bold text-lg mb-1 relative z-10">{name}</h3>
        <p className="text-[#2979FF] font-medium mb-1 relative z-10 text-sm">{role}</p>
        <p className="text-neutral-400 text-xs mb-3 relative z-10">{company}</p>
        
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-neutral-400 hover:text-[#2979FF] transition-colors mt-auto relative z-10"
        >
          <Twitter className="w-3 h-3" />
          <span className="text-xs">@{twitter}</span>
        </a>
        
        <div className="shine-effect"></div>
      </div>

      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-black border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden">
            {/* Blue Light Gradients at Top */}
            <div className="absolute inset-x-0 top-0 z-0">
              <div className="absolute inset-x-8 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-8 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-px w-3/4" />
              <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-px w-1/4" />
            </div>
            
            <div className="flex flex-col items-center text-center p-8 z-10 relative">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-blue-400/20">
                <img
                  src={image}
                  alt={name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h2 className="text-white text-2xl font-bold mb-2">{name}</h2>
              <p className="text-[#2979FF] font-medium mb-1">{role}</p>
              <p className="text-neutral-300 mb-6">{company}</p>
              
              <p className="text-neutral-300 text-sm mb-6 max-w-md leading-relaxed">
                {bio}
              </p>
              
              <a
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-[#2979FF] transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>@{twitter}</span>
              </a>
            </div>
            
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 text-white/70 hover:text-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

export function JudgesCardMorphing() {
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Judges</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        {JudgesData.map((judge, idx) => (
          <JudgeCard key={idx} {...judge} />
        ))}
      </div>
    </div>
  );
}

function JudgeCard({ name, role, company, image, twitter, bio }: JudgesCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-black p-6 rounded-xl flex flex-col items-center text-center cursor-pointer relative overflow-hidden border border-white/10 hover:border-white/20 transition-all ${isOpen ? 'no-hover-transform' : ''} min-h-[300px]`}
        onClick={() => setIsOpen(true)}
      >
        {/* Blue Light Gradients at Top */}
        <div className="absolute inset-x-0 top-0 z-0">
          <div className="absolute inset-x-4 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-4 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-px w-3/4" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-px w-1/4" />
        </div>

        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-400/20 relative z-10">
          <img
            src={image}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="font-bold text-lg mb-1 relative z-10">{name}</h3>
        <p className="text-[#2979FF] font-medium mb-1 relative z-10 text-sm">{role}</p>
        <p className="text-neutral-400 text-xs mb-3 relative z-10">{company}</p>
        
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-neutral-400 hover:text-[#2979FF] transition-colors mt-auto relative z-10"
        >
          <Twitter className="w-3 h-3" />
          <span className="text-xs">@{twitter}</span>
        </a>
        
        <div className="shine-effect"></div>
      </div>

      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-black border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden">
            {/* Blue Light Gradients at Top */}
            <div className="absolute inset-x-0 top-0 z-0">
              <div className="absolute inset-x-8 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-8 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-px w-3/4" />
              <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-px w-1/4" />
            </div>
            
            <div className="flex flex-col items-center text-center p-8 z-10 relative">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-blue-400/20">
                <img
                  src={image}
                  alt={name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h2 className="text-white text-2xl font-bold mb-2">{name}</h2>
              <p className="text-[#2979FF] font-medium mb-1">{role}</p>
              <p className="text-neutral-300 mb-6">{company}</p>
              
              <p className="text-neutral-300 text-sm mb-6 max-w-md leading-relaxed">
                {bio}
              </p>
              
              <a
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-[#2979FF] transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>@{twitter}</span>
              </a>
            </div>
            
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 text-white/70 hover:text-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
} 