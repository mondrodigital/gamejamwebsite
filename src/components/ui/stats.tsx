import { MoveUpRight, Brain, Zap, Target, Lightbulb, Laptop } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Stats() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge className="bg-[#2979FF]/20 text-[#2979FF] border-[#2979FF]/20 hover:bg-[#2979FF]/30">
                Prize Pool
              </Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h2 className="text-4xl md:text-6xl tracking-tighter lg:max-w-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2979FF] via-[#73A7FF] to-[#2979FF] animate-text-shimmer">
                $1,000,000 in Prizes
              </h2>
              <p className="text-lg lg:max-w-lg leading-relaxed tracking-tight text-gray-400 text-left">
                Join the world's largest hackathon and compete for life-changing prizes. From cash awards to startup funding, we're empowering the next generation of innovators to build something extraordinary.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4">
              <div className="glass-card flex gap-0 flex-col justify-between p-8 rounded-xl hover:translate-y-[-8px] transition-all duration-300">
                <Brain className="w-8 h-8 mb-10 text-[#2979FF]" />
                <h2 className="text-4xl tracking-tighter max-w-xl text-left font-bold flex flex-col gap-2">
                  $500K
                  <span className="text-[#2979FF] text-lg font-normal">
                    Grand Prize
                  </span>
                </h2>
                <p className="text-base leading-relaxed tracking-tight text-gray-400 max-w-xl text-left mt-2">
                  For the most innovative project
                </p>
              </div>
              <div className="glass-card flex gap-0 flex-col justify-between p-8 rounded-xl hover:translate-y-[-8px] transition-all duration-300">
                <Zap className="w-8 h-8 mb-10 text-[#2979FF]" />
                <h2 className="text-4xl tracking-tighter max-w-xl text-left font-bold flex flex-col gap-2">
                  $250K
                  <span className="text-[#2979FF] text-lg font-normal">
                    Runner Up
                  </span>
                </h2>
                <p className="text-base leading-relaxed tracking-tight text-gray-400 max-w-xl text-left mt-2">
                  Second place prize package
                </p>
              </div>
              <div className="glass-card flex gap-0 flex-col justify-between p-8 rounded-xl hover:translate-y-[-8px] transition-all duration-300">
                <Target className="w-8 h-8 mb-10 text-[#2979FF]" />
                <h2 className="text-4xl tracking-tighter max-w-xl text-left font-bold flex flex-col gap-2">
                  $150K
                  <span className="text-[#2979FF] text-lg font-normal">
                    Category Prizes
                  </span>
                </h2>
                <p className="text-base leading-relaxed tracking-tight text-gray-400 max-w-xl text-left mt-2">
                  Best in specific categories
                </p>
              </div>
              <div className="glass-card flex gap-0 flex-col justify-between p-8 rounded-xl hover:translate-y-[-8px] transition-all duration-300">
                <Lightbulb className="w-8 h-8 mb-10 text-[#2979FF]" />
                <h2 className="text-4xl tracking-tighter max-w-xl text-left font-bold flex flex-col gap-2">
                  $100K
                  <span className="text-[#2979FF] text-lg font-normal">
                    Community Choice
                  </span>
                </h2>
                <p className="text-base leading-relaxed tracking-tight text-gray-400 max-w-xl text-left mt-2">
                  Voted by the community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Stats };