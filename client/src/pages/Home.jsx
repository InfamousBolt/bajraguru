import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Shield, Star, Palette, BookOpen, ShoppingBag } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import { ProductGridSkeleton } from '../components/common/Skeleton';
import ErrorBoundary from '../components/common/ErrorBoundary';
import ErrorMessage from '../components/common/ErrorMessage';
import LazyImage from '../components/common/LazyImage';

import CustomizedItem from '../../public/images/customized_item.png';
import RitualItem from '../../public/images/ritual_item.png';
import WholesaleItem from '../../public/images/wholesale_item.png';

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
    description: 'Directly sourced locally from Kalimpong, ensuring genuine quality and cultural integrity.',
  },
];

const services = [
  {
    icon: Palette,
    title: 'Custom Creations',
    description:
      'Personalized, handcrafted spiritual items tailored to your needs. We also do customized Khada, printing and decor.',
    image: CustomizedItem,
  },
  {
    icon: BookOpen,
    title: 'Ritual Items',
    description:
      'Authentic ritual items made under the guidance of monasteries to enhance your spiritual practices.',
    image: RitualItem,
  },
  {
    icon: ShoppingBag,
    title: 'Wholesale Services',
    description:
      'Exclusive wholesale pricing for businesses and retailers.',
    image: WholesaleItem,
  },
];

const testimonials = [
  {
    name: 'Sujan Gurung',
    text: 'The singing bowl I received is absolutely stunning. It is deep and calming.',
    rating: 5,
  },
  {
    name: 'Dinesh Thapa',
    text: 'Beautiful prayer flags and incredible customer care. Thank you.',
    rating: 4,
  },
  {
    name: 'Priya Kumar',
    text: 'The incense collection is heavenly. Love the fragrance.',
    rating: 5,
  },
];

export default function Home() {
  const { data, isLoading, isError, refetch } = useProducts({ featured: true, limit: 4 });
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
                and ritual items sourced locally. Made with love under the guidance of respectful monks and monasteries,
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
                <ErrorBoundary
                  fallback={
                    <div className="flex h-full items-center justify-center">
                      <img src="/bajraguru_logo.png" alt="BajraGuru" className="w-48 drop-shadow-lg" />
                    </div>
                  }
                >
                  <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
                    <Suspense fallback={null}>
                      <HeroScene />
                    </Suspense>
                  </Canvas>
                </ErrorBoundary>
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
      <section className="relative bg-offwhite py-20 md:py-28 overflow-hidden">
        {/* Incense sticks — from bottom-left corner, tips reach above second card */}
        <div className="pointer-events-none absolute bottom-0 left-0  hidden h-full w-[60%] opacity-[0.5] md:block">
          <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full" preserveAspectRatio="none">
            {/* Stick 1 — tip at (410, 55) */}
            {/* Smoke wisps */}
            <path d="M410 50C405 20 414 -15 408 -50C402 -85 412 -115 406 -150" stroke="#6B8F6E" strokeWidth="2" strokeLinecap="round" opacity="0.7">
              <animate attributeName="d" dur="4s" repeatCount="indefinite" values="M410 50C405 20 414 -15 408 -50C402 -85 412 -115 406 -150;M410 50C416 18 404 -18 412 -55C420 -88 406 -118 414 -155;M410 50C405 20 414 -15 408 -50C402 -85 412 -115 406 -150" />
            </path>
            <path d="M413 48C410 15 418 -20 414 -58C410 -95 418 -125 414 -165" stroke="#6B8F6E" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
              <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M413 48C410 15 418 -20 414 -58C410 -95 418 -125 414 -165;M413 48C418 12 408 -24 416 -62C424 -98 412 -128 420 -168;M413 48C410 15 418 -20 414 -58C410 -95 418 -125 414 -165" />
            </path>
            {/* Stick body */}
            <line x1="410" y1="55" x2="-20" y2="420" stroke="#8B6914" strokeWidth="3.5" strokeLinecap="round" />

            {/* Stick 2 — tip at (390, 85) */}
            {/* Smoke wisps */}
            <path d="M390 80C385 48 394 15 388 -22C382 -58 392 -90 386 -130" stroke="#6B8F6E" strokeWidth="2" strokeLinecap="round" opacity="0.7">
              <animate attributeName="d" dur="4.5s" repeatCount="indefinite" values="M390 80C385 48 394 15 388 -22C382 -58 392 -90 386 -130;M390 80C396 45 384 12 392 -25C400 -62 386 -92 394 -135;M390 80C385 48 394 15 388 -22C382 -58 392 -90 386 -130" />
            </path>
            <path d="M393 78C390 42 398 8 392 -32C388 -68 396 -100 392 -142" stroke="#6B8F6E" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
              <animate attributeName="d" dur="3.8s" repeatCount="indefinite" values="M393 78C390 42 398 8 392 -32C388 -68 396 -100 392 -142;M393 78C398 40 388 5 396 -35C404 -72 390 -102 398 -145;M393 78C390 42 398 8 392 -32C388 -68 396 -100 392 -142" />
            </path>
            {/* Stick body */}
            <line x1="390" y1="85" x2="-30" y2="430" stroke="#8B6914" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
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
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
                    <LazyImage
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
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
            <ProductGridSkeleton count={4} />
          ) : isError ? (
            <ErrorMessage title="Couldn't load products" message="Please check your connection and try again." onRetry={refetch} />
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
