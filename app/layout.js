import { Noto_Sans_Khmer, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-khmer",
  subsets: ["khmer"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Schoolearn — ស្វែងយល់ខ្លួនឯង ស្វែងរកជំនាញ",
  description:
    "Schoolearn helps Cambodian students discover which university majors or vocational paths fit them, and connects each match to real scholarship resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="km" className={`${notoSansKhmer.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-orange-50 text-slate-800 antialiased">
        <LanguageProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
