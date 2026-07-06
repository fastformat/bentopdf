import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const LOCALES_DIR = path.resolve(__dirname, '../public/locales');
const SITE_URL = (process.env.SITE_URL || 'https://www.bentopdf.com').replace(
  /\/+$/,
  ''
);
const EXCLUDED_PAGES = new Set(['404', 'wasm-settings']);

const languages = []; // pt-BR único (sem hreflang)

const PRIORITY_MAP = {
  index: 1.0,
  tools: 0.9,
  'conversor-pdf': 0.9,
  'editor-pdf': 0.9,
  'proteger-pdf': 0.9,
  'juntar-e-dividir-pdf': 0.9,
  'juntar-pdf': 0.9,
  'dividir-pdf': 0.9,
  'comprimir-pdf': 0.9,
  'editar-pdf': 0.9,
  'word-para-pdf': 0.9,
  'excel-para-pdf': 0.9,
  'powerpoint-para-pdf': 0.9,
  'jpg-para-pdf': 0.9,
  'pdf-para-word': 0.9,
  'pdf-para-excel': 0.9,
  'pdf-para-jpg': 0.9,
  about: 0.8,
  faq: 0.8,
  contact: 0.7,
  privacy: 0.5,
  terms: 0.5,
  licensing: 0.5,
};

function getPriority(pageName) {
  return PRIORITY_MAP[pageName] || 0.7;
}

function buildUrl(lang, pageName) {
  const pagePath = pageName === 'index' ? '' : pageName;
  if (lang === 'en') {
    return pagePath ? `${SITE_URL}/${pagePath}` : SITE_URL;
  }
  return pagePath ? `${SITE_URL}/${lang}/${pagePath}` : `${SITE_URL}/${lang}`;
}

function generateSitemap() {
  console.log('🗺️  Generating multilingual sitemap...');
  console.log(`   SITE_URL: ${SITE_URL}`);
  console.log(`   Languages: ${languages.join(', ')}`);

  const htmlFiles = fs
    .readdirSync(DIST_DIR)
    .filter((file) => file.endsWith('.html'))
    .map((file) => file.replace('.html', ''))
    .filter((name) => !EXCLUDED_PAGES.has(name));

  const lastModCache = new Map();
  const getLastMod = (lang, pageName) => {
    const cacheKey = `${lang}::${pageName}`;
    if (lastModCache.has(cacheKey)) return lastModCache.get(cacheKey);
    const fileName = `${pageName}.html`;
    const filePath =
      lang === 'en'
        ? path.join(DIST_DIR, fileName)
        : path.join(DIST_DIR, lang, fileName);
    let iso;
    try {
      iso = fs.statSync(filePath).mtime.toISOString().slice(0, 10);
    } catch {
      iso = new Date().toISOString().slice(0, 10);
    }
    lastModCache.set(cacheKey, iso);
    return iso;
  };

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  for (const pageName of htmlFiles) {
    const priority = getPriority(pageName);
    const url = buildUrl('en', pageName);
    const lastmod = getLastMod('en', pageName);

    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
`;

    for (const altLang of languages) {
      const altUrl = buildUrl(altLang, pageName);
      sitemap += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}"/>
`;
    }

    const defaultUrl = buildUrl('en', pageName);
    sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>
  </url>
`;
  }

  sitemap += `</urlset>
`;

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  const publicSitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemap);

  console.log(
    `✅ Sitemap generated with ${htmlFiles.length} canonical URLs (${languages.length} hreflang alternates each)`
  );
}

generateSitemap();
