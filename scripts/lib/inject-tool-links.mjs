/**
 * Makes the /pdf tool network crawlable.
 *
 * Before this, the hub linked 7 of 114 tools (the rest existed only inside the
 * JS-rendered grid) and tool pages linked back with a <button>, so most pages
 * were orphans in the served HTML. The few real links that did exist pointed at
 * `<slug>.html`, which is not the canonical URL — so link equity flowed to
 * duplicates.
 *
 * All injections are marked and idempotent, so the build can re-run safely.
 */

import { JSDOM } from 'jsdom';
import { relatedTools } from './tool-index.mjs';

const DIRECTORY_MARKER = 'data-tool-directory';
const RELATED_MARKER = 'data-related-tools';
const HUB_LINK_MARKER = 'data-hub-link';

const CARD_CLASS =
  'rounded-lg border border-gray-700 bg-gray-900 p-4 text-left transition-colors hover:border-indigo-500 hover:bg-gray-800';

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function groupByCategory(index) {
  const groups = new Map();
  for (const tool of index) {
    if (!groups.has(tool.category)) groups.set(tool.category, []);
    groups.get(tool.category).push(tool);
  }
  return groups;
}

/** Inserts `html` before the page footer, or at the end of body as a fallback. */
function insertBeforeFooter(document, html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const node = container.firstElementChild;
  const footer = document.querySelector('footer');
  if (footer) footer.parentNode.insertBefore(node, footer);
  else document.body.appendChild(node);
}

/**
 * Points every relative `<slug>.html` link at the canonical extensionless URL.
 * Absolute and external links are left alone.
 */
function normalizeToolLinks(document, base, slugs) {
  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href');
    const match = /^(?:\.\/)?([a-z0-9-]+)\.html$/.exec(href);
    if (!match) continue;
    if (match[1] === 'index') anchor.setAttribute('href', base);
    else if (slugs.has(match[1])) {
      anchor.setAttribute('href', `${base}${match[1]}`);
    }
  }
}

function serialize(dom) {
  return dom.serialize();
}

/** Full categorized directory of every tool, appended to the hub page. */
export function injectIntoHub(html, index, base) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const slugs = new Set(index.map((t) => t.slug));

  normalizeToolLinks(document, base, slugs);

  if (document.querySelector(`[${DIRECTORY_MARKER}]`)) return serialize(dom);

  let sections = '';
  for (const [category, tools] of groupByCategory(index)) {
    const cards = tools
      .map(
        (tool) => `
        <a href="${base}${tool.slug}" class="${CARD_CLASS}">
          <h3 class="font-semibold text-white">${escapeHtml(tool.name)}</h3>
          <p class="mt-1 text-sm text-gray-400">${escapeHtml(tool.subtitle)}</p>
        </a>`
      )
      .join('');
    sections += `
    <section class="mb-10">
      <h2 class="text-xl font-bold text-white mb-4">${escapeHtml(category)}</h2>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">${cards}
      </div>
    </section>`;
  }

  insertBeforeFooter(
    document,
    `<div ${DIRECTORY_MARKER} class="max-w-6xl mx-auto px-4 py-10">
    <h2 class="text-2xl font-bold text-white mb-6">Todas as ferramentas de PDF</h2>${sections}
  </div>`
  );

  return serialize(dom);
}

/** Crawlable hub link + same-category related tools, appended to a tool page. */
export function injectIntoToolPage(html, tool, index, base) {
  const dom = new JSDOM(html);
  const { document } = dom.window;
  const slugs = new Set(index.map((t) => t.slug));

  normalizeToolLinks(document, base, slugs);

  // The "back to tools" control is a <button>, invisible to crawlers.
  const backButton = document.querySelector('#back-to-tools');
  if (backButton && !document.querySelector(`[${HUB_LINK_MARKER}]`)) {
    const link = document.createElement('a');
    link.setAttribute(HUB_LINK_MARKER, '');
    link.setAttribute('href', base);
    link.className = 'text-indigo-400 hover:text-indigo-300 text-sm';
    link.textContent = 'Ferramentas de PDF';
    backButton.parentNode.insertBefore(link, backButton);
  }

  const related = relatedTools(tool, index);
  if (related.length && !document.querySelector(`[${RELATED_MARKER}]`)) {
    const links = related
      .map(
        (t) => `
        <a href="${base}${t.slug}" class="${CARD_CLASS}">
          <h3 class="font-semibold text-white">${escapeHtml(t.name)}</h3>
          <p class="mt-1 text-sm text-gray-400">${escapeHtml(t.subtitle)}</p>
        </a>`
      )
      .join('');
    insertBeforeFooter(
      document,
      `<nav ${RELATED_MARKER} aria-label="Ferramentas relacionadas" class="max-w-2xl mx-auto px-4 pb-12 w-full">
      <h2 class="text-lg font-bold text-white mb-4">Ferramentas relacionadas</h2>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">${links}
      </div>
      <p class="mt-4 text-sm text-gray-400">
        Veja <a href="${base}" class="text-indigo-400 hover:text-indigo-300">todas as ferramentas de PDF</a>.
      </p>
    </nav>`
    );
  }

  return serialize(dom);
}
