"use client";
import React from "react";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

type PrizeCardProps = {
  title: string;
  amount: string;
  description: string;
  isMain?: boolean;
};

const PrizeCard = ({ title, amount, description, isMain = false }: PrizeCardProps) => {
  // Generate a random number between 3 and 8 for meteors
  const meteorCount = Math.floor(Math.random() * 6) + 3;
  
  return (
    <motion.div 
      className={`relative shadow-xl bg-[#0A0A0A] border border-white/10 px-6 py-8 rounded-2xl overflow-hidden ${isMain ? 'md:scale-110 z-10' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#2979FF] to-[#73A7FF] transform scale-[0.80] rounded-full blur-3xl opacity-20" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#2979FF] via-[#73A7FF] to-[#2979FF] animate-text-shimmer">
          {amount}
        </div>
        
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      <Meteors 
        number={meteorCount} 
        className="opacity-70"
      />
    </motion.div>
  );
};

export function PrizesSection() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
            Now...
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            What started as a simple tweet has evolved into the world's largest hackathon, 
            featuring an unprecedented $1,000,000+ prize pool to empower the next generation 
            of innovators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PrizeCard 
            title="Grand Prize" 
            amount="$500,000" 
            description="For groundbreaking innovation that pushes the boundaries of what's possible. The project that will be remembered as the moment everything changed."
            isMain={true}
          />
          
          <PrizeCard 
            title="Runner-Up" 
            amount="$250,000" 
            description="For exceptional execution and vision that demonstrates the potential to reshape industries and create lasting impact."
          />
          
          <PrizeCard 
            title="Third Place" 
            amount="$100,000" 
            description="For outstanding creativity and technical excellence that sets new standards for innovation."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PrizeCard 
            title="AI Innovation" 
            amount="$50,000" 
            description="For revolutionary applications of artificial intelligence that demonstrate the future of human-AI collaboration."
          />
          
          <PrizeCard 
            title="Technical Excellence" 
            amount="$25,000" 
            description="For exceptional technical implementation and architectural brilliance."
          />
          
          <PrizeCard 
            title="Design & UX" 
            amount="$25,000" 
            description="For creating experiences that redefine how we interact with technology."
          />
          
          <PrizeCard 
            title="Community Choice" 
            amount="$50,000" 
            description="Chosen by the community for the project that captures our collective imagination."
          />
        </div>
      </div>
    </div>
  );
} 