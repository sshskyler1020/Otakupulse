# Deployment Guide

Covers: GitHub Pages hosting, custom domain setup, Cloudflare Worker
deployment, and D1/R2 provisioning.

---

## 1. Prerequisites

- A GitHub repository containing this project (push the `otaku-pulse/`
  contents to it).
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier
  works for D1, R2, and Workers at this scale).
- [Node.js 20+](https://nodejs.org) and npm installed locally.
- The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):
  `npm install -g wrangler` (or use the local one via `npx wrangler`).

---

## 2. Cloudflare D1 (database)

```bash
cd worker
wrangler login
wrangler d1 create otaku-pulse-db
```

Copy the `database_id` from the output into `worker/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "otaku-pulse-db"
database_id = "paste-the-id-here"
```

Apply the schema:

```bash
npm run db:migrate:remote
```

## 3. Cloudflare R2 (file storage)

```bash
wrangler r2 bucket create otaku-pulse-media
```

The binding is already declared in `wrangler.toml` as `MEDIA`. R2 is used
starting in Phase 2 for avatars, banners, and screenshot/clip uploads —
nothing to do yet beyond creating the bucket.

## 4. Worker secrets

Never put secrets in `wrangler.toml`. Set them via Wrangler:

```bash
wrangler secret put JWT_SECRET
# paste a long random string, e.g. output of: openssl rand -base64 48
```

(Phase 2 will add `GOOGLE_CLIENT_SECRET`, `DISCORD_CLIENT_SECRET`,
`STEAM_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` the same way.)

## 5. Deploy the Worker

```bash
cd worker
npm install
npm run deploy
```

This publishes to `https://otaku-pulse-api.<your-subdomain>.workers.dev`.

### Optional: custom API domain

In the Cloudflare dashboard, add `api.otakupulse.com` to your zone, then
uncomment the `routes` block in `wrangler.toml`:

```toml
routes = [
  { pattern = "api.otakupulse.com", custom_domain = true }
]
```

Redeploy with `npm run deploy`.

## 6. Frontend environment

Point the frontend at your deployed Worker:

```bash
cd frontend
cp .env.example .env
# edit .env:
# VITE_API_URL=https://api.otakupulse.com
# (or https://otaku-pulse-api.<your-subdomain>.workers.dev if no custom domain yet)
```

## 7. GitHub Pages hosting

### Option A — custom domain (recommended, e.g. `otakupulse.com`)

1. In your repo: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**. The included workflow
   (`.github/workflows/deploy-frontend.yml`) handles the rest.
2. Add a `frontend/public/CNAME` file containing just your domain:
   ```
   otakupulse.com
   ```
3. At your domain registrar / DNS provider, point the domain at GitHub
   Pages:
   - `A` records for the apex domain to GitHub's Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
   - or a `CNAME` record for a `www` subdomain to `<your-user>.github.io`
4. In **Settings → Pages**, enter `otakupulse.com` as the custom domain and
   enable **Enforce HTTPS** once it's verified.
5. Leave `BASE_PATH` unset in the deploy workflow — a custom domain serves
   from the root, so the default `base: "/"` in `vite.config.ts` is
   correct.

### Option B — `github.io/<repo>` (no custom domain yet)

1. Same **Settings → Pages → Source: GitHub Actions** step as above.
2. In `.github/workflows/deploy-frontend.yml`, uncomment and set:
   ```yaml
   BASE_PATH: /your-repo-name/
   ```
3. Push to `main`. Your site will be live at
   `https://<your-user>.github.io/<your-repo-name>/`.

### Repository variables for CI

The frontend workflow reads `VITE_API_URL` from a repository variable so
your deployed site talks to your deployed Worker:

**Settings → Secrets and variables → Actions → Variables → New repository
variable**

```
Name: VITE_API_URL
Value: https://api.otakupulse.com
```

### Worker CI (optional but recommended)

`.github/workflows/deploy-worker.yml` auto-deploys the Worker on every push
to `worker/`. It needs two repository **secrets**:

```
CLOUDFLARE_API_TOKEN     (Workers Edit + D1 Edit + R2 Edit permissions)
CLOUDFLARE_ACCOUNT_ID
```

Create the API token at
[dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
using the "Edit Cloudflare Workers" template, then add the D1/R2 edit
permissions to it.

---

## 8. Verify

1. Visit your Worker URL — `GET /` should return
   `{"name":"Otaku Pulse API","status":"ok"}`.
2. Visit your frontend URL, click **Create Account**, and confirm you land
   on the Dashboard. This exercises the full path: frontend → Worker →
   D1.

---

## Troubleshooting

- **CORS errors in the browser console:** make sure your deployed frontend
  origin is included in the Worker's `ALLOWED_ORIGINS` var in
  `wrangler.toml`, then redeploy the Worker.
- **404s on page refresh on GitHub Pages:** already handled —
  `frontend/public/404.html` redirects back through `index.html`, which
  restores the real URL before React Router mounts (the
  "spa-github-pages" pattern). No action needed.
- **`wrangler d1 execute` says table already exists:** the schema uses
  `CREATE TABLE IF NOT EXISTS`, so re-running migrations is safe.
