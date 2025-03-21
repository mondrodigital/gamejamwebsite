import { XCard } from "./x-card";
import React from "react";

const XCardData = {
    link: "https://twitter.com/thisiskp_/status/1769898955233034243",
    authorName: "KP",
    authorHandle: "thisiskp_",
    authorImage: "/src/components/ui/KP copy.jpg",
    content: [
        "If I was the CEO of Bolt or Lovable",
        "I'd figure out a way to host the world's largest hackathon LIVE and try to set a Guinness Book Record in the sheer number of new web apps built in a day by people around the globe",
        "Imagine 100,000 builders shipping",
        "Find a couple top sponsors like Anthropic or OpenAI and bam you have the \"marketing event of the year\"!"
    ],
    isVerified: true,
    timestamp: "Mar 19",
    reply: {
        authorName: "Eric Simons",
        authorHandle: "EricSimons",
        authorImage: "/src/components/ui/ericsimons.jpg",
        content: "I love this idea- Bolt will do it\n\nTo set world record of 100k people building together at the same hackathon, probably need a world record cash prize… maybe $100k? (Or more? *gulp* lol)\n\nWho's in?! Reply w ideas & sponsors 🫡",
        isVerified: true,
        timestamp: "Mar 19"
    }
};

function XCardDemo() {
    return (
        <div className="max-w-xl mx-auto">
            <XCard {...XCardData} />
        </div>
    );
}

export { XCardDemo };