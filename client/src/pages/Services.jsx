import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import CustomizedItem from '../../public/images/customized_item.png';
import CustomizedDiya from '../../public/images/customized_diya.png';
import CustomizedFlag from '../../public/images/customized_flag.png';
import RitualOne from '../../public/images/ritual_one.png';
import RitualTwo from '../../public/images/ritual_two.png';
import RitualThree from '../../public/images/ritual_three.png';
import WholesaleOne from '../../public/images/wholesale_one.png';
import WholesaleTwo from '../../public/images/wholesale_two.png';
import WholesaleItem from '../../public/images/wholesale_item.png';
import ServicesFooter from '../../public/images/services_footer.png';

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
      CustomizedFlag,
      CustomizedDiya,
      CustomizedItem,
    ],
  },
  {
    title: 'Ritual Items',
    description:
      'Explore our extensive collection of ritual items, including prayer flags, prayer wheels and butterlamps, designed to elevate your spiritual experience with genuine resources.',
    tagline: 'Authentic ritual items to enhance your spiritual practices.',
    images: [
      RitualOne,
      RitualTwo,
      RitualThree,
    ],
  },
  {
    title: 'Wholesale Services',
    description:
      'We offer competitive wholesale options for retailers looking to stock authentic Buddhist items, providing quality products that resonate with your customers.',
    tagline: 'Exclusive wholesale pricing for businesses and retailers.',
    images: [
      WholesaleTwo,
      WholesaleOne,
      WholesaleItem,
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
            backgroundImage: `url(${ServicesFooter})`
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
