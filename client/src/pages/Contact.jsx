import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { contactApi } from '../services/api';
import Button from '../components/common/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await contactApi.create(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
          <h1 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-2 max-w-lg font-body text-lg text-warm-gray">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-sage focus:ring-2 focus:ring-sage/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-sage focus:ring-2 focus:ring-sage/20"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block font-body text-sm font-medium text-charcoal">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-sage-light/50 bg-offwhite px-4 py-3 font-body text-sm text-charcoal outline-none transition-shadow focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>

              {status === 'success' && (
                <p className="mt-4 rounded-lg bg-sage/10 p-3 font-body text-sm text-sage-dark">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 rounded-lg bg-terracotta/10 p-3 font-body text-sm text-terracotta">
                  Something went wrong. Please try again.
                </p>
              )}

              <p className="mt-5 font-body text-xs text-warm-gray">
                We do not store your email or personal details, and will never use them for marketing purposes. Your information is used solely to respond to your query.
              </p>

              <div className="mt-6">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? 'Sending...' : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Email', text: 'hello@bajraguru.com' },
                { icon: MapPin, title: 'Based in', text: 'Siliguri, West Bengal' },
                { icon: Clock, title: 'Response Time', text: 'Within 24 hours' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/10">
                    <item.icon size={20} className="text-sage-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-charcoal">{item.title}</h4>
                    <p className="mt-0.5 font-body text-sm text-warm-gray">{item.text}</p>
                  </div>
                  
                </div>
              ))}

              <a
                href="https://wa.me/918777276407"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/10">
                  <MessageCircle size={20} className="text-green-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-charcoal">WhatsApp</h4>
                  <p className="mt-0.5 font-body text-sm text-warm-gray">+91 87772 76407</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
