import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaUserMd, FaHospital, FaFileMedical, FaHeartbeat, FaUserFriends, FaQuoteLeft, FaChevronDown, FaEnvelope, FaUser, FaQuestionCircle, FaCalendarAlt, FaNotesMedical, FaMoneyCheckAlt, FaChartBar, FaBed, FaPills, FaVials, FaUserLock, FaVideo, FaBell, FaShieldAlt, FaNetworkWired, FaProcedures, FaAmbulance, FaTint, FaClipboardList, FaComments, FaQrcode, FaUtensils, FaUserCheck, FaIdBadge, FaFileUpload, FaSignOutAlt, FaRegCalendarCheck, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function FloatingSpheres() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      {/* Three animated spheres in healthcare colors */}
      <mesh position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" /> {/* blue-400 */}
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" /> {/* cyan-400 */}
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#4ade80" /> {/* green-400 */}
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
    </>
  );
}

const features = [
  {
    icon: <FaFileMedical size={36} color="#38bdf8" />,
    title: 'Patient Registration & EMR',
    description: 'Digitally register patients and manage electronic medical records securely and efficiently.'
  },
  {
    icon: <FaCalendarAlt size={36} color="#22d3ee" />,
    title: 'Appointment Scheduling',
    description: 'Streamline appointment booking, reminders, and calendar management for staff and patients.'
  },
  {
    icon: <FaMoneyCheckAlt size={36} color="#4ade80" />,
    title: 'Billing & Insurance',
    description: 'Automate billing, insurance claims, and payment tracking for a seamless financial workflow.'
  },
  {
    icon: <FaChartBar size={36} color="#0ea5e9" />,
    title: 'Analytics & Reporting',
    description: 'Gain actionable insights with real-time analytics and customizable reports.'
  }
];

const moreFeatures = [
  {
    icon: <FaUserMd size={32} color="#0ea5e9" />,
    title: 'Doctor & Staff Management',
    description: 'Manage doctor profiles, specialties, schedules, and staff roles.',
    route: '/doctors'
  },
  {
    icon: <FaBed size={32} color="#38bdf8" />,
    title: 'Inpatient & Bed Management',
    description: 'Track admissions, discharges, bed availability, and ward assignments.',
    route: '/inpatient'
  },
  {
    icon: <FaPills size={32} color="#4ade80" />,
    title: 'Pharmacy Management',
    description: 'Manage medicine inventory, prescriptions, and pharmacy billing.',
    route: '/pharmacy'
  },
  {
    icon: <FaVials size={32} color="#22d3ee" />,
    title: 'Lab & Diagnostics',
    description: 'Order tests, track results, and integrate with lab equipment.',
    route: '/lab'
  },
  {
    icon: <FaUserLock size={32} color="#0ea5e9" />,
    title: 'Patient Portal',
    description: 'Secure login for patients to view records, appointments, and bills.',
    route: '/portal'
  },
  {
    icon: <FaVideo size={32} color="#38bdf8" />,
    title: 'Telemedicine',
    description: 'Video consultations, online prescriptions, and remote patient monitoring.',
    route: '/telemedicine'
  },
  {
    icon: <FaNetworkWired size={32} color="#4ade80" />,
    title: 'Inventory & Asset Management',
    description: 'Track medical equipment, supplies, and maintenance schedules.',
    route: '/inventory'
  },
  {
    icon: <FaBell size={32} color="#22d3ee" />,
    title: 'Notifications & Alerts',
    description: 'Automated SMS/email reminders for appointments, medication, and follow-ups.',
    route: '/notifications'
  },
  {
    icon: <FaShieldAlt size={32} color="#0ea5e9" />,
    title: 'Insurance & Claims',
    description: 'Manage insurance policies, claims processing, and approvals.',
    route: '/insurance'
  },
  {
    icon: <FaHospital size={32} color="#38bdf8" />,
    title: 'Multi-location/Branch Support',
    description: 'Manage multiple hospitals/clinics from a single dashboard.',
    route: '/branches'
  },
  // Additional features
  {
    icon: <FaProcedures size={32} color="#0ea5e9" />,
    title: 'Outpatient Management',
    description: 'Efficiently manage outpatient visits, records, and follow-ups.',
    route: '/outpatient'
  },
  {
    icon: <FaNotesMedical size={32} color="#38bdf8" />,
    title: 'Surgery Scheduling',
    description: 'Schedule and track surgeries and operation theater usage.',
    route: '/surgery'
  },
  {
    icon: <FaAmbulance size={32} color="#4ade80" />,
    title: 'Ambulance Management',
    description: 'Dispatch and track ambulances for emergency and patient transport.',
    route: '/ambulance'
  },
  {
    icon: <FaTint size={32} color="#22d3ee" />,
    title: 'Blood Bank Management',
    description: 'Manage blood inventory, donors, and transfusion records.',
    route: '/bloodbank'
  },
  {
    icon: <FaComments size={32} color="#0ea5e9" />,
    title: 'Patient Feedback & Surveys',
    description: 'Collect and analyze patient feedback for continuous improvement.',
    route: '/feedback'
  },
];

const moreHospitalFeatures = [
  {
    icon: <FaQrcode size={32} color="#0ea5e9" />,
    title: 'Patient Queue Management',
    description: 'Real-time queue tracking for OPD and labs.',
    route: '/queue',
  },
  {
    icon: <FaProcedures size={32} color="#38bdf8" />,
    title: 'Operation Theater Management',
    description: 'Scheduling, sterilization, and usage logs.',
    route: '/operation-theater',
  },
  {
    icon: <FaUtensils size={32} color="#4ade80" />,
    title: 'Dietary & Nutrition Services',
    description: 'Meal planning and dietary tracking for inpatients.',
    route: '/dietary',
  },
  {
    icon: <FaUserCheck size={32} color="#22d3ee" />,
    title: 'Staff Attendance & Payroll',
    description: 'Biometric attendance, shift management, and payroll.',
    route: '/attendance',
  },
  {
    icon: <FaIdBadge size={32} color="#0ea5e9" />,
    title: 'Visitor Management',
    description: 'Visitor registration, badges, and access control.',
    route: '/visitors',
  },
  {
    icon: <FaFileUpload size={32} color="#38bdf8" />,
    title: 'Document Management',
    description: 'Upload, scan, and organize patient and hospital documents.',
    route: '/documents',
  },
  {
    icon: <FaAmbulance size={32} color="#4ade80" />,
    title: 'Ambulance Tracking',
    description: 'Live GPS tracking and dispatch.',
    route: '/ambulance-tracking',
  },
  {
    icon: <FaSignOutAlt size={32} color="#22d3ee" />,
    title: 'Patient Discharge & Follow-up',
    description: 'Discharge summaries, follow-up reminders.',
    route: '/discharge',
  },
];

const testimonials = [
  {
    name: 'Dr. Suresh Nair',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote: 'Cura Aid has made our hospital operations paperless and efficient. Patient care has never been better.'
  },
  {
    name: 'Dr. Meera Joshi',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    quote: 'The appointment and billing modules are intuitive and save our staff hours every week.'
  },
  {
    name: 'Anil Kumar, Admin',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    quote: 'We love the analytics dashboard. It helps us make data-driven decisions for our clinic.'
  }
];

const faqs = [
  {
    question: 'Is Cura Aid compliant with healthcare regulations?',
    answer: 'Yes, Cura Aid is designed to comply with HIPAA and other healthcare data privacy standards.'
  },
  {
    question: 'Can I migrate existing patient records to Cura Aid?',
    answer: 'Absolutely. Our onboarding team will help you import your existing data securely and seamlessly.'
  },
  {
    question: 'Does Cura Aid support multi-specialty hospitals?',
    answer: 'Yes, you can manage multiple departments, specialties, and practitioners from a single dashboard.'
  },
  {
    question: 'How do I get support or training?',
    answer: 'We offer 24/7 support and comprehensive training resources for all staff members.'
  }
];

const glassStyle = {
  background: 'rgba(255,255,255,0.25)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '2rem',
  border: '1.5px solid rgba(255,255,255,0.25)',
};

const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'; // Use the same or similar hospital image

const AnimatedLanding: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Add dark mode toggle state (optional, for demonstration)
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((d) => !d);

  const handleFaqClick = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ name: '', email: '', message: '' });
  };

  // Scroll to features section
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: darkMode ? '#0f172a' : '#f8fafc', transition: 'background 0.3s' }}>
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 100,
          background: darkMode ? '#bae6fd' : '#0f172a',
          color: darkMode ? '#0f172a' : '#bae6fd',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(15,23,42,0.13)',
          cursor: 'pointer',
          transition: 'background 0.3s, color 0.3s',
        }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
      </button>
      {/* Hero Section - Full width background image with overlay */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `url(${HERO_IMAGE_URL}) center/cover no-repeat` }}>
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.72)', zIndex: 1 }} />
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '4rem 1rem' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ color: '#bae6fd', fontWeight: 700, letterSpacing: '2px', fontSize: '1.1rem', marginBottom: 12 }}>CURA AID</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1.2rem', lineHeight: 1.15, textShadow: '0 2px 16px #0006' }}>
              Modern Hospital Management<br />for Better Patient Care
            </h1>
            <p style={{ color: '#e0e7ef', fontSize: '1.18rem', marginBottom: '2.2rem', fontWeight: 500, textShadow: '0 2px 16px #0004' }}>
              Manage patients, doctors, appointments, billing, and medical records<br />—all in one secure, easy-to-use platform.
            </p>
            <motion.a
              href="#features"
              onClick={scrollToFeatures}
              whileHover={{ scale: 1.06 }}
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: '#fff',
                color: '#0f172a',
                borderRadius: '0.7rem',
                fontWeight: 700,
                fontSize: '1.15rem',
                boxShadow: '0 4px 24px rgba(15,23,42,0.13)',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
            >
              Explore Features
            </motion.a>
          </motion.div>
        </div>
      </section>
      {/* Wavy divider */}
      <svg viewBox="0 0 1440 80" style={{ display: 'block', width: '100%', height: 60, marginTop: -2 }}><path fill={darkMode ? '#0f172a' : '#f8fafc'} d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,16C960,11,1056,21,1152,32C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"></path></svg>
      {/* Features Section */}
      <motion.div
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } }
        }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto 3.5rem auto',
        }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.7 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, type: 'spring', bounce: 0.45 } }
            }}
            style={{
              ...glassStyle,
              background: 'rgba(255,255,255,0.92)',
              padding: '2.2rem 2rem 2rem 2rem',
              minWidth: 260,
              maxWidth: 340,
              flex: '1 1 260px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '1rem',
              transition: 'box-shadow 0.2s, transform 0.2s',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(56,189,248,0.18)' }}
            onClick={() => navigate(feature.route || '/')}
          >
            <motion.div whileHover={{ y: -8, scale: 1.18 }} transition={{ type: 'spring', stiffness: 300 }} style={{ marginBottom: '1.2rem' }}>{feature.icon}</motion.div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.7rem' }}>{feature.title}</h3>
            <p style={{ fontSize: '1.05rem', color: '#0e7490', fontWeight: 500 }}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
      {/* More Features Section */}
      <motion.section
        id="solutions"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          ...glassStyle,
          background: 'rgba(255,255,255,0.98)',
          padding: '3rem 2rem',
          maxWidth: 1200,
          margin: '0 auto 3.5rem auto',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1', marginBottom: '2.2rem', textAlign: 'center' }}>Comprehensive Hospital Solutions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {moreFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 + idx * 0.07, type: 'spring', bounce: 0.45 }}
              style={{
                ...glassStyle,
                background: 'rgba(255,255,255,0.97)',
                padding: '2rem 1.5rem 1.5rem 1.5rem',
                minWidth: 220,
                maxWidth: 300,
                flex: '1 1 220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '1rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(56,189,248,0.18)' }}
              onClick={() => navigate(feature.route || '/')}
            >
              <motion.div whileHover={{ y: -8, scale: 1.18 }} transition={{ type: 'spring', stiffness: 300 }} style={{ marginBottom: '1.1rem' }}>{feature.icon}</motion.div>
              <h3 style={{ fontSize: '1.13rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.6rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.98rem', color: '#0e7490', fontWeight: 500 }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          ...glassStyle,
          background: 'rgba(255,255,255,0.97)',
          padding: '3rem 2rem',
          maxWidth: 900,
          margin: '0 auto 3.5rem auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: '0 0 120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaHospital size={80} color="#38bdf8" style={{ background: '#e0f2fe', borderRadius: '50%', padding: 18 }} />
        </div>
        <div style={{ flex: '1 1 300px', minWidth: 220 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1', marginBottom: '1rem' }}>About Cura Aid</h2>
          <p style={{ fontSize: '1.15rem', color: '#0e7490', fontWeight: 500, lineHeight: 1.6 }}>
            Cura Aid is dedicated to transforming hospital and clinic management. We empower healthcare providers to deliver better patient care, reduce paperwork, and make data-driven decisions—all on a secure, cloud-based platform.
          </p>
        </div>
      </motion.section>
      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          ...glassStyle,
          background: 'rgba(255,255,255,0.99)',
          padding: '3rem 2rem',
          maxWidth: 900,
          margin: '0 auto 3.5rem auto',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1', marginBottom: '2.2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', maxWidth: 700, margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <motion.div
              key={faq.question}
              initial={false}
              animate={{ boxShadow: openFaq === idx ? '0 8px 32px rgba(56,189,248,0.13)' : '0 2px 8px rgba(56,189,248,0.07)' }}
              style={{
                ...glassStyle,
                background: openFaq === idx ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.92)',
                borderRadius: '1.2rem',
                padding: '1.2rem 1.5rem',
                cursor: 'pointer',
                border: openFaq === idx ? '2px solid #38bdf8' : '1.5px solid rgba(56,189,248,0.13)',
                transition: 'background 0.2s, border 0.2s',
                position: 'relative',
              }}
              onClick={() => handleFaqClick(idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FaQuestionCircle color="#38bdf8" size={22} />
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0369a1' }}>{faq.question}</span>
                </div>
                <motion.span
                  animate={{ rotate: openFaq === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown color="#22d3ee" size={20} />
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ color: '#0e7490', fontWeight: 500, fontSize: '1.05rem', marginTop: 16, paddingLeft: 32 }}>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          ...glassStyle,
          background: 'rgba(255,255,255,0.99)',
          padding: '3rem 2rem',
          maxWidth: 1100,
          margin: '0 auto 3.5rem auto',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1', marginBottom: '2.2rem', textAlign: 'center' }}>What Our Users Say</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 + idx * 0.2, type: 'spring', bounce: 0.35 }}
              style={{
                ...glassStyle,
                background: 'rgba(255,255,255,1)',
                padding: '2rem 1.5rem 1.5rem 1.5rem',
                minWidth: 260,
                maxWidth: 340,
                flex: '1 1 260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '1rem',
                position: 'relative',
              }}
            >
              <FaQuoteLeft size={24} color="#22d3ee" style={{ position: 'absolute', top: 18, left: 18, opacity: 0.15 }} />
              <img src={t.avatar} alt={t.name} style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 16, objectFit: 'cover', border: '3px solid #38bdf822' }} />
              <p style={{ fontSize: '1.08rem', color: '#0e7490', fontWeight: 500, marginBottom: 16, fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ fontWeight: 700, color: '#22d3ee', fontSize: '1.1rem' }}>{t.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Contact Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          ...glassStyle,
          background: 'rgba(255,255,255,1)',
          padding: '3rem 2rem',
          maxWidth: 600,
          margin: '0 auto 3.5rem auto',
          boxShadow: '0 8px 32px 0 rgba(56,189,248,0.13)',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1', marginBottom: '2.2rem', textAlign: 'center' }}>Contact Us</h2>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem', width: '100%' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 120, position: 'relative' }}>
              <FaUser size={18} color="#38bdf8" style={{ position: 'absolute', top: 14, left: 14, opacity: 0.7 }} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem 0.9rem 2.5rem',
                  borderRadius: '1rem',
                  border: '1.5px solid #38bdf833',
                  fontSize: '1.08rem',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.85)',
                  color: '#0369a1',
                  fontWeight: 500,
                  transition: 'border 0.2s',
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 120, position: 'relative' }}>
              <FaEnvelope size={18} color="#38bdf8" style={{ position: 'absolute', top: 14, left: 14, opacity: 0.7 }} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleFormChange}
                required
                style={{
                  width: '100%',
                  padding: '0.9rem 1rem 0.9rem 2.5rem',
                  borderRadius: '1rem',
                  border: '1.5px solid #38bdf833',
                  fontSize: '1.08rem',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.85)',
                  color: '#0369a1',
                  fontWeight: 500,
                  transition: 'border 0.2s',
                }}
              />
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleFormChange}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 1rem',
                borderRadius: '1rem',
                border: '1.5px solid #38bdf833',
                fontSize: '1.08rem',
                outline: 'none',
                background: 'rgba(255,255,255,0.85)',
                color: '#0369a1',
                fontWeight: 500,
                transition: 'border 0.2s',
                resize: 'vertical',
              }}
            />
          </div>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '1rem 2.5rem',
              background: 'linear-gradient(90deg, #38bdf8 0%, #4ade80 100%)',
              color: '#0369a1',
              borderRadius: '2rem',
              fontWeight: 700,
              fontSize: '1.15rem',
              boxShadow: '0 4px 24px rgba(56,189,248,0.13)',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              border: '2px solid #fff3',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(56,189,248,0.18)' }}
            disabled={submitted}
          >
            {submitted ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </form>
      </motion.section>
      {/* More Hospital Features Section */}
      <motion.section
        id="more-features"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        style={{
          background: darkMode ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)',
          borderRadius: '2rem',
          boxShadow: '0 8px 32px 0 rgba(56,189,248,0.13)',
          padding: '3rem 2rem',
          maxWidth: 1200,
          margin: '0 auto 3.5rem auto',
          marginTop: '-2.5rem',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: darkMode ? '#67e8f9' : '#0369a1', marginBottom: '2.2rem', textAlign: 'center' }}>More Hospital Features</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {moreHospitalFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 + idx * 0.07, type: 'spring', bounce: 0.45 }}
              style={{
                background: darkMode ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.97)',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 32px rgba(56,189,248,0.13)',
                padding: '2rem 1.5rem 1.5rem 1.5rem',
                minWidth: 220,
                maxWidth: 300,
                flex: '1 1 220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '1rem',
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(56,189,248,0.18)' }}
              onClick={() => navigate(feature.route || '/')}
            >
              <motion.div whileHover={{ y: -8, scale: 1.18 }} transition={{ type: 'spring', stiffness: 300 }} style={{ marginBottom: '1.1rem' }}>{feature.icon}</motion.div>
              <h3 style={{ fontSize: '1.13rem', fontWeight: 700, color: darkMode ? '#67e8f9' : '#0369a1', marginBottom: '0.6rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.98rem', color: darkMode ? '#bae6fd' : '#0e7490', fontWeight: 500 }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/appointments')}
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 100,
          background: 'linear-gradient(90deg, #38bdf8 0%, #4ade80 100%)',
          color: '#0f172a',
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(56,189,248,0.18)',
          fontWeight: 700,
          fontSize: '1.5rem',
          cursor: 'pointer',
          transition: 'background 0.3s, color 0.3s',
        }}
        aria-label="Book Appointment"
      >
        <FaRegCalendarCheck size={28} />
      </button>
    </div>
  );
};

export default AnimatedLanding; 