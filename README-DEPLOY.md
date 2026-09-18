# PURBALINK V2.2 — Responsive UI + Jooble Jobs + Midtrans

Target domain: https://purbalink.web.id

## Deploy via GitHub + Cloudflare Workers
Cloudflare build settings:
- Production branch: `main`
- Build command: none
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

The repository root contains `wrangler.jsonc`, `src/worker.js`, and the `public/` folder. Static assets are served by Cloudflare; `/api/*` is handled by the Worker.

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
