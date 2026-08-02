# Otaku Pulse

An all-in-one tracker and community platform for anime, manga, and games —
track what you watch, read, and play, unify your trophies and achievements,
and connect with a community of fans.

This is the **Phase 1 foundation**: project scaffold, design system,
navigation, the Landing/Login/Register/Dashboard pages, email/password auth,
and the full database schema. Every other page (Anime, Manga, Games, Trophy
Hub, Library, Calendar, News, Community, Marketplace, Friends, Messages,
Profile, Settings) is routed and rendering as a placeholder, ready to be
built out in later phases.

## Stack

| Layer          | Technology                                  |
| -------------- | -------------------------------------------- |
| Frontend       | React + TypeScript + Vite + Tailwind CSS     |
| Hosting        | GitHub Pages (custom domain supported)       |
| Backend        | Cloudflare Workers (REST API)                |
| Database       | Cloudflare D1 (SQLite)                       |
| File storage   | Cloudflare R2                                |
| Auth (Phase 1) | Email/password (JWT)                         |
| Auth (Phase 2) | Google, Discord, Steam, Xbox                 |

## Project structure

```
otaku-pulse/
├── frontend/               React + Vite + Tailwind app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     Sidebar, BottomNav, TopBar, AppLayout, route guard
│   │   │   └── ui/         Logo, PulseMark, GlassCard, XPBar, ComingSoon
│   │   ├── lib/            api.ts (fetch client), auth.tsx (auth context)
│   │   ├── pages/          One file per route (17 pages)
│   │   ├── App.tsx         Route definitions
│   │   └── main.tsx        Entry point
│   └── index.html
├── worker/                 Cloudflare Worker API
│   ├── src/
│   │   ├── routes/         auth.ts (register/login/me)
│   │   ├── lib/            jwt.ts, password.ts, cors.ts, http.ts
│   │   ├── db/schema.sql   Full D1 schema
│   │   ├── types.ts        Env bindings
│   │   └── index.ts        Router + entry point
│   └── wrangler.toml
└── .github/workflows/      CI: auto-deploy frontend + worker on push to main
```

## Design system

- **Palette:** void black (`#05040C`), surface purple-black, violet
  (`#8B5CF6`), cyan (`#2DD4EE`), paper white (`#F4F2FF`).
- **Type:** Chakra Petch (display/headings), Inter (body), JetBrains Mono
  (stats, XP, timestamps — anything HUD-like).
- **Signature element:** the "Pulse" — a five-bar animated waveform used as
  the brand mark and section divider, echoing the product name.
- **Components:** `.glass-card` (translucent, blurred, violet glow on
  hover), `.btn-primary` (gradient), `.btn-secondary` (outlined).

## Local development

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup, including Cloudflare
D1/R2 provisioning and GitHub Pages + custom domain configuration.

Quick start:

```bash
# 1. Backend
cd worker
npm install
cp .dev.vars.example .dev.vars   # then set a real JWT_SECRET
wrangler d1 create otaku-pulse-db   # paste the returned id into wrangler.toml
npm run db:migrate:local
npm run dev                       # runs at http://localhost:8787

# 2. Frontend (new terminal)
cd frontend
npm install
cp .env.example .env              # VITE_API_URL=http://localhost:8787
npm run dev                       # runs at http://localhost:5173
```

## What's implemented in Phase 1

- Full routing shell for all 17 pages with desktop sidebar + mobile bottom
  navigation.
- Email/password registration and login, JWT-based sessions, protected
  routes.
- Dashboard with XP/level display, recent activity, and recommendations
  (sample data — wires up to real tracking APIs in Phase 2).
- Complete D1 schema: users, oauth_identities, anime/manga/games catalogs,
  per-user tracking tables, achievements, posts/comments/likes, friends,
  messages, subscriptions, notifications.
- Cloudflare Worker with CORS, dependency-free JWT (Web Crypto HMAC-SHA256),
  and PBKDF2 password hashing.
- CI workflows to auto-deploy the frontend to GitHub Pages and the worker to
  Cloudflare on every push to `main`.

## What's coming later

- **Phase 2:** Anime/Manga/Games tracking APIs + UI, Trophy Hub, Unified
  Library, Calendar, News, Marketplace, Friends, Profile, Settings, Stripe
  billing, Google/Discord/Steam/Xbox login.
- **Phase 3:** Full community system — dedicated Gaming/Anime/Manga/
  Achievement/Creator communities, real-time chat via Durable Objects +
  WebSockets, reputation/rank system, moderation tools.

## License / attribution note

Otaku Pulse indexes metadata and links to legal viewing/reading sources —
it does not host copyrighted anime or manga content, and the marketplace
uses affiliate links rather than selling copyrighted media directly.
