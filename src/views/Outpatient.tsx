import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Outpatient: React.FC = () => (
  <HospitalPageLayout
    title="Outpatient Management"
    subtitle="Efficiently manage outpatient visits, records, and follow-ups."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Efficiently manage outpatient visits, records, and follow-ups here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Outpatient; 