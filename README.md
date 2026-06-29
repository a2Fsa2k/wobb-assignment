# Wobb — Vibe Coder Intern Assignment

Influencer search and shortlisting application built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

**Live:** [wobb-assignment-five.vercel.app](https://wobb-assignment-five.vercel.app)

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:5173
npm run build      # production build
npm run lint       # ESLint
```

> `--legacy-peer-deps` is needed because `react-beautiful-dnd` (was in the starter) had a peer conflict with React 19. I removed it; the flag is no longer needed after a clean install.

---

## What I Changed

### 1. Bugs Fixed

| Bug | Fix |
|---|---|
| **Case-sensitive username search** — `p.username.includes(query)` was case-sensitive while fullname was case-insensitive | Normalize both username and fullname to lowercase in `filterProfiles` |
| **Wrong engagement value displayed** — `ProfileDetailPage` used `formatEngagementRate()` to display the engagements count stat | Display actual engagements count with `formatFollowersDetail()` |
| **Race condition in profile detail** — `loaded` state wasn't reset when navigating between profiles, causing stale data flash | Reset state on username change; added cleanup flag to ignore stale async responses |
| **Dead `SearchBar` component** — existed but never imported; `PlatformFilter` had its own search input | Removed; split into `PlatformFilter` (tabs only) + `SearchInput` (standalone) |
| **Debug `clickCount` state** — tracked clicks in `SearchPage` with no functional purpose | Removed; state management moved to Zustand store |
| **Unused `react-beautiful-dnd`** — installed but never used, and deprecated for React 19 | Removed from dependencies |

### 2. UI/UX Redesign

- **Design system**: Clean slate-50 background, white cards, indigo accent color, consistent rounded corners and shadows
- **Platform badges**: Color-coded pills per platform (pink/Instagram, red/YouTube, cyan/TikTok)
- **Sticky header**: Backdrop-blurred header with shortlist counter badge
- **Profile cards**: Full-width cards with hover states, accessible keyboard navigation, loading states
- **Shortlist panel**: Slide-in drawer from the right with per-item remove and "clear all"
- **Responsive**: Mobile-first with breakpoints for tablet and desktop
- **Accessibility**: `aria-label` on all interactive elements, `role="button"` with keyboard handlers, semantic HTML, loading spinners for async operations

### 3. State Management — Zustand

Three Zustand stores replace what would have been React Context:

- **`searchStore`** — platform filter + search query
- **`shortlistStore`** — shortlisted profiles with `zustand/middleware/persist` to `localStorage` (survives page refresh)
- **`uiStore`** — shortlist panel open/close toggle

### 4. Add to List Feature

- **Add** profiles from search cards or profile detail page
- **Remove** individual profiles from the shortlist panel or by clicking "Added" on a card
- **Prevent duplicates** — store checks `user_id` before adding
- **Persist** across page refreshes via `localStorage`
- **View** shortlisted profiles in a slide-out panel (click "Shortlist" in the header)
- **Clear all** — one-click bulk remove

### 5. Code Quality Improvements

- **Folder structure**: `src/store/` for Zustand stores, `src/components/` organized by concern
- **Separation of concerns**: `PlatformFilter` (tabs only), `SearchInput` (search only), `VerifiedBadge` (reusable), `ShortlistPanel` (self-contained)
- **Platform config**: Centralized color/label/icon map in `platformConfig.ts` instead of inline switch logic
- **TypeScript**: All components fully typed; no `any` types; strict `verbatimModuleSyntax` respected

### 6. Performance Optimizations

- **Code splitting**: `ProfileDetailPage` lazy-loaded with `React.lazy` + `Suspense`
- **`React.memo`** on `ProfileCard` to skip re-renders when props haven't changed
- **`useMemo`** on filtered/all profile arrays in `SearchPage`
- **`useCallback`** on the shortlist toggle handler in `ProfileDetailPage`
- **`loading="lazy"`** on profile images

---

## Libraries Added

| Library | Purpose |
|---|---|
| `zustand` | State management with built-in `persist` middleware for localStorage |
| `lucide-react` | Tree-shakeable icon library (Search, Plus, Check, X, ArrowLeft, etc.) |
| `framer-motion` | Animation primitives (installed, available for future micro-interactions) |

## Libraries Removed

| Library | Reason |
|---|---|
| `react-beautiful-dnd` | Deprecated; peer dependency conflict with React 19; never used in the app |

---

## Assumptions

- **JSON data is static** — search results and profile details are loaded from bundled JSON files (`import.meta.glob`). No API calls needed.
- **Single shortlist** — one flat list. No multiple named lists per the assignment scope.
- **Platform for shortlisted profiles** — when navigating from the shortlist panel, platform defaults to Instagram in the URL since the shortlist doesn't store the originating platform (profiles can exist on multiple platforms, but the detail page only uses platform for display).
- **Tailwind v4** — the starter uses Tailwind v4 with `@import "tailwindcss"` syntax (CSS-first config, no `tailwind.config.js`).

---

## Trade-offs

- **No test suite** — prioritizing feature completeness over test coverage within the deadline. Would add Vitest + React Testing Library with more time.
- **No deployment** — the app runs locally. Deploying to Vercel/Netlify would be straightforward (the build output is a static SPA).
- **Single shortlist** — the assignment asks for "a selected list"; I implemented one list. Multi-list support would add complexity without clear benefit.
- **Framer-motion installed but lightly used** — the slide-in animation uses a CSS keyframe instead of framer-motion's `AnimatePresence` to keep the bundle smaller. Framer-motion is available for future polish.
- **No dark mode toggle** — the redesign uses a light theme. The original had `prefers-color-scheme: dark` support which I replaced rather than extended to save time.

---

## Remaining Improvements (with more time)

- [ ] Add unit tests (Vitest + React Testing Library)
- [ ] Add end-to-end tests (Playwright)
- [ ] Deploy to Vercel or Netlify
- [ ] Add framer-motion micro-interactions (staggered list animations, page transitions)
- [ ] Add dark mode toggle (not just `prefers-color-scheme`)
- [ ] Add fuzzy search (Fuse.js) for better profile discovery
- [ ] Add toast notifications for add/remove actions
- [ ] Add drag-to-reorder in the shortlist panel
- [ ] Add empty state illustrations
