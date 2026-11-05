// Cache busting for CSS/JS: stamps every local .css/.js reference in the root .html files with
// ?v=<content hash>, e.g. assets/css/style.css?v=3f9a1c2e. The hash only changes when the file changes,
// so browsers re-download it exactly when needed.
// Run from this folder after editing any CSS or JS:   node cache-bust.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const hashes = new Map();
const hashOf = (rel) => {
  if (!hashes.has(rel)) {
    const p = join(root, rel);
    hashes.set(rel, existsSync(p) ? createHash('md5').update(readFileSync(p)).digest('hex').slice(0, 8) : null);
  }
  return hashes.get(rel);
};

const ref = /(href|src)="(assets\/[^"?#]+\.(?:css|js))(?:\?v=[^"]*)?"/g;
let changed = 0;
for (const file of readdirSync(root).filter((f) => f.endsWith('.html'))) {
  const path = join(root, file);
  const before = readFileSync(path, 'utf8');
  const after = before.replace(ref, (m, attr, rel) => {
    const h = hashOf(rel);
    return h ? `${attr}="${rel}?v=${h}"` : m;
  });
  if (after !== before) { writeFileSync(path, after); changed++; console.log('updated', file); }
}
for (const [rel, h] of hashes) console.log(`${rel} -> ${h ?? 'MISSING'}`);
console.log(changed ? `${changed} file(s) updated` : 'already up to date');
