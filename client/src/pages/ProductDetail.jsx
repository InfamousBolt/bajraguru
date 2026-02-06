import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductCard from '../components/common/ProductCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useProduct(id);
  const product = data?.product;

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef(null);
  const dragX = useMotionValue(0);

  // Related products (same category) — must be called before any early return
  const { data: relatedData } = useProducts({
    category: product?.category,
    limit: 4,
  });

  // --- Early returns (after all hooks) ---

  if (isLoading) {
    return <Loading size="lg" className="min-h-[60vh]" />;
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-offwhite px-6">
        <h2 className="font-heading text-3xl text-charcoal">Product Not Found</h2>
        <Link to="/shop" className="mt-4 font-body text-sm text-sage-dark hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  // --- Derived state & handlers (safe after early returns) ---

  const relatedProducts = (relatedData?.products || []).filter((p) => p.id !== id).slice(0, 4);

  const images = product.images?.length > 0
    ? product.images.map((img) => img.image_url)
    : ['https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800'];

  const prevImage = () => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const SWIPE_THRESHOLD = 50;

  const handleDragEnd = (_, info) => {
    setDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -SWIPE_THRESHOLD || velocity < -500) {
      nextImage();
    } else if (offset > SWIPE_THRESHOLD || velocity > 500) {
      prevImage();
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, _id: product.id, images: product.images }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="bg-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 font-body text-sm text-warm-gray">
          <Link to="/shop" className="hover:text-sage-dark">Shop</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Carousel */}
          <div>
            <div
              ref={containerRef}
              className="relative aspect-square overflow-hidden rounded-3xl bg-sand select-none"
            >
              {/* Swipeable image track */}
              <AnimatePresence initial={false} mode="popLayout" custom={activeImage}>
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={`${product.name} — image ${activeImage + 1} of ${images.length}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag={images.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={handleDragEnd}
                  style={{ x: dragX, cursor: images.length > 1 ? 'grab' : 'default' }}
                  whileDrag={{ cursor: 'grabbing' }}
                />
              </AnimatePresence>

              {/* Arrow buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeImage
                          ? 'w-6 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Image counter badge */}
              {images.length > 1 && (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-charcoal/60 px-3 py-1 font-body text-xs text-white backdrop-blur-sm">
                  {activeImage + 1} / {images.length}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      i === activeImage
                        ? 'border-sage ring-2 ring-sage/20'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-sage-dark">
              {product.category}
            </span>
            <h1 className="mt-2 font-heading text-4xl font-bold text-charcoal md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-heading text-3xl font-semibold text-sage">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 font-body text-base leading-relaxed text-warm-gray">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="mt-6">
              {product.in_stock ? (
                <span className="flex items-center gap-1.5 font-body text-sm text-sage-dark">
                  <Check size={16} /> In Stock
                </span>
              ) : (
                <span className="font-body text-sm text-terracotta">Out of Stock</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-sage-light/50 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-charcoal transition-colors hover:text-sage-dark"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-body text-sm font-medium text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-12 w-12 items-center justify-center text-charcoal transition-colors hover:text-sage-dark"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="flex-1 sm:flex-initial"
              >
                {added ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 font-heading text-3xl font-bold text-charcoal">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{ ...p, _id: p.id, images: p.image_url ? [{ url: p.image_url }] : [] }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
