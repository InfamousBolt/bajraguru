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
  { icon: Heart, title: 'Our Mission', text: 'To provide authentic, high-quality ritual, cultural, and decorative items that resonate with the deep spiritual practices of Buddhism.' },
  { icon: Globe, title: 'In-House Production', text: 'With our own manufacturing and printing units, we ensure authenticity and craftsmanship in every piece, offering unique and customizable options.' },
  { icon: Users, title: 'Wholesale & Community', text: 'Since 1993, we have served both individuals and wholesale buyers with devotion and excellence, providing authentic and meaningful products.' },
  { icon: Sparkles, title: 'Authenticity', text: 'We don\u2019t just curate items \u2014 we create them. This allows us to maintain the highest quality for spiritual practitioners, collectors, and retailers.' },
  
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
                A Commitment to
                <br />
                <span className="text-sage">Authentic Traditions</span>
              </h1>
              <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-warm-gray">
                At Bajra Guru, we are more than a store &mdash; we are custodians of the rich
                heritage and spirituality of Buddhist and Tibetan traditions. With our own
                manufacturing and printing units, we ensure authenticity and craftsmanship
                in every piece we offer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden h-[28rem] lg:block"
            >
              <p className="mb-10 font-heading text-4xl font-bold tracking-wide text-charcoal">
                Bajraguru &ndash; The Buddhist Shop
              </p>
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                src="/bajraguru_logo.png"
                alt="Bajraguru logo"
                className="relative z-10 w-72 drop-shadow-lg"
              />
              <motion.img
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                src="/images/about.png"
                alt="Eight Auspicious Symbols"
                className="absolute right-16 top-36 z-20 w-52 drop-shadow-lg"
              />
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
              Our Journey Through 30+ Years
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-warm-gray">
              Since 1993, Bajra Guru has been a trusted name in Tibetan cultural goods,
              serving both individuals and wholesale buyers with devotion and excellence.
              With over 30 years of dedicated experience, we have developed a profound
              understanding of cultural and spiritual needs.
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-warm-gray">
              Explore the world of Buddhist spirituality and tradition at Bajra Guru. With our
              in-house production capabilities and unparalleled selection, we invite you to
              experience why we are a leading destination for Buddhist and Tibetan cultural goods.
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
