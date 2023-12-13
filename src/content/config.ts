import { defineCollection, z } from 'astro:content';

export const writingSchema = z.object({
  title: z.string(),
  publishDate: z.date(),
  draft: z.boolean().default(false),
  archive: z.boolean().default(false),
});

const writing = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: writingSchema,
});

export const collections = {
  writing,
};
