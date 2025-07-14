import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useToast } from '../components/shared/ToastContext';
import NavBar from '../components/shared/NavBar';
import { motion } from 'framer-motion';

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  recurrence?: 'None' | 'Daily' | 'Weekly' | 'Monthly';
  timeZone?: string;
  reminderSent?: boolean;
  callStatus?: 'Not Started' | 'Ongoing' | 'Ended' | 'Missed';
  callLog?: { event: 'join' | 'leave' | 'end'; user: string; timestamp: string }[];
  rescheduleHistory?: { date: string; time: string; reason: string }[];
  cancelReason?: string;
}

// Mock data for patients and doctors
const mockPatients = ['John Doe', 'Jane Smith'];
const mockDoctors = ['Dr. Alice Brown', 'Dr. Bob White'];

// Mock doctor schedules
const doctorSchedules: Record<string, Record<string, string[]>> = {
  'Dr. Alice Brown': {
    '2024-06-01': ['09:00', '10:00', '11:00'],
    '2024-06-02': ['14:00', '15:00'],
    '2024-06-03': ['09:00', '10:00'],
  },
  'Dr. Bob White': {
    '2024-06-01': ['13:00', '14:00'],
    '2024-06-02': ['10:00', '11:00', '12:00'],
    '2024-06-03': ['15:00', '16:00'],
  },
};

const initialAppointments: Appointment[] = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Alice Brown', date: '2024-06-01', time: '10:00', status: 'Scheduled', recurrence: 'None', timeZone: 'UTC', reminderSent: false, callStatus: 'Not Started', callLog: [], rescheduleHistory: [] },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Bob White', date: '2024-06-02', time: '14:30', status: 'Scheduled', recurrence: 'None', timeZone: 'UTC', reminderSent: false, callStatus: 'Not Started', callLog: [], rescheduleHistory: [] },
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [form, setForm] = useState<Partial<Appointment>>({ status: 'Scheduled', recurrence: 'None', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const { showToast } = useToast();
  const [videoRoom, setVideoRoom] = useState<string | null>(null);
  // Add new state for modals and logs
  const [showCallLog, setShowCallLog] = useState<Appointment | null>(null);
  const [showReschedule, setShowReschedule] = useState<Appointment | null>(null);
  const [showCancel, setShowCancel] = useState<Appointment | null>(null);
  const [reminderLoading, setReminderLoading] = useState<number | null>(null);
  // Local state for reschedule/cancel modals
  const [rescheduleFields, setRescheduleFields] = useState({ newDate: '', newTime: '', reason: '' });
  const [cancelReason, setCancelReason] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patient || !form.doctor || !form.date || !form.time) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (editingId !== null) {
      setAppointments(appointments.map(a => a.id === editingId ? { ...a, ...form } as Appointment : a));
      setEditingId(null);
      showToast('Appointment updated successfully!', 'success');
    } else {
      const newAppointment: Appointment = {
        id: Date.now(),
        patient: form.patient as string,
        doctor: form.doctor as string,
        date: form.date as string,
        time: form.time as string,
        status: (form.status as Appointment['status']) || 'Scheduled',
        recurrence: (form.recurrence as Appointment['recurrence']) || 'None',
        timeZone: form.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        reminderSent: false,
        callStatus: 'Not Started',
        callLog: [],
        rescheduleHistory: [],
      };
      setAppointments([...appointments, ...generateRecurringAppointments(newAppointment)]);
      showToast('Appointment(s) added successfully!', 'success');
    }
    setForm({ status: 'Scheduled', recurrence: 'None', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  };

  const handleEdit = (appointment: Appointment) => {
    setForm(appointment);
    setEditingId(appointment.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setAppointments(appointments.filter(a => a.id !== deleteId));
      if (editingId === deleteId) {
        setForm({});
        setEditingId(null);
      }
      showToast('Appointment deleted successfully!', 'info');
      setDeleteId(null);
    }
  };

  const filteredAppointments = appointments.filter(a =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute available times for selected doctor and date
  const selectedDoctor = form.doctor;
  const selectedDate = form.date;
  const availableTimes = selectedDoctor && selectedDate
    ? (doctorSchedules[selectedDoctor]?.[selectedDate] || []).filter(
        time => !appointments.some(
          a => a.doctor === selectedDoctor && a.date === selectedDate && a.time === time
        )
      )
    : [];

  // Enhanced tileClassName for calendar
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const doctor = form.doctor;
      if (doctor && doctorSchedules[doctor]?.[dateStr]) {
        const totalSlots = doctorSchedules[doctor][dateStr].length;
        const bookedSlots = appointments.filter(
          a => a.doctor === doctor && a.date === dateStr
        ).length;
        if (bookedSlots === totalSlots) return 'bg-red-200 text-red-800 font-bold';
        if (bookedSlots > 0) return 'bg-yellow-200 text-yellow-800 font-bold';
        return 'bg-green-200 text-green-800 font-bold';
      }
    }
    return null;
  };

  // When a date is selected, pre-fill the form's date field
  const handleCalendarChange = (value: any) => {
    let date: Date | null = null;
    if (value instanceof Date) {
      date = value;
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      date = value[0];
    }
    setCalendarDate(date);
    if (date) {
      setForm({ ...form, date: date.toISOString().split('T')[0] });
    }
  };

  // Recurrence logic
  const generateRecurringAppointments = (appt: Appointment): Appointment[] => {
    if (!appt.recurrence || appt.recurrence === 'None') return [appt];
    const recurrences = { Daily: 7, Weekly: 4, Monthly: 3 };
    const count = recurrences[appt.recurrence] || 1;
    const result: Appointment[] = [appt];
    let lastDate = new Date(appt.date);
    for (let i = 1; i < count; i++) {
      let nextDate = new Date(lastDate);
      if (appt.recurrence === 'Daily') nextDate.setDate(nextDate.getDate() + 1);
      if (appt.recurrence === 'Weekly') nextDate.setDate(nextDate.getDate() + 7);
      if (appt.recurrence === 'Monthly') nextDate.setMonth(nextDate.getMonth() + 1);
      result.push({ ...appt, id: Date.now() + i, date: nextDate.toISOString().split('T')[0] });
      lastDate = nextDate;
    }
    return result;
  };

  // Add sendReminder logic
  const sendReminder = (id: number) => {
    setReminderLoading(id);
    setTimeout(() => {
      setAppointments(appointments => appointments.map(a => a.id === id ? { ...a, reminderSent: true } : a));
      setReminderLoading(null);
      showToast('Reminder sent!', 'success');
    }, 1000);
  };

  // Add reschedule/cancel logic
  const handleReschedule = (appointment: Appointment, newDate: string, newTime: string, reason: string) => {
    setAppointments(appointments.map(a => a.id === appointment.id ? {
      ...a,
      date: newDate,
      time: newTime,
      rescheduleHistory: [...(a.rescheduleHistory || []), { date: a.date, time: a.time, reason }],
      status: 'Scheduled',
    } : a));
    setShowReschedule(null);
    showToast('Appointment rescheduled!', 'success');
  };
  const handleCancel = (appointment: Appointment, reason: string) => {
    setAppointments(appointments.map(a => a.id === appointment.id ? {
      ...a,
      status: 'Cancelled',
      cancelReason: reason,
    } : a));
    setShowCancel(null);
    showToast('Appointment cancelled!', 'info');
  };

  // Add call status logic
  const startCall = (appointment: Appointment) => {
    setAppointments(appointments.map(a => a.id === appointment.id ? {
      ...a,
      callStatus: 'Ongoing',
      callLog: [...(a.callLog || []), { event: 'join', user: 'You', timestamp: new Date().toISOString() }],
      status: 'In Progress',
    } : a));
    setVideoRoom(`cura-appointment-${appointment.id}`);
  };
  const endCall = (appointment: Appointment) => {
    setAppointments(appointments.map(a => a.id === appointment.id ? {
      ...a,
      callStatus: 'Ended',
      callLog: [...(a.callLog || []), { event: 'end', user: 'You', timestamp: new Date().toISOString() }],
      status: 'Completed',
    } : a));
    setVideoRoom(null);
  };

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
          <span className="inline-block bg-white/60 dark:bg-gray-900/60 rounded-full px-3 py-1 shadow-sm backdrop-blur">📅</span>
          Appointments
        </motion.h1>
        {/* Calendar UI */}
        <div className="mb-10 flex justify-center">
          <Calendar
            onChange={handleCalendarChange}
            value={calendarDate}
            tileClassName={tileClassName}
          />
        </div>
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card mb-10"
        >
          <div className="text-xl font-semibold mb-6 text-primary/90 flex items-center gap-2">
            {editingId !== null ? 'Edit Appointment' : 'Add Appointment'}
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            {/* Doctor */}
            <div className="relative">
              <select
                id="doctor"
                name="doctor"
                value={form.doctor || ''}
                onChange={handleChange}
                required
                className="peer glass-input"
              >
                <option value="" disabled hidden></option>
                {mockDoctors.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <label htmlFor="doctor" className="glass-label">Doctor</label>
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
            {/* Time */}
            <div className="relative">
              <select
                id="time"
                name="time"
                value={form.time || ''}
                onChange={handleChange}
                required
                className="peer glass-input"
                disabled={!selectedDoctor || !selectedDate}
              >
                <option value="" disabled hidden>Select time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <label htmlFor="time" className="glass-label">Time</label>
            </div>
            {/* Recurrence */}
            <div className="relative">
              <select
                id="recurrence"
                name="recurrence"
                value={form.recurrence || 'None'}
                onChange={handleChange}
                className="peer glass-input"
              >
                <option value="None">No Recurrence</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <label htmlFor="recurrence" className="glass-label">Recurrence</label>
            </div>
            {/* Status */}
            <div className="relative">
              <select
                id="status"
                name="status"
                value={form.status || 'Scheduled'}
                onChange={handleChange}
                className="peer glass-input"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="No Show">No Show</option>
              </select>
              <label htmlFor="status" className="glass-label">Status</label>
            </div>
            {/* Time Zone */}
            <div className="relative">
              <input
                id="timeZone"
                name="timeZone"
                type="text"
                value={form.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                onChange={handleChange}
                className="peer glass-input"
                placeholder="Time Zone"
              />
              <label htmlFor="timeZone" className="glass-label">Time Zone</label>
            </div>
            <button type="submit" className="btn-primary shadow-md">
              {editingId !== null ? 'Update' : 'Add'} Appointment
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-xl font-semibold text-primary/90">Appointment List</div>
            <input
              type="text"
              placeholder="Search by patient..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="glass-input w-full md:w-64"
              aria-label="Search appointments by patient"
            />
          </div>
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-primary/80">Patient</th>
                <th className="px-4 py-2 text-primary/80">Doctor</th>
                <th className="px-4 py-2 text-primary/80">Date</th>
                <th className="px-4 py-2 text-primary/80">Time</th>
                <th className="px-4 py-2 text-primary/80">Status</th>
                <th className="px-4 py-2 text-primary/80">Call Status</th>
                <th className="px-4 py-2 text-primary/80">Reminder</th>
                <th className="px-4 py-2 text-primary/80">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, i) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40 transition-colors' : 'transition-colors'}
                >
                  <td className="px-4 py-2 rounded-l-xl font-medium">{appointment.patient}</td>
                  <td className="px-4 py-2">{appointment.doctor}</td>
                  <td className="px-4 py-2">{appointment.date}</td>
                  <td className="px-4 py-2">{appointment.time}</td>
                  <td className="px-4 py-2">{appointment.status}</td>
                  <td className="px-4 py-2">{appointment.callStatus}</td>
                  <td className="px-4 py-2">
                    {appointment.reminderSent ? <span className="badge badge-success">Sent</span> :
                      <button disabled={reminderLoading === appointment.id} onClick={() => sendReminder(appointment.id)} className="btn-table-edit">{reminderLoading === appointment.id ? 'Sending...' : 'Send'}</button>}
                  </td>
                  <td className="px-4 py-2 rounded-r-xl flex gap-2">
                    <button onClick={() => handleEdit(appointment)} className="btn-table-edit">Edit</button>
                    <button onClick={() => handleDelete(appointment.id)} className="btn-table-delete">Delete</button>
                    <button onClick={() => setShowReschedule(appointment)} className="btn-table-edit">Reschedule</button>
                    <button onClick={() => setShowCancel(appointment)} className="btn-table-delete">Cancel</button>
                    <button onClick={() => setShowCallLog(appointment)} className="btn-table-edit">View Call Log</button>
                    <button
                      className="btn-table-video bg-primary text-white px-3 py-1 rounded"
                      onClick={() => startCall(appointment)}
                      disabled={appointment.status === 'Cancelled' || appointment.status === 'Completed'}
                    >
                      Join Video Call
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        {/* Delete Confirmation Dialog */}
        {deleteId !== null && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="glass-card w-80 p-8 animate-fade-in">
              <div className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="inline-block"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                Confirm Delete
              </div>
              <div className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this appointment?</div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
                <button onClick={confirmDelete} className="btn-danger">Delete</button>
              </div>
            </div>
          </div>
        )}
        {/* Video Call Modal */}
        {videoRoom && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 w-full max-w-2xl shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setVideoRoom(null)}
                aria-label="Close video call"
              >
                &times;
              </button>
              <h3 className="text-lg font-bold mb-2">Video Call (Jitsi)</h3>
              <div className="rounded border overflow-hidden" style={{ height: 500 }}>
                <iframe
                  title="Jitsi Video Call"
                  src={`https://meet.jit.si/${encodeURIComponent(videoRoom)}`}
                  allow="camera; microphone; fullscreen; display-capture"
                  style={{ width: '100%', height: '100%', border: 0 }}
                />
              </div>
            </div>
          </div>
        )}
        {/* Reschedule Modal */}
        {showReschedule && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="glass-card w-full max-w-md p-6 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-primary">Reschedule Appointment</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleReschedule(showReschedule, rescheduleFields.newDate, rescheduleFields.newTime, rescheduleFields.reason);
                setRescheduleFields({ newDate: '', newTime: '', reason: '' });
              }} className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <input
                    type="date"
                    name="newDate"
                    value={rescheduleFields.newDate}
                    onChange={e => setRescheduleFields(f => ({ ...f, newDate: e.target.value }))}
                    required
                    className="peer glass-input"
                  />
                  <label htmlFor="newDate" className="glass-label">New Date</label>
                </div>
                <div className="relative">
                  <select
                    id="newTime"
                    name="newTime"
                    value={rescheduleFields.newTime}
                    onChange={e => setRescheduleFields(f => ({ ...f, newTime: e.target.value }))}
                    required
                    className="peer glass-input"
                  >
                    <option value="" disabled hidden>Select time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  <label htmlFor="newTime" className="glass-label">New Time</label>
                </div>
                <div className="relative">
                  <textarea
                    id="reason"
                    name="reason"
                    value={rescheduleFields.reason}
                    onChange={e => setRescheduleFields(f => ({ ...f, reason: e.target.value }))}
                    rows={3}
                    className="peer glass-input"
                    placeholder="Reason for rescheduling"
                  />
                  <label htmlFor="reason" className="glass-label">Reason</label>
                </div>
                <button type="submit" className="btn-primary">Reschedule</button>
                <button type="button" onClick={() => { setShowReschedule(null); setRescheduleFields({ newDate: '', newTime: '', reason: '' }); }} className="btn-secondary">Cancel</button>
              </form>
            </div>
          </div>
        )}
        {/* Cancel Modal */}
        {showCancel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="glass-card w-full max-w-md p-6 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-red-600">Cancel Appointment</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to cancel this appointment?</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCancel(showCancel, cancelReason);
                setCancelReason('');
              }} className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <textarea
                    id="cancelReason"
                    name="cancelReason"
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    rows={3}
                    className="peer glass-input"
                    placeholder="Reason for cancellation"
                  />
                  <label htmlFor="cancelReason" className="glass-label">Reason</label>
                </div>
                <button type="submit" className="btn-danger">Cancel Appointment</button>
                <button type="button" onClick={() => { setShowCancel(null); setCancelReason(''); }} className="btn-secondary">Cancel</button>
              </form>
            </div>
          </div>
        )}
        {/* Call Log Modal */}
        {showCallLog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="glass-card w-full max-w-2xl p-6 animate-fade-in">
              <h3 className="text-xl font-bold mb-4 text-primary">Call Log for {showCallLog.patient}</h3>
              <div className="overflow-y-auto max-h-full" style={{ maxHeight: '70vh' }}>
                <table className="min-w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-primary/80">Event</th>
                      <th className="px-4 py-2 text-primary/80">User</th>
                      <th className="px-4 py-2 text-primary/80">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showCallLog.callLog?.map((log, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800/40' : ''}>
                        <td className="px-4 py-2">{log.event}</td>
                        <td className="px-4 py-2">{log.user}</td>
                        <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowCallLog(null)} className="btn-secondary">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments; 