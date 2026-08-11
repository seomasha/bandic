"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

function ClinicPanel({ className = "", parallaxY }) {
  return (
    <motion.div style={{ y: parallaxY }} className={`relative overflow-hidden rounded-3xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-black" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 55% at 25% 20%, rgba(224,186,108,0.22), transparent 60%), radial-gradient(45% 45% at 85% 85%, rgba(184,144,63,0.16), transparent 60%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" viewBox="0 0 300 380">
        <path d="M0 380 V210 C0 150 40 110 90 110 S180 150 180 210 V380" fill="none" stroke="#e0ba6c" strokeWidth="1" />
        <path d="M120 380 V240 C120 195 150 168 190 168 S260 195 260 240 V380" fill="none" stroke="#e0ba6c" strokeWidth="1" />
        <circle cx="90" cy="80" r="14" fill="none" stroke="#e0ba6c" strokeWidth="1" />
        <circle cx="190" cy="140" r="9" fill="none" stroke="#e0ba6c" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 noise-overlay" />
    </motion.div>
  );
}

export default function AboutSection() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxMain = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-24, 24]);
  const parallaxDetail = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [16, -16]);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-6">
          {/* text block — overlaps the image on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.85, ease: EASE }}
            className="relative z-10 rounded-3xl bg-white p-8 shadow-xl shadow-ink-900/10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:-mr-16 lg:p-10"
          >
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.aboutKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold leading-tight text-ink-950">
              {t("home.aboutTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-600">{t("home.aboutText")}</p>
            <Link
              href="/team"
              className="gold-underline mt-8 inline-flex items-center gap-2 font-semibold text-gold-700 hover:text-gold-600"
            >
              {t("home.teamCta")} <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* main image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            className="relative lg:col-span-8 lg:col-start-5 lg:row-start-1"
          >
            <ClinicPanel className="aspect-[4/5]" parallaxY={parallaxMain} />

            {/* small secondary detail panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="absolute -bottom-8 -left-6 w-[42%] sm:-left-10"
            >
              <ClinicPanel className="aspect-square shadow-xl shadow-ink-900/20" parallaxY={parallaxDetail} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
