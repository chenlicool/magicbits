import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'manifest.json',
  'code.js',
  'ui.html',
  'icon.png',
  'publishing/listing.md',
  'publishing/privacy-policy.md',
  'publishing/support.md',
  'publishing/review-checklist.md',
  'publishing/data-security.md',
  'publishing/assets/community-thumbnail.png',
  'publishing/assets/carousel-generate.png',
  'publishing/assets/carousel-layouts.png',
  'publishing/assets/carousel-reroll.png',
];

function fail(message) {
  console.error(`Release validation failed: ${message}`);
  process.exit(1);
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) fail(`Missing ${file}`);
}

const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
if (manifest.name !== 'MagicBits') fail('manifest.name should be MagicBits');
if (manifest.main !== 'code.js') fail('manifest.main should point to code.js');
if (manifest.ui !== 'ui.html') fail('manifest.ui should point to ui.html');
if (manifest.documentAccess !== 'dynamic-page') {
  fail('manifest.documentAccess must be dynamic-page for new plugins');
}
if (!Array.isArray(manifest.editorType) || !manifest.editorType.includes('figma')) {
  fail('manifest.editorType should include figma');
}
if (manifest.editorType.includes('figjam')) {
  fail('manifest.editorType should not include figjam unless FigJam has been fully tested');
}
if (!manifest.networkAccess || manifest.networkAccess.allowedDomains?.[0] !== 'none') {
  fail('networkAccess.allowedDomains should be ["none"] for this offline plugin');
}

function pngSize(path) {
  const bytes = readFileSync(path);
  if (bytes.toString('ascii', 1, 4) !== 'PNG') fail(`${path} is not a PNG`);
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

const icon = pngSize(join(root, 'icon.png'));
if (icon.width !== 128 || icon.height !== 128) fail('icon.png must be 128x128');

const thumbnail = pngSize(join(root, 'publishing/assets/community-thumbnail.png'));
if (thumbnail.width !== 1920 || thumbnail.height !== 1080) {
  fail('community-thumbnail.png must be 1920x1080');
}

for (const name of ['carousel-generate.png', 'carousel-layouts.png', 'carousel-reroll.png']) {
  const file = join(root, 'publishing/assets', name);
  const size = pngSize(file);
  if (size.width !== 1920 || size.height !== 1080) {
    fail(`${name} must be 1920x1080`);
  }
  if (statSync(file).size < 10_000) fail(`${name} looks unexpectedly small`);
}

console.log('Release validation passed.');
