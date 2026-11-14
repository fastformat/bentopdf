import { describe, it, expect } from 'vitest';
import { buildToolIndex } from '../../scripts/lib/tool-index.mjs';
import {
  injectIntoHub,
  injectIntoToolPage,
} from '../../scripts/lib/inject-tool-links.mjs';

const BASE = '/pdf/';
const index = buildToolIndex();
const merge = index.find((t) => t.slug === 'juntar-pdf')!;

const hubHtml = `<html><body><div id="tool-grid"></div><footer>f</footer></body></html>`;
const toolHtml = `<html><body><div id="tool-uploader">
  <button id="back-to-tools"><span>Voltar para Ferramentas</span></button>
  <h1>Juntar PDF</h1>
  <a href="comprimir-pdf.html">Comprimir</a>
  <a href="https://example.com/x.html">externo</a>
</div><footer>f</footer></body></html>`;

describe('injectIntoHub', () => {
  const out = injectIntoHub(hubHtml, index, BASE);

  it('links every tool from the hub', () => {
    for (const tool of index) {
      expect(out, `missing ${tool.slug}`).toContain(
        `href="${BASE}${tool.slug}"`
      );
    }
  });

  it('uses extensionless canonical URLs, never .html', () => {
    expect(out).not.toMatch(/href="\/pdf\/[a-z0-9-]+\.html"/);
  });

  it('renders each tool with its localized name and subtitle', () => {
    expect(out).toContain('Juntar PDF');
    expect(out).toContain('Combine vários PDFs em um único arquivo');
  });

  it('is idempotent', () => {
    expect(injectIntoHub(out, index, BASE)).toBe(out);
  });
});

describe('injectIntoToolPage', () => {
  const out = injectIntoToolPage(toolHtml, merge, index, BASE);

  it('adds a crawlable link back to the hub', () => {
    expect(out).toContain(`href="${BASE}"`);
  });

  it('adds related tools from the same category', () => {
    expect(out).toContain('Ferramentas relacionadas');
    const related = index.filter(
      (t) => t.category === merge.category && t.slug !== merge.slug
    );
    expect(related.length).toBeGreaterThan(0);
    expect(out).toContain(`href="${BASE}${related[0].slug}"`);
  });

  it('rewrites existing .html tool links to the canonical form', () => {
    expect(out).toContain(`href="${BASE}comprimir-pdf"`);
    expect(out).not.toContain('href="comprimir-pdf.html"');
  });

  it('leaves external links untouched', () => {
    expect(out).toContain('href="https://example.com/x.html"');
  });

  it('does not link the page to itself', () => {
    const selfLinks = out.match(new RegExp(`href="${BASE}${merge.slug}"`, 'g'));
    expect(selfLinks).toBeNull();
  });

  it('is idempotent', () => {
    expect(injectIntoToolPage(out, merge, index, BASE)).toBe(out);
  });
});

describe('injectIntoToolPage: related grid and academic CTA', () => {
  const pageHtml = `<html><body>
  <h1>Juntar PDF</h1>
  <section class="max-w-6xl mx-auto">
    <h2 data-i18n="relatedTools.title">Ferramentas PDF relacionadas</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <a href="dividir-pdf.html" class="block">Dividir</a>
      <a href="comprimir-pdf.html" class="block">Comprimir</a>
    </div>
  </section>
  <footer>f</footer></body></html>`;
  const out = injectIntoToolPage(pageHtml, merge, index, BASE);

  it('centers the related tools row regardless of card count', () => {
    expect(out).toContain('class="flex flex-wrap justify-center gap-4"');
    expect(out).not.toContain('lg:grid-cols-6');
  });

  it('links to signup with UTMs naming the tool page', () => {
    expect(out).toContain(
      'href="https://fastformat.co/accounts/signup/?utm_source=pdf_tools&amp;utm_medium=referral&amp;utm_campaign=pdf_academic_cta&amp;utm_content=juntar-pdf"'
    );
  });

  it('places the CTA right before the related tools section', () => {
    expect(out.indexOf('data-academic-cta')).toBeLessThan(
      out.indexOf('data-i18n="relatedTools.title"')
    );
  });

  it('never promises a Word export', () => {
    const cta = out.slice(
      out.indexOf('data-academic-cta'),
      out.indexOf('</section>', out.indexOf('data-academic-cta'))
    );
    expect(cta).not.toMatch(/word|docx/i);
  });

  it('is idempotent', () => {
    const again = injectIntoToolPage(out, merge, index, BASE);
    expect(again).toBe(out);
    expect(again.match(/data-academic-cta/g)).toHaveLength(1);
  });
});

it('adds the CTA before the footer when a page has no related section', () => {
  const out = injectIntoToolPage(toolHtml, merge, index, BASE);
  expect(out).toContain('data-academic-cta');
  expect(out.indexOf('data-academic-cta')).toBeLessThan(out.indexOf('<footer'));
});
