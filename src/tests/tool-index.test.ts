import { describe, it, expect } from 'vitest';
import { buildToolIndex } from '../../scripts/lib/tool-index.mjs';

describe('buildToolIndex', () => {
  const tools = buildToolIndex();

  it('discovers every tool page that declares an i18n key', () => {
    expect(tools.length).toBeGreaterThanOrEqual(114);
  });

  it('resolves the localized pt-BR name, never a slug-derived title case', () => {
    const merge = tools.find((t) => t.slug === 'juntar-pdf');
    expect(merge).toBeDefined();
    expect(merge!.name).toBe('Juntar PDF');
    // "Juntar Pdf" is the bug we are fixing: PDF must never be title-cased.
    expect(tools.every((t) => !/\bPdf\b/.test(t.name))).toBe(true);
  });

  it('gives every tool a non-empty, tool-specific subtitle', () => {
    for (const t of tools) {
      expect(t.subtitle, `${t.slug} has no subtitle`).toBeTruthy();
    }
    const generic = tools.filter((t) =>
      t.subtitle.startsWith('Converta, edite e processe seus arquivos')
    );
    expect(generic).toHaveLength(0);
  });

  it('produces unique slugs and unique subtitles', () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const subtitles = tools.map((t) => t.subtitle);
    expect(new Set(subtitles).size).toBe(subtitles.length);
  });

  it('assigns every tool to a category', () => {
    for (const t of tools) {
      expect(t.category, `${t.slug} has no category`).toBeTruthy();
    }
  });
});
