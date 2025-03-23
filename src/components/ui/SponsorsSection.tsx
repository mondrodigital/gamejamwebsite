import React from 'react';
import { motion } from "framer-motion";

export function SponsorsSection() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gradient-animate">
          Our Sponsors
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
          Industry leaders supporting the world's largest hackathon
        </p>
      </div>
      
      {/* Sponsors Groups */}
      <div className="space-y-10 md:space-y-16">
        {/* Main Presenting Partner */}
        <div>
          <h3 className="text-center text-lg sm:text-xl text-gray-300 mb-4 md:mb-8">
            Presenting Partner
          </h3>
          <div className="flex justify-center items-center">
            <motion.div 
              className="bg-[#090909] border border-gray-800 rounded-xl p-6 sm:p-8 md:p-10 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/images/algorand_logo.svg" 
                alt="Algorand" 
                className="h-12 sm:h-16 md:h-20 max-w-full"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Gold Tier Sponsors */}
        <div>
          <h3 className="text-center text-lg sm:text-xl text-gray-300 mb-4 md:mb-8">
            Gold Sponsors
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <SponsorCard 
              logo="/images/bolt_logo.svg"
              name="Bolt.new"
              tier="gold"
            />
            <SponsorCard 
              logo="/images/cloudflare_logo.svg"
              name="Cloudflare"
              tier="gold"
            />
            <SponsorCard 
              logo="/images/netlify_logo.svg"
              name="Netlify"
              tier="gold"
            />
          </div>
        </div>
        
        {/* Silver Tier Sponsors */}
        <div>
          <h3 className="text-center text-lg sm:text-xl text-gray-300 mb-4 md:mb-8">
            Silver Sponsors
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            <SponsorCard 
              logo="/images/supabase_logo.svg"
              name="Supabase"
              tier="silver"
            />
            <SponsorCard 
              logo="/images/hackerhouse_logo.svg"
              name="Hacker House"
              tier="silver"
            />
            <SponsorCard 
              logo="/images/exa_logo.svg"
              name="Exa"
              tier="silver"
            />
            <SponsorCard 
              logo="/images/typefully_logo.svg"
              name="Typefully"
              tier="silver"
              className="col-span-3 sm:col-span-1 mx-auto sm:mx-0 w-1/3 sm:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SponsorCardProps {
  logo: string;
  name: string;
  tier: 'gold' | 'silver';
  className?: string;
}

function SponsorCard({ logo, name, tier, className }: SponsorCardProps) {
  return (
    <motion.div 
      className={`
        bg-[#090909] 
        border 
        border-gray-800 
        rounded-xl 
        flex 
        items-center 
        justify-center
        ${tier === 'gold' ? 'p-4 sm:p-6 md:p-8' : 'p-3 sm:p-5 md:p-6'}
        ${className || ''}
      `}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={logo} 
        alt={name} 
        className={`
          max-w-full
          ${tier === 'gold' ? 'h-8 sm:h-12 md:h-14' : 'h-6 sm:h-10 md:h-12'}
        `}
      />
    </motion.div>
  );
} 