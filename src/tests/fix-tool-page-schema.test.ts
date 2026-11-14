import { describe, expect, it } from 'vitest';
import { fixPage } from '../../scripts/fix-tool-page-schema.mjs';

const page = `<html><body>
  <h1 data-i18n="tools:mergePdf.name">Juntar PDF</h1>
  <p data-i18n="tools:mergePdf.subtitle">Combine vários PDFs em um único arquivo.</p>
  <span data-i18n="upload.orarraste e solte">ou arraste e solte</span>
  <section>
    <h2 data-i18n="howItWorks.title">Como Funciona</h2>
    <h3>Enviar PDFs</h3><p>Selecione os arquivos</p>
    <h3>Baixar</h3><p>Salve o PDF unificado</p>
  </section>
  <details><summary>O juntar pdf é realmente grátis?</summary></details>
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"SoftwareApplication","name":"Juntar Pdf - FastFormat","applicationCategory":"PDF Tool","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
  </script>
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Como ","step":[{"@type":"Como Step","name":"Enviar PDF Files","text":"Click or arraste"}]}
  </script>
</body></html>`;

const jsonLd = (html: string) =>
  [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    ),
  ].map((m) => JSON.parse(m[1]));

describe('fixPage', () => {
  const out = fixPage(page);
  const [app, howTo] = jsonLd(out);

  it('rebuilds HowTo from the visible steps', () => {
    expect(howTo['@type']).toBe('HowTo');
    expect(howTo.step.map((s: { name: string }) => s.name)).toEqual([
      'Enviar PDFs',
      'Baixar',
    ]);
    expect(howTo.step[0]['@type']).toBe('HowToStep');
    expect(howTo.step[1].text).toBe('Salve o PDF unificado');
  });

  it('names the app after the tool, priced in BRL', () => {
    expect(app.name).toBe('Juntar PDF | FastFormat');
    expect(app.applicationCategory).toBe('UtilitiesApplication');
    expect(app.offers.priceCurrency).toBe('BRL');
  });

  it('replaces the slug-built FAQ question and the renamed i18n key', () => {
    expect(out).toContain('A ferramenta Juntar PDF é realmente grátis?');
    expect(out).toContain('data-i18n="upload.orDragAndDrop"');
  });

  it('is idempotent', () => {
    expect(fixPage(out)).toBe(out);
  });
});
