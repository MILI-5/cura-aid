import React, { useState } from 'react';
import { useToast } from '../components/shared/ToastContext';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
}

const initialPatients: Patient[] = [
  { id: 1, name: 'John Doe', age: 30, gender: 'Male', contact: '1234567890' },
  { id: 2, name: 'Jane Smith', age: 25, gender: 'Female', contact: '9876543210' },
];

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [form, setForm] = useState<Partial<Patient>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender || !form.contact) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (editingId !== null) {
      setPatients(patients.map(p => p.id === editingId ? { ...p, ...form, age: Number(form.age) } as Patient : p));
      setEditingId(null);
      showToast('Patient updated successfully!', 'success');
    } else {
      const newPatient: Patient = {
        id: Date.now(),
        name: form.name as string,
        age: Number(form.age),
        gender: form.gender as string,
        contact: form.contact as string,
      };
      setPatients([...patients, newPatient]);
      showToast('Patient added successfully!', 'success');
    }
    setForm({});
  };

  const handleEdit = (patient: Patient) => {
    setForm(patient);
    setEditingId(patient.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setPatients(patients.filter(p => p.id !== deleteId));
      if (editingId === deleteId) {
        setForm({});
        setEditingId(null);
      }
      showToast('Patient deleted successfully!', 'info');
      setDeleteId(null);
    }
  };

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-2xl">🧑‍🤝‍🧑</span>
          Patients Management
        </motion.h1>
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card mb-10"
        >
          <div className="text-xl font-bold mb-4">{editingId !== null ? 'Edit Patient' : 'Add Patient'}</div>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            {/* Floating label input */}
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
            {/* Age */}
            <div className="relative w-32">
              <input
                name="age"
                id="age"
                type="number"
                value={form.age || ''}
                onChange={handleChange}
                required
                className="peer px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary w-full font-sans transition-all"
                placeholder=" "
                min="0"
              />
              <label htmlFor="age" className="absolute left-3 top-2 text-neutral-500 dark:text-neutral-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary bg-white/80 dark:bg-gray-900/80 px-1 rounded">Age</label>
            </div>
            {/* Gender */}
            <div className="relative w-40">
              <select
                name="gender"
                id="gender"
                value={form.gender || ''}
                onChange={handleChange}
                required
                className="peer px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-primary w-full font-sans transition-all"
              >
                <option value="" disabled hidden></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="gender" className="absolute left-3 top-2 text-neutral-500 dark:text-neutral-400 pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary bg-white/80 dark:bg-gray-900/80 px-1 rounded">Gender</label>
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
              {editingId !== null ? 'Update' : 'Add'} Patient
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
            <div className="text-xl font-bold">Patient List</div>
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
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Age</th>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Gender</th>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Contact</th>
                  <th className="py-2 px-3 font-semibold text-neutral-700 dark:text-neutral-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, i) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}
                  >
                    <td className="py-2 px-3">{patient.name}</td>
                    <td className="py-2 px-3">{patient.age}</td>
                    <td className="py-2 px-3">{patient.gender}</td>
                    <td className="py-2 px-3">{patient.contact}</td>
                    <td className="py-2 px-3">
                      <button onClick={() => handleEdit(patient)} className="mr-2 px-3 py-1 bg-primary text-white rounded-lg shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150 active:scale-95">Edit</button>
                      <button onClick={() => handleDelete(patient.id)} className="px-3 py-1 bg-error text-white rounded-lg shadow hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-error/40 transition-all duration-150 active:scale-95">Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        {/* Delete Confirmation Dialog */}
        {deleteId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-glass p-6 w-80 border border-neutral-100 dark:border-neutral-800">
              <div className="text-lg font-bold mb-4">Confirm Delete</div>
              <div className="mb-6">Are you sure you want to delete this patient?</div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary/20 font-semibold transition-all duration-150 active:scale-95">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 focus:outline-none focus:ring-2 focus:ring-error/40 font-semibold transition-all duration-150 active:scale-95">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients; 