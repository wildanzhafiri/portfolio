import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowLeft, ArrowRight, ExternalLink, GithubIcon } from 'lucide-react';
import { useState } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const projectIdx = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIdx];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Project not found
          </h1>
          <Link to="/" className="text-[rgb(var(--accent))] hover:underline" style={{ fontFamily: 'var(--font-mono)' }}>
            &larr; Back home
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = projectIdx > 0 ? projects[projectIdx - 1] : null;
  const nextProject = projectIdx < projects.length - 1 ? projects[projectIdx + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgba(var(--bg),0.6)] to-transparent" />

        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-[rgba(var(--fg),0.15)] bg-[rgba(var(--bg),0.6)] backdrop-blur-md text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--fg))] transition-colors"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="absolute bottom-8 left-6 right-6 md:left-12 z-10">
          <span
            className="text-xs uppercase tracking-[0.2em] mb-2 block"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}
          >
            {project.category} · {project.year}
          </span>
          <h1
            className="text-3xl md:text-5xl font-extrabold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.title}
          </h1>
          <p className="mt-2 text-lg" style={{ color: 'rgb(var(--fg-muted))' }}>
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-[rgba(var(--fg),0.06)]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>Role</span>
            <p className="mt-1 text-sm text-[rgb(var(--fg))]">{project.role}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>Year</span>
            <p className="mt-1 text-sm text-[rgb(var(--fg))]">{project.year}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>Category</span>
            <p className="mt-1 text-sm text-[rgb(var(--fg))] capitalize">{project.category}</p>
          </div>
          <div className="flex gap-3 items-end">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--accent))] hover:underline">
                <ExternalLink className="w-4 h-4" /> Live
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--accent))] hover:underline">
                <GithubIcon className="w-4 h-4" /> Code
              </a>
            )}
          </div>
        </div>

        <div className="py-10">
          <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
            About this project
          </h3>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: 'rgb(var(--fg-muted))' }}>
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-xs border border-[rgba(var(--accent),0.15)] text-[rgb(var(--accent))] bg-[rgba(var(--accent),0.04)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
            Key Features
          </h3>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm" style={{ color: 'rgb(var(--fg-muted))' }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'rgb(var(--accent))' }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {project.images.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-semibold mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}>
              Gallery
            </h3>
            <div className="columns-1 md:columns-2 gap-4">
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-[rgba(var(--fg),0.06)] cursor-pointer group mb-4 break-inside-avoid"
                  onClick={() => setLightboxIdx(i)}
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="block w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[rgba(var(--accent),0.03)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-10 border-t border-[rgba(var(--fg),0.06)]">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.slug}`}
              className="group flex items-center gap-3 text-sm text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {prevProject.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              to={`/project/${nextProject.slug}`}
              className="group flex items-center gap-3 text-sm text-[rgb(var(--fg-muted))] hover:text-[rgb(var(--accent))] transition-colors"
            >
              {nextProject.title}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 cursor-pointer"
          onClick={() => setLightboxIdx(null)}
        >
          <img
            src={project.images[lightboxIdx]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-6 text-center text-sm text-white/50" style={{ fontFamily: 'var(--font-mono)' }}>
            {lightboxIdx + 1} / {project.images.length} — Click anywhere to close
          </div>
        </div>
      )}
    </motion.div>
  );
}
