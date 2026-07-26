import { legal } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

// Legal documents (Terms of Service, Privacy Policy, ...) served under
// /legal. Add a new .mdx file to content/legal and it automatically appears
// on the /legal hub page.
export const legalSource = loader({
  baseUrl: '/legal',
  source: toFumadocsSource(legal, []),
});
