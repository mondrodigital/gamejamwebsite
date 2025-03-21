import { BackgroundGradientAnimation } from "./background-gradient-animation";

export const CardGradient = ({ children }: { children: React.ReactNode }) => {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(255, 255, 255, 0.02)"
      gradientBackgroundEnd="rgba(41, 121, 255, 0.05)"
      firstColor="41, 121, 255"
      secondColor="115, 167, 255"
      thirdColor="41, 121, 255"
      fourthColor="10, 10, 10"
      fifthColor="41, 121, 255"
      pointerColor="41, 121, 255"
      size="100%"
      blendingValue="soft-light"
      interactive={false}
      className="p-8 rounded-xl relative z-10"
    >
      {children}
    </BackgroundGradientAnimation>
  );
};