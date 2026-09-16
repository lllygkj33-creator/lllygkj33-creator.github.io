---
title: "AI Pages"
description: "AI Pages 用于衡量有多少独立 URL 被生成式 AI 平台发现、引用或作为来源使用。它是页面覆盖指标，应与 AI Responses 一起分析，以判断内容广度和单页引用效率。"
order: 9
updated: "2026-09-16"
---

> Pages 回答的是：**有多少独立 URL 真正进入 AI 可见或引用集合。** 它不是传统 Index Coverage 的简单复制。

## 什么是 AI Page

在 GEO 测量里，Page 可以定义为：

```text
一个独立 URL
```

它至少在某个平台中被：

- 发现
- 检索
- 引用
- 展示为 Supporting Link

第三方工具可能把 “Pages” 定义成：

```text
曾经进入其 AI Response 数据集的 Unique URLs
```

具体口径必须以工具说明为准。

## Pages 不等于 Google Indexed Pages

必须区分：

| 指标 | 含义 |
| --- | --- |
| Google Indexed Pages | Google Index 中的页面 |
| AI Pages | AI 数据中可见 / 被引用的页面 |
| Citation Pages | 明确被引用的 Unique URLs |
| Landing Pages | 用户实际点击进入的 URL |

所以：

```text
10,000 Indexed Pages
```

不代表：

```text
10,000 AI Pages
```

## 为什么重要

如果网站：

```text
Responses 很高
Pages 很少
```

说明少数页面承担大量引用。

例如：

```text
Responses = 1,000
Pages = 10
```

可能说明：

```text
10 个强 Citation Assets
```

反过来：

```text
Responses = 100
Pages = 500
```

可能表示：

```text
页面覆盖广
但单页进入回答频率低
```

## Page 指标

建议记录：

| 指标 | 含义 |
| --- | --- |
| Unique AI Pages | 独立 URL 数 |
| Citation Pages | 被明确引用 URL |
| New AI Pages | 新进入 AI 数据集 |
| Lost AI Pages | 消失的 URL |
| Response / Page | 单页响应效率 |
| Topic Coverage | 页面覆盖哪些 Topic |
| Platform Coverage | 页面出现在哪些平台 |

## 示例

网站有：

```text
100 Articles
```

其中：

```text
30 个被 AI 平台引用
```

则内部：

```text
AI Page Coverage
=
30 / 100
=
30%
```

这不是平台官方指标，只用于站内分析。

## New Pages

新增 AI Pages 很有价值。

例如：

```text
Week 1
100 AI Pages

Week 2
130 AI Pages
```

新增：

```text
+30
```

应该检查：

- 哪个 Topic
- 哪个平台
- 哪类内容
- 是否新发布
- 是否旧文被重新发现

## Lost Pages

Pages 下降也不一定是坏事。

例如：

```text
500
→
300
```

可能来自：

- 低价值页面不再出现
- Canonical 合并
- URL 迁移
- 工具索引变化
- Citation 集中到更强页面

所以要结合：

```text
Responses
```

一起看。

## 四种组合

| Responses | Pages | 判断 |
| --- | --- | --- |
| ↑ | ↑ | 覆盖与使用同时增长 |
| ↑ | ↓ | Citation 集中到更强页面 |
| ↓ | ↑ | 页面多但单页效果变弱 |
| ↓ | ↓ | 整体 GEO 可见度下降 |

这是最实用的联动模型。

## Citation Asset

如果某页面：

```text
Responses 很高
```

它就是潜在：

```text
Citation Asset
```

例如：

| URL | Responses |
| --- | ---: |
| /benchmark-a | 120 |
| /guide-b | 85 |
| /definition-c | 8 |

前两个页面值得优先：

- 更新
- 保持 URL 稳定
- 增强证据
- 维护 Freshness

## 页面类型

最好按：

| Type | AI Pages |
| --- | ---: |
| Blog | 120 |
| Docs | 80 |
| Product | 30 |
| Support | 60 |

看不同页面类型的 GEO 作用。

## Topic

例如：

| Topic | Pages | Responses |
| --- | ---: | ---: |
| Home Server | 20 | 300 |
| NAS | 40 | 120 |
| Local AI | 10 | 200 |

可以看到：

```text
Local AI
页面少
但效率高
```

## Crawl 与 Index

Page 想进入 AI Retrieval，通常至少需要：

```text
Public
+
Accessible
+
Parseable
```

不同平台还可能依赖：

- Google Index
- Bing Index
- OAI-SearchBot
- PerplexityBot
- 平台自己的 Web Retrieval

因此 Page Coverage 下降时，也应该检查技术访问。

## URL 稳定

已经成为 Citation Asset 的 URL 不要轻易改。

如果必须迁移：

```text
301
+
Canonical
+
Internal Links
+
Sitemap
+
Freshness
```

全部同步。

否则可能失去已有 AI Source History。

## 核心规范

```text
Pages
=
哪些 URL 被 AI 使用

Responses
=
这些 URL 进入多少回答

两者联动
→
判断覆盖和效率
```

> **AI Pages 不是追求“越多越好”。更重要的是让真正有价值的页面进入多个高价值 Response，并持续成为稳定、当前、可验证的 Citation Asset。**
