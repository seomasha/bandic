import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Users2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("nav.team") };
}

export default async function Team({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const doctors = t.raw("team.doctors");

  return (
    <div>
      <PageHero kicker={t("team.hero.kicker")} title={t("team.hero.title")} subtitle={t("team.hero.subtitle")} />

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {doctors.map((d, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-ink-900/5 overflow-hidden group hover:shadow-xl hover:shadow-gold-900/5 transition-all hover:-translate-y-1 duration-300">
                  <div className="aspect-[5/4] bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 flex items-center justify-center relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background: "radial-gradient(60% 60% at 30% 20%, rgba(224,186,108,0.25), transparent 60%)",
                      }}
                    />
                    <span className="relative font-display text-6xl font-semibold gold-text">
                      {d.name
                        .split(" ")
                        .filter((w) => /^[A-ZČĆŠĐŽ]/.test(w))
                        .map((n) => n[0])
                        .slice(-2)
                        .join("")}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-xl font-semibold text-ink-950">{d.name}</p>
                    <p className="mt-1.5 text-sm font-semibold text-gold-600">{d.title}</p>
                    <p className="mt-3 text-sm text-ink-600 leading-relaxed">{d.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 rounded-3xl bg-cream border border-ink-900/5 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-ink-950 flex items-center justify-center shrink-0">
                <Users2 size={26} className="text-gold-300" />
              </div>
              <p className="text-ink-700 leading-relaxed text-lg">{t("team.note")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-ink-950 text-white text-center noise-overlay">
        <Reveal className="mx-auto max-w-2xl px-5">
          <h2 className="font-display text-3xl font-semibold">{t("home.finalCta.title")}</h2>
          <p className="mt-4 text-white/70 leading-relaxed">{t("home.finalCta.text")}</p>
          <Link
            href="/dental-tourism#quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-bold px-7 py-4 hover:opacity-90 transition-opacity"
          >
            {t("home.finalCta.cta1")} <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
