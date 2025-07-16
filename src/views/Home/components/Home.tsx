// views/Home/components/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/shared/Footer';
import { motion } from 'framer-motion';
import GenerativeChat from '../../chat-bot/GenerativeChat';
import StartYourJourney from './StartYourJourney';
import Treatment from '../../chat-bot/components/ChatBox/components/Treatment';
import UploadMedicalReports from '@/components/shared/UploadMedicalReports';
import { GlassCard } from '@/components/ui/Card';
import { FaUserMd, FaHospital, FaHeartbeat, FaCalendarCheck, FaPills, FaVials, FaUserInjured, FaFileMedical, FaAmbulance, FaSyringe, FaLightbulb } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

const testimonials = [
  {
    name: 'Dr. Priya Sharma',
    quote: 'CuraAid has streamlined our patient management and appointment scheduling. Our staff and patients love the efficiency!',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Chief Medical Officer, City Hospital',
  },
  {
    name: 'Nurse Teddy Yuhui',
    quote: 'The medical records and billing modules save us hours every week. Highly recommended for any hospital!',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Head Nurse, Sunrise Clinic',
  },
  {
    name: 'Admin Theodore Lewitz',
    quote: 'Analytics and reporting help us make better decisions. CuraAid is a must-have for modern healthcare.',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    role: 'Hospital Administrator, Green Valley Hospital',
  },
];

// Simple 3D Hospital Building Model
function Hospital3D() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <group>
        {/* Main building */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 1, 1]} />
          <meshStandardMaterial color="#bae6fd" />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[2.2, 0.2, 1.1]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        {/* Door */}
        <mesh position={[0, 0.1, 0.51]}>
          <boxGeometry args={[0.4, 0.5, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
        {/* Windows */}
        <mesh position={[-0.6, 0.5, 0.51]}>
          <boxGeometry args={[0.3, 0.3, 0.1]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        <mesh position={[0.6, 0.5, 0.51]}>
          <boxGeometry args={[0.3, 0.3, 0.1]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        {/* Red Cross */}
        <mesh position={[0, 1.2, 0.51]}>
          <boxGeometry args={[0.18, 0.5, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 1.4, 0.51]}>
          <boxGeometry args={[0.5, 0.18, 0.1]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </group>
    </Float>
  );
}

const Home: React.FC = () => {
    const [chatModalOpen, setChatModalOpen] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [showSymptomChecker, setShowSymptomChecker] = useState(false);
    const [symptomInput, setSymptomInput] = useState('');
    const [symptomResult, setSymptomResult] = useState<string | null>(null);
    const stepContents = [
      'Welcome to the Inquiry step. Here you can ask questions about your treatment journey.',
      'Assessment step: Our team will review your information and provide recommendations.',
      'Planning step: We will help you plan your treatment and next steps.',
      'Scheduled step: Your treatment has been scheduled. Prepare for your visit.',
      'In Treatment: You are currently undergoing treatment. Our team is here to support you.',
      'Post Treatment: Review your recovery and next steps.',
      'Completed: Your treatment journey is complete. Thank you!'
    ];
    const navigate = useNavigate();

    const healthTips = [
      "Drinking water boosts your energy and focus!",
      "A 20-minute walk a day can improve your mood.",
      "Washing hands is the #1 way to prevent illness.",
      "Laughter is good for your heart and immune system!",
      "Eating colorful fruits and veggies helps you stay healthy.",
      "Getting enough sleep helps your body heal and grow.",
      "Smiling can reduce stress and boost your immune system!",
      "Regular checkups catch problems early—see your doctor!",
      "Stretching in the morning wakes up your muscles.",
      "Taking deep breaths can help you relax instantly."
    ];
    const [tipIndex, setTipIndex] = useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setTipIndex((i) => (i + 1) % healthTips.length);
      }, 6000);
      return () => clearInterval(interval);
    }, []);

    return (
    <div className="min-h-screen font-sans bg-[#0a192f]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[80vh] px-4 md:px-0 overflow-hidden">
        {/* SVG Blob Background */}
        <svg className="absolute left-0 top-0 w-full h-full z-0" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#bae6fd" fillOpacity="0.7" d="M0,160 C320,320 1120,0 1440,160 L1440,600 L0,600 Z" />
          <path fill="#e0f2fe" fillOpacity="0.8" d="M0,320 C400,480 1040,120 1440,320 L1440,600 L0,600 Z" />
        </svg>
        <div className="absolute inset-0 bg-[#0a192f]/80 z-10" />
        <motion.div
          className="relative z-20 flex flex-col md:flex-row items-center justify-center w-full h-full py-24 gap-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-6 md:mb-0 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-lg font-semibold text-white tracking-widest mb-4">CURA AID</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Modern Hospital Management<br />for Better Patient Care
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto md:mx-0">
              Manage patients, doctors, appointments, billing, and medical records—all in one secure, easy-to-use platform.
            </p>
            <a
              href="#features"
              className="inline-block bg-white text-primary font-bold px-8 py-3 rounded shadow hover:bg-accent hover:text-white transition text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Explore Features
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="w-[220px] h-[220px] bg-transparent rounded-2xl shadow-2xl overflow-hidden">
              <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }} shadows>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 10, 5]} intensity={0.7} castShadow />
                <Hospital3D />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
              </Canvas>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Key Hospital Features Section */}
      <section id="features" className="py-20 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">Key Hospital Features</h2>
          <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[{
              icon: <FaUserInjured color="#0ea5e9" size={36} />,
              title: 'Patient Management',
              desc: 'Register, track, and manage patient details, visits, and histories securely.'
            }, {
              icon: <FaUserMd color="#38bdf8" size={36} />,
              title: 'Doctor Directory',
              desc: 'Maintain a searchable directory of doctors, specialties, and schedules.'
            }, {
              icon: <FaCalendarCheck color="#4ade80" size={36} />,
              title: 'Appointments',
              desc: 'Easy scheduling, reminders, and management for all appointments.'
            }, {
              icon: <FaHospital color="#8b5cf6" size={36} />,
              title: 'Billing & Invoicing',
              desc: 'Automate billing, payments, and insurance claims with transparency.'
            }, {
              icon: <FaFileMedical color="#f59e0b" size={36} />,
              title: 'Medical Records',
              desc: 'Digitize, store, and access patient medical records securely and efficiently.'
            }, {
              icon: <FaHeartbeat color="#ef4444" size={36} />,
              title: 'Analytics & Reporting',
              desc: 'Gain insights with real-time analytics and customizable reports.'
            }].map((f, i) => (
              <motion.div
                key={f.title}
                whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0], boxShadow: '0 12px 32px 0 rgba(56,189,248,0.18)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <GlassCard className="flex flex-col items-center text-center p-6">
                  <motion.span
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: [0, 8, -8, 0] }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    {f.icon}
                  </motion.span>
                  <h3 className="font-bold text-lg mb-2 text-primary">{f.title}</h3>
                  <p className="text-primary/80">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Advanced Health Modules Section */}
      <section id="advanced-modules" className="py-20 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">Advanced Health Modules</h2>
          <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaPills color="#10b981" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Pharmacy Management</h3>
              <p className="text-primary/80">Track medication inventory, prescriptions, and dispensing. Get alerts for low stock and expiry.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaVials color="#3b82f6" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Laboratory Management</h3>
              <p className="text-primary/80">Manage lab test orders, results, and reports. Link lab results to patient records.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaAmbulance color="#f59e0b" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Ward/Bed Management</h3>
              <p className="text-primary/80">Visualize ward/bed occupancy. Assign patients to beds and track discharges.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaSyringe color="#ef4444" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Emergency/Outpatient</h3>
              <p className="text-primary/80">Register and triage emergency/outpatient visits. Quick access to patient history and doctor assignment.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaUserMd color="#3b82f6" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Telemedicine</h3>
              <p className="text-primary/80">Schedule and conduct video consultations. Secure chat and file sharing for remote care.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaUserMd color="#3b82f6" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Staff Scheduling & HR</h3>
              <p className="text-primary/80">Manage staff shifts, leave, and roles. Track certifications and training.</p>
            </GlassCard>
            <GlassCard className="flex flex-col items-center text-center p-6">
              <span className="text-4xl mb-3"><FaFileMedical color="#f59e0b" size={36} /></span>
              <h3 className="font-bold text-lg mb-2 text-primary">Insurance & Claims</h3>
              <p className="text-primary/80">Manage insurance details, claims, and approvals. Track claim status and patient coverage.</p>
            </GlassCard>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        className="py-20 px-4 md:px-0 bg-white/90 dark:bg-gray-900/80"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">What Our Users Say</h2>
        <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-primary shadow" />
              <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-4">“{t.quote}”</blockquote>
              <div className="font-semibold text-primary mb-1">{t.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Start Your Journey Section */}
      <motion.section
        className="py-20 px-4 md:px-0 bg-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <StartYourJourney />
      </motion.section>

      {/* Health Tips Section */}
      <motion.section
        className="py-16 px-4 md:px-0 bg-primary/10 dark:bg-primary/20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <FaLightbulb className="mx-auto text-primary text-4xl mb-4" />
          <h3 className="text-2xl font-bold mb-2">Health Tip</h3>
          <p className="text-lg text-gray-700 dark:text-gray-200">{healthTips[tipIndex]}</p>
        </div>
      </motion.section>

      {/* FAQ & Patient Resources Section */}
      <section id="faq-resources" className="py-20 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-2 text-center">FAQ & Patient Resources</h2>
          <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* FAQ */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary dark:text-white">Frequently Asked Questions</h3>
              <ul className="space-y-4 text-primary/90 dark:text-white/90">
                <li>
                  <span className="font-semibold text-primary dark:text-white">How do I book an appointment?</span><br />
                  You can book appointments online through our portal or by calling our front desk.
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-white">Can I access my medical records online?</span><br />
                  Yes, registered patients can securely view their records through the patient portal.
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-white">Does the hospital accept my insurance?</span><br />
                  We accept most major insurance plans. Please check with our billing department for details.
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-white">Is telemedicine available?</span><br />
                  Yes, you can schedule virtual visits with our doctors for many conditions.
                </li>
                <li>
                  <span className="font-semibold text-primary dark:text-white">How do I get test results?</span><br />
                  Lab results are available in your patient portal or can be discussed with your doctor.
                </li>
              </ul>
            </div>
            {/* Patient & Staff Resources */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary dark:text-white">Patient & Staff Resources</h3>
              <ul className="list-disc pl-6 space-y-2 text-primary/90 dark:text-white/90">
                <li><a href="#" className="underline hover:text-accent text-accent dark:text-accent-light">New Patient Registration Form</a></li>
                <li><a href="#" className="underline hover:text-accent text-accent dark:text-accent-light">Insurance & Billing Information</a></li>
                <li><a href="#" className="underline hover:text-accent text-accent dark:text-accent-light">Telemedicine Guide</a></li>
                <li><a href="#" className="underline hover:text-accent text-accent dark:text-accent-light">Hospital Policies & Visitor Info</a></li>
                <li><a href="#" className="underline hover:text-accent text-accent dark:text-accent-light">Staff Training Materials</a></li>
                <li><a href="#" className="underline hover:text-accent text-accent dark:text-accent-light">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Success Stories & Hospital Impact Section */}
      <section id="success-stories" className="py-20 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">Success Stories & Hospital Impact</h2>
          <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <GlassCard className="p-8 shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">"We reduced patient wait times by 40%"</h3>
                <p className="text-primary/80 mb-4">With CuraAid, our hospital streamlined appointment scheduling and patient flow. Our staff and patients are happier than ever.</p>
              </div>
              <div className="text-primary/60 text-sm mt-auto">- Dr. Priya Sharma, City Hospital</div>
            </GlassCard>
            <GlassCard className="p-8 shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">"Medical records are always at our fingertips"</h3>
                <p className="text-primary/80 mb-4">Digitizing our records with CuraAid has made care safer and more efficient. No more lost files or delays.</p>
              </div>
              <div className="text-primary/60 text-sm mt-auto">- Nurse Teddy Yuhui, Sunrise Clinic</div>
            </GlassCard>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">👩‍⚕️</span>
              <div className="text-2xl font-bold text-primary">10,000+</div>
              <div className="text-primary/80">Patients Managed</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🏥</span>
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-primary/80">Hospitals & Clinics</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">⏱️</span>
              <div className="text-2xl font-bold text-primary">40%</div>
              <div className="text-primary/80">Faster Patient Flow</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">🔒</span>
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-primary/80">Uptime & Data Security</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Photo Gallery & Infographics Section */}
      <section id="gallery-infographics" className="py-20 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">Photo Gallery & Infographics</h2>
          <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <img src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=600&q=80" alt="Doctors in hospital corridor" className="rounded-2xl shadow object-cover w-full h-56" />
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd07?auto=format&fit=crop&w=600&q=80" alt="Nurse at work station" className="rounded-2xl shadow object-cover w-full h-56" />
            <img src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80" alt="Doctor writing notes" className="rounded-2xl shadow object-cover w-full h-56" />
            <img src="https://images.unsplash.com/photo-1512070679279-c2f999098c01?auto=format&fit=crop&w=600&q=80" alt="Patient consultation" className="rounded-2xl shadow object-cover w-full h-56" />
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Hospital staff at nurse station" className="rounded-2xl shadow object-cover w-full h-56" />
            <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80" alt="Medical team meeting" className="rounded-2xl shadow object-cover w-full h-56" />
          </div>
          <div className="flex flex-col items-center">
            <GlassCard className="p-8 max-w-xl w-full flex flex-col items-center">
              <span className="text-4xl mb-3">📈</span>
              <h3 className="font-bold text-lg mb-2">Patient Journey Infographic</h3>
              <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/infographic-2028016_1280.png" alt="Sample patient journey infographic" className="rounded shadow w-full h-48 object-contain bg-white" />
              <p className="text-primary/80 mt-4 text-center">See how a patient moves from registration to discharge with our digital platform.</p>
            </GlassCard>
          </div>
        </motion.div>
      </section>

      {/* Products/Services Overview Section */}
      <section id="products" className="relative flex flex-col md:flex-row min-h-[400px]">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
            alt="Hospital staff working at nurse station"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <motion.div
          className="md:w-1/2 flex flex-col justify-center bg-white/10 px-8 py-16"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">How CuraAid Empowers Your Hospital</h2>
          <div className="h-1 w-16 bg-primary mb-8" />
          <p className="text-lg text-primary mb-6 max-w-xl">
            Our platform is designed for hospitals and clinics to streamline operations, improve patient care, and boost efficiency. Here’s what you get:
          </p>
          <ul className="list-disc pl-6 text-lg text-primary/90 space-y-2">
            <li>Centralized patient, doctor, and appointment management</li>
            <li>Secure digital medical records and billing</li>
            <li>Real-time analytics and reporting for better decisions</li>
            <li>Role-based access for staff, doctors, and admins</li>
            <li>Mobile-friendly and accessible for all users</li>
          </ul>
        </motion.div>
      </section>

      {/* Symptom Checker Section */}
      <section id="symptom-checker" className="py-16 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Symptom Checker</h2>
          <div className="h-1 w-16 bg-primary mb-8 mx-auto" />
          <p className="text-lg text-primary/90 mb-6">
            Our symptom checker is designed to help you quickly identify potential health issues. It’s a simple, user-friendly tool that can guide you towards appropriate care.
          </p>
          <button
            className="inline-block bg-primary text-white font-bold px-8 py-3 rounded shadow hover:bg-accent transition text-lg focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setShowSymptomChecker(true)}
          >
            Check Your Symptoms
          </button>
        </motion.div>
        {showSymptomChecker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => { setShowSymptomChecker(false); setSymptomInput(''); setSymptomResult(null); }}
                aria-label="Close symptom checker"
              >
                &times;
              </button>
              <h3 className="text-lg font-bold mb-4">Symptom Checker</h3>
              {!symptomResult ? (
                <form onSubmit={e => { e.preventDefault(); setSymptomResult('Possible conditions: Common Cold, Flu, or Allergies. Please consult a doctor for a professional diagnosis.'); }}>
                  <label className="block text-left mb-2 font-medium">Describe your symptoms:</label>
                  <textarea
                    className="w-full p-2 border rounded mb-4 text-black"
                    rows={4}
                    value={symptomInput}
                    onChange={e => setSymptomInput(e.target.value)}
                    placeholder="e.g. headache, fever, sore throat"
                    required
                  />
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-bold w-full">Check</button>
                </form>
              ) : (
                <div>
                  <div className="mb-4 text-primary font-semibold">{symptomResult}</div>
                  <button className="bg-primary text-white px-4 py-2 rounded font-bold w-full" onClick={() => { setSymptomResult(null); setSymptomInput(''); }}>Check Another</button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Treatment Journey Stepper + File Upload */}
      <section className="py-10 px-4 md:px-0 bg-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">Your Treatment Journey</h2>
          <Treatment activeStep={activeStep} setActiveStep={setActiveStep} />
          <div className="my-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-primary text-center min-h-[60px]">
              {stepContents[activeStep]}
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn-primary mr-2" onClick={() => setShowUpload(true)}>Upload Medical Report</button>
            </div>
            {showUpload && <UploadMedicalReports setPopupStatus={setShowUpload} />}
          </div>
        </div>
      </section>

      {/* Live Chat Box (right side on desktop, modal on mobile) */}
      <section id="live-chat-support" className="py-16 px-4 md:px-0 bg-transparent">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Live Chat & Support</h2>
          <div className="h-1 w-16 bg-primary mb-8 mx-auto" />
          <p className="text-lg text-primary/90 mb-6">Need help? Our support team is here to assist you with appointments, records, billing, and more. Click below to start a chat or send a support request.</p>
          <button
            className="inline-block bg-primary text-white font-bold px-8 py-3 rounded shadow hover:bg-accent transition text-lg focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setChatModalOpen(true)}
          >
            Start Live Chat
          </button>
        </motion.div>
        {chatModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p-4 w-full max-w-3xl relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setChatModalOpen(false)}
                aria-label="Close chat modal"
              >
                &times;
              </button>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold">Live Chat Support</h3>
                <button
                  className="btn-secondary"
                  onClick={() => { setChatModalOpen(false); navigate('/chat-bot'); }}
                >
                  Go to Full Chat
                </button>
              </div>
              <div className="h-[500px] overflow-y-auto">
                <GenerativeChat />
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Floating Health Tip Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border-2 border-accent/30 hover:scale-105 transition-transform cursor-pointer max-w-xs"
          style={{ boxShadow: '0 8px 32px 0 rgba(56,189,248,0.18)' }}
          onClick={() => setTipIndex((i) => (i + 1) % healthTips.length)}
          title="Click for another tip!"
        >
          <FaLightbulb className="text-yellow-400 text-2xl animate-pulse" aria-label="Did you know?" />
          <div className="text-primary font-semibold text-sm leading-snug">
            <span className="block text-accent font-bold mb-1">Did you know?</span>
            {healthTips[tipIndex]}
          </div>
        </motion.div>
      </div>
      <Footer />
        </div>
    );
};

export default Home;