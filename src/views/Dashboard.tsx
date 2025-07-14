import React, { useState } from 'react';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';

// Mock data (should be replaced with real data or context in a full app)
const mockPatients = [
  { id: 1, name: 'John Doe', age: 30, gender: 'Male', contact: '1234567890' },
  { id: 2, name: 'Jane Smith', age: 25, gender: 'Female', contact: '9876543210' },
];
const mockDoctors = [
  { id: 1, name: 'Dr. Alice Brown', specialty: 'Cardiology', contact: '555-1234' },
  { id: 2, name: 'Dr. Bob White', specialty: 'Neurology', contact: '555-5678' },
];
const mockAppointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Alice Brown', date: '2024-06-01', time: '10:00' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Bob White', date: '2024-06-02', time: '14:30' },
];
const mockBills = [
  { id: 1, patient: 'John Doe', amount: 200, date: '2024-06-01' },
  { id: 2, patient: 'Jane Smith', amount: 350, date: '2024-06-02' },
];
const mockRecords = [
  { id: 1, patient: 'John Doe', diagnosis: 'Flu', date: '2024-06-01' },
  { id: 2, patient: 'Jane Smith', diagnosis: 'Allergy', date: '2024-06-02' },
];

const Dashboard: React.FC = () => {
  // In a real app, fetch or use context for these
  const [patients] = useState(mockPatients);
  const [doctors] = useState(mockDoctors);
  const [appointments] = useState(mockAppointments);
  const [bills] = useState(mockBills);
  const [records] = useState(mockRecords);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-neutral-50 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900 font-sans">
      <NavBar />
      <div className="max-w-6xl mx-auto p-6 sm:p-8 mt-10">
        <h1 className="text-4xl font-extrabold text-primary mb-10 tracking-tight flex items-center gap-3">
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-3xl">🏥</span>
          Hospital Dashboard
        </h1>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {/* Patients */}
          <motion.div
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/70 dark:bg-gray-900/70 shadow-glass rounded-xl p-6 flex flex-col items-center backdrop-blur-md border border-neutral-100 dark:border-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            tabIndex={0}
            aria-label="Patients Stat Card"
          >
            <span className="text-4xl mb-2">🧑‍🤝‍🧑</span>
            <div className="text-2xl font-bold text-primary font-sans">{patients.length}</div>
            <div className="text-neutral-500 dark:text-neutral-400">Patients</div>
          </motion.div>
          {/* Doctors */}
          <motion.div
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/70 dark:bg-gray-900/70 shadow-glass rounded-xl p-6 flex flex-col items-center backdrop-blur-md border border-neutral-100 dark:border-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            tabIndex={0}
            aria-label="Doctors Stat Card"
          >
            <span className="text-4xl mb-2">🩺</span>
            <div className="text-2xl font-bold text-primary font-sans">{doctors.length}</div>
            <div className="text-neutral-500 dark:text-neutral-400">Doctors</div>
          </motion.div>
          {/* Appointments */}
          <motion.div
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/70 dark:bg-gray-900/70 shadow-glass rounded-xl p-6 flex flex-col items-center backdrop-blur-md border border-neutral-100 dark:border-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            tabIndex={0}
            aria-label="Appointments Stat Card"
          >
            <span className="text-4xl mb-2">📅</span>
            <div className="text-2xl font-bold text-primary font-sans">{appointments.length}</div>
            <div className="text-neutral-500 dark:text-neutral-400">Appointments</div>
          </motion.div>
          {/* Bills */}
          <motion.div
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/70 dark:bg-gray-900/70 shadow-glass rounded-xl p-6 flex flex-col items-center backdrop-blur-md border border-neutral-100 dark:border-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            tabIndex={0}
            aria-label="Bills Stat Card"
          >
            <span className="text-4xl mb-2">💳</span>
            <div className="text-2xl font-bold text-primary font-sans">{bills.length}</div>
            <div className="text-neutral-500 dark:text-neutral-400">Bills</div>
          </motion.div>
          {/* Medical Records */}
          <motion.div
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white/70 dark:bg-gray-900/70 shadow-glass rounded-xl p-6 flex flex-col items-center backdrop-blur-md border border-neutral-100 dark:border-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            tabIndex={0}
            aria-label="Medical Records Stat Card"
          >
            <span className="text-4xl mb-2">🗂️</span>
            <div className="text-2xl font-bold text-primary font-sans">{records.length}</div>
            <div className="text-neutral-500 dark:text-neutral-400">Medical Records</div>
          </motion.div>
        </div>
        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Patients */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-900/80 shadow-glass rounded-2xl p-6 backdrop-blur-md border border-neutral-100 dark:border-neutral-800"
          >
            <div className="text-xl font-bold mb-4 flex items-center gap-2">🧑‍🤝‍🧑 <span>Recent Patients</span></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-xl overflow-hidden">
                <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-800/80">
                  <tr>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Name</th>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Age</th>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(-3).reverse().map((p, i) => (
                    <tr key={p.id} className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}>
                      <td className="py-2 px-3">{p.name}</td>
                      <td className="py-2 px-3">{p.age}</td>
                      <td className="py-2 px-3">{p.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          {/* Recent Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-900/80 shadow-glass rounded-2xl p-6 backdrop-blur-md border border-neutral-100 dark:border-neutral-800"
          >
            <div className="text-xl font-bold mb-4 flex items-center gap-2">📅 <span>Recent Appointments</span></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-xl overflow-hidden">
                <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-800/80">
                  <tr>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Patient</th>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Doctor</th>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Date</th>
                    <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(-3).reverse().map((a, i) => (
                    <tr key={a.id} className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}>
                      <td className="py-2 px-3">{a.patient}</td>
                      <td className="py-2 px-3">{a.doctor}</td>
                      <td className="py-2 px-3">{a.date}</td>
                      <td className="py-2 px-3">{a.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard; 