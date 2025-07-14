import React, { useState } from 'react';
import toast from '@/components/ui/toast/toast';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', message: '' });
      toast.success('Thank you for your feedback!');
    }, 1200);
  };

  return (
    <div className="max-w-lg mx-auto p-8 mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="px-4 py-2 border rounded"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="px-4 py-2 border rounded min-h-[120px]"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition font-semibold"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact; 