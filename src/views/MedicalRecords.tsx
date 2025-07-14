import React, { useState } from 'react';
import { useToast } from '../components/shared/ToastContext';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';

interface MedicalRecord {
  id: number;
  patient: string;
  diagnosis: string;
  date: string;
}

// Mock data for patients
const mockPatients = ['John Doe', 'Jane Smith'];

const initialRecords: MedicalRecord[] = [
  { id: 1, patient: 'John Doe', diagnosis: 'Flu', date: '2024-06-01' },
  { id: 2, patient: 'Jane Smith', diagnosis: 'Allergy', date: '2024-06-02' },
];

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [form, setForm] = useState<Partial<MedicalRecord>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.diagnosis || !form.date) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (editingId !== null) {
      setRecords(records.map(r => r.id === editingId ? { ...r, ...form } as MedicalRecord : r));
      setEditingId(null);
      showToast('Record updated successfully!', 'success');
    } else {
      const newRecord: MedicalRecord = {
        id: Date.now(),
        patient: form.patient as string,
        diagnosis: form.diagnosis as string,
        date: form.date as string,
      };
      setRecords([...records, newRecord]);
      showToast('Record added successfully!', 'success');
    }
    setForm({});
  };

  const handleEdit = (record: MedicalRecord) => {
    setForm(record);
    setEditingId(record.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setRecords(records.filter(r => r.id !== deleteId));
      if (editingId === deleteId) {
        setForm({});
        setEditingId(null);
      }
      showToast('Record deleted successfully!', 'info');
      setDeleteId(null);
    }
  };

  const filteredRecords = records.filter(r =>
    r.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 dark:from-gray-900 dark:via-blue-900 dark:to-teal-900 font-sans">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-12 mt-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-primary mb-10 tracking-tight drop-shadow-sm flex items-center gap-2"
        >
          <span className="inline-block bg-white/60 dark:bg-gray-900/60 rounded-full px-3 py-1 shadow-sm backdrop-blur">📋</span>
          Medical Records
        </motion.h1>
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card mb-10"
        >
          <div className="text-xl font-semibold mb-6 text-primary/90 flex items-center gap-2">
            {editingId !== null ? 'Edit Record' : 'Add Record'}
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient */}
            <div className="relative">
              <select
                id="patient"
                name="patient"
                value={form.patient || ''}
                onChange={handleChange}
                required
                className="peer glass-input"
              >
                <option value="" disabled hidden></option>
                {mockPatients.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <label htmlFor="patient" className="glass-label">Patient</label>
            </div>
            {/* Diagnosis */}
            <div className="relative">
              <input
                id="diagnosis"
                name="diagnosis"
                value={form.diagnosis || ''}
                onChange={handleChange}
                required
                className="peer glass-input"
                autoComplete="off"
                placeholder=" "
              />
              <label htmlFor="diagnosis" className="glass-label">Diagnosis</label>
            </div>
            {/* Date */}
            <div className="relative">
              <input
                id="date"
                name="date"
                type="date"
                value={form.date || ''}
                onChange={handleChange}
                required
                className="peer glass-input"
                placeholder=" "
              />
              <label htmlFor="date" className="glass-label">Date</label>
            </div>
            <div className="col-span-full flex gap-3 mt-2">
              <button type="submit" className="btn-primary shadow-md">
                {editingId !== null ? 'Update' : 'Add'} Record
              </button>
              {editingId !== null && (
                <button type="button" onClick={() => { setForm({}); setEditingId(null); }} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </motion.div>
        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white/90 dark:bg-gray-900/90 shadow-glass rounded-2xl p-6 backdrop-blur-md border border-neutral-100 dark:border-neutral-800"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-xl font-semibold text-primary/90">Medical Record List</div>
            <input
              type="text"
              placeholder="Search by patient..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="glass-input w-full md:w-64"
              aria-label="Search medical records by patient"
            />
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-primary/80">Patient</th>
                  <th className="px-4 py-2 text-primary/80">Diagnosis</th>
                  <th className="px-4 py-2 text-primary/80">Date</th>
                  <th className="px-4 py-2 text-primary/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400 dark:text-gray-500">No records found.</td>
                  </tr>
                ) : (
                  filteredRecords.map((record, i) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}
                    >
                      <td className="px-4 py-2 rounded-l-xl font-medium">{record.patient}</td>
                      <td className="px-4 py-2">{record.diagnosis}</td>
                      <td className="px-4 py-2">{record.date}</td>
                      <td className="px-4 py-2 rounded-r-xl flex gap-2">
                        <button onClick={() => handleEdit(record)} className="btn-table-edit">Edit</button>
                        <button onClick={() => handleDelete(record.id)} className="btn-table-delete">Delete</button>
                      </td>
                    </motion.tr>
                  ))
                )}
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
              <div className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this record?</div>
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

export default MedicalRecords; 