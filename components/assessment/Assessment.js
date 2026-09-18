"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { ALL_QUESTIONS } from "@/lib/scoring";
import ProgressBar from "@/components/assessment/ProgressBar";
import QuestionCard from "@/components/assessment/QuestionCard";

const SECTION_LABEL_KEY = {
  interest: "progressSectionInterest",
  strength: "progressSectionStrength",
  value: "progressSectionValue",
};

export default function Assessment({ answers, onAnswer, onComplete, onExit }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const question = ALL_QUESTIONS[index];
  const total = ALL_QUESTIONS.length;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const currentValue = answers[question.id];

  const sectionLabel = useMemo(() => t(SECTION_LABEL_KEY[question.section]), [question.section, t]);

  function handleAnswer(value) {
    onAnswer(question.id, value);
  }

  function goBack() {
    if (isFirst) {
      onExit();
    } else {
      setIndex((i) => i - 1);
    }
  }

  function goNext() {
    if (isLast) {
      onComplete();
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
      <ProgressBar current={index + 1} total={total} sectionLabel={sectionLabel} />

      <div className="mt-8 flex-1">
        <QuestionCard question={question} value={currentValue} onAnswer={handleAnswer} />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          className="rounded-full border-2 border-slate-200 px-6 py-3 font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        >
          {t("btnBack")}
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={currentValue === undefined}
          className="rounded-full bg-emerald-700 px-8 py-3 font-bold text-white shadow-md shadow-emerald-700/20 transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          {isLast ? t("btnSeeResults") : t("btnNext")}
        </button>
      </div>
    </div>
  );
}
