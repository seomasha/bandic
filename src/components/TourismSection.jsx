"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

const ORIGINS = [
  { x: 40, y: 92, path: "M40,92 Q200,58 338,298" },
  { x: 142, y: 38, path: "M142,38 Q262,76 338,298" },
  { x: 108, y: 142, path: "M108,142 Q252,138 338,298" },
  { x: 88, y: 192, path: "M88,192 Q244,222 338,298" },
  { x: 152, y: 202, path: "M152,202 Q262,244 338,298" },
];

function RouteMap({ caption }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0 lg:aspect-auto lg:h-full lg:w-auto lg:max-w-none lg:min-h-[560px]">
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full">
        {ORIGINS.map((o, i) => (
          <motion.path
            key={i}
            d={o.path}
            fill="none"
            stroke="#cfa04e"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="1 7"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 1.3, delay: 0.15 * i, ease: EASE }}
          />
        ))}

        {ORIGINS.map((o, i) => (
          <motion.circle
            key={`o-${i}`}
            cx={o.x}
            cy={o.y}
            r="3.5"
            fill="#9c7830"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.6, scale: 1 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.5, delay: 0.15 * i, ease: EASE }}
          />
        ))}

        <motion.circle
          cx="338"
          cy="298"
          r="18"
          fill="none"
          stroke="#b8903f"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: [0, 0.5, 0], scale: [0.6, 1.6, 2.1] }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 2.2, delay: 1, ease: "easeOut" }}
        />
        <motion.circle
          cx="338"
          cy="298"
          r="6.5"
          fill="url(#destGrad)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.5, delay: 0.95, ease: EASE }}
        />
        <defs>
          <radialGradient id="destGrad">
            <stop offset="0%" stopColor="#f5d99a" />
            <stop offset="100%" stopColor="#b8903f" />
          </radialGradient>
        </defs>

        <motion.g
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        >
          <text x="338" y="278" textAnchor="middle" className="fill-ink-900" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
            SARAJEVO
          </text>
        </motion.g>

        {/* → your smile: the story's final beat */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.7, delay: 1.7, ease: EASE }}
        >
          <path
            d="M300 340 c14 22 34 22 48 6"
            fill="none"
            stroke="url(#destGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.6, delay: 2, ease: EASE }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-600"
      >
        {caption}
      </motion.p>
    </div>
  );
}

export default function TourismSection() {
  const t = useTranslations("home.tourism");
  const [line1, line2] = t("title").split(". ");
  const points = [t("point1"), t("point2"), t("point3")];

  return (
    <section className="relative bg-cream py-28 lg:py-40 overflow-hidden">
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
            <span className="gold-text">{line2}</span>
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
                    <span className="shrink-0 font-display text-3xl font-semibold gold-text">0{i + 1}</span>
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
              className="flex h-full justify-center lg:justify-end"
            >
              <RouteMap caption={t("routeCaption")} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
