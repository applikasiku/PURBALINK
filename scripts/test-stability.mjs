import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import worker from '../src/worker.js';
const env={ASSETS:{fetch:async()=>new Response('asset')}};
for(const path of ['/v2.js','/v2.css','/sw.js']){
 const res=await worker.fetch(new Request('https://purbalink.web.id'+path),env);
 assert.match(res.headers.get('cache-control'),/max-age=0, must-revalidate/);
}
assert.equal((await worker.fetch(new Request('https://purbalink.web.id/api/ai/article',{method:'POST'}),env)).status,403);
assert.equal((await worker.fetch(new Request('https://admin.purbalink.web.id/api/ai/article',{method:'POST'}),env)).status,403);
assert.equal((await worker.fetch(new Request('https://admin.purbalink.web.id/api/ai/article',{method:'POST',headers:{'cf-access-authenticated-user-email':'amelnewsid@gmail.com'},body:'{}'}),env)).status,400);
assert.equal((await (await worker.fetch(new Request('https://purbalink.web.id/api/health'),env)).json()).version,'5.9.1');
const handlers={},entries=new Map(),deleted=[];
let network=async()=>new Response('fresh'), claimed=false;
const cache={match:async req=>entries.get(typeof req==='string'?req:req.url),put:async(req,res)=>entries.set(typeof req==='string'?req:req.url,res)};
vm.runInNewContext(readFileSync(new URL('../public/sw.js',import.meta.url),'utf8'),{
 self:{location:new URL('https://purbalink.web.id'),addEventListener:(name,fn)=>handlers[name]=fn,clients:{claim:async()=>{claimed=true}}},
 caches:{open:async()=>cache,keys:async()=>['purbalink-old','unrelated-app'],delete:async key=>deleted.push(key)},fetch:(...args)=>network(...args),URL,Response,Promise
});
async function request(path,mode='cors'){
 let response;const waits=[];
 handlers.fetch({request:{url:new URL(path,'https://purbalink.web.id').href,method:'GET',headers:new Headers(),mode},respondWith:r=>{response=r},waitUntil:r=>waits.push(r)});
 const result=await response;await Promise.all(waits);return result;
}
for(const path of ['/api/health','/api/midtrans/status?order_id=test','/admin-dashboard','/login','/profile.html','https://example.com/x.js'])assert.equal(await request(path),undefined);
entries.set('https://purbalink.web.id/v2.js',new Response('old'));
assert.equal(await (await request('/v2.js')).text(),'fresh');
network=async()=>new Response('private',{headers:{'cache-control':'no-store'}});
await request('/private.json');assert.equal(entries.has('https://purbalink.web.id/private.json'),false);
network=async()=>{throw new Error('offline')};
assert.equal((await request('/uncached.js')).status,503);
entries.set('/index.html',new Response('offline shell'));
assert.equal(await (await request('/?article=1','navigate')).text(),'offline shell');
let activated;handlers.activate({waitUntil:p=>{activated=p}});await activated;
assert.deepEqual(deleted,['purbalink-old']);assert.equal(claimed,true);
// Integration checks must be read-only even when the admin page opens automatically.
const admin=readFileSync(new URL('../public/admin-v5.js',import.meta.url),'utf8');
const healthCheck=admin.slice(admin.indexOf('async function checkIntegrations(){'),admin.indexOf('\n\nfunction notifications()'));
const calls=[];const label={textContent:''},dot={className:''};
const context={document:{querySelectorAll:()=>[{dataset:{int:'AI Article API'},querySelector:s=>s==='b'?label:dot}]},fetch:async(url,opt)=>{calls.push({url,opt});return {ok:true,json:async()=>({ai:{openai:true}})}},AbortSignal,Object};
vm.createContext(context);vm.runInContext(healthCheck,context);await context.checkIntegrations();
assert.equal(calls.length,1);assert.equal(calls[0].url,'/api/health');assert.equal(calls[0].opt.method,undefined);assert.match(label.textContent,/belum diuji/);
console.log('PASS: cache freshness, private/API exclusions, offline fallbacks, cache migration, AI access and read-only integration checks.');
