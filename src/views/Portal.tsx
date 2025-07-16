import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Portal: React.FC = () => (
  <HospitalPageLayout
    title="Patient Portal"
    subtitle="Secure login for patients to view records, appointments, and bills."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Secure login for patients to view records, appointments, and bills here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Portal; 