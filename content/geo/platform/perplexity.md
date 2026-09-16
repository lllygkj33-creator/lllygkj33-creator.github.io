---
title: "Perplexity"
description: "Perplexity 是以实时网页检索和来源引用为核心的 AI 搜索产品。其回答默认强调来源透明度，因此对 GEO 来说，页面是否能被索引、是否具有明确证据和当前信息尤其重要。"
order: 5
updated: "2026-09-16"
---

> Perplexity 是最典型的 **Search-first AI**：用户提问后，系统实时搜索网页，再综合多个来源生成带引用的回答。

## 原理

Perplexity 官方描述的基本流程：

```text
Question
→
Understand Intent
→
Search Web
→
Retrieve Sources
→
Synthesize
→
Citations
```

与纯模型问答相比，它更依赖：

```text
实时 Web Retrieval
```

## 特性

| 特性 | 表现 |
| --- | --- |
| Search-first | 实时检索网页 |
| Citations | 回答强调来源 |
| Multi-model | Pro 可选择不同模型 |
| Follow-up | 保留对话上下文 |
| Deep Research | 深度检索任务 |
| Source Transparency | 用户可直接打开来源 |
| PerplexityBot | 构建 Search Index |

Perplexity 当前明确表示：

```text
每个回答都会强调可验证来源
```

这是它和普通聊天模型的主要差异之一。

## PerplexityBot

Perplexity 当前公开说明：

```text
PerplexityBot 遵守 robots.txt
```

如果网站阻止它：

```text
不会索引完整或部分正文
```

但某些情况下仍可能保留：

- Domain
- Headline
- Brief Factual Summary

对于 GEO：

```text
允许完整抓取
```

通常更利于页面成为具体引用来源。

## 内容偏好

这里的“偏好”不是官方排序公式，而是和 Search-first 机制高度匹配的内容特征。

| 内容 | 价值 |
| --- | --- |
| 原始来源 | 更适合直接引用 |
| 明确数据 | 可核查 |
| 时间最新 | Perplexity 强调 Current Info |
| 专业来源 | 官方称会搜索权威网站、期刊等 |
| 独立 Passage | 更容易引用 |
| Claim 有证据 | 提高可验证性 |
| 页面标题清楚 | Search Retrieval 更明确 |
| 信息不隐藏 | 便于抓取 |

## 示例

Prompt：

```text
How much VRAM does a 70B model need at 4-bit?
```

页面 A：

```text
Large AI models need a lot of VRAM.
```

页面 B：

```text
A 70B model at 4-bit requires roughly 35GB for raw weights
before KV cache and runtime overhead, so practical memory demand
is typically higher than the weight size alone.
```

页面 B 更适合作为引用，因为：

```text
数字
+
计算逻辑
+
Boundary
```

都存在。

## Citations

Perplexity 的核心 GEO 指标应该直接跟踪：

- Citation Rate
- Citation URL
- Topic
- Prompt
- Citation Stability
- Competitor Sources

尤其适合建立：

```text
Citation Share
```

而不仅是 Brand Mention。

## Source Competition

Perplexity 经常同时使用：

- 官方网站
- 媒体
- 学术来源
- 技术博客
- 社区

所以应该问：

```text
为什么它引用 Competitor A
而不是我的页面？
```

检查：

- Freshness
- Originality
- Evidence
- Passage
- Crawl Access
- Topic Match

## 页面结构

推荐：

```text
Direct Answer
→
Evidence
→
Source
→
Boundary
```

例如：

```text
240Hz refreshes every 4.17ms.
144Hz refreshes every 6.94ms.
The difference is about 2.77ms and matters most at high frame rates.
```

这类答案非常适合 Source-grounded Search。

## 不要做

| 错误 | 问题 |
| --- | --- |
| Block PerplexityBot 但期待完整 Citation | 矛盾 |
| 无来源的强 Claim | 可验证性弱 |
| 自动改年份 | 不是真 Freshness |
| 只写品牌营销文案 | Search Value 低 |
| 认为引用次数 = 流量 | 用户可能不点击 |

## 核心结论

```text
Perplexity GEO
=
Indexability
+
Current Web Information
+
Source Transparency
+
Citation-ready Evidence
```

> **Perplexity 最适合用“来源竞争”来理解：它需要实时找证据，所以真正有优势的页面不是最会写营销文案的页面，而是最容易被验证和引用的页面。**
