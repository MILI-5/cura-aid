import React from "react";

interface PharmacyMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful pharmacy mascot: a friendly pill bottle with glasses and a pharmacist cap.
 */
const PharmacyMascot: React.FC<PharmacyMascotProps> = ({ size = 120, className, title = "Pharmacy Mascot" }) => (
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
    {/* Bottle body */}
    <rect x="35" y="35" width="50" height="60" rx="15" fill="#FFF6E0" stroke="#F7B84F" strokeWidth="4" />
    {/* Label */}
    <rect x="40" y="60" width="40" height="20" rx="6" fill="#F7B84F" />
    {/* Cap */}
    <rect x="40" y="25" width="40" height="18" rx="6" fill="#4F8EF7" stroke="#2C5AA0" strokeWidth="2" />
    {/* Glasses */}
    <ellipse cx="52" cy="65" rx="6" ry="4" fill="#FFF" stroke="#2C5AA0" strokeWidth="2" />
    <ellipse cx="68" cy="65" rx="6" ry="4" fill="#FFF" stroke="#2C5AA0" strokeWidth="2" />
    <line x1="58" y1="65" x2="62" y2="65" stroke="#2C5AA0" strokeWidth="2" />
    {/* Eyes */}
    <circle cx="52" cy="65" r="1.2" fill="#2C5AA0" />
    <circle cx="68" cy="65" r="1.2" fill="#2C5AA0" />
    {/* Smile */}
    <path d="M54 72 Q60 78 66 72" stroke="#F7B84F" strokeWidth="2" fill="none" />
    {/* Prescription scroll */}
    <rect x="80" y="80" width="12" height="6" rx="2" fill="#FFF" stroke="#F7B84F" strokeWidth="1.5" />
    <path d="M86 80 Q88 83 92 80" stroke="#F7B84F" strokeWidth="1.5" fill="none" />
    {/* Pharmacist cap cross */}
    <rect x="57" y="28" width="6" height="2" fill="#FFF" />
    <rect x="59" y="26" width="2" height="6" fill="#FFF" />
  </svg>
);

export default PharmacyMascot;
