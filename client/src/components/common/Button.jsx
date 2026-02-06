import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-sage text-white hover:bg-sage-dark',
  secondary:
    'bg-transparent border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
  accent: 'bg-gold text-white hover:bg-gold-light',
};

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-2.5 text-sm',
  lg: 'px-9 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full font-body font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
