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

// Typeform URL
const REGISTER_URL = "https://form.typeform.com/to/wf94YwH4?typeform-source=t.co";

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
    href: "#",
    action: "register",
  },
]

export function MenuBarDemo() {
  const [activeItem, setActiveItem] = useState<string>("Home")

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    
    if (label === "Register") {
      // Open Typeform in a modal-like iframe directly
      const w = window.innerWidth * 0.9;
      const h = window.innerHeight * 0.85;
      const left = (window.innerWidth - w) / 2;
      const top = (window.innerHeight - h) / 2;
      
      window.open(
        REGISTER_URL,
        "typeform-popup",
        `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes,status=no,menubar=no,toolbar=no,titlebar=yes`
      );
      return false;
    }
    
    return true;
  }

  return (
    <MenuBar
      items={menuItems}
      activeItem={activeItem}
      onItemClick={handleItemClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    />
  )
} 