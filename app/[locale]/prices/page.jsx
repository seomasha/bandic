import { getTranslations, setRequestLocale } from "next-intl/server";
import PricesClient from "@/components/PricesClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("nav.prices") };
}

export default async function PricesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricesClient />;
}
