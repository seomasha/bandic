"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

function SavingsPanel({ short }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-3xl border border-gold-300/50 bg-gradient-to-br from-cream via-gold-100 to-gold-300 px-8 py-14 text-center shadow-sm shadow-ink-900/5 lg:mx-0 lg:h-full lg:max-w-none lg:min-h-[560px]"
    >
      <p className="font-display text-7xl font-semibold leading-none text-ink-950 sm:text-8xl">
        50<span className="text-gold-700">–</span>75<span className="text-gold-700">%</span>
      </p>
      <p className="mt-5 text-xl font-semibold text-ink-950">{short}</p>
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

          <div className="lg:col-span-5">
            <SavingsPanel short={t("savingsShort")} />
          </div>
        </div>
      </div>
    </section>
  );
}
