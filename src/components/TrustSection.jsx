"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion, animate } from "framer-motion";
import { Globe2, ReceiptText, Layers } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

function CountUp({ value, suffix = "", duration = 1.4 }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
  };

  return (
    <motion.span onViewportEnter={start} viewport={{ once: true, margin: "-80px 0px" }}>
      {display}
      {suffix}
    </motion.span>
  );
}

function GoldLine({ className = "", delay = 0, direction = "horizontal" }) {
  const vertical = direction === "vertical";
  return (
    <motion.span
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ transformOrigin: vertical ? "top" : "left" }}
      className={`block ${className}`}
    />
  );
}

const directions = {
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
  up: { x: 0, y: 34 },
  down: { x: 0, y: -24 },
};

function Reveal({ from = "up", delay = 0, className = "", children }) {
  const d = directions[from];
  return (
    <motion.div
      initial={{ opacity: 0, x: d.x, y: d.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function TrustSection() {
  const t = useTranslations();
  const why = t.raw("home.why");
  const words = t.raw("home.impact.words");

  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxA = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 16]);
  const parallaxB = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, -14]);

  const brands = why[2];
  const pricing = why[5];
  const international = why[4];

  return (
    <section ref={sectionRef} className="relative bg-cream py-24 lg:py-36 overflow-hidden">
      {/* faint watermark numeral — editorial flourish, not a stat */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -right-10 -top-10 font-display text-[26rem] leading-none text-ink-900/[0.035] hidden lg:block"
      >
        20
      </span>
      <div className="absolute inset-0 noise-overlay opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* header */}
        <div className="max-w-2xl">
          <Reveal from="up">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.whyKicker")}</p>
          </Reveal>
          <Reveal from="up" delay={0.08}>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {words.map((w, i) => (
                <span key={w} className="flex items-center gap-4">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-ink-950">{w}</span>
                  {i < words.length - 1 && <span className="h-1 w-1 rounded-full bg-gold-500" />}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* editorial composition */}
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
          {/* dominant anchor — no card chrome at all */}
          <Reveal from="left" className="lg:col-span-7 lg:row-span-2">
            <p className="font-display text-[7.5rem] sm:text-[9rem] lg:text-[11rem] font-semibold leading-[0.85] text-ink-950">
              20<span className="gold-text">+</span>
            </p>
            <GoldLine
              className="mt-2 h-px w-40 bg-gradient-to-r from-gold-500 to-transparent"
              delay={0.3}
            />
            <p className="mt-6 text-xl font-semibold text-ink-950">{t("home.impact.dominantLabel")}</p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-600">{t("home.impact.dominantText")}</p>
          </Reveal>

          {/* 11 specialists — floats top-right, offset down slightly */}
          <Reveal
            from="right"
            delay={0.15}
            className="lg:col-span-5 lg:col-start-8 lg:mt-10 lg:rotate-1"
          >
            <div className="group border-t border-ink-900/15 pt-5 transition-colors duration-300 hover:border-gold-400/60">
              <p className="font-display text-5xl font-semibold text-ink-950 transition-colors duration-300 group-hover:text-gold-600">
                <CountUp value={11} />
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink-500">{t("home.impact.specialistsLabel")}</p>
            </div>
          </Reveal>

          {/* 2 daily shifts — overlaps up slightly, boxed in soft white for contrast */}
          <Reveal
            from="right"
            delay={0.22}
            className="lg:col-span-5 lg:col-start-8 lg:-mt-2 lg:-rotate-1"
          >
            <div className="group rounded-2xl bg-white shadow-sm shadow-ink-900/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink-900/10">
              <p className="font-display text-5xl font-semibold text-ink-950 transition-colors duration-300 group-hover:text-gold-600">
                <CountUp value={2} />
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink-500">{t("home.impact.shiftsLabel")}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-gold-600">07:00–21:00</p>
            </div>
          </Reveal>

          {/* 6 days — plain typographic, no box */}
          <Reveal from="up" delay={0.1} className="lg:col-span-4">
            <div className="group border-t border-ink-900/15 pt-5 transition-colors duration-300 hover:border-gold-400/60">
              <p className="font-display text-4xl font-semibold text-ink-950 transition-colors duration-300 group-hover:text-gold-600">
                {t("home.impact.daysValue")}
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink-500">{t("home.impact.daysLabel")}</p>
            </div>
          </Reveal>

          {/* international patients — text only, tiny gold icon accent */}
          <motion.div style={{ y: parallaxA }} className="lg:col-span-4">
            <Reveal from="up" delay={0.18}>
              <div className="group inline-block">
                <Globe2 size={18} className="text-gold-500 transition-transform duration-300 group-hover:scale-110" />
                <p className="mt-3 text-lg font-semibold text-ink-950 leading-snug">{international.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{international.text}</p>
              </div>
            </Reveal>
          </motion.div>

          {/* transparent pricing — text only */}
          <motion.div style={{ y: parallaxB }} className="lg:col-span-4">
            <Reveal from="up" delay={0.26}>
              <div className="group inline-block">
                <ReceiptText size={18} className="text-gold-500 transition-transform duration-300 group-hover:scale-110" />
                <p className="mt-3 text-lg font-semibold text-ink-950 leading-snug">{pricing.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{pricing.text}</p>
              </div>
            </Reveal>
          </motion.div>

          {/* implant systems — masthead-style credit line */}
          <Reveal from="up" delay={0.1} className="lg:col-span-12">
            <div className="border-t border-ink-900/15 pt-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <span className="flex items-center gap-2 shrink-0 text-xs font-bold tracking-[0.25em] uppercase text-ink-500">
                <Layers size={15} className="text-gold-500" />
                {brands.title}
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {["Straumann", "Neodent", "Bredent"].map((brand, i) => (
                  <span key={brand} className="flex items-center gap-6">
                    <span className="font-display text-lg text-ink-800 transition-colors duration-300 hover:text-gold-600">
                      {brand}
                    </span>
                    {i < 2 && <GoldLine direction="vertical" delay={0.3 + i * 0.1} className="h-4 w-px bg-gold-400/50" />}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
