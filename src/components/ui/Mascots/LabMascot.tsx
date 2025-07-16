import React from "react";

interface LabMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful lab mascot: a cute test tube with bubbly hair and safety goggles.
 */
const LabMascot: React.FC<LabMascotProps> = ({ size = 120, className, title = "Lab Mascot" }) => (
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
    {/* Test tube body */}
    <rect x="50" y="30" width="20" height="60" rx="10" fill="#E0F7FA" stroke="#4FC3F7" strokeWidth="4" />
    {/* Liquid */}
    <rect x="52" y="60" width="16" height="26" rx="8" fill="#4FC3F7" />
    {/* Bubbles (hair) */}
    <circle cx="60" cy="28" r="6" fill="#B3E5FC" />
    <circle cx="54" cy="24" r="3" fill="#B3E5FC" />
    <circle cx="66" cy="24" r="3" fill="#B3E5FC" />
    {/* Safety goggles */}
    <ellipse cx="56" cy="54" rx="4" ry="3" fill="#FFF" stroke="#0288D1" strokeWidth="1.5" />
    <ellipse cx="64" cy="54" rx="4" ry="3" fill="#FFF" stroke="#0288D1" strokeWidth="1.5" />
    <rect x="60" y="54" width="2" height="2" fill="#0288D1" />
    {/* Eyes */}
    <circle cx="56" cy="54" r="1" fill="#0288D1" />
    <circle cx="64" cy="54" r="1" fill="#0288D1" />
    {/* Smile */}
    <path d="M57 59 Q60 62 63 59" stroke="#0288D1" strokeWidth="1.5" fill="none" />
    {/* Clipboard */}
    <rect x="75" y="80" width="12" height="8" rx="2" fill="#FFF" stroke="#4FC3F7" strokeWidth="1.5" />
    <rect x="80" y="80" width="2" height="3" fill="#4FC3F7" />
  </svg>
);

export default LabMascot;
