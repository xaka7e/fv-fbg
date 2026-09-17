const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const archive = 'FBG-V4.3.22-WORKING-NOINDEX.zip';
const outDir = 'dist';

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const zip = new AdmZip(archive);
for (const entry of zip.getEntries()) {
  if (entry.isDirectory) continue;
  const relative = entry.entryName.replace(/^\/+/, '');
  if (!relative || relative.includes('..')) continue;
  const target = path.join(outDir, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, entry.getData());
}

console.log(`FBG V4.3.22 extracted to ${outDir}`);
