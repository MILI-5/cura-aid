import React, { useState } from 'react';
import { useToast } from '../components/shared/ToastContext';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  contact: string;
}

const initialDoctors: Doctor[] = [
  { id: 1, name: 'Dr. Alice Brown', specialty: 'Cardiology', contact: '555-1234' },
  { id: 2, name: 'Dr. Bob White', specialty: 'Neurology', contact: '555-5678' },
];

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [form, setForm] = useState<Partial<Doctor>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.specialty || !form.contact) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (editingId !== null) {
      setDoctors(doctors.map(d => d.id === editingId ? { ...d, ...form } as Doctor : d));
      setEditingId(null);
      showToast('Doctor updated successfully!', 'success');
    } else {
      const newDoctor: Doctor = {
        id: Date.now(),
        name: form.name as string,
        specialty: form.specialty as string,
        contact: form.contact as string,
      };
      setDoctors([...doctors, newDoctor]);
      showToast('Doctor added successfully!', 'success');
    }
    setForm({});
  };

  const handleEdit = (doctor: Doctor) => {
    setForm(doctor);
    setEditingId(doctor.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setDoctors(doctors.filter(d => d.id !== deleteId));
      if (editingId === deleteId) {
        setForm({});
        setEditingId(null);
      }
      showToast('Doctor deleted successfully!', 'info');
      setDeleteId(null);
    }
  };

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-neutral-50 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900 font-sans">
      <NavBar />
      <div className="max-w-3xl mx-auto p-6 sm:p-8 mt-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-extrabold text-primary mb-8 flex items-center gap-2"
        >
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-2xl">🩺</span>
          Doctors Management
        </motion.h1>
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card mb-10"
        >
          <div className="text-xl font-bold mb-4">{editingId !== null ? 'Edit Doctor' : 'Add Doctor'}</div>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            {/* Name */}
            <div className="relative w-48">
              <input
                name="name"
                id="name"
                value={form.name || ''}
                onChange={handleChange}
                required
                className="peer px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary w-full font-sans transition-all"
                placeholder=" "
              />
              <label htmlFor="name" className="absolute left-3 top-2 text-neutral-500 dark:text-neutral-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary bg-white/80 dark:bg-gray-900/80 px-1 rounded">Name</label>
            </div>
            {/* Specialty */}
            <div className="relative w-48">
              <input
                name="specialty"
                id="specialty"
                value={form.specialty || ''}
                onChange={handleChange}
                required
                className="peer px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary w-full font-sans transition-all"
                placeholder=" "
              />
              <label htmlFor="specialty" className="absolute left-3 top-2 text-neutral-500 dark:text-neutral-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary bg-white/80 dark:bg-gray-900/80 px-1 rounded">Specialty</label>
            </div>
            {/* Contact */}
            <div className="relative w-56">
              <input
                name="contact"
                id="contact"
                value={form.contact || ''}
                onChange={handleChange}
                required
                className="peer px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary w-full font-sans transition-all"
                placeholder=" "
              />
              <label htmlFor="contact" className="absolute left-3 top-2 text-neutral-500 dark:text-neutral-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary bg-white/80 dark:bg-gray-900/80 px-1 rounded">Contact</label>
            </div>
            <button type="submit" className="btn-primary shadow-md">
              {editingId !== null ? 'Update' : 'Add'} Doctor
            </button>
            {editingId !== null && (
              <button type="button" onClick={() => { setForm({}); setEditingId(null); }} className="btn-secondary">
                Cancel
              </button>
            )}
          </form>
        </motion.div>
        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white/90 dark:bg-gray-900/90 shadow-glass rounded-2xl p-6 backdrop-blur-md border border-neutral-100 dark:border-neutral-800"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold">Doctor List</div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary w-64 font-sans"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left rounded-xl overflow-hidden">
              <thead className="sticky top-0 bg-neutral-50 dark:bg-neutral-800/80">
                <tr>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Name</th>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Specialty</th>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Contact</th>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor, i) => (
                  <motion.tr
                    key={doctor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}
                  >
                    <td className="py-2 px-3">{doctor.name}</td>
                    <td className="py-2 px-3">{doctor.specialty}</td>
                    <td className="py-2 px-3">{doctor.contact}</td>
                    <td className="py-2 px-3">
                      <button onClick={() => handleEdit(doctor)} className="mr-2 px-3 py-1 bg-primary text-white rounded-lg shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150 active:scale-95">Edit</button>
                      <button onClick={() => handleDelete(doctor.id)} className="px-3 py-1 bg-error text-white rounded-lg shadow hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-error/40 transition-all duration-150 active:scale-95">Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        {/* Delete Confirmation Dialog */}
        {deleteId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="glass-card w-80 p-8 animate-fade-in">
              <div className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="inline-block"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                Confirm Delete
              </div>
              <div className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this doctor?</div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
                <button onClick={confirmDelete} className="btn-danger">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors; 