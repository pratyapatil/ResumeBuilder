const fs = require('fs');
const path = require('path');

const templatesToFix = [
  'TemplateTwelve.jsx', // Navy Blue Executive
  'TemplateEleven.jsx', // Teal Software Developer
  'TemplateTen.jsx', // Blue & Orange Corporate
  'TemplateNine.jsx', // Mint Green Modern
  'TemplateEight.jsx', // Two-Column Standard
  'TemplateSeven.jsx', // Enhancv Modern
  'TemplateSix.jsx', // Executive Photo
  'TemplateFive.jsx', // Creative Designer
  'TemplateFour.jsx'  // Photo Modern
];

const templatesDir = path.join(__dirname, 'src', 'templates');

for (const filename of templatesToFix) {
  const filePath = path.join(templatesDir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has layout logic
  if (content.includes('layout.map')) {
    console.log(`Skipping ${filename}, already has masonry logic.`);
    continue;
  }

  // Inject layout into destructured props
  content = content.replace(/(const {\s*personalInfo[^}]*)} = data;/, (match, p1) => {
    if (!p1.includes('layout')) return match.replace('} = data;', ', layout } = data;');
    return match;
  });

  // Inject isVisible function
  const isVisibleFunc = `
  const isVisible = (id) => {
    if (!layout) return true;
    const item = layout.find(item => item.id === id);
    return item ? item.visible : true;
  };
`;
  content = content.replace(/(const renderBulletPoints|return \()/, isVisibleFunc + '\n  $1');

  // Extract sections using very permissive regex matching balanced brackets roughly.
  // Actually, standard regex for JSX blocks is hard.
  // We can just rely on the fact that blocks start with `{someVar?.length > 0 && (` or `{personalInfo.summary && (`
  
  const extractAndRemove = (regexStr) => {
    const rx = new RegExp(regexStr, 's');
    const match = content.match(rx);
    if (match) {
      // blank out from content
      content = content.replace(rx, '');
      return match[1].trim(); // The raw JSX of the section
    }
    return null;
  };

  const getSect = (varName) => {
    // Looks for: {varName?.length > 0 && ( ...section... )} OR {varName && ( ...section... )}
    // Since we know the codebase formatting:
    const startRegex = `\\{${varName}(?:\\?\\.length > 0)?\\s*&&\\s*\\([\\s\\n]*<section[^>]*>`;
    const rx = new RegExp(`(${startRegex}.*?<\\/section>[\\s\\n]*\\))`, 's');
    let match = content.match(rx);
    
    // There are nested mappings. We just want to extract the entire expression block.
    // Instead of doing pure regex which will break on nested sections/divs, we can just 
    // find the start index of `{varName`, parse the balanced `{}` pairs.
    return null;
  };
}
