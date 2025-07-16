import React from "react";

interface DoctorMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful doctor mascot: a cheerful stethoscope with a smiling face and doctor coat.
 */
const DoctorMascot: React.FC<DoctorMascotProps> = ({ size = 120, className, title = "Doctor Mascot" }) => (
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
    {/* Stethoscope tubing */}
    <path d="M30 40 Q20 80 60 100 Q100 80 90 40" stroke="#4F8EF7" strokeWidth="6" fill="none" />
    {/* Earpieces */}
    <circle cx="28" cy="38" r="7" fill="#B3D0FF" stroke="#4F8EF7" strokeWidth="3" />
    <circle cx="92" cy="38" r="7" fill="#B3D0FF" stroke="#4F8EF7" strokeWidth="3" />
    {/* Face (on tubing) */}
    <ellipse cx="60" cy="70" rx="18" ry="16" fill="#FFF" stroke="#4F8EF7" strokeWidth="3" />
    {/* Smile */}
    <path d="M52 75 Q60 85 68 75" stroke="#4F8EF7" strokeWidth="2" fill="none" />
    {/* Eyes */}
    <circle cx="54" cy="68" r="2" fill="#4F8EF7" />
    <circle cx="66" cy="68" r="2" fill="#4F8EF7" />
    {/* Doctor coat collar */}
    <path d="M48 86 L60 100 L72 86" stroke="#4F8EF7" strokeWidth="2" fill="#E6F0FF" />
    {/* Chestpiece */}
    <circle cx="60" cy="104" r="7" fill="#FFF" stroke="#4F8EF7" strokeWidth="3" />
    {/* Button on coat */}
    <circle cx="60" cy="95" r="1.5" fill="#4F8EF7" />
  </svg>
);

export default DoctorMascot;
