import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ScrollReset from "@/components/ScrollReset";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: {
      template: `%s — ${t("clinicName")}`,
      default: `${t("clinicName")} — Dental Clinic Sarajevo`,
    },
    description:
      "Poliklinika Bandić — a modern dental clinic in Sarajevo. Implants, orthodontics, prosthetics & aesthetic dentistry. A trusted dental tourism destination for patients from across Europe.",
    metadataBase: new URL("https://doc-bandic.com"),
    alternates: {
      languages: { en: "/en", bs: "/bs", de: "/de" },
    },
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: `${t("clinicName")} — Dental Clinic Sarajevo`,
      description:
        "A modern dental clinic in Sarajevo. Implants, orthodontics, prosthetics & aesthetic dentistry — a trusted dental tourism destination for patients from across Europe.",
      url: `https://doc-bandic.com/${locale}`,
      siteName: t("clinicName"),
      images: [{ url: "/brand/logo-badge.jpg", width: 340, height: 340, alt: t("clinicName") }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${t("clinicName")} — Dental Clinic Sarajevo`,
      description:
        "A modern dental clinic in Sarajevo. Implants, orthodontics, prosthetics & aesthetic dentistry — a trusted dental tourism destination for patients from across Europe.",
      images: ["/brand/logo-badge.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="h-dvh overflow-hidden">
        <NextIntlClientProvider>
          <ScrollReset />
          <Navbar />
          <div id="scroll-root" className="flex h-full flex-col overflow-y-auto overscroll-y-contain">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingContact />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
