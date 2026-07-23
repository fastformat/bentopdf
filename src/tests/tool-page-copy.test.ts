import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { buildToolIndex } from '../../scripts/lib/tool-index.mjs';

const PAGES_DIR = path.resolve(__dirname, '../pages');

/**
 * Guards the copy that crawlers actually see. The i18n bundle fixes these
 * strings at runtime, so a regression here is invisible in the browser.
 */
describe('tool page server-rendered copy', () => {
  const tools = buildToolIndex();

  it.each(tools.map((t) => [t.slug, t] as const))(
    '%s renders its real name and subtitle in the HTML',
    (slug, tool) => {
      const file = path.join(PAGES_DIR, `${slug}.html`);
      if (!fs.existsSync(file)) return;
      const html = fs.readFileSync(file, 'utf-8');

      const h1 = new RegExp(
        `<h1[^>]*data-i18n="tools:${tool.key}\\.name"[^>]*>\\s*([\\s\\S]*?)\\s*</h1>`
      ).exec(html);
      expect(h1?.[1]).toBe(tool.name);

      expect(html).not.toContain(
        'Converta, edite e processe seus arquivos de forma simples'
      );
    }
  );
});
