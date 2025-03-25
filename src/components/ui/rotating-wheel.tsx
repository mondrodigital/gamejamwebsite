"use client";

import React, { useState, useRef, useEffect } from 'react';
import { projects, getProjectUrl } from './project-wheel-data';
import { ContentModal } from "./content-modal";

// Define CSS styles as a string
const wheelStyles = `
@keyframes rotateWheel {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotateWheelReverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

.genre-wheel {
  transform-origin: center center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  user-select: none;
}

.genre-wheel.auto-rotating {
  animation: rotateWheel 120s linear infinite;
}

.genre-wheel.dragging {
  animation: none;
}

.genre-item {
  position: absolute;
  white-space: nowrap;
  transform-origin: center left;
  transition: all 0.2s ease;
  cursor: default;
  user-select: none;
}

.genre-item:hover {
  text-shadow: 0 0 8px currentColor;
  opacity: 1 !important;
  z-index: 10;
}

.genre-wheel.dragging .genre-item {
  cursor: grabbing;
}

.genre-link {
  color: inherit;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  transition: all 0.2s ease;
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer !important;
  position: relative;
  z-index: 100;
  font-size: 14px;
}

@media (max-width: 768px) {
  .genre-link {
    font-size: 12px;
    padding: 3px 6px;
  }
}

.genre-link:hover {
  background-color: rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
  text-decoration: underline;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* Links panel styles */
.genre-links-container {
  position: fixed;
  right: 16px;
  top: 80px;
  width: min(300px, calc(100% - 32px));
  max-height: 60vh;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  padding: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  backdrop-filter: blur(10px);
}

.toggle-links-button {
  position: fixed;
  right: 16px;
  top: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 1001;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
}

/* Portal styles */
.portal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(5px);
}

.portal-container {
  position: relative;
  width: min(300px, 90vw);
  height: min(300px, 90vw);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.portal-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  z-index: 9004;
  width: 100%;
  padding: 0 20px;
}

.portal-text h2 {
  font-size: clamp(18px, 5vw, 24px);
  margin-bottom: 8px;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
}

.portal-text p {
  font-size: clamp(14px, 4vw, 18px);
  opacity: 0.8;
}

/* Judges panel styles */
.judges-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.judges-title {
  color: white;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.judges-grid {
  display: flex;
  gap: 10px;
}

.judge-item {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.judge-item:hover {
  transform: scale(1.1);
}

.judge-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.judge-name {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 11px;
  white-space: nowrap;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.judge-item:hover .judge-name {
  opacity: 1;
}
`;

interface RotatingWheelProps {
  className?: string;
  onProjectClick?: (project: typeof projects[0]) => void;
}

// Convert to forwardRef to allow parent components to access handleProjectClick
export const RotatingWheel = React.forwardRef<
  { handleProjectClick: (project: typeof projects[0]) => void; spinToAngle: (angle: number, duration: number, callback?: () => void) => void },
  RotatingWheelProps
>(({ className, onProjectClick }, ref) => {
  // Create an expanded array of projects by splitting author names into words
  const expandedProjects = projects.flatMap(project => {
    // Split author name into words and create a project entry for each word
    const words = project.author.split(/[\s-]+/);
    return words.map(word => ({
      ...project,
      displayName: word
    }));
  });

  // Set minimum number of slots to ensure wheel is well populated
  const minSlots = 72; // Increased from 36 to create more density
  
  // Create repeated array to fill the wheel
  const repeatedProjects = Array.from({ length: Math.ceil(minSlots / expandedProjects.length) })
    .flatMap(() => expandedProjects)
    .slice(0, minSlots)
    .map((project, index) => ({
      ...project,
      displayName: project.displayName + (index >= expandedProjects.length ? ` ${Math.floor(index / expandedProjects.length) + 1}` : '')
    }));
  
  // Use repeatedProjects instead of projects
  const filteredProjects = repeatedProjects;
  
  // State to track rotation angle and dragging
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [spinVelocity, setSpinVelocity] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showLinks, setShowLinks] = useState(false);
  // Track rotation direction for auto-rotation
  const [rotationDirection, setRotationDirection] = useState<'clockwise' | 'counter-clockwise'>('clockwise');
  // Track animation delay for resuming auto-rotation
  const [animationDelay, setAnimationDelay] = useState('0s');
  // Track animation offset for resuming auto-rotation
  const [animationOffset, setAnimationOffset] = useState(0);
  
  // Refs
  const wheelRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, angle: 0, time: 0 });
  const dragPrevRef = useRef({ x: 0, y: 0, angle: 0, time: 0 });
  const spinTimerRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const manualSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Add new portal state
  const [showPortal, setShowPortal] = useState(false);
  const [portalGenre, setPortalGenre] = useState("");
  const [particles, setParticles] = useState<Array<{id: number, left: number, top: number, delay: number, size: number, color: string}>>([]);
  const portalTimeoutRef = useRef<number | null>(null);

  // Add manual spinning state
  const [isManuallySpinning, setIsManuallySpinning] = useState(false);
  const [manualSpinTarget, setManualSpinTarget] = useState(0);
  const [manualSpinDuration, setManualSpinDuration] = useState(0);
  
  // Add modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  
  // Calculate center point of wheel
  const getWheelCenter = () => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };
  
  // Calculate angle from a point relative to center
  const getAngleFromPoint = (point: { x: number, y: number }) => {
    const center = getWheelCenter();
    return Math.atan2(point.y - center.y, point.x - center.x) * (180 / Math.PI);
  };
  
  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Skip if clicked on a link
    if ((e.target as HTMLElement).tagName === 'A' || 
        (e.target as HTMLElement).closest('a')) {
      return; // Allow link clicks to pass through
    }
    
    e.preventDefault();
    
    // Stop auto-rotation and any ongoing spin
    setIsAutoRotating(false);
    if (spinTimerRef.current) {
      cancelAnimationFrame(spinTimerRef.current);
      spinTimerRef.current = null;
    }
    
    setIsDragging(true);
    
    // Get current position and time
    const point = 'touches' in e 
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    
    const time = Date.now();
    const angle = getAngleFromPoint(point);
    
    // Store starting values
    dragStartRef.current = { x: point.x, y: point.y, angle, time };
    dragPrevRef.current = { x: point.x, y: point.y, angle, time };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
  };
  
  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // Get current position
    const point = 'touches' in e 
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    
    const time = Date.now();
    const angle = getAngleFromPoint(point);
    
    // Calculate angle difference
    let angleDiff = angle - dragPrevRef.current.angle;
    
    // Handle angle wrap-around
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    // Update rotation
    setCurrentAngle(prev => prev + angleDiff);
    
    // Calculate and update velocity
    const timeDiff = time - dragPrevRef.current.time;
    if (timeDiff > 0) {
      const velocity = angleDiff / timeDiff * 20; // Scale for more noticeable effect
      setSpinVelocity(velocity);
    }
    
    // Store current values for next movement
    dragPrevRef.current = { x: point.x, y: point.y, angle, time };
  };
  
  // Handle mouse up
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchend', handleMouseUp);
    
    // Apply momentum spin if velocity is significant
    if (Math.abs(spinVelocity) > 0.1) {
      spinWithMomentum();
    } else {
      // Resume auto rotation if no significant momentum
      setTimeout(() => setIsAutoRotating(true), 500);
    }
  };
  
  // Apply spin with momentum
  const spinWithMomentum = () => {
    let velocity = spinVelocity;
    
    const spin = () => {
      // Apply friction - slow down gradually
      velocity *= 0.98;
      
      // Update position based on velocity
      setCurrentAngle(prev => prev + velocity);
      
      // Stop when velocity becomes very small
      if (Math.abs(velocity) < 0.1) {
        setSpinVelocity(0);
        setTimeout(() => setIsAutoRotating(true), 500);
        return;
      }
      
      // Continue spinning
      spinTimerRef.current = requestAnimationFrame(spin);
    };
    
    spinTimerRef.current = requestAnimationFrame(spin);
  };
  
  // Handle wheel scroll to control wheel direction
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    // Stop auto-rotation when scrolling
    setIsAutoRotating(false);
    
    // Calculate scroll velocity and adjust wheel position
    const scrollAmount = e.deltaY * 0.05;
    setCurrentAngle(prev => prev + scrollAmount);
    
    // Reset any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Resume auto rotation after a delay
    if (spinTimerRef.current) {
      cancelAnimationFrame(spinTimerRef.current);
      spinTimerRef.current = null;
    }
    
    // Set timeout to resume auto-rotation
    scrollTimeoutRef.current = setTimeout(() => {
      setIsAutoRotating(true);
      scrollTimeoutRef.current = null;
    }, 1000);
  };
  
  // Handle project link click with portal animation
  const handleProjectClick = (project: typeof projects[0]) => {
    // Find the original project by author
    const originalProject = projects.find(p => p.author === project.author);
    if (originalProject) {
      setSelectedProject(originalProject);
      setPortalGenre(originalProject.author);
      setShowPortal(true);
      
      // Generate particles for portal effect
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 6 + 4,
        color: ['#76ff03', '#64dd17', '#43a047', '#00bcd4', '#2196f3'][Math.floor(Math.random() * 5)]
      }));
      setParticles(newParticles);
    }
  };
  
  // Handle portal click to show modal or redirect
  const handlePortalClick = () => {
    if (selectedProject) {
      // Get the URL for the project
      const projectUrl = getProjectUrl(selectedProject);
      
      // Only proceed if we have a valid URL
      if (projectUrl) {
        // Open the URL in a new tab
        window.open(projectUrl, '_blank', 'noopener,noreferrer');
      }
    }
    // Close the portal after opening the URL
    setShowPortal(false);
    setSelectedProject(null);
  };
  
  // Toggle the links panel
  const toggleLinks = () => {
    setShowLinks(prev => !prev);
  };
  
  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    handleProjectClick,
    spinToAngle
  }));

  // Clean up any timers on unmount
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) {
        cancelAnimationFrame(spinTimerRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (manualSpinTimeoutRef.current) {
        clearTimeout(manualSpinTimeoutRef.current);
      }
      if (portalTimeoutRef.current !== null) {
        window.clearTimeout(portalTimeoutRef.current);
      }
    };
  }, []);

  // Helper function to get auto-rotation styles
  const getAutoRotateStyles = () => {
    if (isManuallySpinning) {
      return {};
    }
    
    return {
      transition: 'transform 0.5s ease',
      transform: `rotate(${currentAngle}deg)`,
      animation: isAutoRotating ? `rotateWheel 120s linear infinite ${-currentAngle}deg` : 'none',
      animationPlayState: isAutoRotating ? 'running' : 'paused'
    };
  };
  
  // Add method to manually spin the wheel to a specific angle
  const spinToAngle = (targetAngle: number, duration: number = 3000, callback?: () => void) => {
    // Stop auto-rotation and any ongoing spin
    setIsAutoRotating(false);
    setIsManuallySpinning(true);
    
    if (spinTimerRef.current) {
      cancelAnimationFrame(spinTimerRef.current);
      spinTimerRef.current = null;
    }
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
    
    if (manualSpinTimeoutRef.current) {
      clearTimeout(manualSpinTimeoutRef.current);
      manualSpinTimeoutRef.current = null;
    }
    
    // Get the current rotation angle of the wheel
    const currentRotation = currentAngle;
    
    // Calculate the normalized target angle to find the selected project
    const normalizedTargetAngle = targetAngle % 360;
    const itemCount = filteredProjects.length;
    const anglePerItem = 360 / itemCount;
    const selectedIndex = Math.round(normalizedTargetAngle / anglePerItem) % itemCount;
    const selectedProject = filteredProjects[selectedIndex];
    
    // Set the selected project
    setSelectedProject(selectedProject);
    
    // Apply spinning animation directly to the wheel element
    if (wheelRef.current) {
      // First reset any existing transition to ensure clean start
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(${currentRotation}deg)`;
      
      // Force reflow to ensure the reset takes effect
      void wheelRef.current.offsetWidth;
      
      // Add transition with an easing function that spins fast then slows down
      // This creates a more noticeable spinning effect
      wheelRef.current.style.transition = `transform ${duration/1000}s cubic-bezier(0.1, 0.7, 0.3, 1)`;
      wheelRef.current.style.transform = `rotate(${targetAngle}deg)`;
      
      // Make all items fade slightly during spin
      const genreItems = document.querySelectorAll('.genre-item');
      genreItems.forEach(item => {
        (item as HTMLElement).style.transition = 'all 0.3s ease';
        (item as HTMLElement).style.opacity = '0.6';
      });
      
      // Calculate timing for the slowdown effect - at 60% of the duration
      setTimeout(() => {
        // Start highlighting the approaching selected project
        if (genreItems[selectedIndex]) {
          const selectedItem = genreItems[selectedIndex] as HTMLElement;
          selectedItem.style.textShadow = '0 0 20px currentColor, 0 0 10px white';
          selectedItem.style.opacity = '1';
          selectedItem.style.fontWeight = 'bold';
          selectedItem.style.scale = '1.3';
          
          const link = selectedItem.querySelector('.genre-link') as HTMLElement;
          if (link) {
            link.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            link.style.boxShadow = '0 0 15px currentColor';
          }
        }
      }, duration * 0.6);
      
      // Add a "click" effect when the wheel stops
      setTimeout(() => {
        if (genreItems[selectedIndex]) {
          const selectedItem = genreItems[selectedIndex] as HTMLElement;
          selectedItem.style.scale = '1.5';
          
          // Create a brief flash effect
          setTimeout(() => {
            selectedItem.style.scale = '1.3';
          }, 150);
        }
      }, duration - 100);
      
      // After animation completes
      manualSpinTimeoutRef.current = setTimeout(() => {
        // Set the current angle to the target
        setCurrentAngle(targetAngle);
        
        // Keep the selected project highlighted briefly before resetting
        setTimeout(() => {
          // Reset all project items to normal state
          const genreItems = document.querySelectorAll('.genre-item');
          genreItems.forEach(item => {
            (item as HTMLElement).style.textShadow = '';
            (item as HTMLElement).style.scale = '';
            (item as HTMLElement).style.fontWeight = '';
            (item as HTMLElement).style.opacity = '';
            
            const link = (item as HTMLElement).querySelector('.genre-link') as HTMLElement;
            if (link) {
              link.style.backgroundColor = '';
              link.style.boxShadow = '';
            }
          });
          
          if (wheelRef.current) {
            wheelRef.current.style.transition = '';
            wheelRef.current.style.transform = '';
          }
          
          // Save the final position for the auto-rotation to continue from
          setAnimationOffset(targetAngle % 360);
          setAnimationDelay('0s');
          setIsManuallySpinning(false);
          setIsAutoRotating(true);
          
          // Execute the callback if provided
          if (callback) callback();
        }, 500);
      }, duration);
    }
  };
  
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        <div
          ref={wheelRef}
          className={`genre-wheel ${isDragging ? 'dragging' : ''} ${
            isAutoRotating ? 'auto-rotating' : ''
          } ${className || ''}`}
          style={getAutoRotateStyles()}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onWheel={handleWheel}
        >
          <style>{wheelStyles}</style>
          
          {/* Add Judges Panel */}
          <div className="judges-panel">
            <div className="judges-title">Judges</div>
            <div className="judges-grid">
              {projects.filter(p => p.isJudge).map((judge, index) => (
                <div 
                  key={judge.handle} 
                  className="judge-item"
                  onClick={() => window.open(judge.tweetUrl, '_blank', 'noopener,noreferrer')}
                >
                  <img 
                    src={`/images/${judge.imageUrl}`} 
                    alt={judge.author}
                    className="judge-image"
                    loading="eager"
                  />
                  <div className="judge-name">@{judge.handle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Add mask gradient container */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 95%)',
            maskImage: 'linear-gradient(to right, black 0%, black 75%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 75%, transparent 95%)',
            zIndex: 20,
            width: '150%'  // Extend the mask beyond the container
          }} />
          <div className="absolute w-full h-full">
            <div 
              ref={wheelRef}
              className={`genre-wheel ${isDragging ? 'dragging' : ''} ${isAutoRotating ? 'auto-rotating' : ''}`}
              style={!isAutoRotating 
                ? { transform: `rotate(${currentAngle}deg)` } 
                : getAutoRotateStyles()}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              {filteredProjects.map((project, index) => {
                // Calculate angle based on index for a full circle
                const angle = (360 / filteredProjects.length) * index;
                
                // Use a fixed radius to create a perfect circle that follows the red line
                const radius = window.innerWidth <= 768 ? 200 : 300;
                
                // Generate color based on project position
                const colorScheme = [
                  '#FF2D55', // Pink
                  '#4CD964', // Green
                  '#5856D6', // Purple
                  '#FF9500', // Orange
                  '#00E4FF', // Cyan
                  '#FF375F', // Bright Pink
                  '#34C759', // Bright Green
                  '#AF52DE', // Bright Purple
                  '#FFCC00'  // Bright Yellow
                ];
                
                const colorIndex = (index * 2) % colorScheme.length;
                const color = colorScheme[colorIndex];
                
                // Calculate font size - using a fixed font size for consistency
                const fontSize = 16; // Slightly smaller font size for better fit
                
                // Fixed opacity for better visibility
                const opacity = 0.9;
                
                // Create trail effect with project name
                const words = [project.displayName];
                const trailLength = 5; // Increased trail length
                
                // Is this project selected?
                const isSelected = selectedProject?.author === project.author;
                
                return (
                  <div
                    key={index}
                    className="genre-item"
                    style={{
                      color: color,
                      transform: `rotate(${angle}deg) translateX(${radius}px)`,
                      fontSize: `${fontSize}px`,
                      opacity: opacity,
                      left: 0,
                      top: 0,
                      zIndex: isSelected ? 20 : 'auto'
                    }}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                      className="genre-link"
                      style={{
                        boxShadow: isSelected ? `0 0 10px ${color}` : 'none',
                        fontWeight: isSelected ? 'bold' : 'normal',
                        pointerEvents: 'auto',
                        padding: '4px 8px', // Slightly smaller padding
                      }}
                    >
                      {project.displayName}
                    </a>
                    
                    <span className="trailing-links">
                      {Array.from({ length: trailLength }).map((_, i) => (
                        <a 
                          key={i}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleProjectClick(project);
                          }}
                          className="trailing-link"
                          style={{ 
                            opacity: Math.max(0.8 - (i * 0.15), 0.3),
                            pointerEvents: 'auto',
                            marginLeft: '12px', // Slightly reduced margin
                            padding: '4px 6px', // Slightly smaller padding
                          }}
                        >
                          {words[0]}
                        </a>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portal Overlay */}
        <div 
          className={`portal-overlay ${showPortal ? 'active' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPortal(false);
              setSelectedProject(null);
            }
          }}
        >
          <div className="portal-container" onClick={handlePortalClick}>
            <div className="portal">
              <div className="portal-swirl"></div>
            </div>
            <div className="portal-text">
              <h2>{selectedProject?.author || ''}</h2>
              <p>Click to View Project</p>
            </div>
            
            {/* Portal particles */}
            <div className="portal-particles">
              {particles.map(particle => (
                <div
                  key={particle.id}
                  className="portal-particle"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                    animationDelay: `${particle.delay}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Links panel */}
        <button className="toggle-links-button" onClick={() => setShowLinks(!showLinks)}>
          {showLinks ? 'Hide Games' : 'Show Games'} 
          <span>{showLinks ? '×' : '+'}</span>
        </button>

        {showLinks && (
          <div className="genre-links-container">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="permanent-genre-link"
              >
                {project.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Content Modal */}
      <ContentModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProject(null);
        }}
        title={modalTitle}
        url={modalUrl}
      />
    </>
  );
});

// Add this helper function at the component level
const generateGenreColor = (index: number) => {
  const colorScheme = [
    '#FF2D55', // Pink
    '#4CD964', // Green
    '#5856D6', // Purple
    '#FF9500', // Orange
    '#00E4FF', // Cyan
    '#FF375F', // Bright Pink
    '#34C759', // Bright Green
    '#AF52DE', // Bright Purple
    '#FFCC00'  // Bright Yellow
  ];
  
  const colorIndex = (index * 3) % colorScheme.length;
  return colorScheme[colorIndex];
}; 