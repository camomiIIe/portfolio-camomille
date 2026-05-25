import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    year: z.number(),
    discipline: z.string(), // e.g. "Lottie", "Interface", "Illustration"
    summary: z.string(),
    cover: z.string().optional(), // path to image; falls back to coverClass placeholder
    coverAlt: z.string().optional(),
    coverClass: z.string().optional(), // CSS placeholder class while no image: cover-rd | cover-will | cover-unholy | cover-placeholder
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional()
  })
  ,
  render: async (entry) => {
    return await entry.render();
  }
});

export const collections = { work };
