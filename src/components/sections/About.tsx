import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = import.meta.env.BASE_URL;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
          {
            clipPath: 'inset(0% 0 0 0)',
            scale: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          },
        );
      }

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setTextRef = (i: number) => (el: HTMLElement | null) => {
    textRefs.current[i] = el;
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.45fr_0.55fr] gap-12 lg:gap-20 items-center">
        <div ref={imageRef} className="relative">
          <div className="relative overflow-hidden" style={{ clipPath: 'polygon(0 4%, 100% 0, 96% 100%, 4% 96%)' }}>
            <img src={`${BASE}images/profile2.png`} alt="Wildan" className="w-full aspect-3/4 sm:-translate-y-20 object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-[rgba(var(--accent),0.08)] mix-blend-color" />
          </div>

          <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2" style={{ borderColor: 'rgba(var(--accent), 0.2)' }} />
        </div>

        <div>
          <p ref={setTextRef(0)} className="text-xs uppercase tracking-[0.3em] mb-6 opacity-0" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
            About Me
          </p>

          <h2 ref={setTextRef(1)} className="text-3xl md:text-4xl font-bold mb-8 opacity-0" style={{ fontFamily: 'var(--font-display)' }}>
            A bit of context
          </h2>

          <div className="space-y-5">
            <p ref={setTextRef(2)} className="text-base leading-relaxed opacity-0 text-justify" style={{ color: 'rgb(var(--fg-muted))' }}>
              I'm currently in my third year studying Information Technology at Brawijaya University, with a strong interest in web development. I focus on building projects that are not only visually appealing but also easy to use.
            </p>

            <p ref={setTextRef(3)} className="text-base leading-relaxed opacity-0 text-justify" style={{ color: 'rgb(var(--fg-muted))' }}>
              I’ve been involved in projects where I collaborate with people from different backgrounds, exchanging ideas and working toward shared outcomes. These experiences have helped me improve how I approach problems and adapt to
              different situations.
            </p>

            <div ref={setTextRef(4)} className="mt-8 pt-6 border-t border-[rgba(var(--fg),0.08)] opacity-0">
              <div className="grid grid-cols-3 gap-6 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'rgb(var(--accent))' }}>
                    3+
                  </p>
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'rgb(var(--fg-dim))' }}>
                    Years Coding
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'rgb(var(--accent))' }}>
                    12+
                  </p>
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'rgb(var(--fg-dim))' }}>
                    Projects Built
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'rgb(var(--accent))' }}>
                    5+
                  </p>
                  <span className="text-xs uppercase tracking-wider" style={{ color: 'rgb(var(--fg-dim))' }}>
                    Team Collabs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
