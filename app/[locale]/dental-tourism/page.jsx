import { getTranslations, setRequestLocale } from "next-intl/server";
import DentalTourismClient from "@/components/DentalTourismClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("nav.tourism") };
}

export default async function DentalTourismPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DentalTourismClient />;
}
