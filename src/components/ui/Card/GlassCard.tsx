import React from 'react';
import classNames from 'classnames';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const glassStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.88)',
  boxShadow: '0 8px 32px 0 rgba(56,189,248,0.18), 0 2px 12px 0 rgba(16,185,129,0.10)', // More pronounced, colorful shadow
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: '2.2rem',
  border: '2.5px solid #67e8f9', // Vibrant blue/teal border
  outline: '3px solid #bae6fd', // Subtle highlight
  outlineOffset: '-4px',
  transition: 'box-shadow 0.3s, transform 0.2s, border-color 0.3s',
};

const GlassCard: React.FC<GlassCardProps> = ({ children, className, style, tabIndex, onClick, role, 'aria-label': ariaLabel, ...rest }) => {
  const isInteractive = typeof onClick === 'function';
  return (
    <div
      className={classNames('glass-card', 'hover:glass-card-hover', 'text-gray-900', className)}
      style={{ ...glassStyle, ...style }}
      tabIndex={tabIndex !== undefined ? tabIndex : isInteractive ? 0 : undefined}
      role={role || (isInteractive ? 'button' : undefined)}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(56,189,248,0.22), 0 4px 16px 0 rgba(16,185,129,0.13)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = glassStyle.boxShadow || '0 8px 32px 0 rgba(56,189,248,0.18), 0 2px 12px 0 rgba(16,185,129,0.10)'}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GlassCard; 