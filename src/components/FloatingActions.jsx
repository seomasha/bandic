import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const { t } = useTranslation();
  return (
    <a
      href="https://wa.me/38761097008"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg shadow-black/20 pl-4 pr-5 py-3.5 hover:scale-105 transition-transform"
      aria-label={t("common.whatsapp")}
    >
      <MessageCircle size={20} fill="white" className="text-[#25D366]" />
      <span className="text-sm font-semibold hidden sm:inline">{t("common.whatsapp")}</span>
    </a>
  );
}
