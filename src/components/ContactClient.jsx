"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function ContactClient() {
  const t = useTranslations();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `${t("contact.form.name")}: ${form.name}\n${t("contact.form.phone")}: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:info@doc-bandic.com?subject=${encodeURIComponent(
      "Website enquiry — " + form.name
    )}&body=${body}`;
    setSent(true);
  };

  const mapSrc = "https://www.google.com/maps?q=Antuna+Branka+Simica+2+Sarajevo&output=embed";

  return (
    <div>
      <PageHero kicker={t("contact.hero.kicker")} title={t("contact.hero.title")} subtitle={t("contact.hero.subtitle")} />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-gold-600">{t("contact.infoTitle")}</p>
            <div className="mt-6 space-y-5">
              {[
                { Icon: MapPin, text: t("common.address") },
                { Icon: Phone, text: t("common.phone"), href: "tel:+38733642648" },
                { Icon: MessageCircle, text: `${t("common.whatsapp")}: ${t("common.mobile")}`, href: "https://wa.me/38761097008" },
                { Icon: Mail, text: t("common.email"), href: "mailto:info@doc-bandic.com" },
              ].map(({ Icon, text, href }, i) => {
                const Comp = href ? "a" : "div";
                return (
                  <Comp
                    key={i}
                    {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 rounded-2xl border border-ink-900/5 p-5 hover:border-gold-300 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold-600" />
                    </div>
                    <p className="text-ink-800 font-medium">{text}</p>
                  </Comp>
                );
              })}
              <div className="flex items-start gap-4 rounded-2xl border border-ink-900/5 p-5">
                <div className="w-11 h-11 rounded-xl bg-gold-50 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-gold-600" />
                </div>
                <div>
                  <p className="text-ink-800 font-medium">{t("common.hoursWeek")}</p>
                  <p className="text-ink-800 font-medium">{t("common.hoursSat")}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl overflow-hidden border border-ink-900/5 aspect-video">
              <iframe
                title="Poliklinika Bandić — map"
                src={mapSrc}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-cream border border-ink-900/5 p-8 lg:p-10">
              <p className="font-display text-2xl font-semibold text-ink-950">{t("contact.form.title")}</p>
              {sent ? (
                <div className="mt-8 flex flex-col items-center text-center py-10">
                  <CheckCircle2 size={44} className="text-gold-500" />
                  <p className="mt-4 text-ink-700 font-medium">{t("tourism.form.success")}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-7 space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-ink-800">{t("contact.form.name")}</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("contact.form.email")}</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-ink-800">{t("contact.form.phone")}</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink-800">{t("contact.form.message")}</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      className="mt-2 w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 text-white font-semibold px-7 py-4 hover:bg-gold-600 transition-colors"
                  >
                    {t("contact.form.submit")} <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
