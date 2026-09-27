# Project Handoff & Codebase State Documentation

**Project:** Taskin Thai Vegetables & Fruits Sdn. Bhd. — Corporate & Wholesale Website  
**Generated:** 2026-09-27  
**Workspace Root:** `e:\taskin-thai-website (2)\site\taskin-thai-react`  
**Parent Workspace:** `e:\taskin-thai-website (2)\site`

---

## 1. Project Overview

### Client & Business Profile
- **Company:** Taskin Thai Vegetables & Fruits Sdn. Bhd.
- **SSM Registration:** 202201039476 (1485173-X) · Incorporated 25 October 2022
- **Headquarters:** No. 21, Jalan Indah 10B, Taman Perindustrian Selayang Indah, 68100 Batu Caves, Selangor, Malaysia
- **Facilities:** 3 physical hubs (HQ warehouse, Pasar Borong Selayang branch, Selayang Indah branch)
- **Business Focus:** Fresh produce wholesale supply, import & export, cold storage warehousing, and commercial distribution across Malaysia.

### Technology Stack
- **Framework / Runtime:** React 19.2.8, React DOM 19.2.8
- **Build Tool:** Vite 8.3.1 (with `@vitejs/plugin-react` 6.1.1)
- **Routing:** React Router DOM 7.18.4 (`BrowserRouter`, lazy loading via `React.lazy` and `Suspense`)
- **Styling Architecture:** Scoped CSS Modules (`*.module.css`) paired with global theme variables in `src/index.css`
- **Linting:** oxlint 1.81.0 (`npm run lint`)
- **Production Domain:** `https://taskin-thai.vercel.app` (strictly HTTPS, non-www)

### Local Paths & Git Status
- **Active Git Repository:** `e:\taskin-thai-website (2)\site\taskin-thai-react`
- **Current Branch:** `main` (synchronized with remote)
- **Working Tree:** Clean (`git status` reports 0 uncommitted changes, working tree clean)
- **Latest Commit:** `e937b02` (*"Add auto advancing rotation with user interactions"*)

---

## 2. Current Site Structure & Routes

### Router Architecture (`src/App.jsx`)
Routing is configured in `src/App.jsx` wrapped inside `<LightboxProvider>`:
- `/` — Renders `<Home />` (lightweight landing page: Hero, Services teaser, Contact)
- `/about` — Renders `<AboutPage />` (consolidated About, MissionVision, Directors, CompanyInfo, Team, Facilities)
- `/products` — Renders `<ProductsPage />` (dedicated produce page with hero rotation & full catalogue grid)
- `/services` — Renders `<ServicesPage />` (dedicated services page detailing operational pillars)
- `/contact` — Renders `<ContactPage />` (dedicated contact directory, Google Map, and enquiry form)
- `/wholesale` — Renders `<Wholesale />` (dedicated B2B wholesale supply page, code-split via `React.lazy`)
- `*` — Fallback route executing `<Navigate to="/" replace />`

Global persistent UI wrappers in `App.jsx`:
- `<ScrollManager />` (resets window scroll on navigation and handles smooth anchor hash jumping)
- `<Header />` (sticky glassmorphic navigation bar with mobile hamburger drawer)
- `<Footer />` (comprehensive 3-column footer with contact details, quick links, and SSM credentials)
- `<Lightbox />` (global portal modal hooked to `useLightbox()` context for high-res photo inspection)
- `<BackToTop />` (floating button visible after 500px scroll)

### Current Page Content Breakdown
1. **Home Page (`/` — `src/pages/Home/Home.jsx`):**
   - `<Hero />`: Brand tagline, SSM credential badge, 3 animated count-up statistics, primary/secondary CTAs, produce badge.
   - *WaveDivider:* `#ffffff` fill over `#faf8f2` background.
   - `<Services />`: 4 operational pillars as home teaser.
   - *WaveDivider:* `#3F4B27` fill over `#ffffff` background.
   - `<Contact />`: Direct contact details, map, and PDPA enquiry form.
   - *WaveDivider:* `#2C3419` fill (variant `"up"`) over `#3F4B27` background.
2. **About Page (`/about` — `src/pages/About/AboutPage.jsx`):**
   - `<About />`: Corporate narrative, 4 capability cards.
   - *WaveDivider:* `#2C3419` fill over `#ffffff` background.
   - `<MissionVision />`: Corporate mission and 5-point vision.
   - *WaveDivider:* `#F7F5F0` fill (variant `"up"`) over `#3F4B27` background.
   - `<Directors />`: Executive director profiles and messages.
   - `<CompanyInfo />`: SSM corporate data table + 9 official license certificates.
   - `<Team />`: Team photo gallery + 3-tier interactive organizational chart (`<OrgChart />`).
   - `<Facilities />`: Cold storage facility stats + 22-image masonry gallery.
3. **Products Page (`/products` — `src/pages/Products/ProductsPage.jsx`):**
   - `<Products />`: 5-item rotating spotlight hero card + 8-category 29-product catalogue grid.
4. **Services Page (`/services` — `src/pages/Services/ServicesPage.jsx`):**
   - `<Services />`: Full services grid detailing quality assurance, customer support, import/export, and wholesale distribution.
5. **Contact Page (`/contact` — `src/pages/Contact/ContactPage.jsx`):**
   - `<Contact />`: Full contact directory, Google Maps embed, and enquiry form with WaveDivider footer transition.
6. **Wholesale Page (`/wholesale` — `src/pages/Wholesale/Wholesale.jsx`):**
   - Dedicated commercial B2B procurement landing page with operational metrics, workflow steps, and consultation CTA.

---

## 3. Recent Significant Changes (Current State)

### 1. Unified Products Section (`src/components/Products/Products.jsx`)
The three previous, disparate product-related sections (*Produce Showcase carousel*, *Featured Products bento grid*, and *Products catalogue grid*) were completely merged into a single consolidated `<Products />` component:
- **Rotating Hero Spotlight Area:**
  - Displays a curated subset of 5 representative products across 5 distinct categories:
    1. `bawang_holland` (Alliums)
    2. `chili_merah_besar` (Chilies)
    3. `brokoli` (Leafy Greens & Brassicas)
    4. `carrot` (Root Vegetables)
    5. `nippis` (Fruits)
  - **Auto-advance:** Advances every 5.5 seconds (`HERO_ROTATION_INTERVAL = 5500ms`).
  - **Interaction Pausing:** Immediately pauses auto-advance on card hover (`onMouseEnter`/`onMouseLeave`), keyboard focus (`onFocus`/`onBlur`), manual dot click, or arrow navigation.
  - **Inactivity Resumption:** Resumes auto-rotation automatically after 9 seconds of inactivity (`INACTIVITY_RESUME_DELAY = 9000ms`), avoiding getting stuck permanently paused.
  - **Manual Controls & Accessibility:** Prev/Next circular arrow buttons, numeric slide counter (`01 / 05`), and clickable dot indicators where the active slide expands into a 22px mango pill. Supports `ArrowLeft`/`ArrowRight` keyboard navigation.
  - **Motion Sensitivity:** Automatically disables auto-advance if the user's OS prefers reduced motion (`prefers-reduced-motion: reduce`), while leaving manual navigation controls fully operable.
  - **Zero-Flicker Transitions:** All 5 hero images are preloaded into memory on component mount and stacked with CSS opacity transitions (`opacity: 0` to `opacity: 1`), while text metadata renders synchronously from state without content tearing.
  - **Direct Filtering Link:** The "Explore [Category] ↓" button sets the catalogue filter and smoothly scrolls down to the filter bar.
- **Filterable Catalogue Grid Below:**
  - 8 category pills with real-time product counts (All Products: 29, Alliums: 3, Chilies: 4, Root Vegetables: 4, Leafy Greens & Brassicas: 7, Herbs & Aromatics: 4, Fruiting Vegetables: 2, Fruits: 5).
  - Individual product cards each feature an independent multi-photo slideshow with dot indicators and photo count badges, opening into the full-size image in the lightbox on click.

### 2. Complete Sitewide Removal of Pricing
- All placeholder prices (`RM ...`), reference price containers, unit price boxes, and `[SAMPLE]` disclaimer badges were removed sitewide from all components.
- **Strict Rule:** No pricing figures may be reintroduced anywhere across the site unless explicit client-verified wholesale pricing manifests are provided.

### 3. Removal of Numbered Eyebrows
- The legacy numbered eyebrow pattern (e.g. `01 — About the company`, `02 — Our Fresh Range`, `07 — Built for freshness`) was removed from every section heading sitewide.
- Headings now render cleanly and semantic subtitle/tag elements are used only where contextually descriptive. Do not re-add numbered prefixes.

### 4. Verified SEO, Open Graph & Canonical Setup
- **Production Domain:** `https://taskin-thai.vercel.app` is standardized across all metadata.
- **`index.html`:** Full SEO metadata, canonical tag, `og:type="website"`, `og:image`, `twitter:card`, and Google Fonts preconnects.
- **`Wholesale.jsx`:** Per-route metadata manager synchronizing `document.title`, `meta[name="description"]`, `og:title`, `og:description`, and `og:url` dynamically on mount and reverting on unmount.
- **Crawler Config:** `public/robots.txt` points to `https://taskin-thai.vercel.app/sitemap.xml`, and `public/sitemap.xml` indexes `/` (priority 1.0) and `/wholesale` (priority 0.8).

---

## 4. Known Recurring Bug Patterns to Watch For

The codebase was searched and verified clean of these bugs. Any subsequent session editing code must re-check against these two patterns:

### Pattern A: Bare `className="container"` instead of `className={styles.container}`
- **The Bug:** Writing `className="container"` as a literal HTML string instead of binding to the CSS Module `className={styles.container}`.
- **Consequence:** There is no global `.container` CSS rule. When written as a bare string, the wrapper fails to match any styling, resulting in zero horizontal padding, no maximum width constraint (`max-width: 1200px`), and an unconstrained full-bleed layout.
- **Current Status:** Clean. All 18 container references across all components properly bind to `{styles.container}`.
- **Prevention Checklist:** Whenever creating or refactoring a section wrapper, always verify that `styles` is imported from `./[Component].module.css` and applied via `{styles.container}`.

### Pattern B: AI-Invented Unverified Specific Claims in Copy
- **The Bug:** Generative models tend to synthesize specific marketing claims or operational promises (e.g., *"Scheduled delivery within 2 hours"*, *"Cold-chain temperature guaranteed at 2°C"*, *"Custom 5kg ventilated crate packaging"*, *"Commercial Anchor"*).
- **Consequence:** These specific claims are legally and operationally unverified against Taskin Thai's real operations and risk misrepresenting the client.
- **Current Status:** Clean. The wholesale page and product descriptions were cleansed of specific unverified logistics promises, keeping only verified factual data (SSM registration, location in Batu Caves, fleet of 10+ lorries/containers, 3 facilities, standard wholesale supply).
- **Prevention Checklist:** Never invent specific packaging sizes, transit guarantees, or commercial tiering. If content feels suspiciously specific, flag it for human review rather than adopting it as fact.

---

## 5. Open Items & Roadmap (Prioritized)

### Priority 1: Navigation & Internal Link Updates
- **Status:** Completed. All internal links sitewide (`<Header />`, mobile drawer, `<Footer />`, and in-page CTAs) now navigate cleanly between `/`, `/about`, `/products`, `/services`, `/contact`, and `/wholesale` via React Router. The Header About dropdown deep links (e.g. `/about#about`, `/about#mv`, `/about#team`) execute smooth scrolling via `<ScrollManager />`, and the Header active-link state uses `location.pathname`.

### Priority 2: Section Order & Grouping Reorganization
- In the current layout, the **Official Documents & Licenses** section is embedded directly inside `CompanyInfo.jsx` right before `Team.jsx`. Once multi-page routing is implemented, official credentials and licenses should be grouped more logically under an About / Corporate Credentials page.

### Priority 3: Hero Landing Page Full-Bleed Slideshow & Grounded Controls
- **Status:** Completed. Replaced previous static circular-badge Hero with a full-bleed 4-slide rotating showcase (Bawang Holland, Chili Merah Besar, Brokoli, and Cold Storage Chillers). Features Ken Burns zoom/pan motion, smooth cross-fades, animated text panel entrance, grounded bottom-right frosted-glass control dock (with slide counter, progress bars, and circular prev/next buttons), persistent stats ribbon, pause on hover/interaction, and `prefers-reduced-motion` compliance. Reflows seamlessly onto tablet and mobile viewports.

### Priority 4: Wholesale Page Copy Fact-Check
- `src/pages/Wholesale/Wholesale.jsx` uses safe, professional B2B copy. However, the client needs to review the exact procurement workflow steps and order minimums against their actual operational policies.

### Priority 5: Real Product Pack-Size & Pricing Data Integration
- When the client provides official packaging specs (e.g. sack weights, crate dimensions) and live wholesale price lists, these data structures can be added to `src/data/products.js` with appropriate date-stamping and disclaimers.

### Priority 6: Image & Asset Optimization
- The repository currently serves standard JPEG/JPG images located in `public/images/`. Converting images to modern WebP formats, implementing responsive `srcset` definitions, and configuring lazy loading attributes across all grid cards will improve Core Web Vitals (LCP/CLS).

### Priority 7: Contact Form Backend & Database Connection
- The contact form in `Contact.jsx` currently falls back to a simulated client-side submission because `VITE_FORMSPREE_ENDPOINT` is unconfigured. Once an endpoint, Formspree form ID, or serverless API route is provisioned, configure the endpoint and verify actual end-to-end receipt of messages. No database or persistent backend storage exists yet.

### Priority 8: Analytics Integration
- `index.html` contains commented-out GA4 tracking scripts. When the client provides `VITE_GA_MEASUREMENT_ID`, uncomment and wire up analytics.

### Priority 9: Deploy-Time Security Headers
- Before final production deployment on Vercel, configure HTTP headers in `vercel.json` (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Strict-Transport-Security`).

---

## 6. Development Workflow & Agent Interaction Pattern

This project is developed using a paired AI workflow:
1. **Implementation Agent (Google Antigravity / Gemini):** Runs directly in this IDE workspace. Has tools to view files, edit code, execute shell commands (e.g. `npm run dev`, `npm run build`, `git`), capture headless browser screenshots via Chrome DevTools Protocol, and verify changes against the browser.
2. **Reviewer & Prompt Writer (Claude Conversation):** Operates externally. The user copies Antigravity's task execution reports and outputs, pastes them into the Claude conversation for architectural review, and Claude drafts the next tightly scoped prompt for Antigravity.
3. **Execution Protocol for Incoming Sessions:**
   - Always verify the current state of files directly using read/view tools before editing. Never assume past session memory.
   - Run `npm run build` after changes to verify zero TypeScript/JSX/bundling regressions.
   - When presenting task completion to the user, include exact code diffs/snippets, command results, and image/screenshot paths so the user can paste them directly back to the reviewer.
