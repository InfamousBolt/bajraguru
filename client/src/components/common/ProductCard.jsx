import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatPrice';

export default function ProductCard({ product }) {
  const { id, name, price, category, images, available_colors } = product;
  const imageUrl = images?.[0]?.url || '/placeholder.jpg';

  let colors = [];
  if (available_colors) {
    try {
      colors = typeof available_colors === 'string' ? JSON.parse(available_colors) : available_colors;
    } catch {
      colors = [];
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/shop/${id}`} className="block">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-sand">
            <motion.img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Category badge */}
            {category && (
              <span className="absolute left-3 top-3 rounded-full bg-offwhite/90 px-3 py-1 font-body text-[10px] font-medium uppercase tracking-widest text-charcoal backdrop-blur-sm">
                {category}
              </span>
            )}

            {/* Inquire button on hover */}
            <span className="absolute bottom-3 right-3 rounded-full bg-sage px-4 py-2 font-body text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
              Inquire
            </span>
          </div>

          {/* Info */}
          <div className="px-4 py-4">
            <h3 className="font-heading text-lg font-semibold leading-snug text-charcoal line-clamp-1">
              {name}
            </h3>
            <p className="mt-1 font-body text-sm font-medium text-warm-gray">
              {formatPrice(price)}
            </p>
            {/* Color swatches */}
            {colors.length > 0 && (
              <div className="mt-2 flex gap-1.5">
                {colors.slice(0, 5).map((c, i) => (
                  <span
                    key={i}
                    title={c.name}
                    className="h-4 w-4 rounded-full border border-sand"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
                {colors.length > 5 && (
                  <span className="font-body text-xs text-warm-gray">+{colors.length - 5}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
