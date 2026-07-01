# Wobb — Vibe Coder Intern Assignment

Influencer search and shortlisting application built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

**Live:** [wobb-assignment-five.vercel.app](https://wobb-assignment-five.vercel.app)

## Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm test           # run tests
npm run lint       # ESLint
```

---

## What I Changed

### Bugs fixed

- **Case-insensitive search** — username filtering was case-sensitive while fullname was case-insensitive. Both now normalize to lowercase.
- **Engagement stat display** — the profile detail page displayed engagement rate in the engagements count slot. Now shows the actual engagements value.
- **Race condition on navigation** — `loaded` state wasn't reset when switching between profiles, causing stale data to flash briefly. Added a cleanup flag that ignores responses from stale requests.
- **Missing usernames in YouTube data** — several YouTube accounts (Vlad and Niki, Kids Diana Show, Like Nastya) only had `handle`/`custom_name` fields with no `username`, causing `@undefined` in the UI. Added a normalization fallback in data extraction.
- **Dead code removed** — `SearchBar` component (never imported), `formatters.ts` (no callers), `clickCount` debug state, unused starter assets, and the `react-beautiful-dnd` dependency (deprecated, never used, peer conflict with React 19).

### UI/UX redesign

The original UI was a bare layout with gray borders. The redesign uses a slate/indigo color system with white cards, rounded corners, and consistent shadows. Platform badges are color-coded (pink for Instagram, red for YouTube, cyan for TikTok). The header is sticky with a backdrop blur and a shortlist counter badge. The shortlist slides in from the right as a drawer. All interactive elements have hover, focus, and active states. The layout is responsive from mobile to desktop.

### State management with Zustand

Five Zustand stores handle all application state:

| Store | Purpose |
|---|---|
| `searchStore` | Platform filter and search query |
| `shortlistStore` | Shortlisted profiles, persisted to localStorage |
| `uiStore` | Shortlist panel visibility |
| `themeStore` | Light/dark/system theme, persisted to localStorage |
| `toastStore` | Toast notification queue |

The assignment mentioned replacing React Context with Zustand. The starter used local `useState` in components rather than Context, but the same architectural reasoning applies — extract shared state into stores with proper separation of concerns.

### Add to List feature

The disabled "Add to List" button is now fully implemented:

- Add profiles from search cards or the profile detail page
- Remove individual profiles from the shortlist panel or by clicking the "Added" state on a card
- Duplicate prevention by `user_id`
- Persists across page refreshes via localStorage
- Slide-out panel accessible from the header
- Clear all with one click
- Toast notifications on add/remove

### Code quality

- `src/store/` for Zustand stores, `src/utils/` for pure helpers, `src/hooks/` for custom hooks, `src/test/` for tests
- `PlatformFilter` handles tab selection only; `SearchInput` is a standalone search field — each has a single responsibility
- Platform color/label/icon configuration centralized in `platformConfig.ts`
- All components fully typed with no `any` types
- Image error fallbacks render an SVG placeholder with the profile's initial instead of a broken image icon

### Performance

- `ProfileDetailPage` is lazy-loaded with `React.lazy` + `Suspense`, producing a separate chunk
- `ProfileCard` is wrapped in `React.memo` to skip re-renders when props are unchanged
- `useMemo` on the filtered/all profiles computation in `SearchPage`
- `useCallback` on the shortlist toggle handler in `ProfileDetailPage`
- `loading="lazy"` on all profile images

---

## Libraries

| Library | Category | Purpose |
|---|---|---|
| `zustand` | State management | Stores with built-in `persist` middleware for localStorage |
| `lucide-react` | Icons | Tree-shakeable icon components |
| `framer-motion` | Animation | Available for micro-interactions |

Removed from the starter: `react-beautiful-dnd` (deprecated, peer conflict with React 19, never used).

---

## Assumptions

- **Static data** — all profiles and search results are bundled JSON files loaded via static import and `import.meta.glob`. No API server is required.
- **Single shortlist** — one flat list, matching the assignment scope. Multiple named lists would add complexity without clear benefit.
- **Platform on shortlist navigation** — the shortlist panel doesn't store which platform a profile came from, so navigating to a shortlisted profile defaults to Instagram in the URL. The detail page uses platform only for display purposes.
- **Tailwind v4** — the project uses the CSS-first configuration syntax (`@import "tailwindcss"`).

---

## Trade-offs

- **Test coverage over breadth** — 19 tests cover the store logic, data helpers, and a component smoke test. End-to-end tests were deferred in favor of feature completeness within the deadline.
- **CSS animation over framer-motion for the panel** — the shortlist slide-in uses a CSS keyframe to keep the bundle smaller. Framer-motion is installed and available for future micro-interactions.
- **Class-based dark mode** — Tailwind v4 defaults to `prefers-color-scheme`, but a manual toggle requires class-based strategy. This adds a small CSS directive but gives users explicit control.
- **Local state over server state** — the assignment data is static JSON, so libraries like TanStack Query or SWR weren't needed. The Zustand stores are designed to be straightforward to adapt if the data layer moves to an API.

---

## Remaining Improvements

- [ ] End-to-end tests with Playwright
- [ ] Framer-motion staggered list animations and page transitions
- [ ] Fuzzy search (Fuse.js) for typo-tolerant profile discovery
- [ ] Drag-to-reorder in the shortlist panel
- [ ] Empty state illustrations
