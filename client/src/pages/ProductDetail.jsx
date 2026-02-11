import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, MessageCircle } from 'lucide-react';
import { useProduct, useProducts } from '../hooks/useProducts';
import { formatPrice, formatIncrement } from '../utils/formatPrice';
import { WHATSAPP_NUMBER, EMAIL } from '../config/contact';
import ProductCard from '../components/common/ProductCard';
import { ProductDetailSkeleton } from '../components/common/Skeleton';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useProduct(id);
  const product = data?.product;

  const [activeImage, setActiveImage] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const containerRef = useRef(null);

  // Related products (same category) — must be called before any early return
  const { data: relatedData } = useProducts({
    category: product?.category,
    limit: 4,
  });

  // --- Early returns (after all hooks) ---

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    return (
      <section className="bg-offwhite py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <ErrorMessage title="Couldn't load product" message="Please check your connection and try again." onRetry={refetch} />
        </div>
      </section>
    );
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

  // Parse sizes and colors (normalize old formats)
  let sizes = [];
  let colors = [];
  try {
    if (product.available_sizes) {
      const raw = typeof product.available_sizes === 'string' ? JSON.parse(product.available_sizes) : product.available_sizes;
      sizes = raw.map((s) => typeof s === 'string' ? { label: s, increment: 0 } : { label: s.label, increment: s.increment || 0 });
    }
  } catch { sizes = []; }
  try {
    if (product.available_colors) {
      const raw = typeof product.available_colors === 'string' ? JSON.parse(product.available_colors) : product.available_colors;
      colors = raw.map((c) => ({ name: c.name, hex: c.hex, increment: c.increment || 0 }));
    }
  } catch { colors = []; }

  // Compute displayed price
  const sizeIncrement = selectedSize !== null && sizes[selectedSize] ? sizes[selectedSize].increment : 0;
  const colorIncrement = selectedColor !== null && colors[selectedColor] ? colors[selectedColor].increment : 0;
  const displayPrice = product.price + sizeIncrement + colorIncrement;

  // Selection labels for inquiry
  const selectedSizeLabel = selectedSize !== null && sizes[selectedSize] ? sizes[selectedSize].label : null;
  const selectedColorLabel = selectedColor !== null && colors[selectedColor] ? colors[selectedColor].name : null;
  const selectionParts = [
    selectedSizeLabel && `Size: ${selectedSizeLabel}`,
    selectedColorLabel && `Color: ${selectedColorLabel}`,
  ].filter(Boolean);
  const selectionText = selectionParts.length > 0 ? ` (${selectionParts.join(', ')})` : '';

  // Inquiry links
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in "${product.name}"${selectionText} (${formatPrice(displayPrice)}). Could you share more details?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(`Inquiry about ${product.name}`);
  const emailBody = encodeURIComponent(
    `Hi BajraGuru,\n\nI'm interested in "${product.name}"${selectionText} priced at ${formatPrice(displayPrice)}.\n\nCould you please share more details?\n\nThank you!`
  );
  const emailUrl = `mailto:${EMAIL}?subject=${emailSubject}&body=${emailBody}`;

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
            <p className="mb-2 font-body text-xs italic text-warm-gray">
              All images are for illustrative purposes. Actual product specifications and appearance may vary as part of continuous product enhancement.
            </p>
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
                  style={{ cursor: images.length > 1 ? 'grab' : 'default' }}
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
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
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
              {formatPrice(displayPrice)}
            </p>

            <p className="mt-6 font-body text-base leading-relaxed text-warm-gray">
              {product.description}
            </p>

            {/* Stock status */}
            <div className="mt-6">
              {product.in_stock ? (
                <span className="inline-flex items-center gap-1.5 font-body text-sm text-sage-dark">
                  <span className="h-2 w-2 rounded-full bg-sage-dark" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-body text-sm text-terracotta">
                  <span className="h-2 w-2 rounded-full bg-terracotta" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Available Sizes */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 font-body text-sm font-medium text-charcoal">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSize(selectedSize === i ? null : i)}
                      className={`rounded-full border px-4 py-1.5 font-body text-sm transition-all duration-200 ${
                        selectedSize === i
                          ? 'border-sage bg-sage text-white shadow-sm'
                          : 'border-sage-light/50 bg-white text-charcoal hover:border-sage'
                      }`}
                    >
                      {size.label}
                      {size.increment > 0 && (
                        <span className={`ml-1 text-xs ${selectedSize === i ? 'text-white/80' : 'text-sage-dark'}`}>
                          {formatIncrement(size.increment)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Available Colors */}
            {colors.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 font-body text-sm font-medium text-charcoal">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedColor(selectedColor === i ? null : i)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200 ${
                        selectedColor === i
                          ? 'border-sage bg-sage/10 shadow-sm'
                          : 'border-transparent hover:border-sage-light/50'
                      }`}
                    >
                      <span
                        className={`h-6 w-6 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === i ? 'border-sage ring-2 ring-sage/30' : 'border-sand'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={`font-body text-sm ${selectedColor === i ? 'text-charcoal font-medium' : 'text-warm-gray'}`}>
                        {color.name}
                      </span>
                      {color.increment > 0 && (
                        <span className="font-body text-xs text-sage-dark">{formatIncrement(color.increment)}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiry Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sage px-6 py-3.5 font-body text-sm font-medium text-white transition-colors hover:bg-sage-dark sm:flex-initial"
              >
                <MessageCircle size={18} />
                Inquire on WhatsApp
              </a>
              <a
                href={emailUrl}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-sage bg-white px-6 py-3.5 font-body text-sm font-medium text-sage-dark transition-colors hover:bg-sage/5 sm:flex-initial"
              >
                <Mail size={18} />
                Email Inquiry
              </a>
            </div>
            <p className="mt-3 font-body text-xs italic text-warm-gray">
              Shipping charges are calculated separately based on product weight, quantity, package dimensions, and delivery destination to ensure accurate and fair pricing.
            </p>
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
                  product={{ ...p, images: p.image_url ? [{ url: p.image_url }] : [] }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
