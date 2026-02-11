import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Catalog' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 bg-offwhite/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/bajraguru_logo.png" alt="BajraGuru" className="h-10 w-10 rounded-full" />
          <span className="font-heading text-2xl font-semibold tracking-wide text-charcoal">
            <span className="lg:hidden">Bajraguru</span>
            <span className="hidden lg:inline">Bajraguru- The Buddhist Shop</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-body text-sm tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-sage-dark border-b-2 border-sage-dark pb-0.5'
                      : 'text-charcoal hover:text-sage-dark'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="text-charcoal md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-sand md:hidden"
          >
            <ul className="flex flex-col gap-1 bg-offwhite px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-3 font-body text-sm tracking-widest uppercase transition-colors ${
                        isActive
                          ? 'bg-sage-light/30 text-sage-dark'
                          : 'text-charcoal hover:bg-sand'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
