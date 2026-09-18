import { neon } from "@neondatabase/serverless";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { AGE_RANGES, GRADE_STATUSES, PROVINCES } from "@/lib/demographics";
import { ALL_DIMENSIONS } from "@/lib/scoring";

const AGE_VALUES = new Set(AGE_RANGES.map((o) => o.value));
const GRADE_VALUES = new Set(GRADE_STATUSES.map((o) => o.value));
const PROVINCE_VALUES = new Set(PROVINCES.map((o) => o.value));

// Anonymous analytics only: no name, no contact info, nothing tied to an
// individual — see the privacy note shown on the demographics step.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { lang, ageRange, gradeStatus, province, dimensionVector, topMatches } = body ?? {};

  if (
    (lang !== "km" && lang !== "en") ||
    !AGE_VALUES.has(ageRange) ||
    !GRADE_VALUES.has(gradeStatus) ||
    (province !== null && province !== undefined && !PROVINCE_VALUES.has(province)) ||
    typeof dimensionVector !== "object" ||
    !ALL_DIMENSIONS.every((d) => typeof dimensionVector?.[d] === "number") ||
    !Array.isArray(topMatches) ||
    topMatches.length === 0 ||
    !topMatches.every((m) => typeof m?.id === "string" && typeof m?.score === "number")
  ) {
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
