import { readdir, readFile, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'sticker');
const output = join(root, 'public');
const images = /\.(png|jpe?g|gif|webp|avif|svg|bmp|ico)$/i;
const encodePath = path => path.split('/').map(part => encodeURIComponent(part).replace(/'/g, '%27')).join('/');

async function scan(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) files.push(...await scan(join(directory, entry.name), relative + '/'));
    else if (entry.isFile() && images.test(entry.name)) files.push(relative);
  }
  return files.sort();
}

const stickers = [];
for (const relative of await scan(source)) {
  const input = join(source, relative);
  const destination = join(output, 'sticker', relative);
  const hash = createHash('sha256').update(await readFile(input)).digest('hex').slice(0, 16);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(input, destination);
  stickers.push({
    label: relative.split('/').pop().replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
    file: 'sticker/' + encodePath(relative) + '?v=' + hash
  });
}
// GIPHY's browser API key is public client configuration, never a server credential.
const config = { stickers, giphyApiKey: process.env.GIPHY_API_KEY || '' };
await writeFile(join(output, 'media-catalog.js'), 'window.PURBALINK_MEDIA = ' + JSON.stringify(config) + ';\n');
console.log(`Prepared ${stickers.length} stickers for deployment.`);
