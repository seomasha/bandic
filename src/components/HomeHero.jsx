"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ROTATE_MS = 3200;
const EASE = [0.16, 1, 0.3, 1];

function SarajevoSkyline({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 190 C 160 150, 300 175, 460 155 S 760 140, 900 165 S 1200 150, 1440 180 V220 H0 Z"
        fill="url(#hillsFade)"
      />
      <g stroke="#e0ba6c" strokeWidth="1.1" strokeLinecap="round" opacity="0.55">
        <path d="M120 190 V100" />
        <circle cx="120" cy="90" r="5" />
        <path d="M112 90a8 8 0 0 0 8 8" opacity="0.7" />

        <path d="M300 190 V60" />
        <circle cx="300" cy="48" r="6.5" />
        <path d="M290 48a10 10 0 0 0 10 10" opacity="0.7" />

        <path d="M960 190 V72" />
        <circle cx="960" cy="60" r="6" />
        <path d="M951 60a9 9 0 0 0 9 9" opacity="0.7" />

        <path d="M1230 190 V105" />
        <circle cx="1230" cy="95" r="5" />
        <path d="M1222 95a8 8 0 0 0 8 8" opacity="0.7" />
      </g>
      <path
        d="M560 190 V128 C560 108 578 92 610 92 S660 108 660 128 V190"
        stroke="#e0ba6c"
        strokeWidth="1.1"
        opacity="0.6"
        fill="none"
      />
      <circle cx="610" cy="80" r="4.5" stroke="#e0ba6c" strokeWidth="1.1" opacity="0.6" />
      <defs>
        <linearGradient id="hillsFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8903f" stopOpacity="0.08" />
          <stop offset="1" stopColor="#b8903f" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HomeHero() {
  const t = useTranslations("home.hero");
  const rotating = t.raw("rotating");
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % rotating.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduceMotion, rotating.length]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-ink-950">
      {/* cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950 to-black" />
        <motion.div
          className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(224,186,108,0.16) 0%, rgba(224,186,108,0) 70%)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: ["-6%", "6%", "-6%"], y: ["-4%", "3%", "-4%"] }
          }
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[55vh] w-[55vh] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(184,144,63,0.14) 0%, rgba(184,144,63,0) 70%)",
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: ["4%", "-4%", "4%"], y: ["2%", "-2%", "2%"] }
          }
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <SarajevoSkyline className="absolute bottom-0 left-0 w-full h-[28vh] opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* content */}
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="font-display font-semibold leading-[1.08] text-cream"
        >
          <span className="block text-4xl sm:text-5xl lg:text-6xl">{t("headline1")}</span>
          <span className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3 text-4xl sm:text-5xl lg:text-6xl">
            <span>{t("headlineStatic")}</span>
            <span className="relative inline-block h-[1.15em] overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.75, ease: EASE }}
                  className="gold-text inline-block whitespace-nowrap"
                >
                  {rotating[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mx-auto mt-8 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-white/60"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/dental-tourism#quote"
            className="group inline-flex items-center gap-2 rounded-full bg-cream text-ink-950 font-semibold px-7 py-4 hover:bg-white transition-colors"
          >
            {t("ctaPrimary")}
            <ArrowRight size={18} className="text-gold-600 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dental-tourism"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white/85 font-semibold px-7 py-4 hover:border-gold-300/70 hover:text-white transition-colors"
          >
            <PlaneTakeoff size={16} className="text-gold-300" />
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: EASE }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="h-9 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0 overflow-hidden">
          <motion.span
            className="block h-3 w-px bg-gold-300"
            animate={reduceMotion ? undefined : { y: [0, 22, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
