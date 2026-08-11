"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

function initials(name) {
  return name
    .split(" ")
    .filter((w) => /^[A-ZČĆŠĐŽ]/.test(w))
    .map((n) => n[0])
    .slice(-2)
    .join("");
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

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* featured — director */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="group relative overflow-hidden rounded-3xl lg:col-span-5"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-950 to-black">
              <div
                className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(65% 55% at 30% 20%, rgba(224,186,108,0.3), transparent 65%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl font-semibold text-gold-300/25">{initials(featured.name)}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-7">
                <p className="font-display text-2xl font-semibold text-white">{featured.name}</p>
                <p className="mt-1 text-sm font-semibold text-gold-300">{featured.title}</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{featured.text}</p>
              </div>
            </div>
          </motion.div>

          {/* horizontally scrollable rest of the team */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="scrollbar-thin flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
              {rest.map((d, i) => (
                <div
                  key={d.name}
                  className="group relative w-52 shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10 sm:w-56"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-cream via-gold-50 to-white">
                    <span className="absolute inset-0 flex items-center justify-center font-display text-4xl font-semibold gold-text opacity-80">
                      {initials(d.name)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <p className="font-display text-base font-semibold leading-snug text-ink-950">{d.name}</p>
                    <p className="mt-1 text-xs font-semibold leading-snug text-gold-600">{d.title}</p>
                  </div>
                  <span className="pointer-events-none absolute left-4 top-4 font-display text-sm font-semibold text-white/70">
                    0{i + 2}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
