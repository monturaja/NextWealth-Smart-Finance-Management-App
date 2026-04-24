const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

function processFile(filePath) {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js') && !filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Navy: #0F2854
    content = content.replaceAll(/slate-900/g, '[#0F2854]');
    content = content.replaceAll(/slate-950/g, '[#0F2854]');
    content = content.replaceAll(/slate-800/g, '[#0F2854]');
    
    // Medium Blue: #1C4D8D
    content = content.replaceAll(/indigo-600/g, '[#1C4D8D]');
    content = content.replaceAll(/indigo-700/g, '[#1C4D8D]');
    content = content.replaceAll(/blue-600/g, '[#1C4D8D]');
    
    // Light Blue: #4988C4
    content = content.replaceAll(/indigo-500/g, '[#4988C4]');
    content = content.replaceAll(/indigo-400/g, '[#4988C4]');
    content = content.replaceAll(/blue-500/g, '[#4988C4]');
    
    // Ice Cyan: #BDE8F5
    content = content.replaceAll(/indigo-100/g, '[#BDE8F5]');
    content = content.replaceAll(/indigo-50/g, '[#BDE8F5]');
    content = content.replaceAll(/slate-50/g, '[#BDE8F5]');
    content = content.replaceAll(/blue-50/g, '[#BDE8F5]');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            processFile(fullPath);
        }
    });
}

traverseDir(directoryPath);
console.log('Color mapping complete!');
