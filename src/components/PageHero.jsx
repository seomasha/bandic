import Reveal from "./Reveal";

export default function PageHero({ kicker, title, subtitle, children }) {
  return (
    <section className="relative bg-ink-950 text-white pt-40 pb-24 overflow-hidden noise-overlay">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 10%, rgba(184,144,63,0.35), transparent 60%), radial-gradient(50% 50% at 90% 30%, rgba(184,144,63,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <Reveal>
          <p className="text-gold-300 text-xs font-bold tracking-[0.3em] uppercase mb-4">{kicker}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08]">{title}</h1>
          {subtitle && <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
