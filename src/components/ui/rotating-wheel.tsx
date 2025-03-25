"use client";

import React, { useState, useRef, useEffect } from 'react';
import { projects, getProjectUrl, getExpandedProjects } from './project-wheel-data';
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
  left: 5%;
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
  padding: 6px 10px;
  border-radius: 4px;
  display: inline-block;
  transition: all 0.2s ease;
  background-color: rgba(0, 0, 0, 0.15);
  cursor: pointer !important;
  position: relative;
  z-index: 100;
}

.genre-link:hover {
  background-color: rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
  text-decoration: underline;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.trailing-links {
  display: inline-block;
}

.trailing-link {
  color: inherit;
  text-decoration: none;
  margin-left: 16px;
  padding: 5px 8px;
  border-radius: 4px;
  display: inline-block;
  transition: all 0.2s ease;
  cursor: pointer !important;
  position: relative;
  z-index: 100;
}

.trailing-link:hover {
  background-color: rgba(0, 0, 0, 0.3);
  text-decoration: underline;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

/* New styles for the permanent clickable links */
.genre-links-container {
  position: absolute;
  right: 10%;
  top: 10%;
  width: 300px;
  max-height: 80%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  padding: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.permanent-genre-link {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.permanent-genre-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateX(5px);
}

.permanent-genre-link::before {
  content: "→";
  margin-right: 8px;
  font-weight: bold;
}

/* Style for the toggle button */
.toggle-links-button {
  position: absolute;
  right: 10%;
  top: 5%;
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
}

.toggle-links-button:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

/* Portal animation styles */
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
}

.portal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.portal-container {
  position: relative;
  width: 300px;
  height: 300px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.portal-container:hover {
  transform: scale(1.05);
}

.portal {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at center, 
    #76ff03 0%, 
    #64dd17 10%, 
    #43a047 20%, 
    #00bcd4 40%,
    #2196f3 60%, 
    #9c27b0 80%, 
    #651fff 100%
  );
  box-shadow: 0 0 100px #76ff03, 0 0 50px #43a047, 0 0 25px #2196f3;
  transform-origin: center;
  animation: portalSpin 2s linear infinite, portalPulse 3s ease-in-out infinite;
  z-index: 9001;
}

.portal::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.8) inset;
  z-index: 9002;
}

.portal-swirl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    transparent 0deg,
    rgba(0, 255, 0, 0.5) 60deg,
    transparent 120deg,
    rgba(0, 255, 0, 0.5) 180deg,
    transparent 240deg,
    rgba(0, 255, 0, 0.5) 300deg,
    transparent 360deg
  );
  border-radius: 50%;
  filter: blur(10px);
  animation: portalSwirl 4s linear infinite;
  z-index: 9003;
}

.portal-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  z-index: 9004;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
}

.click-instructions {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
  animation: pulseText 1.5s ease-in-out infinite;
}

@keyframes pulseText {
  0% { opacity: 0.5; transform: translateX(-50%) scale(0.95); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
  100% { opacity: 0.5; transform: translateX(-50%) scale(0.95); }
}

@keyframes portalSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes portalSwirl {
  0% { transform: rotate(0deg) scale(0.6); }
  100% { transform: rotate(-360deg) scale(0.6); }
}

@keyframes portalPulse {
  0% { transform: scale(0.9); }
  50% { transform: scale(1.1); }
  100% { transform: scale(0.9); }
}

@keyframes portalGrow {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.portal-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9000;
}

.portal-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #76ff03;
  border-radius: 50%;
  opacity: 0.8;
  animation: particleFloat 2s linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  100% { transform: translateY(-200px) translateX(100px); opacity: 0; }
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
}

export const RotatingWheel: React.FC<RotatingWheelProps> = ({ className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [showPortal, setShowPortal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const isAutoRotatingRef = useRef(true);
  const lastMousePosRef = useRef({ x: 0, y: 0, angle: 0 });
  const momentumRef = useRef<number>(0);

  // Get expanded projects for the wheel
  const wheelProjects = getExpandedProjects();

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
    if ((e.target as HTMLElement).tagName === 'A' || 
        (e.target as HTMLElement).closest('a')) {
      return;
    }
    
    e.preventDefault();
    
    isAutoRotatingRef.current = false;
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
      momentumRef.current = 0;
    }
    
    setIsDragging(true);
    
    const point = 'touches' in e 
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    
    const angle = getAngleFromPoint(point);
    lastMousePosRef.current = { x: point.x, y: point.y, angle };
    
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
    let angleDiff = angle - lastMousePosRef.current.angle;
    
    // Handle angle wrap-around
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    // Update rotation
    setCurrentAngle(prev => prev + angleDiff);
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
    if (Math.abs(momentumRef.current) > 0.1) {
      spinWithMomentum();
    } else {
      // Resume auto rotation if no significant momentum
      setTimeout(() => isAutoRotatingRef.current = true, 500);
    }
  };
  
  // Apply spin with momentum
  const spinWithMomentum = () => {
    let velocity = momentumRef.current;
    
    const spin = () => {
      // Apply friction - slow down gradually
      velocity *= 0.98;
      
      // Update position based on velocity
      setCurrentAngle(prev => prev + velocity);
      
      // Stop when velocity becomes very small
      if (Math.abs(velocity) < 0.1) {
        momentumRef.current = 0;
        setTimeout(() => isAutoRotatingRef.current = true, 500);
        return;
      }
      
      // Continue spinning
      momentumRef.current = requestAnimationFrame(spin);
    };
    
    momentumRef.current = requestAnimationFrame(spin);
  };
  
  // Handle wheel scroll to control wheel direction
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    isAutoRotatingRef.current = false;
    
    const scrollAmount = e.deltaY * 0.05;
    setCurrentAngle(prev => prev + scrollAmount);
    
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current);
      momentumRef.current = 0;
    }
    
    setTimeout(() => {
      isAutoRotatingRef.current = true;
    }, 1000);
  };
  
  // Handle project link click with portal animation
  const handleGenreClick = (projectName: string) => {
    setSelectedProject(projectName);
    setShowPortal(true);
  };
  
  // Handle portal click to show modal or redirect
  const handlePortalClick = () => {
    const url = getProjectUrl(selectedProject);
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
    setShowPortal(false);
    setSelectedProject('');
  };
  
  // Helper function to get auto-rotation styles
  const getAutoRotateStyles = () => {
    if (momentumRef.current) {
      return {};
    }
    
    return {
      transition: 'transform 0.5s ease',
      transform: `rotate(${currentAngle}deg)`,
      animation: isAutoRotatingRef.current ? `rotateWheel 120s linear infinite ${-currentAngle}deg` : 'none',
      animationPlayState: isAutoRotatingRef.current ? 'running' : 'paused'
    };
  };
  
  return (
    <>
      <div 
        ref={wheelRef}
        className={`genre-wheel ${isDragging ? 'dragging' : ''} ${
          isAutoRotatingRef.current && !isDragging ? 'auto-rotating' : ''
        } ${className || ''}`}
        style={getAutoRotateStyles()}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onWheel={handleWheel}
      >
        <style>{wheelStyles}</style>
        
        {wheelProjects.map((project, index) => {
          const angle = (360 / wheelProjects.length) * index;
          const color = generateGenreColor(index);
          const opacity = Math.max(0.4, 1 - Math.abs(((currentAngle % 360) - angle) / 180));

          return (
            <div
              key={`${project.name}-${index}`}
              className="genre-item"
              style={{
                transform: `rotate(${angle}deg) translateX(300px) rotate(-${angle}deg)`,
                color,
                opacity,
              }}
            >
              <div
                className="genre-link"
                onClick={() => handleGenreClick(project.name)}
              >
                {project.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Portal overlay */}
      <div className={`portal-overlay ${showPortal ? 'active' : ''}`}>
        <div className="portal-container" onClick={handlePortalClick}>
          <div className="portal">
            <div className="portal-swirl"></div>
          </div>
          <div className="portal-text">
            <h2>{selectedProject}</h2>
            <p>Click to enter</p>
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

      {/* Content Modal */}
      <ContentModal
        isOpen={showPortal}
        onClose={() => {
          setShowPortal(false);
          setSelectedProject('');
        }}
        title={selectedProject}
        url={getProjectUrl(selectedProject)}
      />
    </>
  );
};

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