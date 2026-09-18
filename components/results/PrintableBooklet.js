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
  minHeight: "297mm",
  padding: "16mm 18mm",
  boxSizing: "border-box",
  backgroundColor: "#fffaf3",
  display: "flex",
  flexDirection: "column",
};

function PageFooter({ pageLabel }) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: "8mm",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "9px",
        color: "#94a3b8",
        borderTop: "1px solid #fde3c7",
      }}
    >
      <span>ទិសដៅ — Navigating Cambodians</span>
      <span>{pageLabel}</span>
    </div>
  );
}

function CoverPage({ studentVector, demographics, lang, t, pageLabel }) {
  const topInterests = topDimensions(studentVector, INTEREST_DIMENSIONS, 3);
  const topStrengths = topDimensions(studentVector, STRENGTH_DIMENSIONS, 2);
  const today = new Date().toLocaleDateString(lang === "km" ? "km-KH" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pdf-page" style={PAGE_STYLE}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" style={{ width: "42mm", height: "auto", margin: "0 auto 6mm" }} />

      <h1 style={{ textAlign: "center", fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>
        {t("resultsHeading")}
      </h1>
      <p style={{ textAlign: "center", fontSize: "11px", color: "#64748b", marginTop: "2mm" }}>
        {today}
      </p>

      <div
        style={{
          marginTop: "10mm",
          padding: "8mm",
          borderRadius: "6mm",
          backgroundColor: "#ffffff",
          border: "1px solid #fde3c7",
        }}
      >
        <h2 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", marginBottom: "5mm" }}>
          {t("resultsProfileHeading")}
        </h2>

        <div style={{ marginBottom: "5mm" }}>
          <h3
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#047857",
              marginBottom: "2mm",
            }}
          >
            {t("resultsInterestLabel")}
          </h3>
          <p style={{ fontSize: "12.5px", color: "#0f172a", fontWeight: 600 }}>
            {topInterests.map((d) => dimensionLabel(d, lang)).join(lang === "km" ? "، " : ", ")}
          </p>
        </div>

        <div style={{ marginBottom: "5mm" }}>
          <h3
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#4338ca",
              marginBottom: "2mm",
            }}
          >
            {t("resultsStrengthLabel")}
          </h3>
          <p style={{ fontSize: "12.5px", color: "#0f172a", fontWeight: 600 }}>
            {topStrengths.map((d) => dimensionLabel(d, lang)).join(lang === "km" ? "، " : ", ")}
          </p>
        </div>

        <div>
          <h3
            style={{
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#b45309",
              marginBottom: "2mm",
            }}
          >
            {t("resultsValueLabel")}
          </h3>
          <p style={{ fontSize: "12.5px", color: "#334155", lineHeight: 1.6 }}>
            {(lang === "km" ? "អ្នកឱ្យតម្លៃ " : "You lean toward ") +
              VALUE_DIMENSIONS.map((dim) => describeValueScore(dim, studentVector[dim], lang)).join(
                lang === "km" ? " និង " : ", "
              ) +
              (lang === "km" ? "។" : ".")}
          </p>
        </div>
      </div>

      {demographics && (
        <p style={{ marginTop: "8mm", textAlign: "center", fontSize: "10px", color: "#94a3b8" }}>
          {t("aboutIntro")}
        </p>
      )}

      <PageFooter pageLabel={pageLabel} />
    </div>
  );
}

function CareerPage({ result, rank, lang, t, pageLabel }) {
  const { career, score, drivers } = result;
  const scholarships = matchedScholarships(career);
  const title = lang === "km" ? career.title_km : career.title_en;
  const subtitle = lang === "km" ? career.title_en : career.title_km;
  const description = lang === "km" ? career.description_km : career.description_en;
  const dayInLife = lang === "km" ? career.day_in_life_km : career.day_in_life_en;
  const matchPct = Math.round(score * 100);

  const sectionTitleStyle = {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#94a3b8",
    marginBottom: "1.5mm",
    marginTop: "5mm",
  };
  const bodyTextStyle = { fontSize: "11.5px", color: "#334155", lineHeight: 1.6 };

  return (
    <div className="pdf-page" style={PAGE_STYLE}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span style={{ fontSize: "10px", fontWeight: 800, color: "#047857" }}>#{rank}</span>
          <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#0f172a" }}>{title}</h2>
          <p style={{ fontSize: "11px", color: "#64748b" }}>{subtitle}</p>
        </div>
        <span
          style={{
            fontSize: "9px",
            fontWeight: 700,
            padding: "1.5mm 3mm",
            borderRadius: "10mm",
            backgroundColor: career.category === "university" ? "#e0e7ff" : "#fef3c7",
            color: career.category === "university" ? "#3730a3" : "#92400e",
            whiteSpace: "nowrap",
          }}
        >
          {career.category === "university" ? t("categoryUniversity") : t("categoryTvet")}
        </span>
      </div>

      <div style={{ marginTop: "4mm", display: "flex", alignItems: "center", gap: "3mm" }}>
        <div style={{ flex: 1, height: "2.5mm", borderRadius: "2mm", backgroundColor: "#fde3c7" }}>
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
          marginTop: "5mm",
          padding: "4mm",
          borderRadius: "3mm",
          backgroundColor: "#ecfdf5",
          color: "#065f46",
          fontSize: "11.5px",
          fontWeight: 600,
          lineHeight: 1.6,
        }}
      >
        💡 {buildWhyFitsText(drivers, lang)}
      </p>

      <p style={{ ...bodyTextStyle, marginTop: "5mm" }}>{description}</p>

      <h3 style={sectionTitleStyle}>{t("resultsDayInLife")}</h3>
      <p style={bodyTextStyle}>{dayInLife}</p>

      <h3 style={sectionTitleStyle}>{t("resultsProviders")}</h3>
      <p style={bodyTextStyle}>{career.providers.join(lang === "km" ? "、 " : " · ")}</p>

      <h3 style={sectionTitleStyle}>{t("resultsScholarships")}</h3>
      {scholarships.length === 0 ? (
        <p style={bodyTextStyle}>{t("resultsNoScholarships")}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "3mm" }}>
          {scholarships.map((s) => (
            <div
              key={s.id}
              style={{ padding: "3mm", borderRadius: "2.5mm", backgroundColor: "#fff8f0" }}
            >
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#065f46" }}>
                {lang === "km" ? s.name_km : s.name_en}
              </p>
              <p style={{ fontSize: "9.5px", fontWeight: 600, color: "#64748b" }}>{s.org}</p>
              <p style={{ fontSize: "9.5px", color: "#475569", lineHeight: 1.5, marginTop: "1mm" }}>
                {s.note}
              </p>
              <p style={{ fontSize: "9px", color: "#64748b", marginTop: "1mm" }}>{s.url}</p>
            </div>
          ))}
        </div>
      )}
      <p style={{ fontSize: "9.5px", fontStyle: "italic", color: "#b45309", marginTop: "3mm" }}>
        {t("resultsScholarshipsNote")}
      </p>

      <PageFooter pageLabel={pageLabel} />
    </div>
  );
}

/**
 * Off-screen A4-sized pages rendered for html2canvas to capture one at a
 * time, so the downloaded PDF is a clean booklet (cover + one page per
 * match) instead of an arbitrary screenshot sliced across pages.
 */
export default function PrintableBooklet({ studentVector, demographics, matches, pageRootRef }) {
  const { t, lang } = useLanguage();
  const totalPages = matches.length + 1;

  return (
    <div
      ref={pageRootRef}
      style={{ position: "fixed", left: "-99999px", top: 0, zIndex: -1 }}
      aria-hidden="true"
    >
      <CoverPage
        studentVector={studentVector}
        demographics={demographics}
        lang={lang}
        t={t}
        pageLabel={`1 / ${totalPages}`}
      />
      {matches.map((result, i) => (
        <CareerPage
          key={result.career.id}
          result={result}
          rank={i + 1}
          lang={lang}
          t={t}
          pageLabel={`${i + 2} / ${totalPages}`}
        />
      ))}
    </div>
  );
}
