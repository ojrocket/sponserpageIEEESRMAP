const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function updateColors() {
  const dir = process.argv[2] || path.join(__dirname, 'src');
  walkDir(dir, (filePath) => {
    if (filePath.endsWith('.css') || filePath.endsWith('.html') || filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let originalContent = content;
      
      content = content.replace(/#0A66CC/gi, '#0A66C2');
      content = content.replace(/#0B0F1A/gi, '#0A1F44');
      content = content.replace(/rgba\(\s*11\s*,\s*15\s*,\s*26/g, 'rgba(10, 31, 68');
      content = content.replace(/rgba\(\s*10\s*,\s*102\s*,\s*204/g, 'rgba(10, 102, 194)');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated: ' + filePath);
      }
    }
  });
}

updateColors();
