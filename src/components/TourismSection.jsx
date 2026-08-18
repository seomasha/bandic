"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, animate } from "framer-motion";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

function CountUp({ value, duration = 2 }) {
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
      className="inline-block lining-nums tabular-nums"
    >
      {display}
    </motion.span>
  );
}

function SavingsPanel({ label }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto w-full max-w-sm"
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-gold-300/50 bg-gradient-to-br from-cream via-gold-100 to-gold-300 px-8 py-14 text-center shadow-sm shadow-ink-900/5"
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{ duration: 2.6, delay: 1.2, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
          />
        )}

        <p className="relative font-display text-7xl font-semibold leading-none text-ink-950 sm:text-8xl">
          <CountUp value={50} duration={1.8} />
          <span className="text-gold-700">–</span>
          <CountUp value={75} duration={2.3} />
          <span className="text-gold-700">%</span>
        </p>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="relative mt-8 block h-px w-14 bg-gold-600"
        />
        <p className="relative mt-6 text-sm font-bold uppercase tracking-[0.2em] text-ink-800">{label}</p>
      </motion.div>
    </motion.div>
  );
}

export default function TourismSection() {
  const t = useTranslations("home.tourism");
  const [line1, line2] = t("title").split(". ");
  const points = [t("point1"), t("point2"), t("point3")];

  return (
    <section className="relative overflow-hidden bg-cream py-28 lg:py-40">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[32rem] w-[32rem] rounded-full border border-gold-400/10 hidden lg:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-32 h-80 w-80 rounded-full border border-gold-400/10 hidden lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-3xl"
        >
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-gold-600">
            <PlaneTakeoff size={14} />
            {t("kicker")}
          </p>
          <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.03] text-ink-950">
            {line1}.
            <br />
            <span className="text-gold-600">{line2}</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="max-w-xl text-lg leading-relaxed text-ink-600"
            >
              {t("text")}
            </motion.p>

            <div className="mt-12">
              {points.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.6, delay: 0.15 * i, ease: EASE }}
                >
                  <div className="flex items-start gap-6 py-6">
                    <span className="shrink-0 font-display text-3xl font-semibold text-gold-600">0{i + 1}</span>
                    <p className="pt-1 text-base sm:text-lg leading-relaxed text-ink-800">{p}</p>
                  </div>
                  {i < points.length - 1 && <div className="h-px w-full bg-ink-900/10" />}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              <Link
                href="/dental-tourism"
                className="group mt-12 inline-flex items-center gap-3 rounded-full bg-ink-950 px-8 py-4 font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold-600"
              >
                {t("cta")}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center justify-center lg:col-span-5 lg:items-start lg:pt-20">
            <SavingsPanel label={t("savingsLabel")} />
          </div>
        </div>
      </div>
    </section>
  );
}
