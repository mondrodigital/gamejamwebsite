import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { StarBorder } from "@/components/ui/star-border"

// Define the timer end date - April 11th of the current or next year
const getApril11Date = () => {
  const now = new Date()
  const year = now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() > 11) ? 
    now.getFullYear() + 1 : now.getFullYear()
  return new Date(`April 11, ${year} 00:00:00`)
}

const timerEndDate = getApril11Date()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  progressPercentage: number
}

export function TimerDisplay() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    progressPercentage: 0
  })

  useEffect(() => {
    function getTargetDate() {
      // Target date: April 11
      const targetDate = new Date();
      targetDate.setMonth(3); // April (0-indexed)
      targetDate.setDate(11);
      targetDate.setHours(0, 0, 0, 0);
      
      // If the date has passed this year, set it to next year
      if (targetDate < new Date()) {
        targetDate.setFullYear(targetDate.getFullYear() + 1);
      }
      
      return targetDate;
    }

    function getTimeUntil(targetDate: Date) {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      // Initial time difference in seconds - used to calculate progress
      const initialTotalSeconds = 31 * 24 * 60 * 60; // Roughly one month in seconds
      
      const totalSeconds = Math.max(0, Math.floor(difference / 1000));
      
      // Calculate how far along we are in the countdown (0 to 100)
      // Start with initialTotalSeconds = 0% progress 
      // End with 0 seconds left = 100% progress
      const progressPercentage = Math.min(100, Math.max(0, 100 - ((totalSeconds / initialTotalSeconds) * 100)));
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          progressPercentage: 100
        };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        progressPercentage
      };
    }

    function updateTimer() {
      const targetDate = getTargetDate();
      const timeUntilTarget = getTimeUntil(targetDate);
      setTimeLeft(timeUntilTarget);
    }

    // Initial call
    updateTimer();
    
    // Update every second
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="relative bg-black/90 backdrop-blur-md p-4 rounded-xl border border-transparent" 
         style={{ minWidth: '180px' }}>
      {/* Progress border around the entire card */}
      <div 
        className="absolute inset-0 rounded-xl z-0 overflow-hidden"
        style={{
          background: `conic-gradient(#2979FF ${timeLeft.progressPercentage}%, transparent 0%)`,
          padding: '2px'
        }}
      >
        <div className="w-full h-full bg-black/90 backdrop-blur-md rounded-xl"></div>
      </div>
      
      {/* Content centered */}
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-1 text-center">Hackathon Starts In</p>
        <div className="flex justify-center items-end">
          <div className="flex flex-col items-center mx-1">
            <span className="text-xl font-bold tabular-nums">
              {timeLeft.days.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-gray-400">days</span>
          </div>
          <span className="text-lg pb-0.5 px-0.5 text-gray-400">:</span>
          <div className="flex flex-col items-center mx-1">
            <span className="text-xl font-bold tabular-nums">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-gray-400">hrs</span>
          </div>
          <span className="text-lg pb-0.5 px-0.5 text-gray-400">:</span>
          <div className="flex flex-col items-center mx-1">
            <span className="text-xl font-bold tabular-nums">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-gray-400">min</span>
          </div>
          <span className="text-lg pb-0.5 px-0.5 text-gray-400">:</span>
          <div className="flex flex-col items-center mx-1">
            <span className="text-xl font-bold tabular-nums">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] text-gray-400">sec</span>
          </div>
        </div>
      </div>
    </div>
  )
} 