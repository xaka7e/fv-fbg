const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const partsDir = path.join(__dirname, 'pack');
const packedBase64 = fs.readdirSync(partsDir)
  .filter(name => /^part-\d+\.txt$/.test(name))
  .sort()
  .map(name => fs.readFileSync(path.join(partsDir, name), 'utf8'))
  .join('');

const compressed = Buffer.from(packedBase64, 'base64');
const payload = JSON.parse(zlib.brotliDecompressSync(compressed).toString('utf8'));

const outDir = path.join(__dirname, 'dist');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const [relative, item] of Object.entries(payload)) {
  const safe = relative.replace(/^\/+/, '');
  if (!safe || safe.includes('..')) continue;
  const target = path.join(outDir, safe);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const data = item.t === 'b' ? Buffer.from(item.d, 'base64') : item.d;
  fs.writeFileSync(target, data);
}

console.log(`FBG V4.3.22 restored to ${outDir}`);
