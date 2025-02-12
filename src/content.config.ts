import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogs = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/blogs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
  }),
});

export const collections = { blogs };
