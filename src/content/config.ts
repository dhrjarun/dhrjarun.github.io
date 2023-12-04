import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const writing = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  writing: writing,
};
