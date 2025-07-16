import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Feedback: React.FC = () => (
  <HospitalPageLayout
    title="Patient Feedback & Surveys"
    subtitle="Collect and analyze patient feedback for continuous improvement."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Collect and analyze patient feedback for continuous improvement here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Feedback; 