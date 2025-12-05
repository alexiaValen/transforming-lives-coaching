const fs = require('fs');
const path = require('path');

// Minimal 1x1 transparent PNG (base64)
const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

const out = path.join(__dirname, '..', 'public');
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

const files = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 }
];

for (const f of files) {
  const buf = Buffer.from(tinyPngBase64, 'base64');
  fs.writeFileSync(path.join(out, f.name), buf);
  console.log('Wrote', f.name);
}

console.log('Placeholder icons written to public/; replace with properly sized PNGs for production.');
