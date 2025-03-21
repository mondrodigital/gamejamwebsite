import { GlareCard } from "@/components/ui/glare-card";
import { Twitter } from "lucide-react";

export function GlareCardDemo() {
  const judges = [
    {
      image: "/src/components/ui/Logan.jpg",
      name: "Logan Paul",
      title: "Founder & CEO",
      company: "Prime Hydration",
      bio: "Serial entrepreneur and digital pioneer with multiple successful ventures in tech and media.",
      twitter: "LoganPaul"
    },
    {
      image: "/src/components/ui/levels.jpg",
      name: "Pieter Levels",
      title: "Founder",
      company: "Nomad List",
      bio: "Solo founder building profitable startups. Pioneer of the digital nomad movement.",
      twitter: "levelsio"
    },
    {
      image: "/src/components/ui/evanyou.jpg",
      name: "Evan You",
      title: "Creator",
      company: "Vue.js",
      bio: "Open source innovator and creator of Vue.js, one of the world's most popular JavaScript frameworks.",
      twitter: "youyuxi"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {judges.map((judge, index) => (
        <GlareCard key={index}>
          <div className="absolute inset-0 rounded-[24px] overflow-hidden">
            <img
              src={judge.image}
              alt={judge.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          </div>
          <div className="relative h-full flex flex-col justify-end p-6 z-10">
            <h3 className="text-2xl font-bold text-white mb-1">{judge.name}</h3>
            <p className="text-[#2979FF] font-medium mb-1">
              {judge.title} @ {judge.company}
            </p>
            <p className="text-white text-sm mb-4 line-clamp-2">
              {judge.bio}
            </p>
            <a
              href={`https://twitter.com/${judge.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span className="text-sm">@{judge.twitter}</span>
            </a>
          </div>
        </GlareCard>
      ))}
    </div>
  );
}