"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ROTATE_MS = 3200;
const EASE = [0.16, 1, 0.3, 1];

function HeroVideoBackground({ reduceMotion }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduceMotion) v.pause();
    else v.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero1.MP4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ink-950/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/30 to-ink-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.5)_100%)]" />
      <div className="absolute inset-0 noise-overlay" />
    </div>
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
      <HeroVideoBackground reduceMotion={reduceMotion} />

      {/* content */}
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="font-display font-semibold leading-[1.2] text-cream [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]"
        >
          <span className="block text-4xl sm:text-5xl lg:text-6xl">{t("headline1")}</span>
          <span className="mt-3 block text-4xl sm:text-5xl lg:text-6xl">{t("headlineStatic")}</span>
          <span className="relative mt-3 block text-4xl sm:text-5xl lg:text-6xl">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="block text-gold-300"
              >
                {rotating[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mx-auto mt-8 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-white/70 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]"
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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-7 py-4 hover:border-gold-300/70 hover:bg-white/10 transition-colors"
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
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="relative h-[34px] w-[26px]">
          <svg width="26" height="34" viewBox="0 0 26 34" fill="none" className="absolute inset-0">
            <path
              d="M1.5 34 V13.5 C1.5 6.3 6.9 1 13 1 S24.5 6.3 24.5 13.5 V34"
              stroke="url(#archGradScroll)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="archGradScroll" x1="0" y1="0" x2="26" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f5d99a" />
                <stop offset="1" stopColor="#b8903f" />
              </linearGradient>
            </defs>
          </svg>
          <motion.span
            className="absolute left-1/2 top-[10px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-300"
            animate={reduceMotion ? undefined : { y: [0, 16, 0], opacity: [1, 0.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
