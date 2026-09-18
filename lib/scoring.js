import questionsData from "@/data/questions.json";
import { INTEREST_DIMENSIONS, STRENGTH_DIMENSIONS, VALUE_DIMENSIONS, isValueDimension } from "@/lib/dimensions";

export const ALL_QUESTIONS = questionsData.questions;
export const SCALE = questionsData.scale;
export const DIMENSION_GROUPS = questionsData.dimension_groups;

export const ALL_DIMENSIONS = [...INTEREST_DIMENSIONS, ...STRENGTH_DIMENSIONS, ...VALUE_DIMENSIONS];

// (answer-1)/4, flipped to 1-normalized when the question is reverse-scored.
function normalizeAnswer(answer, reverse) {
  const n = (answer - 1) / 4;
  return reverse ? 1 - n : n;
}

/**
 * Turns { questionId: 1-5 } answers into the 16-dimension student vector.
 * Interest/strength dimensions land in 0..1, value dimensions in -1..1.
 */
export function computeStudentVector(answers) {
  const byDimension = {};
  for (const q of ALL_QUESTIONS) {
    if (!byDimension[q.dimension]) byDimension[q.dimension] = [];
    const raw = answers[q.id];
    if (raw === undefined || raw === null) continue;
    byDimension[q.dimension].push(normalizeAnswer(raw, q.reverse));
  }

  const vector = {};
  for (const dim of ALL_DIMENSIONS) {
    const values = byDimension[dim] || [];
    const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0.5;
    vector[dim] = isValueDimension(dim) ? avg * 2 - 1 : avg;
  }
  return vector;
}

// Rescales a value-dimension score from -1..1 to 0..1; interest/strength scores pass through.
function scaleTo01(dim, value) {
  return isValueDimension(dim) ? (value + 1) / 2 : value;
}

export function similarity(studentVector, careerVector) {
  let sumSq = 0;
  for (const dim of ALL_DIMENSIONS) {
    const s = scaleTo01(dim, studentVector[dim] ?? 0);
    const c = scaleTo01(dim, careerVector[dim] ?? 0);
    sumSq += (s - c) ** 2;
  }
  const distance = Math.sqrt(sumSq);
  const sim = 1 - distance / Math.sqrt(ALL_DIMENSIONS.length);
  return Math.max(0, Math.min(1, sim));
}

export const TOP_MATCH_COUNT = 3;

export function rankCareers(studentVector, careers, topN = TOP_MATCH_COUNT) {
  return careers
    .map((career) => ({ career, score: similarity(studentVector, career.dimension_vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/**
 * Finds the 1-2 dimensions where student and career are both scoring high,
 * i.e. the dimensions most responsible for the match, used to build the
 * "why this fits you" explanation.
 */
export function topMatchDrivers(studentVector, careerVector, count = 2) {
  const scored = ALL_DIMENSIONS.map((dim) => {
    const s = scaleTo01(dim, studentVector[dim] ?? 0);
    const c = scaleTo01(dim, careerVector[dim] ?? 0);
    return { dim, shared: Math.min(s, c), studentScore: studentVector[dim] ?? 0 };
  }).filter((d) => d.shared >= 0.55);

  scored.sort((a, b) => b.shared - a.shared);
  return scored.slice(0, count);
}

/** Top N dimensions (by raw score) within a given list, used for the profile summary. */
export function topDimensions(vector, dims, count) {
  return [...dims]
    .sort((a, b) => (vector[b] ?? 0) - (vector[a] ?? 0))
    .slice(0, count);
}
