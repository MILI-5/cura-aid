import React, { useState, useEffect } from "react";
import AnimatedGauge from "./AnimatedGauge";
import AnimatedGear from "./AnimatedGear";
import { motion } from "framer-motion";

const MachineDashboard: React.FC = () => {
  // Sample live stats (could be props or fetched from API)
  const [occupancy, setOccupancy] = useState(72);
  const [appointments, setAppointments] = useState(58);
  const [pharmacyStock, setPharmacyStock] = useState(88);
  const [systemActive, setSystemActive] = useState(true);

  // Simulate live updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setOccupancy(o => Math.max(0, Math.min(100, o + (Math.random() - 0.5) * 4)));
      setAppointments(a => Math.max(0, Math.min(100, a + (Math.random() - 0.5) * 6)));
      setPharmacyStock(s => Math.max(0, Math.min(100, s + (Math.random() - 0.5) * 3)));
    }, 1800);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-3xl bg-white/80 shadow-2xl flex flex-col md:flex-row items-center justify-center gap-8 mt-10 relative overflow-hidden">
      {/* Animated background gear */}
      <AnimatedGear size={120} color="#bae6fd" active={systemActive} className="absolute -left-16 -top-16 opacity-30 z-0" />
      <div className="flex-1 flex flex-col items-center z-10">
        <AnimatedGauge value={occupancy} label="Occupancy" color="#0ea5e9" size={140} />
      </div>
      <div className="flex-1 flex flex-col items-center z-10">
        <AnimatedGauge value={appointments} label="Appointments" color="#38bdf8" size={140} />
      </div>
      <div className="flex-1 flex flex-col items-center z-10">
        <AnimatedGauge value={pharmacyStock} label="Pharmacy Stock" color="#14b8a6" size={140} />
      </div>
      {/* System status gear */}
      <div className="flex flex-col items-center z-10">
        <AnimatedGear size={64} color="#0ea5e9" active={systemActive} />
        <motion.div
          className="mt-2 text-sm font-semibold text-sky-700"
          animate={{ opacity: systemActive ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
        >
          {systemActive ? "System Online" : "System Idle"}
        </motion.div>
      </div>
    </div>
  );
};

export default MachineDashboard; 