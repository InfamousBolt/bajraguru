import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const { _id, name, price, category, images } = product;
  const imageUrl = images?.[0]?.url || '/placeholder.jpg';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/shop/${_id}`} className="block">
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

            {/* Quick add button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-sage text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100"
              aria-label="Add to cart"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Info */}
          <div className="px-4 py-4">
            <h3 className="font-heading text-lg font-semibold leading-snug text-charcoal line-clamp-1">
              {name}
            </h3>
            <p className="mt-1 font-body text-sm font-medium text-warm-gray">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
