---
title: seo/geo docs
description: 个人资料库：SEO / GEO / XEO / Prompts / Skills / Blog
order: 0
---

这是一个人的资料库：SEO、GEO、XEO 三块专业内容，方法论和程序化 SEO，加上 Google 算法、提示词、技能、博客、项目、关于我。

## 怎么加一篇新页面

在对应的目录里新建一个 `.md` 文件，写上 4 行 frontmatter 就行，左边的目录会自动出现：

```md
---
title: 页面标题
description: 一句话说明，用于搜索和 SEO
order: 2
updated: 2026-01-01
---

正文写 markdown。
```

`order` 决定它在目录里的位置，`index.md` 是每个目录的首页。

## 现在的状态

- [x] 布局骨架：左侧 logo、搜索框、6 个目录按钮
- [x] 正文排版、右侧本页目录、上/下页
- [ ] 全站搜索（现在只有目录名过滤）
- [ ] GitHub Pages 部署
