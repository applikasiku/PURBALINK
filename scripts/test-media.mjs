import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('public/index.html', root), 'utf8');
const script = [...html.matchAll(/<script(?![^>]*\btype=["']application\/ld\+json["'])(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
new vm.Script(script);
for(const file of ['public/v2.js','public/sw.js','scripts/build-media.mjs']){
  execFileSync(process.execPath,['--check',fileURLToPath(new URL(file,root))]);
}
class Element {
  constructor(){this.children=[];this.dataset={};this.style={};this.value='';this.selectionStart=0;this.selectionEnd=0;this.isConnected=true;this.events={};this.classList={add(){},remove(){},toggle(){},contains(){return false;}};}
  append(...items){this.children.push(...items);}
  replaceChildren(...items){this.children=items;}
  addEventListener(name,fn){this.events[name]=fn;}
  setAttribute(){}
  querySelectorAll(){return [];}
  focus(){}
}
const elements=new Map();
const element=id=>{if(!elements.has(id))elements.set(id,new Element());return elements.get(id);};
const context=vm.createContext({window:{location:{origin:'https://purbalink.web.id',search:''},addEventListener(){}},
  document:{getElementById:element,querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){},createElement:()=>new Element()},
  localStorage:{getItem(){return null;}},URL,URLSearchParams,AbortSignal,console,setTimeout:fn=>fn(),clearTimeout(){},setInterval(){},clearInterval(){}});
vm.runInContext(readFileSync(new URL('public/media-catalog.js',root),'utf8'),context);
vm.runInContext(script,context);
const run=code=>vm.runInContext(code,context);
const catalog=context.window.PURBALINK_MEDIA.stickers;
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):/\.(png|jpe?g|gif|webp|avif|svg|bmp|ico)$/i.test(e.name)?[join(dir,e.name)]:[]);
assert.equal(catalog.length,walk(fileURLToPath(new URL('sticker/',root))).length);
for(const item of catalog)assert.ok(existsSync(new URL('public/'+item.file.split('?')[0],root)));
run('renderComposerPicker("sticker")');
assert.equal(element('composerPickerBody').children.length,catalog.length);
element('composerPickerBody').children[0].events.click();
element('newComment').value='Komentar dengan sticker';
run('postComment()');
assert.equal(run('comments.at(-1).sticker'),catalog[0].file);
assert.equal(run('comments.at(-1).text'),'Komentar dengan sticker');
run('openComposerPicker("reply",1); renderComposerPicker("sticker")');
element('reply-1').value='Teks balasan tetap ada';
element('composerPickerBody').children[1].events.click();
assert.equal(element('reply-1').value,'Teks balasan tetap ada');
run('clearReplyMedia(1)');
assert.equal(element('reply-1').value,'Teks balasan tetap ada');
run('pickComposerMedia(allStickers[1].file,"sticker"); postReply(1)');
assert.equal(run('comments.at(-1).parent'),1);
assert.equal(run('comments.at(-1).sticker'),catalog[1].file);
assert.equal(run('comments.at(-1).text'),'Teks balasan tetap ada');
run('openComposerPicker("comment")');
element('newComment').value='ab';element('newComment').selectionStart=1;element('newComment').selectionEnd=1;
run('insertComposerEmoji("😀")');assert.equal(element('newComment').value,'a😀b');
run('pickMainReaction("love")');assert.equal(run('userReaction'),'love');
run('pickMainReaction("love")');assert.equal(run('userReaction'),null);
run('renderComposerPicker("gif")');assert.equal(element('composerPickerBody').children[1].children.length,6);
context.window.PURBALINK_MEDIA.giphyApiKey='test-key';
context.fetch=async url=>{assert.equal(url.hostname,'api.giphy.com');return {ok:true,json:async()=>({data:[{title:'Test GIF',images:{fixed_height:{url:'https://media.giphy.com/media/test/giphy.gif'}}}]})};};
run('renderComposerPicker("gif")');await new Promise(resolve=>setImmediate(resolve));
assert.equal(element('composerPickerBody').children[3].children.length,1);
element('composerPickerBody').children[3].children[0].events.click();assert.match(run('pendingSticker'),/media.giphy.com/);
context.fetch=async()=>{throw new Error('offline');};run('renderComposerPicker("gif")');await new Promise(resolve=>setImmediate(resolve));
assert.equal(element('composerPickerBody').children[3].children.length,6);
console.log(`PASS: JavaScript syntax, ${catalog.length} sticker assets, comment/reply media, draft retention, emoji, reactions, Giphy response and fallback.`);
