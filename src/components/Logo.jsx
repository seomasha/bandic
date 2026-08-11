export default function Logo({ dark = false, className = "" }) {
  const primary = dark ? "#ffffff" : "#121214";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="9.25" stroke="url(#g)" strokeWidth="1.5" />
        <path
          d="M20 10c-2.6 0-4.3 1.4-5.6 1.4-1.3 0-2.6-1.2-4.3-1.2-2.7 0-5.6 2.2-5.6 6.9 0 4.2 3.3 12.4 5.9 12.4 1.5 0 2-1 3.8-1 1.8 0 2.2 1 3.8 1 2.7 0 5.6-7.1 5.6-10.9-2.6-1-3.5-3.4-3.5-3.4"
          transform="translate(6 1) scale(0.72)"
          fill="url(#g)"
        />
        <defs>
          <linearGradient id="g" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e0ba6c" />
            <stop offset="0.5" stopColor="#b8903f" />
            <stop offset="1" stopColor="#7c5f26" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-tight">
        <p className="font-display font-semibold text-[1.2rem] tracking-tight" style={{ color: primary }}>
          Poliklinika <span className="gold-text">Bandić</span>
        </p>
        <p className={`text-[0.6rem] tracking-[0.25em] uppercase ${dark ? "text-white/60" : "text-ink-500"}`}>
          Sarajevo · Est. Dental Care
        </p>
      </div>
    </div>
  );
}
