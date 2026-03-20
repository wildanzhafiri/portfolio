import { useRef, type ReactNode, type ElementType } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '../../app/store/ui.store';
import { getLenis } from '../layout/SmoothScroll';

interface MagneticButtonProps {
  children: ReactNode;
  as?: ElementType;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
}

export function MagneticButton({
  children,
  as: Tag = 'button',
  href,
  download,
  target,
  rel,
  onClick,
  className = '',
  variant = 'primary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
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
      ? 'bg-[rgb(var(--accent))] text-[rgb(var(--bg))] font-semibold hover:shadow-[0_0_30px_rgba(var(--accent),0.3)]'
      : 'border border-[rgba(var(--accent),0.3)] text-[rgb(var(--accent))] hover:bg-[rgba(var(--accent),0.08)] hover:border-[rgba(var(--accent),0.5)]';

  const props = {
    ref,
    href,
    download,
    target,
    rel,
    onClick,
    onMouseMove: handleMouse,
    onMouseEnter: () => setCursor('hover'),
    onMouseLeave: reset,
    className: `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-all duration-200 ${baseStyles} ${className}`,
    style: { x: springX, y: springY },
  };

  return <motion.div {...props}>{children}</motion.div>;

}

export function MagneticLink({
  children,
  href,
  download,
  className = '',
  variant = 'primary',
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
      ? 'bg-[rgb(var(--accent))] text-[rgb(var(--bg))] font-semibold hover:shadow-[0_0_30px_rgba(var(--accent),0.3)]'
      : 'border border-[rgba(var(--accent),0.3)] text-[rgb(var(--accent))] hover:bg-[rgba(var(--accent),0.08)] hover:border-[rgba(var(--accent),0.5)]';

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
      style={{ x: springX, y: springY }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-all duration-200 cursor-pointer ${baseStyles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
