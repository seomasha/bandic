"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function ToothCrownVisual({ className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id="stageGlow" cx="50%" cy="46%" r="55%">
            <stop offset="0%" stopColor="#e0ba6c" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e0ba6c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="crownGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5d99a" />
            <stop offset="45%" stopColor="#cfa04e" />
            <stop offset="100%" stopColor="#9c7830" />
          </linearGradient>
          <linearGradient id="toothGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbf8f2" />
            <stop offset="100%" stopColor="#e7e1d4" />
          </linearGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="crownClip">
            <path d="M164 168 C164 150 178 138 200 138 C222 138 236 150 236 168 C236 178 228 184 200 184 C172 184 164 178 164 168 Z" />
          </clipPath>
        </defs>

        <circle cx="200" cy="190" r="170" fill="url(#stageGlow)" />

        {/* pedestal / gumline arc */}
        <motion.ellipse
          cx="200"
          cy="272"
          rx="86"
          ry="16"
          fill="none"
          stroke="#121214"
          strokeOpacity="0.08"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* prepared tooth stump — flat-topped prep shape */}
        <motion.g
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <path
            d="M158 260 C155 205 160 175 168 168 C178 159 222 159 232 168 C240 175 245 205 242 260 C242 268 158 268 158 260 Z"
            fill="url(#toothGrad)"
            stroke="#d8d0bd"
            strokeWidth="1"
          />
          {/* prep line detail */}
          <path d="M166 172 C178 165 222 165 234 172" fill="none" stroke="#cfa04e" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.6" />
        </motion.g>

        {/* the gold crown — descends and seats precisely */}
        <motion.g
          initial={{ y: -86, rotate: -7, opacity: 0 }}
          whileInView={{
            y: 0,
            rotate: 0,
            opacity: 1,
          }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: reduceMotion ? 0.6 : 1.7,
            delay: 0.5,
            ease: EASE,
          }}
          style={{ transformOrigin: "200px 166px" }}
        >
          <path
            d="M164 168 C164 150 178 138 200 138 C222 138 236 150 236 168 C236 178 228 184 200 184 C172 184 164 178 164 168 Z"
            fill="url(#crownGrad)"
            filter="url(#softGlow)"
          />
          <path d="M178 150 C186 145 214 145 222 150" fill="none" stroke="#fbf0d9" strokeWidth="1.3" opacity="0.75" />
          <path d="M172 164 C182 170 218 170 228 164" fill="none" stroke="#7c5f26" strokeWidth="1" opacity="0.5" />
        </motion.g>

        {/* seating pulse — confirms the precise fit */}
        <motion.circle
          cx="200"
          cy="168"
          r="10"
          fill="none"
          stroke="#e0ba6c"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: [0, 0.7, 0], scale: [0.7, 2.6, 3.4] }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 2.05, ease: "easeOut" }}
        />

        {/* slow ambient shimmer sweep across the seated crown, masked to its shape */}
        {!reduceMotion && (
          <g clipPath="url(#crownClip)">
            <motion.rect
              y="130"
              width="22"
              height="60"
              fill="#fff"
              opacity="0.18"
              initial={{ x: 150 }}
              animate={{ x: [150, 244] }}
              transition={{ duration: 2.6, delay: 3, repeat: Infinity, repeatDelay: 4.8, ease: "easeInOut" }}
              style={{ mixBlendMode: "overlay" }}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
