"use client";

import { motion } from "framer-motion";

export default function SectionDivider({ className = "" }) {
  return (
    <div className={`relative mx-auto max-w-7xl px-5 lg:px-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-40px 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-400/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold-400/60" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-400/30" />
      </motion.div>
    </div>
  );
}
