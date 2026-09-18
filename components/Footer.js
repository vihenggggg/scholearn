"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="no-print border-t border-orange-100 bg-orange-50 py-6 text-center text-xs text-slate-500">
      <p>
        {lang === "km"
          ? "ទិសដៅ — ឧបករណ៍ជួយស្វែងយល់ខ្លួនឯង សម្រាប់សិស្សកម្ពុជា។ ចម្លើយវាយតម្លៃរបស់អ្នកមិនប្រមូល ឬរក្សាទុកជាលក្ខណៈផ្ទាល់ខ្លួនឡើយ — គ្មានឈ្មោះ គ្មានទំនាក់ទំនងឡើយ។"
          : "ទិសដៅ (Navigating Cambodians) — a free self-discovery tool for Cambodian students. Your individual answers are never collected or stored — no name, no contact info."}
      </p>
    </footer>
  );
}
