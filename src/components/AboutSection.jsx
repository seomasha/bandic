"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

const PHOTOS = [{ src: "/gallery/clinic-team-1.jpg", alt: "Poliklinika Bandić — clinic team" }];

function Carousel() {
  const [index, setIndex] = useState(0);
  const multi = PHOTOS.length > 1;

  useEffect(() => {
    if (!multi) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), 4500);
    return () => clearInterval(id);
  }, [multi]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg shadow-ink-900/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={PHOTOS[index].src}
            alt={PHOTOS[index].alt}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink-900/10" />

      {multi && (
        <>
          <button
            onClick={() => setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md transition-colors hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % PHOTOS.length)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md transition-colors hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AboutSection() {
  const t = useTranslations();

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

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            className="lg:col-span-5"
          >
            <Carousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
