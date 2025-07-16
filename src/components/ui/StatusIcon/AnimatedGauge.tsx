import React from "react";
import { motion } from "framer-motion";

interface AnimatedGaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
  color?: string;
  className?: string;
}

const AnimatedGauge: React.FC<AnimatedGaugeProps> = ({ value, label, size = 120, color = "#38bdf8", className }) => {
  // Clamp value
  const v = Math.max(0, Math.min(100, value));
  // Map value to angle (e.g., -120deg to 120deg)
  const angle = (v / 100) * 240 - 120;
  return (
    <div className={"flex flex-col items-center " + (className || "")}
      style={{ width: size, height: size * 0.7 }}>
      <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`} fill="none">
        {/* Arc background */}
        <path
          d={`M${size * 0.1},${size * 0.6} A${size * 0.4},${size * 0.4} 0 1 1 ${size * 0.9},${size * 0.6}`}
          stroke="#e0e7ef"
          strokeWidth={size * 0.09}
          fill="none"
        />
        {/* Arc foreground */}
        <path
          d={`M${size * 0.1},${size * 0.6} A${size * 0.4},${size * 0.4} 0 1 1 ${size * 0.9},${size * 0.6}`}
          stroke={color}
          strokeWidth={size * 0.09}
          fill="none"
          strokeDasharray={Math.PI * size * 0.4}
          strokeDashoffset={Math.PI * size * 0.4 * (1 - v / 100)}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,2,.6,1)" }}
        />
        {/* Needle */}
        <motion.line
          x1={size / 2}
          y1={size * 0.6}
          x2={size / 2}
          y2={size * 0.18}
          stroke={color}
          strokeWidth={size * 0.04}
          strokeLinecap="round"
          initial={false}
          animate={{ rotate: angle }}
          style={{ originX: "50%", originY: `${size * 0.6}px` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
        {/* Center circle */}
        <circle cx={size / 2} cy={size * 0.6} r={size * 0.06} fill={color} />
      </svg>
      <div className="text-lg font-bold mt-2" style={{ color }}>{label}</div>
      <div className="text-2xl font-extrabold mt-1" style={{ color }}>{Math.round(v)}%</div>
    </div>
  );
};

export default AnimatedGauge; 