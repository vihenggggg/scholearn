"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function PdfExportButton({ targetRef }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!targetRef.current || loading) return;
    setLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(targetRef.current, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#fff8f0",
      });

      const JPEG_QUALITY = 0.82;
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidthMm = pageWidth;
      const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

      if (imgHeightMm <= pageHeight) {
        pdf.addImage(
          canvas.toDataURL("image/jpeg", JPEG_QUALITY),
          "JPEG",
          0,
          0,
          imgWidthMm,
          imgHeightMm
        );
      } else {
        // Slice the tall canvas into page-sized chunks so nothing gets cut mid-card.
        const pageCanvasHeightPx = Math.floor((pageHeight * canvas.width) / imgWidthMm);
        let renderedPx = 0;
        let firstPage = true;

        while (renderedPx < canvas.height) {
          const sliceHeightPx = Math.min(pageCanvasHeightPx, canvas.height - renderedPx);
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceHeightPx;
          const ctx = sliceCanvas.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            renderedPx,
            canvas.width,
            sliceHeightPx,
            0,
            0,
            canvas.width,
            sliceHeightPx
          );

          if (!firstPage) pdf.addPage();
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
          firstPage = false;
        }
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
