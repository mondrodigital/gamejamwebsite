"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

// Create markers with individual flicker speeds for randomized animation
const MARKERS = [
  // North America
  { location: [40.7128, -74.006] as [number, number], size: 0.05 }, // New York
  { location: [34.0522, -118.2437] as [number, number], size: 0.05 }, // Los Angeles
  { location: [51.2538, -85.3232] as [number, number], size: 0.04 }, // Ontario
  { location: [19.4326, -99.1332] as [number, number], size: 0.05 }, // Mexico City
  { location: [45.5155, -122.6789] as [number, number], size: 0.04 }, // Portland
  { location: [41.8781, -87.6298] as [number, number], size: 0.05 }, // Chicago
  { location: [25.7617, -80.1918] as [number, number], size: 0.04 }, // Miami
  { location: [49.2827, -123.1207] as [number, number], size: 0.04 }, // Vancouver

  // South America
  { location: [-23.5505, -46.6333] as [number, number], size: 0.05 }, // São Paulo
  { location: [-34.6037, -58.3816] as [number, number], size: 0.04 }, // Buenos Aires
  { location: [-4.4419, -59.4478] as [number, number], size: 0.04 }, // Amazon
  { location: [-33.4489, -70.6693] as [number, number], size: 0.04 }, // Santiago
  { location: [-12.0464, -77.0428] as [number, number], size: 0.04 }, // Lima
  { location: [-0.1807, -78.4678] as [number, number], size: 0.04 }, // Quito

  // Europe
  { location: [51.5074, -0.1278] as [number, number], size: 0.05 }, // London
  { location: [48.8566, 2.3522] as [number, number], size: 0.05 }, // Paris
  { location: [52.5200, 13.4050] as [number, number], size: 0.04 }, // Berlin
  { location: [41.9028, 12.4964] as [number, number], size: 0.04 }, // Rome
  { location: [59.9139, 10.7522] as [number, number], size: 0.04 }, // Oslo
  { location: [40.4168, -3.7038] as [number, number], size: 0.04 }, // Madrid
  { location: [55.7558, 37.6173] as [number, number], size: 0.05 }, // Moscow
  { location: [45.4642, 9.1900] as [number, number], size: 0.04 }, // Milan
  { location: [50.0755, 14.4378] as [number, number], size: 0.04 }, // Prague

  // Asia
  { location: [35.6762, 139.6503] as [number, number], size: 0.05 }, // Tokyo
  { location: [31.2304, 121.4737] as [number, number], size: 0.05 }, // Shanghai
  { location: [22.3193, 114.1694] as [number, number], size: 0.05 }, // Hong Kong
  { location: [1.3521, 103.8198] as [number, number], size: 0.04 }, // Singapore
  { location: [28.6139, 77.2090] as [number, number], size: 0.05 }, // New Delhi
  { location: [39.9042, 116.4074] as [number, number], size: 0.05 }, // Beijing
  { location: [37.5665, 126.9780] as [number, number], size: 0.04 }, // Seoul
  { location: [13.7563, 100.5018] as [number, number], size: 0.04 }, // Bangkok
  { location: [3.1390, 101.6869] as [number, number], size: 0.04 }, // Kuala Lumpur
  { location: [14.5995, 120.9842] as [number, number], size: 0.04 }, // Manila

  // Africa
  { location: [30.0444, 31.2357] as [number, number], size: 0.05 }, // Cairo
  { location: [-33.9249, 18.4241] as [number, number], size: 0.04 }, // Cape Town
  { location: [6.5244, 3.3792] as [number, number], size: 0.04 }, // Lagos
  { location: [-1.2921, 36.8219] as [number, number], size: 0.04 }, // Nairobi
  { location: [14.7167, -17.4677] as [number, number], size: 0.04 }, // Dakar
  { location: [0.3476, 32.5825] as [number, number], size: 0.04 }, // Kampala
  { location: [9.0579, 7.4951] as [number, number], size: 0.04 }, // Abuja

  // Oceania
  { location: [-33.8688, 151.2093] as [number, number], size: 0.05 }, // Sydney
  { location: [-36.8509, 174.7645] as [number, number], size: 0.04 }, // Auckland
  { location: [-12.4634, 130.8456] as [number, number], size: 0.04 }, // Darwin
  { location: [-37.8136, 144.9631] as [number, number], size: 0.05 }, // Melbourne
  { location: [-31.9505, 115.8605] as [number, number], size: 0.04 }, // Perth
  { location: [-27.4698, 153.0251] as [number, number], size: 0.04 }, // Brisbane

  // Tech Hubs
  { location: [37.7749, -122.4194] as [number, number], size: 0.06 }, // San Francisco
  { location: [47.6062, -122.3321] as [number, number], size: 0.05 }, // Seattle
  { location: [12.9716, 77.5946] as [number, number], size: 0.05 }, // Bangalore
  { location: [25.2048, 55.2708] as [number, number], size: 0.05 }, // Dubai
  { location: [52.3676, 4.9041] as [number, number], size: 0.05 }, // Amsterdam
  { location: [48.1351, 11.5820] as [number, number], size: 0.05 }, // Munich
  { location: [43.6532, -79.3832] as [number, number], size: 0.05 }, // Toronto
  { location: [30.2672, 120.1529] as [number, number], size: 0.05 }, // Hangzhou
].map(marker => ({
  location: marker.location,
  size: marker.size,
  visible: Math.random() > 0.6, // Only some markers start visible
  signupTimer: Math.random() * 10, // Random timer for "signup" simulation
  blinkCounter: 0, // Counter to control blinking behavior
  blinkPhase: Math.random(), // Random blink phase
}));

// Much brighter base color for more vivid markers
const BASE_MARKER_COLOR: [number, number, number] = [0.4, 0.8, 1.5];

export function Globe({
  className,
}: {
  className?: string
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const [time, setTime] = useState(0);
  
  // Use animation frame for smoother animation
  useEffect(() => {
    let frameId: number;
    const updateTime = () => {
      setTime(prev => prev + 0.05);
      frameId = requestAnimationFrame(updateTime);
    };
    frameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.002;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
      
      // Apply glowing effect to base marker color
      if (state.markerColor) {
        state.markerColor[0] = BASE_MARKER_COLOR[0];
        state.markerColor[1] = BASE_MARKER_COLOR[1];
        state.markerColor[2] = BASE_MARKER_COLOR[2];
      }
      
      // Simulate cities lighting up like signups
      if (state.markers) {
        // Random chance for a city to "sign up" (turn on)
        if (Math.random() < 0.05) {
          const offMarkers = MARKERS.filter(m => !m.visible);
          if (offMarkers.length > 0) {
            const randomIndex = Math.floor(Math.random() * offMarkers.length);
            const markerToActivate = offMarkers[randomIndex];
            markerToActivate.visible = true;
            markerToActivate.blinkCounter = 5; // Start blinking animation
          }
        }
        
        // Update each marker's state
        state.markers.forEach((marker: any, index: number) => {
          if (marker && index < MARKERS.length) {
            const customMarker = MARKERS[index];
            
            // Update signup timer
            customMarker.signupTimer -= 0.05;
            
            // Active blinking for new signups
            if (customMarker.blinkCounter > 0) {
              // Fast blinking animation for new signups
              const blinkSpeed = 0.3; // Higher value = faster blinking
              const blinkState = Math.sin(time * 10 * blinkSpeed + customMarker.blinkPhase * 10) > 0;
              
              marker.size = blinkState ? customMarker.size * 1.5 : customMarker.size * 0.5;
              
              customMarker.blinkCounter -= 0.05;
            } 
            // Normal state after blinking ends
            else if (customMarker.visible) {
              marker.size = customMarker.size;
              
              // Occasional random "turn off" simulation
              if (customMarker.signupTimer <= 0) {
                // Reset timer with random duration
                customMarker.signupTimer = Math.random() * 20 + 10;
                
                // Small chance to turn off (simulate user leaving)
                if (Math.random() < 0.2) {
                  customMarker.visible = false;
                }
              }
            } 
            // Invisible state
            else {
              marker.size = 0; // Completely invisible
            }
          }
        });
      }
    },
    [r, time]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1],
      markerColor: BASE_MARKER_COLOR,
      glowColor: [0.3, 0.4, 0.6], // Increase glow to make markers more visible
      markers: MARKERS,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}