// Bilingual metadata for the 16 scoring dimensions used by questions.json / careers.json.

export const INTEREST_DIMENSIONS = ["R", "I", "A", "S", "E", "C"];
export const STRENGTH_DIMENSIONS = [
  "st_analytical",
  "st_communication",
  "st_leadership",
  "st_creativity",
  "st_technical",
  "st_care",
];
export const VALUE_DIMENSIONS = [
  "val_stability_growth",
  "val_local_abroad",
  "val_people_independent",
  "val_income_passion",
];

export const INTEREST_LABELS = {
  R: { km: "ការអនុវត្តជាក់ស្តែង", en: "Realistic / Hands-on" },
  I: { km: "ការស៊ើបអង្កេត និងស្រាវជ្រាវ", en: "Investigative" },
  A: { km: "សិល្បៈ និងភាពច្នៃប្រឌិត", en: "Artistic" },
  S: { km: "សង្គម និងការជួយអ្នកដទៃ", en: "Social" },
  E: { km: "សហគ្រិន និងភាពជាអ្នកដឹកនាំ", en: "Enterprising" },
  C: { km: "របៀបរៀបរយ និងសណ្តាប់ធ្នាប់", en: "Conventional / Organized" },
};

export const STRENGTH_LABELS = {
  st_analytical: { km: "ការវិភាគ", en: "Analytical thinking" },
  st_communication: { km: "ការទំនាក់ទំនង", en: "Communication" },
  st_leadership: { km: "ភាពជាអ្នកដឹកនាំ", en: "Leadership" },
  st_creativity: { km: "ភាពច្នៃប្រឌិត", en: "Creativity" },
  st_technical: { km: "ជំនាញបច្ចេកទេស", en: "Technical skill" },
  st_care: { km: "ការយកចិត្តទុកដាក់អ្នកដទៃ", en: "Caregiving" },
};

// Value dimensions are bipolar (-1..1). neg = low end, pos = high end.
export const VALUE_LABELS = {
  val_stability_growth: {
    name: { km: "ស្ថិរភាព ធៀបនឹង កំណើន", en: "Stability vs. Growth" },
    neg: { km: "ស្ថិរភាព និងសុវត្ថិភាព", en: "stability & security" },
    pos: { km: "ការរីកចម្រើន និងឱកាសថ្មី", en: "growth & new opportunity" },
  },
  val_local_abroad: {
    name: { km: "ក្នុងស្រុក ធៀបនឹង បរទេស", en: "Staying local vs. Moving away" },
    neg: { km: "ការនៅជិតគ្រួសារ និងស្រុកកំណើត", en: "staying close to family & home" },
    pos: { km: "ការផ្លាស់ទីទៅកន្លែងថ្មី", en: "moving to new places" },
  },
  val_people_independent: {
    name: { km: "ធ្វើការជាមួយមនុស្ស ធៀបនឹង ឯករាជ្យ", en: "Working with people vs. Independence" },
    neg: { km: "ការធ្វើការជាមួយមនុស្សច្រើន", en: "working closely with people" },
    pos: { km: "ការធ្វើការឯករាជ្យ ស្ងប់ស្ងាត់", en: "working independently & quietly" },
  },
  val_income_passion: {
    name: { km: "ប្រាក់ចំណូល ធៀបនឹង ចំណង់ចំណូលចិត្ត", en: "Income vs. Passion" },
    neg: { km: "ប្រាក់ចំណូលខ្ពស់", en: "earning a strong income" },
    pos: { km: "ការធ្វើអ្វីដែលស្រលាញ់", en: "doing what you love" },
  },
};

export function dimensionLabel(dim, lang) {
  if (INTEREST_LABELS[dim]) return INTEREST_LABELS[dim][lang];
  if (STRENGTH_LABELS[dim]) return STRENGTH_LABELS[dim][lang];
  if (VALUE_LABELS[dim]) return VALUE_LABELS[dim].name[lang];
  return dim;
}

export function isValueDimension(dim) {
  return VALUE_DIMENSIONS.includes(dim);
}

// Describe a student's -1..1 value-axis score in plain language.
export function describeValueScore(dim, score, lang) {
  const meta = VALUE_LABELS[dim];
  if (!meta) return "";
  if (score <= -0.25) return meta.neg[lang];
  if (score >= 0.25) return meta.pos[lang];
  return lang === "km"
    ? `មធ្យមរវាង${meta.neg.km} និង${meta.pos.km}`
    : `a balance of ${meta.neg.en} and ${meta.pos.en}`;
}
