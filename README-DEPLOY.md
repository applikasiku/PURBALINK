# PURBALINK V2.1 — Midtrans Payment Gateway

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
