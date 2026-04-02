export default function exportPDF(element, filenamePrefix) {
  const originalTitle = document.title;
  // Modify title specifically so when 'Save as PDF' native dialog runs, it uses this exact name
  document.title = `${filenamePrefix.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}_resume`;
  window.print();
  // Restore title
  document.title = originalTitle;
}
