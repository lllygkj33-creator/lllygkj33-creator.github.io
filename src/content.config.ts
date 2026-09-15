import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    order: z.number().default(99),
    updated: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { docs };
