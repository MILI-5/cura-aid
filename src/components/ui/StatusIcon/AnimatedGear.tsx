import React from "react";
import { motion } from "framer-motion";

interface AnimatedGearProps {
  size?: number;
  color?: string;
  active?: boolean;
  className?: string;
}

const AnimatedGear: React.FC<AnimatedGearProps> = ({ size = 48, color = "#38bdf8", active = true, className }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={active ? { rotate: 360 } : { rotate: 0 }}
    transition={active ? { repeat: Infinity, duration: 1.2, ease: "linear" } : {}}
    style={{ originX: "50%", originY: "50%" }}
    role="img"
    aria-label="Animated gear"
  >
    <circle cx="24" cy="24" r="10" fill={color} fillOpacity="0.18" />
    <circle cx="24" cy="24" r="7" fill={color} fillOpacity="0.32" />
    <circle cx="24" cy="24" r="4" fill={color} />
    {/* Gear teeth */}
    {[...Array(8)].map((_, i) => (
      <rect
        key={i}
        x={22}
        y={2}
        width={4}
        height={8}
        rx={2}
        fill={color}
        transform={`rotate(${i * 45} 24 24)`}
      />
    ))}
  </motion.svg>
);

export default AnimatedGear; 