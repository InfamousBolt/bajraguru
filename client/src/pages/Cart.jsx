import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/common/Button';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-offwhite px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sand">
            <ShoppingBag size={32} className="text-warm-gray" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 font-heading text-3xl font-bold text-charcoal">Your Cart is Empty</h2>
          <p className="mt-2 font-body text-warm-gray">
            Discover our collection of sacred treasures.
          </p>
          <Link to="/shop" className="mt-6 inline-block">
            <Button size="lg">
              Continue Shopping
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
          Shopping Cart
        </h1>
        <p className="mt-2 font-body text-warm-gray">
          {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="mb-4 flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
                >
                  {/* Image */}
                  <Link to={`/shop/${item._id}`} className="shrink-0">
                    <div className="h-28 w-28 overflow-hidden rounded-xl bg-sand">
                      <img
                        src={item.images?.[0]?.url || '/placeholder.jpg'}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link to={`/shop/${item._id}`}>
                        <h3 className="font-heading text-lg font-semibold text-charcoal hover:text-sage-dark">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-0.5 font-body text-sm capitalize text-warm-gray">
                        {item.category}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div className="flex items-center rounded-full border border-sage-light/50">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="flex h-9 w-9 items-center justify-center text-charcoal transition-colors hover:text-sage-dark disabled:opacity-40"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-body text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-charcoal transition-colors hover:text-sage-dark"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="font-body text-base font-semibold text-charcoal">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-warm-gray transition-colors hover:text-terracotta"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="mt-4 font-body text-sm text-warm-gray hover:text-terracotta hover:underline"
            >
              Clear cart
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="font-heading text-xl font-semibold text-charcoal">
                Order Summary
              </h3>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between font-body text-sm text-warm-gray">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-warm-gray">
                  <span>Shipping</span>
                  <span className="text-sage-dark">Free</span>
                </div>
                <div className="border-t border-sand pt-3">
                  <div className="flex justify-between font-body text-lg font-semibold text-charcoal">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>

              <Button size="lg" className="mt-6 w-full">
                Proceed to Checkout
              </Button>

              <Link
                to="/shop"
                className="mt-4 block text-center font-body text-sm text-sage-dark hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
