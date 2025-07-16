import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Insurance: React.FC = () => (
  <HospitalPageLayout
    title="Insurance & Claims"
    subtitle="Manage insurance policies, claims processing, and approvals."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Manage insurance policies, claims processing, and approvals here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Insurance; 