import React from "react";
import { motion } from "framer-motion";

interface AnimatedSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const AnimatedSlider: React.FC<AnimatedSliderProps> = ({ value, onChange, min = 0, max = 100, step = 1, disabled, ...props }) => {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative w-full h-8 flex items-center">
      <div className="absolute left-0 right-0 h-2 rounded-full bg-gray-200" />
      <motion.div
        className="absolute left-0 h-2 rounded-full bg-gradient-to-r from-sky-400 to-teal-300"
        style={{ width: percent + "%" }}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        disabled={disabled}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
        {...props}
      />
      <motion.div
        className="absolute top-1/2 left-0 w-6 h-6 rounded-full bg-white shadow-lg border-2 border-sky-300"
        style={{ x: `calc(${percent}% - 12px)`, y: "-50%" }}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        whileTap={{ scale: 0.92 }}
      />
    </div>
  );
};

export default AnimatedSlider; 