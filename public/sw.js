const CACHE = "purbalink-v2-10-auto-trending-20260919";
const ASSETS = [
  "./","./index.html","./purbalink-home.html","./loker.html","./shop.html","./video.html","./profile.html","./login.html","./register.html","./admin-dashboard.html",
  "./tentang.html","./redaksi.html","./pedoman-media-siber.html","./privacy.html","./terms.html","./kontak.html",
  "./v2.js","./v2.css","./info.css","./manifest.json","./icon-192.png","./icon-512.png","./brand-icon-transparent.png","./logo-purbalink.png",
  "./SUKA.gif","./LOVE.gif","./HAHAHA.gif","./HERAN.gif","./SEDIH.gif","./MARAH.gif","./GABUNG.gif"
];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  if(new URL(e.request.url).pathname.endsWith('/media-catalog.js')){
    e.respondWith(fetch(e.request,{cache:'no-cache'}).then(res=>{
      if(!res.ok)throw new Error('Media catalog unavailable');
      const copy=res.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));return res;
    }).catch(()=>caches.match(e.request).then(res=>res||Response.error())));return;
  }
  const isNav=e.request.mode==="navigate";
  if(isNav){e.respondWith(fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));return;}
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{if(res.ok&&new URL(e.request.url).origin===self.location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res})));
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{for(const c of list){if("focus" in c)return c.focus()}if(clients.openWindow)return clients.openWindow("./index.html")}))});
