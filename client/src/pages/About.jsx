import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Globe, Users, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const milestones = [
  { icon: Heart, title: 'Our Mission', text: 'To bridge ancient Buddhist traditions with modern seekers, making sacred tools accessible to everyone on their spiritual path.' },
  { icon: Globe, title: 'Direct Sourcing', text: 'We partner directly with artisan families in Nepal and Tibet, ensuring fair trade practices and cultural preservation.' },
  { icon: Users, title: 'Community First', text: 'Every purchase supports local communities — funding education, preserving craftsmanship, and sustaining livelihoods.' },
  { icon: Sparkles, title: 'Authenticity', text: 'Each item is handcrafted using centuries-old techniques, blessed in accordance with tradition, and verified for quality.' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sand py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-sage-dark">
                Our Story
              </span>
              <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-charcoal md:text-6xl">
                Rooted in
                <br />
                <span className="text-sage">Tradition</span>
              </h1>
              <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-warm-gray">
                BajraGuru was born from a deep reverence for Buddhist heritage and a desire to
                share its transformative power with the world. We curate authentic, handcrafted
                sacred items that honor centuries of spiritual tradition.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1609619385002-f40f1df827b8?w=800&q=80"
                  alt="Buddhist meditation space"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <h2 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 md:grid-cols-2"
          >
            {milestones.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
                  <item.icon size={22} className="text-sage-dark" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-warm-gray">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story section */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
              From Kathmandu to Your Home
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-warm-gray">
              Our founder first visited the workshops of Patan, Nepal over a decade ago.
              Watching master artisans hammer singing bowls by hand — each strike a meditation in itself —
              sparked a vision: to share these sacred objects with seekers everywhere, while ensuring
              the artisans who create them thrive.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-warm-gray">
              Today, BajraGuru works with over 30 artisan families across Nepal and Tibet.
              Every product tells a story of devotion, craftsmanship, and cultural heritage that
              spans centuries.
            </p>
            <div className="mt-8">
              <Link to="/shop">
                <Button size="lg">Explore Our Collection</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
