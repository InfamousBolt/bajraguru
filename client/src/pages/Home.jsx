import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Shield, Star, Palette, BookOpen, ShoppingBag } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const HeroScene = lazy(() => import('../components/HeroScene'));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const values = [
  {
    icon: Leaf,
    title: 'Direct Manufacturing',
    description: 'Our in-house production ensures the highest quality while supporting local artisans.',
  },
  {
    icon: Heart,
    title: 'Customizable Options',
    description: 'We offer unique customization to cater to individual spiritual practices and preferences.',
  },
  {
    icon: Shield,
    title: 'Authentic Craft',
    description: 'Directly sourced from Nepal and Tibet, ensuring genuine quality and cultural integrity.',
  },
];

const services = [
  {
    icon: Palette,
    title: 'Custom Creations',
    description:
      'Personalized, handcrafted spiritual items tailored to your needs. We also do customized Khada and decor.',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80',
  },
  {
    icon: BookOpen,
    title: 'Ritual Items',
    description:
      'Authentic ritual items made under the guidance of monasteries to enhance your spiritual practices.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
  },
  {
    icon: ShoppingBag,
    title: 'Wholesale Services',
    description:
      'Exclusive wholesale pricing for businesses and retailers.',
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&q=80',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The singing bowl I received is absolutely stunning. The resonance is deep and calming — it has transformed my meditation practice.',
    rating: 5,
  },
  {
    name: 'David L.',
    text: 'Beautiful prayer flags and incredible customer care. You can feel the authenticity in every product.',
    rating: 5,
  },
  {
    name: 'Priya K.',
    text: 'The incense collection is heavenly. The Nag Champa takes me right back to the temples of Kathmandu.',
    rating: 5,
  },
];

export default function Home() {
  const { data, isLoading } = useProducts({ featured: true, limit: 4 });
  const products = data?.products || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-sand">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 1440 600" className="h-full w-full">
            <circle cx="200" cy="300" r="250" fill="currentColor" className="text-sage" />
            <circle cx="1200" cy="200" r="180" fill="currentColor" className="text-terracotta" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-sage-dark">
                Sacred Traditions, Modern Serenity
              </span>
              <h1 className="mt-4 font-heading text-5xl font-bold leading-tight text-charcoal md:text-6xl lg:text-7xl">
                Journey Into
                <br />
                <span className="text-sage">Buddhist Traditions</span>
              </h1>
              <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-warm-gray">
                Discover handcrafted Buddhist treasures — singing bowls, meditation essentials,
                and ritual items sourced directly from the heart of Nepal and surrounding regions.
                Bajraguru is dedicated to preserving and sharing the beauty of Buddhist culture through high-quality, authentic items.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button size="lg">
                    Shop Collection
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="secondary" size="lg">
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative z-10 aspect-square">
                <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
                  <Suspense fallback={null}>
                    <HeroScene />
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wavy divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path
              d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
              className="fill-offwhite"
            />
          </svg>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 md:grid-cols-3"
          >
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/10">
                  <item.icon size={24} className="text-sage-dark" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-warm-gray">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-sage-dark">
              What We Offer
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold text-charcoal md:text-5xl">
              Our Services
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 md:grid-cols-3"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Hover image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 transition-opacity duration-300 group-hover:opacity-0" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
                    <service.icon size={22} className="text-sage-dark" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-warm-gray">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-dark transition-colors hover:text-sage"
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-sage-dark">
              Curated for You
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold text-charcoal md:text-5xl">
              Bestsellers
            </h2>
          </motion.div>

          {isLoading ? (
            <Loading size="lg" className="py-20" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, images: product.image_url ? [{ url: product.image_url }] : [] }}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="secondary" size="lg">
                View All Products
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <span className="font-body text-xs font-medium uppercase tracking-[0.3em] text-sage-dark">
              What People Say
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold text-charcoal md:text-5xl">
              Loved by Our Community
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 font-body text-sm leading-relaxed text-warm-gray italic">
                  &ldquo;{item.text}&rdquo;
                </p>
                <p className="mt-4 font-body text-sm font-semibold text-charcoal">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-sage py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Begin Your Journey
            </h2>
            <p className="mt-4 font-body text-lg text-white/80">
              Explore our collection of sacred treasures and bring mindfulness into your everyday life.
            </p>
            <div className="mt-8">
              <Link to="/shop">
                <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-sage">
                  Explore Collection
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
