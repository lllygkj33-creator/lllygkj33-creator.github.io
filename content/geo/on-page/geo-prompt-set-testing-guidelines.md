---
title: "GEO Prompt Set 测试规范"
description: "GEO Prompt Set 是一组固定、可重复执行的真实用户问题，用于持续监测品牌 Mention、Citation、实体准确性、来源选择和回答变化。测试必须保持 Query、市场、语言、平台和时间记录一致。"
order: 27
updated: "2026-09-16"
---

> GEO 测试不能靠“随便问 AI 几个问题”。真正有价值的是：**维护一组固定 Prompt，在相同条件下重复测试，观察 Mention、Citation 和答案准确性如何变化。**

## Prompt Set 是什么

Prompt Set 可以理解成：

```text
GEO Benchmark Dataset
```

例如一个 Home Server 网站可以维护：

```text
50–200 个固定问题
```

覆盖：

- 定义
- Why
- Can
- Comparison
- Buying
- Support
- Brand
- Product

## 为什么固定

如果每次 Prompt 都不同，就无法比较。

例如：

```text
Week 1:
What is the best home server?

Week 2:
What is a cheap NAS for Plex?
```

结果没有直接可比性。

推荐固定：

```text
Prompt
+
Market
+
Language
+
Platform
+
Test Date
```

## Prompt 类型

| 类型 | 示例 |
| --- | --- |
| Definition | What is a home server? |
| Why | Why use a home server? |
| Can | Can a mini PC replace a NAS? |
| Comparison | NAS vs mini PC |
| Buying | Best home server for Plex |
| Support | Why is Plex buffering? |
| Brand | What is Brand X? |
| Product | Does Product X support 10GbE? |

不同类型测试不同 GEO 能力。

## 品牌 Prompt

不要只测：

```text
Brand X
```

还要测：

```text
Brand X for Plex
Brand X vs Competitor
Is Brand X good for local AI?
```

这样才能判断品牌是否进入：

```text
真实任务语境
```

## Non-brand Prompt

Non-brand 更重要。

例如：

```text
best mini server for Plex
```

如果 AI 主动提到品牌，说明品牌进入了：

```text
Category Consideration Set
```

这比只在品牌词里出现更有价值。

## 固定变量

建议每次记录：

| 字段 | 示例 |
| --- | --- |
| prompt_id | P001 |
| prompt | Can a mini PC replace a NAS? |
| language | en |
| market | US |
| platform | Platform A |
| date | 2026-09-16 |
| model | 如可见则记录 |
| logged_in | Yes / No |
| mode | Search / Standard |

条件越稳定，可比性越高。

## 输出字段

每次测试记录：

| 字段 | 含义 |
| --- | --- |
| Mention | 是否提品牌 |
| Citation | 是否引用本站 |
| Citation URL | 引用哪个 URL |
| Position | 品牌在答案出现位置 |
| Entity Accuracy | 品牌事实是否正确 |
| Sentiment | 中性 / 正向 / 负向 |
| Competitors | 同时出现谁 |
| Answer Type | Direct / List / Comparison |

## Prompt 数量

没有固定最佳数量。

可以按阶段：

| 规模 | 用途 |
| ---: | --- |
| 20–30 | 小型初始测试 |
| 50–100 | 稳定监测 |
| 100–300 | 多 Topic / 多市场 |
| 300+ | 大型自动化 |

关键是：

```text
稳定
+
代表真实 Query
```

而不是越多越好。

## Topic 分层

例如：

| Topic | Prompt 数 |
| --- | ---: |
| Home Server | 20 |
| NAS | 20 |
| Plex | 15 |
| Local AI | 20 |
| Brand | 10 |
| Product | 15 |

这样可以计算：

```text
Topic-level GEO Performance
```

## Funnel 分层

也可以按：

| Funnel | Prompt |
| --- | --- |
| Learn | What / Why |
| Evaluate | Vs / Comparison |
| Decide | Best / Which |
| Buy | Product / Price |
| Use | Setup |
| Support | Troubleshooting |

避免 Prompt Set 全部集中在：

```text
Best X
```

## 执行频率

| 类型 | 频率 |
| --- | --- |
| 稳定 Evergreen | 月度 |
| 竞争强 Topic | 每周 |
| 新产品发布 | 高频 |
| 热点 | 每日 / 事件期 |

不要高频测一个极不稳定 Prompt 然后过度解读。

## 随机性

生成式回答存在随机性。

所以单次测试：

```text
不是绝对事实
```

高价值 Prompt 可以：

```text
重复 3 次
```

记录出现频率。

例如：

```text
Brand Mention
2 / 3 runs
```

比单次 Yes / No 更稳。

## Prompt 改版

Prompt Set 也需要版本管理。

例如：

```text
Prompt Set v1.0
Prompt Set v1.1
```

新增 Prompt 可以，但不要偷偷修改旧 Prompt 文案后继续当同一条趋势。

## QA 表

| 检查 | 合格 |
| --- | --- |
| Prompt 固定 | 是 |
| Market 固定 | 是 |
| Language 固定 | 是 |
| Platform 已记录 | 是 |
| Date 已记录 | 是 |
| Mention 已记录 | 是 |
| Citation URL 已记录 | 是 |
| Entity Accuracy 已评分 | 是 |
| Topic 覆盖平衡 | 是 |
| Prompt Set 有版本 | 推荐 |

## 核心规范

```text
先定义真实用户任务
→
建立固定 Prompt
→
固定市场和语言
→
重复测试
→
记录 Mention / Citation / Accuracy
→
长期比较趋势
```

> **Prompt Set 是 GEO 的测试基准。没有固定问题集，就只能得到零散截图；有了固定 Prompt，Mention、Citation 和实体准确性才真正变成可监测指标。**
