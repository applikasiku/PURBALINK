# PURBALINK V2.5.0

- Rebuilt Admin Dashboard into functional Admin V5.
- Added persistent CRUD for frontend articles, jobs, products, videos, orders, applicants and user status using the same PURBALINK local database used by the frontend.
- Article management now supports create, edit, publish/unpublish, delete, image URL, author, breaking status, summary and body.
- Loker management now supports create/edit/delete, open/close, salary, type, requirements, description and company profile.
- Shop management now supports product create/edit/delete, stock, pricing, discount, seller, location, image and description; order status can be advanced and inspected.
- Video management supports create/edit/delete and moderation.
- Comment/report moderation, seller verification, withdrawals, user suspend/activate and gift/saldo views are operational.
- Added Sticker & GIF admin page with reaction library, activation/deactivation, custom sticker path/URL and Giphy settings.
- Added API & Integration diagnostics for Worker, Jooble, Midtrans and AI Article API.
- Website settings and feature toggles now persist to the same PURBALINK frontend database.
- Added responsive Admin V5 modal, toast, mobile grids and quick actions.
- AI-generated articles now save into the real PURBALINK article database as Drafts.
- Bumped PWA cache and added Admin V5 assets.

# PURBALINK V2.4.0

- Added matching action icon bars below the author and below the article body: Add on Google, reaction, gift, share, comment, and bookmark.
- Added article tags and hashtags above the lower action bar.
- Removed separate thumbs-up / thumbs-down comment buttons; reactions remain available through the reaction picker.
- Added WhatsApp-style emoji grid, Sticker tab, and GIF tab for both main comments and replies.
- Reply composer now supports emoji, sticker, GIF, text, and sends directly into the thread.
- Added 2-column recommendation sections under comments for Berita, Loker, and Shop.
- Kept existing reaction GIF assets, gifts, sharing, bookmarks, Jooble jobs, Shop, and Midtrans flows.
- Bumped PWA cache for immediate layout refresh.

# PURBALINK V2.3.0

- Redesigned the homepage with a clean mobile editorial layout inspired by leading Indonesian news portals while retaining PURBALINK branding.
- Added large feature story, compact two-column headlines, Terpopuler card, video rail, Berita Pilihan, News, Foto Pilihan, ShowBiz, and a light information footer.
- Added a compact white masthead with profile/menu actions and horizontally scrollable Berita Utama / Terkini / Populer / Rekomendasi navigation.
- Reworked mobile article comments to resemble familiar Facebook interaction patterns: reaction/share summary, compact avatars, threaded replies, reaction count, like/dislike controls, hidden-reply notice, and sticky mobile composer.
- Existing reaction GIFs, stickers, gift, bookmark, share, Loker, Shop, Video, Profile, Jooble, and Midtrans logic remain available.
- Bumped the PWA cache to force the new layout to replace older cached assets.

# PURBALINK V2.2.0

- Unified public masthead across Loker, Shop, Video, Profile, Login, and Register.
- Rebuilt Loker with a JobStreet-inspired search/list/detail layout.
- Added secure Cloudflare Worker proxy for Jooble.
- Rebuilt Shop with a Tokopedia-inspired marketplace structure.
