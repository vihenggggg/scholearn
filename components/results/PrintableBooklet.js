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
  padding: "12mm 12mm",
  boxSizing: "border-box",
  backgroundColor: "#fffaf3",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const RANK_ACCENTS = [
  { bar: "#059669", chip: "#ecfdf5", chipText: "#065f46" },
  { bar: "#4f46e5", chip: "#eef2ff", chipText: "#3730a3" },
  { bar: "#d97706", chip: "#fffbeb", chipText: "#92400e" },
];

// Bounds the title to ~2 lines regardless of language, so one long title
// (e.g. "Information Technology / Computer Science") can't push a whole
// scholarship entry past the fixed page height in the 3-column layout.
function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function StatChip({ label, value, accent, icon }) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: "3mm",
        border: "1px solid #fde3c7",
        backgroundColor: "#ffffff",
        padding: "4mm 4.5mm",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: accent,
          marginBottom: "1.5mm",
        }}
      >
        {icon} {label}
      </div>
      <div style={{ fontSize: "11.5px", fontWeight: 600, color: "#0f172a", lineHeight: 1.6 }}>
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: "#f1e4d3", margin: "2.5mm 0" }} />;
}

const MAX_PROVIDERS_SHOWN = 2;

function CareerColumn({ result, rank }) {
  const { t, lang } = useLanguage();
  const { career, score, drivers } = result;
  const scholarships = matchedScholarships(career, 2);
  const title = truncate(lang === "km" ? career.title_km : career.title_en, lang === "km" ? 36 : 30);
  const subtitle = truncate(lang === "km" ? career.title_en : career.title_km, lang === "km" ? 30 : 36);
  const description = lang === "km" ? career.description_km : career.description_en;
  const dayInLife = lang === "km" ? career.day_in_life_km : career.day_in_life_en;
  const matchPct = Math.round(score * 100);
  const accent = RANK_ACCENTS[rank - 1] ?? RANK_ACCENTS[0];
  const shownProviders = career.providers.slice(0, MAX_PROVIDERS_SHOWN);
  const extraProviders = career.providers.length - shownProviders.length;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "3.5mm",
        border: "1px solid #fde3c7",
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div style={{ height: "2.2mm", backgroundColor: accent.bar }} />
      <div style={{ padding: "5.5mm 5.5mm 5.5mm", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: "11px", fontWeight: 800, color: accent.bar }}>#{rank}</span>
        <h3 style={{ marginTop: "1.5mm", fontSize: "17px", fontWeight: 800, color: "#0f172a", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "10px", color: "#64748b", marginTop: "1mm" }}>{subtitle}</p>

        <span
          style={{
            marginTop: "2.5mm",
            alignSelf: "flex-start",
            fontSize: "8.5px",
            fontWeight: 700,
            padding: "1.3mm 3mm",
            borderRadius: "8mm",
            backgroundColor: accent.chip,
            color: accent.chipText,
          }}
        >
          {career.category === "university" ? t("categoryUniversity") : t("categoryTvet")}
        </span>

        <div style={{ marginTop: "3mm", display: "flex", alignItems: "center", gap: "2.5mm" }}>
          <div style={{ flex: 1, height: "2.5mm", borderRadius: "2mm", backgroundColor: "#fde3c7" }}>
            <div
              style={{ width: `${matchPct}%`, height: "100%", borderRadius: "2mm", backgroundColor: accent.bar }}
            />
          </div>
          <span style={{ fontSize: "10px", fontWeight: 700, color: accent.bar, whiteSpace: "nowrap" }}>
            {matchPct}%
          </span>
        </div>

        <p
          style={{
            marginTop: "3mm",
            padding: "3mm 3.5mm",
            borderRadius: "3mm",
            backgroundColor: accent.chip,
            color: accent.chipText,
            fontSize: "10px",
            fontWeight: 600,
            lineHeight: 1.55,
          }}
        >
          💡 {buildWhyFitsText(drivers, lang)}
        </p>

        <p style={{ marginTop: "3mm", fontSize: "10px", color: "#334155", lineHeight: 1.6 }}>
          {description}
        </p>

        <Divider />

        <div>
          <h4
            style={{
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: "1.5mm",
            }}
          >
            📅 {t("resultsDayInLife")}
          </h4>
          <p style={{ fontSize: "10px", color: "#334155", lineHeight: 1.6 }}>{dayInLife}</p>
        </div>

        <Divider />

        <div>
          <h4
            style={{
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: "1.5mm",
            }}
          >
            📍 {t("resultsProviders")}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "4mm", fontSize: "9.5px", color: "#334155", lineHeight: 1.75 }}>
            {shownProviders.map((p) => (
              <li key={p}>{p}</li>
            ))}
            {extraProviders > 0 && (
              <li style={{ color: "#94a3b8" }}>
                {lang === "km" ? `+${extraProviders} ទៀត` : `+${extraProviders} more`}
              </li>
            )}
          </ul>
        </div>

        <Divider />

        <div>
          <h4
            style={{
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#94a3b8",
              marginBottom: "1.5mm",
            }}
          >
            🎓 {t("resultsScholarships")}
          </h4>
          {scholarships.length === 0 ? (
            <p style={{ fontSize: "9.5px", color: "#94a3b8" }}>{t("resultsNoScholarships")}</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2mm" }}>
              {scholarships.map((s) => (
                <div key={s.id}>
                  <p style={{ fontSize: "9.5px", fontWeight: 700, color: "#0f172a", lineHeight: 1.45 }}>
                    {truncate(lang === "km" ? s.name_km : s.name_en, 56)}
                  </p>
                  <p style={{ fontSize: "9px", color: "#64748b", lineHeight: 1.45 }}>{truncate(s.org, 50)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Off-screen A4 page rendered for html2canvas to capture, so the downloaded
 * PDF is a single compact take-home summary instead of a multi-page report.
 * Matches sit in a 3-column card row rather than stacked, so each card gets
 * far more usable height on an A4 portrait page.
 */
export default function PrintableBooklet({ studentVector, matches, pageRootRef }) {
  const { t, lang } = useLanguage();

  const topInterests = topDimensions(studentVector, INTEREST_DIMENSIONS, 3);
  const topStrengths = topDimensions(studentVector, STRENGTH_DIMENSIONS, 2);
  // "Balanced" phrasing (near-neutral scores) can produce long compound
  // sentences for all 4 value axes at once — bound it so the profile row
  // (shared by all 3 stat chips via flex stretch) can't eat into the
  // budget the match columns below need.
  const valuesText = truncate(
    VALUE_DIMENSIONS.map((dim) => describeValueScore(dim, studentVector[dim], lang)).join(
      lang === "km" ? " • " : ", "
    ),
    100
  );
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
          <img src="/logo-mark.png" alt="" style={{ width: "15mm", height: "15mm" }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
              {t("resultsHeading")}
            </h1>
            <p style={{ fontSize: "9.5px", color: "#94a3b8" }}>ទិសដៅ — Navigating Cambodians</p>
          </div>
          <span style={{ fontSize: "9.5px", color: "#94a3b8" }}>{today}</span>
        </div>

        {/* Profile summary — 3 stat chips */}
        <div style={{ marginTop: "4mm", display: "flex", gap: "3mm" }}>
          <StatChip
            icon="🧭"
            label={t("resultsInterestLabel")}
            value={topInterests.map((d) => dimensionLabel(d, lang)).join(lang === "km" ? "、 " : ", ")}
            accent="#047857"
          />
          <StatChip
            icon="💪"
            label={t("resultsStrengthLabel")}
            value={topStrengths.map((d) => dimensionLabel(d, lang)).join(lang === "km" ? "、 " : ", ")}
            accent="#4338ca"
          />
          <StatChip icon="⭐" label={t("resultsValueLabel")} value={valuesText} accent="#b45309" />
        </div>

        {/* Matches heading */}
        <h2 style={{ marginTop: "5mm", marginBottom: "3mm", fontSize: "12px", fontWeight: 800, color: "#0f172a" }}>
          {t("resultsTopMatches")}
        </h2>

        {/* 3-column career cards */}
        <div style={{ display: "flex", gap: "3.5mm", flex: 1, minHeight: 0 }}>
          {matches.map((result, i) => (
            <CareerColumn key={result.career.id} result={result} rank={i + 1} />
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "3.5mm",
            paddingTop: "2.5mm",
            borderTop: "1px solid #fde3c7",
            fontSize: "7.5px",
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
