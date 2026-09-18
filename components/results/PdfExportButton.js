"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const JPEG_QUALITY = 0.85;

// Adds one captured page canvas to the PDF as one or more A4 pages (only
// splits if that single booklet page somehow renders taller than A4 —
// normally each booklet page is sized to fit exactly one A4 page).
function addCanvasAsPages(pdf, canvas, isFirstOverall) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidthMm = pageWidth;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  if (imgHeightMm <= pageHeight + 0.5) {
    if (!isFirstOverall) pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/jpeg", JPEG_QUALITY), "JPEG", 0, 0, imgWidthMm, imgHeightMm);
    return;
  }

  const pageCanvasHeightPx = Math.floor((pageHeight * canvas.width) / imgWidthMm);
  let renderedPx = 0;
  let first = true;
  while (renderedPx < canvas.height) {
    const sliceHeightPx = Math.min(pageCanvasHeightPx, canvas.height - renderedPx);
    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sliceHeightPx;
    sliceCanvas
      .getContext("2d")
      .drawImage(canvas, 0, renderedPx, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

    if (!(isFirstOverall && first)) pdf.addPage();
    const sliceHeightMm = (sliceHeightPx * imgWidthMm) / canvas.width;
    pdf.addImage(
      sliceCanvas.toDataURL("image/jpeg", JPEG_QUALITY),
      "JPEG",
      0,
      0,
      imgWidthMm,
      sliceHeightMm
    );

    renderedPx += sliceHeightPx;
    first = false;
  }
}

export default function PdfExportButton({ bookletRef }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!bookletRef.current || loading) return;
    setLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const pages = Array.from(bookletRef.current.querySelectorAll(".pdf-page"));
      const pdf = new jsPDF("p", "mm", "a4", true);

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: "#fffaf3",
        });
        addCanvasAsPages(pdf, canvas, i === 0);
      }

      pdf.save("tisdav-results.pdf");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="rounded-full border-2 border-emerald-700 px-6 py-3 font-bold text-emerald-800 transition-colors hover:bg-emerald-700 hover:text-white disabled:cursor-wait disabled:opacity-60"
    >
      {loading ? t("btnDownloadingPdf") : t("btnDownloadPdf")}
    </button>
  );
}
