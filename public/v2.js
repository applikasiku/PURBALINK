(()=>{
  'use strict';
  const VERSION='2.6.0';
  const DB_KEY='purbalink_v2_db';
  const DOMAIN='https://purbalink.web.id';
  let page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(page==='loker')page='loker.html';if(page==='shop')page='shop.html';if(page==='video')page='video.html';if(page==='profile')page='profile.html';
  const ADMIN_HOST='admin.purbalink.web.id';
  if(location.hostname.toLowerCase()===ADMIN_HOST && (page==='index.html'||page==='')) page='admin-dashboard.html';

  const seed={
    version:2,
    settings:{siteName:'PURBALINK',tagline:'Purbalingga, Lebih Dekat, Lebih Cepat',domain:DOMAIN,email:'redaksi@purbalink.web.id',whatsapp:'',apiBase:'',googleClientId:'',feeGift:10,feeShop:5,gateway:'Midtrans',gatewayMode:'Sandbox',shopHero:{title:'Promo Produk UMKM',subtitle:'Belanja produk lokal pilihan dengan promo spesial minggu ini.',badge:'Belanja Lokal · Lebih Hemat',background:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=78',productIds:[1,2]}},
    features:{loker:true,shop:true,video:true,gift:true,comment:true,google_login:true,registration:true,push:true},
    trending:{mode:'auto',limit:5,minViews:0,manualIds:[],showViews:false},
    articles:[
      {id:1,views:18420,cat:'NASIONAL',title:'Pemerintah Percepat Pemulihan Pascaerupsi Gunung Lewotobi',summary:'Pemerintah menyiapkan bantuan darurat dan relokasi sementara bagi warga terdampak erupsi Gunung Lewotobi di NTT.',date:'12 Okt 2024 · 14:20 WIB',img:'https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=1000&q=80',author:'Tim PURBALINK',status:'Terbit',breaking:false,body:'Pemerintah menyiapkan bantuan darurat dan relokasi sementara bagi warga terdampak erupsi Gunung Lewotobi di Nusa Tenggara Timur (NTT).\n\nBadan Nasional Penanggulangan Bencana menyatakan proses evakuasi warga di zona berbahaya telah berjalan dan layanan dasar terus dipastikan tersedia.\n\nPemerintah daerah bersama kementerian terkait juga menyusun rencana relokasi jangka panjang bagi warga di zona rawan bencana.'},
      {id:2,views:16380,cat:'POLITIK',title:'Prabowo Tegaskan Komitmen Lanjutkan Program Pembangunan untuk Rakyat',summary:'Pemerintah menegaskan keberlanjutan program pembangunan dan layanan publik.',date:'12 Okt 2024 · 11:05 WIB',img:'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=700&q=80',author:'Redaksi PURBALINK',status:'Terbit',breaking:false,body:'Pemerintah menyampaikan komitmen untuk menjaga kesinambungan program pembangunan dan meningkatkan kualitas layanan publik.'},
      {id:3,views:14120,cat:'BISNIS',title:'Startup Indonesia Catat Pendanaan Rp2,3 Triliun di Kuartal III-2024',summary:'Ekosistem startup kembali mencatat aktivitas pendanaan pada kuartal ketiga.',date:'12 Okt 2024 · 10:42 WIB',img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80',author:'Redaksi PURBALINK',status:'Terbit',breaking:false,body:'Ekosistem startup Indonesia mencatat sejumlah putaran pendanaan pada kuartal ketiga dengan fokus pada efisiensi dan pertumbuhan berkelanjutan.'},
      {id:4,views:9870,cat:'DUNIA',title:'PBB Serukan Gencatan Senjata di Timur Tengah',summary:'Seruan internasional untuk perlindungan warga sipil kembali disampaikan.',date:'12 Okt 2024 · 09:30 WIB',img:'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=700&q=80',author:'Redaksi PURBALINK',status:'Terbit',breaking:false,body:'Perserikatan Bangsa-Bangsa kembali menyerukan perlindungan warga sipil dan akses bantuan kemanusiaan.'},
      {id:5,views:12760,cat:'EKONOMI',title:'Rupiah Menguat, Pasar Menanti Data Ekonomi Terbaru',summary:'Pergerakan rupiah dipengaruhi sentimen global dan data domestik.',date:'12 Okt 2024 · 13:45 WIB',img:'https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=700&q=80',author:'Redaksi PURBALINK',status:'Terbit',breaking:false,body:'Pelaku pasar mencermati perkembangan ekonomi domestik dan global yang memengaruhi pergerakan nilai tukar.'},
      {id:6,views:11340,cat:'TEKNOLOGI',title:'Indonesia Perkuat Akses Internet melalui Infrastruktur Satelit',summary:'Infrastruktur konektivitas terus diperluas untuk wilayah yang belum terjangkau.',date:'12 Okt 2024 · 12:10 WIB',img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80',author:'Redaksi PURBALINK',status:'Terbit',breaking:false,body:'Pemerataan akses internet menjadi fokus pengembangan infrastruktur digital, termasuk pemanfaatan teknologi satelit.'},
      {id:7,views:10560,cat:'OLAHRAGA',title:'Timnas Indonesia Bersiap Menjalani Laga Berikutnya',summary:'Tim pelatih mematangkan persiapan dan evaluasi jelang pertandingan.',date:'12 Okt 2024 · 11:20 WIB',img:'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=700&q=80',author:'Redaksi PURBALINK',status:'Terbit',breaking:false,body:'Tim nasional menjalani rangkaian latihan dan evaluasi menjelang pertandingan berikutnya.'}
    ],
    jobs:[
      {id:1,title:'Staff Admin Gudang',company:'CV Sumber Makmur',loc:'Purbalingga Kota',type:'Full Time',salary:'Rp2,8 – 3,5 Jt',posted:'Baru',color:'#0B5ED7',status:'Aktif',desc:'Mengelola stok dan administrasi gudang, input data harian, dan koordinasi dengan tim logistik.',req:['Min. SMA/SMK sederajat','Terbiasa menggunakan Excel','Teliti dan disiplin','Domisili Purbalingga & sekitarnya'],about:'CV Sumber Makmur adalah distributor sembako yang telah beroperasi lebih dari 15 tahun di Purbalingga.'},
      {id:2,title:'Marketing Online (Live & Konten)',company:'Raihaana Kids Store',loc:'Kalimanah, Purbalingga',type:'Full Time',salary:'Rp3,0 – 4,2 Jt',posted:'2 hari lalu',color:'#E3062C',status:'Aktif',desc:'Mengelola konten media sosial, live selling, dan strategi promosi produk online.',req:['Aktif media sosial','Kreatif membuat konten','Pengalaman live selling nilai plus','Bisa kerja target'],about:'Toko online perlengkapan anak yang berkembang di Purbalingga.'},
      {id:3,title:'Operator Produksi',company:'PT Rambang Multi Industri',loc:'Bukateja, Purbalingga',type:'Full Time',salary:'Rp2,5 – 3,0 Jt',posted:'3 hari lalu',color:'#0B5ED7',status:'Aktif',desc:'Menjalankan mesin produksi sesuai SOP dan menjaga kualitas hasil produksi.',req:['Min. SMA/SMK sederajat','Sehat jasmani & rohani','Bersedia kerja shift','Pengalaman pabrik nilai plus'],about:'Perusahaan manufaktur di wilayah Purbalingga.'},
      {id:4,title:'Kasir & Pelayan Toko',company:'Mitra Swalayan',loc:'Purbalingga Kota',type:'Part Time',salary:'Rp1,8 – 2,2 Jt',posted:'5 hari lalu',color:'#e0900c',status:'Aktif',desc:'Melayani transaksi kasir dan menjaga kebersihan area toko.',req:['Min. SMP/SMA','Ramah dan jujur','Bisa kerja shift sore','Domisili dekat lokasi diutamakan'],about:'Jaringan minimarket lokal.'},
      {id:5,title:'Graphic Designer (Freelance)',company:'Purbalink Media Group',loc:'Remote / WFH',type:'WFH',salary:'Rp150rb/proyek',posted:'1 minggu lalu',color:'#1D6FE8',status:'Aktif',desc:'Membuat desain grafis untuk kebutuhan konten berita dan media sosial.',req:['Menguasai Canva/Photoshop','Portofolio desain','Bisa deadline cepat','Kreatif dan komunikatif'],about:'Media digital lokal.'},
      {id:6,title:'Magang Digital Marketing',company:'Koperasi Purbalingga Maju',loc:'Purbalingga Kota',type:'Magang',salary:'Rp800rb + Uang Makan',posted:'1 minggu lalu',color:'#E3062C',status:'Aktif',desc:'Membantu tim pemasaran digital menjalankan kampanye promosi produk koperasi.',req:['Mahasiswa aktif/fresh graduate','Familiar media sosial','Mau belajar hal baru','Magang min. 3 bulan'],about:'Koperasi serba usaha yang menaungi UMKM lokal.'}
    ],
    products:[
      {id:1,name:'Keripik Tempe Renyah 250gr',price:15000,old:20000,disc:25,sold:320,stock:120,loc:'Purbalingga Kota',img:'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80',shop:'UMKM Bu Siti',status:'Aktif',desc:'Keripik tempe khas Purbalingga, renyah dan cocok untuk camilan keluarga.'},
      {id:2,name:'Kaos Distro Purbalingga Pride',price:65000,old:85000,disc:24,sold:142,stock:48,loc:'Kalimanah',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',shop:'Purbalink Apparel',status:'Aktif',desc:'Kaos distro cotton combed dengan desain bertema kebanggaan lokal Purbalingga.'},
      {id:3,name:'Mainan Edukasi Kayu Anak',price:48000,old:60000,disc:20,sold:88,stock:24,loc:'Bobotsari',img:'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=500&q=80',shop:'Raihaana Kids Store',status:'Aktif',desc:'Mainan edukatif berbahan kayu ramah anak.'},
      {id:4,name:'Madu Hutan Asli 500ml',price:75000,old:95000,disc:21,sold:210,stock:35,loc:'Karangreja',img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80',shop:'Tani Makmur',status:'Aktif',desc:'Madu hutan hasil panen petani lokal lereng Gunung Slamet.'},
      {id:5,name:'Anyaman Bambu Tas Belanja',price:35000,old:0,disc:0,sold:56,stock:31,loc:'Kutasari',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',shop:'Kerajinan Rahayu',status:'Aktif',desc:'Tas belanja ramah lingkungan dari anyaman bambu.'},
      {id:6,name:'Serum Wajah Lokal 20ml',price:55000,old:0,disc:0,sold:175,stock:42,loc:'Purbalingga Kota',img:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',shop:'Glow Beauty PBG',status:'Aktif',desc:'Serum wajah lokal untuk perawatan harian.'}
    ],
    videos:[
      {id:1,user:'kulinerpurbalingga',caption:'Sensasi keripik tempe krispi khas Purbalingga 🔥 wajib coba!',music:'Audio Asli · kulinerpurbalingga',img:'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=700&q=80',likes:2840,status:'Tayang',comments:[{name:'Rina S.',text:'Enak banget ini beneran, aku langsung order 😍',likes:24},{name:'Dedi P.',text:'Lokasinya dimana kak?',likes:8}]},
      {id:2,user:'purbalink.jobs',caption:'3 tips lolos interview kerja pertama kali! Simak sampai habis 👀',music:'Suara Trending · Podcast Karir',img:'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&q=80',likes:5310,status:'Tayang',comments:[{name:'Fajar A.',text:'Makasih infonya kak, sangat membantu!',likes:41}]},
      {id:3,user:'wisata.purbalingga',caption:'Golden sunrise di Purbalingga pagi ini ☀️',music:'Audio Asli · wisata.purbalingga',img:'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=700&q=80',likes:9120,status:'Tayang',comments:[{name:'Bagus T.',text:'Indah banget pemandangannya',likes:56}]},
      {id:4,user:'raihaanakids.store',caption:'Unboxing mainan edukasi kayu terbaru buat si kecil 🧸',music:'Audio Asli · raihaanakids.store',img:'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=80',likes:1870,status:'Tayang',comments:[]},
      {id:5,user:'purbalink.news',caption:'Update pembangunan di Purbalingga, sudah sejauh mana?',music:'Audio Asli · purbalink.news',img:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80',likes:3420,status:'Tayang',comments:[]}
    ],
    users:[],applications:[],orders:[],gifts:[],notifications:[],moderation:[]
  };

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function loadDb(){
    try{
      const d=JSON.parse(localStorage.getItem(DB_KEY)||'null');
      if(d && typeof d==='object'){
        const merged=Object.assign(clone(seed),d);
        merged.settings=Object.assign({},seed.settings,d.settings||{});
        merged.features=Object.assign({},seed.features,d.features||{});
        merged.trending=Object.assign({},seed.trending,d.trending||{});
        ['articles','jobs','products','videos','users','applications','orders','gifts','notifications','moderation'].forEach(k=>{ if(!Array.isArray(merged[k])) merged[k]=clone(seed[k]); });
        merged.articles.forEach((article,index)=>{const seedArticle=seed.articles.find(x=>String(x.id)===String(article.id))||seed.articles[index];if(!Number.isFinite(Number(article.views)))article.views=Number(seedArticle?.views||0);});
        return merged;
      }
    }catch(_){ }
    return clone(seed);
  }
  let db=loadDb();
  if(!db.settings.gateway || db.settings.gateway==='DOKU') db.settings.gateway='Midtrans';
  function saveDb(){db.version=2;localStorage.setItem(DB_KEY,JSON.stringify(db));}
  saveDb();
  function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function nl2p(s=''){return String(s).split(/\n{2,}/).map(p=>`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');}
  function fmt(n){return Number(n)>=1000?(Number(n)/1000).toFixed(1).replace('.0','')+'K':String(n||0);}
  function rupiah(n){return 'Rp'+Number(n||0).toLocaleString('id-ID');}
  function uid(prefix='id'){return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;}
  function currentUser(){try{return JSON.parse(localStorage.getItem('purbalink_user')||'null')}catch(_){return null}}
  function token(){return localStorage.getItem('purbalink_token')||'';}
  function userKey(){return (currentUser()?.email||'guest').toLowerCase();}
  function getLocal(key,fallback){try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch(_){return fallback}}
  function setLocal(key,v){localStorage.setItem(key,JSON.stringify(v));}
  function initials(name='Pengguna'){return name.split(/\s+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('').toUpperCase()||'P';}
  function toast(msg){
    let t=document.querySelector('.pv2-toast'); if(!t){t=document.createElement('div');t.className='pv2-toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2200);
  }
  function modal(title,html,onOpen){
    closeModal();
    const d=document.createElement('div');d.className='pv2-modal-backdrop';d.id='pv2Modal';
    d.innerHTML=`<div class="pv2-modal" role="dialog" aria-modal="true"><div class="pv2-modal-head"><h3>${esc(title)}</h3><button class="pv2-close" type="button" aria-label="Tutup">×</button></div><div class="pv2-modal-body">${html}</div></div>`;
    d.addEventListener('click',e=>{if(e.target===d||e.target.closest('.pv2-close'))closeModal()});document.body.appendChild(d);if(onOpen)onOpen(d);return d;
  }
  function closeModal(){document.getElementById('pv2Modal')?.remove();}
  async function sha256(s){const data=new TextEncoder().encode(s);const h=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('');}
  function setSession(user){const clean={id:user.id,name:user.name,email:user.email,role:user.role||'reader',wallet_balance:user.wallet_balance||0};localStorage.setItem('purbalink_token','local_'+crypto.getRandomValues(new Uint32Array(2)).join(''));localStorage.setItem('purbalink_user',JSON.stringify(clean));}
  function requireLogin(next=location.href){if(currentUser()&&token())return true;sessionStorage.setItem('purbalink_after_login',next);location.href='login.html';return false;}
  function nextAfterLogin(){const n=sessionStorage.getItem('purbalink_after_login');sessionStorage.removeItem('purbalink_after_login');return n||'index.html';}
  function download(name,content,type='application/json'){const b=new Blob([content],{type});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);}

  function paymentApiBase(){return (db.settings.apiBase||'').trim().replace(/\/$/,'')||location.origin;}
  async function createMidtransPayment(payload){
    const res=await fetch(paymentApiBase()+'/api/midtrans/transaction',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||'Gagal membuat transaksi Midtrans');
    if(!data.redirect_url)throw new Error('URL pembayaran Midtrans tidak tersedia');
    return data;
  }
  async function midtransStatus(orderId){
    const res=await fetch(paymentApiBase()+'/api/midtrans/status?order_id='+encodeURIComponent(orderId),{headers:{'Accept':'application/json'}});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||data.status_message||'Gagal memeriksa status Midtrans');
    return data;
  }
  function mappedPaymentStatus(status){
    status=String(status||'').toLowerCase();
    if(['settlement','capture'].includes(status))return 'Dibayar';
    if(['deny','cancel','expire','failure'].includes(status))return 'Gagal';
    if(['refund','partial_refund'].includes(status))return 'Refund';
    return 'Menunggu Pembayaran';
  }

  window.PV2={VERSION,db:()=>db,saveDb,toast,modal,closeModal,requireLogin,esc,rupiah,fmt,download,createMidtransPayment,midtransStatus};

  let installPrompt=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;window.dispatchEvent(new Event('purbalink-install-ready'))});
  window.PV2.installApp=async()=>{if(!installPrompt){toast('Gunakan menu browser “Install app/Tambahkan ke layar utama” jika tombol instal belum tersedia.');return}installPrompt.prompt();await installPrompt.userChoice;installPrompt=null};

  function bottomNavMarkup(){
    const active=(name)=>page===name?' active':'';
    return `
      <a href="index.html" class="bn-item${active('index.html')}"><svg class="bn-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"/></svg><span class="bn-label">Beranda</span></a>
      <a href="loker.html" class="bn-item${active('loker.html')}"><svg class="bn-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/></svg><span class="bn-label">Loker</span></a>
      <a href="shop.html" class="bn-item${active('shop.html')}"><svg class="bn-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg><span class="bn-label">Shop</span></a>
      <a href="video.html" class="bn-item${active('video.html')}"><svg class="bn-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="18" rx="3"/><path d="M17 8l4-2v12l-4-2z"/></svg><span class="bn-label">Video</span></a>
      <a href="profile.html" class="bn-item${active('profile.html')}"><svg class="bn-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg><span class="bn-label">Profil</span></a>`;
  }
  function sharedDrawerMarkup(){
    const cats=[
      ['Nasional','https://img.icons8.com/fluency/48/government.png'],['Internasional','https://img.icons8.com/fluency/48/globe.png'],['Daerah','https://img.icons8.com/fluency/48/marker.png'],['Politik','https://img.icons8.com/fluency/48/conference-call.png'],['Ekonomi','https://img.icons8.com/fluency/48/combo-chart.png'],['Finance','https://img.icons8.com/fluency/48/coins.png'],['Hukum','https://img.icons8.com/fluency/48/scales.png'],['Teknologi','https://img.icons8.com/fluency/48/processor.png'],['Olahraga','https://img.icons8.com/fluency/48/football2.png'],['Hiburan','https://img.icons8.com/fluency/48/musical-notes.png'],['Gaya Hidup','https://img.icons8.com/fluency/48/natural-food.png'],['Pendidikan','https://img.icons8.com/fluency/48/graduation-cap.png'],['Kesehatan','https://img.icons8.com/fluency/48/heart-with-pulse.png'],['Lingkungan','https://img.icons8.com/fluency/48/deciduous-tree.png']
    ];
    const row=(href,icon,title,sub='')=>`<a class="pl-drawer-row" href="${href}"><img src="${icon}" alt=""><span><b>${title}</b>${sub?`<small>${sub}</small>`:''}</span><i>›</i></a>`;
    return `<div class="pl-drawer-backdrop" data-pl-close></div><aside class="pl-drawer" id="plSharedDrawer" aria-label="Menu PURBALINK">
      <div class="pl-drawer-head"><a href="index.html"><img src="logo-purbalink.png" alt=""><b><span>PURBA</span><em>LINK</em></b></a><button type="button" data-pl-close>×</button></div>
      <section><h3>Menu Utama</h3>
        ${row('index.html','https://img.icons8.com/fluency/48/home.png','Beranda','Halaman utama')}
        ${row('index.html#terkini','https://img.icons8.com/fluency/48/news.png','Berita','Berita terbaru')}
        ${row('loker.html','https://img.icons8.com/fluency/48/briefcase.png','Loker','Lowongan kerja')}
        ${row('shop.html','https://img.icons8.com/fluency/48/shopping-bag.png','Shop','Belanja online')}
        ${row('video.html','https://img.icons8.com/fluency/48/video.png','Video','Video populer')}
        ${row('redaksi.html','https://img.icons8.com/fluency/48/conference-call.png','Redaksi','Tentang redaksi')}
        ${row('tentang.html','https://img.icons8.com/fluency/48/organization.png','Organisasi','Daftar organisasi PURBALINK')}
      </section>
      <section><h3>Kategori Berita</h3><div class="pl-cat-list">${cats.map(x=>row('index.html?kategori='+encodeURIComponent(x[0].toLowerCase()),x[1],x[0])).join('')}</div></section>
      <section><h3>Media Sosial</h3>
        ${row('#','https://img.icons8.com/fluency/48/facebook-new.png','Facebook','PURBALINK')}
        ${row('#','https://img.icons8.com/fluency/48/instagram-new.png','Instagram','PURBALINK')}
        ${row('#','https://img.icons8.com/fluency/48/youtube-play.png','YouTube','PURBALINK')}
        ${row('#','https://img.icons8.com/fluency/48/tiktok.png','TikTok','PURBALINK')}
        ${row('#','https://img.icons8.com/fluency/48/threads.png','Threads','PURBALINK')}
      </section>
      <section><h3>Layanan</h3>
        <button class="pl-drawer-row" type="button" onclick="window.installPurbalinkPWA?installPurbalinkPWA():alert('Gunakan menu browser untuk Install aplikasi')"><img src="https://img.icons8.com/fluency/48/download.png" alt=""><span><b>Install PWA</b><small>Pasang PURBALINK di perangkat</small></span><i>›</i></button>
        ${row('privacy.html','https://img.icons8.com/fluency/48/privacy.png','Privasi')}
        ${row('terms.html','https://img.icons8.com/fluency/48/document.png','Syarat & Ketentuan')}
        ${row('kontak.html','https://img.icons8.com/fluency/48/contacts.png','Kontak')}
      </section>
    </aside>`;
  }
  function bindSharedDrawer(){
    const drawer=document.getElementById('plSharedDrawer'),back=document.querySelector('.pl-drawer-backdrop');if(!drawer||!back)return;
    const close=()=>{drawer.classList.remove('show');back.classList.remove('show');document.body.classList.remove('pl-drawer-open')};
    document.querySelectorAll('[data-pl-menu]').forEach(b=>b.onclick=()=>{drawer.classList.add('show');back.classList.add('show');document.body.classList.add('pl-drawer-open')});
    document.querySelectorAll('[data-pl-close]').forEach(b=>b.onclick=close);
  }
  function sharedHeaderMarkup(){
    return `<header class="p6-header pl-unified-head"><div class="p6-head-row wrap"><a class="p6-brand" href="index.html"><img src="brand-icon-transparent.png" alt="PURBALINK"><span><b class="brand-purba">PURBA</b><b class="brand-link">LINK</b></span></a><div class="p6-head-actions pl-u-actions"><a class="p6-icon-btn" href="profile.html" aria-label="Profil"><img class="i8-icon" src="https://img.icons8.com/fluency-systems-regular/48/user.png" alt=""></a><button class="p6-icon-btn" type="button" data-pl-menu aria-label="Menu"><img class="i8-icon" src="https://img.icons8.com/fluency-systems-regular/48/circled-menu.png" alt=""></button></div></div></header>`;
  }
  function ensureSharedChrome(){
    document.body.dataset.pv2Page=page||'index.html';
    const nav=document.querySelector('nav.bottomnav'); if(nav)nav.innerHTML=bottomNavMarkup();
    const publicPages=['loker.html','shop.html','video.html','profile.html','login.html','register.html','kontak.html','redaksi.html','tentang.html','privacy.html','terms.html','pedoman-media-siber.html'];
    if(publicPages.includes(page)&&!document.querySelector('.pl-unified-head')){
      const holder=document.createElement('div');holder.innerHTML=sharedHeaderMarkup()+sharedDrawerMarkup();while(holder.firstChild)document.body.insertBefore(holder.lastChild,document.body.firstChild);
      bindSharedDrawer();
    }
    if(page==='index.html'&&!document.getElementById('plSharedDrawer')){
      document.body.insertAdjacentHTML('beforeend',sharedDrawerMarkup());bindSharedDrawer();
      const old=document.getElementById('p6MoreMenu');if(old)old.remove();
      const menuBtn=document.querySelector('.p6-head-actions button');if(menuBtn){menuBtn.removeAttribute('onclick');menuBtn.setAttribute('data-pl-menu','');bindSharedDrawer();}
    }
  }

  function applyGlobal(){
    document.querySelectorAll('a[href="purbalink-home.html"]').forEach(a=>a.setAttribute('href','index.html'));
    document.querySelectorAll('a[href="https://purbalink.id"],a[href="https://www.purbalink.id"]').forEach(a=>a.href=DOMAIN);
    const mods={loker:'loker.html',shop:'shop.html',video:'video.html'};Object.entries(mods).forEach(([k,href])=>{if(db.features[k]===false)document.querySelectorAll(`a[href="${href}"]`).forEach(a=>a.style.display='none')});
    document.documentElement.dataset.purbalinkVersion=VERSION;
  }

  function initHome(){
    if(typeof showDetail!=='function')return;
    const search=document.querySelector('.search input');
    const grid=document.getElementById('newsGrid');
    let q='',cat='SEMUA';
    function published(){return db.articles.filter(a=>a.status==='Terbit');}
    function filtered(){return published().filter(a=>(cat==='SEMUA'||a.cat.toUpperCase()===cat)&&(!q||`${a.title} ${a.summary} ${a.author}`.toLowerCase().includes(q)));}
    function renderCards(){
      const list=filtered();
      if(!grid)return;
      grid.innerHTML=list.length?list.map(a=>`<div class="card" data-article="${a.id}" onclick="PV2.openArticle(${a.id})"><div class="card-img" style="background-image:url('${esc(a.img)}')"></div><div class="card-body"><span class="cat">${esc(a.cat)}</span><h3>${esc(a.title)}</h3><div class="meta">${esc(a.date)}</div></div></div>`).join(''):`<div class="pv2-search-empty" style="grid-column:1/-1">Tidak ada berita yang cocok.</div>`;
    }
    window.PV2.openArticle=id=>{
      const a=db.articles.find(x=>String(x.id)===String(id));if(!a)return;a.views=Number(a.views||0)+1;saveDb();
      const pill=document.querySelector('#detailView .article-wrap > .pill'); if(pill)pill.textContent=a.cat;
      const title=document.querySelector('#detailView .art-title');if(title)title.textContent=a.title;
      const by=document.querySelector('#detailView .art-byline div:last-child');if(by)by.innerHTML=`<b style="color:var(--ink);">${esc(a.author||'Tim PURBALINK')}</b> · Reporter<br>${esc(a.date)} · 5 menit baca`;
      const av=document.querySelector('#detailView .art-byline .avatar');if(av)av.textContent=initials(a.author||'Tim PURBALINK');
      const img=document.querySelector('#detailView .art-figure img');if(img){img.src=a.img;img.alt=a.title;}
      const cap=document.querySelector('#detailView .art-figure figcaption');if(cap)cap.textContent=`Dokumentasi PURBALINK · ${a.date}`;
      const body=document.querySelector('#detailView .art-body');if(body)body.innerHTML=nl2p(a.body||a.summary||'');
      history.replaceState({articleId:a.id},'',`?article=${encodeURIComponent(a.id)}`);
      showDetail();
      setTimeout(renderAds,0);
    };
    if(search){search.addEventListener('input',()=>{q=search.value.trim().toLowerCase();renderCards()});search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();renderCards()}})}
    document.querySelectorAll('.tabs .tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tabs .tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');cat=(t.textContent.trim()==='Semua'?'SEMUA':t.textContent.trim().toUpperCase());renderCards()}));
    document.querySelectorAll('.navrow a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.navrow a').forEach(x=>x.classList.remove('active'));a.classList.add('active');cat=a.textContent.trim().toUpperCase();renderCards();document.querySelector('#newsGrid')?.scrollIntoView({behavior:'smooth',block:'start'})}));
    renderCards();

    function trendingItems(){
      const cfg=Object.assign({},seed.trending,db.trending||{});
      const pub=published().filter(a=>Number(a.views||0)>=Number(cfg.minViews||0));
      const byViews=(a,b)=>{
        const av=Number(a.views||0)+(a.breaking?5000:0),bv=Number(b.views||0)+(b.breaking?5000:0);
        return bv-av || Number(Boolean(b.breaking))-Number(Boolean(a.breaking));
      };
      const manual=(cfg.manualIds||[]).map(id=>pub.find(a=>String(a.id)===String(id))).filter(Boolean);
      let items=[];
      if(cfg.mode==='manual') items=manual;
      else if(cfg.mode==='mixed') items=[...manual,...pub.filter(a=>!manual.some(m=>String(m.id)===String(a.id))).sort(byViews)];
      else items=pub.slice().sort(byViews);
      return items.slice(0,Math.max(1,Math.min(10,Number(cfg.limit)||5)));
    }
    function renderTrendingStrip(){
      const bar=document.getElementById('p6TrendingBar'),list=document.getElementById('p6TrendingList');
      if(!bar||!list)return;
      const items=trendingItems();
      if(!items.length){bar.style.display='none';return}
      bar.style.display='';
      list.innerHTML=items.map((a,i)=>'<button type="button" class="p6-trending-chip'+(i===0?' active':'')+'" data-trend-id="'+a.id+'" title="'+esc(a.title)+'">'+esc((a.title||'').length>34?(a.title.slice(0,34)+'…'):a.title)+(db.trending?.showViews?'<small class="trend-views">'+Number(a.views||0).toLocaleString("id-ID")+' dibaca</small>':'')+(i===0?'<span class="trend-check">✓</span>':'')+'</button>').join('');
      list.querySelectorAll('[data-trend-id]').forEach(btn=>btn.addEventListener('click',()=>window.PV2.openArticle(btn.dataset.trendId)));
    }
    renderTrendingStrip();

    const breaking=db.articles.filter(a=>a.breaking&&a.status==='Terbit');
    const breakingEl=document.querySelector('.breaking .txt');let bi=0;
    if(breakingEl&&breaking.length){breakingEl.textContent=breaking[0].title;setInterval(()=>{bi=(bi+1)%breaking.length;breakingEl.textContent=breaking[bi].title},5000)}

    const storedComments=getLocal('pv2_article_comments',null);if(storedComments&&typeof comments!=='undefined'){comments.splice(0,comments.length,...storedComments);nextId=Math.max(0,...comments.map(c=>Number(c.id)||0))+1;renderComments()}
    const saveComments=()=>{if(typeof comments!=='undefined')setLocal('pv2_article_comments',comments)};
    ['postComment','postReply','pickCommentReaction'].forEach(fn=>{if(typeof window[fn]==='function'){const old=window[fn];window[fn]=function(...args){const r=old.apply(this,args);saveComments();return r}}});
    const reactKey=`pv2_article_reaction_${userKey()}`; if(typeof userReaction!=='undefined'){userReaction=localStorage.getItem(reactKey)||null}
    if(typeof window.pickMainReaction==='function'){const old=window.pickMainReaction;window.pickMainReaction=function(k){const r=old(k);if(userReaction)localStorage.setItem(reactKey,userReaction);else localStorage.removeItem(reactKey);return r}}
    const ratingKey=`pv2_article_rating_${userKey()}`;const savedRating=Number(localStorage.getItem(ratingKey)||0);if(savedRating&&typeof userRating!=='undefined'){userRating=savedRating;renderStars()}
    if(typeof window.setRating==='function'){const oldSetRating=window.setRating;window.setRating=function(v){const r=oldSetRating(v);localStorage.setItem(ratingKey,String(v));toast('Rating tersimpan');return r}}
    const bmKey=`pv2_article_bookmarks_${userKey()}`;let bms=getLocal(bmKey,[]);if(typeof bookmarked!=='undefined'){bookmarked=bms.includes(1);if(document.getElementById('bookmarkLabel'))document.getElementById('bookmarkLabel').textContent=bookmarked?'Tersimpan':'Simpan'}
    if(typeof window.toggleBookmark==='function'){window.toggleBookmark=function(){bookmarked=!bookmarked;bms=getLocal(bmKey,[]);bms=bookmarked?[...new Set([...bms,1])]:bms.filter(x=>x!==1);setLocal(bmKey,bms);const btn=document.getElementById('bookmarkBtn');document.getElementById('bookmarkLabel').textContent=bookmarked?'Tersimpan':'Simpan';btn?.classList.toggle('on',bookmarked);toast(bookmarked?'Artikel disimpan':'Artikel dihapus dari simpanan')}}
    if(typeof window.shareArticle==='function'){window.shareArticle=function(){const aId=new URLSearchParams(location.search).get('article')||1;const a=db.articles.find(x=>String(x.id)===String(aId))||db.articles[0];const url=`${DOMAIN}/?article=${encodeURIComponent(a.id)}`;if(navigator.share)navigator.share({title:`${a.title} — PURBALINK`,url}).catch(()=>{});else navigator.clipboard?.writeText(url).then(()=>toast('Tautan artikel disalin'))}}
    if(typeof window.sendGift==='function'){window.sendGift=async function(){if(!db.features.gift){toast('Fitur gift sedang dinonaktifkan.');return}if(!requireLogin())return;const feedback=document.getElementById('giftFeedback');const api=db.settings.apiBase.trim();if(!api){const u=currentUser();db.gifts.unshift({id:uid('gift'),articleId:1,userEmail:u?.email||'',author:'Dini Pratama',amount:giftAmount,status:'Demo',date:new Date().toLocaleDateString('id-ID')});saveDb();feedback.textContent=`✓ Gift demo ${rupiah(giftAmount)} tercatat. Tidak ada pembayaran nyata sampai gateway produksi dihubungkan.`;toast('Gift demo tercatat');return}feedback.textContent='Menghubungkan ke payment gateway...';try{const res=await fetch(`${api.replace(/\/$/,'')}/api/articles/1/gift`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token()}`},body:JSON.stringify({amount:giftAmount})});const data=await res.json();if(!res.ok)throw new Error(data.error||'Gagal membuat pembayaran');if(data.payment_url)location.href=data.payment_url;else throw new Error('URL pembayaran tidak tersedia')}catch(e){feedback.textContent='❌ '+e.message}}}
    window.sendGift=async function(){if(!db.features.gift){toast('Fitur gift sedang dinonaktifkan.');return}if(!requireLogin())return;const feedback=document.getElementById('giftFeedback');const u=currentUser();const orderId='GIFT-'+Date.now()+'-'+Math.random().toString(36).slice(2,7);feedback.textContent='Menghubungkan ke Midtrans...';try{db.gifts.unshift({id:orderId,articleId:1,userEmail:u?.email||'',author:'Dini Pratama',amount:giftAmount,status:'Menunggu Pembayaran',date:new Date().toLocaleDateString('id-ID')});saveDb();const data=await createMidtransPayment({order_id:orderId,type:'gift',amount:giftAmount,customer:{name:u?.name||'',email:u?.email||''},items:[{id:'gift-author',name:'Gift Author PURBALINK',price:giftAmount,quantity:1}]});feedback.textContent='Membuka halaman pembayaran Midtrans...';location.href=data.redirect_url}catch(e){const g=db.gifts.find(x=>x.id===orderId);if(g)g.status='Gagal';saveDb();feedback.textContent='❌ '+e.message}};
    const giftReturn=new URLSearchParams(location.search);if(giftReturn.get('payment')==='midtrans'&&giftReturn.get('type')==='gift'){const oid=giftReturn.get('order_id');showDetail();const feedback=document.getElementById('giftFeedback');document.getElementById('giftPanel')&&(document.getElementById('giftPanel').style.display='block');if(feedback)feedback.textContent='Memeriksa status pembayaran Midtrans...';midtransStatus(oid).then(st=>{const mapped=mappedPaymentStatus(st.transaction_status);const gift=db.gifts.find(x=>x.id===oid);if(gift){gift.status=mapped;saveDb()}if(feedback)feedback.textContent=mapped==='Dibayar'?'🎉 Pembayaran Midtrans berhasil. Terima kasih atas dukungan Anda!':mapped==='Gagal'?'❌ Pembayaran tidak berhasil. Silakan coba lagi.':'⏳ Pembayaran Midtrans masih menunggu penyelesaian.'}).catch(e=>{if(feedback)feedback.textContent='Status pembayaran belum dapat diverifikasi: '+e.message})}
    const u=currentUser();const actions=document.querySelector('#homeView .header-actions');if(actions&&u){actions.innerHTML=`<a href="profile.html" class="pv2-account-link"><span class="pv2-avatar">${initials(u.name)}</span><span>${esc((u.name||'Pengguna').split(' ')[0])}</span></a>`}
    const qp=new URLSearchParams(location.search).get('article');if(qp)setTimeout(()=>window.PV2.openArticle(qp),0);
  }

  function initAuth(){
    if(page==='register.html'){
      window.handleRegister=async function(e){e?.preventDefault();if(!db.features.registration){showErr('Pendaftaran akun sedang dinonaktifkan.');return false}const name=`${document.getElementById('fname').value.trim()} ${document.getElementById('lname').value.trim()}`.trim();const email=document.getElementById('regEmail').value.trim().toLowerCase();const pass=document.getElementById('regPass').value;if(!name||!/^\S+@\S+\.\S+$/.test(email)){showErr('Nama dan email wajib diisi dengan benar.');return false}if(pass.length<8){showErr('Kata sandi minimal 8 karakter.');return false}if(!document.getElementById('agree').checked){showErr('Anda harus menyetujui Syarat & Ketentuan.');return false}if(db.users.some(u=>u.email===email)){showErr('Email sudah terdaftar. Silakan masuk.');return false}const passwordHash=await sha256(pass);const user={id:uid('usr'),name,email,passwordHash,role:'reader',createdAt:new Date().toISOString(),wallet_balance:0};db.users.push(user);saveDb();setSession(user);toast('Pendaftaran berhasil');location.href=nextAfterLogin();return false};
      window.googleRegister=function(){const cid=db.settings.googleClientId;if(!cid){showErr('Google Login belum dikonfigurasi. Isi Google Client ID di Dashboard Admin → Pengaturan Website.');return}toast('Google Login membutuhkan backend verifikasi token sebelum mode produksi.')};
    }
    if(page==='login.html'){
      window.handleLogin=async function(e){e?.preventDefault();const email=document.getElementById('loginEmail').value.trim().toLowerCase();const pass=document.getElementById('loginPass').value;const user=db.users.find(u=>u.email===email);if(!user){showErr('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');return false}const h=await sha256(pass);if(h!==user.passwordHash){showErr('Email atau kata sandi salah.');return false}setSession(user);toast('Berhasil masuk');location.href=nextAfterLogin();return false};
      window.googleLogin=function(){const cid=db.settings.googleClientId;if(!cid){showErr('Google Login belum dikonfigurasi. Isi Google Client ID di Dashboard Admin → Pengaturan Website.');return}toast('Google Login membutuhkan backend verifikasi token sebelum mode produksi.')};
      window.requestPasswordReset=function(){const email=document.getElementById('loginEmail').value.trim().toLowerCase();if(!email){showErr('Masukkan email terlebih dahulu.');return}const u=db.users.find(x=>x.email===email);if(!u){showErr('Email belum terdaftar.');return}modal('Reset Kata Sandi',`<form id="pv2Reset"><div class="pv2-field"><label>Kata sandi baru</label><input id="pv2NewPass" type="password" minlength="8" required></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan</button></div></form>`,m=>m.querySelector('form').onsubmit=async ev=>{ev.preventDefault();const p=m.querySelector('#pv2NewPass').value;if(p.length<8){toast('Minimal 8 karakter');return}u.passwordHash=await sha256(p);saveDb();closeModal();toast('Kata sandi berhasil diperbarui')})};
      const forgot=[...document.querySelectorAll('a')].find(a=>a.textContent.includes('Lupa kata sandi'));if(forgot){forgot.setAttribute('onclick','requestPasswordReset();return false;')}
    }
  }


  function initLoker(){
    const keyword=document.getElementById('jobKeyword');
    const locationInput=document.getElementById('jobLocation');
    const searchBtn=document.getElementById('jobSearchBtn');
    const listEl=document.getElementById('jobList');
    const countEl=document.getElementById('resultCount');
    const sourceEl=document.getElementById('jobSourceNote');
    if(!listEl)return;
    let localJobs=db.jobs.filter(j=>j.status!=='Ditutup').map(j=>({...j,origin:'PURBALINK',external:false}));
    let externalJobs=[];
    let filter='Semua';
    let saved=new Set(getLocal(`pv2_saved_jobs_${userKey()}`,[]));
    function jobId(j){return String(j.id)}
    function jobLogo(j){return initials(j.company||j.source||'JOB')}
    function jobCard(j){
      const salary=j.salary?esc(j.salary):'';
      const snippet=(j.snippet||j.desc||'').replace(/<[^>]+>/g,' ');
      return `<article class="job-card jl-card" data-job-id="${esc(jobId(j))}">
        <div class="jl-card-top"><h2>${esc(j.title)}</h2><button class="job-save-mini ${saved.has(jobId(j))?'saved':''}" data-save-job="${esc(jobId(j))}" aria-label="Simpan"><img src="https://img.icons8.com/ios/50/like--v1.png" alt=""></button></div>
        ${snippet?`<p class="job-snippet">${esc(snippet)}</p>`:''}
        <div class="job-company">${esc(j.company||j.source||'Perusahaan')}</div>
        <div class="jl-place"><img src="https://img.icons8.com/ios-filled/50/marker.png" alt="">${esc(j.loc||'Indonesia')}</div>
        ${salary?`<div class="jl-salary">${salary}</div>`:''}
        <div class="jl-card-bottom"><span><img src="https://img.icons8.com/ios-filled/50/clock.png" alt="">${esc(j.posted||'Terbaru')}</span><button type="button"><img src="https://img.icons8.com/ios/50/flag--v1.png" alt="">Laporkan</button></div>
      </article>`;
    }
    function allJobs(){return [...externalJobs,...localJobs]}
    function filteredJobs(){
      let arr=allJobs();
      if(filter==='Full Time'||filter==='Part Time'||filter==='Magang'||filter==='WFH')arr=arr.filter(j=>String(j.type||'').toLowerCase().includes(filter.toLowerCase()));
      if(filter==='Terbaru')arr=[...arr].sort((a,b)=>String(b.updated||b.posted||'').localeCompare(String(a.updated||a.posted||'')));
      return arr;
    }
    function render(){
      const arr=filteredJobs();
      countEl.textContent=`${arr.length} lowongan ditemukan`;
      listEl.innerHTML=arr.length?arr.map(jobCard).join(''):'<div class="pv2-search-empty">Lowongan tidak ditemukan. Coba kata kunci atau lokasi lain.</div>';
      listEl.querySelectorAll('.job-card').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('[data-save-job]'))return;openJob(card.dataset.jobId)}));
      listEl.querySelectorAll('[data-save-job]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();toggleSave(btn.dataset.saveJob,btn)}));
    }
    function toggleSave(id,btn){saved.has(id)?saved.delete(id):saved.add(id);setLocal(`pv2_saved_jobs_${userKey()}`,[...saved]);btn?.classList.toggle('saved',saved.has(id));if(btn)btn.textContent=saved.has(id)?'♥':'♡';toast(saved.has(id)?'Lowongan disimpan':'Lowongan dihapus dari simpanan')}
    function getJob(id){return allJobs().find(j=>jobId(j)===String(id))}
    function openJob(id){
      const j=getJob(id);if(!j)return;
      document.getElementById('listView').style.display='none';document.getElementById('detailView').style.display='block';window.scrollTo(0,0);
      const detail=document.getElementById('jdCard');
      const externalAction=j.external?`<a class="btn-apply" href="${esc(j.link||'#')}" target="_blank" rel="noopener">Lihat & Lamar di Sumber</a>`:`<button class="btn-apply" id="localApplyBtn">Lamar Sekarang</button>`;
      detail.innerHTML=`<div class="jd-hero"><div class="jd-logo">${jobLogo(j)}</div><div><div class="jd-title">${esc(j.title)}</div><div class="jd-company">${esc(j.company||j.source||'Perusahaan')}</div><div class="jd-location">⌖ ${esc(j.loc||'Indonesia')}</div></div></div>
        <div class="jd-chip-row"><span>${esc(j.type||'Lowongan kerja')}</span><span>${esc(j.salary||'Gaji tidak dicantumkan')}</span>${j.external?'<span>Sumber: Jooble</span>':'<span>Lowongan PURBALINK</span>'}</div>
        <div class="jd-actions">${externalAction}<button class="btn-save ${saved.has(jobId(j))?'saved':''}" id="detailSave">${saved.has(jobId(j))?'♥':'♡'}</button></div>
        <section class="jd-section"><h3>Deskripsi pekerjaan</h3><p>${esc(j.desc||j.snippet||'Buka sumber lowongan untuk melihat deskripsi lengkap dan persyaratan terbaru.')}</p></section>
        ${Array.isArray(j.req)&&j.req.length?`<section class="jd-section"><h3>Kualifikasi</h3><ul>${j.req.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></section>`:''}
        <section class="jd-section"><h3>Tentang lowongan</h3><p>${esc(j.about||(`Lowongan dari ${j.company||j.source||'perusahaan'} di ${j.loc||'Indonesia'}.`))}</p></section>`;
      document.getElementById('detailSave').onclick=()=>toggleSave(jobId(j),document.getElementById('detailSave'));
      if(!j.external){const apply=document.getElementById('localApplyBtn');const u=currentUser();const applied=u&&db.applications.some(a=>a.jobId==j.id&&a.userEmail===u.email);if(applied){apply.textContent='✓ Lamaran Terkirim';apply.classList.add('applied')}else apply.onclick=()=>applyLocal(j)}
    }
    function applyLocal(j){
      if(!requireLogin())return;const u=currentUser();
      modal(`Lamar — ${j.title}`,`<form id="pv2Apply"><div class="pv2-grid"><div class="pv2-field"><label>Nama lengkap</label><input id="apName" required value="${esc(u.name||'')}"></div><div class="pv2-field"><label>Email</label><input id="apEmail" type="email" required value="${esc(u.email||'')}"></div><div class="pv2-field"><label>No. WhatsApp</label><input id="apPhone" required placeholder="08xxxxxxxxxx"></div><div class="pv2-field"><label>Link CV / Portfolio</label><input id="apCv" type="url" placeholder="https://..."></div><div class="pv2-field full"><label>Pesan untuk perekrut</label><textarea id="apNote"></textarea></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn red">Kirim Lamaran</button></div></form>`,m=>m.querySelector('form').onsubmit=e=>{e.preventDefault();db.applications.unshift({id:uid('app'),jobId:j.id,jobTitle:j.title,company:j.company,userEmail:u.email,name:m.querySelector('#apName').value.trim(),email:m.querySelector('#apEmail').value.trim(),phone:m.querySelector('#apPhone').value.trim(),cv:m.querySelector('#apCv').value.trim(),note:m.querySelector('#apNote').value.trim(),status:'Menunggu',date:new Date().toLocaleDateString('id-ID')});saveDb();closeModal();toast('Lamaran berhasil dikirim');openJob(j.id)})
    }
    async function fetchJooble(force=false){
      const q=(keyword?.value||'').trim()||'Lowongan';
      const loc=(locationInput?.value||'').trim()||'Purbalingga';
      const cacheKey='pv2_jooble_cache_'+q.toLowerCase()+'_'+loc.toLowerCase();
      if(!force){try{const c=JSON.parse(sessionStorage.getItem(cacheKey)||'null');if(c&&Date.now()-c.ts<1800000){externalJobs=c.jobs||[];sourceEl.textContent='Lowongan live dari Jooble ´ cache 30 menit';render();return}}catch(_){}}
      if(searchBtn)searchBtn.disabled=true;sourceEl.textContent='Memuat lowongan live dari Jooble…';
      try{
        const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
        const res=await fetch('/api/jobs/jooble',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({keywords:q,location:loc,page:1}),signal:controller.signal,cache:'no-store'});clearTimeout(timeout);
        const data=await res.json().catch(()=>({}));
        if(!res.ok||data.configured===false)throw new Error(data.error||'Jooble API belum dikonfigurasi');
        externalJobs=(data.jobs||[]).map((j,i)=>({id:'jooble-'+(j.id||i)+'-'+Date.now(),title:j.title||'Lowongan kerja',company:j.company||j.source||'Perusahan',loc:j.location||loc,salary:j.salary||'',type:j.type||'Lowongan Jooble',posted:j.updated||'Terbaru',updated:j.updated||'',snippet:(j.snippet||'').replace(/<[^>]+>/g,' '),link:j.link||'#',source:j.source||'Jooble',origin:'Jooble',external:true}));
        sessionStorage.setItem(cacheKey,JSON.stringify({ts:Date.now(),jobs:externalJobs}));
        sourceEl.textContent=`Live · Jooble ${externalJobs.length}`;sourceEl.classList.add('connected');
      }catch(e){externalJobs=[];sourceEl.textContent=e?.name==='AbortError'?'Jooble: koneksi timeout':'Jooble: '+e.message;sourceEl.classList.remove('connected')}
      if(searchBtn)searchBtn.disabled=false;render();
    }
    window.showList=function(){document.getElementById('detailView').style.display='none';document.getElementById('listView').style.display='block';window.scrollTo(0,0)};
    document.querySelectorAll('.job-filter-chip').forEach(ch=>ch.onclick=()=>{document.querySelectorAll('.job-filter-chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');filter=ch.dataset.filter||'Semua';render()});
    const jlMenu=document.querySelector('.jl-menu'),jlDrawer=document.getElementById('jlDrawer'),jlMask=document.getElementById('jlDrawerMask'),jlClose=document.getElementById('jlDrawerClose');
    const setDrawer=open=>{if(!jlDrawer)return;jlDrawer.classList.toggle('show',open);jlMask?.classList.toggle('show',open);jlDrawer.setAttribute('aria-hidden',open?'false':'true');document.body.classList.toggle('jl-drawer-open',open)};
    if(jlMenu){jlMenu.removeAttribute('data-pl-menu');jlMenu.onclick=()=>setDrawer(true)}if(jlClose)jlClose.onclick=()=>setDrawer(false);if(jlMask)jlMask.onclick=()=>setDrawer(false);
    document.querySelectorAll('[data-job-query]').forEach(btn=>btn.onclick=()=>{keyword.value=btn.dataset.jobQuery||'';setDrawer(false);fetchJooble(true)});
    const locBtn=document.getElementById('jlLocationBtn');if(locBtn)locBtn.onclick=()=>{const v=prompt('Masukkan kota atau wilayah',locationInput?.value||'');if(v!==null){locationInput.value=v.trim();const lab=document.getElementById('jlLocationLabel');if(lab)lab.textContent=v.trim()||'Tambahkan wilayah';fetchJooble(true)}};
    if(searchBtn)searchBtn.onclick=()=>fetchJooble(true);
    [keyword,locationInput].forEach(inp=>inp&&inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();fetchJooble(true)}}));
    render();fetchJooble(false);
  }

  function initShop(){
    const products=db.products.filter(p=>p.status==='Aktif');
    const search=document.getElementById('shopSearchInput');
    const reco=document.getElementById('recoGrid');
    const flash=document.getElementById('flashGrid');
    if(!reco)return;
    let cart=getLocal(`pv2_cart_${userKey()}`,{});
    let query='',category='Semua',pdQty=1;
    const categories={Kuliner:['keripik','madu','kopi','makanan','minuman'],Fashion:['kaos','tas','baju','fashion'],Anak:['mainan','anak'],Kecantikan:['serum','beauty','wajah'],Kerajinan:['anyaman','bambu','kerajinan'],Elektronik:['elektronik','speaker','hp']};
    function saveCart(){setLocal(`pv2_cart_${userKey()}`,cart)}
    function productCategory(p){const t=(p.name+' '+p.desc).toLowerCase();for(const [cat,words] of Object.entries(categories))if(words.some(w=>t.includes(w)))return cat;return 'Lainnya'}
    function card(p){
      const rating=(4.7+((Number(p.id)||0)%3)*.1).toFixed(1);
      return `<article class="tk-card" data-product-id="${p.id}"><div class="tk-img" style="background-image:url('${esc(p.img)}')">${p.disc?`<span class="tk-discount">-${p.disc}%</span>`:''}<span class="tk-fav">♡</span></div><div class="tk-body"><div class="tk-name">${esc(p.name)}</div><div class="tk-price">${rupiah(p.price)}</div>${p.old?`<div class="tk-old">${rupiah(p.old)}</div>`:''}<div class="tk-badges"><span>✓ Official Lokal</span><span>Bisa COD</span></div><div class="tk-meta"><span>★ ${rating}</span><span>${esc(String(p.sold||0))} terjual</span></div><div class="tk-loc">${esc(p.loc||'Purbalingga')}</div></div></article>`;
    }
    function list(){
      return products.filter(p=>{
        const text=(p.name+' '+p.shop+' '+p.loc+' '+p.desc).toLowerCase();
        return (!query||text.includes(query))&&(category==='Semua'||productCategory(p)===category);
      });
    }
    function renderShopHero(){
      const hero=document.getElementById('shopHero');if(!hero)return;
      const cfg=Object.assign({},seed.settings.shopHero,db.settings?.shopHero||{});
      hero.style.backgroundImage=`url("${String(cfg.background||seed.settings.shopHero.background).replace(/"/g,'%22')}")`;
      document.getElementById('shopHeroTitle').textContent=cfg.title||'Promo Produk UMKM';
      document.getElementById('shopHeroSubtitle').textContent=cfg.subtitle||'';
      document.getElementById('shopHeroBadge').textContent=cfg.badge||'';
      const ids=Array.isArray(cfg.productIds)?cfg.productIds:[1,2];
      let items=ids.map(id=>products.find(p=>String(p.id)===String(id))).filter(Boolean).slice(0,2);
      if(items.length<2)items=products.slice(0,2);
      const grid=document.getElementById('shopHeroProducts');if(!grid)return;
      grid.innerHTML=items.map(p=>`<button class="shop-hero-product" type="button" data-hero-product="${p.id}"><span class="shop-hero-product-img" style="background-image:url('${esc(p.img)}')"></span><span class="shop-hero-product-copy"><b>${esc(p.name)}</b><strong>${rupiah(p.price)}</strong></span></button>`).join('');
      grid.querySelectorAll('[data-hero-product]').forEach(b=>b.onclick=()=>openProduct(Number(b.dataset.heroProduct)));
    }
    function renderProducts(){
      const arr=list();reco.innerHTML=arr.length?arr.map(card).join(''):'<div class="pv2-search-empty" style="grid-column:1/-1">Produk tidak ditemukan.</div>';
      if(flash)flash.innerHTML=products.filter(p=>p.disc).slice(0,8).map(card).join('');
      document.querySelectorAll('.tk-card').forEach(c=>c.onclick=e=>{if(e.target.closest('.tk-fav'))return;openProduct(Number(c.dataset.productId))});
      document.querySelectorAll('.tk-fav').forEach(f=>f.onclick=e=>{e.stopPropagation();f.classList.toggle('on');f.textContent=f.classList.contains('on')?'♥':'♡';toast(f.classList.contains('on')?'Produk disimpan':'Produk dihapus dari simpanan')});
    }
    function updateCartBadge(){const n=Object.values(cart).reduce((a,b)=>a+Number(b||0),0);document.querySelectorAll('[data-cart-count],#cartBadge').forEach(el=>el.textContent=n)}
    function openProduct(id){
      const p=products.find(x=>x.id==id);if(!p)return;pdQty=1;
      const reviewKey='pv2_product_reviews_'+id,discussionKey='pv2_product_discussions_'+id;
      let reviews=getLocal(reviewKey,[]),discussions=getLocal(discussionKey,[]);
      const baseRating=4.8,ratingCount=Math.max(reviews.length,Number(p.sold||0)>0?Math.max(1,Math.round(Number(p.sold||0)*.08)):0);
      const renderSocial=()=>{const box=document.getElementById('pdSocialContent');if(!box)return;const tab=box.dataset.tab||'reviews';const data=tab==='reviews'?reviews:discussions;box.innerHTML=data.length?data.map(x=>`<article class="pd-user-post"><div class="pd-post-head"><b>${esc(x.name||'Pengguna PURBALINK')}</b><small>${esc(x.date||'Baru saja')}</small></div>${tab==='reviews'?'<div class="pd-stars">★★★★★</div>':''}<p>${esc(x.text||'')}</p>${x.media?`<img class="pd-post-media" src="${esc(x.media)}" alt="Lampiran">`:''}<div class="pd-post-react"><button>👍 ${x.likes||0}</button><button>❤️</button><button>😂</button><button>Balas</button></div></article>`).join(''):'<div class="pd-empty">Belum ada '+(tab==='reviews'?'ulasan':'diskusi')+'. Jadilah yang pertama.</div>'};
      document.getElementById('listView').style.display='none';document.getElementById('cartView').style.display='none';document.getElementById('detailView').style.display='block';window.scrollTo(0,0);
      document.getElementById('pdContent').innerHTML=`<div class="tk-detail-grid"><div class="tk-detail-image" style="background-image:url('${esc(p.img)}')"></div><div class="tk-detail-info"><div class="tk-detail-price">${rupiah(p.price)} ${p.old?`<del>${rupiah(p.old)}</del><span>-${p.disc}%</span>`:''}</div><h1>${esc(p.name)}</h1><div class="tk-detail-stats"><b>★ ${baseRating}</b> · ${ratingCount} rating · ${esc(String(p.sold||0))} terjual · Stok ${Number(p.stock||0)}</div><div class="tk-promo-box"><b>Promo produk</b><span>Belanja lokal lebih hemat · Checkout tersedia via WhatsApp</span></div><div class="tk-seller"><div class="tk-seller-avatar">${initials(p.shop)}</div><div><b>${esc(p.shop)}</b><small>Seller lokal Purbalingga · Respons cepat</small></div><button>Ikuti</button></div><section class="tk-desc"><h3>Deskripsi Produk</h3><p>${esc(p.desc)}</p></section><div class="tk-qty"><span>Jumlah</span><button id="qtyMinus">−</button><b id="qtyVal">1</b><button id="qtyPlus">+</button></div></div></div>
      <section class="pd-community"><div class="pd-summary"><div><b>${baseRating}</b><span>★★★★★</span><small>${ratingCount} rating produk</small></div><div><strong>Ulasan & Diskusi</strong><small>Pengalaman pembeli dan tanya jawab produk</small></div></div><div class="pd-tabs"><button class="active" data-pd-tab="reviews">Ulasan (${reviews.length})</button><button data-pd-tab="discussions">Diskusi (${discussions.length})</button></div><div id="pdSocialContent" data-tab="reviews"></div><div class="pd-composer"><div class="pd-media-preview" id="pdMediaPreview" hidden><img id="pdMediaPreviewImg" alt="Media"><span id="pdMediaPreviewLabel"></span><button type="button" id="pdClearMedia">×</button></div><textarea id="pdComposerText" placeholder="Tulis ulasan atau pertanyaan tentang produk…"></textarea><div class="pd-composer-tools"><button type="button" class="pd-picker-toggle" id="pdPickerToggle" aria-label="Emoji, sticker, GIF"><img src="https://img.icons8.com/emoji/48/slightly-smiling-face.png" alt=""></button><button type="button" class="pd-gift-toggle" id="pdGiftToggle" aria-label="Gift"><img src="https://img.icons8.com/fluency/48/gift.png" alt=""></button><span class="pd-tool-label">Emoji · Sticker · GIF · Gift</span><button class="pd-send" id="pdSend">Kirim</button></div><div class="pd-picker" id="pdPicker"><div class="pd-picker-tabs"><button class="active" data-pd-picker="emoji">Emoji</button><button data-pd-picker="sticker">Sticker</button><button data-pd-picker="gif">GIF</button><button data-pd-picker="gift">Gift</button></div><div class="pd-picker-body" id="pdPickerBody"></div></div></div></section>
      <div class="tk-detail-actions pd-sticky-actions"><button class="tk-outline" id="addCartBtn"><img src="https://img.icons8.com/ios-filled/50/shopping-cart.png" alt="">Keranjang</button><button class="pd-wa-btn" id="waCheckoutBtn"><img src="https://img.icons8.com/ios-filled/50/whatsapp--v1.png" alt="">WhatsApp</button><button class="tk-primary" id="buyNowBtn">Beli</button></div>`;
      document.getElementById('qtyMinus').onclick=()=>{pdQty=Math.max(1,pdQty-1);document.getElementById('qtyVal').textContent=pdQty};
      document.getElementById('qtyPlus').onclick=()=>{pdQty++;document.getElementById('qtyVal').textContent=pdQty};
      document.getElementById('addCartBtn').onclick=()=>addToCart(id);
      document.getElementById('buyNowBtn').onclick=()=>{addToCart(id);showCart()};
      document.getElementById('waCheckoutBtn').onclick=()=>{const msg=`Halo PURBALINK Shop, saya ingin memesan:\n\nProduk: ${p.name}\nJumlah: ${pdQty}\nHarga: ${rupiah(p.price)}\nTotal: ${rupiah(p.price*pdQty)}\nToko: ${p.shop||'-'}\n\nMohon info proses pemesanan dan pembayarannya. Terima kasih.`;window.open('https://wa.me/6283854488111?text='+encodeURIComponent(msg),'_blank','noopener')};
      document.querySelectorAll('[data-pd-tab]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('[data-pd-tab]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.getElementById('pdSocialContent').dataset.tab=btn.dataset.pdTab;renderSocial()});
      let pdMedia='',pdMediaKind='';const picker=document.getElementById('pdPicker'),pickerBody=document.getElementById('pdPickerBody'),preview=document.getElementById('pdMediaPreview');
      const shopEmoji=['😀','😂','😍','👍','❤️','🔥','😮','😢','🙏','🎉','👏','🤩','😋','💯','⭐','😊'];
      const shopSticker=[{label:'Mantap',file:'https://img.icons8.com/emoji/96/thumbs-up.png'},{label:'Love',file:'https://img.icons8.com/emoji/96/red-heart.png'},{label:'Lucu',file:'https://img.icons8.com/emoji/96/face-with-tears-of-joy.png'},{label:'Wow',file:'https://img.icons8.com/emoji/96/exploding-head.png'},{label:'Keren',file:'https://img.icons8.com/emoji/96/star-struck.png'},{label:'Terima kasih',file:'https://img.icons8.com/emoji/96/folded-hands.png'}];
      const shopGif=[{label:'Love',file:'https://img.icons8.com/emoji/96/smiling-face-with-heart-eyes.png'},{label:'Fire',file:'https://img.icons8.com/emoji/96/fire.png'},{label:'Party',file:'https://img.icons8.com/emoji/96/party-popper.png'}];
      const shopGift=[{label:'Gift',file:'https://img.icons8.com/fluency/96/gift.png'},{label:'Bunga',file:'https://img.icons8.com/fluency/96/flower-bouquet.png'},{label:'Bintang',file:'https://img.icons8.com/fluency/96/star.png'},{label:'Love',file:'https://img.icons8.com/fluency/96/filled-like.png'}];
      const chooseMedia=(x,kind)=>{pdMedia=x.file;pdMediaKind=kind;document.getElementById('pdMediaPreviewImg').src=x.file;document.getElementById('pdMediaPreviewLabel').textContent=x.label+' · '+kind;preview.hidden=false;picker.classList.remove('show')};
      const renderPicker=kind=>{document.querySelectorAll('[data-pd-picker]').forEach(b=>b.classList.toggle('active',b.dataset.pdPicker===kind));pickerBody.className='pd-picker-body '+(kind==='emoji'?'pd-emoji-grid':'pd-media-grid');if(kind==='emoji')pickerBody.innerHTML=shopEmoji.map(e=>`<button type="button" data-shop-emoji="${e}">${e}</button>`).join('');else{const src=kind==='sticker'?shopSticker:kind==='gif'?shopGif:shopGift;pickerBody.innerHTML=src.map((x,i)=>`<button type="button" data-shop-media="${kind}:${i}"><img src="${x.file}" alt=""><span>${x.label}</span></button>`).join('')}pickerBody.querySelectorAll('[data-shop-emoji]').forEach(b=>b.onclick=()=>{const t=document.getElementById('pdComposerText');t.value+=(t.value?' ':'')+b.dataset.shopEmoji;t.focus()});pickerBody.querySelectorAll('[data-shop-media]').forEach(b=>b.onclick=()=>{const [k,i]=b.dataset.shopMedia.split(':');chooseMedia((k==='sticker'?shopSticker:k==='gif'?shopGif:shopGift)[Number(i)],k)})};
      document.getElementById('pdPickerToggle').onclick=()=>{picker.classList.toggle('show');if(picker.classList.contains('show'))renderPicker('emoji')};document.getElementById('pdGiftToggle').onclick=()=>{picker.classList.add('show');renderPicker('gift')};document.querySelectorAll('[data-pd-picker]').forEach(b=>b.onclick=()=>renderPicker(b.dataset.pdPicker));document.getElementById('pdClearMedia').onclick=()=>{pdMedia='';pdMediaKind='';preview.hidden=true};
      document.getElementById('pdSend').onclick=()=>{const t=document.getElementById('pdComposerText'),text=t.value.trim();if(!text&&!pdMedia){toast('Tulis pesan atau pilih emoji, sticker, GIF atau gift');return}const item={name:currentUser()?.name||'Pengguna PURBALINK',text,media:pdMedia,date:new Date().toLocaleDateString('id-ID'),likes:0};if(document.getElementById('pdSocialContent').dataset.tab==='reviews'){reviews.unshift(item);setLocal(reviewKey,reviews)}else{discussions.unshift(item);setLocal(discussionKey,discussions)}t.value='';pdMedia='';pdMediaKind='';preview.hidden=true;renderSocial();toast('Berhasil dikirim')};renderSocial();
    }
    function addToCart(id){cart[id]=(cart[id]||0)+pdQty;saveCart();updateCartBadge();toast('Ditambahkan ke keranjang')}
    function renderCart(){
      const ids=Object.keys(cart).filter(id=>cart[id]>0),container=document.getElementById('cartItems'),empty=document.getElementById('cartEmpty');let total=0;
      if(!ids.length){container.innerHTML='';empty.style.display='block';document.getElementById('cartTotal').textContent=rupiah(0);return}
      empty.style.display='none';container.innerHTML=ids.map(id=>{const p=products.find(x=>x.id==id);if(!p)return'';const qty=cart[id];total+=p.price*qty;return `<div class="tk-cart-row"><div class="tk-cart-img" style="background-image:url('${esc(p.img)}')"></div><div class="tk-cart-copy"><b>${esc(p.name)}</b><span>${rupiah(p.price)}</span></div><div class="tk-cart-qty"><button data-cart-minus="${id}">−</button><b>${qty}</b><button data-cart-plus="${id}">+</button></div></div>`}).join('');document.getElementById('cartTotal').textContent=rupiah(total);
      container.querySelectorAll('[data-cart-minus]').forEach(b=>b.onclick=()=>changeCart(b.dataset.cartMinus,-1));container.querySelectorAll('[data-cart-plus]').forEach(b=>b.onclick=()=>changeCart(b.dataset.cartPlus,1));
    }
    function changeCart(id,d){cart[id]=Math.max(0,(cart[id]||0)+d);if(!cart[id])delete cart[id];saveCart();updateCartBadge();renderCart()}
    function showCart(){document.getElementById('listView').style.display='none';document.getElementById('detailView').style.display='none';document.getElementById('cartView').style.display='block';window.scrollTo(0,0);renderCart()}
    function showList(){document.getElementById('detailView').style.display='none';document.getElementById('cartView').style.display='none';document.getElementById('listView').style.display='block';window.scrollTo(0,0)}
    async function checkout(){
      if(!requireLogin())return;const ids=Object.keys(cart).filter(id=>cart[id]>0);if(!ids.length){toast('Keranjang masih kosong');return}
      const items=ids.map(id=>({productId:Number(id),qty:cart[id],product:products.find(p=>p.id==id)})).filter(x=>x.product),subtotal=items.reduce((s,x)=>s+x.product.price*x.qty,0),u=currentUser();
      modal('Checkout PURBALINK Shop',`<form id="pv2Checkout"><div class="pv2-grid"><div class="pv2-field"><label>Nama penerima</label><input id="coName" required value="${esc(u.name||'')}"></div><div class="pv2-field"><label>No. WhatsApp</label><input id="coPhone" required placeholder="08xxxxxxxxxx"></div><div class="pv2-field full"><label>Alamat lengkap</label><textarea id="coAddress" required></textarea></div><div class="pv2-field"><label>Pembayaran</label><select id="coPay"><option value="Midtrans">Midtrans</option><option value="COD">COD</option></select></div><div class="pv2-field"><label>Catatan</label><input id="coNote"></div></div><div class="pv2-order-summary">${items.map(x=>`<div><span>${esc(x.product.name)} × ${x.qty}</span><b>${rupiah(x.product.price*x.qty)}</b></div>`).join('')}<div class="total"><span>Total</span><span>${rupiah(subtotal)}</span></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn red">Bayar / Buat Pesanan</button></div></form>`,m=>m.querySelector('form').onsubmit=async e=>{e.preventDefault();const pay=m.querySelector('#coPay').value;const order={id:'INV-'+Date.now(),userEmail:u.email,buyer:m.querySelector('#coName').value.trim(),phone:m.querySelector('#coPhone').value.trim(),address:m.querySelector('#coAddress').value.trim(),payment:pay,note:m.querySelector('#coNote').value.trim(),items:items.map(x=>({productId:x.productId,name:x.product.name,qty:x.qty,price:x.product.price})),total:subtotal,status:pay==='Midtrans'?'Menunggu Pembayaran':'Diproses',date:new Date().toLocaleDateString('id-ID')};db.orders.unshift(order);saveDb();if(pay==='COD'){cart={};saveCart();updateCartBadge();closeModal();showList();toast('Pesanan COD berhasil dibuat');return}const btn=m.querySelector('.pv2-btn.red');btn.disabled=true;btn.textContent='Menghubungkan ke Midtrans...';try{const data=await createMidtransPayment({order_id:order.id,type:'shop',amount:subtotal,customer:{name:order.buyer,email:u.email,phone:order.phone},items:order.items.map(x=>({id:String(x.productId),name:x.name,price:x.price,quantity:x.qty}))});cart={};saveCart();updateCartBadge();location.href=data.redirect_url}catch(err){order.status='Gagal';saveDb();btn.disabled=false;btn.textContent='Bayar / Buat Pesanan';toast(err.message)}})
    }
    window.showCart=showCart;window.showList=showList;window.checkout=checkout;window.addToCart=addToCart;
    if(search)search.addEventListener('input',()=>{query=search.value.trim().toLowerCase();renderProducts()});
    document.querySelectorAll('.shop-cat-chip').forEach(ch=>ch.onclick=()=>{document.querySelectorAll('.shop-cat-chip').forEach(x=>x.classList.remove('active'));ch.classList.add('active');category=ch.dataset.category||'Semua';renderProducts()});
    const returnParams=new URLSearchParams(location.search);if(returnParams.get('payment')==='midtrans'&&returnParams.get('type')==='shop'){const oid=returnParams.get('order_id');midtransStatus(oid).then(st=>{const order=db.orders.find(x=>x.id===oid);const mapped=mappedPaymentStatus(st.transaction_status);if(order){order.status=mapped;order.payment='Midtrans';saveDb()}toast(mapped==='Dibayar'?'Pembayaran '+oid+' berhasil':mapped==='Gagal'?'Pembayaran '+oid+' gagal':'Pembayaran '+oid+' masih menunggu')}).catch(e=>toast('Status Midtrans belum dapat diverifikasi: '+e.message))}
    renderShopHero();
    renderProducts();updateCartBadge();
  }
  function initVideo(){
    if(typeof videos==='undefined')return;
    videos.splice(0,videos.length,...db.videos.filter(v=>v.status==='Tayang'));
    const liked=new Set(getLocal(`pv2_video_likes_${userKey()}`,[]));const saved=new Set(getLocal(`pv2_video_saved_${userKey()}`,[]));const following=new Set(getLocal(`pv2_video_follow_${userKey()}`,[]));
    function renderFeed(list=videos){const el=document.getElementById('feed');if(!el)return;el.innerHTML=list.map(v=>`<section class="item" data-id="${v.id}" data-user="${esc(v.user)}" style="background-image:url('${esc(v.img)}')"><div class="item-content"><div class="left-info"><div class="uname"><b>@${esc(v.user)}</b><button class="follow-btn ${following.has(v.user)?'following':''}" onclick="PV2.followVideo('${esc(v.user)}',this)">${following.has(v.user)?'Mengikuti':'+ Ikuti'}</button></div><div class="caption">${esc(v.caption)}</div><div class="music-row">🎵 <span>${esc(v.music||'Audio Asli')}</span></div></div><div class="right-actions"><div class="avatar-ring" style="background-image:url('${esc(v.img)}')"><span class="avatar-plus">+</span></div><div class="ract"><button class="ic-circle ${liked.has(v.id)?'liked':''}" onclick="PV2.likeVideo(this,${v.id})">❤️</button><span class="like-count">${fmt(v.likes+(liked.has(v.id)?1:0))}</span></div><div class="ract"><button class="ic-circle" onclick="openComments(${v.id})">💬</button><span>${fmt(v.comments.length)}</span></div><div class="ract"><button class="ic-circle" onclick="shareVideo(${v.id})">↗</button><span>Bagikan</span></div><div class="ract"><button class="ic-circle ${saved.has(v.id)?'liked':''}" onclick="PV2.saveVideo(this,${v.id})">🔖</button><span>Simpan</span></div></div></div></section>`).join('')}
    window.PV2.followVideo=(user,btn)=>{following.has(user)?following.delete(user):following.add(user);setLocal(`pv2_video_follow_${userKey()}`,[...following]);btn.classList.toggle('following',following.has(user));btn.textContent=following.has(user)?'Mengikuti':'+ Ikuti'};
    window.PV2.likeVideo=(btn,id)=>{liked.has(id)?liked.delete(id):liked.add(id);setLocal(`pv2_video_likes_${userKey()}`,[...liked]);btn.classList.toggle('liked',liked.has(id));const v=videos.find(x=>x.id===id);btn.parentElement.querySelector('.like-count').textContent=fmt(v.likes+(liked.has(id)?1:0))};
    window.PV2.saveVideo=(btn,id)=>{saved.has(id)?saved.delete(id):saved.add(id);setLocal(`pv2_video_saved_${userKey()}`,[...saved]);btn.classList.toggle('liked',saved.has(id));toast(saved.has(id)?'Video disimpan':'Video dihapus dari simpanan')};
    window.shareVideo=function(id){const url=`${DOMAIN}/video.html?v=${id}`;if(navigator.share)navigator.share({url}).catch(()=>{});else navigator.clipboard?.writeText(url).then(()=>toast('Tautan video disalin'))};
    const oldPost=window.postVideoComment;window.postVideoComment=function(){oldPost();db.videos=videos.map(v=>clone(v));saveDb()};
    document.querySelectorAll('.topbar span').forEach(s=>s.addEventListener('click',()=>{document.querySelectorAll('.topbar span').forEach(x=>x.classList.remove('active'));s.classList.add('active');const label=s.textContent.trim();if(label==='Mengikuti')renderFeed(videos.filter(v=>following.has(v.user)));else if(label==='Purbalingga')renderFeed(videos.filter(v=>/purb|wisata|kuliner/i.test(v.user+v.caption)));else renderFeed()}));
    renderFeed();
  }

  function initProfile(){
    const old=window.renderProfile;window.renderProfile=function(){const area=document.getElementById('profileArea');const u=currentUser();if(!u||!token()){old();return}const apps=db.applications.filter(a=>a.userEmail===u.email).length;const orders=db.orders.filter(o=>o.userEmail===u.email).length;const likes=getLocal(`pv2_video_likes_${userKey()}`,[]).length;area.innerHTML=`<div class="profile-card"><div class="pc-top"><div class="pc-avatar">${initials(u.name)}</div><div><div class="pc-name">${esc(u.name)}</div><div class="pc-email">${esc(u.email)}</div></div><button class="pc-edit" onclick="PV2.editProfile()">Edit</button></div><div class="stats-row"><div class="stat"><b>${apps}</b><span>Lamaran</span></div><div class="stat"><b>${orders}</b><span>Pesanan</span></div><div class="stat"><b>${likes}</b><span>Video Disukai</span></div></div>${u.role==='author'||u.role==='admin'?`<div class="wallet-strip"><div>Saldo Penulis<b>${rupiah(u.wallet_balance||0)}</b></div><button onclick="PV2.withdraw()">Tarik Saldo</button></div>`:''}</div>`;document.getElementById('logoutItem').style.display='flex'};
    window.PV2.editProfile=function(){const u=currentUser();if(!u)return;modal('Edit Profil',`<form id="pv2EditProfile"><div class="pv2-grid"><div class="pv2-field full"><label>Nama</label><input id="epName" required value="${esc(u.name)}"></div><div class="pv2-field full"><label>Email</label><input id="epEmail" type="email" value="${esc(u.email)}" disabled></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan</button></div></form>`,m=>m.querySelector('form').onsubmit=e=>{e.preventDefault();const name=m.querySelector('#epName').value.trim();u.name=name;localStorage.setItem('purbalink_user',JSON.stringify(u));const rec=db.users.find(x=>x.id===u.id||x.email===u.email);if(rec)rec.name=name;saveDb();closeModal();renderProfile();toast('Profil diperbarui')})};
    window.PV2.withdraw=function(){toast('Withdrawal akan aktif setelah payment gateway produksi terhubung.')};
    function listModal(title,items,mapper){modal(title,items.length?`<div class="pv2-list">${items.map(mapper).join('')}</div>`:'<div class="pv2-search-empty">Belum ada data.</div>')}
    const menu=[...document.querySelectorAll('.menu-item')];
    const byText=t=>menu.find(x=>x.textContent.includes(t));
    byText('Pesanan Saya')?.addEventListener('click',()=>{const u=currentUser();if(!u)return requireLogin();listModal('Pesanan Saya',db.orders.filter(o=>o.userEmail===u.email),o=>`<div class="pv2-list-row"><div><b>${esc(o.id)}</b><small>${esc(o.date)} · ${esc(o.payment)}</small></div><div><b>${rupiah(o.total)}</b><small>${esc(o.status)}</small></div></div>`)});
    byText('Lamaran Loker Saya')?.addEventListener('click',()=>{const u=currentUser();if(!u)return requireLogin();listModal('Lamaran Loker Saya',db.applications.filter(a=>a.userEmail===u.email),a=>`<div class="pv2-list-row"><div><b>${esc(a.jobTitle)}</b><small>${esc(a.company)} · ${esc(a.date)}</small></div><span class="pv2-pill">${esc(a.status)}</span></div>`)});
    byText('Video Saya')?.addEventListener('click',()=>{location.href='video.html'});
    byText('Tersimpan / Bookmark')?.addEventListener('click',()=>{const jobs=getLocal(`pv2_saved_jobs_${userKey()}`,[]);const vids=getLocal(`pv2_video_saved_${userKey()}`,[]);const arts=getLocal(`pv2_article_bookmarks_${userKey()}`,[]);modal('Tersimpan / Bookmark',`<div class="pv2-list"><div class="pv2-list-row"><b>Artikel</b><span>${arts.length}</span></div><div class="pv2-list-row"><b>Lowongan</b><span>${jobs.length}</span></div><div class="pv2-list-row"><b>Video</b><span>${vids.length}</span></div></div>`)});
    byText('Edit Profil')?.addEventListener('click',()=>window.PV2.editProfile());
    byText('Ubah Kata Sandi')?.addEventListener('click',()=>{const u=currentUser();if(!u)return requireLogin();modal('Ubah Kata Sandi',`<form id="pv2ChangePass"><div class="pv2-field"><label>Kata sandi baru</label><input id="cpPass" type="password" minlength="8" required></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan</button></div></form>`,m=>m.querySelector('form').onsubmit=async e=>{e.preventDefault();const p=m.querySelector('#cpPass').value;if(p.length<8)return toast('Minimal 8 karakter');const rec=db.users.find(x=>x.id===u.id||x.email===u.email);if(rec){rec.passwordHash=await sha256(p);saveDb()}closeModal();toast('Kata sandi diperbarui')})});
    byText('Notifikasi')?.addEventListener('click',async()=>{if(!('Notification'in window)){toast('Browser tidak mendukung notifikasi.');return}const p=await Notification.requestPermission();toast(p==='granted'?'Notifikasi diizinkan':'Izin notifikasi belum diberikan')});
    byText('Pusat Bantuan')?.addEventListener('click',()=>location.href='kontak.html');
    byText('Syarat & Ketentuan')?.addEventListener('click',()=>location.href='terms.html');
    const lastSection=document.querySelector('.menu-section:last-of-type .menu-card');if(lastSection){const install=document.createElement('div');install.className='menu-item';install.innerHTML='<div class="menu-ic" style="background:#EEF5FF;color:#0B5ED7;">⬇️</div>Install Aplikasi<span class="chev">›</span>';install.addEventListener('click',()=>PV2.installApp());lastSection.insertBefore(install,lastSection.lastElementChild)}
    renderProfile();
  }

  function adminArticleTable(){const rows=db.articles.map(a=>`<tr><td style="max-width:280px">${esc(a.title)}</td><td>${esc(a.cat)}</td><td><span class="status ${a.status==='Terbit'?'st-terbit':a.status==='Review'?'st-review':'st-draft'}">${esc(a.status)}</span></td><td>${esc(a.date)}</td><td><div class="pv2-inline-actions"><button onclick="PV2.adminArticle(${a.id})">Edit</button><button class="pv2-danger" onclick="PV2.deleteArticle(${a.id})">Hapus</button></div></td></tr>`).join('');return `<div class="panel"><div class="panel-head"><h2>Artikel / Berita</h2><button class="pv2-admin-add" onclick="PV2.adminArticle()">+ Tambah Artikel</button></div><table><thead><tr><th>Judul</th><th>Kategori</th><th>Status</th><th>Tanggal</th><th>Aksi</th></tr></thead><tbody>${rows}</tbody></table></div>`}
  function adminJobTable(){return `<div class="panel"><div class="panel-head"><h2>Lowongan Kerja</h2><button class="pv2-admin-add" onclick="PV2.adminJob()">+ Tambah Lowongan</button></div><table><thead><tr><th>Posisi</th><th>Perusahaan</th><th>Status</th><th>Lokasi</th><th>Aksi</th></tr></thead><tbody>${db.jobs.map(j=>`<tr><td>${esc(j.title)}</td><td>${esc(j.company)}</td><td><span class="status ${j.status==='Aktif'?'st-terbit':'st-draft'}">${esc(j.status)}</span></td><td>${esc(j.loc)}</td><td><div class="pv2-inline-actions"><button onclick="PV2.adminJob(${j.id})">Edit</button><button onclick="PV2.toggleJob(${j.id})">${j.status==='Aktif'?'Tutup':'Buka'}</button><button class="pv2-danger" onclick="PV2.deleteJob(${j.id})">Hapus</button></div></td></tr>`).join('')}</tbody></table></div>`}
  function adminProductTable(){return `<div class="panel"><div class="panel-head"><h2>Produk</h2><button class="pv2-admin-add" onclick="PV2.adminProduct()">+ Tambah Produk</button></div><table><thead><tr><th>Produk</th><th>Toko</th><th>Harga</th><th>Stok</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${db.products.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.shop)}</td><td>${rupiah(p.price)}</td><td>${p.stock}</td><td><span class="status ${p.status==='Aktif'?'st-terbit':'st-draft'}">${esc(p.status)}</span></td><td><div class="pv2-inline-actions"><button onclick="PV2.adminProduct(${p.id})">Edit</button><button class="pv2-danger" onclick="PV2.deleteProduct(${p.id})">Hapus</button></div></td></tr>`).join('')}</tbody></table></div>`}
  function adminVideoTable(){return `<div class="panel"><div class="panel-head"><h2>Konten Video</h2><button class="pv2-admin-add" onclick="PV2.adminVideo()">+ Tambah Video</button></div><table><thead><tr><th>Akun</th><th>Caption</th><th>Likes</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${db.videos.map(v=>`<tr><td>@${esc(v.user)}</td><td>${esc(v.caption)}</td><td>${fmt(v.likes)}</td><td><span class="status ${v.status==='Tayang'?'st-terbit':'st-draft'}">${esc(v.status)}</span></td><td><div class="pv2-inline-actions"><button onclick="PV2.adminVideo(${v.id})">Edit</button><button class="pv2-danger" onclick="PV2.deleteVideo(${v.id})">Hapus</button></div></td></tr>`).join('')}</tbody></table></div>`}

  function initAdmin(){
    if(typeof switchTab!=='function'||typeof tabHTML!=='function')return;
    const top=document.querySelector('.content');if(top){const bar=document.createElement('div');bar.className='pv2-statusbar';bar.innerHTML='<strong>V2 aktif.</strong> CRUD, pencarian, loker, shop, video, profil, komentar, notifikasi, backup, dan pengaturan sudah aktif di browser. Midtrans sudah memakai backend Cloudflare Worker. Data lintas pengguna, Google Login, dan keamanan admin produksi tetap membutuhkan backend database/autentikasi penuh.';top.parentNode.insertBefore(bar,top)}
    const nav=document.querySelector('.sb-nav');if(nav){const settingGroup=[...nav.querySelectorAll('.sb-group')].find(x=>x.textContent.trim()==='PENGATURAN');if(settingGroup){settingGroup.insertAdjacentHTML('afterend','<div class="sb-item" data-tab="notifikasi"><span class="ic">🔔</span> Push Notifikasi</div><div class="sb-item" data-tab="backup"><span class="ic">💾</span> Backup / Restore</div>')}}
    const oldTab=tabHTML;window.tabHTML=function(tab){
      if(tab==='artikel')return adminArticleTable();
      if(tab==='loker-list')return adminJobTable();
      if(tab==='loker-pelamar')return `<div class="panel"><div class="panel-head"><h2>Pelamar Loker</h2></div><table><thead><tr><th>Pelamar</th><th>Posisi</th><th>Status</th><th>Tanggal</th><th>Aksi</th></tr></thead><tbody>${db.applications.map(a=>`<tr><td>${esc(a.name)}<br><small>${esc(a.email)}</small></td><td>${esc(a.jobTitle)}</td><td><span class="status ${a.status==='Diterima'?'st-terbit':'st-review'}">${esc(a.status)}</span></td><td>${esc(a.date)}</td><td><div class="pv2-inline-actions"><button onclick="PV2.applicationStatus('${a.id}')">Update</button>${a.cv?`<button onclick="window.open('${esc(a.cv)}','_blank')">CV</button>`:''}</div></td></tr>`).join('')}</tbody></table></div>`;
      if(tab==='shop-produk')return adminProductTable();
      if(tab==='shop-pesanan')return `<div class="panel"><div class="panel-head"><h2>Pesanan Shop</h2></div><table><thead><tr><th>Invoice</th><th>Pembeli</th><th>Total</th><th>Status</th><th>Tanggal</th><th>Aksi</th></tr></thead><tbody>${db.orders.map(o=>`<tr><td>${esc(o.id)}</td><td>${esc(o.buyer)}</td><td>${rupiah(o.total)}</td><td><span class="status st-review">${esc(o.status)}</span></td><td>${esc(o.date)}</td><td><button onclick="PV2.orderStatus('${o.id}')">Update</button></td></tr>`).join('')}</tbody></table></div>`;
      if(tab==='video-konten')return adminVideoTable();
      if(tab==='pengguna')return `<div class="panel"><div class="panel-head"><h2>Pengguna Terdaftar</h2></div><table><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Terdaftar</th></tr></thead><tbody>${db.users.map(u=>`<tr><td>${esc(u.name)}</td><td>${esc(u.email)}</td><td>${esc(u.role||'reader')}</td><td>${esc((u.createdAt||'').slice(0,10))}</td></tr>`).join('')}</tbody></table></div>`;
      if(tab==='gift'||tab==='transaksi')return `<div class="panel"><div class="panel-head"><h2>Gift Author / Transaksi</h2></div><table><thead><tr><th>Pengirim</th><th>Author</th><th>Nominal</th><th>Status</th><th>Tanggal</th></tr></thead><tbody>${db.gifts.map(g=>`<tr><td>${esc(g.userEmail||'Anonim')}</td><td>${esc(g.author||'-')}</td><td>${rupiah(g.amount)}</td><td><span class="status ${g.status==='success'?'st-terbit':'st-review'}">${esc(g.status)}</span></td><td>${esc(g.date||'')}</td></tr>`).join('')}</tbody></table></div>`;
      if(tab==='saldo')return `<div class="panel"><div class="panel-head"><h2>Saldo Author</h2></div><p class="pv2-mini">Saldo produksi dihitung dari transaksi payment gateway yang sudah terverifikasi. Gift demo tidak menambah saldo riil.</p><table><thead><tr><th>Author</th><th>Gift Demo</th><th>Saldo Riil</th></tr></thead><tbody><tr><td>Dini Pratama</td><td>${rupiah(db.gifts.filter(g=>g.author==='Dini Pratama').reduce((s,g)=>s+Number(g.amount||0),0))}</td><td>Rp0</td></tr></tbody></table></div>`;
      if(tab==='withdrawal')return `<div class="panel"><div class="panel-head"><h2>Withdrawal</h2></div><div class="pv2-search-empty">Withdrawal produksi aktif setelah payment gateway, rekening author, dan verifikasi transaksi server-side terhubung.</div></div>`;
      if(tab==='komentar')return `<div class="panel"><div class="panel-head"><h2>Komentar Artikel</h2></div><table><thead><tr><th>Nama</th><th>Komentar</th><th>Reaksi</th><th>Aksi</th></tr></thead><tbody>${getLocal('pv2_article_comments',[]).map(c=>`<tr><td>${esc(c.name)}</td><td>${esc(c.text||'[stiker]')}</td><td>${esc(c.reaction||'-')} · ${c.likes||0}</td><td><button onclick="PV2.deleteComment(${c.id})">Hapus</button></td></tr>`).join('')}</tbody></table></div>`;
      if(tab==='notifikasi')return `<div class="panel"><div class="panel-head"><h2>Push Notifikasi</h2></div><div class="settings-grid"><div class="field"><label>Judul</label><input id="ntTitle" value="Update PURBALINK"></div><div class="field"><label>Target</label><input id="ntTarget" value="Semua Pengguna" disabled></div><div class="field" style="grid-column:1/-1"><label>Pesan</label><input id="ntBody" value="Ada berita terbaru untuk Anda."></div></div><button class="save-btn" onclick="PV2.sendNotification()">Kirim Notifikasi Uji</button><p class="empty-note" style="text-align:left;padding:10px 0">Notifikasi browser lokal aktif. Push lintas perangkat memerlukan Web Push backend dan penyimpanan subscription.</p></div>`;
      if(tab==='backup')return `<div class="panel"><div class="panel-head"><h2>Backup / Restore Data</h2></div><p class="pv2-mini">Ekspor seluruh data V2 sebagai JSON, atau impor kembali untuk memulihkan data browser.</p><div class="pv2-actions" style="justify-content:flex-start"><button class="pv2-btn primary" onclick="PV2.exportData()">Export JSON</button><button class="pv2-btn ghost" onclick="document.getElementById('pv2Import').click()">Import JSON</button><input id="pv2Import" type="file" accept="application/json" style="display:none" onchange="PV2.importData(this.files[0])"></div></div>`;
      if(tab==='pengaturan')return `<div class="panel"><div class="panel-head"><h2>Identitas Website & Integrasi</h2></div><div class="settings-grid"><div class="field"><label>Nama Situs</label><input id="setSiteName" value="${esc(db.settings.siteName)}"></div><div class="field"><label>Tagline</label><input id="setTagline" value="${esc(db.settings.tagline)}"></div><div class="field"><label>Domain</label><input id="setDomain" value="${esc(db.settings.domain)}"></div><div class="field"><label>Email Kontak</label><input id="setEmail" value="${esc(db.settings.email)}"></div><div class="field"><label>API Base (opsional)</label><input id="setApiBase" placeholder="https://api.purbalink.web.id" value="${esc(db.settings.apiBase)}"></div><div class="field"><label>Google Client ID</label><input id="setGoogleClientId" placeholder="xxxx.apps.googleusercontent.com" value="${esc(db.settings.googleClientId)}"></div><div class="field"><label>Fee Gift (%)</label><input id="setFeeGift" type="number" value="${db.settings.feeGift}"></div><div class="field"><label>Fee Shop (%)</label><input id="setFeeShop" type="number" value="${db.settings.feeShop}"></div><div class="field"><label>Payment Gateway</label><input id="setGateway" value="${esc(db.settings.gateway)}"></div><div class="field"><label>Mode Gateway</label><select id="setGatewayMode"><option ${db.settings.gatewayMode==='Sandbox'?'selected':''}>Sandbox</option><option ${db.settings.gatewayMode==='Production'?'selected':''}>Production</option></select></div></div><button class="save-btn" onclick="saveSettings()">Simpan Pengaturan</button><div class="empty-note" id="saveNote" style="display:none;color:var(--green);text-align:left;padding:10px 0">✓ Pengaturan berhasil disimpan.</div></div>`;
      return oldTab(tab);
    };
    window.saveSettings=function(){db.settings.siteName=document.getElementById('setSiteName')?.value.trim()||db.settings.siteName;db.settings.tagline=document.getElementById('setTagline')?.value.trim()||db.settings.tagline;db.settings.domain=document.getElementById('setDomain')?.value.trim()||db.settings.domain;db.settings.email=document.getElementById('setEmail')?.value.trim()||db.settings.email;db.settings.apiBase=document.getElementById('setApiBase')?.value.trim()||'';db.settings.googleClientId=document.getElementById('setGoogleClientId')?.value.trim()||'';db.settings.feeGift=Number(document.getElementById('setFeeGift')?.value||10);db.settings.feeShop=Number(document.getElementById('setFeeShop')?.value||5);db.settings.gateway=document.getElementById('setGateway')?.value.trim()||'Midtrans';db.settings.gatewayMode=document.getElementById('setGatewayMode')?.value||'Sandbox';saveDb();const note=document.getElementById('saveNote');if(note){note.style.display='block';setTimeout(()=>note.style.display='none',2500)}toast('Pengaturan disimpan')};
    const oldRenderFeature=window.renderFeatureList;window.renderFeatureList=function(){if(typeof featureFlags!=='undefined'){featureFlags.forEach(f=>f.on=db.features[f.key]??f.on)}oldRenderFeature()};
    const oldToggle=window.toggleFeature;window.toggleFeature=function(btn,key){oldToggle(btn,key);const f=typeof featureFlags!=='undefined'?featureFlags.find(x=>x.key===key):null;if(f){db.features[key]=f.on;saveDb();toast(`${f.label}: ${f.on?'aktif':'nonaktif'}`)}};
    document.querySelectorAll('.sb-item[data-tab]').forEach(el=>el.onclick=()=>switchTab(el.dataset.tab));
    const added=[...document.querySelectorAll('.sb-item[data-tab="notifikasi"],.sb-item[data-tab="backup"]')];added.forEach(el=>el.addEventListener('click',()=>switchTab(el.dataset.tab)));
    if(typeof titles!=='undefined'){titles.notifikasi='Push Notifikasi';titles.backup='Backup / Restore'}
    window.PV2.adminArticle=function(id){const a=id?db.articles.find(x=>x.id==id):{id:Math.max(0,...db.articles.map(x=>Number(x.id)||0))+1,cat:'NASIONAL',title:'',summary:'',date:new Date().toLocaleDateString('id-ID'),img:'',author:'Tim PURBALINK',status:'Draft',breaking:false,body:''};modal(id?'Edit Artikel':'Tambah Artikel',`<form id="pv2Article"><div class="pv2-grid"><div class="pv2-field full"><label>Judul</label><input id="arTitle" required value="${esc(a.title)}"></div><div class="pv2-field"><label>Kategori</label><input id="arCat" required value="${esc(a.cat)}"></div><div class="pv2-field"><label>Status</label><select id="arStatus"><option ${a.status==='Terbit'?'selected':''}>Terbit</option><option ${a.status==='Review'?'selected':''}>Review</option><option ${a.status==='Draft'?'selected':''}>Draft</option></select></div><div class="pv2-field full"><label>Ringkasan</label><textarea id="arSummary">${esc(a.summary)}</textarea></div><div class="pv2-field full"><label>URL Gambar</label><input id="arImg" value="${esc(a.img)}" placeholder="https://..."></div><div class="pv2-field"><label>Penulis</label><input id="arAuthor" value="${esc(a.author)}"></div><div class="pv2-field"><label>Tanggal</label><input id="arDate" value="${esc(a.date)}"></div><div class="pv2-field full"><label>Isi Artikel</label><textarea id="arBody" style="min-height:180px">${esc(a.body)}</textarea></div><div class="pv2-field full"><label class="pv2-check"><input id="arBreaking" type="checkbox" ${a.breaking?'checked':''}> Jadikan Breaking News</label></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan Artikel</button></div></form>`,m=>m.querySelector('form').onsubmit=e=>{e.preventDefault();Object.assign(a,{title:m.querySelector('#arTitle').value.trim(),cat:m.querySelector('#arCat').value.trim().toUpperCase(),status:m.querySelector('#arStatus').value,summary:m.querySelector('#arSummary').value.trim(),img:m.querySelector('#arImg').value.trim()||seed.articles[0].img,author:m.querySelector('#arAuthor').value.trim()||'Tim PURBALINK',date:m.querySelector('#arDate').value.trim()||new Date().toLocaleDateString('id-ID'),body:m.querySelector('#arBody').value.trim(),breaking:m.querySelector('#arBreaking').checked});if(!id)db.articles.unshift(a);saveDb();closeModal();switchTab('artikel');toast('Artikel disimpan')})};
    window.PV2.deleteArticle=id=>{if(confirm('Hapus artikel ini?')){db.articles=db.articles.filter(x=>x.id!=id);saveDb();switchTab('artikel')}};
    window.PV2.adminJob=function(id){const j=id?db.jobs.find(x=>x.id==id):{id:Math.max(0,...db.jobs.map(x=>Number(x.id)||0))+1,title:'',company:'',loc:'Purbalingga',type:'Full Time',salary:'',posted:'Baru',color:'#0B5ED7',status:'Aktif',desc:'',req:[],about:''};modal(id?'Edit Lowongan':'Tambah Lowongan',`<form><div class="pv2-grid"><div class="pv2-field full"><label>Posisi</label><input id="jbTitle" required value="${esc(j.title)}"></div><div class="pv2-field"><label>Perusahaan</label><input id="jbCompany" required value="${esc(j.company)}"></div><div class="pv2-field"><label>Lokasi</label><input id="jbLoc" value="${esc(j.loc)}"></div><div class="pv2-field"><label>Tipe</label><select id="jbType">${['Full Time','Part Time','Magang','WFH'].map(x=>`<option ${j.type===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="pv2-field"><label>Gaji</label><input id="jbSalary" value="${esc(j.salary)}"></div><div class="pv2-field full"><label>Deskripsi</label><textarea id="jbDesc">${esc(j.desc)}</textarea></div><div class="pv2-field full"><label>Kualifikasi (1 per baris)</label><textarea id="jbReq">${esc((j.req||[]).join('\n'))}</textarea></div><div class="pv2-field full"><label>Tentang perusahaan</label><textarea id="jbAbout">${esc(j.about)}</textarea></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan</button></div></form>`,m=>m.querySelector('form').onsubmit=e=>{e.preventDefault();Object.assign(j,{title:m.querySelector('#jbTitle').value.trim(),company:m.querySelector('#jbCompany').value.trim(),loc:m.querySelector('#jbLoc').value.trim(),type:m.querySelector('#jbType').value,salary:m.querySelector('#jbSalary').value.trim(),desc:m.querySelector('#jbDesc').value.trim(),req:m.querySelector('#jbReq').value.split('\n').map(x=>x.trim()).filter(Boolean),about:m.querySelector('#jbAbout').value.trim()});if(!id)db.jobs.unshift(j);saveDb();closeModal();switchTab('loker-list');toast('Lowongan disimpan')})};
    window.PV2.toggleJob=id=>{const j=db.jobs.find(x=>x.id==id);if(j){j.status=j.status==='Aktif'?'Ditutup':'Aktif';saveDb();switchTab('loker-list')}};
    window.PV2.deleteJob=id=>{if(confirm('Hapus lowongan ini?')){db.jobs=db.jobs.filter(x=>x.id!=id);saveDb();switchTab('loker-list')}};
    window.PV2.adminProduct=function(id){const p=id?db.products.find(x=>x.id==id):{id:Math.max(0,...db.products.map(x=>Number(x.id)||0))+1,name:'',price:0,old:0,disc:0,sold:0,stock:0,loc:'Purbalingga',img:'',shop:'',status:'Aktif',desc:''};modal(id?'Edit Produk':'Tambah Produk',`<form><div class="pv2-grid"><div class="pv2-field full"><label>Nama Produk</label><input id="prName" required value="${esc(p.name)}"></div><div class="pv2-field"><label>Toko</label><input id="prShop" required value="${esc(p.shop)}"></div><div class="pv2-field"><label>Lokasi</label><input id="prLoc" value="${esc(p.loc)}"></div><div class="pv2-field"><label>Harga</label><input id="prPrice" type="number" min="0" value="${p.price}"></div><div class="pv2-field"><label>Harga Lama</label><input id="prOld" type="number" min="0" value="${p.old||0}"></div><div class="pv2-field"><label>Stok</label><input id="prStock" type="number" min="0" value="${p.stock||0}"></div><div class="pv2-field"><label>Status</label><select id="prStatus"><option ${p.status==='Aktif'?'selected':''}>Aktif</option><option ${p.status==='Habis'?'selected':''}>Habis</option></select></div><div class="pv2-field full"><label>URL Gambar</label><input id="prImg" value="${esc(p.img)}"></div><div class="pv2-field full"><label>Deskripsi</label><textarea id="prDesc">${esc(p.desc)}</textarea></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan</button></div></form>`,m=>m.querySelector('form').onsubmit=e=>{e.preventDefault();const price=Number(m.querySelector('#prPrice').value||0),old=Number(m.querySelector('#prOld').value||0);Object.assign(p,{name:m.querySelector('#prName').value.trim(),shop:m.querySelector('#prShop').value.trim(),loc:m.querySelector('#prLoc').value.trim(),price,old,disc:old>price?Math.round((1-price/old)*100):0,stock:Number(m.querySelector('#prStock').value||0),status:m.querySelector('#prStatus').value,img:m.querySelector('#prImg').value.trim()||seed.products[0].img,desc:m.querySelector('#prDesc').value.trim()});if(!id)db.products.unshift(p);saveDb();closeModal();switchTab('shop-produk');toast('Produk disimpan')})};
    window.PV2.deleteProduct=id=>{if(confirm('Hapus produk ini?')){db.products=db.products.filter(x=>x.id!=id);saveDb();switchTab('shop-produk')}};
    window.PV2.adminVideo=function(id){const v=id?db.videos.find(x=>x.id==id):{id:Math.max(0,...db.videos.map(x=>Number(x.id)||0))+1,user:'purbalink.news',caption:'',music:'Audio Asli',img:'',likes:0,status:'Tayang',comments:[]};modal(id?'Edit Video':'Tambah Video',`<form><div class="pv2-grid"><div class="pv2-field"><label>Username</label><input id="vdUser" required value="${esc(v.user)}"></div><div class="pv2-field"><label>Status</label><select id="vdStatus"><option ${v.status==='Tayang'?'selected':''}>Tayang</option><option ${v.status==='Draft'?'selected':''}>Draft</option></select></div><div class="pv2-field full"><label>Caption</label><textarea id="vdCaption">${esc(v.caption)}</textarea></div><div class="pv2-field full"><label>Audio</label><input id="vdMusic" value="${esc(v.music)}"></div><div class="pv2-field full"><label>URL Cover / Media</label><input id="vdImg" value="${esc(v.img)}"></div></div><div class="pv2-actions"><button type="button" class="pv2-btn ghost" onclick="PV2.closeModal()">Batal</button><button class="pv2-btn primary">Simpan</button></div></form>`,m=>m.querySelector('form').onsubmit=e=>{e.preventDefault();Object.assign(v,{user:m.querySelector('#vdUser').value.trim().replace(/^@/,''),status:m.querySelector('#vdStatus').value,caption:m.querySelector('#vdCaption').value.trim(),music:m.querySelector('#vdMusic').value.trim(),img:m.querySelector('#vdImg').value.trim()||seed.videos[0].img});if(!id)db.videos.unshift(v);saveDb();closeModal();switchTab('video-konten');toast('Video disimpan')})};
    window.PV2.deleteVideo=id=>{if(confirm('Hapus video ini?')){db.videos=db.videos.filter(x=>x.id!=id);saveDb();switchTab('video-konten')}};
    window.PV2.applicationStatus=id=>{const a=db.applications.find(x=>x.id===id);if(!a)return;const opts=['Menunggu','Diproses','Diterima','Ditolak'];const next=prompt('Status: '+opts.join(' / '),a.status);if(next&&opts.includes(next)){a.status=next;saveDb();switchTab('loker-pelamar')}};
    window.PV2.orderStatus=id=>{const o=db.orders.find(x=>x.id===id);if(!o)return;const opts=['Menunggu Pembayaran','Diproses','Dikirim','Selesai','Dibatalkan'];const next=prompt('Status: '+opts.join(' / '),o.status);if(next&&opts.includes(next)){o.status=next;saveDb();switchTab('shop-pesanan')}};
    window.PV2.deleteComment=id=>{let list=getLocal('pv2_article_comments',[]);list=list.filter(c=>c.id!=id&&c.parent!=id);setLocal('pv2_article_comments',list);switchTab('komentar');toast('Komentar dihapus')};
    window.PV2.sendNotification=async()=>{const title=document.getElementById('ntTitle')?.value||'PURBALINK';const body=document.getElementById('ntBody')?.value||'';db.notifications.unshift({id:uid('nt'),title,body,date:new Date().toISOString()});saveDb();if('Notification'in window){const p=await Notification.requestPermission();if(p==='granted'){const reg=await navigator.serviceWorker?.ready;reg?reg.showNotification(title,{body,icon:'icon-192.png'}):new Notification(title,{body})}}toast('Notifikasi uji dikirim pada perangkat ini')};
    window.PV2.exportData=()=>download(`purbalink-backup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(db,null,2));
    window.PV2.importData=file=>{if(!file)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d||typeof d!=='object')throw new Error();db=Object.assign(clone(seed),d);saveDb();toast('Data berhasil diimpor');setTimeout(()=>location.reload(),700)}catch(_){toast('File backup tidak valid')}};r.readAsText(file)};
    switchTab('dashboard');
  }


  function defaultAdsConfig(){
    return {enabled:true,provider:'mixed',adsenseClient:'',lazy:true,slots:[
      {id:'top-header',name:'Atas Header',type:'banner',provider:'direct',enabled:true,placement:'top-header',image:'',url:'',adsenseSlot:''},
      {id:'header-banner',name:'Banner Header',type:'banner',provider:'adsense',enabled:true,placement:'header-banner',image:'',url:'',adsenseSlot:''},
      {id:'home-native',name:'Native Beranda',type:'native',provider:'direct',enabled:true,placement:'home-native',image:'',url:'',adsenseSlot:''},
      {id:'article-top',name:'Artikel Atas',type:'in-article',provider:'adsense',enabled:true,placement:'article-top',image:'',url:'',adsenseSlot:''},
      {id:'article-middle',name:'Artikel Tengah',type:'in-article',provider:'adsense',enabled:true,placement:'article-middle',image:'',url:'',adsenseSlot:''},
      {id:'article-bottom',name:'Artikel Bawah',type:'in-article',provider:'direct',enabled:true,placement:'article-bottom',image:'',url:'',adsenseSlot:''},
      {id:'footer-banner',name:'Banner Footer',type:'banner',provider:'direct',enabled:true,placement:'footer-banner',image:'',url:'',adsenseSlot:''},
      {id:'anchor',name:'Anchor',type:'anchor',provider:'adsense',enabled:true,placement:'anchor',image:'',url:'',adsenseSlot:''},
      {id:'reward',name:'Reward',type:'reward',provider:'direct',enabled:true,placement:'reward',image:'',url:'',adsenseSlot:''}
    ]};
  }
  function adsConfig(){
    if(!db.ads){db.ads=defaultAdsConfig();saveDb()}
    if(!Array.isArray(db.ads.slots))db.ads.slots=defaultAdsConfig().slots;
    return db.ads
  }
  let adsenseLoading=null;
  function ensureAdsense(){
    const a=adsConfig(),client=(a.adsenseClient||'').trim();
    if(!client)return Promise.reject(new Error('AdSense Client ID belum diatur'));
    if(window.adsbygoogle)return Promise.resolve();
    if(adsenseLoading)return adsenseLoading;
    adsenseLoading=new Promise((resolve,reject)=>{
      const sc=document.createElement('script');sc.async=true;sc.crossOrigin='anonymous';
      sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(client);
      sc.onload=resolve;sc.onerror=()=>reject(new Error('Gagal memuat AdSense'));document.head.appendChild(sc);
    });
    return adsenseLoading;
  }
  function validDirect(slot){return !!String(slot.image||'').trim()}
  function validAdsense(slot){const a=adsConfig();return !!String(a.adsenseClient||'').trim()&&!!String(slot.adsenseSlot||'').trim()}
  function mountAdContent(box,slot){
    if(box.dataset.loaded==='1')return;
    if(slot.provider==='adsense'){
      if(!validAdsense(slot)){box.remove();return}
      box.dataset.loaded='1';box.innerHTML='<div class="pv2-ad-label">'+esc(slot.label||'Advertisement')+'</div><ins class="adsbygoogle" style="display:block" data-ad-client="'+esc(adsConfig().adsenseClient)+'" data-ad-slot="'+esc(slot.adsenseSlot)+'" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      ensureAdsense().then(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(_){}}).catch(()=>box.remove());
    }else{
      if(!validDirect(slot)){box.remove();return}
      box.dataset.loaded='1';
      const img='<img loading="lazy" decoding="async" src="'+esc(slot.image)+'" alt="'+esc(slot.name||'Iklan')+'">';
      box.innerHTML='<div class="pv2-ad-label">'+esc(slot.label||'Sponsored')+'</div>'+(slot.url?'<a href="'+esc(slot.url)+'" target="_blank" rel="sponsored noopener">'+img+'</a>':img);
    }
  }
  function makeAd(slot){
    const box=document.createElement('div');box.className='pv2-ad pv2-ad-'+String(slot.type||'banner').replace(/[^a-z0-9-]/gi,'');box.dataset.adSlot=slot.id;
    if(adsConfig().lazy&&'IntersectionObserver'in window&&slot.type!=='anchor'){
      const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){io.disconnect();mountAdContent(box,slot)}})},{rootMargin:'450px 0px'});
      io.observe(box);
    }else mountAdContent(box,slot);
    return box
  }
  function putAd(slot,target,where){
    if(!target||document.querySelector('[data-ad-slot="'+slot.id+'"]'))return;
    const box=makeAd(slot);if(where==='before')target.parentNode.insertBefore(box,target);else if(where==='after')target.parentNode.insertBefore(box,target.nextSibling);else target.appendChild(box)
  }
  function renderAds(){
    document.querySelectorAll('.pv2-ad').forEach(x=>x.remove());
    if(page==='admin-dashboard.html')return;
    const a=adsConfig();if(!a.enabled)return;
    const active=a.slots.filter(x=>x.enabled!==false);
    const by=p=>active.find(x=>x.placement===p);
    let s;
    if((s=by('top-header'))){const h=document.querySelector('.p6-header,.pl-global-header,header.site,header');putAd(s,h,'before')}
    if((s=by('header-banner'))){const h=document.querySelector('.p6-header,.pl-global-header,header.site,header');putAd(s,h,'after')}
    if((s=by('home-native'))&&document.getElementById('homeView')){const t=document.querySelector('.p6-quick,.p6-popular-box,#newsGrid');putAd(s,t,'after')}
    const body=document.querySelector('#detailView .art-body,.article-wrap .art-body');
    if(body){
      if((s=by('article-top')))putAd(s,body,'before');
      if((s=by('article-middle'))){
        const ps=body.querySelectorAll('p');const p=ps[Math.min(3,Math.max(0,Math.floor(ps.length/2)))];
        if(p)putAd(s,p,'after');else putAd(s,body,'after')
      }
      if((s=by('article-bottom'))){const tags=document.querySelector('#detailView .article-tags,.article-wrap .article-tags');putAd(s,tags||body,'before')}
    }
    if((s=by('footer-banner'))){const ft=document.querySelector('.p6-footer,footer');putAd(s,ft,'before')}
    if((s=by('anchor'))){
      const box=makeAd(s);box.classList.add('pv2-ad-anchor');const close=document.createElement('button');close.className='pv2-ad-close';close.type='button';close.textContent='×';close.onclick=()=>box.remove();box.appendChild(close);document.body.appendChild(box)
    }
  }
  window.PV2.showRewardAd=function(onReward){
    const slot=adsConfig().slots.find(x=>x.placement==='reward'&&x.enabled!==false);
    if(!adsConfig().enabled||!slot){if(onReward)onReward();return}
    const html='<div class="pv2-reward"><div class="pv2-ad-label">'+esc(slot.label||'Reward')+'</div>'+(slot.image?'<img src="'+esc(slot.image)+'" alt="Reward Ad">':'<div class="pv2-reward-placeholder">Reward Ad siap dihubungkan ke jaringan iklan reward.</div>')+'<p>Tonton iklan untuk membuka bonus atau konten tambahan.</p><div class="pv2-actions"><button class="pv2-btn ghost" onclick="PV2.closeModal()">Nanti</button><button class="pv2-btn primary" id="rewardDone">Selesai & Klaim</button></div></div>';
    modal('Reward Ad',html,m=>{const b=m.querySelector('#rewardDone');if(b)b.onclick=()=>{closeModal();if(onReward)onReward()}});
  };
  window.PV2.renderAds=renderAds;
  window.PV2.renderTrending=()=>{try{renderTrendingStrip()}catch(_){}};

  function initStaticPages(){
    document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  }

  ensureSharedChrome();
  applyGlobal();
  if(page==='index.html'||page==='purbalink-home.html'||page==='')initHome();
  if(page==='login.html'||page==='register.html')initAuth();
  if(page==='loker.html')initLoker();
  if(page==='shop.html')initShop();
  if(page==='video.html')initVideo();
  if(page==='profile.html')initProfile();
  if(page==='admin-dashboard.html')initAdmin();
  initStaticPages();
  setTimeout(renderAds,80);
})();
