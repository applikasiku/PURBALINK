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

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type,authorization' } });
    }

    try {
      if (url.pathname === '/api/health') {
        return json({ ok: true, app: 'PURBALINK', payment_gateway: 'Midtrans', mode: mode(env), midtrans_configured: Boolean(env.MIDTRANS_SERVER_KEY) });
      }
      if (url.pathname === '/api/midtrans/transaction' && request.method === 'POST') return createTransaction(request, env);
      if (url.pathname === '/api/midtrans/status' && request.method === 'GET') return getStatus(request, env);
      if (url.pathname === '/api/midtrans/notification' && request.method === 'POST') return verifyNotification(request, env);
      return json({ error: 'API route tidak ditemukan.' }, 404);
    } catch (error) {
      return json({ error: 'Terjadi kesalahan pada server PURBALINK.', detail: String(error?.message || error) }, 500);
    }
  },
};
