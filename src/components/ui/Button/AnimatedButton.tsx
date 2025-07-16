import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  soundUrl?: string; // Optional custom sound
}

const clickSound = new Howl({
  src: ["/sounds/click.mp3"], // Place a click.mp3 in public/sounds/
  volume: 0.18,
});

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, soundUrl, className = "", style, ...props }) => {
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Ripple effect
    const button = e.currentTarget;
    const ripple = rippleRef.current;
    if (ripple) {
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.classList.remove("animate");
      void ripple.offsetWidth; // Force reflow
      ripple.classList.add("animate");
    }
    // Sound
    if (soundUrl) {
      new Howl({ src: [soundUrl], volume: 0.18 }).play();
    } else {
      clickSound.play();
    }
    // Call user onClick
    props.onClick?.(e);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: 1.045 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={
        "relative overflow-hidden px-6 py-2 rounded-2xl font-bold text-lg bg-gradient-to-r from-sky-400 to-teal-300 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300 active:shadow-md transition-all duration-200 " +
        className
      }
      style={style}
      {...props}
      onClick={handleClick}
    >
      <span
        ref={rippleRef}
        className="pointer-events-none absolute rounded-full bg-white/40 opacity-70 scale-0 animate-none"
        style={{ zIndex: 1 }}
      />
      <span className="relative z-10">{children}</span>
      <style>{`
        .animate {
          animation: ripple 0.5s linear;
        }
        @keyframes ripple {
          0% { opacity: 0.7; transform: scale(0); }
          60% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(2.2); }
        }
      `}</style>
    </motion.button>
  );
};

export default AnimatedButton; 