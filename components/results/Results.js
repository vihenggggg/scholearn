"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { computeStudentVector, rankCareers, topMatchDrivers, TOP_MATCH_COUNT } from "@/lib/scoring";
import careersData from "@/data/careers.json";
import ProfileSummary from "@/components/results/ProfileSummary";
import CareerCard from "@/components/results/CareerCard";
import PdfExportButton from "@/components/results/PdfExportButton";
import PrintableBooklet from "@/components/results/PrintableBooklet";

export default function Results({ answers, demographics, onRetake }) {
  const { t, lang } = useLanguage();
  const bookletRef = useRef(null);
  const hasSubmittedRef = useRef(false);

  const studentVector = useMemo(() => computeStudentVector(answers), [answers]);

  const matches = useMemo(() => {
    const ranked = rankCareers(studentVector, careersData, TOP_MATCH_COUNT);
    return ranked.map(({ career, score }) => ({
      career,
      score,
      drivers: topMatchDrivers(studentVector, career.dimension_vector, 2),
    }));
  }, [studentVector]);

  // Fire-and-forget anonymous analytics. Never blocks or breaks the results
  // page — a failed/slow request here must not affect the student at all.
  useEffect(() => {
    if (hasSubmittedRef.current || !demographics) return;
    hasSubmittedRef.current = true;

    fetch("/api/submit-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lang,
        ageRange: demographics.ageRange,
        gradeStatus: demographics.gradeStatus,
        province: demographics.province,
        dimensionVector: studentVector,
        topMatches: matches.map((m) => ({ id: m.career.id, score: m.score })),
      }),
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-6">
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

      <PrintableBooklet
        pageRootRef={bookletRef}
        studentVector={studentVector}
        demographics={demographics}
        matches={matches}
      />

      <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-4">
        <PdfExportButton bookletRef={bookletRef} />
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
