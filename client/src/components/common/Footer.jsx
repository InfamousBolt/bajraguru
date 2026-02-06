import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const quickLinks = [
  { to: '/shop', label: 'Shop All' },
  { to: '/about', label: 'Our Story' },
  { to: '/feedback', label: 'Reviews' },
];

const customerCare = [
  { to: '/contact', label: 'Contact Us' },
  { to: '/shop', label: 'Shipping & Returns' },
  { to: '/shop', label: 'FAQs' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: 'mailto:hello@bajraguru.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-sand text-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/bajraguru_logo.png" alt="BajraGuru" className="h-10 w-10 rounded-full" />
              <h3 className="font-heading text-2xl font-semibold tracking-wide text-charcoal">
                BajraGuru
              </h3>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-warm-gray">
              Thoughtfully crafted wellness essentials rooted in nature. Elevating
              everyday rituals with clean, conscious beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-charcoal">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-warm-gray transition-colors hover:text-sage-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-charcoal">Customer Care</h4>
            <ul className="mt-4 space-y-2">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-warm-gray transition-colors hover:text-sage-dark"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-charcoal">Connect</h4>
            <div className="mt-4 flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-colors hover:bg-sage hover:text-white"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="mt-6 font-body text-sm text-warm-gray">
              hello@bajraguru.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-sage-light/40 pt-6 text-center">
          <p className="font-body text-xs tracking-wide text-warm-gray">
            &copy; {new Date().getFullYear()} BajraGuru. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
