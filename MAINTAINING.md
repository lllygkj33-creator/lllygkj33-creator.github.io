# 维护说明

这份文档写给"以后在 GitHub 网页上改内容"的自己。**只想加文章，看第 2 节就够。**

---

## 1. 仓库结构：哪些能改，哪些别动

```
content/                ← 所有文章，平时只改这里
  seo/  geo/  xeo/  method/  programmatic-seo/
  google-algorithm/  prompts/  skills/  blog/  project/  about-me/
src/
  lib/nav.ts            ← 顶部菜单：栏目、显示名、分组顺序
  layouts/              ← 页面骨架（顶栏、左栏、目录、页脚）
  components/           ← 顶栏、左栏组件
  styles/global.css     ← 所有样式和配色变量
public/                 ← 图片、logo、字体
```

| 想做的事 | 改哪 |
| --- | --- |
| 加/改文章 | `content/栏目/*.md` |
| 加/改栏目（顶部菜单） | `content/新栏目/index.md` + `src/lib/nav.ts` 加一行 |
| 改左栏分组名或顺序 | `src/lib/nav.ts` 里那一栏的 `groups` |
| 改配色、字号、宽度 | `src/styles/global.css` 顶部的变量 |
| 改页脚、版权 | `src/layouts/Layout.astro` |

**别动的**：`src/layouts/`、`src/components/`、`src/pages/` 里的逻辑代码（改了容易整站崩），以及**已发布页面的文件路径**（等于改了 URL，见第 6 节）。

---

## 2. 在 GitHub 网页上加一篇文章

1. 打开仓库，进入目标栏目目录，例如 `content/seo/on-page/`
2. 右上角 **Add file → Create new file**
3. 文件名写 `english-slug.md`（**英文小写、连字符、不要空格和中文**）
4. 粘贴下面的模板，改内容
5. 页面底部 **Commit changes**（提交到 `main` 分支）
6. 等 1-2 分钟，Actions 跑完自动上线

```markdown
---
title: 页面标题
description: 一句话说明，40-60 字，会进搜索结果摘要
order: 5
updated: 2026-09-15
---

> 摘要一行：这页解决什么问题。紧跟标题，会被搜索和 AI 直接摘走。

正文第一段直接给结论，不要铺垫。

## 小节标题（名词短语）

段落控制在三句以内。关键结论用 **加粗** 标出来。

## Next steps

- 相关页面：看它能得到什么
```

**改已有文章**：进入文件 → 点右上角铅笔图标 → 改 → Commit changes。

### frontmatter 字段

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | ✅ | 页面标题，同时是左栏目录名 |
| `description` | 建议 | 搜索结果摘要，40-60 字 |
| `order` | 建议 | 左栏排序，小的在前，不写默认 99 |
| `updated` | 建议 | 最后更新时间，格式 `2026-09-15` |

**语法细节**：冒号后面要有空格；`title` 里如果出现冒号，整个值要用引号包起来（`title: "A: B"`）。frontmatter 写错会导致**整个站构建失败**，Actions 会报红，改回来就好。

---

## 3. 目录结构 = 导航结构

```
content/seo/index.md                     → 栏目首页，URL /seo/
content/seo/basics/keyword-research.md   → 左栏分组「概览」下的页面
                                            URL /seo/basics/keyword-research/
content/index.md                         → 站点首页，URL /
```

- **子文件夹 = 左栏里的小标题**。建了文件夹就有分组，不用改代码
- 分组标题默认取文件夹名（`on-page` → On Page），要中文或调顺序，改 `nav.ts` 里那一栏的 `groups`：

```js
{ id: 'seo', label: 'SEO', groups: [['basics', '概览'], ['on-page', '站内 SEO'], ['off-page', '站外 SEO']] },
```

- **没列到的文件夹自动排在后面**，用文件夹名当标题——所以"建个文件夹就成组"依然成立
- **`order` 只在组内生效**，跨组顺序由 `groups` 决定

### 加一个新栏目（新的顶部菜单）

1. 建目录并放页面：`content/新栏目/页面.md`
2. 在 `src/lib/nav.ts` 的 `sections` 里加一行：

```js
{ id: '新栏目', label: '顶部菜单显示名', groups: [['分组文件夹', '分组中文名']] },
```

`id` 必须和目录名完全一致。`groups` 可以省略（那就只有一层平铺）。

**栏目首页是可选的**：建了 `content/新栏目/index.md` 菜单就指向它；没建就自动指向该栏目下的第一个页面，不会 404。

---

## 4. 写作规范

内容格式规范单独一份：**[WRITING.md](WRITING.md)**。核心几条：

- 标题下面紧跟一行 `>` 摘要，不复述标题
- 段落 ≤3 句，句子 ≤25 词
- 有后果的提醒写 `> 警告：`，省事的做法写 `> 提示：`
- 每页结尾是链接清单（`## Next steps`），每条链接后面跟一句收益说明
- 不写"总结"段

---

## 5. 图片

放进 `public/` 目录（可以在 GitHub 网页上直接上传），正文里写：

```markdown
![图片说明](/demo.png)
```

**路径以 `/` 开头**（不是 `public/demo.png`）。文件名用英文小写。

---

## 6. 链接和 URL 规范

**正文里不写站内链接。** 提到其他页面时直接写页面名称（如「见信息增益」），导航由顶部菜单和左栏自动生成。

这样做的好处：**改文件路径、改标题、挪分组都不用回头改任何文章。**

- **站外链接照写**，只给一手来源（官方文档、原始研究、带日期的数据）
- 发布过的文件路径**可以**改（没有内链要跟着改），但外部链接和搜索收录会失效——改之前想清楚，重要页面用 301，普通页面建新文件即可
- 改文章标题是安全的：只是显示名变了，URL 不变

---

## 7. 部署是怎么跑的

```
网页上 Commit → GitHub Actions 自动构建 → 部署到 Pages
```

- 工作流文件：`.github/workflows/deploy.yml`
- 看进度：仓库顶部 **Actions** 标签页。绿勾=成功，红叉=失败
- 部署前会先跑**文章体检**（`pnpm lint`）：frontmatter 缺失、空文件、order 不是数字，都会在这里被拦住，并**直接列出是哪个文件、什么问题**
- 体检过了才构建，构建过了才部署
- 想手动重跑：Actions → 左侧「部署到 GitHub Pages」→ 右上角 **Run workflow**
- 线上地址：`https://lllygkj33-creator.github.io/`

---

## 8. 改坏了怎么回滚

**单个文件改错**：进入该文件 → 右上角 **History** → 找到改坏之前的那次提交 → 用当时的版本重新提交。

**整次提交有问题**：

1. 仓库首页 **Commits**（提交历史）
2. 找到那次提交，右上角 **Revert**（GitHub 会新建一个反向提交）
3. 提交后 Actions 自动重新部署，1-2 分钟回到之前的状态

不用怕改坏：**每次提交都有完整历史，任何状态都能回到**。

---

## 9. 常见错误

| 现象 | 原因 |
| --- | --- |
| Actions 红叉，构建失败 | 先看日志里「检查文章格式」那一步，它会列出有问题的文件；常见是空文件、缺 title、order 写成文字 |
| 推送了但线上没更新 | Actions 里那一步红叉了，看它的日志 |
| 新页面没出现在左栏 | `order` 值不合理，或文件放错了栏目目录 |
| 左栏或顶栏链接 404 | 栏目名和 `nav.ts` 的 `id` 对不上，或页面文件缺失；`pnpm check` 会在部署时拦住 |
| 正文里的页面名点不动 | 正常——正文不写站内链接，去左栏找同名页面 |
| 图片不显示 | 图片没放 `public/`，或正文里写了 `public/` 前缀 |
| 菜单多了一个栏目但点开空白 | `nav.ts` 里加了 `id`，但没建对应的 `content/栏目/index.md` |
| 页面顺序不对 | 组内看 `order`，组间看 `nav.ts` 的 `groups` 数组顺序 |

---

## 10. 本地预览（可选）

如果要在本地先看效果：

```bash
git clone git@github.com:lllygkj33-creator/lllygkj33-creator.github.io.git
cd lllygkj33-creator.github.io
pnpm install
pnpm dev          # http://localhost:4321，改文件即时刷新
```

提交前自检：

```bash
pnpm build        # 构建
pnpm check        # 校验所有导航和正文链接
```

---

## 11. 协作：谁能改、怎么加人

**公开仓库 ≠ 谁都能改。** public 只意味着任何人都能**看**和**复制一份到自己账号（fork）**；能往这个仓库提交的，只有仓库主和你邀请的协作者。

### 加一个协作者

1. 打开仓库 **Settings → Collaborators**（个人仓库路径：`/settings/access`）
2. 点 **Add people**
3. 输入对方的 GitHub 用户名、邮箱或全名，搜索并选中
4. 选角色：
   - **Write** —— 能提交、能触发部署。**给内容协作者就选这个**
   - Maintain —— 额外能改部分设置
   - Admin —— 全部权限，**包含删除仓库，不要给**
5. 点 **Add**，对方会收到邮件邀请，**必须接受**才生效

对方接受后，就能像你一样在网页上改文件、提交，提交会直接触发部署上线。

### 两种协作方式，按信任程度选

| 方式 | 对方能做什么 | 上线时机 |
| --- | --- | --- |
| 给 Write 权限 | 直接提交到 main | 提交即上线 |
| 不给权限，走 fork + Pull Request | 在自己账号里改，提 PR | **你点 Merge 之后才上线** |

因为 Pages 只从 `main` 分支部署，**Pull Request 就是天然的审核闸门**。

### 建议：给 main 加保护规则

即使给了 Write 权限，也可以要求"必须走 PR"：

1. **Settings → Branches**（新版界面在 **Rules / Rulesets**）
2. **Add branch protection rule**，Branch name pattern 填 `main`
3. 勾选 **Require a pull request before merging**（可再勾需要 1 个 approval）
4. 保存

效果：任何人（包括协作者）都不能直接推 main，只能提 PR，**你批准后才合并、才上线**。你自己仍可在网页上直接编辑。

### 邀请常见问题

- 对方必须有 GitHub 账号
- 邀请**没接受之前不生效**，可以在 Collaborators 页面看到待接受状态
- 想收回权限：同一页面点 **Remove**
- 部署失败时协作者也能在 **Actions** 页看到失败原因和日志，不用你转述
