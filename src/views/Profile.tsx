import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import jsPDF from 'jspdf';
import { motion } from "framer-motion";
import ProfileMascot from "@/components/ui/Mascots/ProfileMascot";

// Types
interface InsuranceInfo {
  provider: string;
  policy: string;
  validTill: string;
}
interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}
interface PhysicianInfo {
  name: string;
  contact: string;
}
interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}
interface DocumentItem {
  name: string;
  url: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  avatar: string;
  avatarFile: File | null;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  language: string;
  insurance: InsuranceInfo;
  emergency: EmergencyContact;
  physician: PhysicianInfo;
  lifestyle: string[];
  vaccines: string[];
  familyHistory: string;
}

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const languageOptions = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Chinese'];
const vaccineList = ['COVID-19', 'Influenza', 'Hepatitis B', 'Tetanus', 'MMR'];
const lifestyleOptions = ['Smoking', 'Alcohol', 'Regular Exercise'];

const initialUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 555-123-4567',
  address: '123 Main St, Springfield',
  dob: '1990-01-01',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe',
  avatarFile: null,
  gender: 'Male',
  bloodGroup: 'O+',
  height: '180',
  weight: '75',
  language: 'English',
  insurance: { provider: 'HealthCare Inc.', policy: 'HC123456', validTill: '2025-12-31' },
  emergency: { name: 'Jane Doe', relationship: 'Spouse', phone: '+1 555-987-6543' },
  physician: { name: 'Dr. Smith', contact: '+1 555-222-3333' },
  lifestyle: [],
  vaccines: [],
  familyHistory: '',
};
const initialAllergies: string[] = ['Penicillin', 'Peanuts'];
const initialMedications: Medication[] = [
  { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily' },
];
const chronicConditionsList = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Heart Disease',
  'Thyroid Disorder',
];

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>({ ...initialUser });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [medicalHistory, setMedicalHistory] = useState('');
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [allergies, setAllergies] = useState<string[]>(initialAllergies);
  const [allergyInput, setAllergyInput] = useState('');
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [medForm, setMedForm] = useState<Medication>({ name: '', dosage: '', frequency: '' });
  const [editingMedIndex, setEditingMedIndex] = useState<number | null>(null);
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [profileProgress, setProfileProgress] = useState(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let filled = 0;
    const total = 15;
    if (user.name) filled++;
    if (user.email) filled++;
    if (user.phone) filled++;
    if (user.address) filled++;
    if (user.dob) filled++;
    if (user.gender) filled++;
    if (user.bloodGroup) filled++;
    if (user.height) filled++;
    if (user.weight) filled++;
    if (user.language) filled++;
    if (user.insurance.provider && user.insurance.policy) filled++;
    if (user.emergency.name && user.emergency.phone) filled++;
    if (user.physician.name) filled++;
    if (allergies.length) filled++;
    if (medications.length) filled++;
    setProfileProgress(Math.round((filled / total) * 100));
  }, [user, allergies, medications]);

  // Handlers
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleInsuranceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, insurance: { ...prev.insurance, [e.target.name.replace('insurance', '').toLowerCase()]: e.target.value } }));
  };
  const handleEmergencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, emergency: { ...prev.emergency, [e.target.name.replace('emergency', '').toLowerCase()]: e.target.value } }));
  };
  const handlePhysicianChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, physician: { ...prev.physician, [e.target.name.replace('physician', '').toLowerCase()]: e.target.value } }));
  };
  const handleLifestyleChange = (opt: string) => {
    setForm(prev => ({ ...prev, lifestyle: prev.lifestyle.includes(opt) ? prev.lifestyle.filter(l => l !== opt) : [...prev.lifestyle, opt] }));
  };
  const handleVaccineChange = (v: string) => {
    setForm(prev => ({ ...prev, vaccines: prev.vaccines.includes(v) ? prev.vaccines.filter(x => x !== v) : [...prev.vaccines, v] }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setForm(prev => ({ ...prev, avatarFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMedicalHistoryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMedicalHistory(e.target.value);
  };

  const handleAddAllergy = (e: FormEvent) => {
    e.preventDefault();
    if (allergyInput && !allergies.includes(allergyInput)) {
      setAllergies([...allergies, allergyInput]);
      setAllergyInput('');
    }
  };
  const handleRemoveAllergy = (a: string) => setAllergies(allergies.filter(x => x !== a));

  const handleMedFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMedForm({ ...medForm, [e.target.name.replace('med', '').toLowerCase()]: e.target.value });
  };
  const handleAddMedication = (e: FormEvent) => {
    e.preventDefault();
    if (medForm.name && medForm.dosage && medForm.frequency) {
      if (editingMedIndex !== null) {
        const meds = [...medications];
        meds[editingMedIndex] = { ...medForm };
        setMedications(meds);
        setEditingMedIndex(null);
      } else {
        setMedications([...medications, { ...medForm }]);
      }
      setMedForm({ name: '', dosage: '', frequency: '' });
    }
  };
  const handleEditMedication = (idx: number) => {
    setMedForm(medications[idx]);
    setEditingMedIndex(idx);
  };
  const handleRemoveMedication = (idx: number) => {
    setMedications(medications.filter((_, i) => i !== idx));
    setEditingMedIndex(null);
    setMedForm({ name: '', dosage: '', frequency: '' });
  };

  const handleChronicConditionChange = (cond: string) => {
    setChronicConditions(prev =>
      prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
    );
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Patient Profile: ${user.name}`, 10, 10);
    doc.text(`Email: ${user.email}`, 10, 20);
    doc.text(`Phone: ${user.phone}`, 10, 30);
    doc.text(`Address: ${user.address}`, 10, 40);
    doc.text(`DOB: ${user.dob}`, 10, 50);
    doc.text('Allergies: ' + allergies.join(', '), 10, 60);
    doc.text('Medications:', 10, 70);
    medications.forEach((m, i) => {
      doc.text(`- ${m.name} (${m.dosage}, ${m.frequency})`, 12, 80 + i * 10);
    });
    doc.text('Chronic Conditions: ' + chronicConditions.join(', '), 10, 90 + medications.length * 10);
    doc.text('Medical History:', 10, 100 + medications.length * 10);
    doc.text(medicalHistory, 12, 110 + medications.length * 10);
    doc.save('patient-profile.pdf');
  };

  const handleShare = () => {
    setShareStatus('Profile shared with your doctor! (Mock action)');
    setTimeout(() => setShareStatus(null), 3000);
  };

  const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocs: DocumentItem[] = [];
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        newDocs.push({ name: file.name, url });
      });
      setDocuments(prev => [...prev, ...newDocs]);
    }
  };
  const handleDeleteDocument = (idx: number) => {
    setDocuments(docs => docs.filter((_, i) => i !== idx));
    setToast({ type: 'success', message: 'Document deleted.' });
    setTimeout(() => setToast(null), 2000);
  };

  const handleCancel = () => {
    setForm({ ...user });
    setAvatarPreview(user.avatar);
    setEditing(false);
  };

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
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center mt-8 relative z-10"
      >
        <ProfileMascot size={140} title="Your secure profile" />
      </motion.div>
      <div className="relative z-10">
        {/* Toasts */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg font-semibold ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{toast.message}</div>
        )}
        {/* Profile Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-primary font-bold">Profile Completion</span>
            <span className="text-primary font-bold">{profileProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-primary rounded-full" style={{ width: `${profileProgress}%` }} />
          </div>
        </div>
        {/* Sectioned Layout: Personal Info */}
        <div className="bg-accent/10 dark:bg-gray-800 rounded-xl p-4 mb-6 shadow">
          <h2 className="text-xl font-bold text-primary mb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your phone"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={form.address}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={form.dob}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
              <select
                name="gender"
                id="gender"
                value={form.gender}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select gender</option>
                {genderOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                id="bloodGroup"
                value={form.bloodGroup}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select blood group</option>
                {bloodGroups.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                id="height"
                value={form.height}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={form.weight}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Language</label>
              <select
                name="language"
                id="language"
                value={form.language}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select language</option>
                {languageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Emergency Contact, Insurance, Physician */}
        <div className="bg-accent/10 dark:bg-gray-800 rounded-xl p-4 mb-6 shadow">
          <h2 className="text-xl font-bold text-primary mb-2">Emergency & Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="emergencyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyName"
                id="emergencyName"
                value={form.emergency.name}
                onChange={handleEmergencyChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter emergency contact name"
              />
            </div>
            <div>
              <label htmlFor="emergencyRelationship" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Relationship</label>
              <input
                type="text"
                name="emergencyRelationship"
                id="emergencyRelationship"
                value={form.emergency.relationship}
                onChange={handleEmergencyChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., Spouse, Parent, Friend"
              />
            </div>
            <div>
              <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Emergency Phone</label>
              <input
                type="tel"
                name="emergencyPhone"
                id="emergencyPhone"
                value={form.emergency.phone}
                onChange={handleEmergencyChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter emergency contact phone"
              />
            </div>
            <div>
              <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Insurance Provider</label>
              <input
                type="text"
                name="insuranceProvider"
                id="insuranceProvider"
                value={form.insurance.provider}
                onChange={handleInsuranceChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter insurance provider"
              />
            </div>
            <div>
              <label htmlFor="insurancePolicy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Insurance Policy</label>
              <input
                type="text"
                name="insurancePolicy"
                id="insurancePolicy"
                value={form.insurance.policy}
                onChange={handleInsuranceChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter insurance policy number"
              />
            </div>
            <div>
              <label htmlFor="insuranceValidTill" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valid Till</label>
              <input
                type="date"
                name="insuranceValidTill"
                id="insuranceValidTill"
                value={form.insurance.validTill}
                onChange={handleInsuranceChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="physicianName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Physician Name</label>
              <input
                type="text"
                name="physicianName"
                id="physicianName"
                value={form.physician.name}
                onChange={handlePhysicianChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter physician name"
              />
            </div>
            <div>
              <label htmlFor="physicianContact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact</label>
              <input
                type="tel"
                name="physicianContact"
                id="physicianContact"
                value={form.physician.contact}
                onChange={handlePhysicianChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter physician contact"
              />
            </div>
          </div>
        </div>
        {/* Medical History, Allergies, Medications, Chronic Conditions, Vaccines, Lifestyle, Family History */}
        <div className="bg-accent/10 dark:bg-gray-800 rounded-xl p-4 mb-6 shadow">
          <h2 className="text-xl font-bold text-primary mb-2">Medical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medical History</label>
              <textarea
                name="medicalHistory"
                id="medicalHistory"
                value={medicalHistory}
                onChange={handleMedicalHistoryChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Describe your medical history..."
              />
            </div>
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Allergies</label>
              <form onSubmit={handleAddAllergy} className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="allergyInput"
                  id="allergyInput"
                  value={allergyInput}
                  onChange={e => setAllergyInput(e.target.value)}
                  placeholder="Add allergy"
                  className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button type="submit" className="bg-primary text-white px-3 py-2 rounded-md">Add</button>
              </form>
              <div className="flex flex-wrap gap-2 mb-4">
                {allergies.map(a => (
                  <span key={a} className="bg-accent/20 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                    {a}
                    <button type="button" onClick={() => handleRemoveAllergy(a)} className="ml-1 text-red-500 text-xs">&times;</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="medications" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medications</label>
              <form onSubmit={handleAddMedication} className="flex flex-col md:flex-row gap-2 mb-2">
                <input
                  type="text"
                  name="medName"
                  id="medName"
                  value={medForm.name}
                  onChange={handleMedFormChange}
                  placeholder="Medication name"
                  className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="text"
                  name="medDosage"
                  id="medDosage"
                  value={medForm.dosage}
                  onChange={handleMedFormChange}
                  placeholder="Dosage"
                  className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="text"
                  name="medFrequency"
                  id="medFrequency"
                  value={medForm.frequency}
                  onChange={handleMedFormChange}
                  placeholder="Frequency"
                  className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button type="submit" className="bg-primary text-white px-3 py-2 rounded-md">{editingMedIndex !== null ? 'Update' : 'Add'}</button>
              </form>
              <ul className="mb-4">
                {medications.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-2 mb-1">
                    <span className="flex-1">{m.name} ({m.dosage}, {m.frequency})</span>
                    <button onClick={() => handleEditMedication(idx)} className="text-blue-600 underline text-xs">Edit</button>
                    <button onClick={() => handleRemoveMedication(idx)} className="text-red-500 text-xs">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label htmlFor="chronicConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chronic Conditions</label>
              <div className="flex flex-wrap gap-3 mb-4">
                {chronicConditionsList.map(cond => (
                  <label key={cond} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={chronicConditions.includes(cond)}
                      onChange={() => handleChronicConditionChange(cond)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{cond}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="vaccines" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vaccination Status</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {vaccineList.map(v => (
                  <label key={v} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.vaccines.includes(v)}
                      onChange={() => handleVaccineChange(v)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{v}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lifestyle</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {lifestyleOptions.map(opt => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.lifestyle.includes(opt)}
                      onChange={() => handleLifestyleChange(opt)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Family Medical History</label>
              <textarea
                name="familyHistory"
                id="familyHistory"
                value={form.familyHistory}
                onChange={e => setForm({ ...form, familyHistory: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Describe family medical history..."
              />
            </div>
          </div>
        </div>
        {/* Documents Section with thumbnails and delete */}
        <div className="bg-accent/10 dark:bg-gray-800 rounded-xl p-4 mb-6 shadow">
          <h2 className="text-xl font-bold text-primary mb-2">Medical Documents</h2>
          <input
            type="file"
            accept=".pdf,image/*"
            multiple
            onChange={handleDocumentUpload}
            className="mb-4"
          />
          {documents.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Uploaded Documents:</h4>
              <ul className="list-disc pl-5">
                {documents.map((doc, idx) => (
                  <li key={idx} className="mb-1 flex items-center justify-between">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                      {doc.name}
                    </a>
                    <button onClick={() => handleDeleteDocument(idx)} className="text-red-500 text-xs ml-2">
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Download/Share Buttons */}
        <div className="flex gap-4 mt-6 mb-2">
          <button onClick={handleDownloadPDF} className="bg-primary text-white px-4 py-2 rounded font-bold">Download as PDF</button>
          <button onClick={handleShare} className="bg-accent text-primary px-4 py-2 rounded font-bold border border-primary">Share with Doctor</button>
        </div>
        {shareStatus && <div className="text-green-600 font-semibold mt-2">{shareStatus}</div>}
      </div>
    </div>
  );
};

export default Profile; 