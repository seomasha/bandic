"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

export default function FinalCtaSection() {
  const t = useTranslations();
  const stats = t.raw("home.stats");

  return (
    <section className="relative overflow-hidden bg-ink-950 py-28 text-center text-white noise-overlay lg:py-36">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(45% 50% at 50% 0%, rgba(224,186,108,0.16), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex justify-center gap-1 text-gold-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            {stats[3].value} · {stats[3].label}
          </p>

          <h2 className="mt-6 font-display text-3xl sm:text-4xl font-semibold">{t("home.finalCta.title")}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">{t("home.finalCta.text")}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/dental-tourism#quote"
              className="rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 font-bold text-ink-950 transition-opacity hover:opacity-90"
            >
              {t("home.finalCta.cta1")}
            </Link>
            <a
              href="tel:+38733642648"
              className="rounded-full border-2 border-white/20 px-8 py-4 font-semibold transition-colors hover:border-gold-300"
            >
              {t("home.finalCta.cta2")}
            </a>
          </div>

          <a
            href="https://www.facebook.com/profile.php?id=100064060389558"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block text-sm font-medium text-white/40 underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold-300"
          >
            {t("home.trustCta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
