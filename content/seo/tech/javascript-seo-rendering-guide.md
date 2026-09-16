---
title: "JavaScript SEO 与渲染"
description: "JavaScript SEO 的核心是保证搜索引擎能够抓取、渲染、发现和索引页面中的真实内容、链接与元信息。重点不是是否使用 JavaScript，而是关键内容是否必须依赖渲染才能被看到。"
order: 30
updated: "2026-09-16"
---

> JavaScript SEO 的核心不是“Google 能不能执行 JavaScript”，而是：**关键内容、链接、Canonical、Meta 与结构化数据，在抓取和渲染两个阶段都能被稳定发现。**

Google Search 会使用现代 Chromium 渲染 JavaScript 页面，但处理流程并不是一次完成，而是：

```text
Crawl
→
Render
→
Index
```

因此 JavaScript 网站真正的 SEO 风险来自：

```text
初始 HTML 过空
+
渲染依赖过重
+
资源被阻止
+
关键内容只在交互后出现
```

## 三个阶段

| 阶段 | Google 主要做什么 | 常见风险 |
| --- | --- | --- |
| Crawl | 获取 URL 和初始 HTML | robots 阻止、状态码错误 |
| Render | 执行 JavaScript | JS 错误、资源失败、等待 |
| Index | 使用渲染结果理解页面 | 内容缺失、Meta 冲突 |

初始 HTML 如果已经包含完整主内容，Google 更容易直接理解。

如果页面是：

```html
<div id="app"></div>
```

而所有正文都依赖 JavaScript 注入，Google 就必须等到渲染阶段。

## SSR、CSR 与 SSG

| 模式 | 内容生成位置 | SEO 风险 |
| --- | --- | ---: |
| SSR | 服务器生成 HTML | 低 |
| SSG | 构建时生成 HTML | 低 |
| CSR | 浏览器执行 JS 后生成 | 中高 |
| Hybrid | 部分 SSR + 部分 CSR | 可控 |

### SSR

```text
请求页面
→
服务器返回完整 HTML
```

适合：

- 内容站
- 电商
- Blog
- Documentation

### SSG

页面在构建时已经生成 HTML。

非常适合：

- Docs
- Blog
- 知识库
- 静态产品介绍

### CSR

初始 HTML 很薄：

```text
Shell
+
JavaScript Bundle
```

真正内容运行后才出现。

如果必须使用 CSR，就要重点测试 Google 渲染后的 HTML。

## 初始 HTML

建议把 SEO 核心内容尽可能放在初始 HTML：

| 内容 | 建议 |
| --- | --- |
| H1 | 初始 HTML |
| 主正文 | 初始 HTML |
| 主导航 | 初始 HTML |
| Canonical | 初始 HTML |
| Title | 初始 HTML |
| Meta Description | 初始 HTML |
| 内链 | 尽量初始 HTML |
| Schema | 初始 HTML 或稳定 JS 输出 |

原则：

> **关键搜索内容不应该完全依赖客户端渲染。**

## 状态码

JavaScript 页面仍然必须返回正确 HTTP 状态。

| 页面状态 | 应返回 |
| --- | --- |
| 正常页面 | 200 |
| 永久删除 | 404 / 410 |
| 永久迁移 | 301 / 308 |
| 临时迁移 | 302 / 307 |
| 服务器错误 | 5xx |

不要先返回：

```text
200
```

再用 JavaScript 显示：

```text
Page Not Found
```

这容易形成 Soft 404。

## 内链

Google 主要通过标准链接发现 URL。

推荐：

```html
<a href="/seo/javascript-seo/">JavaScript SEO</a>
```

不要依赖：

```html
<div onclick="goToPage()">Open</div>
```

或者只有：

```javascript
router.push(...)
```

而没有可抓取的 `href`。

正确原则：

```text
重要导航
=
真实 <a href>
```

## JavaScript 注入链接

Google 可以看到渲染后注入 DOM 的链接，但没有必要把核心发现链路完全依赖 JavaScript。

优先级：

| 链接类型 | 建议 |
| --- | --- |
| HTML `<a href>` | 最佳 |
| JS 渲染后的 `<a href>` | 可用 |
| onclick 无 href | 不推荐 |
| Canvas 中的链接 | 不可靠 |

## robots.txt

如果 JavaScript、CSS 或 API 资源被 robots.txt 阻止，Google 可能无法正确渲染页面。

例如：

```text
Disallow: /assets/
```

而页面所有 JS 都在：

```text
/assets/app.js
```

可能造成渲染异常。

检查：

- JS
- CSS
- API
- 图片
- Font

是否需要 Googlebot 访问。

## Canonical

Canonical 最好直接存在于初始 HTML。

稳定：

```html
<link rel="canonical" href="https://www.xxxx.com/page/">
```

高风险：

```text
原始 HTML Canonical = A
JavaScript 渲染后 Canonical = B
```

这会制造冲突。

如果使用 JS 动态设置 Canonical，必须保证最终值始终一致。

## Title 与 Meta

JavaScript 可以修改：

```text
<title>
meta description
```

但更稳定的方法仍然是服务端或构建时输出。

SPA 常见错误：

```text
所有 URL
Title 都是 "App"
```

正确：

| URL | Title |
| --- | --- |
| /product-a | Product A |
| /product-b | Product B |
| /blog/c | Article C |

每个可索引 URL 都应有独立语义。

## Lazy Loading

图片和正文可以 Lazy Load，但不要把关键内容绑定到用户交互。

高风险：

```text
必须滚动 3 屏
→
才请求正文
```

或：

```text
点击 Tab
→
才请求核心规格
```

如果关键内容必须进入索引，建议确保它在可渲染 DOM 中稳定出现。

## 无限滚动

无限滚动如果没有独立 URL，Google 可能无法发现全部内容。

更稳妥：

```text
/page/1
/page/2
/page/3
```

或者提供可抓取分页链接。

不要只依赖：

```text
Scroll Event
→
Load More
```

## API 数据

如果正文来自 API：

```text
HTML
→ JS
→ API
→ Content
```

任何一个环节失败，Google 看到的内容都可能为空。

重点检查：

| 风险 | 结果 |
| --- | --- |
| API 403 | 内容缺失 |
| CORS 错误 | 内容缺失 |
| 超时 | 渲染失败 |
| 登录要求 | Google 无法访问 |
| Token 过期 | 内容不稳定 |

搜索核心信息最好不要依赖复杂授权 API。

## Hydration

现代框架常使用 Hydration。

例如：

```text
服务器先返回 HTML
→ JavaScript 接管交互
```

这是比较理想的模式。

SEO 重点是确认：

```text
Hydration 失败时
主内容仍然存在
```

不要出现：

```text
HTML 有内容
→ Hydration 执行失败
→ 页面被清空
```

## Web Components

Google 可以处理现代 Web Components，但最终仍应检查渲染后的 HTML 是否包含：

- 主内容
- 链接
- Schema
- 产品信息

不要只假设浏览器正常，就代表 Google 一定正常。

## Dynamic Rendering

过去一些网站给：

```text
Googlebot → 预渲染版本
用户 → JavaScript 版本
```

这种方案叫 Dynamic Rendering。

现在它不应该是长期首选架构。

优先考虑：

```text
SSR
SSG
Hybrid Rendering
```

Dynamic Rendering 更适合作为临时解决方案，而不是基础 SEO 架构。

## 渲染差异

SEO 排查时一定比较：

```text
Raw HTML
vs
Rendered HTML
```

例如：

| 元素 | Raw HTML | Rendered |
| --- | --- | --- |
| H1 | 无 | 有 |
| Canonical | A | B |
| Product Price | 无 | 有 |
| Internal Links | 5 | 80 |

差异越大，对渲染稳定性的依赖越高。

## 怎么检测

常用方法：

| 工具 | 看什么 |
| --- | --- |
| View Source | 初始 HTML |
| DevTools Elements | 浏览器渲染 DOM |
| URL Inspection | Google 渲染结果 |
| Rich Results Test | 渲染 + Schema |
| Screaming Frog JS Rendering | 大规模比较 |
| Server Logs | Googlebot 是否抓资源 |

重点测试：

```text
Raw HTML
→
Rendered HTML
→
Google Rendered HTML
```

是否一致。

## 常见红线

| 问题 | 风险 |
| --- | --- |
| 主内容必须登录后加载 | 无法索引 |
| 核心链接只有 onclick | 发现困难 |
| JS 文件被 robots 阻止 | 渲染异常 |
| 所有 URL 返回 200 | Soft 404 |
| Canonical JS 动态冲突 | 主版本混乱 |
| 无限滚动无分页 URL | 内容发现不足 |
| Title 全站一致 | 页面语义弱 |
| API 内容偶发为空 | 索引不稳定 |

## QA 清单

| 检查 | 合格 |
| --- | --- |
| 初始 HTML 有核心内容 | 是 |
| HTTP 状态正确 | 是 |
| 重要链接有 href | 是 |
| Canonical 稳定 | 是 |
| Title / Meta 唯一 | 是 |
| JS / CSS 可抓取 | 是 |
| Lazy Load 可渲染 | 是 |
| API 无权限障碍 | 是 |
| 渲染后 Schema 完整 | 是 |
| URL Inspection 正常 | 是 |

## 核心规范

```text
关键内容优先服务端输出
→
重要链接使用标准 href
→
保证资源可抓取
→
保证状态码正确
→
比较 Raw 与 Rendered HTML
→
用 Google 渲染结果最终验证
```

> **JavaScript SEO 的目标不是避免 JavaScript，而是避免“搜索核心信息只存在于一个不稳定的渲染过程里”。最稳的架构始终是：用户能快速看到，Googlebot 也能快速理解。**
