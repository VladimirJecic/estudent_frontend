import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type DownloadCourseReportPdfOptions = {
  element: HTMLElement | null;
  filename?: string;
  title?: string;
};

export async function downloadCourseReportPdf({
  element,
  filename = "izvestaj-predmeta.pdf",
  title,
}: DownloadCourseReportPdfOptions): Promise<void> {
  if (!element) {
    throw new Error("Element for PDF export is not available.");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    scrollY: -window.scrollY,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  if (title) {
    pdf.setProperties({ title });
  }

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 32;
  const usableWidth = pageWidth - margin * 2;
  const imgHeight = (canvas.height * usableWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = margin;

  pdf.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
  heightLeft -= pageHeight - margin * 2;

  while (heightLeft > 0) {
    pdf.addPage();
    position = margin - (imgHeight - heightLeft);
    pdf.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2;
  }

  pdf.save(filename);
}
