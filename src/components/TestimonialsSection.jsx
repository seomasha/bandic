"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const FLAGS = {
  Germany: "🇩🇪", Njemačka: "🇩🇪", Deutschland: "🇩🇪",
  Austria: "🇦🇹", Austrija: "🇦🇹", Österreich: "🇦🇹",
  Switzerland: "🇨🇭", Švicarska: "🇨🇭", Schweiz: "🇨🇭",
  "United Kingdom": "🇬🇧", "Velika Britanija": "🇬🇧", Großbritannien: "🇬🇧",
};

function Carousel({ items }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const gap = 20;
    const distance = (card ? card.getBoundingClientRect().width : el.clientWidth) + gap;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group flex h-full w-full shrink-0 snap-start flex-col rounded-3xl border border-ink-900/10 bg-white p-8 shadow-sm shadow-ink-900/5 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-900/10 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
          >
            <Quote size={28} className="text-gold-400" />

            <div className="mt-4 flex gap-0.5 text-gold-500">
              {[...Array(5)].map((_, s) => (
                <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>

            <p className="mt-4 flex-1 font-display text-lg leading-relaxed text-ink-800">"{item.quote}"</p>

            <div className="mt-6 flex items-center gap-3 border-t border-ink-900/10 pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 font-display text-base font-semibold text-gold-700">
                {item.name}
              </span>
              <span className="text-sm font-medium text-ink-500">
                {FLAGS[item.location] && <span className="mr-1.5">{FLAGS[item.location]}</span>}
                {item.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        aria-label="Previous testimonials"
        className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-300/60 bg-white text-ink-900 shadow-md transition-all duration-500 hover:bg-gold-50 disabled:pointer-events-none disabled:opacity-0 sm:h-11 sm:w-11"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        aria-label="Next testimonials"
        className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-gold-300/60 bg-white text-ink-900 shadow-md transition-all duration-500 hover:bg-gold-50 disabled:pointer-events-none disabled:opacity-0 sm:h-11 sm:w-11"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-gold-100 to-gold-300/50 py-24 lg:py-32">
      <div className="absolute inset-0 noise-overlay opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-700">{t("kicker")}</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold leading-[1.08] text-ink-950">{t("title")}</h2>
        </motion.div>

        <div className="mt-16">
          <Carousel items={items} />
        </div>
      </div>
    </section>
  );
}
