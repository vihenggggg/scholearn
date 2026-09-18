import questionsData from "@/data/questions.json";
import { INTEREST_DIMENSIONS, STRENGTH_DIMENSIONS, VALUE_DIMENSIONS, isValueDimension } from "@/lib/dimensions";

// Display order only — scoring groups answers by dimension regardless of
// order, so reordering here is safe. Within the interest section, this
// leads with broad, relatable "what do you enjoy" items (creativity,
// helping others, subjects/puzzles, teamwork) before narrower ones like
// hands-on/tools work or physical preference, so the very first questions
// a student sees feel like an invitation to reflect, not a random pop quiz.
// Strength and value sections are left in their original order.
const DISPLAY_ORDER = [
  "A1", "S1", "C1", "I1", "S2", "E2", "A2", "I2", "C2", "E1", "R1", "R2",
  "ST1", "ST2", "ST3", "ST4", "ST5", "ST6",
  "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8",
];

function orderQuestions(questions) {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const ordered = DISPLAY_ORDER.map((id) => byId.get(id)).filter(Boolean);
  const missing = questions.filter((q) => !DISPLAY_ORDER.includes(q.id));
  return [...ordered, ...missing];
}

export const ALL_QUESTIONS = orderQuestions(questionsData.questions);
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
