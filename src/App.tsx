import React, { useState, useEffect, useRef } from 'react';
import { Code2, Trophy, Globe2, Calendar, Sparkles, Users, Award, Cpu, ArrowRight, Github, Twitter, Linkedin, Disc as Discord, Mail, Rocket, Brain, Zap, Target, Lightbulb, Laptop, Gamepad2, Image, Music, Gamepad, Headphones, Radio, MusicIcon, CheckCircle, HelpCircle } from 'lucide-react';
import { Globe } from "@/components/ui/globe";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { SparklesCore } from "@/components/ui/sparkles";
import { CardGradient } from "@/components/ui/card-gradient";
import { StatsDemo } from "@/components/ui/stats-demo";
import { ScrollDemo } from "@/components/ui/scroll-demo";
import { GlareCardDemo } from "@/components/ui/glare-card-demo";
import { HostCard } from "@/components/ui/host-card";
import { SimpleGlobeSection } from "@/components/ui/SimpleGlobeSection";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Languages, UserRound, Star, Compass, Blocks, Workflow, GraduationCap } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Stats } from "@/components/ui/stats";
import { SpotlightDemo } from "@/components/ui/spotlight-demo";
import { motion } from 'framer-motion';
import { HostCardMorphing, JudgesCardMorphing } from "@/components/ui/morphing-dialog-demo";
import { PrizesSection } from "@/components/ui/prizes-section";
import { Navigation } from "@/components/ui/navigation";
import { HoverButton } from "@/components/ui/hover-button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypeformModal } from "@/components/ui/typeform-modal";
import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";
import { RotatingWheel } from '@/components/ui/rotating-wheel';
import { projects } from '@/components/ui/project-wheel-data';
import { Link } from "react-router-dom";
import { ContentModal } from "@/components/ui/content-modal";

const colors = {
  primary: {
    light: 'rgb(206, 170, 250)', // Light purple
    main: 'rgb(149, 100, 221)', // Purple
    dark: 'rgb(110, 50, 190)', // Dark purple
  },
  secondary: {
    light: 'rgb(255, 187, 255)', // Light pink
    main: 'rgb(255, 137, 246)', // Pink
    dark: 'rgb(201, 55, 187)', // Dark pink
  },
};

const features = [
  {
    icon: <Compass className="h-6 w-6" />,
    title: 'Innovative Technology',
    description: 'Cutting-edge AI algorithms to power your creative projects.'
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Supercharged Performance',
    description: 'Lightning-fast processing for seamless user experience.'
  },
  {
    icon: <Blocks className="h-6 w-6" />,
    title: 'Scalable Architecture',
    description: 'Built to grow with your needs, from startups to enterprises.'
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Flexible Workflows',
    description: 'Adapt to any process with customizable pipelines.'
  },
  {
    icon: <Languages className="h-6 w-6" />,
    title: 'Multilingual Support',
    description: 'Break language barriers with our global language features.'
  },
  {
    icon: <UserRound className="h-6 w-6" />,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces built with users in mind.'
  },
];

// Game genres array
const gameGenres = [
  "Action RPG", "Adventure", "Arcade", "Battle Royale", "Beat 'em Up", 
  "Card Game", "City Builder", "Clicker", "Collection", "Deck Builder", 
  "Dungeon Crawler", "Farming Sim", "Fighting", "First-Person Shooter", 
  "Flight Sim", "Hack and Slash", "Hidden Object", "Horror", "Idle", 
  "Life Sim", "MMORPG", "MOBA", "Management", "Metroidvania", "Music", 
  "Open World", "Party Game", "Platformer", "Point & Click", "Puzzle", 
  "Racing", "Real-Time Strategy", "Rhythm", "Roguelike", "Roguelite", 
  "Role-Playing", "Sandbox", "Shoot 'em Up", "Simulation", "Souls-like", 
  "Sports", "Stealth", "Story-Rich", "Strategy", "Survival", "Tactical", 
  "Text-Based", "Third-Person Shooter", "Tower Defense", "Turn-Based", 
  "Visual Novel", "Walking Simulator"
];

// Music genres for the rotating circle
const musicGenres = [
  "Alternative Rock", "Ambient", "Blues", "Classical", "Country", 
  "Dance", "Disco", "Drum & Bass", "Dubstep", "EDM", 
  "Electronic", "Folk", "Funk", "Gospel", "Grime", 
  "Hip Hop", "House", "Indie", "Jazz", "K-Pop", 
  "Latin", "Metal", "Opera", "Pop", "Punk", 
  "R&B", "Reggae", "Rock", "Soul", "Techno", 
  "Trance", "Trap", "World Music", "Lo-Fi", "Synthwave",
  "Afrobeat", "Bluegrass", "Bossa Nova", "Celtic", "Chillwave",
  "Dancehall", "Death Metal", "Disco", "Downtempo", "Dream Pop",
  "Drill", "Electro Swing", "Emo", "Experimental", "Flamenco",
  "Garage", "Glitch Hop", "Grunge", "Hard Rock", "Hardcore",
  "Heavy Metal", "Industrial", "J-Pop", "Jungle", "Motown",
  "New Wave", "Nu Metal", "Orchestral", "Post-Rock", "Progressive Rock",
  "Psychedelic", "Punk Rock", "Reggaeton", "Rhythm & Blues", "Salsa",
  "Samba", "Ska", "Smooth Jazz", "Soft Rock", "Trip Hop",
  "Vaporwave", "Vocal", "Zydeco", "Acoustic", "Big Band",
  "Breakbeat", "Chamber Music", "Choral", "Christian", "Cinematic",
  "Comedy", "Cumbia", "Dark Ambient", "Doo Wop", "Easy Listening",
  "Fusion", "Gabber", "Gothic", "Happy Hardcore", "Hardstyle",
  "Honky Tonk", "Instrumental", "Mambo", "Mariachi", "Merengue",
  "Minimal", "Polka", "Ragtime", "Rockabilly", "Shoegaze",
  "Swing", "Traditional", "Tribal", "Turntablism", "Western"
];

function getRandomGameGenre(index: number) {
  return gameGenres[index % gameGenres.length];
}

// Hero section with pixel art border styling
const pixelBorderStyle = {
  borderStyle: 'solid',
  borderWidth: '4px',
  borderImageSlice: '4',
  borderImageSource: 'linear-gradient(to right, #ff2d55, #4cd964, #5856d6, #ff9500)',
  borderImageRepeat: 'stretch',
  boxShadow: '0 0 15px rgba(255, 45, 85, 0.5)'
};

// Music note animations - reducing quantity and opacity
const MusicNotes = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {[...Array(5)].map((_, i) => {
        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        const opacity = Math.random() * 0.3 + 0.1;
        
        return (
          <div
            key={i}
            className="absolute text-pink-500/20"
            style={{
              left: `${left}%`,
              fontSize: `${size}px`,
              animation: `float ${duration}s linear ${delay}s infinite`,
              opacity
            }}
          >
            {i % 2 === 0 ? '♪' : '♫'}
          </div>
        );
      })}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Pixel art game controllers
const PixelControllers = () => {
  return (
    <div className="absolute right-0 bottom-0 p-8 opacity-20 pointer-events-none">
      <div className="w-24 h-24 bg-pink-500 pixel-art"></div>
      <style>{`
        .pixel-art {
          mask-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12h4m-2-2v4M15 11h.01M18 11h.01M17.5 8h-11a4.5 4.5 0 00-4.5 4.5v0a4.5 4.5 0 004.5 4.5h11a4.5 4.5 0 004.5-4.5v0a4.5 4.5 0 00-4.5-4.5z' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }
      `}</style>
    </div>
  );
};

function App() {
  const wheelRef = useRef<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState("");
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate countdown to April 1st
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(2025, 3, 1); // April 1st, 2025 (months are 0-based)
      const diff = target.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);
  
  // Add state for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  
  const handleRandomProject = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Play spin sound
    const audio = new Audio('/sounds/spin.mp3');
    audio.play();

    // Select a random project
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    
    // Calculate the angle to position this project at the top
    const projectIndex = projects.findIndex(p => p.author === randomProject.author);
    const anglePerProject = 360 / projects.length;
    const targetAngle = -(projectIndex * anglePerProject) + 720; // Add 2 full rotations for effect

    // Spin the wheel
    wheelRef.current?.spinToAngle(targetAngle, 2500, () => {
      // After spin completes, trigger project click to show portal
      setTimeout(() => {
        wheelRef.current?.handleProjectClick(randomProject);
        setIsSpinning(false);
      }, 500);
    });
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden fixed inset-0">
      {/* Hero Section - Updated with Rick and Morty colors */}
      <section className="relative h-screen overflow-hidden">
        {/* Background gradient with Rick and Morty colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3c1b63] via-[#121212] to-[#0f492e] opacity-80 z-0"></div>
        
        {/* Animated particles in Rick and Morty colors */}
        <div className="absolute inset-0 z-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  '#84e364', // Portal green
                  '#2196f3', // Rick's shirt blue
                  '#ff66c4', // Pink alien color
                  '#fbec5d', // Yellow
                  '#00b5cc', // Morty's shirt teal
                ][Math.floor(Math.random() * 5)],
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Main content container with full width */}
        <div className="w-full h-full relative z-10 flex flex-col lg:flex-row">
          {/* Custom CSS to modify wheel genre colors */}
          <style>{`
            .genre-link {
              color: inherit !important;
              background-color: rgba(0, 0, 0, 0.4) !important;
              text-shadow: 0 0 4px currentColor !important;
            }
            
            .genre-link:hover {
              background-color: rgba(0, 0, 0, 0.6) !important;
              box-shadow: 0 0 10px currentColor !important;
            }
            
            .trailing-link {
              color: inherit !important;
              opacity: 0.7 !important;
              text-shadow: 0 0 3px currentColor !important;
            }
            
            .trailing-link:hover {
              background-color: rgba(0, 0, 0, 0.4) !important;
              box-shadow: 0 0 8px currentColor !important;
            }
            
            .genre-wheel .genre-item:nth-child(9n+1) {
              color: #84e364 !important; /* Portal green */
            }
            
            .genre-wheel .genre-item:nth-child(9n+2) {
              color: #2196f3 !important; /* Rick's shirt blue */
            }
            
            .genre-wheel .genre-item:nth-child(9n+3) {
              color: #ff66c4 !important; /* Pink alien color */
            }
            
            .genre-wheel .genre-item:nth-child(9n+4) {
              color: #fbec5d !important; /* Yellow */
            }
            
            .genre-wheel .genre-item:nth-child(9n+5) {
              color: #00b5cc !important; /* Teal */
            }
            
            .genre-wheel .genre-item:nth-child(9n+6) {
              color: #c792ea !important; /* Light purple */
            }
            
            .genre-wheel .genre-item:nth-child(9n+7) {
              color: #ff9f43 !important; /* Orange */
            }
            
            .genre-wheel .genre-item:nth-child(9n+8) {
              color: #40c4ff !important; /* Light blue */
            }
            
            .genre-wheel .genre-item:nth-child(9n+9) {
              color: #69f0ae !important; /* Light green */
            }
          `}</style>
          
          {/* Left content - Text section with simplified copy */}
          <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-16 flex items-center z-30 relative">
            <div className="w-full">
              {/* Sponsor Logos */}
              <div className="mb-12">
                <div className="text-white/70 text-sm font-medium transform -rotate-1 mb-3">
                  Presented by
                </div>
                <div className="flex gap-3 mt-2">
                  <a 
                    href="https://bolt.fun" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 shadow-lg transform rotate-1 w-[120px] hover:scale-105 transition-transform"
                  >
                    <img 
                      src="/images/bolttoo.png" 
                      alt="Bolt" 
                      className="w-full h-auto"
                    />
                  </a>
                  <a 
                    href="https://coderabbit.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 shadow-lg transform -rotate-2 w-[120px] hover:scale-105 transition-transform"
                  >
                    <img 
                      src="/images/rabbit.png" 
                      alt="CodeRabbit" 
                      className="w-full h-auto"
                    />
                  </a>
                </div>
              </div>

              {/* Countdown */}
              <div className="text-lg font-medium mb-4">
                <span className="text-white/90">Time Left to Submit:</span>{' '}
                <span className="text-green-400">{countdown}</span>
              </div>
              <div className="relative mb-3">
                <h1 className="game-jam text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#84e364] via-[#2196f3] to-[#ff66c4]">
                  2025 Vibe
                </h1>
                <h1 className="game-jam text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#84e364] via-[#2196f3] to-[#ff66c4]">
                  Coding Game Jam
                </h1>
                <div className="h-1 w-3/4 bg-gradient-to-r from-[#84e364] via-[#2196f3] to-[#ff66c4] rounded-full"></div>
              </div>
              
              <p className="text-[#84e364] text-sm md:text-base lg:text-base mt-6 max-w-md">
                Create games with AI. Win prizes. Have fun.
              </p>
              
              <div className="mt-6">
                <button 
                  onClick={() => {
                    setModalTitle("Submit Your Game");
                    setModalUrl("https://docs.google.com/forms/d/e/1FAIpQLSdB8LEZIoYuh4_tO89s2DbMT7nqyDvJGrgrrUoBquLA4XCBRA/viewform");
                    setModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#84e364] hover:bg-[#6bc44e] text-black text-sm font-bold rounded-lg transform transition hover:scale-105 hover:shadow-[0_0_15px_rgba(132,227,100,0.8)] z-50 relative"
                >
                  <Gamepad2 className="h-4 w-4" />
                  Submit Your Game
                </button>
                
                <button 
                  onClick={handleRandomProject}
                  disabled={isSpinning}
                  className={`mt-3 inline-flex items-center gap-2 px-4 py-2 ${
                    isSpinning ? 'bg-gray-500/20' : 'bg-black/20 hover:bg-black/40'
                  } text-white/70 hover:text-white/90 text-sm font-medium rounded-lg transform transition hover:scale-105 backdrop-blur-sm border border-white/10 z-50 relative`}
                >
                  {isSpinning ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white/40 rounded-full border-t-transparent"></span>
                  ) : (
                    <>
                      <div className="relative">
                        <div className="absolute -left-3 -top-1 text-white/40 transform -rotate-12">⚅</div>
                        <div className="text-white/60">⚄</div>
                      </div>
                    </>
                  )}
                  {isSpinning ? 'Spinning...' : 'Random Game Inspiration'}
                </button>
          </div>
        </div>
      </div>

          {/* Right content - Wheel section with adjusted left position */}
          <div className="w-full lg:w-[120%] h-screen absolute lg:relative right-0 lg:-left-[24rem] top-0 pointer-events-auto z-10 overflow-visible">
            <RotatingWheel ref={wheelRef} className="w-full h-full" />
          </div>
        </div>

        {/* Contest Rules */}
        <div className="absolute top-[25%] right-[20px] z-20 max-w-[220px] bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-[#84e364]/30">
          <h3 className="text-[#84e364] text-sm font-bold mb-2">Contest Rules</h3>
          <ul className="text-white text-xs space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle className="h-3 w-3 text-[#84e364] mt-0.5 flex-shrink-0" />
              <span>All games must be web-based with no login required</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="h-3 w-3 text-[#84e364] mt-0.5 flex-shrink-0" />
              <span>At least 80% of code must be AI-written</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="h-3 w-3 text-[#84e364] mt-0.5 flex-shrink-0" />
              <span>Games must start instantly with no heavy downloads</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="h-3 w-3 text-[#84e364] mt-0.5 flex-shrink-0" />
              <span>Any engine allowed (ThreeJS recommended)</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="h-3 w-3 text-[#84e364] mt-0.5 flex-shrink-0" />
              <span>Multiplayer support encouraged but not required</span>
            </li>
          </ul>
        </div>
        
        {/* Rule Tags */}
        <div className="absolute bottom-[15%] right-[20px] flex flex-col gap-4 z-20 max-w-[180px]">
          <div className="bg-[#0f492e]/80 text-[#84e364] px-3 py-1.5 rounded-lg font-bold shadow-lg transform rotate-2 text-xs flex items-center gap-2">
            <Code2 className="h-3.5 w-3.5" />
            ThreeJS Recommended
          </div>
          <div className="bg-[#3c1b63]/80 text-[#ff66c4] px-3 py-1.5 rounded-lg font-bold shadow-lg transform -rotate-1 text-xs flex items-center gap-2">
            <Zap className="h-3.5 w-3.5" />
            No Loading Screens
          </div>
          <div className="bg-[#00669b]/80 text-[#2196f3] px-3 py-1.5 rounded-lg font-bold shadow-lg transform rotate-1 text-xs flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            Multiplayer Encouraged
          </div>
        </div>
      </section>

      {/* Add the ContentModal */}
      <ContentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        url={modalUrl}
      />
    </main>
  );
}
export default App;
