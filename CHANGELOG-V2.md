# PURBALINK V2.1.0

- Replaced DOKU payment flow with Midtrans.
- Added Cloudflare Worker backend for Midtrans Snap transaction creation.
- Added secure `MIDTRANS_SERVER_KEY` usage; Server Key is never exposed to browser code.
- Added Sandbox/Production switch through `MIDTRANS_MODE`.
- Shop checkout now creates a Midtrans transaction and redirects to Midtrans Snap.
- Gift Author now creates a Midtrans transaction and redirects to Midtrans Snap.
- Added Midtrans GET Status verification endpoint.
- Added notification endpoint with SHA-512 `signature_key` verification.
- Added `/api/health` payment configuration check.
- Updated service-worker cache version.

Production note: payment creation/status verification is server-side, but application user/order data still uses browser persistence in V2.1. A server database is recommended before using Shop for production fulfillment.
