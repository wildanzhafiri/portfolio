import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../../data/experience';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const ctx = gsap.context(() => {
      const cards = track.children;
      let totalWidth = 0;
      for (let i = 0; i < cards.length; i++) {
        totalWidth += (cards[i] as HTMLElement).offsetWidth;
      }
      const scrollDistance = totalWidth - window.innerWidth;

      if (scrollDistance <= 0) return;

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative" style={{ background: 'rgb(var(--bg))' }}>
      <div ref={pinRef} className="h-screen flex flex-col overflow-hidden" style={{ background: 'rgb(var(--bg))' }}>
        <div className="max-w-6xl px-6 pt-24 pb-8 shrink-0">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
            Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Experience
          </h2>
        </div>
        <div ref={trackRef} className="flex flex-row flex-nowrap flex-1 min-h-0">
          {experiences.map((exp, i) => {
            const photoLeft = i % 2 === 0;

            return (
              <div key={exp.year + exp.label} className="exp-card relative h-full w-full min-w-full flex-shrink-0">
                <div className="hidden md:block absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(10rem,22vw,18rem)] font-extrabold leading-none opacity-[0.03]" style={{ fontFamily: 'var(--font-display)' }}>
                    {exp.year}
                  </span>
                </div>

                <div className={`hidden md:grid md:grid-cols-2 h-full ${photoLeft ? '' : 'direction-rtl'}`}>
                  <div className={`relative overflow-hidden ${photoLeft ? '' : 'order-2'}`}>
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className={`absolute inset-0 ${photoLeft ? 'bg-gradient-to-r from-transparent via-transparent to-[rgb(var(--bg))]' : 'bg-gradient-to-l from-transparent via-transparent to-[rgb(var(--bg))]'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--bg),0.3)] to-transparent" />
                  </div>

                  <div className={`flex flex-col justify-center px-12 lg:px-20 py-10 ${photoLeft ? '' : 'order-1'}`}>
                    <div>
                      <span
                        className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(var(--accent), 0.1)',
                          color: 'rgb(var(--accent))',
                          border: '1px solid rgba(var(--accent), 0.2)',
                        }}
                      >
                        {exp.year} · {exp.label}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-[rgb(var(--fg))]" style={{ fontFamily: 'var(--font-display)' }}>
                      {exp.title}
                    </h3>

                    <p className="text-xs uppercase tracking-[0.15em] mb-5" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>
                      {exp.context}
                    </p>

                    <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgb(var(--fg-muted))' }}>
                      {exp.story}
                    </p>

                    {exp.highlights && (
                      <ul className="mt-5 space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-sm" style={{ color: 'rgb(var(--fg-muted))' }}>
                            <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: 'rgb(var(--accent))' }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="md:hidden flex flex-col h-full">
                  <div className="relative h-2/5 shrink-0 overflow-hidden">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-transparent" />
                    <div
                      className="absolute top-3 left-4 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(var(--accent), 0.15)',
                        color: 'rgb(var(--accent))',
                        border: '1px solid rgba(var(--accent), 0.2)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {exp.year}
                    </div>
                  </div>

                  <div className="flex-1 px-6 py-4 overflow-y-auto">
                    <span className="text-[10px] uppercase tracking-[0.2em] mb-2 block" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
                      {exp.label}
                    </span>
                    <h3 className="text-xl font-bold text-[rgb(var(--fg))] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      {exp.title}
                    </h3>
                    <p className="text-xs mb-3" style={{ color: 'rgb(var(--fg-dim))', fontFamily: 'var(--font-mono)' }}>
                      {exp.context}
                    </p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgb(var(--fg-muted))' }}>
                      {exp.story}
                    </p>

                    {exp.highlights && (
                      <ul className="space-y-1.5">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-sm" style={{ color: 'rgb(var(--fg-muted))' }}>
                            <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: 'rgb(var(--accent))' }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
