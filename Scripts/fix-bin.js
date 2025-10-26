// scripts/fix-bin.js
const fs = require('fs');
const path = require('path');

function fixBin(p) {
  if (!fs.existsSync(p)) return;
  try {
    // Normalize line endings to LF
    const src = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
    fs.writeFileSync(p, src, 'utf8');
  } catch {}
  try {
    // Ensure executable bit on Linux CI
    fs.chmodSync(p, 0o755);
  } catch {}
  console.log(`[fix-bin] repaired ${p}`);
}

const bins = [
  path.join('node_modules', '.bin', 'vite'),
  path.join('node_modules', '.bin', 'tailwindcss'),
  path.join('node_modules', '.bin', 'postcss'),
];

bins.forEach(fixBin);