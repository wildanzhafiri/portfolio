import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

const BASE = import.meta.env.BASE_URL;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const triggers: ScrollTrigger[] = [];

      NAV_ITEMS.forEach(({ href }) => {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              setActive(id);
            }
          },
          invalidateOnRefresh: true,
        });

        triggers.push(st);
      });

      return () => {
        triggers.forEach((st) => st.kill());
      };
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(var(--bg),0.85)] backdrop-blur-xl border-b border-[rgba(var(--accent),0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-[rgb(var(--fg))]">W</span>
            <span className="text-[rgb(var(--accent))]">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className={`relative px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))]'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px"
                      style={{ background: 'rgb(var(--accent))' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`${BASE}resume/CV_Muhammad_Wildan_Zhafiri_2025.pdf`}
              download
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border border-[rgba(var(--accent),0.2)] text-[rgb(var(--accent))] hover:bg-[rgba(var(--accent),0.08)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Download className="w-3.5 h-3.5" />
              CV
            </a>

            <button
              className="md:hidden p-2 text-[rgb(var(--fg-muted))]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.nav
              className="absolute top-0 right-0 w-72 h-full p-8 flex flex-col gap-2"
              style={{ background: 'rgb(var(--bg-card))' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setMobileOpen(false)} className="p-2 text-[rgb(var(--fg-muted))]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {NAV_ITEMS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className={`block py-3 text-lg ${
                    active === href.slice(1) ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--fg-muted))]'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {label}
                </motion.a>
              ))}

              <motion.a
                href={`${BASE}resume/CV_Muhammad_Wildan_Zhafiri_2025.pdf`}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="mt-6 group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm border border-[rgba(var(--accent),0.3)] text-[rgb(var(--accent))] hover:bg-[rgba(var(--accent),0.08)] hover:border-[rgba(var(--accent),0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-200"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
