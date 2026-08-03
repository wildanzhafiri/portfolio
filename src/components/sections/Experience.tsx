import { useEffect, useRef, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { experiences, type Experience } from '../../data/experience';
import { getLenis } from '../layout/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const stackState = (distanceFromTop: number) => ({
  y: distanceFromTop * 18,
  scale: 1 - distanceFromTop * 0.032,
  rotate: distanceFromTop === 0 ? 0 : (distanceFromTop % 2 === 0 ? 1 : -1) * Math.min(distanceFromTop, 3) * 0.65,
  opacity: 1 - Math.min(distanceFromTop, 4) * 0.06,
});

const cardShadow =
  '0 0 0 1px rgba(var(--accent), 0.2), 0 20px 50px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.06)';

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeExp, setActiveExp] = useState<Experience | null>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const stack = stackRef.current;
    if (!section || !pin || !stack) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.exp-stack-card');
      if (cards.length <= 1) return;

      gsap.set(cards, {
        transformOrigin: '50% 82%',
        force3D: true,
        backfaceVisibility: 'hidden',
      });

      cards.forEach((card, index) => {
        const state = stackState(index);
        gsap.set(card, {
          ...state,
          zIndex: cards.length - index,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 0.82 * (cards.length - 1), 820)}`,
          scrub: 0.6,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            gsap.set(cards, { willChange: self.isActive ? 'transform, opacity' : 'auto' });
          },
        },
      });

      cards.slice(0, -1).forEach((card, index) => {
        const step = index;

        timeline.to(
          card,
          {
            yPercent: -118,
            xPercent: index % 2 === 0 ? -4 : 4,
            rotate: index % 2 === 0 ? -6 : 6,
            scale: 0.94,
            opacity: 0,
            ease: 'none',
            duration: 1,
          },
          step,
        );

        cards.slice(index + 1).forEach((nextCard, nextIndex) => {
          const state = stackState(nextIndex);

          timeline.to(
            nextCard,
            {
              ...state,
              yPercent: 0,
              xPercent: 0,
              ease: 'none',
              duration: 1,
            },
            step,
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeExp) return;

    const lenis = getLenis();
    lenis?.stop();
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      lenis?.start();
      document.body.style.overflow = original;
    };
  }, [activeExp]);

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden" aria-label="Experience" style={{ background: 'rgb(var(--bg))' }}>
      <div
        ref={pinRef}
        className="relative flex h-[100svh] min-h-[620px] flex-col overflow-hidden px-5 py-16 md:min-h-[720px] md:px-8 md:py-20 lg:px-12"
        style={{ background: 'rgb(var(--bg))' }}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgba(var(--bg), 0) 100%)' }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl shrink-0 items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
              Journey
            </p>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              Experience
            </h2>
          </div>

          <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.16em] md:flex" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>
            <span className="h-px w-14 bg-[rgba(var(--accent),0.45)]" />
            Scroll stack
          </div>
        </div>

        <div ref={stackRef} className="relative z-10 mx-auto mt-5 flex w-full max-w-6xl min-h-0 flex-1 items-center justify-center md:mt-8">
          <div className="relative h-full max-h-[600px] w-full">
            {experiences.map((exp, i) => (
              <article
                key={exp.year + exp.label}
                className="exp-stack-card absolute inset-0 flex w-full flex-col overflow-hidden rounded-[1.5rem] border-2 bg-[rgb(var(--bg-card))] md:flex-row"
                style={{ borderColor: 'rgba(var(--accent), 0.3)', contain: 'layout paint', boxShadow: cardShadow }}
              >
                <div className="relative h-[38%] w-full shrink-0 overflow-hidden md:h-full md:w-[46%]">
                  <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--bg),0.85)] via-[rgba(var(--bg),0.05)] to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[rgba(var(--bg-card),0.92)]" />
                  <div
                    className="absolute left-4 top-4 rounded-full border px-3 py-1.5 text-xs font-bold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(var(--bg), 0.58)',
                      borderColor: 'rgba(var(--accent), 0.24)',
                      color: 'rgb(var(--accent))',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
                  </div>
                </div>
                <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center overflow-hidden px-6 py-5 md:w-[54%] md:px-10 lg:px-14">
                  <span
                    className="mb-3 inline-flex w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold md:mb-4"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(var(--accent), 0.1)',
                      color: 'rgb(var(--accent))',
                      borderColor: 'rgba(var(--accent), 0.2)',
                    }}
                  >
                    {exp.year} / {exp.label}
                  </span>

                  <h3 className="mb-2 shrink-0 text-lg font-bold leading-tight text-[rgb(var(--fg))] md:mb-3 md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {exp.title}
                  </h3>

                  <p className="mb-3 shrink-0 text-xs uppercase tracking-[0.15em] md:mb-5" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>
                    {exp.context}
                  </p>

                  <p className="line-clamp-2 max-w-xl text-sm leading-relaxed md:line-clamp-3" style={{ color: 'rgb(var(--fg-muted))' }}>
                    {exp.story}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveExp(exp)}
                    className="group mt-4 inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-colors md:mt-6"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'rgb(var(--accent))',
                      borderColor: 'rgba(var(--accent), 0.4)',
                      background: 'rgba(var(--accent), 0.08)',
                    }}
                  >
                    View details
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>


      <AnimatePresence>
        {activeExp && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setActiveExp(null)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeExp.title}
              className="relative flex max-h-[85svh] w-full max-w-lg flex-col overflow-hidden rounded-[1.5rem] border-2"
              style={{ borderColor: 'rgba(var(--accent), 0.3)', background: 'rgb(var(--bg-card))', boxShadow: cardShadow }}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-56">
                <img src={activeExp.image} alt={activeExp.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--bg-card),1)] via-[rgba(var(--bg-card),0.1)] to-transparent" />

                <button
                  type="button"
                  onClick={() => setActiveExp(null)}
                  aria-label="Close"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border"
                  style={{ background: 'rgba(var(--bg), 0.58)', borderColor: 'rgba(var(--accent), 0.24)', color: 'rgb(var(--accent))' }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8" data-lenis-prevent>
                <span
                  className="mb-4 inline-flex w-fit rounded-full border px-3 py-1.5 text-xs font-bold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(var(--accent), 0.1)',
                    color: 'rgb(var(--accent))',
                    borderColor: 'rgba(var(--accent), 0.2)',
                  }}
                >
                  {activeExp.year} / {activeExp.label}
                </span>

                <h3 className="mb-3 text-2xl font-bold text-[rgb(var(--fg))]" style={{ fontFamily: 'var(--font-display)' }}>
                  {activeExp.title}
                </h3>

                <p className="mb-5 text-xs uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>
                  {activeExp.context}
                </p>

                <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--fg-muted))' }}>
                  {activeExp.story}
                </p>

                {activeExp.highlights && (
                  <ul className="mt-5 space-y-2">
                    {activeExp.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm" style={{ color: 'rgb(var(--fg-muted))' }}>
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: 'rgb(var(--accent))' }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
