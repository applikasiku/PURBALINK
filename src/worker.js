const ADMIN_HOST = 'admin.purbalink.web.id';
const PUBLIC_HOST = 'purbalink.web.id';

function adminEmail(env) {
  return String(env.ADMIN_EMAIL || 'amelianewsid@gmail.com').trim().toLowerCase();
}

function accessEmail(request) {
  return String(request.headers.get('cf-access-authenticated-user-email') || '').trim().toLowerCase();
}

function forbiddenAdmin() {
  return new Response('<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Akses Admin PURBALINK</title><body style="font-family:system-ui;background:#f5f8fc;color:#101828;display:grid;place-items:center;min-height:100vh;margin:0"><main style="max-width:520px;background:#fff;border:1px solid #dce6f5;border-radius:18px;padding:28px;box-shadow:0 16px 40px rgba(9,58,138,.08)"><h1 style="margin:0 0 10px;font-size:22px">Dashboard Admin terlindungi</h1><p style="line-height:1.6;color:#5b6574">Akses hanya tersedia melalui Cloudflare Access untuk akun admin yang diizinkan.</p></main></body></html>', { status: 403, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
}

async function serveAsset(request, env, pathname) {
  const u = new URL(request.url);
  u.pathname = pathname;
  return env.ASSETS.fetch(new Request(u.toString(), request));
}

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...extra } });
}

function mode(env) {
  return String(env.MIDTRANS_MODE || 'sandbox').toLowerCase() === 'production' ? 'production' : 'sandbox';
}

function authHeader(serverKey) {
  return `Basic ${btoa(`${serverKey}:`)}`;
}

function cleanText(value, max = 255) {
  return String(value || '').trim().slice(0, max);
}

function cleanOrderId(value) {
  const id = cleanText(value, 50);
  if (!/^[A-Za-z0-9._~-]+$/.test(id)) return null;
  return id;
}

function statusBase(currentMode) {
  return currentMode === 'production' ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
}

function snapEndpoint(currentMode) {
  return currentMode === 'production'
    ? 'https://app.midtrans.com/snap/v1/transactions'
    : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
}

function sanitizeItems(items, grossAmount, type) {
  const safe = Array.isArray(items) ? items.slice(0, 50).map((item, index) => ({
    id: cleanText(item?.id || `${type || 'item'}-${index + 1}`, 50),
    price: Math.max(1, Math.round(Number(item?.price) || 0)),
    quantity: Math.max(1, Math.round(Number(item?.quantity) || 1)),
    name: cleanText(item?.name || 'PURBALINK', 50),
  })) : [];
  const sum = safe.reduce((total, item) => total + item.price * item.quantity, 0);
  if (safe.length && sum === grossAmount) return safe;
  return [{ id: cleanText(type || 'payment', 50), price: grossAmount, quantity: 1, name: type === 'gift' ? 'Gift Author PURBALINK' : 'Pembayaran PURBALINK' }];
}

async function createTransaction(request, env) {
  if (!env.MIDTRANS_SERVER_KEY) {
    return json({ error: 'Midtrans belum dikonfigurasi. Tambahkan secret MIDTRANS_SERVER_KEY di Cloudflare Worker.' }, 503);
  }

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Body JSON tidak valid.' }, 400); }

  const amount = Math.round(Number(body.amount));
  const orderId = cleanOrderId(body.order_id);
  const type = ['gift', 'shop'].includes(body.type) ? body.type : 'payment';
  if (!orderId) return json({ error: 'order_id tidak valid.' }, 400);
  if (!Number.isFinite(amount) || amount < 1) return json({ error: 'Nominal pembayaran tidak valid.' }, 400);

  const currentMode = mode(env);
  const origin = new URL(request.url).origin;
  const finishPath = type === 'shop' ? '/shop.html' : '/';
  const finishUrl = `${origin}${finishPath}?payment=midtrans&type=${encodeURIComponent(type)}&order_id=${encodeURIComponent(orderId)}`;
  const customer = body.customer || {};

  const payload = {
    transaction_details: { order_id: orderId, gross_amount: amount },
    item_details: sanitizeItems(body.items, amount, type),
    customer_details: {
      first_name: cleanText(customer.name || 'Pembaca PURBALINK', 50),
      email: cleanText(customer.email, 50) || undefined,
      phone: cleanText(customer.phone, 20) || undefined,
    },
    credit_card: { secure: true },
    callbacks: { finish: finishUrl, error: finishUrl },
    custom_field1: `PURBALINK_${type.toUpperCase()}`,
  };

  if (!payload.customer_details.email) delete payload.customer_details.email;
  if (!payload.customer_details.phone) delete payload.customer_details.phone;

  const midtransResponse = await fetch(snapEndpoint(currentMode), {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: authHeader(env.MIDTRANS_SERVER_KEY),
    },
    body: JSON.stringify(payload),
  });

  const data = await midtransResponse.json().catch(() => ({}));
  if (!midtransResponse.ok) {
    return json({
      error: Array.isArray(data.error_messages) ? data.error_messages.join(' ') : (data.status_message || 'Midtrans menolak transaksi.'),
      details: data,
    }, midtransResponse.status >= 500 ? 502 : midtransResponse.status);
  }

  return json({
    gateway: 'Midtrans',
    mode: currentMode,
    order_id: orderId,
    token: data.token,
    redirect_url: data.redirect_url,
  }, 201);
}

async function getStatus(request, env) {
  if (!env.MIDTRANS_SERVER_KEY) return json({ error: 'MIDTRANS_SERVER_KEY belum dikonfigurasi.' }, 503);
  const url = new URL(request.url);
  const orderId = cleanOrderId(url.searchParams.get('order_id'));
  if (!orderId) return json({ error: 'order_id tidak valid.' }, 400);
  const currentMode = mode(env);
  const res = await fetch(`${statusBase(currentMode)}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: { accept: 'application/json', 'content-type': 'application/json', authorization: authHeader(env.MIDTRANS_SERVER_KEY) },
  });
  const data = await res.json().catch(() => ({}));
  return json(data, res.ok ? 200 : (res.status === 404 ? 404 : 502));
}


async function searchJooble(request, env) {
  if (!env.JOOBLE_API_KEY) {
    return json({ configured: false, jobs: [], error: 'Jooble API belum dikonfigurasi. Tambahkan secret JOOBLE_API_KEY di Cloudflare.' }, 503);
  }
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Body JSON tidak valid.' }, 400); }
  const keywords = cleanText(body.keywords || 'lowongan', 100);
  const location = cleanText(body.location || 'Purbalingga', 100);
  const page = Math.max(1, Math.min(20, Math.round(Number(body.page) || 1)));
  const res = await fetch(`https://id.jooble.org/api/${encodeURIComponent(env.JOOBLE_API_KEY)}`, {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ keywords, location, page, ResultOnPage: 20 })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return json({ error: data.error || data.message || 'Jooble menolak permintaan.', details: data }, res.status >= 500 ? 502 : res.status);
  }
  return json({ configured: true, totalCount: data.totalCount || 0, jobs: Array.isArray(data.jobs) ? data.jobs : [] });
}

function aiProviderConfig(name, env, requestedModel = '') {
  const map = {
    openai: { key: env.OPENAI_API_KEY, model: requestedModel || env.OPENAI_MODEL || 'gpt-5.6-luna' },
    gemini: { key: env.GEMINI_API_KEY, model: requestedModel || env.GEMINI_MODEL || 'gemini-3.5-flash-lite' },
    deepseek: { key: env.DEEPSEEK_API_KEY, model: requestedModel || env.DEEPSEEK_MODEL || 'deepseek-flash' },
    groq: { key: env.GROQ_API_KEY, model: requestedModel || env.GROQ_MODEL || 'openai/gpt-oss-20b' },
    mistral: { key: env.MISTRAL_API_KEY, model: requestedModel || env.MISTRAL_MODEL || 'mistral-small-latest' },
    anthropic: { key: env.ANTHROPIC_API_KEY, model: requestedModel || env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001' },
    openrouter: { key: env.OPENROUTER_API_KEY, model: requestedModel || env.OPENROUTER_MODEL || 'openrouter/free' },
    together: { key: env.TOGETHER_API_KEY, model: requestedModel || env.TOGETHER_MODEL || 'openai/gpt-oss-120b' }
  };
  return map[name] || null;
}
function aiOrder(env) {
  return String(env.AI_PROVIDER_ORDER || 'openrouter,groq,gemini,deepseek,mistral,together,openai,anthropic').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
}
function maxTokensForWords(words) {
  const n = Math.max(500, Math.min(2200, Number(words) || 1000));
  return Math.max(1400, Math.min(5200, Math.round(n * 2.15)));
}
function htmlToText(html) {
  return String(html || '').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<noscript[\s\S]*?<\/noscript>/gi,' ').replace(/<svg[\s\S]*?<\/svg>/gi,' ').replace(/<(br|\/p|\/div|\/li|\/h[1-6])>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'").replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n').trim();
}
function safeRemoteUrl(raw) {
  let u; try { u = new URL(String(raw || '')); } catch { return null; }
  if (!['http:','https:'].includes(u.protocol)) return null;
  const h=u.hostname.toLowerCase();
  if (h==='localhost'||h.endsWith('.local')||h==='0.0.0.0'||h==='::1') return null;
  if (/^(10|127)\./.test(h)||/^192\.168\./.test(h)||/^169\.254\./.test(h)) return null;
  const m=h.match(/^172\.(\d+)\./); if(m&&Number(m[1])>=16&&Number(m[1])<=31) return null;
  return u;
}
async function fetchSourceArticle(rawUrl) {
  const u=safeRemoteUrl(rawUrl); if(!u) throw new Error('URL sumber tidak valid atau tidak diizinkan.');
  const res=await fetch(u.toString(),{headers:{'user-agent':'PURBALINK-Editorial/1.0',accept:'text/html,application/xhtml+xml'},redirect:'follow'});
  if(!res.ok) throw new Error('Gagal mengambil artikel sumber.');
  const ct=res.headers.get('content-type')||''; if(!ct.includes('text/html')&&!ct.includes('application/xhtml+xml')) throw new Error('Sumber harus berupa halaman HTML.');
  const html=(await res.text()).slice(0,300000), match=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title=(match&&match[1]?match[1]:'').replace(/<[^>]+>/g,' ').trim(), text=htmlToText(html).slice(0,50000);
  if(text.length<250) throw new Error('Isi artikel sumber terlalu sedikit atau tidak dapat dibaca.');
  return {url:u.toString(),title,text};
}
function buildArticlePrompt(body,source=null){
  const category=cleanText(body.category||'Daerah',50),intent=cleanText(body.intent||'news',30),tone=cleanText(body.tone||'Jurnalistik Profesional',80),audience=cleanText(body.audience||'Pembaca Indonesia',180),facts=cleanText(body.facts||'',8000),extra=cleanText(body.extra||'',3000),words=Math.max(500,Math.min(2200,Number(body.length)||1000)),topic=cleanText(body.topic||(source&&source.title)||'Artikel PURBALINK',180);
  const sourceBlock=source?'SOURCE URL: '+source.url+'\nSOURCE TITLE: '+source.title+'\nSOURCE MATERIAL:\n'+source.text+'\n':'';
  const system='Anda adalah editor senior portal berita PURBALINK. Tulis artikel bernilai tinggi dalam Bahasa Indonesia yang akurat, jelas, bermanfaat, tidak clickbait, dan tidak mengarang fakta. Pisahkan fakta dari analisis. Untuk rewrite sumber, buat sintesis baru dengan susunan, pembukaan, urutan informasi, dan redaksi yang benar-benar baru; jangan meniru gaya sumber dan jangan menyalin frasa panjang. Kutipan langsung hanya jika benar-benar tersedia dan singkat. Cantumkan sumber dengan wajar. Hasil WAJIB berupa JSON valid tanpa markdown fence.';
  const prompt=sourceBlock+'\nTASK: '+(source?'REWRITE / ORIGINAL SYNTHESIS FROM SOURCE':'CREATE ORIGINAL ARTICLE')+'\nTOPIC: '+topic+'\nCATEGORY: '+category+'\nINTENT: '+intent+'\nTONE: '+tone+'\nTARGET LENGTH: sekitar '+words+' kata\nAUDIENCE: '+audience+'\nEDITOR FACTS/NOTES: '+(facts||'Tidak ada fakta tambahan. Jangan membuat angka, nama, tanggal, atau kutipan yang tidak tersedia.')+'\nEXTRA INSTRUCTIONS: '+(extra||'Tambahkan ringkasan, struktur H2/H3 yang natural, FAQ bila relevan, dan penutup yang informatif.')+'\n\nOUTPUT JSON SCHEMA:\n{"title":"judul informatif, menarik, tidak sensasional","html":"HTML artikel lengkap hanya memakai h1,h2,h3,p,ul,ol,li,strong,em,a","meta":"meta description 120-160 karakter","slug":"slug-url","tags":["tag1","tag2","tag3"],"quality_notes":["catatan verifikasi editorial","catatan sumber"]}\nPastikan HTML berdiri sendiri.'+(source?'\nSertakan tautan atribusi ke '+source.url+' dalam artikel atau quality_notes. Buat redaksi orisinal dan tetap hormati atribusi sumber.':'');
  return {system,prompt,words};
}
function parseArticleResult(text){
  const raw=String(text||'').trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,'').trim(); let data;
  try{data=JSON.parse(raw)}catch{const m=raw.match(/\{[\s\S]*\}/);if(m){try{data=JSON.parse(m[0])}catch{}}}
  if(!data||typeof data!=='object') throw new Error('Respons AI bukan JSON artikel yang valid.');
  return {title:cleanText(data.title||'Artikel PURBALINK',220),html:String(data.html||'').slice(0,120000),meta:cleanText(data.meta||'',180),slug:cleanText(data.slug||'',120).toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-'),tags:Array.isArray(data.tags)?data.tags.slice(0,10).map(x=>cleanText(x,50)):[],quality_notes:Array.isArray(data.quality_notes)?data.quality_notes.slice(0,8).map(x=>cleanText(x,250)):[]};
}
async function callOpenAI(system,prompt,cfg,maxTokens){
  const res=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{authorization:'Bearer '+cfg.key,'content-type':'application/json'},body:JSON.stringify({model:cfg.model,input:[{role:'system',content:[{type:'input_text',text:system}]},{role:'user',content:[{type:'input_text',text:prompt}]}],max_output_tokens:maxTokens})});
  const data=await res.json().catch(()=>({})); if(!res.ok) throw Object.assign(new Error((data.error&&data.error.message)||'OpenAI gagal.'),{status:res.status});
  let text=data.output_text||''; if(!text&&Array.isArray(data.output)){for(const item of data.output)for(const c of(item.content||[]))if(c.type==='output_text'&&c.text)text+=c.text} return text;
}
async function callGemini(system,prompt,cfg,maxTokens){
  const endpoint='https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(cfg.model)+':generateContent?key='+encodeURIComponent(cfg.key);
  const res=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({system_instruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{maxOutputTokens:maxTokens,responseMimeType:'application/json'}})});
  const data=await res.json().catch(()=>({})); if(!res.ok) throw Object.assign(new Error((data.error&&data.error.message)||'Gemini gagal.'),{status:res.status});
  const cand=(data.candidates||[])[0]||{}, parts=(cand.content&&cand.content.parts)||[]; return parts.map(p=>p.text||'').join('');
}
async function callAnthropic(system,prompt,cfg,maxTokens){
  const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':cfg.key,'anthropic-version':'2023-06-01','content-type':'application/json'},body:JSON.stringify({model:cfg.model,max_tokens:maxTokens,system,messages:[{role:'user',content:prompt}]})});
  const data=await res.json().catch(()=>({})); if(!res.ok) throw Object.assign(new Error((data.error&&data.error.message)||'Anthropic gagal.'),{status:res.status}); return (data.content||[]).filter(x=>x.type==='text').map(x=>x.text).join('');
}
async function callOpenAICompatible(provider,system,prompt,cfg,maxTokens){
  const endpoints={deepseek:'https://api.deepseek.com/chat/completions',groq:'https://api.groq.com/openai/v1/chat/completions',mistral:'https://api.mistral.ai/v1/chat/completions',openrouter:'https://openrouter.ai/api/v1/chat/completions',together:'https://api.together.xyz/v1/chat/completions'};
  const headers={authorization:'Bearer '+cfg.key,'content-type':'application/json'}; if(provider==='openrouter'){headers['HTTP-Referer']='https://purbalink.web.id';headers['X-Title']='PURBALINK'}
  const res=await fetch(endpoints[provider],{method:'POST',headers,body:JSON.stringify({model:cfg.model,messages:[{role:'system',content:system},{role:'user',content:prompt}],max_tokens:maxTokens})});
  const data=await res.json().catch(()=>({})); if(!res.ok) throw Object.assign(new Error((data.error&&data.error.message)||(provider+' gagal.')),{status:res.status});
  return data.choices&&data.choices[0]&&data.choices[0].message?data.choices[0].message.content:'';
}
async function callAIProvider(provider,system,prompt,cfg,maxTokens){
  if(provider==='openai') return callOpenAI(system,prompt,cfg,maxTokens);
  if(provider==='gemini') return callGemini(system,prompt,cfg,maxTokens);
  if(provider==='anthropic') return callAnthropic(system,prompt,cfg,maxTokens);
  return callOpenAICompatible(provider,system,prompt,cfg,maxTokens);
}
async function generateAIArticle(request,env){
  let body; try{body=await request.json()}catch{return json({error:'Body JSON tidak valid.'},400)}
  const modeName=body.mode==='rewrite_url'?'rewrite_url':'generate'; let source=null;
  if(modeName==='rewrite_url'){if(!body.source_url)return json({error:'URL sumber wajib diisi.'},400);source=await fetchSourceArticle(body.source_url)}
  else if(!cleanText(body.topic,180))return json({error:'Topik wajib diisi.'},400);
  const built=buildArticlePrompt(body,source),maxTokens=maxTokensForWords(built.words),requested=cleanText(body.provider||'auto',30).toLowerCase(),providers=requested==='auto'?aiOrder(env):[requested],errors=[];
  for(const provider of providers){const cfg=aiProviderConfig(provider,env,cleanText(body.model||'',120));if(!cfg||!cfg.key){errors.push(provider+': API key belum ada');continue}
    try{const text=await callAIProvider(provider,built.system,built.prompt,cfg,maxTokens),article=parseArticleResult(text);return json({...article,provider,model:cfg.model,source_url:source?source.url:null,fallback_attempts:errors.length})}
    catch(error){errors.push(provider+': '+String((error&&error.message)||error).slice(0,180));if(requested!=='auto')break}
  }
  return json({error:'Semua provider AI gagal atau belum dikonfigurasi.',details:errors},503);
}

async function verifyNotification(request, env) {
  if (!env.MIDTRANS_SERVER_KEY) return json({ error: 'MIDTRANS_SERVER_KEY belum dikonfigurasi.' }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Body JSON tidak valid.' }, 400); }
  const raw = `${body.order_id || ''}${body.status_code || ''}${body.gross_amount || ''}${env.MIDTRANS_SERVER_KEY}`;
  const digest = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(raw));
  const expected = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  if (!body.signature_key || expected.toLowerCase() !== String(body.signature_key).toLowerCase()) {
    return json({ error: 'Signature Midtrans tidak valid.' }, 401);
  }
  return json({ ok: true, order_id: body.order_id, transaction_status: body.transaction_status, payment_type: body.payment_type });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const isAdminHost = host === ADMIN_HOST;
    const isPublicHost = host === PUBLIC_HOST || host.endsWith('.workers.dev');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type,authorization' } });
    }

    try {
      // API routes remain available on the Worker regardless of public/admin hostname.
      if (url.pathname === '/api/jobs/jooble' && request.method === 'POST') return searchJooble(request, env);
      if (url.pathname === '/api/ai/article' && request.method === 'POST') return generateAIArticle(request, env);
      if (url.pathname === '/api/health') {
        return json({ ok: true, app: 'PURBALINK', public_host: PUBLIC_HOST, admin_host: ADMIN_HOST, payment_gateway: 'Midtrans', mode: mode(env), midtrans_configured: Boolean(env.MIDTRANS_SERVER_KEY), ai: { openai:Boolean(env.OPENAI_API_KEY), gemini:Boolean(env.GEMINI_API_KEY), deepseek:Boolean(env.DEEPSEEK_API_KEY), groq:Boolean(env.GROQ_API_KEY), mistral:Boolean(env.MISTRAL_API_KEY), anthropic:Boolean(env.ANTHROPIC_API_KEY), openrouter:Boolean(env.OPENROUTER_API_KEY), together:Boolean(env.TOGETHER_API_KEY) } });
      }
      if (url.pathname === '/api/midtrans/transaction' && request.method === 'POST') return createTransaction(request, env);
      if (url.pathname === '/api/midtrans/status' && request.method === 'GET') return getStatus(request, env);
      if (url.pathname === '/api/midtrans/notification' && request.method === 'POST') return verifyNotification(request, env);

      // Dedicated admin subdomain. Access is denied unless Cloudflare Access
      // authenticates the explicitly allowed admin email.
      if (isAdminHost) {
        const email = accessEmail(request);
        if (!email || email !== adminEmail(env)) return forbiddenAdmin();

        if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/admin-dashboard.html') {
          const res = await serveAsset(request, env, '/admin-dashboard.html');
          const headers = new Headers(res.headers);
          headers.set('cache-control', 'no-store');
          headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
          return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
        }

        // Allow only assets required by the admin application.
        const allowed = [
          '/admin-v5.js','/admin-v5.css','/v2.js','/v2.css','/manifest.json',
          '/icon-192.png','/icon-512.png','/brand-icon-transparent.png','/logo-purbalink.png'
        ];
        if (allowed.includes(url.pathname) || url.pathname.startsWith('/sticker/')) {
          const res = await env.ASSETS.fetch(request);
          const headers = new Headers(res.headers);
          headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
          return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
        }
        return new Response('Not Found', { status: 404, headers: { 'x-robots-tag': 'noindex, nofollow' } });
      }

      // Never expose the admin HTML on the public site.
      if (isPublicHost && (url.pathname === '/admin-dashboard.html' || url.pathname.startsWith('/admin/'))) {
        return new Response('Not Found', { status: 404, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
      }

      // Public static application.
      if (isPublicHost) return env.ASSETS.fetch(request);

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return json({ error: 'Terjadi kesalahan pada server PURBALINK.', detail: String(error?.message || error) }, 500);
    }
  },
};
