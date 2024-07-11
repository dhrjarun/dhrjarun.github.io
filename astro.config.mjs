import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { remarkReadingTime } from './remark-reading-time.mjs';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://dhrjarun.com',
  base: '/',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [remarkParse, rehypeStringify],
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
