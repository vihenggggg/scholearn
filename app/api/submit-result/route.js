import { neon } from "@neondatabase/serverless";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { AGE_RANGES, GRADE_STATUSES, PROVINCES } from "@/lib/demographics";
import { ALL_DIMENSIONS, TOP_MATCH_COUNT } from "@/lib/scoring";
import { isValueDimension } from "@/lib/dimensions";
import careersData from "@/data/careers.json";

const AGE_VALUES = new Set(AGE_RANGES.map((o) => o.value));
const GRADE_VALUES = new Set(GRADE_STATUSES.map((o) => o.value));
const PROVINCE_VALUES = new Set(PROVINCES.map((o) => o.value));
const CAREER_IDS = new Set(careersData.map((c) => c.id));

const MAX_BODY_BYTES = 8 * 1024; // legitimate payload is well under 2KB
const EPSILON = 1e-6;

function isValidScoreFor(dim, value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  const [min, max] = isValueDimension(dim) ? [-1, 1] : [0, 1];
  return value >= min - EPSILON && value <= max + EPSILON;
}

// Anonymous analytics only: no name, no contact info, nothing tied to an
// individual — see the privacy note shown on the demographics step.
export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false }, { status: 413 });
  }

  let body;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return Response.json({ ok: false }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { lang, ageRange, gradeStatus, province, dimensionVector, topMatches } = body ?? {};

  const validShape =
    (lang === "km" || lang === "en") &&
    AGE_VALUES.has(ageRange) &&
    GRADE_VALUES.has(gradeStatus) &&
    (province === null || province === undefined || PROVINCE_VALUES.has(province)) &&
    typeof dimensionVector === "object" &&
    dimensionVector !== null &&
    ALL_DIMENSIONS.every((d) => isValidScoreFor(d, dimensionVector[d])) &&
    Array.isArray(topMatches) &&
    topMatches.length > 0 &&
    topMatches.length <= TOP_MATCH_COUNT &&
    topMatches.every(
      (m) =>
        m &&
        typeof m.id === "string" &&
        CAREER_IDS.has(m.id) &&
        typeof m.score === "number" &&
        Number.isFinite(m.score) &&
        m.score >= 0 - EPSILON &&
        m.score <= 1 + EPSILON
    );

  if (!validShape) {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.DATABASE_URL) {
      console.error("submit-result: DATABASE_URL is not configured");
      return Response.json({ ok: false }, { status: 500 });
    }

    const sql = neon(env.DATABASE_URL);
    await sql`
      INSERT INTO responses (lang, age_range, grade_status, province, dimension_vector, top_matches)
      VALUES (${lang}, ${ageRange}, ${gradeStatus}, ${province ?? null}, ${JSON.stringify(dimensionVector)}, ${JSON.stringify(topMatches)})
    `;

    return Response.json({ ok: true });
  } catch (err) {
    // Analytics must never break the student's results page.
    console.error("submit-result failed", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
