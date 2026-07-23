/**
 * Single source of truth for "which tool pages exist, and how are they named".
 *
 * Each tool page declares its translation key on the H1 (data-i18n="tools:<key>.name"),
 * so the page files themselves are the registry — no separate list to drift out of sync.
 * Names and subtitles come from the pt-BR locale, which is already complete and correct;
 * the fallback text baked into the HTML is not trustworthy (it was slug-title-cased).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const PAGES_DIR = path.join(ROOT, 'src/pages');
const LOCALE_TOOLS = path.join(ROOT, 'public/locales/pt/tools.json');

const H1_KEY = /<h1[^>]*data-i18n="tools:([A-Za-z0-9_]+)\.name"/s;

/** Tool pages that live at the repo root and don't carry an H1 i18n key. */
const EXTRA_PAGES = { 'fluxo-de-trabalho-pdf': 'pdfWorkflow' };

/**
 * Category buckets, matched against the slug in order. The first match wins,
 * so more specific patterns must come first.
 */
const CATEGORIES = [
  ['Converter para PDF', /-para-pdf$/],
  ['Converter de PDF', /^pdf-para-/],
  [
    'Organizar páginas',
    /juntar|dividir|extrair|girar|organizar|paginas|pagina|combinar|intercalar|sobrepor|remover/,
  ],
  [
    'Otimizar e reparar',
    /comprimir|otimizar|reparar|achatar|vetorizar|rasterizar|linearizar/,
  ],
  [
    'Editar e anotar',
    /editar|carimbar|marca-dagua|cabecalho|rodape|numeracao|cortar|ajustar|cores|preto-e-branco|endireitar|redimensionar/,
  ],
  [
    'Segurança',
    /proteger|senha|desbloquear|assinar|assinatura|criptograf|sanitiz|censurar|redigir/,
  ],
  ['Extrair e analisar', /ocr|extrair|comparar|metadados|analisar|contar/],
];

function categorize(slug) {
  for (const [name, pattern] of CATEGORIES) {
    if (pattern.test(slug)) return name;
  }
  return 'Outras ferramentas';
}

/**
 * @returns {Array<{slug: string, key: string, name: string, subtitle: string, category: string}>}
 *          sorted by category then name.
 */
export function buildToolIndex() {
  const locale = JSON.parse(fs.readFileSync(LOCALE_TOOLS, 'utf-8'));
  const found = new Map();

  for (const file of fs.readdirSync(PAGES_DIR)) {
    if (!file.endsWith('.html')) continue;
    const match = H1_KEY.exec(
      fs.readFileSync(path.join(PAGES_DIR, file), 'utf-8')
    );
    if (match) found.set(file.replace(/\.html$/, ''), match[1]);
  }
  for (const [slug, key] of Object.entries(EXTRA_PAGES)) {
    if (fs.existsSync(path.join(ROOT, `${slug}.html`))) found.set(slug, key);
  }

  const tools = [];
  for (const [slug, key] of found) {
    const entry = locale[key];
    if (!entry || !entry.name || !entry.subtitle) continue;
    tools.push({
      slug,
      key,
      name: entry.name,
      subtitle: entry.subtitle,
      category: categorize(slug),
    });
  }

  return tools.sort(
    (a, b) =>
      a.category.localeCompare(b.category, 'pt-BR') ||
      a.name.localeCompare(b.name, 'pt-BR')
  );
}

/** Tools sharing a category, excluding the tool itself. */
export function relatedTools(tool, index, limit = 6) {
  return index
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}
