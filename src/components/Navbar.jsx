"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "../i18n/navigation";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = document.getElementById("scroll-root");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 24);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/dental-tourism", label: t("nav.tourism") },
    { to: "/services", label: t("nav.services") },
    { to: "/team", label: t("nav.team") },
    { to: "/prices", label: t("nav.prices") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled || open ? "bg-white/90 backdrop-blur-lg shadow-sm shadow-ink-900/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`text-[0.9rem] font-semibold tracking-wide transition-colors ${
                  isActive
                    ? "text-gold-600"
                    : scrolled || open
                      ? "text-ink-700 hover:text-gold-600"
                      : "text-white/90 hover:text-gold-300"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher dark={!scrolled && !open} />
          <Link
            href="/dental-tourism#quote"
            className="btn-glow rounded-full bg-ink-900 text-white text-sm font-semibold px-5 py-2.5 hover:bg-gold-600 transition-colors"
          >
            {t("nav.bookNow")}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher dark={!scrolled && !open} />
          <button
            onClick={() => setOpen((o) => !o)}
            className={`p-2 transition-colors ${scrolled || open ? "text-ink-900" : "text-white"}`}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-ink-900/5 px-5 pb-6 pt-2">
          <nav className="flex flex-col gap-1">
            {links.map((l) => {
              const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className={`py-3 border-b border-ink-900/5 text-base font-semibold ${isActive ? "text-gold-600" : "text-ink-800"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/dental-tourism#quote"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center rounded-full bg-ink-900 text-white text-sm font-semibold px-5 py-3"
          >
            {t("nav.bookNow")}
          </Link>
        </div>
      )}
    </header>
  );
}
