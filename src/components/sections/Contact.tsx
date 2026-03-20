import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticLink } from '../ui/MagneticButton';
import { Github, Linkedin, Instagram, MessageCircle, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'wildanzhaf@gmail.com';
const WHATSAPP = '6281233456496';

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/wildanzhafiri' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-wildan-zhafiri-0a1921289/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/wildanzhf/' },
  { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${WHATSAPP}` },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6" style={{ background: 'rgb(var(--bg))' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="contact-reveal text-xs uppercase tracking-[0.3em] mb-6 opacity-0"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--accent))' }}
        >
          Get in Touch
        </p>

        <h2
          className="contact-reveal text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight opacity-0"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Let's build something{' '}
          <span className="text-[rgb(var(--accent))] glow-text">great</span>{' '}
          together
        </h2>

        <div className="contact-reveal mt-12 opacity-0">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 text-lg md:text-xl hover:text-[rgb(var(--accent))] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-muted))' }}
          >
            {EMAIL}
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
          {copied && (
            <p className="mt-2 text-xs text-green-400" style={{ fontFamily: 'var(--font-mono)' }}>
              Copied to clipboard!
            </p>
          )}
        </div>

        <div className="contact-reveal mt-10 flex justify-center gap-4 opacity-0">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded-full border border-[rgba(var(--fg),0.08)] hover:border-[rgba(var(--accent),0.3)] hover:bg-[rgba(var(--accent),0.06)] transition-all duration-200"
              aria-label={label}
            >
              <Icon
                className="w-5 h-5 text-[rgb(var(--fg-muted))] group-hover:text-[rgb(var(--accent))] transition-colors"
              />
            </a>
          ))}
        </div>

        <div className="contact-reveal mt-12 opacity-0">
          <MagneticLink href={`https://wa.me/${WHATSAPP}`} variant="primary">
            Say Hello
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
