"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, PlaneTakeoff } from "lucide-react";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1];

const ORIGINS = [
  { code: "DE", x: 40, y: 92, path: "M40,92 Q200,58 338,298", labelDx: -12, labelDy: -8 },
  { code: "AT", x: 142, y: 38, path: "M142,38 Q262,76 338,298", labelDx: 0, labelDy: -12 },
  { code: "CH", x: 108, y: 142, path: "M108,142 Q252,138 338,298", labelDx: -18, labelDy: 4 },
  { code: "UK", x: 88, y: 192, path: "M88,192 Q244,222 338,298", labelDx: -18, labelDy: 4 },
  { code: "SCA", x: 152, y: 202, path: "M152,202 Q262,244 338,298", labelDx: 0, labelDy: -12 },
];

function RouteMap({ caption }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0 lg:aspect-auto lg:max-w-none lg:h-full lg:min-h-[560px]">
      <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="destGrad">
            <stop offset="0%" stopColor="#f5d99a" />
            <stop offset="100%" stopColor="#b8903f" />
          </radialGradient>
          <filter id="routeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="cometGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint concentric rings for a "radar" backdrop */}
        {[70, 115, 160].map((r) => (
          <circle key={r} cx="338" cy="298" r={r} fill="none" stroke="#b8903f" strokeWidth="0.6" opacity="0.08" />
        ))}

        {ORIGINS.map((o, i) => (
          <motion.path
            key={i}
            d={o.path}
            fill="none"
            stroke="#cfa04e"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="1 7"
            filter="url(#routeGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 1.3, delay: 0.15 * i, ease: EASE }}
          />
        ))}

        {/* travelling comet along each route, looping */}
        {ORIGINS.map((o, i) => (
          <motion.circle
            key={`comet-${i}`}
            r="4.5"
            fill="#fff6e0"
            filter="url(#cometGlow)"
            initial={{ opacity: 0 }}
            style={{ offsetPath: `path("${o.path}")` }}
            whileInView={{
              opacity: [0, 1, 1, 0],
              offsetDistance: ["0%", "0%", "100%", "100%"],
            }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{
              duration: 3.2,
              delay: 1.8 + i * 0.6,
              repeat: Infinity,
              repeatDelay: (ORIGINS.length - 1) * 0.6 + 1.6,
              ease: EASE,
              times: [0, 0.05, 0.85, 1],
            }}
          />
        ))}

        {ORIGINS.map((o, i) => (
          <g key={`o-${i}`}>
            <motion.circle
              cx={o.x}
              cy={o.y}
              r="3.5"
              fill="#9c7830"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.7, scale: 1 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: EASE }}
            />
            <motion.text
              x={o.x + o.labelDx}
              y={o.y + o.labelDy}
              textAnchor="middle"
              className="fill-white"
              style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true, margin: "-100px 0px" }}
              transition={{ duration: 0.5, delay: 0.3 + 0.15 * i, ease: EASE }}
            >
              {o.code}
            </motion.text>
          </g>
        ))}

        {/* continuous arrival pulse at Sarajevo */}
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
          transition={{ duration: 2.2, delay: 1, repeat: Infinity, repeatDelay: 1.6, ease: "easeOut" }}
        />
        <motion.circle
          cx="338"
          cy="298"
          r="6.5"
          fill="url(#destGrad)"
          filter="url(#routeGlow)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: [1, 1.12, 1] }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{
            opacity: { duration: 0.5, delay: 0.95, ease: EASE },
            scale: { duration: 2.6, delay: 1.4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.g
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        >
          <text x="338" y="278" textAnchor="middle" className="fill-white" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-300"
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
    <section className="relative overflow-hidden bg-ink-950 py-28 text-white noise-overlay lg:py-40">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(55% 55% at 85% 10%, rgba(184,144,63,0.28), transparent 60%), radial-gradient(45% 45% at 5% 95%, rgba(184,144,63,0.14), transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[32rem] w-[32rem] rounded-full border border-gold-400/15 hidden lg:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-32 h-80 w-80 rounded-full border border-gold-400/15 hidden lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-3xl"
        >
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-gold-300">
            <PlaneTakeoff size={14} />
            {t("kicker")}
          </p>
          <h2 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.03] text-cream">
            {line1}.
            <br />
            <span className="text-gold-300">{line2}</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="max-w-xl text-lg leading-relaxed text-white/65"
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
                    <span className="shrink-0 font-display text-3xl font-semibold text-gold-300">0{i + 1}</span>
                    <p className="pt-1 text-base sm:text-lg leading-relaxed text-white/80">{p}</p>
                  </div>
                  {i < points.length - 1 && <div className="h-px w-full bg-white/10" />}
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
                className="group mt-12 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 font-bold uppercase tracking-wide text-ink-950 transition-opacity hover:opacity-90"
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
