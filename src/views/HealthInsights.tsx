import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/shared/Footer';

const articles = [
  {
    title: '5 Ways to Boost Your Immunity',
    summary: 'Simple lifestyle changes to help your body fight off illness.',
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. A. Gupta',
    date: 'June 2024',
  },
  {
    title: 'Understanding Telemedicine: Benefits & Tips',
    summary: 'How virtual care is changing the way we see our doctors.',
    img: 'https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?auto=format&fit=crop&w=600&q=80',
    author: 'Nurse L. Smith',
    date: 'May 2024',
  },
  {
    title: 'Managing Diabetes: A Patient’s Guide',
    summary: 'Key steps for living well with diabetes, from diet to daily habits.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. R. Patel',
    date: 'April 2024',
  },
  {
    title: 'The Importance of Regular Checkups',
    summary: 'Why annual visits to your doctor matter for long-term health.',
    img: 'https://images.unsplash.com/photo-1512070679279-c2f999098c01?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. S. Lee',
    date: 'March 2024',
  },
];

const HealthInsights: React.FC = () => (
  <div className="min-h-screen font-sans bg-offwhite">
    {/* Hero Section */}
    <section className="relative flex flex-col items-center justify-center text-center min-h-[40vh] px-4 md:px-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=1200&q=80"
        alt="Doctor writing health blog"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-blueOverlay z-10" />
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center w-full h-full py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">Health Insights</h1>
        <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto">Explore our latest articles on health, wellness, and hospital care—written by our team of doctors, nurses, and health experts.</p>
      </motion.div>
    </section>

    {/* Articles Grid */}
    <section className="py-16 px-4 md:px-0">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {articles.map((a, i) => (
            <motion.div
              key={a.title}
              className="flex flex-col bg-white rounded-2xl shadow p-0 overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <img src={a.img} alt={a.title} className="w-full h-40 object-cover object-center" />
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-bold text-lg mb-2 text-primary">{a.title}</h2>
                <p className="text-primary/80 mb-4 flex-1">{a.summary}</p>
                <div className="text-sm text-primary/60 mt-auto">By {a.author} • {a.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
    <Footer />
  </div>
);

export default HealthInsights; 