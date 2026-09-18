"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function ProgressBar({ current, total, sectionLabel }) {
  const { t } = useLanguage();
  const pct = Math.round((current / total) * 100);

  let microcopy = t("progressKeepGoing");
  if (pct >= 90) microcopy = t("progressLastFew");
  else if (pct >= 50 && pct < 60) microcopy = t("progressHalfway");
  else if (pct >= 75) microcopy = t("progressAlmostThere");
  else if (pct <= 15) microcopy = t("progressGreatStart");

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">{sectionLabel}</span>
        <span>{t("progressQuestionOf", { current, total })}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-orange-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-center text-xs font-medium text-emerald-700">{microcopy}</p>
    </div>
  );
}
