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

export default function TeamSection() {
  const t = useTranslations();
  const doctors = t.raw("team.doctors");
  const [featured, ...rest] = doctors;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.teamKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("home.teamTitle")}</h2>
          </div>
          <Link href="/team" className="inline-flex shrink-0 items-center gap-2 font-semibold text-ink-800 hover:text-gold-600">
            {t("home.teamCta")} <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* featured — director */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-16 grid gap-8 border-t border-ink-900/10 pt-12 lg:grid-cols-12"
        >
          <div className="lg:col-span-3">
            <GoldLine className="w-16" />
            <p className="mt-5 font-display text-4xl font-semibold leading-tight text-ink-950">{featured.name}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-gold-600">{featured.title}</p>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-600 lg:col-span-8 lg:col-start-5">{featured.text}</p>
        </motion.div>

        {/* rest of the team — horizontally scrollable typographic list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px 0px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mt-4"
        >
          <div className="scrollbar-thin flex snap-x snap-mandatory gap-px overflow-x-auto">
            {rest.map((d, i) => (
              <div
                key={d.name}
                className="group flex w-56 shrink-0 snap-start flex-col border-t border-ink-900/10 py-8 pr-8 sm:w-64"
              >
                <span className="font-display text-sm font-semibold text-ink-900/25 transition-colors duration-300 group-hover:text-gold-400">
                  0{i + 2}
                </span>
                <p className="mt-5 font-display text-xl font-semibold leading-snug text-ink-950">{d.name}</p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-600">{d.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
