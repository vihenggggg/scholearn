"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { matchedScholarships } from "@/lib/scholarships";
import { buildWhyFitsText } from "@/lib/matchExplanation";

export default function CareerCard({ result, rank }) {
  const { t, lang } = useLanguage();
  const { career, score, drivers } = result;
  const scholarships = matchedScholarships(career);

  const title = lang === "km" ? career.title_km : career.title_en;
  const subtitle = lang === "km" ? career.title_en : career.title_km;
  const description = lang === "km" ? career.description_km : career.description_en;
  const dayInLife = lang === "km" ? career.day_in_life_km : career.day_in_life_en;
  const matchPct = Math.round(score * 100);

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            #{rank}
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{title}</h3>
          <p className="text-sm font-medium text-slate-500">{subtitle}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
            career.category === "university"
              ? "bg-indigo-100 text-indigo-800"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {career.category === "university" ? t("categoryUniversity") : t("categoryTvet")}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-orange-100">
          <div className="h-full rounded-full bg-emerald-600" style={{ width: `${matchPct}%` }} />
        </div>
        <span className="text-xs font-bold text-emerald-700">
          {t("matchScoreLabel")} {matchPct}%
        </span>
      </div>

      <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-medium leading-relaxed text-emerald-900">
        💡 {buildWhyFitsText(drivers, lang)}
      </p>

      <p className="mt-4 text-sm leading-relaxed text-slate-700">{description}</p>

      <div className="mt-4">
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {t("resultsDayInLife")}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{dayInLife}</p>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {t("resultsProviders")}
        </h4>
        <ul className="mt-1.5 flex flex-wrap gap-2">
          {career.providers.map((p) => (
            <li key={p} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-dashed border-orange-200 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {t("resultsScholarships")}
        </h4>
        {scholarships.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">{t("resultsNoScholarships")}</p>
        ) : (
          <ul className="mt-2 flex flex-col gap-3">
            {scholarships.map((s) => (
              <li key={s.id} className="rounded-xl bg-orange-50 p-3">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900"
                >
                  {lang === "km" ? s.name_km : s.name_en}
                </a>
                <p className="text-xs font-semibold text-slate-500">{s.org}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{s.note}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-xs italic text-amber-700">{t("resultsScholarshipsNote")}</p>
      </div>
    </div>
  );
}
