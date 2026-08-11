"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Users, ScanLine, ClipboardCheck, Globe2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const icons = [Users, ScanLine, ClipboardCheck, Globe2];

function DetailGraphic({ index }) {
  const Icon = icons[index];
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-900/10 bg-white">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 15%, rgba(184,144,63,0.10), transparent 60%), radial-gradient(50% 50% at 90% 90%, rgba(184,144,63,0.08), transparent 60%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#121214" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-400/40 bg-gold-50">
            <Icon size={32} strokeWidth={1.4} className="text-gold-600" />
          </div>
        </motion.div>
      </AnimatePresence>
      <span className="absolute bottom-4 right-5 font-display text-6xl font-semibold text-ink-900/[0.06]">
        0{index + 1}
      </span>
    </div>
  );
}

export default function WhyBandicSection() {
  const t = useTranslations("home.whyBandic");
  const reasons = t.raw("reasons");
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(reasons.length - 1, Math.max(0, Math.floor(v * reasons.length)));
    setActive(idx);
  });

  return (
    <section ref={sectionRef} className="relative bg-cream lg:h-[320vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 lg:px-8 lg:py-0">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* left — headline + detail graphic */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("kicker")}</p>
                <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.08] text-ink-950">
                  {t("headlineLine1")}
                  <br />
                  {t("headlineLine2")}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-600">{t("text")}</p>
              </motion.div>

              <div className="mt-10 hidden max-w-sm lg:block">
                <DetailGraphic index={active} />
              </div>
            </div>

            {/* right — progressive reasons */}
            <div className="lg:col-span-7">
              <div className="relative flex flex-col gap-14 lg:gap-0">
                {/* connecting line (desktop only) */}
                <div className="absolute left-[19px] top-2 bottom-2 hidden w-px bg-ink-900/10 lg:block">
                  <motion.div
                    style={{ scaleY: reduceMotion ? 1 : lineScale }}
                    className="h-full w-full origin-top bg-gradient-to-b from-gold-500 to-gold-300"
                  />
                </div>

                {reasons.map((r, i) => {
                  const isActive = active === i;
                  return (
                    <div key={r.title} className="lg:flex lg:min-h-[25vh] lg:items-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px 0px" }}
                        transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
                        animate={
                          reduceMotion
                            ? undefined
                            : { opacity: isActive ? 1 : 0.4, x: isActive ? 8 : 0 }
                        }
                        className="flex items-start gap-6 lg:gap-8"
                      >
                        <motion.span
                          animate={reduceMotion ? undefined : { scale: isActive ? 1.08 : 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className={`font-display text-4xl sm:text-5xl font-semibold shrink-0 transition-colors duration-500 ${
                            isActive ? "gold-text" : "text-ink-900/20"
                          }`}
                        >
                          0{i + 1}
                        </motion.span>
                        <div className="pt-1 lg:pt-2">
                          <p
                            className={`text-lg sm:text-xl font-semibold tracking-wide uppercase transition-colors duration-500 ${
                              isActive ? "text-ink-950" : "text-ink-400"
                            }`}
                          >
                            {r.title}
                          </p>
                          <p
                            className={`mt-2 max-w-md text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                              isActive ? "text-ink-600" : "text-ink-400/70"
                            }`}
                          >
                            {r.text}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
