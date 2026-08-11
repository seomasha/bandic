import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactClient from "@/components/ContactClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("nav.contact") };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactClient />;
}
