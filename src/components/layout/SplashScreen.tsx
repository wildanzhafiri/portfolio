import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../app/store/ui.store';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import SplashCanvas from './SplashCanvas';

type Phase = 'text' | 'pause' | 'forming' | 'hold' | 'explode' | 'done';

const TIMING = {
  text: 1400,
  pause: 1500,
  forming: 2000,
  hold: 800,
  explode: 700,
  fade: 500,
} as const;

export function SplashScreen() {
  const setSplashDone = useUIStore((s) => s.setSplashDone);
  const { enable3D, tier } = useDeviceCapability();
  const [phase, setPhase] = useState<Phase>('text');
  const [progress, setProgress] = useState(0);
  const [textStarted, setTextStarted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [shake, setShake] = useState(false);
  const startRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const finishTimeoutRef = useRef<number | null>(null);
  const textStartedRef = useRef(false);
  const showScene = phase === 'forming' || phase === 'hold' || phase === 'explode';

  useEffect(() => {
    let cancelled = false;
    startRef.current = performance.now();

    const animate = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startRef.current;

      const t1 = TIMING.text;
      const t1b = t1 + TIMING.pause;
      const t2 = t1b + TIMING.forming;
      const t3 = t2 + TIMING.hold;
      const t4 = t3 + TIMING.explode;

      if (elapsed < t1) {
        if (!textStartedRef.current) {
          textStartedRef.current = true;
          setTextStarted(true);
        }
        setPhase('text');
        setProgress(elapsed / t1);
        frameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < t1b) {
        setPhase('pause');
        setProgress(1);
        frameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < t2) {
        setPhase('forming');
        setProgress((elapsed - t1b) / TIMING.forming);
        frameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < t3) {
        setPhase('hold');
        setProgress((elapsed - t2) / TIMING.hold);
        frameRef.current = requestAnimationFrame(animate);
      } else if (elapsed < t4) {
        const p = (elapsed - t3) / TIMING.explode;
        setPhase('explode');
        setProgress(p);
        if (tier === 'high' && p < 0.15) setShake(true);
        else setShake(false);
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('done');
        setProgress(1);
        setShake(false);
        setVisible(false);
        finishTimeoutRef.current = window.setTimeout(() => setSplashDone(true), TIMING.fade);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (finishTimeoutRef.current !== null) clearTimeout(finishTimeoutRef.current);
    };
  }, [setSplashDone, tier]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: 'rgb(6, 8, 15)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: TIMING.fade / 1000, ease: 'easeInOut' }}
        >

          <div
            className="absolute inset-0 transition-transform"
            style={{
              transform: shake
                ? `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 6}px)`
                : 'translate(0, 0)',
              transitionDuration: '50ms',
            }}
          >

            {enable3D ? (
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: showScene ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <SplashCanvas
                  phase={showScene ? phase : 'done'}
                  progress={showScene ? progress : 0}
                />
              </motion.div>
            ) : (
              <Splash2D phase={phase} progress={progress} />
            )}
          </div>

          {enable3D && phase === 'explode' && progress < 0.2 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(0,240,255,${0.25 * (1 - progress / 0.2)}), transparent 60%)`,
              }}
            />
          )}

          {phase === 'explode' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,240,255,${0.04 * (1 - progress)}) 50%, transparent 80%)`,
                opacity: 1 - progress,
              }}
            />
          )}

          {(phase === 'forming' || phase === 'hold') && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                opacity: phase === 'forming' ? progress * 0.6 : 0.6,
                transition: 'opacity 0.3s',
              }}
            />
          )}

          {(phase === 'forming' || phase === 'hold') && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <div
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${((phase === 'forming' ? progress : 1) * 100) % 100}%`,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.4) 50%, transparent 100%)',
                  boxShadow: '0 0 15px rgba(0,240,255,0.3)',
                }}
              />
            </div>
          )}

          {(phase === 'forming' || phase === 'hold') && (
            <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
              {[
                { pos: 'top-12 left-12', border: 'border-t border-l' },
                { pos: 'top-12 right-12', border: 'border-t border-r' },
                { pos: 'bottom-12 left-12', border: 'border-b border-l' },
                { pos: 'bottom-12 right-12', border: 'border-b border-r' },
              ].map(({ pos, border }, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-8 h-8 ${border} border-[rgba(0,240,255,0.3)]`}
                  style={{ opacity: phase === 'forming' ? Math.min(progress * 2, 1) : 1 }}
                />
              ))}
            </div>
          )}

          {(phase === 'text' || phase === 'pause' || phase === 'forming') && (
            <div
              className="absolute bottom-8 right-8 z-10 pointer-events-none"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgb(var(--fg-dim))' }}
            >
              <span style={{ color: 'rgb(var(--accent))' }}>
                {phase === 'text'
                  ? Math.floor(progress * 30)
                  : phase === 'pause'
                    ? 30
                    : Math.floor(30 + progress * 70)}%
              </span>
              <span className="ml-2">initializing</span>
            </div>
          )}

          {phase !== 'done' && (
            <div
              className="absolute bottom-8 left-8 z-10 pointer-events-none"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgb(var(--fg-dim))' }}
            >
              {phase === 'text' && '> booting system...'}
              {phase === 'pause' && '> system ready'}
              {phase === 'forming' && '> assembling components...'}
              {phase === 'hold' && '> calibrating...'}
              {phase === 'explode' && '> launching_'}
            </div>
          )}

          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            initial={false}
            animate={{
              opacity: textStarted && (phase === 'text' || phase === 'pause') ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {textStarted ? (
              <TypingText
                text="Welcome to my portfolio"
                active={phase === 'text' || phase === 'pause'}
                progress={phase === 'pause' ? 1 : progress}
              />
            ) : null}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypingText({
  text,
  active,
  progress,
}: {
  text: string;
  active: boolean;
  progress: number;
}) {
  const visibleChars = active ? Math.min(text.length, Math.floor(progress * text.length)) : text.length;
  const visibleText = text.slice(0, visibleChars);

  return (
    <p
      className="text-lg md:text-xl tracking-wide"
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'rgb(var(--fg-muted))',
      }}
    >
      <span>{visibleText}</span>

      {active && (
        <span
          className="inline-block w-0.5 h-[1.2em] ml-0.5 align-middle"
          style={{
            background: 'rgb(var(--accent))',
            animation: 'pulse-glow 0.8s ease-in-out infinite',
          }}
        />
      )}
    </p>
  );
}

function Splash2D({ phase, progress }: { phase: Phase; progress: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => {
          const baseOpacity =
            phase === 'forming' || phase === 'hold'
              ? 0.15
              : phase === 'explode'
                ? 0.15 * (1 - progress)
                : phase === 'text' || phase === 'pause'
                  ? 0.05 * (phase === 'pause' ? 1 : progress)
                  : 0;
          return (
            <div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${20 + i * 12}%`,
                background: `linear-gradient(90deg, transparent 0%, rgba(0,240,255,${baseOpacity}) 50%, transparent 100%)`,
                transform:
                  phase === 'explode'
                    ? `translateX(${(i % 2 === 0 ? 1 : -1) * progress * 150}px)`
                    : 'none',
                transition: 'transform 0.2s ease-out',
              }}
            />
          );
        })}
      </div>

      {phase === 'explode' && (
        <div
          className="absolute inset-0 z-20"
          style={{
            background: 'rgb(6, 8, 15)',
            clipPath: `inset(0 0 ${(1 - progress) * 100}% 0)`,
            transition: 'clip-path 0.1s linear',
          }}
        />
      )}
    </div>
  );
}
