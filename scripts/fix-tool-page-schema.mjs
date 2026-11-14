/**
 * Repairs the damage a find-and-replace translation pass left in the tool pages.
 *
 * - JSON-LD: "HowTo" became "Como " (an invalid schema type) and its steps mix
 *   English and Portuguese. Steps are rebuilt from the visible "Como Funciona"
 *   section, which is what Google requires them to match anyway.
 * - SoftwareApplication: slug-cased name ("Juntar Pdf"), English category and
 *   USD price.
 * - FAQ: "O varias paginas por folha pdf é realmente grátis?" was built from the
 *   slug; it now uses the tool's real name.
 * - i18n keys renamed by the same pass ("upload.orarraste e solte").
 *
 * Usage: node scripts/fix-tool-page-schema.mjs   (idempotent)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.resolve(__dirname, '../src/pages');

const KEY_FIXES = [
  ['data-i18n="upload.orarraste e solte"', 'data-i18n="upload.orDragAndDrop"'],
  [
    'data-i18n="multiTool.arraste e solte"',
    'data-i18n="multiTool.dragAndDrop"',
  ],
];

const LD_BLOCK =
  /(<script type="application\/ld\+json">\s*)([\s\S]*?)(\s*<\/script>)/g;

const SLUG_FAQ = /O [a-z0-9 ]+ é realmente grátis\?/;

const clean = (text) => text.replace(/\s+/g, ' ').trim();

function visibleSteps(document) {
  const title = document.querySelector('[data-i18n="howItWorks.title"]');
  const section = title?.closest('section');
  if (!section) return [];
  return [...section.querySelectorAll('h3')]
    .map((h3) => ({
      name: clean(h3.textContent),
      text: clean(h3.nextElementSibling?.textContent ?? ''),
    }))
    .filter((step) => step.name && step.text);
}

function indentJson(value, indent) {
  return JSON.stringify(value, null, 2).replace(/\n/g, `\n${indent}`);
}

export function fixPage(html) {
  let out = html;
  for (const [from, to] of KEY_FIXES) out = out.split(from).join(to);

  const { document } = new JSDOM(out).window;
  const toolName = clean(document.querySelector('h1')?.textContent ?? '');
  const subtitle = clean(
    document.querySelector('h1 + p, [data-i18n$=".subtitle"]')?.textContent ??
      ''
  );
  const steps = visibleSteps(document);

  out = out.replace(LD_BLOCK, (full, open, body, close) => {
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return full;
    }
    const indent = open.match(/\n([ \t]*)$/)?.[1] ?? '';

    if (data['@type'] === 'Como ' || data['@type'] === 'HowTo') {
      if (!toolName || steps.length < 2) return '';
      const howTo = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `Como usar a ferramenta ${toolName}`,
        ...(subtitle && { description: subtitle }),
        step: steps.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      };
      return open + indentJson(howTo, indent) + close;
    }

    if (data['@type'] === 'SoftwareApplication') {
      if (toolName) data.name = `${toolName} | FastFormat`;
      data.applicationCategory = 'UtilitiesApplication';
      if (data.offers) data.offers.priceCurrency = 'BRL';
      return open + indentJson(data, indent) + close;
    }

    return full;
  });

  if (toolName) {
    out = out.replace(SLUG_FAQ, `A ferramenta ${toolName} é realmente grátis?`);
  }

  // A dropped block leaves an empty line pair behind.
  return out.replace(/\n[ \t]*\n[ \t]*\n/g, '\n\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let changed = 0;
  for (const file of fs.readdirSync(PAGES_DIR)) {
    if (!file.endsWith('.html')) continue;
    const full = path.join(PAGES_DIR, file);
    const html = fs.readFileSync(full, 'utf8');
    const fixed = fixPage(html);
    if (fixed !== html) {
      fs.writeFileSync(full, fixed);
      changed++;
    }
  }
  console.log(`fix-tool-page-schema: ${changed} page(s) updated`);
}
