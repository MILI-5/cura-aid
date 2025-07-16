import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Bloodbank: React.FC = () => (
  <HospitalPageLayout
    title="Blood Bank Management"
    subtitle="Manage blood inventory, donors, and transfusion records."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Manage blood inventory, donors, and transfusion records here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Bloodbank; 