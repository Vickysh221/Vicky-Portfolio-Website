import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const portfolioRoot = path.resolve(scriptDir, '..');
const defaultPrdRoot = path.resolve(portfolioRoot, '../language app multiagent/docs/product-prd');
const prdRoot = process.env.LANGUAGE_DIARY_PRD_ROOT
  ? path.resolve(process.env.LANGUAGE_DIARY_PRD_ROOT)
  : defaultPrdRoot;

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
    cwd: portfolioRoot,
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
if (!fs.existsSync(prdRoot)) {
  console.error('[language-diary:watch] source docs directory not found:', prdRoot);
  process.exit(1);
}
runSync();
watchDir(prdRoot);
