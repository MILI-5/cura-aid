import React from 'react';
import { FaHospitalSymbol } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg rounded-t-2xl border-t border-primary/10 dark:border-primary/20 mt-16 py-8 px-4 text-center text-gray-700 dark:text-gray-300 transition-all duration-300">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl text-primary drop-shadow-md animate-pulse-slow"><FaHospitalSymbol /></span>
        <span className="font-bold text-primary text-lg md:text-xl">Cliniq Hospital</span>
      </div>
      <div className="flex gap-6 text-sm">
        <a href="/" className="hover:text-primary transition relative after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" aria-label="Home">Home</a>
        <a href="/about" className="hover:text-primary transition relative after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" aria-label="About">About</a>
        <a href="/contact" className="hover:text-primary transition relative after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" aria-label="Contact">Contact</a>
        <a href="/privacy" className="hover:text-primary transition relative after:block after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left" aria-label="Privacy Policy">Privacy Policy</a>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Cliniq Hospital. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer; 