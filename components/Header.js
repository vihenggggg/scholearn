"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="no-print sticky top-0 z-20 border-b border-orange-100 bg-orange-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-emerald-800">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-700 text-white text-sm">
            S
          </span>
          {t("siteName")}
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-emerald-800">
            {t("navAbout")}
          </Link>
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-emerald-700 px-3 py-1.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-700 hover:text-white transition-colors"
            aria-label="Toggle language"
          >
            {lang === "km" ? "EN" : "ខ្មែរ"}
          </button>
        </nav>
      </div>
    </header>
  );
}
