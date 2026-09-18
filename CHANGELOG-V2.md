# PURBALINK V2.8.0

- Split the public portal and admin dashboard by hostname.
- Public portal remains at https://purbalink.web.id.
- Admin dashboard is served at https://admin.purbalink.web.id/.
- Removed the Dashboard Admin link from the public profile UI.
- Public requests to /admin-dashboard.html and /admin/* now return 404.
- Added Cloudflare Access header enforcement on the admin hostname.
- Only the configured ADMIN_EMAIL value is accepted; current value is amelianewsid@gmail.com.
- Admin HTML and assets are marked noindex/nofollow/noarchive and use no-store where appropriate.
- Admin root / now serves admin-dashboard.html internally.
- Public and admin custom domains are declared in Wrangler.
- Worker now runs first for all routes so host-level separation can be enforced before static assets.
- Ads remain disabled on the admin dashboard.
- Bumped PWA cache to V2.8.

# PURBALINK V2.7.0

- Replaced text-heavy admin quick actions with a precise 5-column icon grid for Artikel, Lowongan, Produk, Pesanan, Video, Komentar, Sticker, Iklan, Pengaturan, and Integrasi.
- Admin icon grid remains five compact columns on desktop and becomes horizontally scrollable/compact on narrow screens.
- Disabled all public ad rendering, including anchor ads, inside admin-dashboard.html.
- Added Sticker bulk upload for up to 50 image files per batch.
- Bulk sticker upload creates a named package and automatically generates sticker labels from filenames.
- Added automatic sticker categories from filename keywords: Lucu, Cinta, Marah, Sedih, Kerja, Anak, Spiritual, Komentar, and Umum.
- Admin can choose one custom category for the entire batch and can edit sticker name, package, and category after upload.
- Local bulk sticker binary files are stored in IndexedDB instead of localStorage to reduce memory/storage pressure; metadata remains in the sticker library.
- Sticker library is grouped by package with category counts and responsive card grids.
- Bumped PWA cache to V2.7.

# PURBALINK V2.7.0

- Replaced oversized dashboard quick-action buttons with a compact 5-column icon launcher.
- Added 10 admin shortcuts: Article, Jobs, Product, Orders, Video, Comments, Sticker, Ads, Users, Settings.
- Disabled all frontend ad rendering on admin-dashboard.html, including anchor/sticky ads.
- Added bulk sticker upload with a maximum of 50 files per batch.
- Bulk uploader auto-generates package and category names from filenames; both remain editable.
- Added package cards with sticker counts, active counts, rename/category customization, and package delete.
- Sticker images are compressed in-browser before persistence to reduce storage and improve dashboard performance.
- Admin sticker library is synchronized to the article comment sticker picker.
- Refined mobile sticker manager and preserved Giphy for GIF content.
- Bumped PWA cache to V2.7.

# PURBALINK V2.6.0

- Added a new Monetization → Iklan & AdSense admin page.
- Supports direct/mandiri ads and Google AdSense per slot.
- Added configurable placements: top header, header banner, native home, article top, article middle, article bottom, desktop sidebar, footer banner, anchor/sticky, and reward ad.
- Every slot can be enabled/disabled, assigned a provider, labeled, sized for desktop/mobile, and configured with direct image/link or AdSense slot ID.
- Added global AdSense Client ID and mixed-provider mode.
- Added lazy loading with IntersectionObserver, async AdSense script loading, lazy image decoding, sponsored links, closeable anchor ads, and CLS-safe ad containers.
- Added reward-ad hook for video/bonus/premium flows without forcing reward ads on normal news reading.
- Refined admin layout precision, responsive tables, KPI grids, mobile quick actions, sticky table headers, containment/content-visibility, and lighter shadows for faster rendering.
- Bumped PWA cache to V2.6.

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
