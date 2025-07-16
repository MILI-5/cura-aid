import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';
import { motion } from "framer-motion";
import DoctorMascot from "@/components/ui/Mascots/DoctorMascot";

const Doctors: React.FC = () => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Animated SVG Blob Background */}
    <motion.svg
      className="absolute left-0 top-0 w-full h-full z-0 pointer-events-none"
      viewBox="0 0 1440 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      <motion.path
        fill="#bae6fd"
        fillOpacity="0.7"
        d="M0,160 C320,320 1120,0 1440,160 L1440,600 L0,600 Z"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        fill="#a7f3d0"
        fillOpacity="0.6"
        d="M0,320 C400,480 1040,120 1440,320 L1440,600 L0,600 Z"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="1200"
        cy="100"
        r="120"
        fill="#fcd34d"
        fillOpacity="0.18"
        animate={{
          x: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
    {/* Mascot with microinteraction */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ rotate: -8, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex justify-center mt-8 relative z-10"
    >
      <DoctorMascot size={140} title="Meet our friendly doctor!" />
    </motion.div>
    <div className="relative z-10">
      <HospitalPageLayout
        title="Doctor & Staff Management"
        subtitle="Manage doctor profiles, specialties, schedules, and staff roles."
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
            Manage doctor profiles, specialties, schedules, and staff roles here.
          </p>
        </div>
      </HospitalPageLayout>
    </div>
  </div>
);
export default Doctors; 