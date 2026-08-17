"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, animate } from "framer-motion";
import { Globe2, ReceiptText, Layers, ShieldCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

function CountUp({ value, suffix = "", duration = 2.4 }) {
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
    <motion.span
      onViewportEnter={start}
      viewport={{ once: true, margin: "-80px 0px" }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="inline-block lining-nums tabular-nums"
    >
      {display}
      {suffix}
    </motion.span>
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

  const brands = why[2];
  const pricing = why[5];
  const international = why[4];
  const certifiedImplants = why[1];

  return (
    <section className="relative bg-cream py-24 lg:py-36 overflow-hidden">
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

        {/* stat cards */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {/* 20+ — dominant, gold gradient card */}
          <Reveal from="up" className="col-span-2 lg:col-span-2 lg:row-span-1">
            <div className="group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 px-8 py-10 text-center shadow-lg shadow-ink-900/10 transition-transform duration-300 hover:-translate-y-1">
              <div
                className="absolute inset-0 opacity-80"
                style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(224,186,108,0.25), transparent 70%)" }}
              />
              <p className="relative font-display text-7xl sm:text-8xl font-semibold leading-none text-cream">
                <CountUp value={20} duration={3} />
                <span className="gold-text">+</span>
              </p>
              <p className="relative mt-4 text-lg font-semibold text-cream">{t("home.impact.dominantLabel")}</p>
              <p className="relative mt-2 max-w-xs text-sm leading-relaxed text-white/60">{t("home.impact.dominantText")}</p>
            </div>
          </Reveal>

          {/* 11 specialists */}
          <Reveal from="up" delay={0.1}>
            <div className="group flex h-full flex-col items-center justify-center rounded-3xl border border-ink-900/10 bg-white px-6 py-10 text-center shadow-sm shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10">
              <p className="font-display text-5xl font-semibold text-ink-950 transition-colors duration-300 group-hover:text-gold-600">
                <CountUp value={11} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink-500">{t("home.impact.specialistsLabel")}</p>
            </div>
          </Reveal>

          {/* 2 daily shifts */}
          <Reveal from="up" delay={0.16}>
            <div className="group flex h-full flex-col items-center justify-center rounded-3xl border border-gold-300/40 bg-gold-50 px-6 py-10 text-center shadow-sm shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-900/10">
              <p className="font-display text-5xl font-semibold text-ink-950 transition-colors duration-300 group-hover:text-gold-600">
                <CountUp value={2} duration={1.6} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink-500">{t("home.impact.shiftsLabel")}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-gold-600">07:00–21:00</p>
            </div>
          </Reveal>

          {/* 6 days */}
          <Reveal from="up" delay={0.22}>
            <div className="group flex h-full flex-col items-center justify-center rounded-3xl border border-ink-900/10 bg-white px-6 py-10 text-center shadow-sm shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10">
              <p className="font-display text-5xl font-semibold text-ink-950 transition-colors duration-300 group-hover:text-gold-600">
                <CountUp value={6} duration={1.8} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink-500">{t("home.impact.daysUnit")}</p>
              <p className="mt-2 text-xs font-semibold tracking-wide text-gold-600">{t("home.impact.daysLabel")}</p>
            </div>
          </Reveal>

          {/* registered, certified implants */}
          <Reveal from="up" delay={0.28} className="h-full">
            <div className="group flex h-full flex-col items-center rounded-3xl border border-ink-900/10 bg-white px-6 py-8 text-center shadow-sm shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck size={20} className="text-gold-600" />
              </span>
              <p className="mt-4 text-lg font-semibold text-ink-950 leading-snug">{certifiedImplants.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{certifiedImplants.text}</p>
            </div>
          </Reveal>

          {/* international patients */}
          <Reveal from="up" delay={0.32} className="h-full">
            <div className="group flex h-full flex-col items-center rounded-3xl border border-ink-900/10 bg-white px-6 py-8 text-center shadow-sm shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 transition-transform duration-300 group-hover:scale-110">
                <Globe2 size={20} className="text-gold-600" />
              </span>
              <p className="mt-4 text-lg font-semibold text-ink-950 leading-snug">{international.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{international.text}</p>
            </div>
          </Reveal>

          {/* transparent pricing */}
          <Reveal from="up" delay={0.36} className="h-full">
            <div className="group flex h-full flex-col items-center rounded-3xl border border-ink-900/10 bg-white px-6 py-8 text-center shadow-sm shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 transition-transform duration-300 group-hover:scale-110">
                <ReceiptText size={20} className="text-gold-600" />
              </span>
              <p className="mt-4 text-lg font-semibold text-ink-950 leading-snug">{pricing.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{pricing.text}</p>
            </div>
          </Reveal>
        </div>

        {/* brands — centered badge row */}
        <Reveal from="up" delay={0.1} className="mt-14">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-ink-900/10 bg-white px-6 py-8 text-center shadow-sm shadow-ink-900/5 sm:gap-6">
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-ink-500">
              <Layers size={15} className="text-gold-500" />
              {brands.title}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Straumann", "Neodent", "Bredent"].map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-gold-300/50 bg-gold-50 px-5 py-2 font-display text-base text-ink-800 transition-colors duration-300 hover:border-gold-400 hover:bg-gold-100 hover:text-gold-700"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
