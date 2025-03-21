import { useState } from "react"
import { MenuBar } from "@/components/ui/menu-bar"
import { GradientTracing } from "@/components/ui/gradient-tracing"

const BoltIcon = () => (
  <GradientTracing
    width={20}
    height={20}
    baseColor="#2979FF"
    gradientColors={["#2979FF", "#73A7FF", "#2979FF"]}
    animationDuration={1.5}
    strokeWidth={3}
    path="M12,0 L9,9 L15,9 L6,24 L12,12 L6,12 L12,0"
  />
)

const menuItems = [
  {
    icon: BoltIcon,
    label: "Home",
    href: "#",
  },
  {
    label: "Prizes",
    href: "#prizes",
  },
  {
    label: "Judges",
    href: "#judges",
  },
  {
    label: "Sponsors",
    href: "#sponsors",
  },
  {
    label: "Register",
    href: "https://form.typeform.com/to/wf94YwH4?typeform-source=t.co",
    isExternal: true,
  },
]

export function MenuBarDemo() {
  const [activeItem, setActiveItem] = useState<string>("Home")

  return (
    <MenuBar
      items={menuItems}
      activeItem={activeItem}
      onItemClick={setActiveItem}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    />
  )
} 