import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '../../app/store/ui.store';
import { getLenis } from '../layout/SmoothScroll';

interface MagneticButtonProps {
  children: ReactNode;
  as?: string;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const SHINE_PRIMARY = 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)';
const SHINE_OUTLINE = 'linear-gradient(120deg, transparent 30%, rgba(0,240,255,0.1) 50%, transparent 70%)';

export function MagneticButton({
  children,
  href,
  download,
  target,
  rel,
  onClick,
  className = '',
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursor = useUIStore((s) => s.setCursorVariant);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setCursor('default');
  };

  const baseStyles =
    variant === 'primary'
      ? 'bg-[rgb(var(--accent))] text-[rgb(var(--bg))] font-semibold hover:shadow-[0_0_30px_rgba(var(--accent),0.4)]'
      : 'border border-[rgba(var(--accent),0.3)] text-[rgb(var(--accent))] hover:bg-[rgba(var(--accent),0.08)] hover:border-[rgba(var(--accent),0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]';

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-all duration-200 cursor-pointer overflow-hidden ${baseStyles} ${className}`}
      style={{ x: springX, y: springY, fontFamily: 'var(--font-mono)' }}
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
        style={{ background: variant === 'primary' ? SHINE_PRIMARY : SHINE_OUTLINE }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {href ? (
          <a href={href} download={download} target={target} rel={rel} className="contents">
            {children}
          </a>
        ) : (
          children
        )}
      </span>
    </motion.div>
  );
}

export function MagneticLink({
  children,
  href,
  download,
  className = '',
  variant = 'primary',
  icon,
  iconPosition = 'right',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const setCursor = useUIStore((s) => s.setCursorVariant);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setCursor('default');
  };

  const baseStyles =
    variant === 'primary'
      ? 'bg-[rgb(var(--accent))] text-[rgb(var(--bg))] font-semibold hover:shadow-[0_0_30px_rgba(var(--accent),0.4)]'
      : 'border border-[rgba(var(--accent),0.3)] text-[rgb(var(--accent))] hover:bg-[rgba(var(--accent),0.08)] hover:border-[rgba(var(--accent),0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      onClick={handleClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setCursor('hover')}
      onMouseLeave={reset}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ x: springX, y: springY, fontFamily: 'var(--font-mono)' }}
      className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-all duration-200 cursor-pointer overflow-hidden ${baseStyles} ${className}`}
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
        style={{ background: variant === 'primary' ? SHINE_PRIMARY : SHINE_OUTLINE }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </motion.a>
  );
}
