import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatPrice';
import LazyImage from './LazyImage';

export default function ProductCard({ product }) {
  const { id, name, price, category, images, available_colors, available_sizes } = product;
  const imageUrl = images?.[0]?.url || '/placeholder.jpg';

  let colors = [];
  if (available_colors) {
    try {
      colors = typeof available_colors === 'string' ? JSON.parse(available_colors) : available_colors;
    } catch {
      colors = [];
    }
  }

  // Check if any variant has a price increment
  let hasIncrements = false;
  try {
    if (available_sizes) {
      const rawSizes = typeof available_sizes === 'string' ? JSON.parse(available_sizes) : available_sizes;
      if (rawSizes.some((s) => (typeof s === 'object' ? s.increment : 0) > 0)) hasIncrements = true;
    }
    if (colors.some((c) => (c.increment || 0) > 0)) hasIncrements = true;
  } catch { /* ignore */ }

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
            <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
              <LazyImage
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>

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
              {hasIncrements && <span className="text-xs">From </span>}
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
