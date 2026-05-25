import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    year: z.number(),
    discipline: z.string(),
    summary: z.string(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverClass: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional()
  })
});

export const collections = { work };
