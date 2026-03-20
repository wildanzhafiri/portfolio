import { useEffect, useRef } from 'react';
import { useUIStore } from '../../app/store/ui.store';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cursorVariant = useUIStore((s) => s.cursorVariant);

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = '1';
    ring.style.opacity = '1';

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    let raf: number;
    const followRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      raf = requestAnimationFrame(followRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(followRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isView = cursorVariant === 'view';
  const isHover = cursorVariant === 'hover';

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full bg-white transition-[width,height] duration-200"
          style={{
            width: isView ? 0 : 8,
            height: isView ? 0 : 8,
          }}
        />
      </div>

      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none opacity-0 mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div
          className="flex items-center justify-center rounded-full border border-white/60 transition-all duration-300"
          style={{
            width: isView ? 80 : isHover ? 56 : 40,
            height: isView ? 80 : isHover ? 56 : 40,
          }}
        >
          {isView && (
            <span className="text-[11px] font-medium tracking-wider uppercase text-white">
              View
            </span>
          )}
        </div>
      </div>
    </>
  );
}
