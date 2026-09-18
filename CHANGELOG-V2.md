# PURBALINK V2.0.0

- Brand/domain prepared for purbalink.web.id.
- News search and category filters activated.
- Dynamic article detail, breaking news data, bookmarks, comments/replies/reactions persistence.
- Local account register/login fallback with SHA-256 password hashes; profile editing and password change.
- Loker search/filter, saved jobs, application form and application history.
- Shop search, persistent cart, checkout form, order history.
- Video follow/like/save/comment/share persistence.
- Admin CRUD for articles, jobs, products and video; application/order status management.
- Feature flags and website/integration settings persistence.
- Browser notification test and backup/restore JSON.
- Added About, Editorial, Cyber Media Guidelines, Privacy, Terms, Contact, robots.txt and sitemap.xml.
- PWA service worker upgraded to network-first navigation to reduce stale deployments.

Production note: browser persistence is suitable for preview/single-device operation. Multi-user public production requires a secure backend/database. Google Sign-In, DOKU, cross-device push notifications and secure admin access need server-side integration.
