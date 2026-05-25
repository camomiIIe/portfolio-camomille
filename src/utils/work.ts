import type { AstroComponentFactory } from 'astro';

export interface WorkItem {
  slug: string;
  title: string;
  role?: string;
  company?: string;
  year: number;
  discipline: string;
  summary: string;
  cover?: string;
  coverAlt?: string;
  coverClass?: string;
  featured?: boolean;
  order: number;
  draft?: boolean;
  tags?: string[];
  Content: AstroComponentFactory;
}

const modules = import.meta.glob('../content/work/*.mdx', { eager: true }) as Record<
  string,
  {
    frontmatter: Omit<WorkItem, 'slug' | 'Content'>;
    default: AstroComponentFactory;
  }
>;

export const workItems: WorkItem[] = Object.entries(modules)
  .map(([filePath, module]) => {
    const slug = filePath.split('/').pop()?.replace(/\.mdx$/, '') ?? '';
    return {
      slug,
      ...module.frontmatter,
      Content: module.default,
    } as WorkItem;
  })
  .filter((item) => !item.draft)
  .sort((a, b) => a.order - b.order);

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}
