---
title: "hreflang 与多语言 SEO"
description: "hreflang 用于告诉搜索引擎不同语言和地区页面之间的对应关系，帮助用户获得更合适的语言版本。它不是排名增强标签，也不能替代 Canonical 和正确的国际站 URL 架构。"
order: 29
updated: "2026-09-16"
---

> hreflang 的核心不是“告诉 Google 我要做国际 SEO”，而是：**告诉搜索引擎这些页面内容相近，但分别服务不同语言或地区用户。**

## hreflang 解决什么

例如：

```text
/en/product
/de/product
/fr/product
```

三个页面内容接近，但语言不同。

hreflang 可以建立：

```text
英文版本
德文版本
法文版本
```

之间的关系。

目标是：

```text
让正确用户看到正确版本
```

## 基础写法

HTML Head：

```html
<link rel="alternate" hreflang="en" href="https://www.xxxx.com/en/page/" />
<link rel="alternate" hreflang="de" href="https://www.xxxx.com/de/page/" />
<link rel="alternate" hreflang="fr" href="https://www.xxxx.com/fr/page/" />
```

每个版本都应该列出完整对应关系。

## 语言与地区

hreflang 可以只指定语言：

```text
en
de
fr
```

也可以指定语言 + 地区：

```text
en-US
en-GB
de-DE
de-AT
```

格式：

```text
语言
=
ISO 639-1

地区
=
ISO 3166-1 Alpha-2
```

语言小写、地区常写大写更清楚。

## 什么时候只用语言

如果内容对所有英文用户都一样：

```text
en
```

足够。

如果：

```text
价格
配送
单位
法律
产品可售范围
```

不同，可以使用：

```text
en-US
en-GB
```

## x-default

`x-default` 用于：

```text
没有匹配语言 / 地区时
默认展示哪个页面
```

例如：

```html
<link rel="alternate" hreflang="x-default" href="https://www.xxxx.com/" />
```

适合：

- 全球首页
- Language Selector
- 默认国际版本

## 必须双向返回

hreflang 要形成互相确认。

例如：

```text
Page A
声明 Page B 是德文版本
```

那么：

```text
Page B
也应该声明 Page A 是英文版本
```

即：

```text
A ↔ B
```

单向声明容易失效。

## 自引用

每个页面应该包含自己的 hreflang。

英文页：

```html
<link rel="alternate" hreflang="en" href="https://www.xxxx.com/en/page/" />
<link rel="alternate" hreflang="de" href="https://www.xxxx.com/de/page/" />
```

其中英文页自己也在列表内。

## hreflang 与 Canonical

这是最容易配置错的地方。

英文页：

```text
/en/page
```

应该 Canonical 到：

```text
/en/page
```

德文页：

```text
/de/page
```

应该 Canonical 到：

```text
/de/page
```

不要：

```text
/de/page
Canonical → /en/page
```

同时又声明 hreflang。

否则会出现：

```text
Canonical 说德文不是主版本
hreflang 又说它是独立语言版本
```

信号冲突。

## 多语言 URL 结构

常见方式：

| 结构 | 示例 |
| --- | --- |
| 子目录 | `/de/` |
| 子域 | `de.example.com` |
| 国家域名 | `example.de` |

对大多数网站：

```text
子目录
```

更容易维护。

例如：

```text
/en/
/de/
/fr/
```

但选择哪种结构不是核心。

真正重要的是：

```text
稳定
一致
可抓取
可索引
```

## 不要自动强制跳转

高风险做法：

```text
根据 IP
强制用户跳到某语言
```

可能让：

- Googlebot 无法访问其他版本
- 用户无法切换语言
- 分享 URL 失效

更合理：

```text
建议语言
+
允许手动切换
```

## 翻译不是本地化

多语言 SEO 不能只做：

```text
英文
→ 机器翻译
→ 德文
```

还要考虑：

| 维度 | 本地化 |
| --- | --- |
| Query | 用户搜索习惯 |
| Currency | USD / EUR |
| Units | inch / cm |
| Shipping | 地区差异 |
| Legal | 当地法规 |
| Product | 地区 SKU |
| Terminology | 本地表达 |

同一主题可以拥有不同 Query Fan-Out。

## 同内容不同地区

例如：

```text
en-US
en-GB
```

正文可能 90% 相同，仅：

- 价格
- 配送
- 拼写
- 插头
- 产品型号

不同。

这种情况正是 hreflang 的典型场景。

## Sitemap 中的 hreflang

大型站可以在 XML Sitemap 维护 hreflang。

优点：

- 集中管理
- HTML 更干净
- 大规模自动生成

但规则仍然一样：

```text
双向
自引用
URL 可索引
Canonical 一致
```

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 缺 Reciprocal | 关系不完整 |
| 没有 Self-reference | 配置不完整 |
| Canonical 到其他语言 | 信号冲突 |
| hreflang URL 404 | 无效 |
| hreflang URL Noindex | 无法正常参与 |
| 语言代码错误 | 无法识别 |
| IP 强制跳转 | 抓取风险 |
| 所有语言内容完全不本地化 | 用户价值低 |

## 多语言内链

语言切换器应直接链接对应页面。

例如：

```text
/en/product-a
↔
/de/product-a
```

不要全部跳：

```text
/de/
```

否则用户失去上下文。

## SEO 检测

| 检查 | 目标 |
| --- | --- |
| hreflang Status | 200 |
| Canonical | Self |
| Reciprocal | 存在 |
| Language Code | 正确 |
| Sitemap | 一致 |
| Indexability | 可索引 |
| Language Switcher | 对应页面 |
| Redirect | 无强制冲突 |

工具可以使用：

- Screaming Frog
- Sitebulb
- 自定义爬虫
- Sitemap Validator

## GSC 怎么看

Search Console 不提供完整 hreflang 报告，因此需要结合：

- Country
- Page
- Query
- Language URL
- Indexing

观察：

```text
美国用户是否出现 /de/
德国用户是否大量进入 /en/
```

如果语言错配严重，需要检查 hreflang、Canonical 和站点架构。

## 核心规范

```text
每个语言 URL 独立可索引
→ Self Canonical
→ hreflang 双向
→ Self-reference
→ 必要时 x-default
→ 用户可自由切换
```

> **hreflang 不是国际站排名加速器，而是语言和地区版本之间的映射协议。真正成功的多语言 SEO，需要 hreflang、Canonical、URL 架构和本地化内容保持一致。**
