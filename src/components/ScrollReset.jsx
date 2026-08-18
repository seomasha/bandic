"use client";

import { useEffect } from "react";
import { usePathname } from "../i18n/navigation";

export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    const el = document.getElementById("scroll-root");
    if (el) el.scrollTop = 0;
  }, [pathname]);

  return null;
}
