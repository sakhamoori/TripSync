# TripSync

Trip planning app (package name: `wanderlog`) — React + Vite + TypeScript.

Converted from a Claude artifact dump into a local Vite project. Plan trips with itinerary, packing list, expenses, explore/favorites, and an in-app chatbot.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve dist/
```

## Verify / acceptance checklist

Use this list when reviewing the PR or a preview deploy:

- [ ] **App loads** on the public preview URL (preview deploy is owned separately; this PR ships the code)
- [ ] **Create / view a trip** — create a trip from Plan or Explore and open it from My Trips
- [ ] **Core tabs work** on a trip detail view:
  - [ ] Itinerary
  - [ ] Packing
  - [ ] Expenses
  - [ ] Explore / Favorites (nav + favorites persist)
- [ ] **Chatbot panel** opens without crashing

## Stack

- React 18 + React Router
- Vite 5 + TypeScript
- Local persistence via `localStorage` (no backend required for v1)

## Notes

- Vercel / preview hosting is owned by App developer — not part of this repo setup.
- `.gitignore` excludes `node_modules/`, `dist/`, and `.env*`.
