import { XCard } from "./x-card";
import React from "react";
import { SparklesCore } from "./sparkles";

const XCardData = {
    link: "https://x.com/EricSimons/status/1902019001448087555",
    authorName: "Eric Simons",
    authorHandle: "EricSimons",
    authorImage: "/images/ericsimons.jpg",
    content: [
        "I love this idea- Bolt will do it",
        "To set world record of 100k people building together at the same hackathon, probably need a world record cash prize… maybe $100k? (Or more? *gulp* lol)",
        "Who's in?! Reply w ideas & sponsors 🫡"
    ],
    isVerified: true,
    timestamp: "Mar 19",
    reply: {
        authorName: "KP",
        authorHandle: "thisiskp_",
        authorImage: "/images/KP copy.jpg",
        content: "If I was the CEO of Bolt or Lovable I'd figure out a way to host the world's largest hackathon LIVE and try to set a Guinness Book Record in the sheer number of new web apps built in a day by people around the globe",
        isVerified: true,
        timestamp: "Mar 19"
    }
};

function XCardDemo() {
    return (
        <div className="relative max-w-xl mx-auto">
            {/* Background glow effect */}
            <div className="absolute -inset-10 bg-[#2979FF]/5 rounded-3xl blur-3xl z-0"></div>
            
            {/* Subtle shooting stars effect */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                <SparklesCore 
                    background="transparent"
                    minSize={0.2}
                    maxSize={0.8}
                    particleDensity={20}
                    speed={0.2}
                    className="h-full w-full"
                />
            </div>
            
            {/* X Card with higher z-index */}
            <div className="relative z-10">
                <XCard {...XCardData} />
            </div>
        </div>
    );
}

export { XCardDemo };