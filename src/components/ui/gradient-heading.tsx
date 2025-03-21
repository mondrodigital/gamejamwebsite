import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    variant: {
      default: "bg-gradient-to-r from-[#2979FF] via-[#73A7FF] to-[#2979FF] bg-clip-text text-transparent",
      secondary: "text-gray-400",
    },
    size: {
      default: "text-2xl md:text-4xl",
      lg: "text-3xl md:text-5xl",
      xl: "text-4xl md:text-6xl",
      xxl: "text-5xl md:text-7xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface GradientHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

export function GradientHeading({
  children,
  className,
  variant,
  size,
  ...props
}: GradientHeadingProps) {
  return (
    <h1
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </h1>
  );
}