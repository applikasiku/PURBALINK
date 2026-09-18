
(function(){
'use strict';
var ADMIN_KEY='purbalink_admin_v5';
function D(){return window.PV2&&PV2.db?PV2.db():null}
function SD(){if(window.PV2&&PV2.saveDb)PV2.saveDb()}
function E(v){return window.PV2&&PV2.esc?PV2.esc(v):String(v||'').replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]})}
function RP(n){return window.PV2&&PV2.rupiah?PV2.rupiah(n):'Rp'+Number(n||0).toLocaleString('id-ID')}
function UID(p){return p+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7)}
function today(){return new Date().toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'})}
var seed={
 comments:[
  {id:'c1',name:'Budi Santoso',text:'Beritanya sangat informatif...',article:'Pemulihan Gunung Lewotobi',time:'2 jam lalu',status:'Tayang'},
  {id:'c2',name:'Sari Dewi',text:'Setuju Pak Budi.',article:'Pemulihan Gunung Lewotobi',time:'1 jam lalu',status:'Tayang'},
  {id:'c3',name:'Ahmad Rizki',text:'Pemerintah harus memastikan relokasi...',article:'Pemulihan Gunung Lewotobi',time:'3 jam lalu',status:'Tayang'}
 ],
 reports:[{id:'rep1',name:'Anonim',text:'Komentar berisi kata tidak pantas...',article:'Artikel terkait',status:'Baru'}],
 videoModeration:[
  {id:'vm1',user:'@akun_baru01',caption:'Konten mengandung watermark aplikasi lain',reason:'Duplikat konten',status:'Menunggu'},
  {id:'vm2',user:'@promo_random',caption:'Diduga spam promosi berulang',reason:'Spam',status:'Menunggu'}
 ],
 sellers:[
  {id:'s1',name:'UMKM Bu Siti',produk:12,rating:'4.8',status:'Terverifikasi'},
  {id:'s2',name:'Purbalink Apparel',produk:28,rating:'4.6',status:'Terverifikasi'},
  {id:'s3',name:'Raihaana Kids Store',produk:45,rating:'4.9',status:'Terverifikasi'},
  {id:'s4',name:'Kerajinan Rahayu',produk:6,rating:'4.5',status:'Menunggu Verifikasi'}
 ],
 withdrawals:[{id:'wd1',name:'Dini Pratama',amount:1000000,date:'12 Okt 2024',status:'Menunggu'}],
 stickers:[
  {id:'react-suka',label:'Suka',file:'SUKA.gif',type:'reaction',active:true},
  {id:'react-love',label:'Love',file:'LOVE.gif',type:'reaction',active:true},
  {id:'react-haha',label:'Hahaha',file:'HAHAHA.gif',type:'reaction',active:true},
  {id:'react-heran',label:'Heran',file:'HERAN.gif',type:'reaction',active:true},
  {id:'react-sedih',label:'Sedih',file:'SEDIH.gif',type:'reaction',active:true},
  {id:'react-marah',label:'Marah',file:'MARAH.gif',type:'reaction',active:true},
  {id:'react-gabung',label:'Gabung',file:'GABUNG.gif',type:'reaction',active:true}
 ],
 media:{giphyEnabled:true,giphyRating:'g',giphyLimit:24,giphyApiKey:''},
 notifications:[
  {id:'n1',text:'Komentar baru menunggu moderasi',read:false},
  {id:'n2',text:'Video baru menunggu moderasi',read:false},
  {id:'n3',text:'Withdrawal baru menunggu diproses',read:false}
 ]
};
function clone(v){return JSON.parse(JSON.stringify(v))}
function loadA(){try{var x=JSON.parse(localStorage.getItem(ADMIN_KEY)||'null');if(x){var o=Object.assign(clone(seed),x);o.media=Object.assign({},seed.media,x.media||{});return o}}catch(e){}return clone(seed)}
var A=loadA();
function SA(){localStorage.setItem(ADMIN_KEY,JSON.stringify(A))}
function toast(msg,type){
 var el=document.getElementById('adminV5Toast');
 if(!el){el=document.createElement('div');el.id='adminV5Toast';el.className='admin-v5-toast';document.body.appendChild(el)}
 el.textContent=msg;el.dataset.type=type||'ok';el.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(function(){el.classList.remove('show')},2200)
}
function openM(title,html,onOpen){
 var b=document.getElementById('adminV5Modal');
 if(!b){b=document.createElement('div');b.id='adminV5Modal';b.className='admin-v5-modal-back';b.innerHTML='<div class="admin-v5-modal"><div class="admin-v5-modal-head"><h3></h3><button type="button" data-close>×</button></div><div class="admin-v5-modal-body"></div></div>';b.addEventListener('click',function(e){if(e.target===b||e.target.closest('[data-close]'))closeM()});document.body.appendChild(b)}
 b.querySelector('h3').textContent=title;b.querySelector('.admin-v5-modal-body').innerHTML=html;b.classList.add('show');setTimeout(function(){var q=b.querySelector('input,textarea,select');if(q)q.focus();if(onOpen)onOpen(b)},0);return b
}
function closeM(){var b=document.getElementById('adminV5Modal');if(b)b.classList.remove('show')}
function confirmA(msg,fn){openM('Konfirmasi','<p class="admin-v5-confirm">'+E(msg)+'</p><div class="admin-v5-actions"><button class="a-btn ghost" data-close>Batal</button><button class="a-btn danger" id="confirmYes">Ya, lanjutkan</button></div>',function(m){m.querySelector('#confirmYes').onclick=function(){closeM();fn()}})}
function FD(f){return Object.fromEntries(new FormData(f).entries())}
function SC(s){return ['Terbit','Aktif','Tayang','Diterima','Selesai','Terverifikasi','Dikirim'].indexOf(s)>=0?'st-terbit':['Review','Menunggu','Diproses','Menunggu Verifikasi','Menunggu Pembayaran'].indexOf(s)>=0?'st-review':'st-draft'}
function table(title,heads,rows,action){
 var h='<div class="panel"><div class="panel-head"><h2>'+E(title)+'</h2>'+(action||'')+'</div><div class="admin-v5-tablewrap"><table><thead><tr>';
 heads.forEach(function(x){h+='<th>'+E(x)+'</th>'});h+='</tr></thead><tbody>'+((rows&&rows.length)?rows:'<tr><td colspan="'+heads.length+'"><div class="admin-v5-empty">Belum ada data.</div></td></tr>')+'</tbody></table></div></div>';return h
}
function refresh(tab){switchTabV5(tab||window.__adminV5Tab||'dashboard')}

function dashboard(){
 var d=D()||{articles:[],jobs:[],products:[],orders:[],moderation:[]};
 var pending=(d.moderation||[]).length+A.videoModeration.filter(function(x){return x.status==='Menunggu'}).length;
 var unread=A.notifications.filter(function(x){return !x.read}).length;
 var html='<div class="admin-v5-quick"><button onclick="AdminV5.articleForm()">＋ Artikel</button><button onclick="AdminV5.jobForm()">＋ Lowongan</button><button onclick="AdminV5.productForm()">＋ Produk</button><button onclick="switchTab(\'media-interaksi\')">🧩 Sticker & GIF</button><button onclick="switchTab(\'integrasi\')">🔌 Cek Integrasi</button></div>';
 html+='<div class="admin-v5-kpis"><div><b>'+d.articles.length+'</b><span>Artikel</span></div><div><b>'+d.jobs.filter(function(x){return x.status==='Aktif'}).length+'</b><span>Lowongan aktif</span></div><div><b>'+d.products.filter(function(x){return x.status==='Aktif'}).length+'</b><span>Produk aktif</span></div><div><b>'+((d.orders||[]).length)+'</b><span>Pesanan</span></div><div><b>'+pending+'</b><span>Moderasi</span></div><div><b>'+unread+'</b><span>Notifikasi</span></div></div>';
 return html+(window.dashboardHTML?dashboardHTML():'')
}
function articleRows(){
 var d=D(),h='';
 d.articles.forEach(function(a){h+='<tr><td>'+E(a.title)+'</td><td>'+E(a.cat)+'</td><td><span class="status '+SC(a.status)+'">'+E(a.status)+'</span></td><td>'+E(a.date)+'</td><td class="row-actions"><button onclick="AdminV5.articleForm(\''+a.id+'\')">Edit</button><button onclick="AdminV5.toggleArticle(\''+a.id+'\')">'+(a.status==='Terbit'?'Unpublish':'Terbitkan')+'</button><button onclick="AdminV5.deleteArticle(\''+a.id+'\')">Hapus</button></td></tr>'});return h
}
function articlePage(){
 return '<div class="article-admin-head"><div><h2>Manajemen Artikel / Berita</h2><p>Kelola artikel yang langsung dipakai frontend PURBALINK.</p></div><div class="admin-v5-inline-actions"><button class="a-btn primary" onclick="AdminV5.articleForm()">+ Artikel Baru</button><button class="a-btn primary" onclick="openArticleGenerator()">AI Generator</button></div></div><div class="tabbar" id="articleTabbar"><button class="active" data-article-mode="list" onclick="switchArticleSubtab(this,\'list\')">Daftar Artikel</button><button data-article-mode="generator" onclick="switchArticleSubtab(this,\'generator\')">AI Article Generator</button></div><div id="articleSubtabList">'+table('Semua Artikel',['Judul','Kategori','Status','Tanggal','Aksi'],articleRows())+'</div><div id="articleSubtabGenerator" style="display:none">'+(window.articleGeneratorHTML?articleGeneratorHTML():'')+'</div>'
}
function articleForm(id){
 id=id||'';var d=D(),a=d.articles.find(function(x){return String(x.id)===String(id)})||{title:'',cat:'DAERAH',summary:'',date:new Date().toLocaleString('id-ID'),img:'',author:'Tim PURBALINK',status:'Draft',body:'',breaking:false};
 var cats=['DAERAH','NASIONAL','POLITIK','EKONOMI','BISNIS','TEKNOLOGI','OLAHRAGA','GAYA HIDUP','HIBURAN','OTOMOTIF'],statuses=['Draft','Review','Terbit'],co='',so='';
 cats.forEach(function(x){co+='<option '+(x===a.cat?'selected':'')+'>'+x+'</option>'});statuses.forEach(function(x){so+='<option '+(x===a.status?'selected':'')+'>'+x+'</option>'});
 var h='<form id="v5ArticleForm"><div class="admin-v5-form"><label class="full">Judul<input name="title" required value="'+E(a.title)+'"></label><label>Kategori<select name="cat">'+co+'</select></label><label>Status<select name="status">'+so+'</select></label><label>Penulis<input name="author" value="'+E(a.author||'Tim PURBALINK')+'"></label><label>Tanggal<input name="date" value="'+E(a.date||'')+'"></label><label class="full">URL Gambar<input name="img" value="'+E(a.img||'')+'"></label><label class="full">Ringkasan<textarea name="summary">'+E(a.summary||'')+'</textarea></label><label class="full">Isi Artikel<textarea name="body" class="tall">'+E(a.body||'')+'</textarea></label><label class="check full"><input type="checkbox" name="breaking" '+(a.breaking?'checked':'')+'> Breaking News</label></div><div class="admin-v5-actions"><button type="button" class="a-btn ghost" data-close>Batal</button><button class="a-btn primary">Simpan</button></div></form>';
 openM(id?'Edit Artikel':'Artikel Baru',h,function(m){m.querySelector('#v5ArticleForm').onsubmit=function(e){e.preventDefault();var x=FD(e.currentTarget);x.breaking=e.currentTarget.breaking.checked;if(id)Object.assign(a,x);else d.articles.unshift(Object.assign(x,{id:Date.now()}));SD();closeM();toast('Artikel tersimpan');refresh('artikel')}})
}
function toggleArticle(id){var a=D().articles.find(function(x){return String(x.id)===String(id)});if(!a)return;a.status=a.status==='Terbit'?'Draft':'Terbit';SD();toast(a.status==='Terbit'?'Artikel diterbitkan':'Artikel di-unpublish');refresh('artikel')}
function deleteArticle(id){confirmA('Hapus artikel ini?',function(){var d=D();d.articles=d.articles.filter(function(x){return String(x.id)!==String(id)});SD();toast('Artikel dihapus');refresh('artikel')})}

function commentsPage(){var r='';A.comments.forEach(function(c){r+='<tr><td>'+E(c.name)+'</td><td>'+E(c.text)+'</td><td>'+E(c.article)+'</td><td>'+E(c.time)+'</td><td><span class="status '+SC(c.status)+'">'+E(c.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.toggleComment(\''+c.id+'\')">'+(c.status==='Tayang'?'Sembunyikan':'Tampilkan')+'</button><button onclick="AdminV5.deleteComment(\''+c.id+'\')">Hapus</button></td></tr>'});return table('Semua Komentar',['Pengguna','Komentar','Artikel','Waktu','Status','Aksi'],r)}
function toggleComment(id){var c=A.comments.find(function(x){return x.id===id});if(!c)return;c.status=c.status==='Tayang'?'Disembunyikan':'Tayang';SA();toast('Status komentar diperbarui');refresh('komentar')}
function deleteComment(id){confirmA('Hapus komentar ini?',function(){A.comments=A.comments.filter(function(x){return x.id!==id});SA();toast('Komentar dihapus');refresh('komentar')})}

function moderationPage(kind){
 var list=kind==='video'?A.videoModeration:((D().moderation)||[]);
 var h='<div class="panel"><div class="panel-head"><h2>'+(kind==='video'?'Moderasi Video':'Moderasi Komentar')+'</h2><span class="admin-v5-chip">'+list.length+' antrian</span></div>';
 if(!list.length)h+='<div class="admin-v5-empty">Tidak ada antrian moderasi.</div>';
 list.forEach(function(x){h+='<div class="mod-item"><div class="mod-meta"><b>'+E(x.name||x.user||'Pengguna')+'</b>'+(x.reason?' · '+E(x.reason):'')+'</div><div class="mod-text">'+E(x.text||x.caption||x.reason||'')+'</div><div class="mod-actions"><button class="btn-approve" onclick="AdminV5.moderate(\''+kind+'\',\''+x.id+'\',\'approve\')">Setujui</button><button class="btn-reject" onclick="AdminV5.moderate(\''+kind+'\',\''+x.id+'\',\'reject\')">Tolak / Hapus</button></div></div>'});
 return h+'</div>'
}
function moderate(kind,id,action){if(kind==='video'){A.videoModeration=A.videoModeration.filter(function(x){return String(x.id)!==String(id)});SA()}else{var d=D();d.moderation=(d.moderation||[]).filter(function(x){return String(x.id)!==String(id)});SD()}toast(action==='approve'?'Konten disetujui':'Konten ditolak');refresh(kind==='video'?'video-moderasi':'moderasi')}

function reportsPage(){var r='';A.reports.forEach(function(x){r+='<tr><td>'+E(x.name)+'</td><td>'+E(x.text)+'</td><td>'+E(x.article)+'</td><td><span class="status '+SC(x.status)+'">'+E(x.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.toggleReport(\''+x.id+'\')">'+(x.status==='Selesai'?'Buka Lagi':'Selesaikan')+'</button></td></tr>'});return table('Laporan Komentar',['Pelapor','Isi','Artikel','Status','Aksi'],r)}
function toggleReport(id){var x=A.reports.find(function(v){return v.id===id});x.status=x.status==='Selesai'?'Baru':'Selesai';SA();toast('Laporan diperbarui');refresh('laporan')}

function jobsPage(){var r='';D().jobs.forEach(function(j){r+='<tr><td>'+E(j.title)+'</td><td>'+E(j.company)+'</td><td>'+E(j.loc)+'</td><td>'+E(j.type)+'</td><td><span class="status '+SC(j.status)+'">'+E(j.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.jobForm(\''+j.id+'\')">Edit</button><button onclick="AdminV5.toggleJob(\''+j.id+'\')">'+(j.status==='Aktif'?'Tutup':'Buka')+'</button><button onclick="AdminV5.deleteJob(\''+j.id+'\')">Hapus</button></td></tr>'});return table('Lowongan Kerja',['Posisi','Perusahaan','Lokasi','Tipe','Status','Aksi'],r,'<button class="a-btn primary" onclick="AdminV5.jobForm()">+ Tambah Lowongan</button>')}
function jobForm(id){
 id=id||'';var d=D(),j=d.jobs.find(function(x){return String(x.id)===String(id)})||{title:'',company:'',loc:'Purbalingga',type:'Full Time',salary:'',posted:'Baru',color:'#0B5ED7',status:'Aktif',desc:'',req:[],about:''};
 var types=['Full Time','Part Time','Magang','WFH'],to='';types.forEach(function(x){to+='<option '+(x===j.type?'selected':'')+'>'+x+'</option>'});
 var h='<form id="v5JobForm"><div class="admin-v5-form"><label class="full">Posisi<input name="title" required value="'+E(j.title)+'"></label><label>Perusahaan<input name="company" required value="'+E(j.company)+'"></label><label>Lokasi<input name="loc" value="'+E(j.loc||'')+'"></label><label>Tipe<select name="type">'+to+'</select></label><label>Gaji<input name="salary" value="'+E(j.salary||'')+'"></label><label>Status<select name="status"><option '+(j.status==='Aktif'?'selected':'')+'>Aktif</option><option '+(j.status!=='Aktif'?'selected':'')+'>Ditutup</option></select></label><label class="full">Deskripsi<textarea name="desc">'+E(j.desc||'')+'</textarea></label><label class="full">Persyaratan (1 per baris)<textarea name="reqText">'+E((j.req||[]).join('\n'))+'</textarea></label><label class="full">Tentang Perusahaan<textarea name="about">'+E(j.about||'')+'</textarea></label></div><div class="admin-v5-actions"><button type="button" class="a-btn ghost" data-close>Batal</button><button class="a-btn primary">Simpan</button></div></form>';
 openM(id?'Edit Lowongan':'Tambah Lowongan',h,function(m){m.querySelector('#v5JobForm').onsubmit=function(e){e.preventDefault();var x=FD(e.currentTarget);x.req=String(x.reqText||'').split('\n').map(function(v){return v.trim()}).filter(Boolean);delete x.reqText;if(id)Object.assign(j,x);else d.jobs.unshift(Object.assign({},j,x,{id:Date.now()}));SD();closeM();toast('Lowongan tersimpan');refresh('loker-list')}})
}
function toggleJob(id){var j=D().jobs.find(function(x){return String(x.id)===String(id)});j.status=j.status==='Aktif'?'Ditutup':'Aktif';SD();toast('Status lowongan diperbarui');refresh('loker-list')}
function deleteJob(id){confirmA('Hapus lowongan ini?',function(){var d=D();d.jobs=d.jobs.filter(function(x){return String(x.id)!==String(id)});SD();toast('Lowongan dihapus');refresh('loker-list')})}

function applicantsPage(){var r='';(D().applications||[]).forEach(function(a){r+='<tr><td>'+E(a.name||a.userEmail||'-')+'</td><td>'+E(a.jobTitle||a.job||'-')+'</td><td><span class="status '+SC(a.status||'Menunggu')+'">'+E(a.status||'Menunggu')+'</span></td><td>'+E(a.date||'-')+'</td><td class="row-actions"><button onclick="AdminV5.viewApplicant(\''+a.id+'\')">Detail</button><button onclick="AdminV5.advanceApplicant(\''+a.id+'\')">Update</button></td></tr>'});return table('Pelamar Loker',['Pelamar','Posisi','Status','Tanggal','Aksi'],r)}
function viewApplicant(id){var a=(D().applications||[]).find(function(x){return String(x.id)===String(id)});if(!a)return;openM('Detail Pelamar','<div class="admin-v5-detail"><b>'+E(a.name||'-')+'</b><p>'+E(a.jobTitle||a.job||'-')+'</p><p>Email: '+E(a.email||a.userEmail||'-')+'</p><p>WhatsApp: '+E(a.phone||'-')+'</p><p>CV: '+(a.cv?'<a href="'+E(a.cv)+'" target="_blank">Buka CV</a>':'-')+'</p><p>Pesan: '+E(a.note||'-')+'</p></div>')}
function advanceApplicant(id){var a=(D().applications||[]).find(function(x){return String(x.id)===String(id)});if(!a)return;var seq=['Menunggu','Diproses','Diterima','Ditolak'];a.status=seq[(seq.indexOf(a.status||'Menunggu')+1)%seq.length];SD();toast('Status pelamar: '+a.status);refresh('loker-pelamar')}

function productsPage(){var r='';D().products.forEach(function(p){r+='<tr><td>'+E(p.name)+'</td><td>'+E(p.shop||'-')+'</td><td>'+RP(p.price)+'</td><td>'+Number(p.stock||0)+'</td><td><span class="status '+SC(p.status)+'">'+E(p.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.productForm(\''+p.id+'\')">Edit</button><button onclick="AdminV5.deleteProduct(\''+p.id+'\')">Hapus</button></td></tr>'});return table('Produk Shop',['Produk','Toko','Harga','Stok','Status','Aksi'],r,'<button class="a-btn primary" onclick="AdminV5.productForm()">+ Tambah Produk</button>')}
function productForm(id){
 id=id||'';var d=D(),p=d.products.find(function(x){return String(x.id)===String(id)})||{name:'',price:0,old:0,disc:0,sold:0,stock:0,loc:'Purbalingga',img:'',shop:'',status:'Aktif',desc:''};
 var h='<form id="v5ProductForm"><div class="admin-v5-form"><label class="full">Nama Produk<input name="name" required value="'+E(p.name)+'"></label><label>Toko<input name="shop" required value="'+E(p.shop||'')+'"></label><label>Lokasi<input name="loc" value="'+E(p.loc||'')+'"></label><label>Harga<input name="price" type="number" min="0" value="'+Number(p.price||0)+'"></label><label>Harga Lama<input name="old" type="number" min="0" value="'+Number(p.old||0)+'"></label><label>Diskon %<input name="disc" type="number" min="0" max="100" value="'+Number(p.disc||0)+'"></label><label>Stok<input name="stock" type="number" min="0" value="'+Number(p.stock||0)+'"></label><label>Status<select name="status"><option '+(p.status==='Aktif'?'selected':'')+'>Aktif</option><option '+(p.status!=='Aktif'?'selected':'')+'>Habis</option></select></label><label class="full">URL Gambar<input name="img" value="'+E(p.img||'')+'"></label><label class="full">Deskripsi<textarea name="desc">'+E(p.desc||'')+'</textarea></label></div><div class="admin-v5-actions"><button type="button" class="a-btn ghost" data-close>Batal</button><button class="a-btn primary">Simpan</button></div></form>';
 openM(id?'Edit Produk':'Tambah Produk',h,function(m){m.querySelector('#v5ProductForm').onsubmit=function(e){e.preventDefault();var x=FD(e.currentTarget);['price','old','disc','stock'].forEach(function(k){x[k]=Number(x[k])||0});if(id)Object.assign(p,x);else d.products.unshift(Object.assign({},p,x,{id:Date.now()}));SD();closeM();toast('Produk tersimpan');refresh('shop-produk')}})
}
function deleteProduct(id){confirmA('Hapus produk ini?',function(){var d=D();d.products=d.products.filter(function(x){return String(x.id)!==String(id)});SD();toast('Produk dihapus');refresh('shop-produk')})}

function ordersPage(){var r='';(D().orders||[]).forEach(function(o){r+='<tr><td>'+E(o.id||'-')+'</td><td>'+E(o.buyer||o.userEmail||'-')+'</td><td>'+RP(o.total||0)+'</td><td><span class="status '+SC(o.status||'Diproses')+'">'+E(o.status||'Diproses')+'</span></td><td>'+E(o.date||'-')+'</td><td class="row-actions"><button onclick="AdminV5.advanceOrder(\''+o.id+'\')">Update</button><button onclick="AdminV5.viewOrder(\''+o.id+'\')">Detail</button></td></tr>'});return table('Pesanan',['Invoice','Pembeli','Total','Status','Tanggal','Aksi'],r)}
function advanceOrder(id){var o=(D().orders||[]).find(function(x){return String(x.id)===String(id)});if(!o)return;var seq=['Diproses','Dikirim','Selesai','Dibatalkan'];o.status=seq[(seq.indexOf(o.status||'Diproses')+1)%seq.length];SD();toast('Status pesanan: '+o.status);refresh('shop-pesanan')}
function viewOrder(id){var o=(D().orders||[]).find(function(x){return String(x.id)===String(id)});if(!o)return;openM('Detail Pesanan','<div class="admin-v5-detail"><p><b>'+E(o.id)+'</b></p><p>Pembeli: '+E(o.buyer||o.userEmail||'-')+'</p><p>WhatsApp: '+E(o.phone||'-')+'</p><p>Alamat: '+E(o.address||'-')+'</p><p>Pembayaran: '+E(o.payment||'-')+'</p><p>Total: <b>'+RP(o.total||0)+'</b></p></div>')}

function sellersPage(){var r='';A.sellers.forEach(function(s){r+='<tr><td>'+E(s.name)+'</td><td>'+s.produk+'</td><td>'+E(s.rating)+' ★</td><td><span class="status '+SC(s.status)+'">'+E(s.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.toggleSeller(\''+s.id+'\')">'+(s.status==='Terverifikasi'?'Tangguhkan':'Verifikasi')+'</button></td></tr>'});return table('Toko / Seller',['Nama Toko','Produk','Rating','Status','Aksi'],r)}
function toggleSeller(id){var s=A.sellers.find(function(x){return x.id===id});s.status=s.status==='Terverifikasi'?'Ditangguhkan':'Terverifikasi';SA();toast('Status seller diperbarui');refresh('shop-toko')}

function videosPage(){var r='';D().videos.forEach(function(v){r+='<tr><td>@'+E(v.user)+'</td><td>'+E(v.caption)+'</td><td>'+Number(v.likes||0).toLocaleString('id-ID')+'</td><td><span class="status '+SC(v.status)+'">'+E(v.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.videoForm(\''+v.id+'\')">Edit</button><button onclick="AdminV5.deleteVideo(\''+v.id+'\')">Hapus</button></td></tr>'});return table('Konten Video',['Akun','Caption','Likes','Status','Aksi'],r,'<button class="a-btn primary" onclick="AdminV5.videoForm()">+ Tambah Video</button>')}
function videoForm(id){
 id=id||'';var d=D(),v=d.videos.find(function(x){return String(x.id)===String(id)})||{user:'purbalink.news',caption:'',music:'Audio Asli',img:'',likes:0,status:'Tayang',comments:[]};
 var h='<form id="v5VideoForm"><div class="admin-v5-form"><label>Akun<input name="user" value="'+E(v.user)+'"></label><label>Status<select name="status"><option '+(v.status==='Tayang'?'selected':'')+'>Tayang</option><option '+(v.status!=='Tayang'?'selected':'')+'>Draft</option></select></label><label class="full">Caption<textarea name="caption">'+E(v.caption||'')+'</textarea></label><label class="full">URL Thumbnail / Video<input name="img" value="'+E(v.img||'')+'"></label><label class="full">Audio / Musik<input name="music" value="'+E(v.music||'')+'"></label></div><div class="admin-v5-actions"><button type="button" class="a-btn ghost" data-close>Batal</button><button class="a-btn primary">Simpan</button></div></form>';
 openM(id?'Edit Video':'Tambah Video',h,function(m){m.querySelector('#v5VideoForm').onsubmit=function(e){e.preventDefault();var x=FD(e.currentTarget);if(id)Object.assign(v,x);else d.videos.unshift(Object.assign({},v,x,{id:Date.now()}));SD();closeM();toast('Video tersimpan');refresh('video-konten')}})
}
function deleteVideo(id){confirmA('Hapus video ini?',function(){var d=D();d.videos=d.videos.filter(function(x){return String(x.id)!==String(id)});SD();toast('Video dihapus');refresh('video-konten')})}

function usersPage(){var r='';(D().users||[]).forEach(function(u){r+='<tr><td>'+E(u.name||'-')+'</td><td>'+E(u.email||'-')+'</td><td>'+E(u.role||'reader')+'</td><td>'+E(u.status||'Aktif')+'</td><td class="row-actions"><button onclick="AdminV5.toggleUser(\''+u.id+'\')">'+(u.status==='Suspended'?'Aktifkan':'Suspend')+'</button></td></tr>'});return table('User Activity',['Nama','Email','Role','Status','Aksi'],r)}
function toggleUser(id){var u=(D().users||[]).find(function(x){return String(x.id)===String(id)});if(!u)return;u.status=u.status==='Suspended'?'Aktif':'Suspended';SD();toast('Status user diperbarui');refresh('pengguna')}

function giftsPage(){var r='';(D().gifts||[]).forEach(function(g){r+='<tr><td>'+E(g.sender||g.userEmail||'Anonim')+'</td><td>'+E(g.author||'Tim PURBALINK')+'</td><td>'+RP(g.amount||0)+'</td><td>'+E(g.date||'-')+'</td><td><span class="status '+SC(g.status||'Sukses')+'">'+E(g.status||'Sukses')+'</span></td></tr>'});return table('Transaksi Gift',['Pengirim','Penerima','Nominal','Tanggal','Status'],r)}
function balancesPage(){var sums={};(D().gifts||[]).forEach(function(g){var k=g.author||'Tim PURBALINK';sums[k]=(sums[k]||0)+Number(g.amount||0)});var r='';Object.keys(sums).forEach(function(k){r+='<tr><td>'+E(k)+'</td><td>'+RP(sums[k])+'</td><td><span class="status st-terbit">Aktif</span></td></tr>'});return table('Saldo Author',['Penulis','Saldo Bruto','Status'],r)}
function withdrawalsPage(){var r='';A.withdrawals.forEach(function(w){r+='<tr><td>'+E(w.name)+'</td><td>'+RP(w.amount)+'</td><td>'+E(w.date)+'</td><td><span class="status '+SC(w.status)+'">'+E(w.status)+'</span></td><td class="row-actions"><button onclick="AdminV5.processWithdrawal(\''+w.id+'\')">'+(w.status==='Menunggu'?'Proses':'Detail')+'</button></td></tr>'});return table('Withdrawal',['Penulis','Nominal','Tanggal','Status','Aksi'],r)}
function processWithdrawal(id){var w=A.withdrawals.find(function(x){return x.id===id});if(!w)return;if(w.status!=='Menunggu'){toast('Withdrawal sudah diproses');return}confirmA('Tandai withdrawal '+RP(w.amount)+' sebagai selesai?',function(){w.status='Selesai';SA();toast('Withdrawal selesai');refresh('withdrawal')})}

function mediaPage(){
 var cards='';A.stickers.forEach(function(s){cards+='<div class="admin-v5-media-card"><img src="'+E(s.file)+'" alt="'+E(s.label)+'"><b>'+E(s.label)+'</b><small>'+E(s.type)+' · '+(s.active?'Aktif':'Nonaktif')+'</small><div><button onclick="AdminV5.toggleSticker(\''+s.id+'\')">'+(s.active?'Nonaktifkan':'Aktifkan')+'</button><button onclick="AdminV5.deleteSticker(\''+s.id+'\')">Hapus</button></div></div>'});
 var g=A.media;
 return '<div class="panel"><div class="panel-head"><h2>Sticker & Reaction Library</h2><button class="a-btn primary" onclick="AdminV5.stickerForm()">+ Tambah Sticker</button></div><div class="admin-v5-media-grid">'+(cards||'<div class="admin-v5-empty">Belum ada sticker.</div>')+'</div></div><div class="panel" style="margin-top:16px"><div class="panel-head"><h2>Giphy GIF</h2></div><div class="admin-v5-note">Untuk production, API key Giphy sebaiknya diproxy melalui Cloudflare Worker / Secret. Kolom key ini untuk development.</div><div class="settings-grid"><div class="field"><label>Status</label><select id="giphyEnabled"><option value="true" '+(g.giphyEnabled?'selected':'')+'>Aktif</option><option value="false" '+(!g.giphyEnabled?'selected':'')+'>Nonaktif</option></select></div><div class="field"><label>Rating</label><select id="giphyRating"><option '+(g.giphyRating==='g'?'selected':'')+'>g</option><option '+(g.giphyRating==='pg'?'selected':'')+'>pg</option><option '+(g.giphyRating==='pg-13'?'selected':'')+'>pg-13</option></select></div><div class="field"><label>Limit</label><input id="giphyLimit" type="number" min="6" max="50" value="'+g.giphyLimit+'"></div><div class="field"><label>API Key Dev</label><input id="giphyApiKey" value="'+E(g.giphyApiKey||'')+'" placeholder="opsional"></div></div><button class="save-btn" onclick="AdminV5.saveMedia()">Simpan Media Settings</button></div>'
}
function stickerForm(){openM('Tambah Sticker','<form id="v5StickerForm"><div class="admin-v5-form"><label>Label<input name="label" required></label><label>Tipe<select name="type"><option value="sticker">Sticker</option><option value="reaction">Reaction</option></select></label><label class="full">Path / URL Gambar<input name="file" required placeholder="stickers/mantap-bang.png"></label></div><div class="admin-v5-actions"><button type="button" class="a-btn ghost" data-close>Batal</button><button class="a-btn primary">Tambah</button></div></form>',function(m){m.querySelector('#v5StickerForm').onsubmit=function(e){e.preventDefault();var x=FD(e.currentTarget);A.stickers.push(Object.assign(x,{id:UID('st'),active:true}));SA();closeM();toast('Sticker ditambahkan');refresh('media-interaksi')}})}
function toggleSticker(id){var s=A.stickers.find(function(x){return x.id===id});if(!s)return;s.active=!s.active;SA();refresh('media-interaksi')}
function deleteSticker(id){confirmA('Hapus sticker ini dari library?',function(){A.stickers=A.stickers.filter(function(x){return x.id!==id});SA();toast('Sticker dihapus');refresh('media-interaksi')})}
function saveMedia(){A.media.giphyEnabled=document.getElementById('giphyEnabled').value==='true';A.media.giphyRating=document.getElementById('giphyRating').value;A.media.giphyLimit=Number(document.getElementById('giphyLimit').value)||24;A.media.giphyApiKey=document.getElementById('giphyApiKey').value.trim();SA();localStorage.setItem('purbalink_media_settings',JSON.stringify(A.media));localStorage.setItem('purbalink_sticker_library',JSON.stringify(A.stickers.filter(function(x){return x.active})));toast('Media settings tersimpan')}

function featuresPage(){var h='';Object.entries(D().features||{}).forEach(function(kv){h+='<label class="admin-v5-feature"><div><b>'+E(kv[0].replaceAll('_',' '))+'</b><span>Kontrol modul '+E(kv[0])+' di frontend.</span></div><input type="checkbox" data-feature="'+E(kv[0])+'" '+(kv[1]!==false?'checked':'')+'></label>'});return '<div class="panel"><div class="panel-head"><h2>Kustomisasi Fitur</h2><button class="a-btn primary" onclick="AdminV5.saveFeatures()">Simpan</button></div><p class="admin-v5-sub">Aktif/nonaktifkan fitur frontend tanpa mengubah kode.</p><div class="admin-v5-feature-list">'+h+'</div></div>'}
function saveFeatures(){document.querySelectorAll('[data-feature]').forEach(function(x){D().features[x.dataset.feature]=x.checked});SD();toast('Fitur tersimpan')}

function settingsPage(){
 var s=D().settings;
 return '<div class="admin-v5-note"><b>Pengaturan ini langsung memakai database lokal PURBALINK.</b> Secret payment / API tetap disimpan di Cloudflare.</div><div class="panel"><div class="panel-head"><h2>Identitas Website</h2></div><div class="settings-grid"><div class="field"><label>Nama Situs</label><input id="setSiteName" value="'+E(s.siteName||'PURBALINK')+'"></div><div class="field"><label>Tagline</label><input id="setTagline" value="'+E(s.tagline||'')+'"></div><div class="field"><label>Domain</label><input id="setDomain" value="'+E(s.domain||'')+'"></div><div class="field"><label>Email Kontak</label><input id="setEmail" value="'+E(s.email||'')+'"></div><div class="field"><label>WhatsApp</label><input id="setWhatsapp" value="'+E(s.whatsapp||'')+'"></div><div class="field"><label>API Base URL</label><input id="setApiBase" value="'+E(s.apiBase||'')+'"></div></div></div><div class="panel" style="margin-top:16px"><div class="panel-head"><h2>Fee & Pembayaran</h2></div><div class="settings-grid"><div class="field"><label>Fee Gift (%)</label><input id="setFeeGift" type="number" value="'+Number(s.feeGift||10)+'"></div><div class="field"><label>Fee Shop (%)</label><input id="setFeeShop" type="number" value="'+Number(s.feeShop||5)+'"></div><div class="field"><label>Gateway</label><input id="setGateway" value="'+E(s.gateway||'Midtrans')+'"></div><div class="field"><label>Mode</label><select id="setGatewayMode"><option value="Sandbox" '+((s.gatewayMode||'').toLowerCase()==='sandbox'?'selected':'')+'>Sandbox</option><option value="Production" '+((s.gatewayMode||'').toLowerCase()==='production'?'selected':'')+'>Production</option></select></div></div></div><button class="save-btn" onclick="AdminV5.saveSettings()">Simpan Pengaturan</button>'
}
function saveSettings(){var s=D().settings;s.siteName=document.getElementById('setSiteName').value.trim()||'PURBALINK';s.tagline=document.getElementById('setTagline').value.trim();s.domain=document.getElementById('setDomain').value.trim();s.email=document.getElementById('setEmail').value.trim();s.whatsapp=document.getElementById('setWhatsapp').value.trim();s.apiBase=document.getElementById('setApiBase').value.trim();s.feeGift=Number(document.getElementById('setFeeGift').value)||0;s.feeShop=Number(document.getElementById('setFeeShop').value)||0;s.gateway=document.getElementById('setGateway').value.trim()||'Midtrans';s.gatewayMode=document.getElementById('setGatewayMode').value;SD();toast('Pengaturan website tersimpan')}


function ensureAds(){
 var d=D();if(!d)return null;
 var defaults={
  enabled:true,provider:'mixed',adsenseClient:'',lazy:true,anchor:true,reward:true,
  slots:[
   {id:'top-header',name:'Atas Header',type:'banner',provider:'direct',enabled:true,placement:'top-header',desktop:'970x90',mobile:'320x50',label:'Advertisement',image:'',url:'',adsenseSlot:''},
   {id:'header-banner',name:'Banner Header',type:'banner',provider:'adsense',enabled:true,placement:'header-banner',desktop:'728x90',mobile:'320x100',label:'Iklan',image:'',url:'',adsenseSlot:''},
   {id:'home-native',name:'Native Beranda',type:'native',provider:'direct',enabled:true,placement:'home-native',desktop:'fluid',mobile:'fluid',label:'Sponsored',image:'',url:'',adsenseSlot:''},
   {id:'article-top',name:'Artikel — Atas',type:'in-article',provider:'adsense',enabled:true,placement:'article-top',desktop:'fluid',mobile:'fluid',label:'Advertisement',image:'',url:'',adsenseSlot:''},
   {id:'article-middle',name:'Artikel — Tengah',type:'in-article',provider:'adsense',enabled:true,placement:'article-middle',desktop:'fluid',mobile:'fluid',label:'Advertisement',image:'',url:'',adsenseSlot:''},
   {id:'article-bottom',name:'Artikel — Bawah',type:'in-article',provider:'direct',enabled:true,placement:'article-bottom',desktop:'fluid',mobile:'fluid',label:'Sponsored',image:'',url:'',adsenseSlot:''},
   {id:'sidebar',name:'Sidebar Desktop',type:'display',provider:'adsense',enabled:false,placement:'sidebar',desktop:'300x600',mobile:'off',label:'Advertisement',image:'',url:'',adsenseSlot:''},
   {id:'footer-banner',name:'Banner Footer',type:'banner',provider:'direct',enabled:true,placement:'footer-banner',desktop:'970x90',mobile:'320x100',label:'Sponsored',image:'',url:'',adsenseSlot:''},
   {id:'anchor',name:'Anchor / Sticky',type:'anchor',provider:'adsense',enabled:true,placement:'anchor',desktop:'728x90',mobile:'320x50',label:'Advertisement',image:'',url:'',adsenseSlot:''},
   {id:'reward',name:'Reward Ad',type:'reward',provider:'direct',enabled:true,placement:'reward',desktop:'modal',mobile:'modal',label:'Reward',image:'',url:'',adsenseSlot:''}
  ]
 };
 d.ads=d.ads||defaults;d.ads.slots=Array.isArray(d.ads.slots)&&d.ads.slots.length?d.ads.slots:defaults.slots;
 Object.keys(defaults).forEach(function(k){if(d.ads[k]===undefined)d.ads[k]=defaults[k]});
 return d.ads
}
function adsPage(){
 var a=ensureAds(),rows='';
 a.slots.forEach(function(x){rows+='<tr><td><b>'+E(x.name)+'</b><br><small>'+E(x.placement)+'</small></td><td>'+E(x.type)+'</td><td>'+E(x.provider)+'</td><td>'+E(x.desktop)+' / '+E(x.mobile)+'</td><td><span class="status '+(x.enabled?'st-terbit':'st-draft')+'">'+(x.enabled?'Aktif':'Nonaktif')+'</span></td><td class="row-actions"><button onclick="AdminV5.adForm(\''+x.id+'\')">Edit</button><button onclick="AdminV5.toggleAd(\''+x.id+'\')">'+(x.enabled?'Nonaktifkan':'Aktifkan')+'</button><button onclick="AdminV5.previewAd(\''+x.id+'\')">Preview</button></td></tr>'});
 return '<div class="admin-v5-note"><b>Strategi monetisasi:</b> kombinasi AdSense + iklan mandiri. Gunakan slot secukupnya agar Core Web Vitals tetap baik. Iklan di-load lazy dan slot anchor dapat ditutup pengguna.</div>'+
 '<div class="panel"><div class="panel-head"><h2>Pengaturan Iklan</h2><button class="a-btn primary" onclick="AdminV5.adForm()">+ Slot Baru</button></div><div class="settings-grid"><div class="field"><label>Iklan Global</label><select id="adsEnabled"><option value="true" '+(a.enabled?'selected':'')+'>Aktif</option><option value="false" '+(!a.enabled?'selected':'')+'>Nonaktif</option></select></div><div class="field"><label>Provider Utama</label><select id="adsProvider"><option value="mixed" '+(a.provider==='mixed'?'selected':'')+'>Campuran</option><option value="adsense" '+(a.provider==='adsense'?'selected':'')+'>Google AdSense</option><option value="direct" '+(a.provider==='direct'?'selected':'')+'>Iklan Mandiri</option></select></div><div class="field"><label>AdSense Client ID</label><input id="adsClient" value="'+E(a.adsenseClient||'')+'" placeholder="ca-pub-xxxxxxxxxxxxxxxx"></div><div class="field"><label>Lazy Load</label><select id="adsLazy"><option value="true" '+(a.lazy?'selected':'')+'>Aktif</option><option value="false" '+(!a.lazy?'selected':'')+'>Nonaktif</option></select></div></div><button class="save-btn" onclick="AdminV5.saveAds()">Simpan Pengaturan Iklan</button></div>'+
 table('Slot Iklan',['Slot','Jenis','Provider','Ukuran','Status','Aksi'],rows)+
 '<div class="panel" style="margin-top:16px"><div class="panel-head"><h2>Inspirasi Penempatan</h2></div><div class="admin-v5-system-grid">'+
 '<div class="admin-v5-system"><h3>Beranda</h3><p>Atas header → banner setelah hero → native di antara berita → footer banner. Hindari terlalu banyak slot di viewport pertama.</p></div>'+
 '<div class="admin-v5-system"><h3>Artikel</h3><p>Atas artikel → setelah 3–5 paragraf → tengah artikel → bawah artikel sebelum rekomendasi. Gunakan format fluid untuk mobile.</p></div>'+
 '<div class="admin-v5-system"><h3>Anchor</h3><p>Sticky bawah layar, tinggi kecil, bisa ditutup. Aktif hanya setelah pengguna mulai scroll agar tidak menutupi konten.</p></div>'+
 '<div class="admin-v5-system"><h3>Reward</h3><p>Cocok untuk membuka episode/video premium, bonus koin, atau konten tambahan. Jangan dipaksa untuk membaca berita biasa.</p></div>'+
 '</div></div>'
}
function adForm(id){
 var a=ensureAds(),x=a.slots.find(function(v){return v.id===id})||{id:'ad-'+Date.now(),name:'Slot Baru',type:'banner',provider:'direct',enabled:true,placement:'custom',desktop:'728x90',mobile:'320x100',label:'Sponsored',image:'',url:'',adsenseSlot:''};
 var h='<form id="v5AdForm"><div class="admin-v5-form"><label>Nama Slot<input name="name" required value="'+E(x.name)+'"></label><label>Placement ID<input name="placement" required value="'+E(x.placement)+'"></label><label>Jenis<select name="type">'+['banner','native','display','in-article','anchor','reward'].map(function(v){return '<option '+(v===x.type?'selected':'')+'>'+v+'</option>'}).join('')+'</select></label><label>Provider<select name="provider"><option value="direct" '+(x.provider==='direct'?'selected':'')+'>Iklan Mandiri</option><option value="adsense" '+(x.provider==='adsense'?'selected':'')+'>Google AdSense</option></select></label><label>Desktop<input name="desktop" value="'+E(x.desktop||'')+'"></label><label>Mobile<input name="mobile" value="'+E(x.mobile||'')+'"></label><label>Label<input name="label" value="'+E(x.label||'Sponsored')+'"></label><label>AdSense Slot ID<input name="adsenseSlot" value="'+E(x.adsenseSlot||'')+'"></label><label class="full">URL Gambar Iklan Mandiri<input name="image" value="'+E(x.image||'')+'" placeholder="https://..."></label><label class="full">URL Tujuan<input name="url" value="'+E(x.url||'')+'" placeholder="https://..."></label><label class="check full"><input type="checkbox" name="enabled" '+(x.enabled?'checked':'')+'> Aktifkan slot</label></div><div class="admin-v5-actions"><button type="button" class="a-btn ghost" data-close>Batal</button><button class="a-btn primary">Simpan</button></div></form>';
 openM(id?'Edit Slot Iklan':'Tambah Slot Iklan',h,function(m){m.querySelector('#v5AdForm').onsubmit=function(e){e.preventDefault();var d=FD(e.currentTarget);d.enabled=e.currentTarget.enabled.checked;Object.assign(x,d);if(!id)a.slots.push(x);SD();closeM();toast('Slot iklan tersimpan');refresh('iklan')}})
}
function toggleAd(id){var x=ensureAds().slots.find(function(v){return v.id===id});if(!x)return;x.enabled=!x.enabled;SD();refresh('iklan');toast('Status slot diperbarui')}
function previewAd(id){var x=ensureAds().slots.find(function(v){return v.id===id});if(!x)return;var body=x.provider==='direct'?(x.image?'<a href="'+E(x.url||'#')+'" target="_blank"><img src="'+E(x.image)+'" style="width:100%;max-height:280px;object-fit:cover;border-radius:10px"></a>':'<div class="admin-v5-empty">Belum ada gambar iklan mandiri.</div>'):'<div class="admin-v5-empty">Preview AdSense membutuhkan Client ID + Slot ID valid dan domain yang telah disetujui.</div>';openM('Preview — '+x.name,body)}
function saveAds(){var a=ensureAds();a.enabled=document.getElementById('adsEnabled').value==='true';a.provider=document.getElementById('adsProvider').value;a.adsenseClient=document.getElementById('adsClient').value.trim();a.lazy=document.getElementById('adsLazy').value==='true';SD();toast('Pengaturan iklan tersimpan')}

function iCard(name,ep,desc){return '<div class="admin-v5-system" data-int="'+E(name)+'" data-endpoint="'+E(ep)+'"><h3>'+E(name)+'</h3><p>'+E(desc)+'</p><div><span class="int-dot"></span><b>Belum dicek</b></div></div>'}
function integrationsPage(){return '<div class="admin-v5-system-grid">'+iCard('Cloudflare Worker','/api/health','Backend Worker dan assets')+iCard('Jooble','/api/jobs/jooble','Lowongan live Jooble')+iCard('Midtrans','/api/midtrans/status?order_id=TEST','Payment gateway Shop / Gift')+iCard('AI Article API','/api/ai/article','Generator artikel multi-provider')+'</div><div class="panel" style="margin-top:16px"><div class="panel-head"><h2>API & Secrets</h2><button class="a-btn primary" onclick="AdminV5.checkIntegrations()">Cek Sekarang</button></div><div class="admin-v5-note">Secret tidak pernah ditampilkan di dashboard. Kelola di Cloudflare → Settings → Variables and Secrets.</div><table><thead><tr><th>Secret</th><th>Kegunaan</th></tr></thead><tbody><tr><td>MIDTRANS_SERVER_KEY</td><td>Payment gateway</td></tr><tr><td>JOOBLE_API_KEY</td><td>Lowongan live</td></tr><tr><td>GIPHY_API_KEY</td><td>GIF komentar via proxy</td></tr><tr><td>OPENAI_API_KEY / GEMINI_API_KEY / GROQ_API_KEY / dll.</td><td>AI generator</td></tr></tbody></table></div>'}
async function checkIntegrations(){var cards=[].slice.call(document.querySelectorAll('[data-int]'));for(var i=0;i<cards.length;i++){var c=cards[i],dot=c.querySelector('.int-dot'),lab=c.querySelector('b');dot.className='int-dot warn';lab.textContent='Mengecek…';try{var url=c.dataset.endpoint,opt={};if(url==='/api/jobs/jooble')opt={method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({keywords:'admin',location:'Purbalingga',page:1})};if(url.indexOf('/api/ai/article')===0)opt={method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({mode:'generate',provider:'auto',topic:'health check PURBALINK',length:120})};var res=await fetch(url,opt);dot.className='int-dot '+(res.ok?'ok':'warn');lab.textContent=res.ok?'Terhubung':'Perlu konfigurasi ('+res.status+')'}catch(e){dot.className='int-dot bad';lab.textContent='Tidak terhubung'}}}

function notifications(){var u=A.notifications.filter(function(x){return !x.read}),h='';u.forEach(function(n){h+='<div class="admin-v5-notif">'+E(n.text)+'</div>'});openM('Notifikasi',h||'<div class="admin-v5-empty">Tidak ada notifikasi baru.</div>');A.notifications.forEach(function(x){x.read=true});SA();var d=document.querySelector('.topbar .dot');if(d)d.remove()}
function messages(){openM('Pesan Admin','<div class="admin-v5-empty">Kotak pesan admin siap. Integrasi inbox eksternal dapat ditambahkan melalui backend.</div>')}

function switchTabV5(tab){
 window.__adminV5Tab=tab;document.querySelectorAll('.sb-item').forEach(function(el){el.classList.toggle('active',el.dataset.tab===tab)});
 var titles={dashboard:'Dashboard',artikel:'Artikel / Berita',komentar:'Komentar',moderasi:'Moderasi',laporan:'Laporan Komentar',reaksi:'Reaction',rating:'Rating',pengguna:'User Activity',gift:'Gift Author',transaksi:'Transaksi',saldo:'Saldo Author',withdrawal:'Withdrawal',iklan:'Iklan & AdSense','loker-list':'Lowongan Kerja','loker-pelamar':'Pelamar Loker','shop-produk':'Produk','shop-pesanan':'Pesanan','shop-toko':'Toko / Seller','video-konten':'Konten Video','video-moderasi':'Moderasi Video',statistik:'Statistik',fitur:'Kustomisasi Fitur',pengaturan:'Pengaturan Website','media-interaksi':'Sticker & GIF',integrasi:'API & Integrasi'};
 document.getElementById('pageTitle').textContent=titles[tab]||tab;document.getElementById('pageRange').textContent=tab==='dashboard'?'Ringkasan aktivitas PURBALINK · '+today():'';
 var h='';switch(tab){
  case'dashboard':h=dashboard();break;case'artikel':h=articlePage();break;case'komentar':h=commentsPage();break;case'moderasi':h=moderationPage('comment');break;case'laporan':h=reportsPage();break;
  case'loker-list':h=jobsPage();break;case'loker-pelamar':h=applicantsPage();break;case'shop-produk':h=productsPage();break;case'shop-pesanan':h=ordersPage();break;case'shop-toko':h=sellersPage();break;
  case'video-konten':h=videosPage();break;case'video-moderasi':h=moderationPage('video');break;case'pengguna':h=usersPage();break;case'gift':case'transaksi':h=giftsPage();break;case'saldo':h=balancesPage();break;case'withdrawal':h=withdrawalsPage();break;
  case'iklan':h=adsPage();break;case'media-interaksi':h=mediaPage();break;case'fitur':h=featuresPage();break;case'pengaturan':h=settingsPage();break;case'integrasi':h=integrationsPage();break;
  default:h=window.tabHTML?tabHTML(tab):'<div class="panel"><div class="admin-v5-empty">Halaman belum tersedia.</div></div>'
 }
 document.getElementById('content').innerHTML=h;if(tab==='dashboard'||tab==='statistik')setTimeout(function(){if(window.drawChart)drawChart()},0);if(tab==='integrasi')setTimeout(checkIntegrations,100);if(window.closeAdminSidebar)closeAdminSidebar()
}

window.AdminV5={articleForm:articleForm,toggleArticle:toggleArticle,deleteArticle:deleteArticle,toggleComment:toggleComment,deleteComment:deleteComment,moderate:moderate,toggleReport:toggleReport,jobForm:jobForm,toggleJob:toggleJob,deleteJob:deleteJob,viewApplicant:viewApplicant,advanceApplicant:advanceApplicant,productForm:productForm,deleteProduct:deleteProduct,advanceOrder:advanceOrder,viewOrder:viewOrder,toggleSeller:toggleSeller,videoForm:videoForm,deleteVideo:deleteVideo,toggleUser:toggleUser,processWithdrawal:processWithdrawal,adForm:adForm,toggleAd:toggleAd,previewAd:previewAd,saveAds:saveAds,stickerForm:stickerForm,toggleSticker:toggleSticker,deleteSticker:deleteSticker,saveMedia:saveMedia,saveFeatures:saveFeatures,saveSettings:saveSettings,checkIntegrations:checkIntegrations,notifications:notifications,messages:messages};
window.switchTab=window.switchTabV5=switchTabV5;
document.querySelectorAll('.sb-item[data-tab]').forEach(function(el){el.onclick=function(){switchTabV5(el.dataset.tab)}});
var topBtns=document.querySelectorAll('.topbar .icon-btn');if(topBtns[1])topBtns[1].onclick=notifications;if(topBtns[2])topBtns[2].onclick=messages;
window.saveGeneratedDraft=function(){if(!window.__generatedArticle){toast('Generate artikel terlebih dahulu','warn');return}var d=D(),a=window.__generatedArticle;d.articles.unshift({id:Date.now(),cat:a.category||'DAERAH',title:a.title||'Artikel AI',summary:a.meta||'',date:new Date().toLocaleString('id-ID'),img:'',author:'AI Generator',status:'Draft',breaking:false,body:String(a.html||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()});SD();toast('Draft AI tersimpan');switchTabV5('artikel')};
switchTabV5('dashboard');
})();
