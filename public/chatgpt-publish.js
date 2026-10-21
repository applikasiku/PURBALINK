/* PURBALINK: articles published through ChatGPT -> GitHub */
(()=>{'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function init(){
 const home=document.getElementById('homeView');if(!home)return;
 const section=document.createElement('section');section.id='chatgptPublishedNews';
 section.style.cssText='max-width:1120px;margin:22px auto;padding:16px 18px;background:#fff;border-radius:16px;box-shadow:0 4px 18px #093a8a12';
 section.innerHTML='<h2 style="margin:0 0 14px;color:#093a8a;font-size:22px">Berita Terbaru PURBALINK</h2><div id="chatgptPublishedList">Memuat berita…</div>';
 const header=home.querySelector('header');if(header)header.insertAdjacentElement('afterend',section);else home.prepend(section);
 try{
 const res=await fetch('/data/chatgpt-articles.json',{cache:'no-cache'});if(!res.ok)throw Error('Feed unavailable');
 const data=await res.json();const entries=Array.isArray(data.articles)?data.articles:[];
 const safePath=v=>typeof v==='string'&&/^\/artikel\/[a-z0-9-]+\.html$/.test(v)?v:'#';
 const safeImage=v=>typeof v==='string'&&/^\/[a-zA-Z0-9/_-]+\.(?:webp|jpg|jpeg|png)$/.test(v)?v:'';
 document.getElementById('chatgptPublishedList').innerHTML=entries.length?'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px">'+entries.slice(0,12).map(a=>'<a href="'+safePath(a.url)+'" style="display:block;text-decoration:none;color:#17233a;border:1px solid #e4eaf4;border-radius:12px;overflow:hidden">'+(safeImage(a.image)?'<img loading="lazy" src="'+safeImage(a.image)+'" alt="" style="width:100%;aspect-ratio:16/9;object-fit:cover">':'')+'<div style="padding:12px"><small style="color:#b80f24">'+esc(a.category||'Berita')+' · '+esc(a.date||'')+'</small><h3 style="font-size:17px;line-height:1.35;margin:8px 0">'+esc(a.title)+'</h3><p style="font-size:13px;color:#667085">'+esc(a.description||'')+'</p></div></a>').join('')+'</div>':'Belum ada artikel.';
 }catch(e){document.getElementById('chatgptPublishedList').textContent='Berita belum dapat dimuat.';}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();