import React, { useState, useEffect, useRef } from 'react';
import { Globe } from './globe';
import { TimerDisplay } from './timer-display';

// Component for floating symbols
interface FloatingSymbolProps {
  id: number;
  x: number;
  y: number;
  value: string;
  duration: number;
  delay: number;
}

// Programming symbols
const programmingSymbols = [
  '</>', '{}', '[]', '()', '<>', '::', ';;', '//', '\\\\', '==', '!=', '+=', '-=',
  '=>', '->', '<-', '<=', '>=', '===', '!==', '||', '&&', '**', '~~', '!!', '%%',
  '##', '**', '--', '__', '^^', '::', '::', '||=', '=>>', '<<', '>>', '<<<', '>>>',
  '::=', ':=', '@', '#', '$', '%', '^', '&', '*', '~', '?', '!', '|',
  '_', '-', '+', '=', '.', ',', ';', ':', '/', '\\'
];

// Much simpler component with direct style animation
const FloatingSymbol: React.FC<FloatingSymbolProps> = ({ id, x, y, value, duration, delay }) => {
  // Generate a fixed size for this symbol
  const symbolSize = Math.floor(Math.random() * 6 + 18);
  
  // Animation styles using keyframes with direct top/left positioning
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        color: 'rgba(255, 255, 255, 0.35)', // Less bright
        fontSize: `${symbolSize}px`,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textShadow: '0 0 8px rgba(41, 121, 255, 0.25)', // Reduced glow
        zIndex: 1,
        animation: `floatUp${id % 5} ${duration}s ease-out ${delay}s forwards`,
        opacity: 0,
        pointerEvents: 'none',
      }}
    >
      {value}
    </div>
  );
};

interface SimpleGlobeSectionProps {
  registrationCount: number;
}

export function SimpleGlobeSection({ registrationCount }: SimpleGlobeSectionProps) {
  const [floatingSymbols, setFloatingSymbols] = useState<FloatingSymbolProps[]>([]);
  const [counter, setCounter] = useState(0);
  const [usedSymbols, setUsedSymbols] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  
  // Create multiple keyframe animations for different paths
  useEffect(() => {
    // Create keyframes style element if it doesn't exist
    if (!document.getElementById('float-keyframes')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'float-keyframes';
      
      // Create 5 different animation paths to reduce overlap
      let keyframesRules = '';
      for (let i = 0; i < 5; i++) {
        // Different horizontal drift for each path
        const horizontalDrift = 20 + (i * 10);
        const direction = i % 2 === 0 ? 1 : -1; // Alternate directions
        
        keyframesRules += `
          @keyframes floatUp${i} {
            0% {
              opacity: 0;
              transform: translateY(0) translateX(0);
            }
            10% {
              opacity: 0.35;
            }
            90% {
              opacity: 0.35;
            }
            100% {
              opacity: 0;
              transform: translateY(-400px) translateX(${direction * horizontalDrift}px);
            }
          }
        `;
      }
      
      styleEl.innerHTML = keyframesRules;
      document.head.appendChild(styleEl);
    }
  }, []);
  
  // Generate random unique symbol
  const getRandomSymbol = (): string => {
    // Filter out symbols that are already in use
    const availableSymbols = programmingSymbols.filter(symbol => !usedSymbols.has(symbol));
    
    // If all symbols are used, pick a random one
    if (availableSymbols.length === 0) {
      return programmingSymbols[Math.floor(Math.random() * programmingSymbols.length)];
    }
    
    return availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
  };
  
  // Define fixed emission points to prevent overlaps
  const emissionPoints = [
    { x: -0.8, y: 0 },
    { x: -0.5, y: 0 },
    { x: -0.2, y: 0 },
    { x: 0, y: 0 },
    { x: 0.2, y: 0 },
    { x: 0.5, y: 0 },
    { x: 0.8, y: 0 }
  ];
  
  // Add new floating symbols periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      
      // Only add a new symbol if we're under the limit
      if (floatingSymbols.length >= 15) {
        // If we're at the limit, force remove the oldest symbol to make room
        setFloatingSymbols(prev => {
          if (prev.length >= 15) {
            const newSymbols = [...prev];
            // Remove the oldest symbol (lowest ID)
            const oldestSymbol = newSymbols.reduce((oldest, current) => 
              current.id < oldest.id ? current : oldest, newSymbols[0]);
            
            // Remove the symbol from usedSymbols
            setUsedSymbols(symbolSet => {
              const newSet = new Set(symbolSet);
              newSet.delete(oldestSymbol.value);
              return newSet;
            });
            
            return newSymbols.filter(s => s.id !== oldestSymbol.id);
          }
          return prev;
        });
        return;
      }
      
      // Get container dimensions
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const bottomY = rect.height;
      
      // Pick a point that isn't too close to existing symbols
      const pointIndex = counter % emissionPoints.length;
      const point = emissionPoints[pointIndex];
      
      // Calculate start position based on container dimensions
      const arcWidth = Math.min(rect.width * 0.9, 1200);
      const startX = centerX + (point.x * arcWidth * 0.45);
      
      // Position just at the edge of the semicircle
      const startY = bottomY - 150;
      
      // Get a random symbol that isn't already displayed
      const symbolValue = getRandomSymbol();
      
      const newSymbol = {
        id: counter,
        x: startX,
        y: startY,
        value: symbolValue,
        duration: 8 + Math.random() * 3, // Slower rise for better visibility
        delay: 0,
      };
      
      // Add to the list of used symbols
      setUsedSymbols(prev => {
        const newSet = new Set(prev);
        newSet.add(symbolValue);
        return newSet;
      });
      
      setFloatingSymbols(prev => [...prev, newSymbol]);
      setCounter(prev => prev + 1);
      
    }, 600); // Add a new symbol more frequently
    
    return () => clearInterval(interval);
  }, [counter, floatingSymbols.length, usedSymbols]);
  
  // Remove symbols that have completed their animation and update used symbols
  useEffect(() => {
    const cleanup = setInterval(() => {
      if (isUpdatingRef.current) return;
      isUpdatingRef.current = true;
      
      try {
        // For any symbol that's been around longer than its duration + delay, remove it
        const symbolsToRemove: FloatingSymbolProps[] = [];
        
        // Track when each symbol was added using its ID as a proxy (since IDs increment by 1)
        floatingSymbols.forEach(symbol => {
          // We don't have actual timestamp, but can estimate based on creation order and interval timing
          const estimatedElapsedTime = (counter - symbol.id) * 600 / 1000; // in seconds
          
          if (estimatedElapsedTime > symbol.duration + symbol.delay + 1) {
            symbolsToRemove.push(symbol);
          }
        });
        
        if (symbolsToRemove.length > 0) {
          // Update the used symbols set - remove symbols that aren't active anymore
          setUsedSymbols(prev => {
            const newSet = new Set(prev);
            
            symbolsToRemove.forEach(symbol => {
              newSet.delete(symbol.value);
            });
            
            return newSet;
          });
          
          // Remove the completed symbols
          setFloatingSymbols(prev => 
            prev.filter(symbol => !symbolsToRemove.some(s => s.id === symbol.id))
          );
        }
      } finally {
        isUpdatingRef.current = false;
      }
    }, 1000);
    
    return () => clearInterval(cleanup);
  }, [floatingSymbols, counter]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative',
        height: '800px',
        width: '100%',
        overflow: 'hidden',
        marginTop: '3rem',
        marginBottom: '0'
      }}
    >
      {/* Fixed background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at bottom center, #2979FF, transparent 70%)',
        opacity: 0.4
      }} />
      
      {/* Blue glow at the bottom */}
      <div style={{
        position: 'absolute',
        left: '-50%',
        bottom: '-5%',
        width: '200%',
        height: '200px',
        background: '#2979FF',
        opacity: 0.3,
        filter: 'blur(25px)',
        zIndex: 1
      }} />
      
      {/* The semicircle */}
      <div style={{
        position: 'absolute',
        left: '-50%',
        bottom: '-5%',
        width: '200%',
        height: '350px',
        borderTopLeftRadius: '50% 100%',
        borderTopRightRadius: '50% 100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: '#0A0A0A',
        zIndex: 4
      }} />
      
      {/* Floating symbols container */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {floatingSymbols.map(symbol => (
          <FloatingSymbol
            key={symbol.id}
            id={symbol.id}
            x={symbol.x}
            y={symbol.y}
            value={symbol.value}
            duration={symbol.duration}
            delay={symbol.delay}
          />
        ))}
      </div>

      {/* Globe */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '45%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        zIndex: 3
      }}>
        <Globe />
        
        {/* Floating Cards overlaying the globe */}
        <div className="absolute inset-0 w-full h-full">
          {/* Timer Display - positioned similar to the top-right card in image */}
          <div className="absolute top-[15%] right-0 transform rotate-3 z-20" 
               style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))" }}>
            <TimerDisplay />
          </div>
          
          {/* Registration progress card - moved to the tech stack position */}
          <div className="absolute top-[35%] left-[5%] transform -rotate-12 z-20"
               style={{ 
                 filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))"
               }}>
            <div className="relative bg-black/90 backdrop-blur-md p-4 rounded-xl w-32 h-32 flex flex-col items-center justify-center">
              {/* Progress border around the entire card */}
              <div 
                className="absolute inset-0 rounded-xl z-0 overflow-hidden"
                style={{
                  background: `conic-gradient(#2979FF ${Math.min(100, (registrationCount / 100000) * 100)}%, transparent 0%)`,
                  padding: '2px'
                }}
              >
                <div className="w-full h-full bg-black/90 backdrop-blur-md rounded-xl"></div>
              </div>
              
              {/* Content centered */}
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Registered</p>
                <p className="text-2xl font-bold text-white mt-0.5 mb-0.5">{registrationCount.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400">of 100,000 goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 