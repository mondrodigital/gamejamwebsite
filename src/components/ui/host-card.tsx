import { GlareCard } from "@/components/ui/glare-card";
import { Twitter } from "lucide-react";

export function HostCard() {
  return (
    <div className="flex justify-center max-w-7xl mx-auto">
      <div className="max-w-md w-full">
        <GlareCard>
          <div className="relative h-full">
            <div className="absolute inset-0 rounded-[24px] overflow-hidden">
              <img
                src="/src/components/ui/greg.jpg"
                alt="Greg Isenberg"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              <h3 className="text-2xl font-bold text-white mb-1">Greg Isenberg</h3>
              <p className="text-[#2979FF] font-medium mb-1">
                Founder & CEO @ Late Checkout
              </p>
              <p className="text-white text-sm mb-4 line-clamp-2">
                Community building expert and entrepreneur helping build the internet's most vibrant communities. Advisor to Reddit's largest communities.
              </p>
              <a
                href="https://twitter.com/gregisenberg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm">@gregisenberg</span>
              </a>
            </div>
          </div>
        </GlareCard>
      </div>
    </div>
  );
}