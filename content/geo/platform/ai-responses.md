---
title: "AI Responses"
description: "AI Responses 用于衡量一个域名或页面在多少生成式 AI 回答中被提及、引用或作为来源出现。它是回答层指标，不等同于页面数量，也不能单独代表 GEO 成功。"
order: 8
updated: "2026-09-16"
---

> Response 是 **回答层**，Page 是 **URL 层**。一个页面可以进入很多回答，一个回答也可以同时使用很多页面。

## 什么是 Response

在 GEO 测量语境中，可以把一次 AI 回答理解为：

```text
Prompt
→
AI Answer
```

如果一个站点在这个 Answer 中：

- 被提到
- 被引用
- 被作为 Source
- 被用于支持 Claim

就可以记录一次：

```text
Response Presence
```

第三方工具对 “Response” 的具体口径可能不同，所以使用任何平台数据前都要先确认定义。

## Response 不等于 Citation

一个 Answer 可能：

```text
Mention Brand
但没有 Citation
```

所以至少区分：

| 层级 | 含义 |
| --- | --- |
| Mention Response | 品牌出现 |
| Citation Response | 网站作为来源 |
| Recommendation Response | 品牌进入推荐 |
| Correct Response | 实体事实准确 |

不要全部合并成一个 Response 指标。

## 一个页面多个 Response

例如：

```text
/home-server-guide
```

可以支持：

```text
Prompt A
What is a home server?

Prompt B
Can a mini PC replace a NAS?

Prompt C
Best home server for Plex
```

所以：

```text
1 Page
→
3 Responses
```

这是 GEO 内容复用能力。

## 一个 Response 多个 Page

一个复杂回答可能引用：

```text
Page A
Page B
Page C
```

因此：

```text
1 Response
→
Multiple Pages
```

尤其：

- AI Mode
- Perplexity
- Deep Search
- Research Mode

更常见。

## Response 指标

建议拆成：

| 指标 | 含义 |
| --- | --- |
| Total Responses | 出现总次数 |
| Mention Responses | 品牌被提到 |
| Citation Responses | 网站被引用 |
| Commercial Responses | 商业 Query 中出现 |
| Unique Prompts | 涉及多少不同问题 |
| Platforms | 涉及多少平台 |
| Response Stability | 重复测试稳定性 |

## Response Rate

内部可定义：

```text
Response Rate
=
出现目标实体或站点的 Prompt 数
÷
测试 Prompt 总数
```

但一定要写清：

```text
出现的定义
```

例如到底是：

```text
Mention
还是
Citation
```

## 示例

Prompt Set：

```text
100 prompts
```

结果：

```text
Brand Mention = 40
Site Citation = 18
Commercial Recommendation = 10
```

那么：

```text
Mention Response Rate = 40%
Citation Response Rate = 18%
Commercial Response Rate = 10%
```

比只写：

```text
Responses = 40
```

更有意义。

## 平台差异

不同平台的 Response 不能机械横向比较。

| 平台 | Response 特征 |
| --- | --- |
| AI Overviews | 触发式摘要 |
| AI Mode | 深度多轮 |
| ChatGPT | 有时搜索、有时不搜索 |
| Gemini | Sources 不一定每次显示 |
| Perplexity | Search-first |
| Copilot | Bing Grounding |
| Grok | Web + X 实时检索 |

所以：

```text
100 Perplexity Responses
```

和：

```text
100 ChatGPT Responses
```

统计意义不完全相同。

## 变化诊断

Responses 下降可以检查：

```text
Prompt Coverage
Platform Change
Citation Loss
Freshness
Entity Accuracy
Crawler Access
Competitor Growth
```

不要第一反应：

```text
内容被降权
```

因为可能只是：

- Prompt Set 改了
- 平台回答模式变了
- 工具索引更新
- Query Demand 变化

## 与 Pages 联动

最重要的二维表：

|  | Pages 少 | Pages 多 |
| --- | --- | --- |
| Responses 高 | 少量强 Citation Assets | 广覆盖 |
| Responses 低 | 低覆盖 | 页面多但利用率低 |

最值得研究的是：

```text
Responses / Page
```

内部定义：

```text
Response Efficiency
=
Responses
÷
Cited Pages
```

不是平台官方指标。

## 核心规范

```text
Response
先定义统计口径
→
分 Mention / Citation / Recommendation
→
按 Platform / Topic / Prompt 拆分
→
再和 Pages 联动
```

> **Response 的价值在于回答“你的品牌或网站进入了多少 AI 答案”，但它不能告诉你到底是哪几个页面在发挥作用，所以必须和 Page 指标一起看。**
