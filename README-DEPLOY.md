# PURBALINK V2.2 — Responsive UI + Jooble Jobs + Midtrans

Target domain: https://purbalink.web.id

## Deploy via GitHub + Cloudflare Workers
Cloudflare build settings:
- Production branch: `main`
- Build command: none
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

The repository root contains `wrangler.jsonc`, `src/worker.js`, and the `public/` folder. Static assets are served by Cloudflare; `/api/*` is handled by the Worker.

## Automatic stickers and Giphy

Upload sticker images to `sticker/` on `main` (subfolders are supported). The Wrangler custom build automatically runs `node scripts/build-media.mjs`, copies the images into `public/sticker/`, and creates `public/media-catalog.js`. No manual list edits or changes to the Cloudflare deploy command are required. Both comment and reply pickers use this catalog. PNG, JPEG, GIF, WebP, AVIF, SVG, BMP, and ICO files are supported; other files and symlinks are ignored.

For a plain static preview, run `node scripts/build-media.mjs` before serving `public/`. Generated assets are ignored by Git. Keep production builds on `main` and ensure any Cloudflare build watch filters include `sticker/` and `scripts/`.

To enable Giphy search and trending GIFs, set `GIPHY_API_KEY` in the Cloudflare **build environment** and redeploy. This must be a Giphy browser API key: it is included in the public client catalog, not kept as a Worker secret. Until configured, or if Giphy fails, the GIF tab explicitly offers the existing local GIFs. Emoji and reaction definitions remain unchanged.

## Midtrans setup
The site uses Midtrans Snap redirect flow for Shop checkout and Gift Author. The Worker creates Snap transactions on the server so the Midtrans Server Key never appears in frontend code.

Required Cloudflare secret:
- `MIDTRANS_SERVER_KEY` = Midtrans Server Key

Default mode in `wrangler.jsonc`:
- `MIDTRANS_MODE` = `sandbox`

For production, change `MIDTRANS_MODE` to `production` and configure the production Server Key as the Cloudflare secret.

Recommended Midtrans Payment Notification URL:
`https://purbalink.web.id/api/midtrans/notification`

Health check:
`https://purbalink.web.id/api/health`

Payment status:
`GET /api/midtrans/status?order_id=...`

Important: Shop/order/auth data is still browser-persisted in V2.1. For secure multi-user fulfillment and admin reconciliation, move orders/users/products to a server-side database in the next production backend release.


## Jooble jobs integration
Loker uses the official Jooble REST API through the Cloudflare Worker so the API key is not exposed in browser code.

Required Cloudflare secret:
- \`JOOBLE_API_KEY\` = API key from the Indonesian Jooble API portal

Endpoint used by the frontend:
- \`POST /api/jobs/jooble\`

The integration targets the Indonesian Jooble endpoint. If the secret is absent or Jooble is unavailable, PURBALINK automatically falls back to locally managed jobs.


## Multi-provider AI Article Generator
The admin Article Generator calls `POST /api/ai/article` through the Cloudflare Worker. API keys must be stored as Cloudflare Secrets, never in frontend code or GitHub.

Supported secrets:
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `DEEPSEEK_API_KEY`
- `GROQ_API_KEY`
- `MISTRAL_API_KEY`
- `ANTHROPIC_API_KEY`
- `OPENROUTER_API_KEY`
- `TOGETHER_API_KEY`

Optional model variables:
- `OPENAI_MODEL`
- `GEMINI_MODEL`
- `DEEPSEEK_MODEL`
- `GROQ_MODEL`
- `MISTRAL_MODEL`
- `ANTHROPIC_MODEL`
- `OPENROUTER_MODEL`
- `TOGETHER_MODEL`

Default economy order is configured with `AI_PROVIDER_ORDER`. The Worker only tries the next provider when the current provider is unavailable, has no configured key, or returns an error. The admin UI also caches identical successful prompts locally for 24 hours.

Rewrite from URL fetches a public HTML page server-side, extracts readable text, and asks the selected model to create an independently structured article with source attribution. Editorial review remains required for factual accuracy, quotations, licensing, and publication rights.
