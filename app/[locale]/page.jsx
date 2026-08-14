import { setRequestLocale } from "next-intl/server";
import HomeHero from "@/components/HomeHero";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TourismSection from "@/components/TourismSection";
import FinalCtaSection from "@/components/FinalCtaSection";

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <HomeHero />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <TourismSection />
      <FinalCtaSection />
    </div>
  );
}
