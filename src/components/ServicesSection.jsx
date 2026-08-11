"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Scissors, Anchor, Smile, Layers, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];
const icons = [Stethoscope, Scissors, Anchor, Smile, Layers, Sparkles];

function ServiceVisual({ index }) {
  const Icon = icons[index];
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink-950">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 55% at 20% 15%, rgba(224,186,108,0.28), transparent 60%), radial-gradient(50% 50% at 90% 90%, rgba(184,144,63,0.18), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 noise-overlay" />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-300/30 bg-white/5 backdrop-blur-sm">
            <Icon size={40} strokeWidth={1.3} className="text-gold-300" />
          </div>
          <span className="font-display text-8xl font-semibold text-white/[0.07]">0{index + 1}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations();
  const services = t.raw("serviceCategories");
  const [active, setActive] = useState(0);

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.servicesKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("home.servicesTitle")}</h2>
          </div>
          <Link href="/services" className="inline-flex shrink-0 items-center gap-2 font-semibold text-ink-800 hover:text-gold-600">
            {t("common.viewAll")} <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  key={s.slug}
                  onClick={() => setActive(i)}
                  className="group block w-full cursor-pointer border-t border-ink-900/10 py-6 text-left last:border-b"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className={`font-display text-2xl font-semibold shrink-0 transition-colors duration-300 ${
                        isActive ? "gold-text" : "text-ink-900/25"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`font-display text-2xl sm:text-3xl font-semibold transition-colors duration-300 ${
                          isActive ? "text-ink-950" : "text-ink-400"
                        }`}
                      >
                        {s.title}
                      </p>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="mt-2 max-w-md overflow-hidden text-sm leading-relaxed text-ink-600"
                          >
                            {s.text}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <ServiceVisual index={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
