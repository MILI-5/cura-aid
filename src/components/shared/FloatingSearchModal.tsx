import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/themes', label: 'Themes' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
  { to: '/contact', label: 'Contact' },
];

const FloatingSearchModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredLinks = NAV_LINKS.filter(link =>
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigate = (to: string) => {
    setOpen(false);
    setSearch('');
    navigate(to);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={() => setOpen(false)}
          aria-label="Close search"
        >
          ×
        </button>
        <div className="flex items-center gap-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search pages..."
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          {filteredLinks.length === 0 && <div className="text-gray-500">No results found.</div>}
          {filteredLinks.map(link => (
            <button
              key={link.to}
              className="text-left px-3 py-2 rounded hover:bg-primary/10 transition text-gray-800 dark:text-gray-100 w-full"
              onClick={() => handleNavigate(link.to)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-400 text-center">Press Esc to close • Cmd+K / Ctrl+K to open</div>
      </div>
    </div>
  );
};

export default FloatingSearchModal; 