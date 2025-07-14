// views/Home/components/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/shared/Footer';
import { motion } from 'framer-motion';
import GenerativeChat from '../../chat-bot/GenerativeChat';
import StartYourJourney from './StartYourJourney';
import Treatment from '../../chat-bot/components/ChatBox/components/Treatment';
import UploadMedicalReports from '@/components/shared/UploadMedicalReports';

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
    return (
    <div className="min-h-screen font-sans bg-offwhite">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[80vh] px-4 md:px-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80"
          alt="Doctors and nurses in a hospital corridor"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-blueOverlay z-10" />
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center w-full h-full py-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-6">
            <div className="text-lg font-semibold text-white tracking-widest mb-4">CURA AID</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Modern Hospital Management<br />for Better Patient Care
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
              Manage patients, doctors, appointments, billing, and medical records—all in one secure, easy-to-use platform.
            </p>
            <a
              href="#features"
              className="inline-block bg-white text-primary font-bold px-8 py-3 rounded shadow hover:bg-accent hover:text-white transition text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
      </section>

      {/* Key Hospital Features Section */}
      <section id="features" className="py-20 px-4 md:px-0 bg-white dark:bg-gray-900">
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
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">🧑‍🤝‍🧑</span>
              <h3 className="font-bold text-lg mb-2">Patient Management</h3>
              <p className="text-primary/80">Register, track, and manage patient details, visits, and histories securely.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">🩺</span>
              <h3 className="font-bold text-lg mb-2">Doctor Directory</h3>
              <p className="text-primary/80">Maintain a searchable directory of doctors, specialties, and schedules.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">📅</span>
              <h3 className="font-bold text-lg mb-2">Appointments</h3>
              <p className="text-primary/80">Easy scheduling, reminders, and management for all appointments.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">💳</span>
              <h3 className="font-bold text-lg mb-2">Billing & Invoicing</h3>
              <p className="text-primary/80">Automate billing, payments, and insurance claims with transparency.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">📋</span>
              <h3 className="font-bold text-lg mb-2">Medical Records</h3>
              <p className="text-primary/80">Digitize, store, and access patient medical records securely and efficiently.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">📊</span>
              <h3 className="font-bold text-lg mb-2">Analytics & Reporting</h3>
              <p className="text-primary/80">Gain insights with real-time analytics and customizable reports.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Advanced Health Modules Section */}
      <section id="advanced-modules" className="py-20 px-4 md:px-0 bg-accent/5 dark:bg-gray-800">
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
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">💊</span>
              <h3 className="font-bold text-lg mb-2">Pharmacy Management</h3>
              <p className="text-primary/80">Track medication inventory, prescriptions, and dispensing. Get alerts for low stock and expiry.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">🧪</span>
              <h3 className="font-bold text-lg mb-2">Laboratory Management</h3>
              <p className="text-primary/80">Manage lab test orders, results, and reports. Link lab results to patient records.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">🛏️</span>
              <h3 className="font-bold text-lg mb-2">Ward/Bed Management</h3>
              <p className="text-primary/80">Visualize ward/bed occupancy. Assign patients to beds and track discharges.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">🚑</span>
              <h3 className="font-bold text-lg mb-2">Emergency/Outpatient</h3>
              <p className="text-primary/80">Register and triage emergency/outpatient visits. Quick access to patient history and doctor assignment.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">💻</span>
              <h3 className="font-bold text-lg mb-2">Telemedicine</h3>
              <p className="text-primary/80">Schedule and conduct video consultations. Secure chat and file sharing for remote care.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">👩‍⚕️</span>
              <h3 className="font-bold text-lg mb-2">Staff Scheduling & HR</h3>
              <p className="text-primary/80">Manage staff shifts, leave, and roles. Track certifications and training.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition">
              <span className="text-4xl mb-3">🧾</span>
              <h3 className="font-bold text-lg mb-2">Insurance & Claims</h3>
              <p className="text-primary/80">Manage insurance details, claims, and approvals. Track claim status and patient coverage.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Health Tips Section */}
      <section id="health-tips" className="py-16 px-4 md:px-0 bg-white dark:bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">Health Tips</h2>
          <div className="h-1 w-16 bg-primary mb-10 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow">
              <span className="text-4xl mb-3">🧼</span>
              <h3 className="font-bold text-lg mb-2">Wash Hands Regularly</h3>
              <p className="text-primary/80">Hand hygiene is the simplest way to prevent infections. Wash for at least 20 seconds.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow">
              <span className="text-4xl mb-3">💉</span>
              <h3 className="font-bold text-lg mb-2">Get Vaccinated</h3>
              <p className="text-primary/80">Stay up to date with recommended vaccines for yourself and your family.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow">
              <span className="text-4xl mb-3">🍎</span>
              <h3 className="font-bold text-lg mb-2">Eat Healthy</h3>
              <p className="text-primary/80">A balanced diet supports your immune system and overall health.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow">
              <span className="text-4xl mb-3">🏃‍♂️</span>
              <h3 className="font-bold text-lg mb-2">Stay Active</h3>
              <p className="text-primary/80">Regular exercise helps prevent chronic diseases and boosts mood.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow">
              <span className="text-4xl mb-3">🩺</span>
              <h3 className="font-bold text-lg mb-2">Annual Checkups</h3>
              <p className="text-primary/80">Visit your doctor for regular checkups to catch issues early.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-accent/10 rounded-2xl shadow">
              <span className="text-4xl mb-3">😴</span>
              <h3 className="font-bold text-lg mb-2">Get Enough Sleep</h3>
              <p className="text-primary/80">Aim for 7-9 hours of sleep each night for optimal health.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ & Patient Resources Section */}
      <section id="faq-resources" className="py-20 px-4 md:px-0 bg-accent/5 dark:bg-gray-800">
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
      <section id="success-stories" className="py-20 px-4 md:px-0 bg-white dark:bg-gray-900">
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
            <div className="bg-accent/10 rounded-2xl p-8 shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">"We reduced patient wait times by 40%"</h3>
                <p className="text-primary/80 mb-4">With CuraAid, our hospital streamlined appointment scheduling and patient flow. Our staff and patients are happier than ever.</p>
              </div>
              <div className="text-primary/60 text-sm mt-auto">- Dr. Priya Sharma, City Hospital</div>
            </div>
            <div className="bg-accent/10 rounded-2xl p-8 shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-2">"Medical records are always at our fingertips"</h3>
                <p className="text-primary/80 mb-4">Digitizing our records with CuraAid has made care safer and more efficient. No more lost files or delays.</p>
              </div>
              <div className="text-primary/60 text-sm mt-auto">- Nurse Teddy Yuhui, Sunrise Clinic</div>
            </div>
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
      <section id="gallery-infographics" className="py-20 px-4 md:px-0 bg-accent/5 dark:bg-gray-800">
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-8 max-w-xl w-full flex flex-col items-center">
              <span className="text-4xl mb-3">📈</span>
              <h3 className="font-bold text-lg mb-2">Patient Journey Infographic</h3>
              <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/infographic-2028016_1280.png" alt="Sample patient journey infographic" className="rounded shadow w-full h-48 object-contain bg-white" />
              <p className="text-primary/80 mt-4 text-center">See how a patient moves from registration to discharge with our digital platform.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-testimonialBg py-20 px-4 md:px-0">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">What Healthcare Professionals Say</h2>
          <div className="h-1 w-16 bg-primary mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="flex flex-col items-center text-center bg-white rounded-2xl shadow p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              >
                <img src={t.img} alt={t.name + ' - ' + t.role} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-accent" />
                <p className="text-gray-700 mb-4">{t.quote}</p>
                <div className="font-bold text-primary text-lg mt-auto">- {t.name}</div>
                <div className="text-primary/60 text-sm">{t.role}</div>
              </motion.div>
            ))}
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
          className="md:w-1/2 flex flex-col justify-center bg-accent/10 px-8 py-16"
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
      <section id="symptom-checker" className="py-16 px-4 md:px-0 bg-white dark:bg-gray-900">
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
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
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
      <section className="py-10 px-4 md:px-0 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">Your Treatment Journey</h2>
          <Treatment activeStep={activeStep} setActiveStep={setActiveStep} />
          <div className="my-4">
            <div className="bg-accent/10 rounded-lg p-4 text-primary text-center min-h-[60px]">
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
      <section id="live-chat-support" className="py-16 px-4 md:px-0 bg-accent/5 dark:bg-gray-800">
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
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 w-full max-w-3xl relative">
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
      <Footer />
        </div>
    );
};

export default Home;