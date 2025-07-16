import React from 'react';
import HospitalPageLayout from '../components/ui/HospitalPageLayout';

const Notifications: React.FC = () => (
  <HospitalPageLayout
    title="Notifications & Alerts"
    subtitle="Automated SMS/email reminders for appointments, medication, and follow-ups."
  >
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: '#0e7490', fontSize: '1.15rem', marginTop: '1rem' }}>
        Automated SMS/email reminders for appointments, medication, and follow-ups here.
      </p>
    </div>
  </HospitalPageLayout>
);
export default Notifications;