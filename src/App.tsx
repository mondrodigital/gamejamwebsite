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
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-y-auto">
      <Navigation />
      {/* Hero Section */}
      <div className="relative min-h-screen">
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
        
        {/* Stars Background */}
        <div className="absolute inset-0 z-10">
          <ShootingStars
            starColor={colors.primary}
            trailColor={colors.primary}
            minSpeed={15}
            maxSpeed={35}
            minDelay={1000}
            maxDelay={3000}
            starWidth={3}
            starHeight={1}
          />
        </div>

        {/* Sparkles Effect */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.2}
            maxSize={0.8}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#2979FF"
            speed={0.5}
          />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4">
          {/* Registration Counter Card */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#2979FF] animate-pulse" />
                  <div className="absolute w-2 h-2 rounded-full bg-[#2979FF] animate-ping" />
                </div>
                <span className="text-white/90 text-sm font-medium">
                  <span className="tabular-nums">{registrationCount.toLocaleString()}</span>
                  <span className="ml-2 text-white/60">vibe coders registered</span>
                </span>
              </div>
            </div>
          </div>

          {/* Content Layout */}
          <div className="relative min-h-screen flex flex-col">
            {/* Header Content */}
            <div className="mt-32 text-center space-y-6">
              {/* Title */}
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="relative">
                  <span className="absolute -inset-6 blur-2xl bg-black/40 rounded-[30px]"></span>
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
              <p className="text-xl relative max-w-2xl mx-auto">
                <span className="absolute -inset-4 blur-xl bg-black/30 rounded-full"></span>
                <span className="relative text-white">
                Join us as we break the world record for the largest hackathon with the biggest prize pool ever of $1M+.
                </span>
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <HoverButton 
                  href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co"
                  variant="blue"
                >
                  <span className="flex items-center gap-2">
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </HoverButton>
              </div>
            </div>

            {/* Globe Container */}
            <SimpleGlobeSection />
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <section className="relative bg-[#0A0A0A] pb-12" style={{ position: 'relative', zIndex: 40, marginTop: '-220px' }}>
        <div className="absolute inset-0 z-0">
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
        <div className="relative z-10">
          <LogoCarouselDemo />
          <div className="text-center mt-8">
            <HoverButton 
              href="https://form.typeform.com/to/wf94YwH4?typeform"
              variant="default"
            >
              <span className="flex items-center gap-2">
                Become a Sponsor
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </HoverButton>
          </div>
        </div>
      </section>

      {/* How it Started Section */}
      <section className="py-32 relative bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 z-0">
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
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
              How it Started
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From a simple tweet to the world's largest hackathon
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
        <div className="relative z-20">
          <PrizesSection />
        </div>
      </section>

      {/* Combined Host and Judges Section */}
      <section id="judges" className="py-12 relative bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          {/* Main Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-animate">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet your host and world-class judges - tech's most influential builders and visionaries who will guide and evaluate your projects
            </p>
          </div>

          {/* Host section */}
          <div id="host-section" className="mb-20">
            <HostCardMorphing />
          </div>
          
          {/* Judges section */}
          <div id="judges-section">
            <JudgesCardMorphing />
          </div>
        </div>

        {/* Sponsors Section */}
        <section id="sponsors" className="relative bg-[#0A0A0A] overflow-hidden pb-12 mt-20">
          <div className="relative z-10">
            <SponsorsSection />
          </div>
        </section>
      </section>

      {/* Build Something Extraordinary Section */}
      <section id="build-extraordinary-section" className="relative bg-[#0A0A0A] overflow-hidden py-6">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#0A0A0A] overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto h-[32rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/10 backdrop-blur-sm relative">
            {/* Particles Background */}
            <div className="absolute inset-0 w-full h-full">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1.2}
                particleDensity={1000}
                className="w-full h-full"
                particleColor="#2979FF"
                speed={0.8}
              />
            </div>

            {/* Blue Light Gradients at Top */}
            <div className="absolute inset-x-0 top-0">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#2979FF] to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#73A7FF] to-transparent h-px w-1/4" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4">
              <h1 className="md:text-5xl text-4xl lg:text-6xl font-bold text-center text-white mb-4">
                Be Part of a World Record
                <span className="block text-xl md:text-2xl lg:text-3xl mt-4 text-gray-400 font-normal">
                  Join thousands of developers in making history
                </span>
              </h1>
              <div className="mt-8">
                <HoverButton 
                  href="https://form.typeform.com/to/wf94YwH4?typeform" 
                  variant="blue"
                >
                  <span className="flex items-center gap-3 text-xl font-semibold justify-center py-2 px-4 min-w-[320px]">
                    Register Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </HoverButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 border-t border-[#2979FF]/30">
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
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Host Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Host</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://twitter.com/gregisenberg" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Greg Isenberg
                  </a>
                </li>
                <li>
                  <a 
                    href="https://latecheckout.substack.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors"
                  >
                    Late Checkout
                  </a>
                </li>
              </ul>
            </div>

            {/* Judges Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Judges</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://twitter.com/LoganPaul" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Logan Paul
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com/levelsio" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Pieter Levels
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com/youyuxi" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Evan You
                  </a>
                </li>
              </ul>
            </div>

            {/* Sponsors Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sponsors</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://algorand.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Algorand
                  </a>
                </li>
                <li>
                  <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Bolt.new
                  </a>
                </li>
                <li>
                  <a href="https://cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Cloudflare
                  </a>
                </li>
                <li>
                  <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Netlify
                  </a>
                </li>
                <li>
                  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Supabase
                  </a>
                </li>
                <li>
                  <a href="https://lu.ma/hsrhackerhouse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Hacker House
                  </a>
                </li>
                <li>
                  <a href="https://exa.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#2DD4BF] transition-colors">
                    Exa
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2">
                    <Discord className="w-4 h-4" />
                    Join Discord
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@hackathon.com" className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[#2DD4BF] transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 border-t border-white/5 pt-8">
            <p>© 2025 World's Largest Hackathon. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;