import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const blogCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      publishDate: z.string(),
      draft: z.boolean().default(false)
    }),
  });
  
export const collections = {
  'blog': blogCollection,
};