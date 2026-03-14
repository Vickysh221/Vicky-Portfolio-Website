import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const prdRoot = '/Users/vickyshou/language app multiagent/docs/product-prd';

let timer = null;
let running = false;
let rerunRequested = false;

function runSync() {
  if (running) {
    rerunRequested = true;
    return;
  }
  running = true;
  console.log('[language-diary:watch] syncing...');
  const child = spawn('node', ['./scripts/sync-language-diary-prd.mjs'], {
    cwd: '/Users/vickyshou/Documents/trae_projects/My-portfolio',
    stdio: 'inherit',
  });
  child.on('exit', () => {
    running = false;
    if (rerunRequested) {
      rerunRequested = false;
      runSync();
    }
  });
}

function scheduleSync(filePath) {
  if (filePath && filePath.includes('.DS_Store')) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => runSync(), 250);
}

function watchDir(dir) {
  fs.watch(dir, { persistent: true }, (_eventType, filename) => {
    scheduleSync(filename ? path.join(dir, filename.toString()) : dir);
  });

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) watchDir(full);
  }
}

console.log('[language-diary:watch] watching', prdRoot);
runSync();
watchDir(prdRoot);
