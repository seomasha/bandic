import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  PiggyBank,
  ShieldCheck,
  Languages,
  PlaneTakeoff,
  Landmark,
  UserCheck,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import Reveal from "../components/Reveal";
import FileDropzone from "../components/FileDropzone";
import Accordion from "../components/Accordion";

const whyIcons = [PiggyBank, ShieldCheck, Languages, PlaneTakeoff, Landmark, UserCheck];

export default function DentalTourism() {
  const { t } = useTranslation();
  const whyItems = t("tourism.why.items", { returnObjects: true });
  const rows = t("tourism.comparison.rows", { returnObjects: true });
  const headers = t("tourism.comparison.headers", { returnObjects: true });
  const stayItems = t("tourism.stay.items", { returnObjects: true });
  const steps = t("tourism.process.steps", { returnObjects: true });
  const treatments = t("tourism.form.treatments", { returnObjects: true });
  const faqItems = t("tourism.faq.items", { returnObjects: true });

  const [files, setFiles] = useState([]);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    treatment: treatments[0] || "",
    dates: "",
    message: "",
    consent: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fileNote =
      files.length > 0
        ? `\n\nFiles selected (please attach manually — ${files.length}):\n${files.map((f) => "- " + f.name).join("\n")}`
        : "";
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nCountry: ${form.country}\nTreatment: ${form.treatment}\nPreferred dates: ${form.dates}\n\nMessage:\n${form.message}${fileNote}`
    );
    window.location.href = `mailto:info@doc-bandic.com?subject=${encodeURIComponent(
      "Free quote request — " + form.name
    )}&body=${body}`;
    setSent(true);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-ink-950 text-white pt-40 pb-28 overflow-hidden noise-overlay">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 85% 10%, rgba(184,144,63,0.32), transparent 60%), radial-gradient(45% 45% at 10% 90%, rgba(184,144,63,0.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <p className="text-gold-300 text-xs font-bold tracking-[0.3em] uppercase mb-4">{t("tourism.hero.kicker")}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08]">
              {t("tourism.hero.title")}
            </h1>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">{t("tourism.hero.subtitle")}</p>
            <a
              href="#quote"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-ink-950 font-bold px-7 py-4 hover:opacity-90 transition-opacity"
            >
              {t("tourism.hero.cta")} <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("tourism.why.title")}</h2>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="h-full rounded-2xl bg-cream p-7 border border-ink-900/5">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
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

      {/* COMPARISON */}
      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("tourism.comparison.kicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("tourism.comparison.title")}</h2>
            <p className="mt-5 text-ink-600 leading-relaxed">{t("tourism.comparison.subtitle")}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 overflow-x-auto rounded-2xl border border-ink-900/10 bg-white scrollbar-thin">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-ink-950 text-white">
                  <th className="px-6 py-4 font-semibold text-sm">{headers.treatment}</th>
                  <th className="px-6 py-4 font-semibold text-sm">{headers.sarajevo}</th>
                  <th className="px-6 py-4 font-semibold text-sm">{headers.europe}</th>
                  <th className="px-6 py-4 font-semibold text-sm text-gold-300">{headers.savings}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream/60"}>
                    <td className="px-6 py-5 font-medium text-ink-900">{r.treatment}</td>
                    <td className="px-6 py-5 text-gold-700 font-semibold">{r.sarajevo}</td>
                    <td className="px-6 py-5 text-ink-500">{r.europe}</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 text-gold-700 font-bold text-sm px-3 py-1">
                        <TrendingDown size={14} /> {r.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-xs text-ink-500 leading-relaxed max-w-3xl">{t("tourism.comparison.footnote")}</p>
          </Reveal>
        </div>
      </section>

      {/* STAY GUIDE */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("tourism.stay.kicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("tourism.stay.title")}</h2>
            <p className="mt-5 text-ink-600 leading-relaxed">{t("tourism.stay.subtitle")}</p>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stayItems.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-ink-900/5 p-7 hover:border-gold-300 transition-colors">
                  <div className="flex items-center gap-2 text-gold-600">
                    <CalendarDays size={18} />
                    <span className="font-bold text-sm">{s.duration}</span>
                  </div>
                  <p className="mt-4 font-display text-lg font-semibold text-ink-950">{s.title}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-400">{s.visits}</p>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-ink-950 text-white noise-overlay">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Reveal className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-300">{t("tourism.process.kicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold">{t("tourism.process.title")}</h2>
          </Reveal>
          <div className="mt-16 grid gap-8 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.08} className="relative">
                <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:text-center">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-ink-950 font-bold flex items-center justify-center font-display text-lg">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold">{s.title}</p>
                    <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{s.text}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(50%+2.5rem)] w-[calc(100%-3rem)] h-px bg-gradient-to-r from-gold-500/50 to-transparent" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" className="py-24 bg-cream scroll-mt-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("tourism.form.kicker")}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("tourism.form.title")}</h2>
            <p className="mt-5 text-ink-600 leading-relaxed max-w-2xl mx-auto">{t("tourism.form.subtitle")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 rounded-3xl bg-white border border-ink-900/5 p-6 sm:p-10 shadow-sm">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-14"
                >
                  <CheckCircle2 size={52} className="text-gold-500" />
                  <p className="mt-5 text-lg text-ink-800 font-medium max-w-md">{t("tourism.form.success")}</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.name")}</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.email")}</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.phone")}</label>
                      <input
                        required
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.country")}</label>
                      <input
                        required
                        name="country"
                        value={form.country}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.treatment")}</label>
                      <select
                        name="treatment"
                        value={form.treatment}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      >
                        {treatments.map((tr) => (
                          <option key={tr} value={tr}>
                            {tr}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.dates")}</label>
                      <input
                        name="dates"
                        value={form.dates}
                        onChange={onChange}
                        placeholder="e.g. October 2026"
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink-800">{t("tourism.form.fields.message")}</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder={t("tourism.form.fields.messagePlaceholder")}
                      className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                    />
                  </div>

                  <FileDropzone
                    files={files}
                    setFiles={setFiles}
                    label={t("tourism.form.fields.upload")}
                    hint={t("tourism.form.fields.uploadHint")}
                    dragLabel={t("tourism.form.fields.uploadDrag")}
                  />

                  <label className="flex items-start gap-3 text-sm text-ink-600">
                    <input
                      required
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={onChange}
                      className="mt-1 w-4 h-4 accent-gold-500"
                    />
                    {t("tourism.form.fields.consent")}
                  </label>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 text-white font-semibold px-7 py-4 hover:bg-gold-600 transition-colors"
                  >
                    {t("tourism.form.fields.submit")} <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink-950">{t("tourism.faq.title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={faqItems} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
