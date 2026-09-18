"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="no-print border-t border-orange-100 bg-orange-50 py-6 text-center text-xs text-slate-500">
      <p>
        {lang === "km"
          ? "ទិសដៅ — ឧបករណ៍ជួយស្វែងយល់ខ្លួនឯង សម្រាប់សិស្សកម្ពុជា។ មិនប្រមូល ឬរក្សាទុកទិន្នន័យផ្ទាល់ខ្លួនឡើយ។"
          : "ទិសដៅ (Navigating Cambodians) — a free self-discovery tool for Cambodian students. No personal data is collected or stored."}
      </p>
    </footer>
  );
}
