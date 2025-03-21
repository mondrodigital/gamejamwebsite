"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  href?: string
  variant?: "blue" | "default"
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, href, variant = "default", ...props }, ref) => {
    const elementRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null)
    const [isListening, setIsListening] = React.useState(false)
    const [circles, setCircles] = React.useState<Array<{
      id: number
      x: number
      y: number
      color: string
      fadeState: "in" | "out" | null
    }>>([])
    const lastAddedRef = React.useRef(0)

    const createCircle = React.useCallback((x: number, y: number) => {
      const elementWidth = elementRef.current?.offsetWidth || 0
      const xPos = x / elementWidth
      const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${
        xPos * 100
      }%)`

      setCircles((prev) => [
        ...prev,
        { id: Date.now(), x, y, color, fadeState: null },
      ])
    }, [])

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!isListening) return
        
        const currentTime = Date.now()
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime
          const rect = event.currentTarget.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          createCircle(x, y)
        }
      },
      [isListening, createCircle]
    )

    const handlePointerEnter = React.useCallback(() => {
      setIsListening(true)
    }, [])

    const handlePointerLeave = React.useCallback(() => {
      setIsListening(false)
    }, [])

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c
              )
            )
          }, 0)

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c
              )
            )
          }, 1000)

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id))
          }, 2200)
        }
      })
    }, [circles])

    const commonProps = {
      className: cn(
        "group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-full transition-transform duration-300 ease-out hover:scale-105 active:scale-95",
        variant === "blue" ? "bg-[#2979FF]/80 backdrop-blur-sm text-white" : "bg-black/20 backdrop-blur-sm border border-white/10",
        className
      ),
      onPointerMove: handlePointerMove,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      style: {
        "--circle-start": "var(--tw-gradient-from, #a0d9f8)",
        "--circle-end": "var(--tw-gradient-to, #3a5bbf)",
      } as React.CSSProperties,
      children: (
        <>
          {circles.map(({ id, x, y, color, fadeState }) => (
            <div
              key={id}
              className={cn(
                "absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                "blur-lg pointer-events-none z-[-1] transition-opacity duration-300",
                fadeState === "in" && "opacity-75",
                fadeState === "out" && "opacity-0 duration-[1.2s]",
                !fadeState && "opacity-0"
              )}
              style={{
                left: x,
                top: y,
                background: color,
              }}
            />
          ))}
          <div className="relative z-10 flex-1">
            {children}
          </div>
        </>
      ),
    }

    // Use React.useImperativeHandle to properly merge refs
    React.useImperativeHandle(ref, () => elementRef.current as HTMLButtonElement, [])

    if (href) {
      return (
        <a
          {...commonProps}
          ref={elementRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        />
      )
    }

    return (
      <button
        {...commonProps}
        {...props}
        ref={elementRef as React.RefObject<HTMLButtonElement>}
      />
    )
  }
)

HoverButton.displayName = "HoverButton"

export { HoverButton } 