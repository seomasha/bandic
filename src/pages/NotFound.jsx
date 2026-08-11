import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 pt-20">
      <p className="text-gold-500 font-display text-8xl font-semibold">404</p>
      <p className="mt-4 text-ink-600">Page not found.</p>
      <Link to="/" className="mt-8 rounded-full bg-ink-900 text-white text-sm font-semibold px-6 py-3 hover:bg-gold-600 transition-colors">
        {t("nav.home")}
      </Link>
    </div>
  );
}
