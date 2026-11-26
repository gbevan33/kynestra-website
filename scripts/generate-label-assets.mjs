import fs from 'node:fs';
import path from 'node:path';

const registryPath = 'website-assets/registry.json';
const checkOnly = process.argv.includes('--check');
const manifest = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function nameFontSize(name) {
  return Math.max(92, Math.min(150, Math.floor(1070 / (name.length * 0.62))));
}

function renderLabel(item) {
  const name = escapeXml(item.name);
  const strength = escapeXml(item.strength);
  const id = escapeXml(item.id);
  const nameSize = nameFontSize(item.name);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600" data-label-format="2"><defs><linearGradient id="silver" x1="0" x2="1"><stop stop-color="#b8bbc0"/><stop offset=".5" stop-color="#f4f4f4"/><stop offset="1" stop-color="#b9bcc1"/></linearGradient></defs><rect x="2" y="2" width="1196" height="596" rx="25" fill="url(#silver)" stroke="#b0b2b7" stroke-width="3"/><path d="M28 2H1172Q1198 2 1198 28V108H2V28Q2 2 28 2" fill="#080808"/><text x="600" y="78" font-family="Arial,sans-serif" font-size="68" font-weight="700" fill="white" text-anchor="middle">Kynestra Biosciences</text><text x="600" y="257" font-family="Arial,sans-serif" font-size="${nameSize}" font-weight="700" text-anchor="middle">${name}</text><text x="600" y="397" font-family="Arial,sans-serif" font-size="148" font-weight="700" text-anchor="middle">${strength}</text><text x="600" y="475" font-family="Arial,sans-serif" font-size="72" font-weight="700" text-anchor="middle">${id}</text><path d="M48 500H1152" stroke="black" stroke-width="7"/><text x="600" y="548" font-family="Arial,sans-serif" font-size="42" font-weight="700" text-anchor="middle">For Research Use Only.</text><text x="600" y="588" font-family="Arial,sans-serif" font-size="38" font-weight="700" text-anchor="middle">Not for human or veterinary use.</text></svg>\n`;
}

const labels = [
  ...manifest.products,
  ...(manifest.backlog || []).filter(item => item.labelSvg)
];
let changed = 0;

for (const item of labels) {
  if (!item.labelSvg) throw new Error(`${item.id}: missing labelSvg`);
  const expected = renderLabel(item);
  const current = fs.existsSync(item.labelSvg) ? fs.readFileSync(item.labelSvg, 'utf8') : null;
  if (current === expected) continue;
  changed++;
  if (!checkOnly) {
    fs.mkdirSync(path.dirname(item.labelSvg), { recursive: true });
    fs.writeFileSync(item.labelSvg, expected);
  }
}

if (checkOnly && changed) {
  throw new Error(`${changed} label asset(s) do not match the standard format. Run: node scripts/generate-label-assets.mjs`);
}

console.log(checkOnly ? `Label assets current: ${labels.length}` : `Label assets generated: ${labels.length}; updated: ${changed}`);
