// 上线前的文章体检：frontmatter 写错会让整站构建失败，这里给出能看懂的原因
// 跑法：pnpm lint（部署时会在构建之前自动跑）
import { readdirSync, readFileSync } from 'node:fs';

const files = readdirSync('content', { recursive: true })
  .filter((f) => f.endsWith('.md'))
  .map((f) => `content/${f}`)
  .sort();

const problems = [];

for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!fm) {
    problems.push([f, text.trim() === '' ? '空文件：一个字都没有（空 md 会让整站构建失败，删掉或补内容）' : '开头缺少 frontmatter：必须用 --- 开头，并且用 --- 收尾']);
    continue;
  }

  const body = text.slice(fm[0].length).trim();
  const pick = (k) => (fm[1].match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) ?? [])[1]?.trim();
  const title = pick('title');

  if (!title || title === '""' || title === "''") {
    problems.push([f, '缺少 title（或 title 是空的）']);
  } else if (!/^["']/.test(title) && title.includes(': ')) {
    problems.push([f, `title 里有冒号，整个值要加引号：title: "${title.slice(0, 30)}"`]);
  }

  const order = pick('order');
  if (order && !/^\d+$/.test(order)) problems.push([f, `order 要写数字（当前是 ${order}）`]);

  for (const k of ['updated', 'date']) {
    const v = pick(k);
    if (v && !/^["']?\d{4}-\d{2}-\d{2}["']?$/.test(v)) problems.push([f, `${k} 要写 YYYY-MM-DD（当前是 ${v}）`]);
  }

  if (!body) problems.push([f, '只有 frontmatter，正文是空的']);
}

console.log(`检查 ${files.length} 个文件的 frontmatter`);

if (problems.length) {
  console.log('\n以下文章格式有问题，会导致部署失败：\n');
  for (const [f, why] of problems) console.log(`  ${f}\n    → ${why}`);
  console.log('\n改完再提交。frontmatter 写法见 MAINTAINING.md 第 2 节。');
  process.exit(1);
}
