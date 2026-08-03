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
    <section id="about" ref={sectionRef} className="relative py-32 px-6" aria-label="About Wildan">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.45fr_0.55fr] gap-12 lg:gap-20 items-center">
        <div ref={imageRef} className="relative">
          <div className="relative overflow-hidden" style={{ clipPath: 'polygon(0 4%, 100% 0, 96% 100%, 4% 96%)' }}>
            <img
              src={`${BASE}images/profile2.webp`}
              alt="Muhammad Wildan Zhafiri — Frontend Developer, IT student at Brawijaya University"
              className="w-full aspect-3/4 sm:-translate-y-20 object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
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
              Information Technology undergraduate at Brawijaya University with three years of hands-on experience in frontend and backend web development. I have worked with JavaScript-based stacks, API integration, responsive interfaces,
              state management, and product iteration. I’m especially interested in building modern web products that connect interface, logic, data, and real user needs into a clear and reliable experience.
            </p>

            <p ref={setTextRef(3)} className="text-base leading-relaxed opacity-0 text-justify" style={{ color: 'rgb(var(--fg-muted))' }}>
              I also use AI intentionally in both product development and my engineering workflow to understand codebases, break down tasks, explore solutions, debug, refactor, and improve execution speed while keeping final technical and
              product decisions in my own hands. Beyond using AI as a development tool, I’m interested in building AI-powered features that fit naturally into real user flows, while continuing to explore Web3 through concepts such as
              ownership, transparency, and decentralized systems.
            </p>

            <div ref={setTextRef(4)} className="mt-8 pt-6 border-t border-[rgba(var(--fg),0.08)] opacity-0">
              <div className="grid grid-cols-3 gap-6 text-center" style={{ fontFamily: 'var(--font-mono)' }} role="list" aria-label="Key stats">
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
