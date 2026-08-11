import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bs", "de"],
  defaultLocale: "bs",
  localePrefix: "always",
});
