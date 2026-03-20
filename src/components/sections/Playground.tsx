import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Palette, Gamepad2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXPERIMENTS = [
  { icon: Sparkles, label: 'Generative Visuals', status: 'Soon' },
  { icon: Palette, label: 'CSS Art', status: 'Soon' },
  { icon: Gamepad2, label: 'Mini Games', status: 'Soon' },
];

export function Playground() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.playground-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="playground" ref={sectionRef} className="relative py-32 px-6" style={{ background: 'rgb(var(--bg))' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}
          >
            Experiments
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Playground
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {EXPERIMENTS.map(({ icon: Icon, label, status }) => (
            <div
              key={label}
              className="playground-card opacity-0 group relative overflow-hidden rounded-2xl border border-[rgba(var(--fg),0.06)] bg-[rgb(var(--bg-card))] p-8 flex flex-col items-center text-center gap-4 hover:border-[rgba(var(--accent),0.15)] transition-colors"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent),0.06),transparent_70%)]" />

              <div className="relative p-4 rounded-full border border-[rgba(var(--accent),0.1)] bg-[rgba(var(--accent),0.04)]">
                <Icon className="w-6 h-6" style={{ color: 'rgb(var(--accent))' }} />
              </div>

              <h3 className="text-sm font-semibold text-[rgb(var(--fg))]" style={{ fontFamily: 'var(--font-display)' }}>
                {label}
              </h3>

              <span
                className="text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-[rgba(var(--fg),0.08)]"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm" style={{ color: 'rgb(var(--fg-dim))', fontFamily: 'var(--font-mono)' }}>
          More experiments coming soon.
        </p>
      </div>
    </section>
  );
}
