"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Landing({ onStart }) {
  const { t } = useLanguage();

  const points = [
    { title: t("heroPoint1Title"), body: t("heroPoint1Body"), icon: "🧭", bg: "bg-emerald-100" },
    { title: t("heroPoint2Title"), body: t("heroPoint2Body"), icon: "🎓", bg: "bg-indigo-100" },
    { title: t("heroPoint3Title"), body: t("heroPoint3Body"), icon: "💡", bg: "bg-amber-100" },
  ];

  const steps = [
    { title: t("howStep1Title"), body: t("howStep1Body"), color: "bg-emerald-600" },
    { title: t("howStep2Title"), body: t("howStep2Body"), color: "bg-indigo-600" },
    { title: t("howStep3Title"), body: t("howStep3Body"), color: "bg-amber-600" },
  ];

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="animate-blob-float pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-blob-float pointer-events-none absolute right-[-4rem] top-40 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        aria-hidden="true"
        className="animate-blob-float pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-10 sm:px-6 sm:py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt={t("siteName")}
          className="animate-fade-slide-up mb-4 h-auto w-40 sm:w-48"
        />
        <span
          className="animate-fade-slide-up mb-4 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800"
          style={{ animationDelay: "0.08s" }}
        >
          {t("heroKicker")}
        </span>
        <h1
          className="animate-fade-slide-up max-w-3xl text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl"
          style={{ animationDelay: "0.16s" }}
        >
          {t("heroTitle")}
        </h1>
        <p
          className="animate-fade-slide-up mt-5 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg"
          style={{ animationDelay: "0.24s" }}
        >
          {t("heroBody")}
        </p>

        <p
          className="animate-fade-slide-up mt-4 text-center text-sm font-semibold text-amber-700"
          style={{ animationDelay: "0.3s" }}
        >
          🤝 {t("heroReassurance")}
        </p>

        <button
          type="button"
          onClick={onStart}
          style={{ animationDelay: "0.36s" }}
          className="animate-fade-slide-up mt-6 rounded-full bg-emerald-700 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-700/20 transition-transform hover:scale-[1.03] hover:bg-emerald-800 active:scale-100"
        >
          {t("heroStart")}
        </button>
        <p
          className="animate-fade-slide-up mt-3 text-sm text-slate-500"
          style={{ animationDelay: "0.42s" }}
        >
          {t("heroTime")}
        </p>

        {/* How it works */}
        <div className="mt-16 w-full">
          <h2 className="text-center text-xl font-extrabold text-slate-900 sm:text-2xl">
            {t("howItWorksTitle")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-1/2 top-6 hidden h-0.5 w-full bg-orange-200 sm:block"
                  />
                )}
                <span
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white shadow-md ${s.color}`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 font-bold text-slate-900">{s.title}</h3>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <div
                className={`mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full text-2xl ${p.bg}`}
              >
                {p.icon}
              </div>
              <h3 className="mb-1.5 font-bold text-slate-900">{p.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
