import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT = `You fall asleep on the camel.
It knows the way to the tents.
Sway. A long sway. Sand underfoot.
Your grandfather hums, low.
This sand was sea once,
and the sea left so slowly
the shells never noticed.
They sleep under the dunes,
under you, under the stars.`;

if (!TEXT || TEXT.trim().length === 0) {
  throw new Error('entry text is empty or whitespace-only');
}
if ([...TEXT].length > 280) {
  throw new Error(`entry text is ${[...TEXT].length} code points, over the 280 limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, TEXT, 'utf8');

// Self-check: read the file back and verify its bytes match the text exactly.
const written = readFileSync(outPath);
if (!written.equals(Buffer.from(TEXT, 'utf8'))) {
  throw new Error('self-check failed: written entry.txt bytes differ from the text');
}
console.log(`wrote ${outPath} (${[...TEXT].length} chars, self-check passed)`);
