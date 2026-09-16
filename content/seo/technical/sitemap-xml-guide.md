---
title: "Sitemap.xml"
description: "Sitemap.xml 用于向搜索引擎提供希望被发现和抓取的规范 URL 清单。它帮助发现页面，但不会强制抓取、索引或排名。"
order: 3
updated: "2026-09-16"
---

> Sitemap.xml 的核心不是“把全站 URL 全塞进去”，而是：**向搜索引擎提交一份干净、可索引、希望参与搜索的规范 URL 清单。**

## Sitemap 是什么

Sitemap 是发现机制，不是排名机制。

```text
Sitemap
→ 帮助发现 URL
≠
保证抓取
≠
保证索引
≠
保证排名
```

| 能做什么 | 不能做什么 |
| --- | --- |
| 提供 URL 清单 | 强制 Google 抓取 |
| 帮助发现深层页面 | 强制 Google 索引 |
| 提供 lastmod | 提升页面排名 |
| 管理大型站点 URL | 修复低质量内容 |
| 支持图片、视频、新闻扩展 | 代替内链 |

## 应该放哪些 URL

只放希望被搜索引擎索引的主版本 URL。

| URL 类型 | 是否进入 Sitemap |
| --- | --- |
| Canonical 主 URL | 是 |
| 200 状态页面 | 是 |
| 可索引页面 | 是 |
| 301 / 302 | 否 |
| 404 / 410 | 否 |
| Noindex | 否 |
| 参数重复页 | 通常否 |
| 搜索结果页 | 否 |
| 测试页 | 否 |
| Staging | 否 |

原则：

```text
Sitemap URL
=
Canonical
+
200
+
Indexable
+
值得存在
```

## 一个基础示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.xxxx.com/seo/sitemap-guide/</loc>
    <lastmod>2026-09-16</lastmod>
  </url>
</urlset>
```

核心字段：

| 字段 | 作用 |
| --- | --- |
| `loc` | 页面 URL |
| `lastmod` | 最后实质更新时间 |
| `changefreq` | 搜索引擎可能忽略 |
| `priority` | Google 不依赖它决定排名 |

实际工作中重点维护：

```text
loc
+
lastmod
```

## lastmod 怎么写

`lastmod` 应表示：

> 页面发生了实质性内容更新。

适合修改：

- 关键事实更新
- 产品规格变化
- 主要段落重写
- 新版本上线
- 重要数据更新

不适合：

- 改一个错字
- 自动每天刷新时间
- Footer 变化
- 模板小调整

错误：

```text
所有 URL 每天 lastmod 都变成今天
```

这样会降低时间信号可信度。

## Sitemap 上限

单个 Sitemap 常规限制：

```text
最多 50,000 个 URL
未压缩最大 50MB
```

超过后需要拆分：

```text
sitemap-products.xml
sitemap-blogs.xml
sitemap-pages.xml
```

再用 Sitemap Index 统一管理。

## Sitemap Index

示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.xxxx.com/sitemap-products.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.xxxx.com/sitemap-blogs.xml</loc>
  </sitemap>
</sitemapindex>
```

大型网站建议按页面类型拆分。

| Sitemap | 用途 |
| --- | --- |
| Product | 产品 |
| Collection | 品类 |
| Blog | 内容 |
| Support | 帮助文档 |
| Image | 图片 |
| Video | 视频 |

这样更容易诊断：

```text
提交多少
索引多少
哪一类异常
```

## Sitemap 与 Canonical

Sitemap 中应该只放 Canonical URL。

例如：

```text
/product-a
/product-a?variant=red
/product-a?utm_source=email
```

如果主版本是：

```text
/product-a
```

则 Sitemap 只保留：

```text
/product-a
```

否则会向 Google 发送冲突信号：

```text
Canonical 说 A 是主版本
Sitemap 又提交 B、C
```

## Sitemap 与 robots.txt

可以在 robots.txt 中声明：

```text
Sitemap: https://www.xxxx.com/sitemap.xml
```

但 Sitemap 不会覆盖 robots.txt。

如果：

```text
Sitemap 中有 URL
但 robots.txt 禁止抓取
```

仍然会形成冲突。

## Sitemap 与内链

Sitemap 不能替代内部链接。

如果一个页面：

```text
在 Sitemap 里
但没有任何内链
```

它仍然可能是孤岛页。

正确结构：

```text
Sitemap
帮助发现

Internal Links
帮助理解层级和权重
```

## 图片 Sitemap

图片密集型网站可以为图片提供额外信息。

适合：

- 电商
- 摄影
- 图库
- 产品评测
- 信息图

但优先级仍然是：

```text
图片可抓取
+
页面可索引
+
图文相关
```

不是单纯创建 Image Sitemap。

## 新闻 Sitemap

新闻站可以使用 News Sitemap。

这类 Sitemap 更适合：

```text
近期新闻文章
```

不要把整个历史内容库都当作 News Sitemap 使用。

## 多语言 Sitemap

多语言网站可以：

```text
每个语言独立 Sitemap
```

或者在 XML 中使用 hreflang 扩展。

例如：

```text
/en/
/de/
/fr/
```

重点不是 Sitemap 怎么拆，而是：

```text
URL 唯一
Canonical 正确
hreflang 一致
```

## 常见错误

| 错误 | 问题 |
| --- | --- |
| Sitemap 有 404 | 浪费抓取信号 |
| Sitemap 有 Noindex | 自相矛盾 |
| Sitemap 有 Redirect | 提交旧 URL |
| 参数页大量进入 | 重复 URL |
| lastmod 每天自动改 | 时间信号失真 |
| Sitemap 与 Canonical 冲突 | 主版本不明确 |
| 只靠 Sitemap | 内链仍然薄弱 |

## 怎么检测

重点检查：

| 项目 | 工具 |
| --- | --- |
| Sitemap 是否可访问 | 浏览器 / Curl |
| XML 是否有效 | Validator |
| 提交状态 | Search Console |
| Submitted vs Indexed | Search Console |
| 404 / Redirect | Crawler |
| Canonical 一致性 | Screaming Frog / Sitebulb |
| 孤岛页 | Crawl + Sitemap 对比 |

如果：

```text
Submitted = 10,000
Indexed = 2,000
```

问题通常不在 Sitemap 本身，而要继续排查：

- 内容质量
- 重复
- Canonical
- 抓取
- Noindex
- 页面价值

## 核心规范

```text
只提交规范 URL
→ 保证 200 + Indexable
→ lastmod 真实
→ 大站按类型拆分
→ 与 Canonical / robots 一致
→ 用 GSC 持续检查
```

> **Sitemap.xml 是搜索引擎的 URL 清单，不是排名加速器。真正高质量的 Sitemap 应该干净、稳定、和站点实际索引策略完全一致。**
