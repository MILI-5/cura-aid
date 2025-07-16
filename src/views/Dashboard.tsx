import React, { useState } from 'react';
import { useClinicStore } from '../store/clinicStore';
import { useSessionUser } from '../store/authStore';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';
import DashboardMascot from "@/components/ui/Mascots/DashboardMascot";
import MachineDashboard from "@/components/ui/StatusIcon/MachineDashboard";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
// If you have a chart library installed, import it here. Otherwise, use placeholder divs for charts.

const mockMetrics = (clinicId: string) => ({
  appointments: clinicId === 'clinic1' ? 120 : 80,
  patients: clinicId === 'clinic1' ? 45 : 30,
  revenue: clinicId === 'clinic1' ? 15000 : 9000,
  doctors: clinicId === 'clinic1' ? 8 : 5,
});

// 3D Stethoscope Model
function Stethoscope3D() {
  return (
    <Float speed={2} rotationIntensity={0.7} floatIntensity={1.2}>
      <group>
        {/* Tubing */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.7, 0.08, 16, 100, Math.PI * 1.2]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        {/* Chestpiece */}
        <mesh position={[0.7, -0.2, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.18, 32]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Diaphragm */}
        <mesh position={[0.7, -0.3, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 32]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        {/* Eartubes */}
        <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 16]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2.5]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        {/* Eartips */}
        <mesh position={[-0.35, 0.65, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        <mesh position={[-0.65, 0.65, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
    </Float>
  );
}

const Dashboard: React.FC = () => {
  const { currentClinic } = useClinicStore();
  const { user } = useSessionUser();
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [doctor, setDoctor] = useState('');
  const metrics = mockMetrics(currentClinic.id);

  // Mock chart data
  const chartData = [
    { label: 'Jan', value: currentClinic.id === 'clinic1' ? 20 : 10 },
    { label: 'Feb', value: currentClinic.id === 'clinic1' ? 30 : 15 },
    { label: 'Mar', value: currentClinic.id === 'clinic1' ? 25 : 20 },
    { label: 'Apr', value: currentClinic.id === 'clinic1' ? 45 : 35 },
  ];

  const handleExport = () => {
    alert('Exported dashboard data (mock)');
  };

  console.log('CREATIVE DASHBOARD RENDERED');

  return (
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
        whileHover={{ rotate: 8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center mt-8 relative z-10"
      >
        <DashboardMascot size={160} title="Welcome to your health dashboard!" />
      </motion.div>
      {/* 3D Stethoscope Widget */}
      <div className="flex justify-center mt-4 mb-2 z-10">
        <div className="w-[180px] h-[180px] bg-transparent rounded-2xl shadow-2xl overflow-hidden">
          <Canvas camera={{ position: [0, 0.7, 3], fov: 40 }} shadows>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 10, 5]} intensity={0.7} castShadow />
            <Stethoscope3D />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>
        </div>
      </div>
      {/* Machine Dashboard */}
      <div className="relative z-10">
        <MachineDashboard />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 mt-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-primary mb-10 tracking-tight drop-shadow-sm flex items-center gap-2"
        >
          <span className="inline-block bg-white/60 dark:bg-gray-900/60 rounded-full px-3 py-1 shadow-sm backdrop-blur">📊</span>
          Dashboard & Analytics
        </motion.h1>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Date From</label>
            <input type="date" className="glass-input" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date To</label>
            <input type="date" className="glass-input" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Doctor</label>
            <select className="glass-input" value={doctor} onChange={e => setDoctor(e.target.value)}>
              <option value="">All</option>
              <option value="Dr. Alice Brown">Dr. Alice Brown</option>
              <option value="Dr. Bob White">Dr. Bob White</option>
            </select>
          </div>
          <button onClick={handleExport} className="btn-info h-10 mt-5">Export Data</button>
        </div>
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">{metrics.appointments}</div>
            <div className="text-sm text-gray-500">Appointments</div>
          </div>
          <div className="glass-card p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">{metrics.patients}</div>
            <div className="text-sm text-gray-500">Patients</div>
          </div>
          <div className="glass-card p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">{metrics.doctors}</div>
            <div className="text-sm text-gray-500">Doctors</div>
          </div>
          <div className="glass-card p-6 flex flex-col items-center">
            <div className="text-2xl font-bold text-primary">${metrics.revenue.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Revenue</div>
          </div>
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <div className="font-semibold mb-2">Appointments Over Time</div>
            {/* Replace with real chart component if available */}
            <div className="h-48 flex items-end gap-2">
              {chartData.map((d, i) => (
                <div key={d.label} className="flex flex-col items-center justify-end" style={{ height: '100%' }}>
                  <div className="bg-primary" style={{ height: `${d.value * 3}px`, width: '24px', background: '#2563eb', borderRadius: '6px' }}></div>
                  <div className="text-xs mt-1">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="font-semibold mb-2">Patient Demographics</div>
            {/* Placeholder for pie/donut chart */}
            <div className="h-48 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
                60% Female<br />40% Male
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 