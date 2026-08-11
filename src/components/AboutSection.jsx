"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

function GoldLine({ className = "", delay = 0 }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ transformOrigin: "left" }}
      className={`block h-px bg-gradient-to-r from-gold-500 to-transparent ${className}`}
    />
  );
}

export default function AboutSection() {
  const t = useTranslations();
  const why = t.raw("home.why");
  const highlights = [why[3], why[5]];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.aboutKicker")}</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.08] text-ink-950">
            {t("home.aboutTitle")}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="text-lg leading-relaxed text-ink-600">{t("home.aboutText")}</p>
            <Link
              href="/team"
              className="gold-underline mt-8 inline-flex items-center gap-2 font-semibold text-gold-700 hover:text-gold-600"
            >
              {t("home.teamCta")} <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="lg:col-span-5">
            {highlights.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.7, delay: 0.15 * i, ease: EASE }}
              >
                <GoldLine className="w-16" delay={0.1 + 0.15 * i} />
                <p className="mt-5 font-display text-2xl font-semibold text-ink-950">{w.title}</p>
                <p className="mt-2.5 text-base leading-relaxed text-ink-600">{w.text}</p>
                {i < highlights.length - 1 && <div className="mt-10 mb-10 h-px w-full bg-ink-900/10 lg:mb-0" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
