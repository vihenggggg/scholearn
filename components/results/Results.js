"use client";

import { useMemo, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { computeStudentVector, rankCareers, topMatchDrivers } from "@/lib/scoring";
import careersData from "@/data/careers.json";
import ProfileSummary from "@/components/results/ProfileSummary";
import CareerCard from "@/components/results/CareerCard";
import PdfExportButton from "@/components/results/PdfExportButton";

export default function Results({ answers, onRetake }) {
  const { t } = useLanguage();
  const printRef = useRef(null);

  const studentVector = useMemo(() => computeStudentVector(answers), [answers]);

  const matches = useMemo(() => {
    const ranked = rankCareers(studentVector, careersData, 5);
    return ranked.map(({ career, score }) => ({
      career,
      score,
      drivers: topMatchDrivers(studentVector, career.dimension_vector, 2),
    }));
  }, [studentVector]);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div ref={printRef} className="flex flex-col gap-6 bg-orange-50 p-1">
        <h1 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {t("resultsHeading")}
        </h1>

        <ProfileSummary studentVector={studentVector} />

        <div>
          <h2 className="mb-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
            {t("resultsTopMatches")}
          </h2>
          <div className="flex flex-col gap-5">
            {matches.map((result, i) => (
              <CareerCard key={result.career.id} result={result} rank={i + 1} />
            ))}
          </div>
        </div>
      </div>

      <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-4">
        <PdfExportButton targetRef={printRef} />
        <button
          type="button"
          onClick={onRetake}
          className="rounded-full border-2 border-slate-300 px-6 py-3 font-bold text-slate-600 hover:border-slate-400 hover:bg-slate-50"
        >
          {t("btnRetake")}
        </button>
      </div>
    </div>
  );
}
