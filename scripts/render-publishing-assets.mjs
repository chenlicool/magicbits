import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const outDir = join(process.cwd(), 'publishing', 'assets');
mkdirSync(outDir, { recursive: true });

const W = 1920;
const H = 1080;
const font = "Inter, 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function text(value, x, y, size, weight = 600, fill = '#151515', extra = '') {
  return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(value)}</text>`;
}

function card(x, y, w, h, fill = '#ffffff', stroke = '#dedbd2', r = 18) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

function chip(label, x, y, fill = '#f4f0ff', color = '#5b2dcb') {
  return `<rect x="${x}" y="${y}" width="${label.length * 17 + 44}" height="42" rx="21" fill="${fill}"/>${text(label, x + 22, y + 28, 20, 700, color)}`;
}

function button(label, x, y, w, fill = '#6f46ff') {
  return `<rect x="${x}" y="${y}" width="${w}" height="58" rx="12" fill="${fill}"/>${text(label, x + 28, y + 38, 22, 800, '#ffffff')}`;
}

function scatter(seed = 1, count = 36, x = 1008, y = 188, w = 690, h = 690) {
  let s = seed;
  function rnd() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  }

  const colors = ['#7c4dff', '#26a69a', '#ff7043', '#ffca28', '#42a5f5', '#ec407a', '#66bb6a'];
  const parts = [card(x, y, w, h, '#fffdf8', '#ddd6c9', 28)];
  parts.push(text('ScatterBoard', x + 40, y + 62, 28, 800, '#191714'));
  parts.push(text('36 generated pieces', x + 40, y + 96, 19, 600, '#777067'));

  for (let i = 0; i < count; i++) {
    const px = x + 58 + rnd() * (w - 150);
    const py = y + 122 + rnd() * (h - 190);
    const rw = 54 + rnd() * 82;
    const rh = 42 + rnd() * 70;
    const rot = -18 + rnd() * 36;
    const color = colors[i % colors.length];
    parts.push(`<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${rot.toFixed(1)})">
      <rect width="${rw.toFixed(1)}" height="${rh.toFixed(1)}" rx="12" fill="${color}" opacity="0.92"/>
      <rect x="10" y="10" width="${Math.max(20, rw - 20).toFixed(1)}" height="8" rx="4" fill="#ffffff" opacity="0.74"/>
      <rect x="10" y="26" width="${Math.max(14, rw * 0.52).toFixed(1)}" height="8" rx="4" fill="#ffffff" opacity="0.48"/>
    </g>`);
  }

  return parts.join('\n');
}

function appPanel(x = 170, y = 220) {
  const rows = [
    ['Layout mode', 'Organic'],
    ['Copies', '36'],
    ['Scale', '60% - 140%'],
    ['Rotation', '+/- 18 deg'],
  ];
  const parts = [card(x, y, 390, 575, '#ffffff', '#dedbd2', 28)];
  parts.push(`<rect x="${x}" y="${y}" width="390" height="86" rx="28" fill="#191714"/>`);
  parts.push(text('MagicBits', x + 34, y + 54, 31, 900, '#ffffff'));
  parts.push(text('ScatterBoard', x + 34, y + 112, 22, 800, '#191714'));
  parts.push(text('Whiteboard layout generator', x + 34, y + 144, 18, 600, '#777067'));
  parts.push(chip('Generate', x + 34, y + 174, '#ece6ff', '#5b2dcb'));
  parts.push(chip('Reroll', x + 196, y + 174, '#e7f6f3', '#11756c'));
  rows.forEach(([label, value], i) => {
    const yy = y + 260 + i * 64;
    parts.push(text(label, x + 34, yy, 19, 700, '#777067'));
    parts.push(text(value, x + 230, yy, 22, 800, '#191714'));
    parts.push(`<rect x="${x + 34}" y="${yy + 18}" width="322" height="8" rx="4" fill="#eee9df"/>`);
    parts.push(`<rect x="${x + 34}" y="${yy + 18}" width="${150 + i * 38}" height="8" rx="4" fill="${['#7c4dff', '#26a69a', '#ff7043', '#42a5f5'][i]}"/>`);
  });
  parts.push(button('Generate ScatterBoard', x + 34, y + 488, 322));
  return parts.join('\n');
}

function compactControls(x, y) {
  const parts = [card(x, y, 330, 260, '#ffffff', '#dedbd2', 22)];
  parts.push(`<rect x="${x}" y="${y}" width="330" height="66" rx="22" fill="#191714"/>`);
  parts.push(text('MagicBits', x + 28, y + 43, 28, 900, '#ffffff'));
  parts.push(text('Layout: Organic', x + 28, y + 112, 22, 850, '#191714'));
  parts.push(`<rect x="${x + 28}" y="${y + 136}" width="274" height="9" rx="4.5" fill="#eee9df"/>`);
  parts.push(`<rect x="${x + 28}" y="${y + 136}" width="170" height="9" rx="4.5" fill="#7c4dff"/>`);
  parts.push(text('Copies: 36', x + 28, y + 184, 22, 850, '#191714'));
  parts.push(`<rect x="${x + 28}" y="${y + 208}" width="274" height="9" rx="4.5" fill="#eee9df"/>`);
  parts.push(`<rect x="${x + 28}" y="${y + 208}" width="220" height="9" rx="4.5" fill="#26a69a"/>`);
  return parts.join('\n');
}

function shell(body, label, title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#fbfaf7"/>
    <rect x="64" y="64" width="1792" height="952" rx="42" fill="#fffdf8" stroke="#dedbd2" stroke-width="2"/>
    ${text(label, 140, 148, 24, 800, '#6f46ff')}
    ${text(title, 140, 232, 78, 900, '#151515')}
    ${text(subtitle, 144, 286, 30, 650, '#68635b')}
    ${body}
  </svg>`;
}

const files = {
  'community-thumbnail': shell(
    `${appPanel(150, 340)}
     ${scatter(11, 42, 780, 226, 870, 690)}
     ${chip('No network access', 1410, 130, '#e7f6f3', '#11756c')}`,
    'FIGMA DESIGN PLUGIN',
    'MagicBits',
    'Create playful ScatterBoards in seconds.'
  ),
  'carousel-generate': shell(
    `${card(150, 350, 420, 420, '#ffffff', '#dedbd2', 28)}
     ${text('1. Select layers', 198, 432, 32, 900)}
     ${chip('Component', 198, 486, '#ece6ff', '#5b2dcb')}
     ${chip('Frame', 198, 546, '#e7f6f3', '#11756c')}
     ${chip('Text', 198, 606, '#fff1dc', '#9a5200')}
     ${card(750, 350, 420, 420, '#ffffff', '#dedbd2', 28)}
     ${text('2. Tune controls', 798, 432, 32, 900)}
     ${compactControls(798, 476)}
     ${scatter(22, 25, 1350, 300, 390, 390)}
     ${text('3. Generate a board', 1332, 758, 32, 900)}`,
    'WORKFLOW',
    'Select. Tune. Generate.',
    'Turn a few source layers into a ready-to-edit board.'
  ),
  'carousel-layouts': shell(
    `${['Random', 'Grid', 'Spiral', 'Circle', 'Masonry', 'Hex grid', 'Starburst', 'Organic', 'Clusters', 'Zigzag', 'Vortex'].map((name, i) => {
      const x = 150 + (i % 4) * 415;
      const y = 350 + Math.floor(i / 4) * 180;
      return `${card(x, y, 350, 130, '#ffffff', '#dedbd2', 20)}
        ${text(name, x + 28, y + 50, 28, 900)}
        <rect x="${x + 28}" y="${y + 78}" width="72" height="22" rx="11" fill="#7c4dff"/>
        <rect x="${x + 112}" y="${y + 78}" width="50" height="22" rx="11" fill="#26a69a"/>
        <rect x="${x + 174}" y="${y + 78}" width="92" height="22" rx="11" fill="#ff7043"/>`;
    }).join('\n')}`,
    'LAYOUT MODES',
    '11 ways to arrange ideas.',
    'From tidy grids to energetic organic compositions.'
  ),
  'carousel-reroll': shell(
    `${scatter(33, 28, 180, 340, 560, 500)}
     ${text('Existing ScatterBoard', 230, 895, 28, 900)}
     ${button('Reroll', 835, 560, 250, '#26a69a')}
     <path d="M765 590 C805 560 815 548 835 536" fill="none" stroke="#151515" stroke-width="6" stroke-linecap="round"/>
     <path d="M1095 590 C1140 560 1160 548 1180 536" fill="none" stroke="#151515" stroke-width="6" stroke-linecap="round"/>
     ${scatter(44, 28, 1180, 340, 560, 500)}
     ${text('Same pieces, new layout', 1225, 895, 28, 900)}
     ${chip('Relaunch buttons supported', 742, 730, '#ece6ff', '#5b2dcb')}`,
    'REROLL',
    'Refresh a board without duplicating.',
    'Select a generated ScatterBoard and rearrange its existing contents.'
  ),
};

for (const [name, svg] of Object.entries(files)) {
  const svgPath = join(outDir, `${name}.svg`);
  const pngPath = join(outDir, `${name}.png`);
  writeFileSync(svgPath, svg);
  const result = spawnSync('rsvg-convert', ['-w', String(W), '-h', String(H), '-f', 'png', '-o', pngPath, svgPath], {
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    process.exit(result.status ?? 1);
  }
  console.log(`Rendered ${pngPath}`);
}
