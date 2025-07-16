import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Inventory: React.FC = () => (
  <HospitalPageLayout
    title="Inventory & Asset Management"
    subtitle="Track medical equipment, supplies, and maintenance schedules."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Track medical equipment, supplies, and maintenance schedules here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Inventory; 