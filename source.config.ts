import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Legal documents (Terms of Service, Privacy Policy, ...) rendered under
// /legal. Every .mdx file in content/legal automatically shows up on the
// /legal hub page.
export const legal = defineCollections({
  type: 'doc',
  dir: 'content/legal',
  schema: pageSchema,
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
