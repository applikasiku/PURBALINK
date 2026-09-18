# PURBALINK V2.2.0

- Unified public masthead across Loker, Shop, Video, Profile, Login, and Register to match the original PURBALINK home header.
- Refined mobile home proportions: smaller hero typography, balanced spacing, responsive two-column cards, and reduced overflow.
- Rebuilt Loker with a JobStreet-inspired search/list/detail layout while retaining PURBALINK branding.
- Added Cloudflare Worker proxy for the official Jooble REST API using `JOOBLE_API_KEY` secret.
- Jooble results are cached in the browser session for 30 minutes to reduce API usage; local PURBALINK jobs remain as fallback.
- Rebuilt Shop with a Tokopedia-inspired marketplace structure: search-first header, promo hero, shortcuts, category chips, flash sale rail, compact two-column mobile product cards, richer product detail, seller block, cart and checkout.
- Midtrans checkout remains active.
- Standardized bottom navigation and responsive spacing across public pages.
