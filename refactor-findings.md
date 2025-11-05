# Kids Songs Refactor Opportunities

This document captures potential refactors to consolidate UI concerns, reduce CSS duplication, and strengthen the overall architecture. Items are grouped by impact area and ranked (High → Low) by expected ROI.

## Standard UI Components (High)
- **`KidsButton` abstraction**  
  - Current state: Gradient button variants reappear in multiple views (`src/pages/HomePage.tsx:268`, `src/pages/SongPage.tsx:54`, `src/TabRenderer.tsx:77`) with brittle class strings (`btn btn-kids btn-kids-*`).  
  - Refactor: Create a `<KidsButton variant="primary|secondary|ghost|play|pause|stop">` component that encapsulates size, color, and accessibility. Expose optional `icon`, `as` (for `<Link>`), and loading states.  
  - Benefits: One place to change styles, safer theming, easier reuse in future features (setlists, playlists).

- **`Chip` / `FilterPill` component**  
  - Current state: Identical inline buttons for categories and tags (`src/pages/HomePage.tsx:243`, `src/pages/SongPage.tsx:74`) and matching CSS blocks (`src/App.css:135-166`).  
  - Refactor: Move to `<Chip tone="category|tag">`, accept `onSelect`, `selected`, and `size` props. Co-locate the styling (CSS module or `styled` helper) with the component.

- **Heading primitives**  
  - Current state: Hero and song headings share markup + decorative note span (`src/App.css:176-299`, `src/pages/HomePage.tsx:155`, `src/pages/SongPage.tsx:67`).  
  - Refactor: Introduce `<MusicalHeading level="h1|h2" tone="hero|song">` that renders the note icon, gradient text, and underline. This keeps typographic rules consistent across marketing and detail pages.

- **Card/listing shell**  
  - Current state: The song card markup plus metadata footer lives inline (`src/pages/HomePage.tsx:239-272`).  
  - Refactor: Extract a `<SongCard>` or generic `<FeatureCard>` that accepts title, primary chip, supporting chips, and footer actions. Opens the door for reusing the layout (e.g., curated playlists, difficulty drills).

- **Loader family**  
  - Current state: `FancyLoader` already exists (`src/components/FancyLoader.tsx`), but loader layout/styling is global (`src/App.css:29-77`).  
  - Refactor: Pair `FancyLoader` with a small wrapper (`<CenteredState>` or `<RouteSpinner>`) that handles spacing and accessibility copy so pages render the same empty/loading states.

## CSS Consolidation (High → Medium)
- **Design tokens + utilities**  
  - Observations: Color gradients repeat with slight variants across buttons, chips, and headings. Maintaining them in `src/App.css` (single global file) makes tweaks risky.  
  - Action: Extract a root token file (`src/styles/tokens.css`) with CSS variables for brand colors, gradients, radii, shadows. Consumers (components) reference `var(--color-accent)` instead of hardcoded hex values.

- **Scoped styling per component**  
  - Observations: Global selectors (`.btn-kids-*`, `.chip-*`, `.hero-heading`) leak across the app and assume unique class names.  
  - Action: Convert to CSS modules (e.g., `KidsButton.module.css`) or a CSS-in-JS solution. This keeps the styles collocated, avoids accidental overrides from Bootstrap, and removes the need for deeply nested class names.

- **Bootstrap theming pass**  
  - Observations: We import `bootstrap/dist/css/bootstrap.min.css` globally (`src/main.tsx:3`) yet override key button/card styles manually.  
  - Action: Provide a custom Bootstrap theme (SCSS build or CSS variables) so native components inherit the kids-friendly palette. Reduces ad-hoc overrides and allows reuse of Bootstrap utilities with consistent visuals.

- **Shared layout helpers**  
  - Observations: Containers repeat padding classes (`py-5`, `py-4`) and flex centering patterns for loaders/empty states.  
  - Action: Introduce utility classes or lightweight layout components (`<PageSection>`, `<FlexStack>`) to standardize spacing and reduce repeated class soup.

## Architectural Improvements (High → Low)
- **Single source of truth for song data**  
  - Issue: Metadata (`src/songs/metadata.ts:3-120`) duplicates title/category/tags/tempo/time stored again inside each song file (`src/songs/mary.ts:11-17`). The list of exports in `src/songs/index.ts:3-81` is hand-maintained.  
  - Improvement: Store song config once (e.g., `songs/mary.ts` exports the `KidsSong`; derive metadata via a build script or helper that maps over the song collection). Alternatively, define metadata in frontmatter and load measures from the same file. This prevents drift and unlocks type-safe tooling (`SongRepository#getMetadata()`).

- **Song loading layer**  
  - Issue: `SongPage` performs an inline dynamic import (`src/pages/SongPage.tsx:18-38`) and manually reads `module[songId]`. Errors are handled locally, but there is no caching or preloading for adjacent songs.  
  - Improvement: Create a `useSong` hook backed by a repository that caches imports, validates the payload (e.g., with `zod`), and exposes loading/error states. Router loaders or Suspense resources would simplify the component and enable SSR down the road.

- **Search/filter state encapsulation**  
  - Issue: `HomePage` owns query syncing, debouncing, Fuse.js setup, and URL manipulation in one file (`src/pages/HomePage.tsx:9-151`). `updateFilters` both mutates state and history for every keystroke, bloating the browser history stack.  
  - Improvement: Move this logic into `useSongFilters` (handles URL + debounce + persistence) and `useSongSearch` (wraps Fuse.js, exposes `results`, `isIndexReady`). Provide an option to update search params with `{ replace: true }` during live typing to keep history meaningful.

- **Precomputed taxonomy**  
  - Issue: Categories/tags are derived on the fly with a `useMemo` over the entire metadata array (`src/pages/HomePage.tsx:26-41`).  
  - Improvement: Export `allCategories` / `allTags` directly from a data module (possibly generated at build time). This shrinks runtime work and allows build-time validation (e.g., enforce allowed tags).

- **AlphaTab integration boundary**  
  - Issue: `TabRenderer` handles lifecycle, imperative commands, and button wiring in one component (`src/TabRenderer.tsx:9-96`). Rendering logic and player controls are tightly coupled.  
  - Improvement: Extract a `useAlphaTab` hook that manages setup/teardown and returns a typed command API. Keep presentational concerns (`<TabControls>` with buttons) separate from the data hook, which simplifies testing and unlocks reuse (e.g., inline previews).

- **Future-proof routing**  
  - Opportunity: With React Router v6.4+, loaders/actions could preload song metadata and 404 early. Pairing that with data APIs above gives us SSR/Streaming options if the project grows.

## Suggested Next Steps
1. Stand up a `components/ui` folder with `KidsButton`, `Chip`, `MusicalHeading`, and migrate existing usages.
2. Move color/gradient values into a token file and migrate `KidsButton` + `Chip` styles to CSS modules.
3. Introduce a `SongRepository` utility that indexes songs once and serves both metadata and dynamic imports.
4. Extract `useSongFilters` and `useSongSearch` hooks to shrink `HomePage` and improve URL/history behavior.
5. Revisit `TabRenderer` with a dedicated hook and composable controls to isolate AlphaTab side-effects.
