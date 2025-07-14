import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 px-8 py-2 bg-white/70 dark:bg-gray-900/70 text-sm font-medium text-gray-600 dark:text-gray-300" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary">Home</Link>
      {pathnames.map((segment, idx) => {
        const to = '/' + pathnames.slice(0, idx + 1).join('/');
        const isLast = idx === pathnames.length - 1;
        return (
          <span key={to} className="flex items-center gap-2">
            <span className="mx-1">/</span>
            {isLast ? (
              <span className="text-primary" aria-current="page">{capitalize(segment.replace(/-/g, ' '))}</span>
            ) : (
              <Link to={to} className="hover:text-primary">{capitalize(segment.replace(/-/g, ' '))}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs; 