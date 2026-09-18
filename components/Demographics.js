"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { AGE_RANGES, GRADE_STATUSES, PROVINCES } from "@/lib/demographics";

function ChipGroup({ options, value, onChange, lang }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
              selected
                ? "border-emerald-700 bg-emerald-700 text-white"
                : "border-orange-100 bg-white text-slate-700 hover:border-emerald-300 hover:bg-orange-50"
            }`}
          >
            {opt[lang]}
          </button>
        );
      })}
    </div>
  );
}

export default function Demographics({ onContinue, onBack }) {
  const { t, lang } = useLanguage();
  const [ageRange, setAgeRange] = useState(null);
  const [gradeStatus, setGradeStatus] = useState(null);
  const [province, setProvince] = useState("");

  const canContinue = Boolean(ageRange && gradeStatus);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm font-semibold text-slate-500 hover:text-emerald-700"
        >
          {t("btnBack")}
        </button>
        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">{t("demoTitle")}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{t("demoSubtitle")}</p>

        <div className="mt-6">
          <h2 className="mb-2 text-sm font-bold text-slate-800">{t("demoAgeLabel")}</h2>
          <ChipGroup options={AGE_RANGES} value={ageRange} onChange={setAgeRange} lang={lang} />
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-sm font-bold text-slate-800">{t("demoGradeLabel")}</h2>
          <ChipGroup
            options={GRADE_STATUSES}
            value={gradeStatus}
            onChange={setGradeStatus}
            lang={lang}
          />
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-sm font-bold text-slate-800">{t("demoProvinceLabel")}</h2>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full rounded-xl border-2 border-orange-100 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-emerald-400 focus:outline-none"
          >
            <option value="">{t("demoProvinceSkip")}</option>
            {PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>
                {p[lang]}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-5 text-xs italic text-slate-400">{t("demoPrivacyNote")}</p>

        <button
          type="button"
          disabled={!canContinue}
          onClick={() => onContinue({ ageRange, gradeStatus, province: province || null })}
          className="mt-6 w-full rounded-full bg-emerald-700 px-8 py-3.5 text-lg font-bold text-white shadow-md shadow-emerald-700/20 transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {t("demoContinue")}
        </button>
      </div>
    </div>
  );
}
