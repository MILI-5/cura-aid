import React from 'react';
import { useClinicStore } from '../../store/clinicStore';

const ClinicSelector: React.FC<{ userClinicIds?: string[] }> = ({ userClinicIds }) => {
  const { clinics, currentClinic, setClinic } = useClinicStore();
  const availableClinics = userClinicIds
    ? clinics.filter(c => userClinicIds.includes(c.id))
    : clinics;
  if (availableClinics.length < 2) return null;
  return (
    <div className="flex items-center gap-2">
      <img src={currentClinic.logo} alt={currentClinic.name} className="h-8 w-8 rounded-full" />
      <select
        value={currentClinic.id}
        onChange={e => setClinic(e.target.value)}
        className="glass-input"
        aria-label="Select clinic"
      >
        {availableClinics.map(clinic => (
          <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ClinicSelector; 