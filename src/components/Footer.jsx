import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "../i18n/navigation";
import Logo from "./Logo";
import { Facebook, Instagram, Threads, LinkedIn, TikTok } from "./SocialIcons";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100064060389558", Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/poliklinika.bandic", Icon: Instagram },
  { label: "Threads", href: "https://www.threads.com/@poliklinika.bandic", Icon: Threads },
  { label: "TikTok", href: "https://www.tiktok.com/@poliklinika_bandic", Icon: TikTok },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/poliklinikabandic", Icon: LinkedIn },
];

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
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold-400 hover:text-gold-300 transition-colors"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
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
