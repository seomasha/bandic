"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const FLAGS = { Germany: "🇩🇪", Njemačka: "🇩🇪", Deutschland: "🇩🇪", Austria: "🇦🇹", Austrija: "🇦🇹", Österreich: "🇦🇹", Switzerland: "🇨🇭", Švicarska: "🇨🇭", Schweiz: "🇨🇭" };

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items");

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div className="absolute inset-0 noise-overlay" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(224,186,108,0.12), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-400">{t("kicker")}</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.08] text-cream">{t("title")}</h2>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:bg-white/[0.06]"
            >
              <Quote size={28} className="text-gold-500/70" />

              <div className="mt-4 flex gap-0.5 text-gold-400">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="mt-4 flex-1 font-display text-lg leading-relaxed text-white/85">"{item.quote}"</p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 font-display text-base font-semibold text-gold-300">
                  {item.name}
                </span>
                <span className="text-sm font-medium text-white/60">
                  {FLAGS[item.location] && <span className="mr-1.5">{FLAGS[item.location]}</span>}
                  {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
