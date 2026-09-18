import { dimensionLabel } from "@/lib/dimensions";

/** Builds the "why this fits you" sentence from topMatchDrivers() output. */
export function buildWhyFitsText(drivers, lang) {
  if (!drivers.length) {
    return lang === "km"
      ? "ទម្រង់ចំណាប់អារម្មណ៍ និងចំណុចខ្លាំងរបស់អ្នកទំនងជិតនឹងជំនាញនេះជារួម។"
      : "Your overall interest and strength profile is a close overall match for this field.";
  }
  const names = drivers.map((d) => dimensionLabel(d.dim, lang));
  if (lang === "km") {
    return `អ្នកមានពិន្ទុខ្ពស់លើ${names.join(" និង ")} ហើយជំនាញនេះក៏ត្រូវការចំណុចនោះដែរ។`;
  }
  if (names.length === 1) {
    return `You scored high on ${names[0]}, and so does this field.`;
  }
  return `You scored high on ${names.join(" and ")}, and so does this field.`;
}
