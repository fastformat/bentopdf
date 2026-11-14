/**
 * GA4 snippet shared by the Vite HTML transform and the CSP generator.
 *
 * The CSP had no Google origins and no 'unsafe-inline', so browsers blocked
 * gtag on every /pdf page: GA saw 20 sessions in 28 days while Search Console
 * reported ~8k clicks. Both sides now derive from one source, so the inline
 * script's hash always matches what the CSP allows.
 */
import { createHash } from 'node:crypto';

export const GA_SCRIPT_ORIGINS = ['https://*.googletagmanager.com'];
export const GA_CONNECT_ORIGINS = [
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
];

export function gaInlineScript(id) {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`;
}

export function gaHeadSnippet(id) {
  return (
    `\n    <script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>` +
    `\n    <script>${gaInlineScript(id)}</script>\n`
  );
}

export function gaInlineHash(id) {
  const digest = createHash('sha256')
    .update(gaInlineScript(id))
    .digest('base64');
  return `'sha256-${digest}'`;
}
