"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Landing({ onStart }) {
  const { t } = useLanguage();

  const points = [
    { title: t("heroPoint1Title"), body: t("heroPoint1Body"), icon: "🧭" },
    { title: t("heroPoint2Title"), body: t("heroPoint2Body"), icon: "🎓" },
    { title: t("heroPoint3Title"), body: t("heroPoint3Body"), icon: "💡" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 py-10 sm:px-6 sm:py-16">
      <span className="mb-4 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800">
        {t("heroKicker")}
      </span>
      <h1 className="max-w-3xl text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
        {t("heroTitle")}
      </h1>
      <p className="mt-5 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg">
        {t("heroBody")}
      </p>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 rounded-full bg-emerald-700 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-700/20 transition-transform hover:scale-[1.03] hover:bg-emerald-800 active:scale-100"
      >
        {t("heroStart")}
      </button>
      <p className="mt-3 text-sm text-slate-500">{t("heroTime")}</p>

      <div className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {points.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-sm sm:p-6"
          >
            <div className="mb-3 text-3xl">{p.icon}</div>
            <h3 className="mb-1.5 font-bold text-slate-900">{p.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
