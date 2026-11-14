import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { gaHeadSnippet, gaInlineHash } from '../../scripts/lib/ga-snippet.mjs';

describe('GA snippet and CSP hash', () => {
  it('hashes exactly the inline script the page ships', () => {
    const id = 'G-TEST123';
    const inline = /<script>([^<]*)<\/script>/.exec(gaHeadSnippet(id))![1];
    const expected = createHash('sha256').update(inline).digest('base64');
    expect(gaInlineHash(id)).toBe(`'sha256-${expected}'`);
  });
});
