import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://dhrjarun.github.io',
  base: '/',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [remarkParse, rehypeStringify],
  },
});
