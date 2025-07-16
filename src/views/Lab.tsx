import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';
import { motion } from "framer-motion";
import LabMascot from "@/components/ui/Mascots/LabMascot";

const Lab: React.FC = () => (
  <>
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="flex justify-center mt-8"
    >
      <LabMascot size={140} title="Lab mascot: ready for science!" />
    </motion.div>
    <HospitalPageLayout
      title="Lab & Diagnostics"
      subtitle="Order tests, track results, and integrate with lab equipment."
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
          Order tests, track results, and integrate with lab equipment here.
        </p>
      </div>
    </HospitalPageLayout>
  </>
);
export default Lab; 