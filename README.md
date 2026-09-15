# Seo Geo Docs

个人 blog + 文档站。Astro + Markdown，部署到 GitHub Pages。

## 加一篇新页面

在对应栏目目录里新建一个 `.md` 文件就行，导航不用改：

```
content/seo/technical-audit.md
```

```md
---
title: 技术审计
description: 一句话说明，用于搜索结果摘要
order: 2          # 左栏里的顺序，小的在前；不写默认 99
updated: 2026-01-15
---

正文写 markdown 就行。
```

## 目录结构 = 导航结构

| 文件位置 | 效果 |
| --- | --- |
| `content/seo/index.md` | 栏目首页，URL `/seo/` |
| `content/seo/xxx.md` | 该栏目下的页面，URL `/seo/xxx/`，自动进左栏 |
| `content/index.md` | 站点首页，URL `/` |

栏目名必须和 `src/lib/nav.ts` 里 `sections` 的 `id` 一致，才会出现在顶部横向菜单。

### 左栏分组

栏目目录下再建**子目录**，就会变成左栏里的小标题（不建就只有一层平铺）：

```
content/seo/index.md                    → 栏目首页
content/seo/basics/keyword-research.md  → 分组「概览」下的「关键词研究」
```

分组标题默认用文件夹名（`on-page` → On Page）。要改成中文或调顺序，在 `nav.ts` 的
`sections` 里写一行，没列到的文件夹自动排在后面：

```js
{ id: 'seo', label: 'SEO', groups: [['basics', '概览'], ['on-page', '站内 SEO'], ['off-page', '站外 SEO']] },
```

## 加第 9 个栏目

1. 新建目录 `content/新栏目/index.md`（写标题和正文）
2. 在 `src/lib/nav.ts` 的 `sections` 里加一行：

```js
{ id: '新栏目', label: '新栏目' },
```

位置就是横向菜单里的位置。

## 图片

放进 `public/`，正文里写 `/图片名.png`。例如 `public/demo.png` → `![说明](/demo.png)`。

## 两个发布方式

**本地写（推荐）**

```bash
pnpm dev                 # 本地预览 http://localhost:4321
git add -A && git commit -m "新文章" && git push
```

**在 GitHub 网页上写**

仓库里点进 `content/栏目/` → `Add file` → `Create new file` → 文件名写 `xxx.md` → 粘贴上面的 frontmatter 和正文 → `Commit changes`。推上去后 Actions 会自动构建部署，约 1 分钟后线上生效。

（改 `src/lib/nav.ts` 加栏目也可以直接在 GitHub 网页上编辑。）

## 命令

```bash
pnpm dev      # 本地预览，改文件即时刷新
pnpm build    # 构建到 dist/
pnpm check    # 校验每个导航链接都有对应页面（先 build）
```

## 文件在哪

```
content/          所有文章（只有这里需要你天天改）
src/lib/nav.ts    顶部 11 个栏目、标签文字和分组顺序
src/layouts/      页面骨架：顶栏、左栏、目录、页脚
src/styles/global.css  所有样式和配色变量
public/           图片、logo、字体
```
