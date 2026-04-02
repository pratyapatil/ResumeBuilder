import PizZip from 'pizzip';
import fs from 'fs';
import path from 'path';

// Helper to create a paragraph with optional properties and a single text run
function p(text, opts = {}) {
  const pPr = [];
  if (opts.center) pPr.push('<w:jc w:val="center"/>');
  if (opts.spacing) pPr.push(`<w:spacing w:after="${opts.spacing}"/>`);

  const rPr = [];
  if (opts.bold) rPr.push('<w:b/><w:bCs/>');
  if (opts.italic) rPr.push('<w:i/><w:iCs/>');
  if (opts.size) rPr.push(`<w:sz w:val="${opts.size}"/><w:szCs w:val="${opts.size}"/>`);
  if (opts.color) rPr.push(`<w:color w:val="${opts.color}"/>`);

  const pPrStr = pPr.length ? `<w:pPr>${pPr.join('')}</w:pPr>` : '';
  const rPrStr = rPr.length ? `<w:rPr>${rPr.join('')}</w:rPr>` : '';

  return `<w:p>${pPrStr}<w:r>${rPrStr}<w:t xml:space="preserve">${text}</w:t></w:r></w:p>`;
}

// Empty paragraph for spacing
function emptyP(spacing = 120) {
  return `<w:p><w:pPr><w:spacing w:after="${spacing}"/></w:pPr></w:p>`;
}

// Build document body paragraphs
const body = [
  // Name
  p('{name}', { center: true, bold: true, size: 56, color: '4F46E5', spacing: 40 }),
  // Job title
  p('{job_title}', { center: true, size: 22, color: '6B7280', spacing: 40 }),
  // Contact
  p('{email} | {phone} | {address}', { center: true, size: 20, spacing: 200 }),

  // Summary section
  p('Professional Summary', { bold: true, size: 28, color: '4F46E5', spacing: 80 }),
  p('{summary}', { spacing: 200 }),

  // Experience section
  p('Work Experience', { bold: true, size: 28, color: '4F46E5', spacing: 80 }),
  p('{#experience}', { spacing: 40 }),
  p('{company} - {position}', { bold: true, spacing: 40 }),
  p('{startDate} - {endDate}', { italic: true, spacing: 40 }),
  p('{description}', { spacing: 120 }),
  p('{/experience}', { spacing: 200 }),

  // Education section
  p('Education', { bold: true, size: 28, color: '4F46E5', spacing: 80 }),
  p('{#education}', { spacing: 40 }),
  p('{institution} - {degree}', { bold: true, spacing: 40 }),
  p('{startDate} - {endDate}', { italic: true, spacing: 120 }),
  p('{/education}', { spacing: 200 }),

  // Skills section
  p('Skills', { bold: true, size: 28, color: '4F46E5', spacing: 80 }),
  p('{skills}', { spacing: 200 }),
];

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${body.join('\n    ')}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
      <w:cols w:space="720"/>
    </w:sectPr>
  </w:body>
</w:document>`;

// Create a minimal valid .docx (which is a ZIP file) using PizZip
const zip = new PizZip();

// [Content_Types].xml
zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`);

// _rels/.rels
zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

// word/_rels/document.xml.rels
zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`);

// word/document.xml
zip.file('word/document.xml', documentXml);

// word/styles.xml - define default font and Normal style
zip.file('word/styles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
          xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:docDefaults>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
      <w:sz w:val="24"/>
      <w:szCs w:val="24"/>
    </w:rPr>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
  </w:style>
</w:styles>`);

// Generate the .docx binary
const buffer = zip.generate({ type: 'nodebuffer' });

// Write to both public/ (for Vite dev) and dist/ (for Docker build)
const publicDir = path.resolve('public');
const distDir = path.resolve('dist');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'template.docx'), buffer);

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
fs.writeFileSync(path.join(distDir, 'template.docx'), buffer);

console.log('template.docx generated successfully in public/ and dist/');
