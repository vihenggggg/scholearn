import scholarshipsData from "@/data/scholarships.json";

export const ALL_SCHOLARSHIPS = scholarshipsData;

/** Scholarships whose tags intersect the career's scholarship_tags, capped at 3, ranked by overlap count. */
export function matchedScholarships(career, max = 3) {
  const careerTags = new Set(career.scholarship_tags || []);
  return ALL_SCHOLARSHIPS
    .map((s) => ({
      scholarship: s,
      overlap: s.tags.filter((tag) => careerTags.has(tag)).length,
    }))
    .filter((m) => m.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, max)
    .map((m) => m.scholarship);
}
