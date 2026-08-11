"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function PricesClient() {
  const t = useTranslations();
  const categories = t.raw("prices.categories");
  const [active, setActive] = useState(0);

  return (
    <div>
      <PageHero kicker={t("prices.hero.kicker")} title={t("prices.hero.title")} subtitle={t("prices.hero.subtitle")} />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal className="flex items-center gap-2 text-sm text-ink-500 bg-cream border border-ink-900/5 rounded-xl px-4 py-3 mb-10">
            <Info size={16} className="text-gold-600 shrink-0" />
            {t("prices.note")}
          </Reveal>

          <Reveal className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((c, i) => (
              <button
                key={c.title}
                onClick={() => setActive(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                  active === i
                    ? "bg-ink-950 border-ink-950 text-white"
                    : "bg-white border-ink-900/10 text-ink-700 hover:border-gold-400"
                }`}
              >
                {c.title}
              </button>
            ))}
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-ink-900/5 overflow-hidden"
            >
              {categories[active].items.map((item, i) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between gap-4 px-6 sm:px-8 py-5 ${
                    i % 2 === 0 ? "bg-white" : "bg-cream"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-ink-900">{item.name}</p>
                    {item.note && <p className="text-xs text-ink-500 mt-0.5">{item.note}</p>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-xl font-semibold text-gold-700">{item.price}</p>
                    <p className="text-xs text-ink-500">{item.eur}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 bg-ink-950 text-white text-center noise-overlay">
        <Reveal className="mx-auto max-w-2xl px-5">
          <h2 className="font-display text-3xl font-semibold">{t("prices.cta.title")}</h2>
          <p className="mt-4 text-white/70 leading-relaxed">{t("prices.cta.text")}</p>
          <Link
            href="/dental-tourism#quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-bold px-7 py-4 hover:opacity-90 transition-opacity"
          >
            {t("prices.cta.button")} <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
