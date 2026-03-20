import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useUIStore } from '../../app/store/ui.store';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  cursorVariant?: 'view' | 'hover' | 'default';
}

export function TiltCard({ children, className = '', cursorVariant = 'view' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const setCursor = useUIStore((s) => s.setCursorVariant);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setCursor('default');
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setCursor(cursorVariant)}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
