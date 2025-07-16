import React from "react";
import { motion } from "framer-motion";

interface AnimatedSwitcherProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const AnimatedSwitcher: React.FC<AnimatedSwitcherProps> = ({ checked, onChange, disabled, ...props }) => {
  return (
    <label className="relative inline-block w-14 h-8 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <motion.span
        className={`block w-full h-full rounded-full transition-colors duration-300 ${checked ? "bg-teal-400" : "bg-gray-300"}`}
        layout
      />
      <motion.span
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg"
        layout
        initial={false}
        animate={{ x: checked ? 24 : 0, boxShadow: checked ? "0 4px 16px #2dd4bf55" : "0 2px 8px #0002" }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        whileTap={{ scale: 0.92 }}
      />
    </label>
  );
};

export default AnimatedSwitcher; 