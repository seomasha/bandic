import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 pt-20">
      <p className="text-gold-500 font-display text-8xl font-semibold">404</p>
      <p className="mt-4 text-ink-600">Page not found.</p>
      <Link href="/" className="mt-8 rounded-full bg-ink-900 text-white text-sm font-semibold px-6 py-3 hover:bg-gold-600 transition-colors">
        {t("nav.home")}
      </Link>
    </div>
  );
}
