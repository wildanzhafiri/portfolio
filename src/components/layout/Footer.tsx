export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[rgba(var(--fg),0.05)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>
          &copy; {new Date().getFullYear()} Wildan. All rights reserved.
        </p>
        <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'rgb(var(--fg-dim))' }}>
          Designed & built with care.
        </p>
      </div>
    </footer>
  );
}
