/**
 * Rewrites the fallback copy baked into each tool page so the server-rendered
 * HTML matches what i18n renders at runtime.
 *
 * The pages were generated with a slug-derived title case ("Juntar Pdf") and a
 * single generic subtitle repeated across all 114 pages — which is what crawlers
 * see, since the real text only appears after the i18n bundle runs. This syncs
 * both from public/locales/pt/tools.json.
 *
 * Idempotent: safe to re-run after adding tools.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.resolve(__dirname, '../src/pages');

/**
 * Replaces the text of every element bound to a `tools:<key>.name|subtitle`
 * translation with the pt-BR value.
 *
 * Pages are not one-tool-per-file: the multi-tool pages carry a card per
 * sub-tool, each with its own binding, and every one of them shipped the same
 * generic subtitle. So this rewrites all bindings found, not just the page's
 * own key.
 */
const BINDING =
  /(<(h1|h2|h3|p|span|div)\b[^>]*data-i18n="tools:([A-Za-z0-9_]+)\.(name|subtitle)"[^>]*>)([\s\S]*?)(<\/\2>)/g;

function syncBindings(html, locale) {
  let changed = 0;
  const out = html.replace(
    BINDING,
    (full, open, tag, key, field, body, close) => {
      const value = locale[key] && locale[key][field];
      if (!value) return full;
      const text = escapeHtml(value);
      if (body.trim() === text) return full;
      changed++;
      return `${open}\n          ${text}\n        ${close}`;
    }
  );
  return { html: out, changed };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const locale = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../public/locales/pt/tools.json'),
    'utf-8'
  )
);

let changedFiles = 0;
let changedNodes = 0;

for (const file of fs.readdirSync(PAGES_DIR)) {
  if (!file.endsWith('.html')) continue;
  const filePath = path.join(PAGES_DIR, file);
  const result = syncBindings(fs.readFileSync(filePath, 'utf-8'), locale);
  if (result.changed) {
    fs.writeFileSync(filePath, result.html);
    changedFiles++;
    changedNodes += result.changed;
  }
}

console.log(
  `✅ Tool page copy synced: ${changedNodes} nodes across ${changedFiles} files`
);
