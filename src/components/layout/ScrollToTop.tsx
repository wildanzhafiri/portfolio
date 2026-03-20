import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './SmoothScroll';

export function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    ScrollTrigger.getAll().forEach((st) => st.kill());

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
