import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-white/90 dark:bg-gray-900/90 border-t border-blue-100 dark:border-blue-900 mt-16 py-8 px-4 text-center text-gray-700 dark:text-gray-300">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🏥</span>
        <span className="font-bold text-primary">Cliniq Hospital</span>
      </div>
      <div className="flex gap-6 text-sm">
        <a href="/" className="hover:text-primary transition" aria-label="Home">Home</a>
        <a href="/about" className="hover:text-primary transition" aria-label="About">About</a>
        <a href="/contact" className="hover:text-primary transition" aria-label="Contact">Contact</a>
        <a href="/privacy" className="hover:text-primary transition" aria-label="Privacy Policy">Privacy Policy</a>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Cliniq Hospital. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer; 