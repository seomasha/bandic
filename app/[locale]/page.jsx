import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Award, Users, Clock, Globe2, ReceiptText, ArrowRight, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/Reveal";
import HomeHero from "@/components/HomeHero";
import TrustSection from "@/components/TrustSection";
import WhyBandicSection from "@/components/WhyBandicSection";

const whyIcons = [Users, ShieldCheck, Award, Clock, Globe2, ReceiptText];

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const why = t.raw("home.why");
  const stats = t.raw("home.stats");
  const services = t.raw("serviceCategories");
  const doctors = t.raw("team.doctors");

  return (
    <div>
      <HomeHero />

      <TrustSection />

      <WhyBandicSection />

      {/* ABOUT */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.aboutKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950 leading-tight">
              {t("home.aboutTitle")}
            </h2>
            <p className="mt-6 text-ink-600 leading-relaxed text-lg">{t("home.aboutText")}</p>
            <Link
              href="/team"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-gold-700 hover:text-gold-600 gold-underline"
            >
              {t("home.teamCta")} <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-5">
              {[Users, ShieldCheck, Award, Clock].map((Icon, i) => {
                const labels = [stats[1].label, services[2].title, t("nav.team"), stats[2].label];
                return (
                  <div
                    key={i}
                    className={`rounded-2xl p-6 border border-ink-900/5 ${i % 2 === 0 ? "bg-cream" : "bg-ink-950 text-white"} ${i === 1 ? "translate-y-6" : ""} ${i === 3 ? "translate-y-6" : ""}`}
                  >
                    <Icon className={i % 2 === 0 ? "text-gold-600" : "text-gold-300"} size={26} />
                    <p className={`mt-4 text-sm font-semibold ${i % 2 === 0 ? "text-ink-800" : "text-white"}`}>{labels[i]}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.whyKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("home.whyTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {why.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="h-full rounded-2xl bg-white p-7 border border-ink-900/5 hover:border-gold-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-gold-900/5">
                    <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center">
                      <Icon size={20} className="text-gold-600" />
                    </div>
                    <p className="mt-5 font-display text-xl font-semibold text-ink-950">{w.title}</p>
                    <p className="mt-2.5 text-sm text-ink-600 leading-relaxed">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.servicesKicker")}</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("home.servicesTitle")}</h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-ink-800 hover:text-gold-600 shrink-0">
              {t("common.viewAll")} <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  href="/services"
                  className="group block h-full rounded-2xl border border-ink-900/5 p-7 hover:bg-ink-950 transition-colors duration-300"
                >
                  <span className="text-xs font-bold text-gold-600 group-hover:text-gold-300">0{i + 1}</span>
                  <p className="mt-3 font-display text-xl font-semibold text-ink-950 group-hover:text-white transition-colors">
                    {s.title}
                  </p>
                  <p className="mt-2.5 text-sm text-ink-600 group-hover:text-white/60 leading-relaxed transition-colors">
                    {s.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 group-hover:text-gold-300">
                    {t("common.learnMore")} <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TOURISM BANNER */}
      <section className="relative py-24 bg-ink-950 text-white overflow-hidden noise-overlay">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 90% 10%, rgba(184,144,63,0.3), transparent 60%), radial-gradient(40% 40% at 10% 90%, rgba(184,144,63,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-300">{t("home.tourism.kicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold leading-tight">{t("home.tourism.title")}</h2>
            <p className="mt-6 text-white/70 leading-relaxed text-lg">{t("home.tourism.text")}</p>
            <Link
              href="/dental-tourism"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-bold px-7 py-4 hover:opacity-90 transition-opacity"
            >
              {t("home.tourism.cta")} <ArrowRight size={18} />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="grid gap-4">
            {[t("home.tourism.point1"), t("home.tourism.point2"), t("home.tourism.point3")].map((p, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <span className="w-8 h-8 shrink-0 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="text-white/85 leading-relaxed">{p}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TEAM PREVIEW */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.teamKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("home.teamTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.slice(0, 4).map((d, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="rounded-2xl bg-white border border-ink-900/5 overflow-hidden group hover:shadow-lg hover:shadow-gold-900/5 transition-shadow">
                  <div className="aspect-[4/5] bg-gradient-to-br from-gold-100 via-cream to-white flex items-center justify-center relative overflow-hidden">
                    <span className="font-display text-5xl font-semibold gold-text opacity-80">
                      {d.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(-2)
                        .join("")}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <p className="font-display text-lg font-semibold text-ink-950 leading-snug">{d.name}</p>
                    <p className="mt-1 text-xs font-semibold text-gold-600 leading-snug">{d.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/team" className="inline-flex items-center gap-2 font-semibold text-ink-800 hover:text-gold-600">
              {t("home.teamCta")} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <div className="flex justify-center text-gold-500 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("home.trustKicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("home.trustTitle")}</h2>
            <p className="mt-6 text-ink-600 leading-relaxed text-lg max-w-2xl mx-auto">{t("home.trustText")}</p>
            <a
              href="https://www.facebook.com/profile.php?id=100064060389558"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink-900/15 text-ink-900 font-semibold px-7 py-4 hover:border-gold-400 transition-colors"
            >
              {t("home.trustCta")} <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-ink-950 text-white text-center noise-overlay">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{t("home.finalCta.title")}</h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">{t("home.finalCta.text")}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/dental-tourism#quote"
                className="rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-bold px-7 py-4 hover:opacity-90 transition-opacity"
              >
                {t("home.finalCta.cta1")}
              </Link>
              <a
                href="tel:+38733642648"
                className="rounded-full border-2 border-white/20 font-semibold px-7 py-4 hover:border-gold-300 transition-colors"
              >
                {t("home.finalCta.cta2")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
