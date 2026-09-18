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
import { buildWhyFitsText } from "@/lib/matchExplanation";
import { matchedScholarships } from "@/lib/scholarships";

const PAGE_STYLE = {
  width: "210mm",
  height: "297mm",
  padding: "14mm 16mm",
  boxSizing: "border-box",
  backgroundColor: "#fffaf3",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

function CareerBlock({ result, rank }) {
  const { t, lang } = useLanguage();
  const { career, score, drivers } = result;
  const scholarships = matchedScholarships(career, 2);
  const title = lang === "km" ? career.title_km : career.title_en;
  const subtitle = lang === "km" ? career.title_en : career.title_km;
  const description = lang === "km" ? career.description_km : career.description_en;
  const matchPct = Math.round(score * 100);
  const providersText = career.providers.slice(0, 3).join(lang === "km" ? "、 " : " · ");
  const moreProviders = career.providers.length > 3 ? ` +${career.providers.length - 3}` : "";

  return (
    <div
      style={{
        borderRadius: "3.5mm",
        border: "1px solid #fde3c7",
        backgroundColor: "#ffffff",
        padding: "5mm 6mm",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: "10px", fontWeight: 800, color: "#047857" }}>#{rank}</span>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
            {title}
          </h3>
          <p style={{ fontSize: "9.5px", color: "#64748b" }}>{subtitle}</p>
        </div>
        <span
          style={{
            fontSize: "8.5px",
            fontWeight: 700,
            padding: "1.2mm 3mm",
            borderRadius: "8mm",
            backgroundColor: career.category === "university" ? "#e0e7ff" : "#fef3c7",
            color: career.category === "university" ? "#3730a3" : "#92400e",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {career.category === "university" ? t("categoryUniversity") : t("categoryTvet")}
        </span>
      </div>

      <div style={{ marginTop: "2.5mm", display: "flex", alignItems: "center", gap: "3mm" }}>
        <div style={{ flex: 1, height: "2.2mm", borderRadius: "2mm", backgroundColor: "#fde3c7" }}>
          <div
            style={{
              width: `${matchPct}%`,
              height: "100%",
              borderRadius: "2mm",
              backgroundColor: "#059669",
            }}
          />
        </div>
        <span style={{ fontSize: "9px", fontWeight: 700, color: "#047857", whiteSpace: "nowrap" }}>
          {t("matchScoreLabel")} {matchPct}%
        </span>
      </div>

      <p
        style={{
          marginTop: "3mm",
          padding: "2.5mm 3.5mm",
          borderRadius: "2.5mm",
          backgroundColor: "#ecfdf5",
          color: "#065f46",
          fontSize: "10px",
          fontWeight: 600,
          lineHeight: 1.5,
        }}
      >
        💡 {buildWhyFitsText(drivers, lang)}
      </p>

      <p style={{ marginTop: "2.5mm", fontSize: "9.5px", color: "#334155", lineHeight: 1.5 }}>
        {description}
      </p>

      <p style={{ marginTop: "2.5mm", fontSize: "9px", color: "#334155", lineHeight: 1.5 }}>
        <span style={{ fontWeight: 700, color: "#94a3b8" }}>{t("resultsProviders")}: </span>
        {providersText}
        {moreProviders}
      </p>

      {scholarships.length > 0 && (
        <p style={{ marginTop: "1mm", fontSize: "9px", color: "#334155", lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700, color: "#94a3b8" }}>{t("resultsScholarships")}: </span>
          {scholarships
            .map((s) => `${lang === "km" ? s.name_km : s.name_en} (${s.org})`)
            .join("  •  ")}
        </p>
      )}
    </div>
  );
}

/**
 * Off-screen A4 page rendered for html2canvas to capture, so the downloaded
 * PDF is a single compact take-home summary instead of a multi-page report.
 */
export default function PrintableBooklet({ studentVector, matches, pageRootRef }) {
  const { t, lang } = useLanguage();

  const topInterests = topDimensions(studentVector, INTEREST_DIMENSIONS, 3);
  const topStrengths = topDimensions(studentVector, STRENGTH_DIMENSIONS, 2);
  const today = new Date().toLocaleDateString(lang === "km" ? "km-KH" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      ref={pageRootRef}
      style={{ position: "fixed", left: "-99999px", top: 0, zIndex: -1 }}
      aria-hidden="true"
    >
      <div className="pdf-page" style={PAGE_STYLE}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "4mm" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" style={{ width: "16mm", height: "16mm" }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "19px", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
              {t("resultsHeading")}
            </h1>
            <p style={{ fontSize: "10px", color: "#94a3b8" }}>ទិសដៅ — Navigating Cambodians</p>
          </div>
          <span style={{ fontSize: "10px", color: "#94a3b8" }}>{today}</span>
        </div>

        {/* Profile summary */}
        <div
          style={{
            marginTop: "5mm",
            padding: "4mm 5mm",
            borderRadius: "3mm",
            backgroundColor: "#ffffff",
            border: "1px solid #fde3c7",
          }}
        >
          <h2
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: "1.5mm",
            }}
          >
            {t("resultsProfileHeading")}
          </h2>
          <p style={{ fontSize: "10px", lineHeight: 1.7, color: "#334155" }}>
            <span style={{ fontWeight: 700, color: "#047857" }}>{t("resultsInterestLabel")}: </span>
            <span style={{ fontWeight: 600, color: "#0f172a" }}>
              {topInterests.map((d) => dimensionLabel(d, lang)).join(lang === "km" ? "、 " : ", ")}
            </span>
            <span style={{ margin: "0 2.5mm", color: "#fde3c7" }}>|</span>
            <span style={{ fontWeight: 700, color: "#4338ca" }}>{t("resultsStrengthLabel")}: </span>
            <span style={{ fontWeight: 600, color: "#0f172a" }}>
              {topStrengths.map((d) => dimensionLabel(d, lang)).join(lang === "km" ? "、 " : ", ")}
            </span>
          </p>
          <p style={{ marginTop: "1.5mm", fontSize: "10px", lineHeight: 1.7, color: "#334155" }}>
            <span style={{ fontWeight: 700, color: "#b45309" }}>{t("resultsValueLabel")}: </span>
            {VALUE_DIMENSIONS.map((dim) => describeValueScore(dim, studentVector[dim], lang)).join(
              lang === "km" ? " • " : ", "
            )}
          </p>
        </div>

        {/* Matches heading */}
        <h2 style={{ marginTop: "5mm", marginBottom: "3mm", fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>
          {t("resultsTopMatches")}
        </h2>

        {/* Career blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4mm" }}>
          {matches.map((result, i) => (
            <CareerBlock key={result.career.id} result={result} rank={i + 1} />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "4mm",
            borderTop: "1px solid #fde3c7",
            fontSize: "8px",
            color: "#94a3b8",
            lineHeight: 1.5,
          }}
        >
          {t("resultsScholarshipsNote")}
        </div>
      </div>
    </div>
  );
}
