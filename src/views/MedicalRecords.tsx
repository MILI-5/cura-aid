import React, { useState } from 'react';
import { useToast } from '../components/shared/ToastContext';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';
import { useSessionUser } from '../store/authStore';
import useAuthority from '../utils/hooks/useAuthority';
import { useClinicStore } from '../store/clinicStore';

interface MedicalRecord {
  id: number;
  patient: string;
  diagnosis: string;
  date: string;
  fileName?: string;
  fileUrl?: string;
  clinicId: string;
}

interface AuditLogEntry {
  user: string;
  action: string;
  timestamp: string;
}

// Mock data for patients
const mockPatients = ['John Doe', 'Jane Smith'];

const initialRecords: MedicalRecord[] = [
  { id: 1, patient: 'John Doe', diagnosis: 'Flu', date: '2024-06-01', clinicId: 'clinic1' },
  { id: 2, patient: 'Jane Smith', diagnosis: 'Allergy', date: '2024-06-02', clinicId: 'clinic2' },
];

// Mock audit log data per record
const mockAuditLogs: Record<number, AuditLogEntry[]> = {
  1: [
    { user: 'Dr. Alice Brown', action: 'Viewed', timestamp: '2024-06-01 10:15' },
    { user: 'John Doe', action: 'Downloaded', timestamp: '2024-06-01 11:00' },
  ],
  2: [
    { user: 'Dr. Bob White', action: 'Edited', timestamp: '2024-06-02 15:20' },
    { user: 'Jane Smith', action: 'Viewed', timestamp: '2024-06-02 16:00' },
  ],
};

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [form, setForm] = useState<Partial<MedicalRecord>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [auditLogOpenId, setAuditLogOpenId] = useState<number | null>(null);
  const { showToast } = useToast();
  const { currentClinic } = useClinicStore();
  // Auth/role logic
  const { user } = useSessionUser();
  const isDoctor = useAuthority(user.authority, ['doctor', 'admin']);
  const isAdmin = useAuthority(user.authority, ['admin']);
  const isPatient = useAuthority(user.authority, ['patient']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.diagnosis || !form.date) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    let fileName = form.fileName;
    let fileUrl = form.fileUrl;
    if (file) {
      fileName = file.name;
      fileUrl = URL.createObjectURL(file);
    }
    if (editingId !== null) {
      setRecords(records.map(r => r.id === editingId ? { ...r, ...form, fileName, fileUrl, clinicId: currentClinic.id } as MedicalRecord : r));
      setEditingId(null);
      showToast('Record updated successfully!', 'success');
    } else {
      const newRecord: MedicalRecord = {
        id: Date.now(),
        patient: form.patient as string,
        diagnosis: form.diagnosis as string,
        date: form.date as string,
        fileName,
        fileUrl,
        clinicId: currentClinic.id,
      };
      setRecords([...records, newRecord]);
      showToast('Record added successfully!', 'success');
    }
    setForm({});
    setFile(null);
  };

  const handleEdit = (record: MedicalRecord) => {
    setForm(record);
    setEditingId(record.id);
    setFile(null);
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

  // Export/Import/Print/Share mock logic
  const handleExport = () => showToast('Exported records (mock)', 'success');
  const handleImport = () => showToast('Imported records (mock)', 'success');
  const handlePrint = () => showToast('Print dialog opened (mock)', 'info');
  const handleShare = () => showToast('Share dialog opened (mock)', 'info');

  // Filter records for patients
  const visibleRecords = (isPatient ? records.filter(r => r.patient === user.userName) : records).filter(r => r.clinicId === currentClinic.id);

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
        {/* Role-based UI hint */}
        {isPatient && (
          <div className="mb-4 text-blue-700 bg-blue-100 rounded px-4 py-2">You have read-only access to your records.</div>
        )}
        {/* Export/Import/Print/Share Actions */}
        <div className="flex gap-2 mb-6">
          <button onClick={handleExport} className="btn-info btn-xs">Export</button>
          <button onClick={handleImport} className="btn-info btn-xs">Import</button>
          <button onClick={handlePrint} className="btn-info btn-xs">Print</button>
          <button onClick={handleShare} className="btn-info btn-xs">Share</button>
        </div>
        {/* Form Card (doctors/admins only) */}
        {(isDoctor || isAdmin) && (
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
              {/* File Upload */}
              <div className="relative col-span-full">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                  className="peer glass-input"
                />
                <label htmlFor="file" className="glass-label">Attach Document (PDF, Image)</label>
                {file && <div className="text-xs mt-1">Selected: {file.name}</div>}
              </div>
              <div className="col-span-full flex gap-3 mt-2">
                <button type="submit" className="btn-primary shadow-md">
                  {editingId !== null ? 'Update' : 'Add'} Record
                </button>
                {editingId !== null && (
                  <button type="button" onClick={() => { setForm({}); setEditingId(null); setFile(null); }} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
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
                  <th className="px-4 py-2 text-primary/80">Document</th>
                  <th className="px-4 py-2 text-primary/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400 dark:text-gray-500">No records found.</td>
                  </tr>
                ) : (
                  visibleRecords.map((record, i) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}
                    >
                      <td className="px-4 py-2">{record.patient}</td>
                      <td className="px-4 py-2">{record.diagnosis}</td>
                      <td className="px-4 py-2">{record.date}</td>
                      <td className="px-4 py-2">
                        {record.fileName && record.fileUrl ? (
                          <a href={record.fileUrl} download={record.fileName} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M12.293 9.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L13.586 14H7a1 1 0 110-2h6.586l-1.293-1.293a1 1 0 010-1.414z" /></svg>
                            {record.fileName}
                          </a>
                        ) : (
                          <span className="text-gray-400">No document</span>
                        )}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        {(isDoctor || isAdmin) && <button onClick={() => handleEdit(record)} className="btn-secondary btn-xs">Edit</button>}
                        {(isDoctor || isAdmin) && <button onClick={() => handleDelete(record.id)} className="btn-danger btn-xs">Delete</button>}
                        {(isDoctor || isAdmin) && <button onClick={() => setAuditLogOpenId(record.id)} className="btn-info btn-xs">Audit Log</button>}
                        {isPatient && <button onClick={() => setAuditLogOpenId(record.id)} className="btn-info btn-xs">View Access Log</button>}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Confirm Delete Modal */}
          {deleteId !== null && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center gap-4">
                <div className="text-lg font-semibold">Are you sure you want to delete this record?</div>
                <div className="flex gap-4 mt-2">
                  <button onClick={confirmDelete} className="btn-danger">Delete</button>
                  <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        {auditLogOpenId !== null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center gap-4 min-w-[320px] max-w-[90vw]">
              <div className="text-lg font-semibold mb-2">Audit Log for Record #{auditLogOpenId}</div>
              <div className="w-full">
                <table className="min-w-full text-left border-separate border-spacing-y-1">
                  <thead>
                    <tr>
                      <th className="px-3 py-1 text-primary/80">User</th>
                      <th className="px-3 py-1 text-primary/80">Action</th>
                      <th className="px-3 py-1 text-primary/80">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(mockAuditLogs[auditLogOpenId] || []).map((entry, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-1">{entry.user}</td>
                        <td className="px-3 py-1">{entry.action}</td>
                        <td className="px-3 py-1">{entry.timestamp}</td>
                      </tr>
                    ))}
                    {(!mockAuditLogs[auditLogOpenId] || mockAuditLogs[auditLogOpenId].length === 0) && (
                      <tr><td colSpan={3} className="text-center text-gray-400">No audit log entries.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <button onClick={() => setAuditLogOpenId(null)} className="btn-secondary mt-4">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords; 