import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://camomille.design',
  srcDir: './src',
  integrations: [mdx()],
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});
