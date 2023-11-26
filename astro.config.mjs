import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://dhrjarun.github.io',
  base: '/',
  markdown: {
    rehypePlugins: [
      remarkParse,
      rehypeStringify,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          content: {
            type: 'text',
            value: '↗',
          },
        },
      ],
    ],
  },
});
