import React from "react";

interface SupportMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful support mascot: a helpful chat bubble with a nurse's cap and notepad.
 */
const SupportMascot: React.FC<SupportMascotProps> = ({ size = 120, className, title = "Support Mascot" }) => (
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
    {/* Chat bubble */}
    <ellipse cx="60" cy="70" rx="28" ry="20" fill="#E6F0FF" stroke="#4F8EF7" strokeWidth="3" />
    {/* Bubble tail */}
    <polygon points="60,90 68,100 62,88" fill="#E6F0FF" stroke="#4F8EF7" strokeWidth="2" />
    {/* Face */}
    <circle cx="54" cy="70" r="2" fill="#4F8EF7" />
    <circle cx="66" cy="70" r="2" fill="#4F8EF7" />
    <path d="M56 76 Q60 80 64 76" stroke="#4F8EF7" strokeWidth="2" fill="none" />
    {/* Nurse cap */}
    <rect x="50" y="50" width="20" height="8" rx="4" fill="#FFF" stroke="#F7B84F" strokeWidth="2" />
    <rect x="58" y="53" width="4" height="2" fill="#F7B84F" />
    <rect x="60" y="51" width="2" height="6" fill="#F7B84F" />
    {/* Notepad */}
    <rect x="80" y="80" width="10" height="12" rx="2" fill="#FFF" stroke="#4F8EF7" strokeWidth="1.5" />
    <rect x="82" y="82" width="6" height="2" rx="1" fill="#B3D0FF" />
  </svg>
);

export default SupportMascot;
