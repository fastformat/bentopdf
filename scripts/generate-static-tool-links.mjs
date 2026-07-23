/**
 * Post-build step: rewrites dist/ so the tool network is reachable without JS.
 *
 * - dist/index.html gets a categorized directory linking all tool pages
 *   (the runtime grid only exists after the JS bundle loads).
 * - every tool page gets a crawlable hub link + same-category related tools.
 * - every relative `<slug>.html` link is pointed at the canonical URL.
 *
 * Runs after `vite build` and before `generate-sitemap`, so the sitemap and the
 * link graph describe the same URLs.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildToolIndex } from './lib/tool-index.mjs';
import { injectIntoHub, injectIntoToolPage } from './lib/inject-tool-links.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE = (process.env.BASE_URL || '/').replace(/\/?$/, '/');

const index = buildToolIndex();
if (!index.length) {
  console.error('❌ Tool index is empty — refusing to strip links from dist/');
  process.exit(1);
}

const hubPath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(hubPath)) {
  console.error(`❌ ${hubPath} not found — did vite build run?`);
  process.exit(1);
}

fs.writeFileSync(
  hubPath,
  injectIntoHub(fs.readFileSync(hubPath, 'utf-8'), index, BASE)
);

let patched = 0;
let missing = 0;
for (const tool of index) {
  const file = path.join(DIST_DIR, `${tool.slug}.html`);
  if (!fs.existsSync(file)) {
    missing++;
    console.warn(`   ⚠️  ${tool.slug}.html not in dist/`);
    continue;
  }
  fs.writeFileSync(
    file,
    injectIntoToolPage(fs.readFileSync(file, 'utf-8'), tool, index, BASE)
  );
  patched++;
}

console.log(
  `✅ Static tool links: hub directory with ${index.length} tools, ` +
    `${patched} tool pages cross-linked${missing ? ` (${missing} missing)` : ''}`
);
