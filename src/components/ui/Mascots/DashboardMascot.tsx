import React from "react";

interface DashboardMascotProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * A playful dashboard mascot: the main doctor mascot with friends from other sections.
 */
const DashboardMascot: React.FC<DashboardMascotProps> = ({ size = 140, className, title = "Dashboard Mascot" }) => (
  <svg
    width={size}
    height={size * 0.8}
    viewBox="0 0 140 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
    className={className}
  >
    <title>{title}</title>
    {/* Doctor mascot (center) */}
    <ellipse cx="70" cy="70" rx="22" ry="20" fill="#FFF" stroke="#4F8EF7" strokeWidth="3" />
    <ellipse cx="70" cy="70" rx="18" ry="16" fill="#FFF" stroke="#4F8EF7" strokeWidth="2" />
    <circle cx="62" cy="68" r="2" fill="#4F8EF7" />
    <circle cx="78" cy="68" r="2" fill="#4F8EF7" />
    <path d="M66 75 Q70 81 74 75" stroke="#4F8EF7" strokeWidth="2" fill="none" />
    {/* Pharmacy friend (left) */}
    <rect x="28" y="78" width="18" height="20" rx="6" fill="#FFF6E0" stroke="#F7B84F" strokeWidth="2" />
    <rect x="32" y="90" width="10" height="6" rx="2" fill="#F7B84F" />
    {/* Lab friend (right) */}
    <rect x="94" y="78" width="18" height="20" rx="6" fill="#E0F7FA" stroke="#4FC3F7" strokeWidth="2" />
    <circle cx="103" cy="88" r="4" fill="#B3E5FC" />
    {/* Health tip apple (front) */}
    <ellipse cx="70" cy="100" rx="10" ry="8" fill="#FF5E5B" stroke="#C62828" strokeWidth="2" />
    <ellipse cx="76" cy="92" rx="3" ry="1.5" fill="#81C784" stroke="#388E3C" strokeWidth="1" />
    {/* Appointment calendar (back left) */}
    <rect x="18" y="60" width="14" height="14" rx="3" fill="#FFF" stroke="#4F8EF7" strokeWidth="1.5" />
    {/* Support chat bubble (back right) */}
    <ellipse cx="122" cy="66" rx="8" ry="6" fill="#E6F0FF" stroke="#4F8EF7" strokeWidth="1.5" />
  </svg>
);

export default DashboardMascot;
