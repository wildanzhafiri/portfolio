import { lazy, Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MagneticLink } from '../ui/MagneticButton';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import { ChevronDown, GlobeIcon } from 'lucide-react';

const HeroScene = lazy(() => import('../three/HeroScene'));

export function Hero() {
  const { normalizedX, normalizedY } = useMousePosition();
  const { enable3D } = useDeviceCapability();
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (greetingRef.current) {
        gsap.fromTo(greetingRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0 });
      }

      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.05,
            delay: 0.3,
          },
        );
      }

      if (sloganRef.current) {
        gsap.fromTo(sloganRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 1.4 });
      }

      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.7 });
      }

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 2.0 });
      }
    });

    return () => ctx.revert();
  }, []);

  const nameChars = 'Wildan'.split('');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {enable3D ? (
        <Suspense fallback={null}>
          <HeroScene mouseX={normalizedX} mouseY={normalizedY} />
        </Suspense>
      ) : (
        <CSSFallbackBg />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p ref={greetingRef} className="text-lg md:text-xl opacity-0 mb-4" style={{ color: 'rgb(var(--fg-muted))', fontFamily: 'var(--font-body)' }}>
          Hey there, I'm
        </p>

        <h1 ref={nameRef} className="text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none tracking-tight" style={{ fontFamily: 'var(--font-display)', perspective: '600px' }}>
          {nameChars.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="char inline-block text-[rgb(var(--fg))]">{char}</span>
            </span>
          ))}
          <span className="text-[rgb(var(--accent))] glow-text">.</span>
        </h1>

        <p ref={sloganRef} className="mt-6 text-xl md:text-2xl opacity-0" style={{ color: 'rgb(var(--fg-muted))', fontFamily: 'var(--font-display)', fontWeight: 500 }}>
          I build things that <span className="text-[rgb(var(--accent))] glow-text">live</span> on the internet
        </p>

        <div ref={subtitleRef} className="mt-4 opacity-0 flex justify-center">
          <p className="text-xs md:text-sm text-center" style={{ color: 'rgb(var(--fg-dim))', fontFamily: 'var(--font-mono)' }}>
            <GlobeIcon
              className="w-3.5 h-3.5 md:w-4 md:h-4 inline-block align-middle mr-2 sm:mr-3 text-[rgb(var(--accent))] animate-pulse"
              style={{
                marginTop: '-2px',
              }}
            />
            Web Developer · Solving real problems through technology
          </p>
        </div>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0">
          <MagneticLink href="#projects" variant="primary">
            See My Work
          </MagneticLink>
          <MagneticLink href="#contact" variant="outline">
            Get In Touch
          </MagneticLink>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <ChevronDown className="w-6 h-6 animate-scroll-hint" style={{ color: 'rgba(var(--accent), 0.5)' }} />
      </motion.div>
    </section>
  );
}

function CSSFallbackBg() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: 'rgb(var(--accent))' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10" style={{ background: 'rgb(var(--accent))' }} />
      <motion.div className="absolute top-[20%] right-[15%] w-16 h-16 border border-[rgba(var(--accent),0.15)] rotate-45" animate={{ rotate: [45, 225], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-12 h-12 rounded-full border border-[rgba(var(--accent),0.1)]"
        animate={{ scale: [1, 1.3, 1], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
