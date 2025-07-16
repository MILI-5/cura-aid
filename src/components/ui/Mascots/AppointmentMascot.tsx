import React from "react";

interface AppointmentMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful appointment mascot: a smiling calendar page with a stethoscope.
 */
const AppointmentMascot: React.FC<AppointmentMascotProps> = ({ size = 120, className, title = "Appointment Mascot" }) => (
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
    {/* Calendar page */}
    <rect x="30" y="30" width="60" height="60" rx="12" fill="#FFF" stroke="#4F8EF7" strokeWidth="3" />
    {/* Calendar header */}
    <rect x="30" y="30" width="60" height="16" rx="6" fill="#F7B84F" />
    {/* Calendar rings */}
    <circle cx="40" cy="38" r="3" fill="#4F8EF7" />
    <circle cx="80" cy="38" r="3" fill="#4F8EF7" />
    {/* Face */}
    <circle cx="50" cy="60" r="3" fill="#4F8EF7" />
    <circle cx="70" cy="60" r="3" fill="#4F8EF7" />
    <path d="M54 68 Q60 74 66 68" stroke="#4F8EF7" strokeWidth="2" fill="none" />
    {/* Stethoscope draped */}
    <path d="M40 80 Q60 100 80 80" stroke="#4F8EF7" strokeWidth="3" fill="none" />
    <circle cx="40" cy="80" r="4" fill="#B3D0FF" stroke="#4F8EF7" strokeWidth="2" />
    <circle cx="80" cy="80" r="4" fill="#B3D0FF" stroke="#4F8EF7" strokeWidth="2" />
    {/* Waving flag */}
    <rect x="85" y="45" width="12" height="6" rx="2" fill="#4F8EF7" />
    <rect x="95" y="45" width="2" height="6" fill="#F7B84F" />
  </svg>
);

export default AppointmentMascot;
