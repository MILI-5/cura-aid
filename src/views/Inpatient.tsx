import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Inpatient: React.FC = () => (
  <HospitalPageLayout
    title="Inpatient & Bed Management"
    subtitle="Track admissions, discharges, bed availability, and ward assignments."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Track admissions, discharges, bed availability, and ward assignments here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Inpatient; 