"use client";

import { useLanguage } from "@/lib/LanguageContext";
import {
  INTEREST_DIMENSIONS,
  STRENGTH_DIMENSIONS,
  VALUE_DIMENSIONS,
  dimensionLabel,
  describeValueScore,
} from "@/lib/dimensions";
import { topDimensions } from "@/lib/scoring";

export default function ProfileSummary({ studentVector }) {
  const { t, lang } = useLanguage();

  const topInterests = topDimensions(studentVector, INTEREST_DIMENSIONS, 3);
  const topStrengths = topDimensions(studentVector, STRENGTH_DIMENSIONS, 2);

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
        {t("resultsProfileHeading")}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            {t("resultsInterestLabel")}
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {topInterests.map((dim) => (
              <li
                key={dim}
                className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-800"
              >
                {dimensionLabel(dim, lang)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-indigo-700">
            {t("resultsStrengthLabel")}
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {topStrengths.map((dim) => (
              <li
                key={dim}
                className="rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-800"
              >
                {dimensionLabel(dim, lang)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-bold uppercase tracking-wide text-amber-700">
          {t("resultsValueLabel")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {lang === "km" ? "អ្នកឱ្យតម្លៃ " : "You lean toward "}
          {VALUE_DIMENSIONS.map((dim, i) => (
            <span key={dim} className="font-semibold text-slate-900">
              {describeValueScore(dim, studentVector[dim], lang)}
              {i < VALUE_DIMENSIONS.length - 1 ? (lang === "km" ? " និង " : ", ") : ""}
            </span>
          ))}
          {lang === "km" ? "។" : "."}
        </p>
      </div>
    </div>
  );
}
