import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';
import { TiltCard } from '../ui/TiltCard';
import { ExternalLink, GithubIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToProject = (slug: string) => {
    navigate(`/project/${slug}`);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6" style={{ background: 'rgb(var(--bg))' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}
          >
            Selected Work
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <TiltCard key={project.slug} className="project-card opacity-0">
              <div
                className="group overflow-hidden rounded-2xl border border-[rgba(var(--fg),0.06)] cursor-pointer transition-all duration-300 hover:border-[rgba(var(--accent),0.2)]"
                onClick={() => goToProject(project.slug)}
              >
                <div className="relative overflow-hidden h-52 md:h-60">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 bg-[rgb(var(--bg-card))]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3
                        className="text-lg font-bold text-[rgb(var(--fg))] truncate"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm truncate" style={{ color: 'rgb(var(--fg-dim))' }}>
                        {project.tagline}
                      </p>
                    </div>
                    <span
                      className="shrink-0 text-xs px-2 py-1 rounded border border-[rgba(var(--accent),0.15)] text-[rgb(var(--accent))]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(var(--fg),0.05)] text-[rgb(var(--fg-muted))]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
