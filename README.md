# Camomille — Portfolio

Astro single-page portfolio with case study routes. Built from the v8 mockup.

## Tech

- **[Astro 5](https://astro.build)** — static site, zero JS by default
- **[MDX](https://mdxjs.com)** — case studies as `.mdx` content with typed frontmatter
- **TypeScript** — for the client-side scripts and content schema
- **CSS** — handcrafted with custom properties, no framework
- **Lottie** ([bodymovin via CDN](https://cdnjs.com/libraries/bodymovin)) — for the CTA sparkle and any future motion

No build step beyond Astro itself. Hosting on **Vercel** or **Netlify** is one click each.

---

## Get it running locally

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Project structure

```
.
├── public/
│   ├── favicon.svg
│   └── assets/                       # Static images and Lottie JSONs (served as-is)
│       ├── assinatura-final.svg      # Wordmark for the hero
│       ├── brilho-novo.svg           # Star in the floating meta card
│       ├── brilho2.json              # Lottie sparkle for the CTA
│       └── ...
├── src/
│   ├── components/                   # Reusable UI pieces
│   │   ├── Header.astro              # Fixed header with checker + nav + indicator
│   │   ├── Hero.astro                # Pink hero with wordmark + headline
│   │   ├── MetaCard.astro            # Floating card bridging pink → white
│   │   ├── WorkSection.astro         # Selected work — pulls from content collection
│   │   ├── FeaturedProject.astro     # Big featured card
│   │   ├── ProjectCard.astro         # Smaller numbered card
│   │   ├── AboutTeaser.astro         # Bio block
│   │   ├── CTA.astro                 # Sparkle + email + socials
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts                 # Content collection schema
│   │   └── work/                     # One MDX file per case study
│   │       ├── rd-station.mdx
│   │       ├── will-bank.mdx
│   │       ├── unholy-women.mdx
│   │       └── next-case.mdx
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML shell + global CSS + scripts
│   ├── pages/
│   │   ├── index.astro               # Home (assembles all components)
│   │   └── work/
│   │       └── [...slug].astro       # Case study route — generates one page per MDX
│   ├── scripts/
│   │   └── client.ts                 # Header mode toggle, scroll-spy, reveals, Lottie
│   └── styles/
│       └── global.css                # Design tokens + all component styles
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Adding or editing a case study

Each case is a single MDX file in `src/content/work/`.

```md
---
title: "Will Bank — Loading System"
role: "Product Designer"
company: "Will Bank"
year: 2022
discipline: "Interface"           # Shown as the tag
summary: "One-line tl;dr."
cover: "/assets/cases/will.jpg"   # Optional — falls back to coverClass
coverClass: "cover-will"          # CSS placeholder while no image
featured: false
order: 2                          # Lower = appears earlier
draft: false                      # Set true to hide
tags: ["Interface", "Motion"]
---

## Challenge
Body of the case in markdown / MDX.
```

The page at `/work/<slug>` is generated automatically from the filename (`will-bank.mdx` → `/work/will-bank`).

**To replace a CSS placeholder cover with a real image:**
1. Drop the file in `public/assets/cases/<your-name>.jpg`
2. Set `cover: "/assets/cases/<your-name>.jpg"` in the frontmatter
3. Remove the `coverClass` line (or leave it as a fallback)

**To add a new case:**
1. Create a new `.mdx` file in `src/content/work/`
2. Set `featured: true` if it should be the big card at the top
3. Set `order` to control the sort

**To delete a case:** delete the `.mdx` file.

---

## Adding the avatar illustration

The about teaser currently shows a placeholder. To replace with the illustration:

1. Drop your PNG at `public/assets/avatar.png`
2. Open `src/components/AboutTeaser.astro`
3. Replace the `<span>...</span>` with `<img src="/assets/avatar.png" alt="Camila Santos" />`

---

## Editing copy

- **Hero headline / wordmark** → `src/components/Hero.astro`
- **Meta card content** (Currently / Focus / tagline) → `src/components/MetaCard.astro` (props or defaults)
- **About bio** → `src/components/AboutTeaser.astro`
- **CTA email + socials** → `src/components/CTA.astro` (props with defaults)
- **Nav links** → `src/components/Header.astro`

Anything visual lives in `src/styles/global.css` (design tokens at the top).

---

## Replacing the CSS placeholder covers with real assets

The four cover styles (`cover-rd`, `cover-will`, `cover-unholy`, `cover-placeholder`) are in `src/styles/global.css`. They're CSS-only stand-ins so the layout looks right before you upload real images. When you set a `cover:` URL on a case, the real image takes over and the CSS placeholder is ignored.

---

## Deploy

### Vercel (recommended)

1. Push this folder to a Git repo (GitHub, GitLab, Bitbucket)
2. Go to [vercel.com](https://vercel.com), import the repo
3. Vercel auto-detects Astro — no config needed
4. Add your custom domain in the Vercel dashboard (Settings → Domains)

### Netlify

1. Push to Git
2. New site from Git on [netlify.com](https://netlify.com)
3. Build command: `npm run build`, publish directory: `dist`

### Custom domain (e.g. `camomille.design`)

After buying the domain (Porkbun, Namecheap, Cloudflare Registrar):
1. Add the domain in your hosting dashboard
2. Update DNS at the registrar following the records the host gives you
3. SSL is automatic on both Vercel and Netlify

---

## What's done vs. what's still on you

**Done in this scaffold:**
- Full visual fidelity to mockup v8 (header, hero, meta card, work, about, CTA, footer)
- Pink/white header transition with movable scroll-spy nav indicator
- CSS placeholder covers for all 4 cases (so the layout never looks broken)
- Content collection schema validates case frontmatter at build time
- Case study route generates one page per MDX file
- Reduced-motion respected throughout

**For you to do:**
- Drop `avatar.png` in `public/assets/` and uncomment the img in AboutTeaser
- Replace placeholder cover styles with real cover images for each case
- Fill in the body of each case study (`.mdx` files have a skeleton)
- Update social URLs in `CTA.astro` (currently `#`)
- Verify hero copy / meta tagline match your voice
- Pick and configure the domain
- Deploy

---

## Notes

- The site is mobile-responsive (breakpoints at 900px and 768px). Test on real devices before launching.
- Lighthouse should score 95+ on a static deploy. Run `npm run build && npx lighthouse http://localhost:4321` after `npm run preview` to verify.
- Accessibility: nav indicator and CSS placeholders use `aria-hidden`. All interactive elements are keyboard-accessible. Color contrast verified against WCAG AA.
