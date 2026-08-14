"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "../i18n/navigation";

const LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "bs", label: "Bosanski", short: "BS" },
  { code: "de", label: "Deutsch", short: "DE" },
];

export default function LanguageSwitcher({ dark = false }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === locale) || LANGS[1];

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold transition-colors cursor-pointer ${
          dark
            ? "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-gold-300/70"
            : "border-ink-900/10 text-ink-900 hover:border-gold-400/60"
        }`}
        aria-label="Change language"
      >
        {current.short}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl border border-ink-900/10 bg-white shadow-xl shadow-ink-900/10 overflow-hidden z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setOpen(false);
                startTransition(() => {
                  router.replace(pathname, { locale: l.code });
                });
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-ink-800 hover:bg-gold-50 cursor-pointer"
            >
              {l.label}
              {l.code === current.code && <Check size={14} className="text-gold-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
