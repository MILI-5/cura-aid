import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Telemedicine: React.FC = () => (
  <HospitalPageLayout
    title="Telemedicine"
    subtitle="Video consultations, online prescriptions, and remote patient monitoring."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Video consultations, online prescriptions, and remote patient monitoring here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Telemedicine; 