import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  scrub?: boolean;
}

export function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = children.split(' ');
    el.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`)
      .join(' ');

    const innerSpans = el.querySelectorAll('span > span');

    const tl = gsap.timeline({
      scrollTrigger: scrub
        ? {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          }
        : {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
    });

    tl.to(innerSpans, {
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.04,
      delay,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, delay, scrub]);

  return <Tag ref={containerRef as React.RefObject<never>} className={className}>{children}</Tag>;
}
