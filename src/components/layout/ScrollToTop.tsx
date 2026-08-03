import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './SmoothScroll';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const lenis = getLenis();
    if (hash) {
      const id = hash.slice(1);
      let attempts = 0;
      let raf = 0;
      const timers: ReturnType<typeof setTimeout>[] = [];

      const scrollToSection = (immediate: boolean) => {
        const el = document.getElementById(id);
        if (!el) return false;
        if (lenis) {
          lenis.scrollTo(el, { offset: -80, immediate });
        } else {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
        }
        return true;
      };

      const tryScroll = () => {
        if (scrollToSection(true)) {
          // Re-measure after ScrollTrigger builds the pin spacer, then correct.
          timers.push(
            setTimeout(() => {
              ScrollTrigger.refresh();
              scrollToSection(true);
            }, 350),
          );
          return;
        }
        if (attempts++ < 30) raf = requestAnimationFrame(tryScroll);
      };

      raf = requestAnimationFrame(tryScroll);
      return () => {
        cancelAnimationFrame(raf);
        timers.forEach(clearTimeout);
      };
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, hash]);

  return null;
}
