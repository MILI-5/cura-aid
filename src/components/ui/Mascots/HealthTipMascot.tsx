import React from "react";

interface HealthTipMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful health tip mascot: an energetic apple with a headband and sneakers.
 */
const HealthTipMascot: React.FC<HealthTipMascotProps> = ({ size = 120, className, title = "Health Tip Mascot" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
    className={className}
  >
    <title>{title}</title>
    {/* Apple body */}
    <ellipse cx="60" cy="70" rx="24" ry="22" fill="#FF5E5B" stroke="#C62828" strokeWidth="3" />
    {/* Leaf */}
    <ellipse cx="75" cy="48" rx="7" ry="3" fill="#81C784" stroke="#388E3C" strokeWidth="1.5" />
    {/* Stem */}
    <rect x="58" y="42" width="4" height="10" rx="2" fill="#8D6E63" />
    {/* Headband */}
    <rect x="48" y="58" width="24" height="6" rx="3" fill="#4F8EF7" />
    {/* Eyes */}
    <circle cx="54" cy="72" r="2" fill="#2C2C2C" />
    <circle cx="66" cy="72" r="2" fill="#2C2C2C" />
    {/* Smile */}
    <path d="M56 78 Q60 84 64 78" stroke="#2C2C2C" strokeWidth="2" fill="none" />
    {/* Sneakers */}
    <rect x="48" y="90" width="8" height="6" rx="2" fill="#FFF" stroke="#4F8EF7" strokeWidth="1.5" />
    <rect x="64" y="90" width="8" height="6" rx="2" fill="#FFF" stroke="#4F8EF7" strokeWidth="1.5" />
    {/* Water bottle */}
    <rect x="80" y="80" width="6" height="16" rx="2" fill="#B3E5FC" stroke="#0288D1" strokeWidth="1" />
    <rect x="82" y="78" width="2" height="4" rx="1" fill="#0288D1" />
  </svg>
);

export default HealthTipMascot;
