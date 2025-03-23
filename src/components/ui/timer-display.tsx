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
  isExpired: boolean
}

export function TimerDisplay() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = timerEndDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (timeLeft.isExpired) return null

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <StarBorder 
        as="div" 
        className="pointer-events-none w-auto"
        color="#2979FF"
        speed="8s"
      >
        <div className="flex items-center text-sm tabular-nums text-white bg-black/80 rounded-[16px] overflow-hidden">
          <span className="flex items-center justify-center py-0.5 px-1.5 border-r border-primary-foreground/30">
            <span className="mx-0.5 flex items-end">
              {timeLeft.days.toString().padStart(2, "0")}
              <span className="text-white/60 text-xs mb-0.5 ml-0.5">d</span>
            </span>
          </span>
          <span className="flex items-center justify-center py-0.5 px-1.5 border-r border-primary-foreground/30">
            <span className="mx-0.5 flex items-end">
              {timeLeft.hours.toString().padStart(2, "0")}
              <span className="text-white/60 text-xs mb-0.5 ml-0.5">h</span>
            </span>
          </span>
          <span className="flex items-center justify-center py-0.5 px-1.5 border-r border-primary-foreground/30">
            <span className="mx-0.5 flex items-end">
              {timeLeft.minutes.toString().padStart(2, "0")}
              <span className="text-white/60 text-xs mb-0.5 ml-0.5">m</span>
            </span>
          </span>
          <span className="flex items-center justify-center py-0.5 px-1.5">
            <span className="mx-0.5 flex items-end">
              {timeLeft.seconds.toString().padStart(2, "0")}
              <span className="text-white/60 text-xs mb-0.5 ml-0.5">s</span>
            </span>
          </span>
        </div>
      </StarBorder>
    </div>
  )
} 