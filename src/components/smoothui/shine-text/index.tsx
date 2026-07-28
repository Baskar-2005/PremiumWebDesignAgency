import { motion, useReducedMotion } from "framer-motion";

export interface ShineTextProps {
  /** Base text color (any CSS color). */
  baseColor?: string;
  children: string;
  className?: string;
  /** Duration of one sweep, in seconds. */
  duration?: number;
  /** Pause between sweeps, in seconds. */
  repeatDelay?: number;
  /** Color of the sweeping highlight band. */
  shineColor?: string;
}

export default function ShineText({
  children,
  className = "",
  duration = 2.5,
  repeatDelay = 0.6,
  baseColor = "rgba(255,255,255,0.4)",
  shineColor = "#ffffff",
}: ShineTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span className={className} style={{ color: baseColor }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      animate={{ backgroundPositionX: ["150%", "-150%"] }}
      className={className}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 40%, ${shineColor} 50%, ${baseColor} 60%)`,
        backgroundSize: "250% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatDelay,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}
