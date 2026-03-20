import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techStack, categoryLabels, type TechItem } from '../../data/techstack';
import { Terminal, ChevronRight, Folder, FileCode2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<TechItem['category'], string> = {
  frontend: '0 240 255',
  'data-api': '52 211 153',
  tools: '251 191 36',
  'also-used': '168 85 247',
};

const categoryIcons: Record<TechItem['category'], string> = {
  frontend: '>>',
  'data-api': '~~',
  tools: '##',
  'also-used': '**',
};

const categories = Object.keys(categoryLabels) as TechItem['category'][];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openCat, setOpenCat] = useState<TechItem['category'] | null>(null);
  const [typedLines, setTypedLines] = useState<string[]>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    return [
      isMobile
        ? '> Open the folders below to explore my skills.'
        : '> Open the folders aside to explore my skills.',
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const runBootSequence = useCallback(() => {
    delayRef.current = setTimeout(() => {
      setTypedLines([]);

      const isMobile = window.innerWidth < 1024;

      const lines = [
        '$ cat ~/skills.config',
        'Loading skill tree...',
        `Found ${techStack.length} technologies across ${categories.length} categories.`,
        '$ ls ./categories/',
        ...categories.map(
          (c) => `  ${categoryIcons[c]} ${categoryLabels[c]}/ (${techStack.filter((t) => t.category === c).length} items)`
        ),
        '',
        isMobile
          ? '> Open the folders below to explore my skills.'
          : '> Open the folders aside to explore my skills.',
      ];

      setIsTyping(true);
      let i = 0;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (i < lines.length) {
          const line = lines[i];
          setTypedLines((prev) => [...prev, line ?? '']);
          i++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);
        }
      }, 120);
    }, 1500);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          if (!hasAnimated) {
            runBootSequence();
            setHasAnimated(true);
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hasAnimated, runBootSequence]);

  const handleCategoryClick = (cat: TechItem['category']) => {
    if (openCat === cat) {
      setOpenCat(null);
      setTypedLines((prev) => [
        ...prev,
        `$ close ./categories/${cat.replace(' ', '-')}/`,
      ]);
      return;
    }
    setOpenCat(cat);
    setTypedLines((prev) => [
      ...prev,
      `$ open ./categories/${cat.replace(' ', '-')}/`,
    ]);
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}
          >
            Tech Stack
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tools I use to build things
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-[rgba(var(--fg),0.08)] bg-[rgb(var(--bg-card))] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(var(--fg),0.06)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span
                className="ml-2 text-[10px] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}
              >
                <Terminal className="w-3 h-3 inline mr-1" />
                skills.sh
              </span>
            </div>

            <div
              className="p-4 h-[320px] md:h-[400px] overflow-y-auto custom-scrollbar"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: '1.6' }}
            >
              {typedLines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {!line || line === '' ? (
                    <br />
                  ) : line.startsWith('$') ? (
                    <span>
                      <span style={{ color: 'rgb(52 211 153)' }}>~</span>
                      <span style={{ color: 'rgb(var(--fg-dim))' }}>{line}</span>
                    </span>
                  ) : line.startsWith('  ') ? (
                    <span style={{ color: 'rgb(var(--fg-muted))' }}>{line}</span>
                  ) : (
                    <span style={{ color: 'rgb(var(--fg-dim))' }}>{line}</span>
                  )}
                </div>
              ))}
              <span
                className="inline-block w-2 h-4 align-middle"
                style={{
                  background: isTyping ? 'rgb(var(--accent))' : 'rgb(var(--fg-dim))',
                  animation: 'pulse-glow 1s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            {categories.map((cat) => {
              const items = techStack.filter((t) => t.category === cat);
              const color = categoryColors[cat];
              const isOpen = openCat === cat;

              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-[rgba(var(--fg),0.08)] bg-[rgb(var(--bg-card))] overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isOpen ? `rgba(${color}, 0.25)` : undefined,
                  }}
                >
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-[rgba(var(--fg),0.02)]"
                  >
                    <ChevronRight
                      className="w-4 h-4 transition-transform duration-300 shrink-0"
                      style={{
                        color: `rgb(${color})`,
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    />
                    <Folder
                      className="w-4 h-4 shrink-0"
                      style={{ color: `rgb(${color})` }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: 'var(--font-mono)', color: `rgb(${color})` }}
                    >
                      {categoryLabels[cat]}
                    </span>
                    <span
                      className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: `rgb(${color})`,
                        background: `rgba(${color}, 0.1)`,
                      }}
                    >
                      {items.length}
                    </span>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      maxHeight: isOpen ? `${items.length * 52 + 16}px` : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 pb-4 space-y-1">
                      {items.map((item, idx) => (
                        <div
                          key={item.name}
                          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[rgba(var(--fg),0.03)]"
                          style={{
                            animationDelay: `${idx * 50}ms`,
                          }}
                        >
                          <FileCode2
                            className="w-3.5 h-3.5 shrink-0 transition-colors"
                            style={{ color: `rgba(${color}, 0.5)` }}
                          />
                          <span
                            className="text-sm text-[rgb(var(--fg-muted))] group-hover:text-[rgb(var(--fg))] transition-colors"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            {item.name}
                          </span>
                          <div className="ml-auto flex items-center gap-2">
                            <div
                              className="h-1 rounded-full transition-all duration-500 group-hover:w-12 w-0"
                              style={{ background: `rgb(${color})` }}
                            />
                            <span
                              className="text-[9px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ fontFamily: 'var(--font-mono)', color: `rgb(${color})` }}
                            >
                              {categoryLabels[cat]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
