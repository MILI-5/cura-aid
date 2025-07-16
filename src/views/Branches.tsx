import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Branches: React.FC = () => (
  <HospitalPageLayout
    title="Multi-location/Branch Support"
    subtitle="Manage multiple hospitals/clinics from a single dashboard."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Manage multiple hospitals/clinics from a single dashboard here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Branches; 