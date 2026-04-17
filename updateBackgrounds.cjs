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
  const dir = path.join(__dirname, 'src');
  walkDir(dir, (filePath) => {
    if (filePath.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let originalContent = content;
      
      // Change dark navy background to beige
      content = content.replace(/#0A1F44/g, '#F5F5DC');
      
      // Since background is now beige, change light text (like #E2E8F0, #FFFFFF where applicable) 
      // inside dark pages to deep navy for contrast.
      if (filePath.includes('DarkPage.css') || filePath.includes('Dashboard.css') || filePath.includes('AdminDashboard.css') || filePath.includes('Auth.css')) {
        content = content.replace(/color:\s*#E2E8F0/gi, 'color: #0A1F44');
        content = content.replace(/color:\s*white/gi, 'color: #0A1F44');
        content = content.replace(/color:\s*#FFFFFF/gi, 'color: #0A1F44');
        // Ensure nav logo looks good
        content = content.replace(/\.nav-logo-dark {([^}]*)color:\s*#0A1F44/gi, '.nav-logo-dark {$1color: #0A1F44');
        // Any box borders that were light, make them navy or slightly dark
        content = content.replace(/rgba\(255,\s?255,\s?255,\s?0\.06\)/g, 'rgba(10,31,68,0.1)');
        content = content.replace(/rgba\(255,\s?255,\s?255,\s?0\.1\)/g, 'rgba(10,31,68,0.2)');
        content = content.replace(/background:\s*#1A1F2E/g, 'background: #FFFFFF'); // dark cards to white
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated: ' + filePath);
      }
    }
  });
}

updateColors();
