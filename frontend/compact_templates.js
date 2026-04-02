const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'templates');

// Read all JSX files
fs.readdirSync(templatesDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    let content = fs.readFileSync(path.join(templatesDir, file), 'utf-8');
    
    // Compacting paddings and margins
    content = content.replace(/gap-12/g, 'gap-6');
    content = content.replace(/gap-10/g, 'gap-6');
    content = content.replace(/gap-8/g, 'gap-5');
    content = content.replace(/gap-6/g, 'gap-4');
    
    content = content.replace(/mb-12/g, 'mb-6');
    content = content.replace(/mb-10/g, 'mb-6');
    content = content.replace(/mb-8/g, 'mb-5');
    content = content.replace(/mb-6/g, 'mb-4');
    
    content = content.replace(/py-8/g, 'py-5');
    content = content.replace(/py-6/g, 'py-4');
    content = content.replace(/py-4/g, 'py-2.5');
    
    content = content.replace(/pt-8/g, 'pt-5');
    content = content.replace(/pt-6/g, 'pt-4');
    content = content.replace(/pt-4/g, 'pt-2.5');
    
    content = content.replace(/pb-8/g, 'pb-5');
    content = content.replace(/pb-6/g, 'pb-4');
    content = content.replace(/pb-4/g, 'pb-2.5');
    
    // Remove forced h-full if it's on the main wrapper so it doesn't stretch awkwardly and leave gaps at the bottom.
    // Actually h-full on the outermost div is usually fine if it doesn't have justify-between pushing things apart.
    // Let's just tighten the gaps for now.

    // Write back
    fs.writeFileSync(path.join(templatesDir, file), content);
  }
});

console.log('Templates compacted');
