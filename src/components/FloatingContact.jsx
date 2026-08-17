"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const t = useTranslations("common");
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/38761097008"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 shadow-lg shadow-ink-900/25 transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
        >
          {!reduceMotion && (
            <span className="absolute inset-0 rounded-full bg-gold-400/60 animate-ping" style={{ animationDuration: "2.4s" }} />
          )}
          <MessageCircle size={24} className="relative" strokeWidth={2.2} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
