import { getTranslations, setRequestLocale } from "next-intl/server";
import { Stethoscope, Scissors, Anchor, Smile, Layers, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const icons = [Stethoscope, Scissors, Anchor, Smile, Layers, Sparkles];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("nav.services") };
}

export default async function Services({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const services = t.raw("serviceCategories");

  return (
    <div>
      <PageHero kicker={t("nav.services")} title={t("home.servicesTitle")} subtitle={t("home.aboutText")} />

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid gap-8">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            const reverse = i % 2 === 1;
            return (
              <Reveal key={s.slug} delay={i * 0.04}>
                <div
                  className={`grid lg:grid-cols-[0.9fr_1.3fr] gap-8 items-center rounded-3xl border border-ink-900/5 p-8 lg:p-10 hover:border-gold-300 transition-colors ${
                    reverse ? "bg-cream" : "bg-white"
                  }`}
                >
                  <div className={reverse ? "lg:order-2" : ""}>
                    <div className="w-14 h-14 rounded-2xl bg-ink-950 flex items-center justify-center">
                      <Icon size={26} className="text-gold-300" />
                    </div>
                    <p className="mt-5 text-xs font-bold text-gold-600 tracking-widest">0{i + 1}</p>
                    <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-ink-950">{s.title}</h2>
                  </div>
                  <div className={reverse ? "lg:order-1" : ""}>
                    <p className="text-ink-600 leading-relaxed text-lg">{s.text}</p>
                    <Link
                      href="/prices"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-700 hover:text-gold-600 gold-underline"
                    >
                      {t("nav.prices")} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-ink-950 text-white text-center noise-overlay">
        <Reveal className="mx-auto max-w-2xl px-5">
          <h2 className="font-display text-3xl font-semibold">{t("prices.cta.title")}</h2>
          <p className="mt-4 text-white/70 leading-relaxed">{t("prices.cta.text")}</p>
          <Link
            href="/dental-tourism#quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-bold px-7 py-4 hover:opacity-90 transition-opacity"
          >
            {t("prices.cta.button")} <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
