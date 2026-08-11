"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useScroll, useTransform, useReducedMotion, animate } from "framer-motion";
import { Users, Award, Clock, ShieldCheck, LayoutGrid, Globe2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

function CountUp({ value, suffix = "", prefix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function GoldLine({ className = "", delay = 0, direction = "horizontal" }) {
  const vertical = direction === "vertical";
  return (
    <motion.span
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ transformOrigin: vertical ? "top" : "left" }}
      className={`block ${className}`}
    />
  );
}

const directions = {
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
  up: { x: 0, y: 40 },
  down: { x: 0, y: -30 },
};

function Card({ from = "up", delay = 0, className = "", children }) {
  const d = directions[from];
  return (
    <motion.div
      initial={{ opacity: 0, x: d.x, y: d.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TrustSection() {
  const t = useTranslations();
  const stats = t.raw("home.stats");
  const why = t.raw("home.why");
  const services = t.raw("serviceCategories");
  const words = t.raw("home.impact.words");

  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxA = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-22, 22]);
  const parallaxB = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -18]);

  const registered = why[1];
  const brands = why[2];
  const international = why[4];

  return (
    <section ref={sectionRef} className="relative bg-ink-950 py-24 lg:py-32 overflow-hidden noise-overlay">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45% 40% at 12% 0%, rgba(184,144,63,0.16), transparent 60%), radial-gradient(35% 35% at 95% 100%, rgba(184,144,63,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* header */}
        <div className="max-w-2xl">
          <Card from="up">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">{t("home.whyKicker")}</p>
          </Card>
          <Card from="up" delay={0.08}>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {words.map((w, i) => (
                <span key={w} className="flex items-center gap-4">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-cream">{w}</span>
                  {i < words.length - 1 && <span className="h-1 w-1 rounded-full bg-gold-400" />}
                </span>
              ))}
            </div>
          </Card>
          <GoldLine
            className="mt-6 h-px w-56 bg-gradient-to-r from-gold-400 via-gold-300 to-transparent"
            delay={0.2}
          />
        </div>

        {/* bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* dominant card */}
          <Card
            from="left"
            className="lg:col-span-7 lg:row-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <Users size={22} className="text-gold-300" />
              </div>
            </div>
            <div>
              <p className="font-display text-7xl sm:text-8xl font-semibold gold-text leading-none">
                <CountUp value={20} suffix="+" />
              </p>
              <p className="mt-4 text-lg font-semibold text-cream">{stats[0].label}</p>
              <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-white/55">
                {t("home.impact.dominantText")}
              </p>
            </div>
          </Card>

          {/* Top 5 rating — floats above the 11 card */}
          <Card
            from="right"
            delay={0.1}
            className="relative z-10 lg:col-span-5 lg:col-start-8 lg:row-span-1 rounded-3xl border border-gold-400/25 bg-ink-900 p-7 flex items-center justify-between shadow-2xl shadow-black/40 lg:rotate-1"
          >
            <div>
              <p className="font-display text-4xl font-semibold gold-text">
                <CountUp value={5} prefix="Top " />
              </p>
              <p className="mt-1.5 text-sm font-medium text-white/60">{stats[3].label}</p>
            </div>
            <Award size={28} className="text-gold-300 shrink-0" />
          </Card>

          {/* 11 specialists — overlaps up into the card above */}
          <Card
            from="right"
            delay={0.18}
            className="lg:col-span-5 lg:col-start-8 lg:row-span-1 lg:-mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7 flex items-center justify-between lg:-rotate-1"
          >
            <div>
              <p className="font-display text-4xl font-semibold text-cream">
                <CountUp value={11} />
              </p>
              <p className="mt-1.5 text-sm font-medium text-white/55">{stats[1].label}</p>
            </div>
            <ShieldCheck size={26} className="text-white/30 shrink-0" />
          </Card>

          {/* working hours */}
          <Card
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:row-span-1 rounded-3xl border border-white/10 bg-white/[0.04] p-7"
          >
            <Clock size={20} className="text-gold-300" />
            <p className="mt-4 font-display text-3xl font-semibold text-cream">
              <CountUp value={2} />
            </p>
            <p className="mt-1.5 text-sm font-medium text-white/55">{stats[2].label}</p>
            <p className="mt-3 text-xs text-white/40">
              {t("common.hoursWeek")} · {t("common.hoursSat")}
            </p>
          </Card>

          {/* specialties */}
          <Card
            from="up"
            delay={0.2}
            className="lg:col-span-4 lg:row-span-1 rounded-3xl border border-white/10 bg-white/[0.04] p-7"
          >
            <LayoutGrid size={20} className="text-gold-300" />
            <p className="mt-4 font-display text-3xl font-semibold text-cream">
              <CountUp value={services.length} />
            </p>
            <p className="mt-1.5 text-sm font-medium text-white/55">{t("home.servicesKicker")}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {services.map((s) => (
                <span
                  key={s.slug}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[0.65rem] font-medium text-white/45"
                >
                  {s.title}
                </span>
              ))}
            </div>
          </Card>

          {/* international */}
          <motion.div
            style={{ y: parallaxA }}
            className="lg:col-span-4 lg:row-span-1 rounded-3xl border border-white/10 bg-white/[0.04] p-7"
          >
            <Card from="up" delay={0.28}>
              <Globe2 size={20} className="text-gold-300" />
              <p className="mt-4 font-display text-xl font-semibold text-cream leading-snug">{international.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{international.text}</p>
            </Card>
          </motion.div>

          {/* credentials strip */}
          <motion.div style={{ y: parallaxB }} className="lg:col-span-12 lg:row-span-1">
            <Card
              from="up"
              delay={0.1}
              className="h-full rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.05] via-white/[0.03] to-transparent p-7 sm:p-8 grid gap-6 sm:grid-cols-[1fr_auto_1fr] items-center"
            >
              <div>
                <p className="text-sm font-semibold text-cream">{registered.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{registered.text}</p>
              </div>
              <GoldLine
                direction="vertical"
                delay={0.3}
                className="hidden sm:block w-px h-20 justify-self-center bg-gradient-to-b from-transparent via-gold-400/40 to-transparent"
              />
              <div>
                <p className="text-sm font-semibold text-cream">{brands.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{brands.text}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
