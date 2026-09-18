"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { SCALE } from "@/lib/scoring";

export default function QuestionCard({ question, value, onAnswer }) {
  const { t, lang } = useLanguage();
  const labels = lang === "km" ? SCALE.labels_km : SCALE.labels_en;
  const questionText = lang === "km" ? question.text_km : question.text_en;

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
      <p className="min-h-[3.5rem] text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
        {questionText}
      </p>

      <div className="mt-8 flex flex-col gap-2.5">
        {labels.map((label, idx) => {
          const optionValue = idx + 1;
          const selected = value === optionValue;
          return (
            <button
              key={optionValue}
              type="button"
              onClick={() => onAnswer(optionValue)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors ${
                selected
                  ? "border-emerald-700 bg-emerald-50"
                  : "border-orange-100 bg-white hover:border-emerald-300 hover:bg-orange-50"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-sm font-bold ${
                  selected
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-300 text-slate-400"
                }`}
              >
                {optionValue}
              </span>
              <span
                className={`text-sm font-medium sm:text-base ${
                  selected ? "text-emerald-900" : "text-slate-700"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
