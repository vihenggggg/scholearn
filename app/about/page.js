"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const sections = [
    { title: t("aboutWhy"), body: t("aboutWhyBody") },
    { title: t("aboutHowTitle"), body: t("aboutHowBody") },
    { title: t("aboutLimitTitle"), body: t("aboutLimitBody") },
    { title: t("aboutDataTitle"), body: t("aboutDataBody") },
    { title: t("aboutPrivacyTitle"), body: t("aboutPrivacyBody") },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t("aboutTitle")}</h1>
      <p className="mt-4 text-lg leading-relaxed text-emerald-800">{t("aboutIntro")}</p>

      <div className="mt-8 flex flex-col gap-6">
        {sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-8 inline-block font-semibold text-emerald-800 hover:text-emerald-900"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
