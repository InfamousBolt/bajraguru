import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const services = [
  {
    title: 'Custom Creations',
    description:
      'Our custom creations allow you to design unique spiritual items that reflect your personal practice and beliefs, ensuring each piece is meaningful.',
    tagline: 'Personalized, handcrafted spiritual items tailored to your needs.',
    images: [
      'https://images.unsplash.com/photo-1567591370504-80152f6b0845?w=600&q=80',
      'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&q=80',
      'https://images.unsplash.com/photo-1545467401-6bafecf30a3c?w=600&q=80',
    ],
  },
  {
    title: 'Ritual Items',
    description:
      'Explore our extensive collection of ritual items, including prayer flags, prayer wheels and butterlamps, designed to elevate your spiritual experience with genuine resources.',
    tagline: 'Authentic ritual items to enhance your spiritual practices.',
    images: [
      'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80',
      'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=600&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    ],
  },
  {
    title: 'Wholesale Services',
    description:
      'We offer competitive wholesale options for retailers looking to stock authentic Buddhist items, providing quality products that resonate with your customers.',
    tagline: 'Exclusive wholesale pricing for businesses and retailers.',
    images: [
      'https://images.unsplash.com/photo-1602532305019-3dbbd482dae0?w=600&q=80',
      'https://images.unsplash.com/photo-1563201515-adbe35c669c5?w=600&q=80',
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80',
    ],
  },
];

function ImageGrid({ images, alt }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="row-span-2 overflow-hidden rounded-xl">
        <img
          src={images[0]}
          alt={`${alt} 1`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="overflow-hidden rounded-xl">
        <img
          src={images[1]}
          alt={`${alt} 2`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="overflow-hidden rounded-xl">
        <img
          src={images[2]}
          alt={`${alt} 3`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
}

function ServiceSection({ service, index }) {
  const isReversed = index % 2 === 1;

  const textContent = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className={`flex flex-col justify-center rounded-2xl p-8 md:p-12 ${
        isReversed ? 'bg-sand/60' : ''
      }`}
    >
      <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
        {service.title}
      </h2>
      <p className="mt-5 font-body text-base leading-relaxed text-warm-gray">
        {service.description}
      </p>
      <p className="mt-4 font-body text-sm font-medium text-charcoal/70">
        {service.tagline}
      </p>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      custom={1}
    >
      <ImageGrid images={service.images} alt={service.title} />
    </motion.div>
  );

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {isReversed ? (
            <>
              {textContent}
              {imageContent}
            </>
          ) : (
            <>
              {imageContent}
              {textContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center"
          >
            <h1 className="font-heading text-4xl font-bold text-charcoal md:text-5xl lg:text-6xl">
              Discover Our Authentic Buddhist Services
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-body text-lg leading-relaxed text-warm-gray">
              At Bajra Guru, we provide remarkable services with high-quality, authentic Buddhist and
              Tibetan items catering to all spiritual needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, i) => (
        <ServiceSection key={service.title} service={service} index={i} />
      ))}

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-charcoal py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Join Us in Celebrating Buddhism&rsquo;s Rich Heritage
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-body text-base leading-relaxed text-white/80">
              Bajraguru offers a diverse selection of authentic, handcrafted Buddhist items designed
              for spiritual enrichment and cultural appreciation.
            </p>
            <div className="mt-8">
              <Link to="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
