"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Landing({ onStart }) {
  const { t } = useLanguage();

  const points = [
    { title: t("heroPoint1Title"), body: t("heroPoint1Body"), icon: "🧭" },
    { title: t("heroPoint2Title"), body: t("heroPoint2Body"), icon: "🎓" },
    { title: t("heroPoint3Title"), body: t("heroPoint3Body"), icon: "💡" },
  ];

  const steps = [
    { title: t("howStep1Title"), body: t("howStep1Body"), color: "bg-emerald-600" },
    { title: t("howStep2Title"), body: t("howStep2Body"), color: "bg-indigo-600" },
    { title: t("howStep3Title"), body: t("howStep3Body"), color: "bg-amber-600" },
  ];

  const stats = [
    { value: "28", label: t("statCareers") },
    { value: "16", label: t("statDimensions") },
    { value: "10", label: t("statScholarships") },
    { value: "100%", label: t("statFree") },
  ];

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
        style={{
          backgroundImage: "radial-gradient(circle, #d9c9b8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          opacity: 0.5,
        }}
      />
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

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero: asymmetric two-column on desktop */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Left: copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span
              className="animate-fade-slide-up mb-4 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800"
            >
              {t("heroKicker")}
            </span>
            <h1
              className="animate-fade-slide-up max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
              style={{ animationDelay: "0.08s" }}
            >
              {t("heroTitle")}
            </h1>
            <p
              className="animate-fade-slide-up mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
              style={{ animationDelay: "0.16s" }}
            >
              {t("heroBody")}
            </p>

            <p
              className="animate-fade-slide-up mt-4 max-w-xl text-sm font-semibold text-amber-700"
              style={{ animationDelay: "0.22s" }}
            >
              🤝 {t("heroReassurance")}
            </p>

            <div
              className="animate-fade-slide-up mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
              style={{ animationDelay: "0.28s" }}
            >
              <button
                type="button"
                onClick={onStart}
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-emerald-700 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-700/20 transition-transform hover:scale-[1.03] hover:bg-emerald-800 active:scale-100"
              >
                {t("heroStart")}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
              <span className="text-sm text-slate-500">{t("heroTime")}</span>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-slide-up mt-10 grid w-full max-w-xl grid-cols-2 gap-4 sm:grid-cols-4"
              style={{ animationDelay: "0.34s" }}
            >
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-orange-100 bg-white/70 px-3 py-3 text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-emerald-800">{s.value}</div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual showcase */}
          <div className="animate-fade-slide-up relative mx-auto hidden w-full max-w-sm lg:block" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-[2rem] border border-orange-100 bg-white p-8 shadow-xl shadow-orange-900/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={t("siteName")} className="mx-auto h-auto w-full" />
            </div>
            <div className="animate-blob-float absolute -left-8 top-6 rounded-2xl border border-orange-100 bg-white px-4 py-2.5 shadow-lg">
              <span className="text-sm font-bold text-slate-800">🎯 16 {t("statDimensions")}</span>
            </div>
            <div
              className="animate-blob-float absolute -right-6 bottom-10 rounded-2xl border border-orange-100 bg-white px-4 py-2.5 shadow-lg"
              style={{ animationDelay: "3s" }}
            >
              <span className="text-sm font-bold text-slate-800">🎓 28 {t("statCareers")}</span>
            </div>
          </div>

          {/* Mobile-only logo (below copy, above stats already shown) */}
          <div className="order-first flex justify-center lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={t("siteName")} className="animate-fade-slide-up h-auto w-40" />
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20 w-full">
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
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border-2 border-emerald-100 text-2xl">
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
