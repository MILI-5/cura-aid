import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Surgery: React.FC = () => (
  <HospitalPageLayout
    title="Surgery Scheduling"
    subtitle="Schedule and track surgeries and operation theater usage."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Schedule and track surgeries and operation theater usage here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Surgery; 