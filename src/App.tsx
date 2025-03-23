import React, { useState, useEffect } from 'react';
import { Code2, Trophy, Globe2, Calendar, Sparkles, Users, Award, Cpu, ArrowRight, Github, Twitter, Linkedin, Disc as Discord, Mail, Rocket, Brain, Zap, Target, Lightbulb, Laptop } from 'lucide-react';
import { Globe } from "@/components/ui/globe";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { SparklesCore } from "@/components/ui/sparkles";
import { CardGradient } from "@/components/ui/card-gradient";
import { LogoCarouselDemo } from "@/components/ui/demo";
import { XCardDemo } from "@/components/ui/x-card-demo";
import { StatsDemo } from "@/components/ui/stats-demo";
import { ScrollDemo } from "@/components/ui/scroll-demo";
import { GlareCardDemo } from "@/components/ui/glare-card-demo";
import { HostCard } from "@/components/ui/host-card";
import { SimpleGlobeSection } from "@/components/ui/SimpleGlobeSection";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Languages, UserRound, Star, Compass, Blocks, Workflow, GraduationCap } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Stats } from "@/components/ui/stats";
import { SpotlightDemo } from "@/components/ui/spotlight-demo";
import { motion } from 'framer-motion';
import { HostCardMorphing, JudgesCardMorphing } from "@/components/ui/morphing-dialog-demo";
import { PrizesSection } from "@/components/ui/prizes-section";
import { SponsorsSection } from "@/components/ui/sponsors-section";
import { Navigation } from "@/components/ui/navigation";
import { HoverButton } from "@/components/ui/hover-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypeformModal } from "@/components/ui/typeform-modal";
import { Particles } from "@/components/ui/particles";

const colors = {
  primary: "#2979FF",
  secondary: "#FF80AB",
  accent1: "#FF6D00",
  accent2: "#FFD600",
  accent3: "#00E676",
  accent4: "#3D5AFE",
  dark: "#0A0A0A"
};

function App() {
  const [registrationCount, setRegistrationCount] = useState(42789);

  useEffect(() => {
    const spotlightBeams = document.getElementById('spotlight-beams');
    const prizesSection = document.getElementById('prizes');
    const buildSection = document.getElementById('build-extraordinary-section');
    
    if (!spotlightBeams || !prizesSection || !buildSection) return;
    
    function updateSpotlight() {
      const prizesRect = (prizesSection as HTMLElement).getBoundingClientRect();
      const buildRect = (buildSection as HTMLElement).getBoundingClientRect();
      
      // When prizes section is below viewport
      if (prizesRect.top > window.innerHeight) {
        // Hide spotlight until prizes section is near
        (spotlightBeams as HTMLElement).style.setProperty('opacity', '0');
        (spotlightBeams as HTMLElement).style.setProperty('visibility', 'hidden');
      }
      // When prizes section is approaching viewport
      else if (prizesRect.top > 0) {
        // Attach to prizes section
        (spotlightBeams as HTMLElement).style.setProperty('position', 'absolute');
        (spotlightBeams as HTMLElement).style.setProperty('top', `${prizesRect.top}px`);
        (spotlightBeams as HTMLElement).style.setProperty('opacity', '1');
        (spotlightBeams as HTMLElement).style.setProperty('visibility', 'visible');
      }
      // When prizes section hits top of viewport
      else if (prizesRect.top <= 0) {
        // Fix to viewport and stay fixed
        (spotlightBeams as HTMLElement).style.setProperty('position', 'fixed');
        (spotlightBeams as HTMLElement).style.setProperty('top', '0');
        (spotlightBeams as HTMLElement).style.setProperty('opacity', '1');
        (spotlightBeams as HTMLElement).style.setProperty('visibility', 'visible');
      }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateSpotlight);
    // Initial update
    updateSpotlight();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateSpotlight);
    };
  }, []); // Empty dependency array since we only need to set this up once

  useEffect(() => {
    const interval = setInterval(() => {
      setRegistrationCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navigation />
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Gradient */}
        <AnimatedGradientBackground
          gradientColors={[
            "#0A0A0A",
            "#2979FF",
            "#2979FF",
            "#0A0A0A"
          ]}
          Breathing={true}
          startingGap={200}
          topOffset={50}
          animationSpeed={0.008}
          containerStyle={{
            transform: 'rotate(180deg)',
            top: '-50%',
            height: '150%'
          }}
        />
        
        {/* Particles Background */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <Particles 
            className="size-full"
            quantity={150}
            staticity={30}
            ease={70}
            color="#ffffff"
          />
        </div>
        
        {/* Stars Background */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <ShootingStars
            starColor={colors.primary}
            trailColor={colors.primary}
            minSpeed={15}
            maxSpeed={35}
            minDelay={1000}
            maxDelay={3000}
            starWidth={3}
            starHeight={1}
            maxStars={8}
          />
        </div>

        {/* Sparkles Effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1.0}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#2979FF"
            speed={0.5}
          />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
          {/* Content Layout */}
          <div className="relative min-h-screen flex flex-col">
            {/* Header Content */}
            <div className="mt-16 sm:mt-20 text-center space-y-6">
              {/* Logo + Presents */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                <img 
                  src="/images/bolttoo.png" 
                  alt="Bolt Logo" 
                  className="h-8 sm:h-10 md:h-12"
                />
                <span className="text-lg sm:text-xl md:text-2xl italic text-gray-300">presents</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold px-2 sm:px-0">
                <span className="relative">
                  <span className="absolute -inset-6 blur-2xl bg-black/40 rounded-[30px] hidden sm:block"></span>
                  <span className="relative text-white">
                    The World's{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2979FF] via-[#73A7FF] to-[#2979FF] animate-text-shimmer">
                      Largest
                    </span>
                    {' '}Hackathon
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl relative max-w-2xl mx-auto px-4 sm:px-0">
                <span className="absolute -inset-4 blur-xl bg-black/30 rounded-full hidden sm:block"></span>
                <span className="relative text-white">
                Join us as we break the world record for the largest hackathon with the biggest prize pool ever of $1M+.
                </span>
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-2 sm:mt-0">
                <TypeformModal formId="wf94YwH4">
                  <HoverButton variant="blue">
                    <span className="flex items-center gap-2">
                      Register Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </HoverButton>
                </TypeformModal>
              </div>
            </div>

            {/* Registration Counter Card moved to Globe section */}
            <SimpleGlobeSection registrationCount={registrationCount} />
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <section className="relative bg-[#0A0A0A] pb-8 sm:pb-12 overflow-hidden" style={{ position: 'relative', zIndex: 40, marginTop: '-220px' }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SparklesCore
            id="sponsors-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#2979FF"
            speed={0.3}
          />
        </div>
        <div className="relative z-10 px-4 sm:px-6 md:px-8">
          <LogoCarouselDemo />
          <div className="text-center mt-6 sm:mt-8">
            <TypeformModal formId="wf94YwH4">
              <HoverButton variant="default">
                <span className="flex items-center gap-2">
                  Become a Sponsor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </HoverButton>
            </TypeformModal>
          </div>
        </div>
      </section>

      {/* How it Started Section */}
      <section className="py-16 sm:py-20 md:py-32 relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SparklesCore
            id="started-sparkles"
            background="transparent"
            minSize={0.3}
            maxSize={1}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#2979FF"
            speed={0.3}
          />
        </div>
        
        {/* Particles Background */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <Particles 
            className="size-full"
            quantity={120}
            staticity={40}
            ease={60}
            size={0.6}
            color="#ffffff"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gradient-animate">
              How it Started
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
              One tweet. A bold idea: bring 100,000 builders together for the largest hackathon ever.
            </p>
          </div>
          <div className="flex justify-center">
            <XCardDemo />
          </div>
        </div>
      </section>

      {/* Detailed Prizes Section */}
      <section id="prizes" className="relative bg-[#0A0A0A] overflow-hidden">
        {/* Spotlight beams */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none"
          id="spotlight-beams"
          style={{ 
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            zIndex: 10,
            opacity: 1,
            visibility: 'visible'
          }}
        >
          <motion.div
            animate={{ x: [0, 70, 0] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
          >
            <div
              style={{
                transform: `translateY(-100px) rotate(-45deg)`,
                background: `radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)`,
                width: `400px`,
                height: `1000px`,
              }}
              className={`absolute top-0 left-0`}
            />
            <div
              style={{
                transform: "rotate(-45deg) translate(5%, -50%)",
                background: `radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)`,
                width: `200px`,
                height: `1000px`,
              }}
              className={`absolute top-0 left-0 origin-top-left`}
            />
          </motion.div>

          <motion.div
            animate={{ x: [0, -70, 0] }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
          >
            <div
              style={{
                transform: `translateY(-100px) rotate(45deg)`,
                background: `radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)`,
                width: `400px`,
                height: `1000px`,
              }}
              className={`absolute top-0 right-0`}
            />
            <div
              style={{
                transform: "rotate(45deg) translate(-5%, -50%)",
                background: `radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)`,
                width: `200px`,
                height: `1000px`,
              }}
              className={`absolute top-0 right-0 origin-top-right`}
            />
          </motion.div>
        </motion.div>
        <div className="relative z-20 px-4 sm:px-6 md:px-8">
          <PrizesSection />
        </div>
      </section>

      {/* Combined Host and Judges Section */}
      <section id="judges" className="py-8 sm:py-12 relative bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-20">
          {/* Main Header */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gradient-animate">
              Meet the Team
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
              Your host and judges—tech's most influential builders who will evaluate your work
            </p>
          </div>

          {/* Host section */}
          <div id="host-section" className="mb-12 md:mb-20">
            <HostCardMorphing />
          </div>
          
          {/* Judges section */}
          <div id="judges-section">
            <JudgesCardMorphing />
          </div>
        </div>

        {/* Sponsors Section */}
        <section id="sponsors" className="relative bg-[#0A0A0A] overflow-hidden pb-8 sm:pb-12 mt-12 md:mt-20">
          <div className="relative z-10 px-4 sm:px-6 md:px-8">
            <SponsorsSection />
          </div>
        </section>
      </section>

      {/* Build Something Extraordinary Section */}
      <section id="build-extraordinary-section" className="relative bg-[#0A0A0A] overflow-hidden py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <ScrollDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#0A0A0A] py-12 md:py-24 overflow-hidden">
        {/* BackgroundBeams as full screen background */}
        <BackgroundBeams className="z-0" />
        
        {/* Add SparklesCore for shooting stars */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <SparklesCore
            id="make-history-sparkles"
            className="w-full h-full opacity-70"
            background="transparent"
            minSize={0.4}
            maxSize={1.5}
            particleColor="#ffffff"
            particleDensity={80}
            speed={0.8}
          />
        </div>
        
        {/* Blue Light Gradients at Top */}
        <div className="absolute inset-x-0 top-0 z-10 hidden sm:block">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-px w-1/4" />
        </div>

        {/* $1 MILLION Text Background */}
        <div className="absolute bottom-0 right-0 z-10 pointer-events-none w-full overflow-hidden">
          <div className="text-[6rem] sm:text-[12rem] md:text-[18rem] font-bold text-white/5 select-none text-right pr-4 overflow-hidden">
            $1M+
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4">
            Make History
            <span className="block text-base sm:text-lg md:text-2xl lg:text-3xl mt-3 md:mt-4 text-gray-400 font-normal">
              Join us. Build. Win $1M+ in prizes.
            </span>
          </h1>
          <div className="mt-6 md:mt-8">
            <TypeformModal formId="wf94YwH4">
              <HoverButton variant="blue">
                <span className="flex items-center gap-1.5 text-base font-medium justify-center py-1 px-2 min-w-[180px]">
                  Register Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </HoverButton>
            </TypeformModal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 md:py-24 border-t border-[#2979FF]/30">
        <AnimatedGradientBackground
          gradientColors={[
            "#0A0A0A",
            "#2979FF",
            "#2979FF",
            "#0A0A0A"
          ]}
          Breathing={true}
          startingGap={200}
          topOffset={-50}
          animationSpeed={0.008}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Footer Links */}
          <div className="mb-12 md:mb-16">
            {/* Bolt Logo */}
            <div className="mb-6 md:mb-8">
              <img 
                src="/images/bolttoo.png" 
                alt="Bolt Logo" 
                className="h-8 md:h-10"
              />
            </div>
            
            {/* Grid container for categories and content */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {/* Host Column */}
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Host</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a 
                      href="https://twitter.com/gregisenberg" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Greg Isenberg
                    </a>
                  </li>
                </ul>
              </div>

              {/* Judges Column */}
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Judges</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a 
                      href="https://twitter.com/LoganPaul" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Logan Paul
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/saranormous" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Sara Guo
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/levelsio" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Pieter Levels
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/theo" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Theo
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/youyuxi" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Evan You
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/thisiskp_" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      KP
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/alexalbert__" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Alex Albert
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/bentossell" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Ben Tossell
                    </a>
                  </li>
                </ul>
              </div>

              {/* Sponsors Column */}
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Sponsors</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a href="https://algorand.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Algorand
                    </a>
                  </li>
                  <li>
                    <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Bolt.new
                    </a>
                  </li>
                  <li>
                    <a href="https://cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Cloudflare
                    </a>
                  </li>
                  <li>
                    <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Netlify
                    </a>
                  </li>
                  <li>
                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Supabase
                    </a>
                  </li>
                  <li>
                    <a href="https://lu.ma/hsrhackerhouse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Hacker House
                    </a>
                  </li>
                  <li>
                    <a href="https://exa.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#73A7FF] transition-colors text-sm md:text-base">
                      Exa
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Connect</h3>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <a 
                      href="https://twitter.com/bolt_new" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Follow on Twitter
                    </a>
                  </li>
                  <li>
                    <a 
                      href="mailto:hello@hackathon.com" 
                      className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-2 text-sm md:text-base"
                    >
                      <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400 border-t border-white/5 pt-6 md:pt-8 pb-10">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center text-center md:text-left">
              <p>© 2025 World's Largest Hackathon</p>
              <span className="hidden md:inline">•</span>
              <a 
                href="https://x.com/HanksSauce" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#73A7FF] transition-colors flex items-center gap-1 justify-center"
              >
                <Twitter className="w-3 h-3 flex-shrink-0" />
                <span>Made by @HanksSauce</span>
              </a>
            </div>
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <a href="#" className="hover:text-[#73A7FF] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#73A7FF] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#73A7FF] transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;