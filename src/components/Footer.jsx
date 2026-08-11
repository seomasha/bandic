import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "../i18n/navigation";
import Logo from "./Logo";

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.34C16.3 4.24 15.4 4.15 14.35 4.15c-2.4 0-4.05 1.47-4.05 4.16v2.34H7.8v3h2.5V21h3.2Z" />
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  const t = useTranslations();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/dental-tourism", label: t("nav.tourism") },
    { to: "/services", label: t("nav.services") },
    { to: "/team", label: t("nav.team") },
    { to: "/prices", label: t("nav.prices") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-ink-950 text-white/80 noise-overlay">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-5 text-sm leading-relaxed text-white/60 max-w-xs">{t("footer.tagline")}</p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100064060389558"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={17} />
            </a>
            <a
              href="https://www.instagram.com/poliklinika.bandic"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-300 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={17} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-white text-sm font-semibold tracking-wide uppercase mb-5">{t("footer.quickLinks")}</p>
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="text-sm text-white/60 hover:text-gold-300 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold tracking-wide uppercase mb-5">{t("footer.getInTouch")}</p>
          <ul className="space-y-3.5 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin size={17} className="shrink-0 text-gold-400 mt-0.5" />
              <span>{t("common.address")}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={17} className="shrink-0 text-gold-400 mt-0.5" />
              <a href="tel:+38733642648" className="hover:text-gold-300">
                {t("common.phone")}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={17} className="shrink-0 text-gold-400 mt-0.5" />
              <a href="mailto:info@doc-bandic.com" className="hover:text-gold-300">
                {t("common.email")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold tracking-wide uppercase mb-5">{t("common.workingHours")}</p>
          <ul className="space-y-3.5 text-sm text-white/60">
            <li className="flex gap-3">
              <Clock size={17} className="shrink-0 text-gold-400 mt-0.5" />
              <div>
                <p>{t("common.hoursWeek")}</p>
                <p>{t("common.hoursSat")}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Poliklinika Bandić. {t("footer.rights")}</p>
          <p className="max-w-xl text-center md:text-right">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
