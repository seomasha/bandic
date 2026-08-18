"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

export default function ServicesSection() {
  const t = useTranslations();
  const services = t.raw("serviceCategories");
  const [active, setActive] = useState(0);

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
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

        <div className="mt-14">
          {services.map((s, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px 0px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
              >
                <button
                  onClick={() => setActive(isActive ? -1 : i)}
                  className="group flex w-full cursor-pointer items-baseline gap-6 border-t border-ink-900/10 py-7 text-left last:border-b"
                >
                  <motion.span
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 14 }}
                    className={`inline-block font-display text-2xl font-semibold shrink-0 transition-colors duration-300 ${
                      isActive ? "gold-text" : "text-ink-900/25 group-hover:text-gold-400"
                    }`}
                  >
                    0{i + 1}
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-display text-2xl sm:text-3xl font-semibold transition-colors duration-300 ${
                        isActive ? "text-ink-950" : "text-ink-500 group-hover:text-ink-800"
                      }`}
                    >
                      {s.title}
                    </p>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden text-base leading-relaxed text-ink-600"
                        >
                          <p className="mt-3 max-w-2xl">{s.text}</p>
                          <Link
                            href={`/services#${s.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="gold-underline mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-600"
                          >
                            {t("common.learnMore")} <ArrowRight size={14} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <ArrowRight
                    size={20}
                    className={`shrink-0 text-gold-500 transition-transform duration-300 ${isActive ? "-rotate-45" : ""}`}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
