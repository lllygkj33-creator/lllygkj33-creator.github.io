// 校验横向菜单是 6 个、目录里每个链接都真的有页面：pnpm build && pnpm check
import { readdirSync, readFileSync, existsSync } from 'node:fs';

const pages = readdirSync('dist', { recursive: true }).filter((f) => f.endsWith('.html'));
const bad = [];
let n = 0;

const hrefs = (html, cls) => {
  const block = html.match(new RegExp(`<(nav|div) class="${cls}"[\\s\\S]*?</\\1>`))?.[0] ?? '';
  return [...block.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
};

// 正文和页脚里的站内链接
const bodyHrefs = (html) => {
  const prose = html.match(/<div class="prose">[\s\S]*?<footer/)?.[0] ?? '';
  return [...prose.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
};

for (const f of pages) {
  const src = readFileSync(`dist/${f}`, 'utf8');
  const tabs = hrefs(src, 'tabs');
  if (tabs.length !== 11) bad.push(`${f}: 横向菜单不是 11 个（${tabs.length}）`);
  if (!src.includes('<footer class="footer">')) bad.push(`${f}: 没有页脚`);

  for (const href of [...tabs, ...hrefs(src, 'sidebar'), ...bodyHrefs(src)]) {
    n++;
    if (!existsSync(`dist${href}index.html`)) bad.push(`${f} -> ${href} 没有页面`);
  }
}

console.log(`${pages.length} 个页面，${n} 个导航链接`);
if (bad.length) {
  console.log(bad.join('\n'));
  process.exit(1);
}
