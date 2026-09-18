# PURBALINK V2 — Active Features

Target domain: https://purbalink.web.id

## Deploy via GitHub + Cloudflare Workers Static Assets
Cloudflare build settings:
- Production branch: `main`
- Build command: none
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

The repository root must contain `wrangler.jsonc` and the `public/` folder.

## V2 feature mode
This package activates the UI flows using browser persistence (localStorage): registration/login fallback, search/category filtering, comments/reactions/bookmarks, loker applications, shop cart/checkout/order history, video interactions, profile editing, admin CRUD, feature flags, notifications test, and JSON backup/restore.

For public multi-user production, connect a secure backend/database before relying on admin/auth/payment data. Google Login requires a valid Google Client ID + server-side token verification. DOKU requires server-side payment endpoints and webhook verification. Web Push across devices requires subscription storage + a push backend.
