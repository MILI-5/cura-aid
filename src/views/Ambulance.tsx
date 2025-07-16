import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Ambulance: React.FC = () => (
  <HospitalPageLayout
    title="Ambulance Management"
    subtitle="Dispatch and track ambulances for emergency and patient transport."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Dispatch and track ambulances for emergency and patient transport here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Ambulance; 