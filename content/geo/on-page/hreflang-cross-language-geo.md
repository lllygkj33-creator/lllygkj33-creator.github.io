---
title: "hreflang 与跨语言 GEO"
description: "跨语言 GEO 不只是翻译页面，而是让同一实体、同一事实和不同语言版本之间保持明确映射。hreflang 负责语言与地区关系，实体一致性负责让机器知道这些页面描述的是同一个对象。"
order: 25
updated: "2026-09-16"
---

> 跨语言 GEO 的核心不是“把英文翻译成多国语言”，而是：**让每个语言版本都服务真实本地 Query，同时保持实体、事实、来源和版本关系一致。**

## hreflang 的作用

hreflang 主要表达：

```text
这些页面内容相近
但服务不同语言 / 地区
```

例如：

```text
/en/product/
/de/product/
/fr/product/
```

可以建立：

```text
English
↔
German
↔
French
```

关系。

它不是：

```text
GEO 排名开关
```

而是跨语言页面映射基础。

## GEO 多一层

SEO 关注：

```text
正确语言页面
→
正确搜索用户
```

GEO 还需要关注：

```text
不同语言页面
→
是否仍然指向同一实体
→
是否表达同一事实
→
是否保留正确版本和来源
```

## 三层一致性

| 层 | 要求 |
| --- | --- |
| URL | 语言版本可识别 |
| Entity | 品牌、产品、作者保持同一实体 |
| Fact | 核心事实不因翻译漂移 |

例如产品型号：

```text
Product X Pro
```

不能在另一个语言版本被翻译成一个新的自创型号。

## 语言与地区

只按语言：

```text
en
de
fr
```

按语言 + 地区：

```text
en-US
en-GB
de-DE
de-AT
```

当以下信息不同，地区拆分更有意义：

- Price
- Currency
- Shipping
- Warranty
- SKU
- Law
- Availability

## 翻译不是本地化

同一个英文 Query：

```text
best home server
```

在德语市场可能对应不同搜索习惯。

所以跨语言 GEO 应重新做：

```text
Query Research
→
Intent
→
Fan-Out
→
Local Terminology
```

而不是逐句翻译。

## 实体名称

建议分：

| 内容 | 是否翻译 |
| --- | --- |
| Brand Name | 通常不翻 |
| Product Model | 不翻 |
| Person Name | 不翻 |
| Job Title | 可翻 |
| Description | 可翻 |
| Category | 可本地化 |
| Technical Term | 视本地习惯 |

核心实体标识应稳定。

## SameAs

多个语言版本可以共同指向：

```text
同一个 Organization
同一个 Person
同一个 Product
```

外部身份也应一致。

例如：

```text
/de/about/
→ Organization
→ sameAs
→ 官方 LinkedIn
```

不要每个语言版本建立不同品牌身份。

## Wikidata

Wikidata 对跨语言 GEO 很有价值，因为：

```text
多个语言 Label
→
同一个 QID
```

例如：

```text
English Label
German Label
Chinese Label
```

都指向同一实体。

这可以帮助内部实体库保持统一。

## Provenance

翻译页面的重要 Claim 应继承同一原始来源。

例如：

```text
English Claim
→ Source A

German Claim
→ Source A

French Claim
→ Source A
```

不要多语言页面分别引用不同二手来源，导致事实漂移。

## 时间与版本

所有语言版本要同步：

- Product Version
- Software Version
- Price Date
- Updated Date
- Availability
- Deprecation

例如英文已更新：

```text
v2.0
```

德文仍写：

```text
v1.6
```

会造成实体状态冲突。

## 翻译 QA

| 检查 | 要求 |
| --- | --- |
| Entity Name | 一致 |
| Product Model | 一致 |
| Numbers | 一致 |
| Units | 本地化但不失真 |
| Version | 一致 |
| Source | 同源 |
| Date | 同步 |
| Legal Claim | 本地核查 |
| Query Intent | 本地验证 |

## hreflang 与 Canonical

每个语言页通常应：

```text
Self Canonical
```

例如：

```text
/en/page → canonical /en/page
/de/page → canonical /de/page
```

不要：

```text
/de/page
→ canonical /en/page
```

同时又希望德文参与独立检索。

## x-default

如果有：

```text
Global Selector
```

可以使用：

```text
x-default
```

表示没有语言 / 地区匹配时的默认版本。

## AI 回答错语言

跨语言 GEO 常见问题：

```text
用户用德语问
AI 引用英文页
```

不一定是错误。

但如果已经有高质量德文页，应该检查：

- hreflang
- 本地 Query 匹配
- 德文页面可抓取
- 内容是否完整
- 是否只是机器翻译薄页
- Entity 是否一致

## 跨语言 Prompt Set

可以保持同一个用户任务，分别测试：

| Market | Prompt |
| --- | --- |
| US | Best home server for Plex |
| DE | Bester Heimserver für Plex |
| FR | Meilleur serveur domestique pour Plex |

然后比较：

- Mention
- Citation
- Language
- Source URL
- Entity Accuracy

## QA 表

| 检查 | 合格 |
| --- | --- |
| hreflang 双向 | 是 |
| Self Canonical | 是 |
| Entity 一致 | 是 |
| Product Model 一致 | 是 |
| Source 同源 | 是 |
| Version 同步 | 是 |
| Query 本地化 | 是 |
| AI Prompt 分市场测试 | 推荐 |

## 核心规范

```text
先统一实体
→
再做本地 Query
→
本地化答案
→
保持来源和版本一致
→
配置 hreflang
→
按语言测试 AI 引用
```

> **跨语言 GEO 的重点不是翻译数量，而是让不同语言用户看到本地化答案，同时让机器始终知道这些页面描述的是同一个实体和同一套可验证事实。**
