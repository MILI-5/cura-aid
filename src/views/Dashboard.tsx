import React, { useState } from 'react';
import { useClinicStore } from '../store/clinicStore';
import { useSessionUser } from '../store/authStore';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';
// If you have a chart library installed, import it here. Otherwise, use placeholder divs for charts.

const mockMetrics = (clinicId: string) => ({
  appointments: clinicId === 'clinic1' ? 120 : 80,
  patients: clinicId === 'clinic1' ? 45 : 30,
  revenue: clinicId === 'clinic1' ? 15000 : 9000,
  doctors: clinicId === 'clinic1' ? 8 : 5,
});

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900 font-sans">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-12 mt-8">
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