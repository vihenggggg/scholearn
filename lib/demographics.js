// Bilingual options for the pre-assessment demographic intake step.
// Collected anonymously (no name, no contact info) purely to help understand
// who is using the tool in aggregate.

export const AGE_RANGES = [
  { value: "under_16", km: "១៥ ឬក្រោម", en: "15 or under" },
  { value: "16_17", km: "១៦–១៧", en: "16–17" },
  { value: "18_19", km: "១៨–១៩", en: "18–19" },
  { value: "20_22", km: "២០–២២", en: "20–22" },
  { value: "23_plus", km: "២៣+", en: "23+" },
];

export const GRADE_STATUSES = [
  { value: "grade_12", km: "កំពុងសិក្សាថ្នាក់ទី១២", en: "Currently in Grade 12" },
  { value: "finished_high_school", km: "បញ្ចប់ថ្នាក់ទី១២រួចហើយ", en: "Already finished Grade 12" },
  { value: "university_tvet", km: "សិស្សសាកលវិទ្យាល័យ ឬ TVET", en: "University or TVET student" },
  { value: "other", km: "ផ្សេងៗ", en: "Other" },
];

export const PROVINCES = [
  { value: "phnom_penh", km: "ភ្នំពេញ", en: "Phnom Penh" },
  { value: "banteay_meanchey", km: "បន្ទាយមានជ័យ", en: "Banteay Meanchey" },
  { value: "battambang", km: "បាត់ដំបង", en: "Battambang" },
  { value: "kampong_cham", km: "កំពង់ចាម", en: "Kampong Cham" },
  { value: "kampong_chhnang", km: "កំពង់ឆ្នាំង", en: "Kampong Chhnang" },
  { value: "kampong_speu", km: "កំពង់ស្ពឺ", en: "Kampong Speu" },
  { value: "kampong_thom", km: "កំពង់ធំ", en: "Kampong Thom" },
  { value: "kampot", km: "កំពត", en: "Kampot" },
  { value: "kandal", km: "កណ្តាល", en: "Kandal" },
  { value: "kep", km: "កែប", en: "Kep" },
  { value: "koh_kong", km: "កោះកុង", en: "Koh Kong" },
  { value: "kratie", km: "ក្រចេះ", en: "Kratie" },
  { value: "mondulkiri", km: "មណ្ឌលគិរី", en: "Mondulkiri" },
  { value: "oddar_meanchey", km: "ឧត្តរមានជ័យ", en: "Oddar Meanchey" },
  { value: "pailin", km: "ប៉ៃលិន", en: "Pailin" },
  { value: "preah_sihanouk", km: "ព្រះសីហនុ", en: "Preah Sihanouk" },
  { value: "preah_vihear", km: "ព្រះវិហារ", en: "Preah Vihear" },
  { value: "prey_veng", km: "ព្រៃវែង", en: "Prey Veng" },
  { value: "pursat", km: "ពោធិ៍សាត់", en: "Pursat" },
  { value: "ratanakiri", km: "រតនគិរី", en: "Ratanakiri" },
  { value: "siem_reap", km: "សៀមរាប", en: "Siem Reap" },
  { value: "stung_treng", km: "ស្ទឹងត្រែង", en: "Stung Treng" },
  { value: "svay_rieng", km: "ស្វាយរៀង", en: "Svay Rieng" },
  { value: "takeo", km: "តាកែវ", en: "Takeo" },
  { value: "tboung_khmum", km: "ត្បូងឃ្មុំ", en: "Tboung Khmum" },
];

export function findLabel(list, value, lang) {
  const found = list.find((item) => item.value === value);
  return found ? found[lang] : "";
}
