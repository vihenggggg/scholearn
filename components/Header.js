"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="no-print sticky top-0 z-20 border-b border-orange-100 bg-orange-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" className="h-9 w-9 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="font-bold text-lg text-emerald-800">{t("siteName")}</span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">
              {t("siteTagline")}
            </span>
          </span>
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
