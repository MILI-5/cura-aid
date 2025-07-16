import React from "react";

interface ProfileMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful profile mascot: a friendly ID card holding a shield.
 */
const ProfileMascot: React.FC<ProfileMascotProps> = ({ size = 120, className, title = "Profile Mascot" }) => (
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
    {/* ID card */}
    <rect x="32" y="40" width="56" height="40" rx="8" fill="#FFF" stroke="#4F8EF7" strokeWidth="3" />
    {/* Card face */}
    <circle cx="48" cy="60" r="7" fill="#B3D0FF" />
    {/* Card smile */}
    <path d="M44 65 Q48 69 52 65" stroke="#4F8EF7" strokeWidth="2" fill="none" />
    {/* Card eyes */}
    <circle cx="46" cy="59" r="1.2" fill="#4F8EF7" />
    <circle cx="50" cy="59" r="1.2" fill="#4F8EF7" />
    {/* Card lines */}
    <rect x="58" y="56" width="20" height="4" rx="2" fill="#E6F0FF" />
    <rect x="58" y="64" width="16" height="3" rx="1.5" fill="#E6F0FF" />
    {/* Shield */}
    <path d="M90 60 Q90 75 75 80 Q60 75 60 60 Q75 55 90 60" fill="#4F8EF7" stroke="#2C5AA0" strokeWidth="2" />
    <path d="M75 65 Q75 75 75 75" stroke="#FFF" strokeWidth="2" />
    {/* Card hand holding shield */}
    <ellipse cx="60" cy="60" rx="2" ry="3" fill="#F7B84F" />
  </svg>
);

export default ProfileMascot;
