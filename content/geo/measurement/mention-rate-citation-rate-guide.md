---
title: "Mention / Citation Rate"
description: "Mention Rate 衡量品牌进入多少 AI 回答，Citation Rate 衡量网站被明确作为来源的比例。两者代表不同层级：一个是实体可见度，一个是来源可信度。"
order: 4
updated: "2026-09-16"
---

> Mention 和 Citation 不是同一件事。**品牌被提到，说明它进入了答案语境；网站被引用，说明它进一步成为回答来源。**

## 两个指标

内部定义：

```text
Mention Rate
=
Mentioned Prompts
÷
Total Prompts
```

```text
Citation Rate
=
Cited Prompts
÷
Total Prompts
```

例如：

```text
Total Prompts = 100
Brand Mention = 40
Site Citation = 18
```

则：

```text
Mention Rate = 40%
Citation Rate = 18%
```

这些是内部 GEO 指标，不是 AI 平台官方指标。

## 四种状态

| Mention | Citation | 含义 |
| --- | --- | --- |
| No | No | 无可见度 |
| Yes | No | 品牌已进入答案，但不是来源 |
| No | Yes | 少见，但可能引用页面未显式提品牌 |
| Yes | Yes | 品牌与来源同时出现 |

其中：

```text
Mention Yes
Citation No
```

非常常见。

## Mention 代表什么

Mention 更接近：

```text
Entity Visibility
```

例如用户问：

```text
Best home server brands
```

AI 列出：

```text
Brand A
Brand B
Brand C
```

即使没有引用官网，Brand A 已获得 Mention。

## Citation 代表什么

Citation 更接近：

```text
Source Visibility
```

例如 AI 解释：

```text
240Hz frame timing
```

并引用：

```text
yourdomain.com/display-guide
```

这时网站成为：

```text
Evidence Source
```

## Brand Prompt 与 Non-brand Prompt

必须分开。

| Prompt | 价值 |
| --- | --- |
| What is Brand X? | 品牌基础可见度 |
| Brand X vs Y | 比较语境 |
| Best home server | Non-brand Category Presence |
| Best Plex server | 商业推荐 |

如果只测品牌词：

```text
Mention Rate 会虚高
```

因此建议分别计算：

```text
Brand Mention Rate
Non-brand Mention Rate
```

## Citation 也要分 Topic

例如：

| Topic | Citation Rate |
| --- | ---: |
| Home Server | 30% |
| NAS | 12% |
| Local AI | 5% |

全站平均：

```text
18%
```

会掩盖真实强弱。

## Commercial Mention

可以单独统计：

```text
Commercial Mention Rate
```

仅使用：

- Best
- Which
- Vs
- Recommendation
- Buying

类 Prompt。

这比 Definition Prompt 更接近商业影响。

## Mention Position

可以记录品牌在回答中的位置：

```text
First
Top 3
Other
```

但不要把它等同于传统 Rank。

因为生成式回答结构不是固定 SERP。

内部可以使用：

| 位置 | 记录 |
| --- | --- |
| 首个推荐 | 1 |
| 第二个 | 2 |
| 仅正文提及 | Mention only |

## Citation Frequency

一个 Prompt 可能引用本站多个 URL。

建议同时记录：

```text
Prompt-level Citation
```

和：

```text
URL-level Citation Count
```

前者用于 Citation Rate。

后者用于找：

```text
Citation Asset
```

## 变化原因

Mention 上升可能来自：

- 品牌热度
- 新产品
- 外部媒体
- 更强实体关系
- 更多第三方推荐

Citation 上升可能来自：

- 原创数据
- 更清晰 Claim
- 页面 Freshness
- 更强 Passage
- 更高来源可信度

两者优化方式不同。

## 失败模式

| 情况 | 可能问题 |
| --- | --- |
| Mention 高，Citation 低 | 品牌知名但本站不是主要来源 |
| Mention 低，Citation 高 | 内容被用作来源但品牌弱 |
| 两者都低 | 实体和内容都弱 |
| Citation 高但 Accuracy 低 | 内容被错误总结 |

## 稳定性

建议多次测试。

例如：

```text
Prompt P001
测试 5 次
Mention 4 次
Citation 2 次
```

可记录：

```text
Mention Frequency = 80%
Citation Frequency = 40%
```

比单次结果更稳。

## Dashboard

| Metric | Brand | Non-brand |
| --- | ---: | ---: |
| Mention Rate | 85% | 28% |
| Citation Rate | 40% | 16% |
| Commercial Mention | 62% | 20% |
| Accuracy | 96% | 90% |

这样可以区分：

```text
品牌已有认知
vs
真正进入新用户 Query
```

## 核心规范

```text
Mention
=
实体是否进入答案

Citation
=
网站是否成为来源

两者分开测
→
再按 Topic / Funnel / Market 拆分
```

> **Mention Rate 测品牌存在感，Citation Rate 测来源存在感。一个成熟 GEO 项目要同时提升两者，但不能把“被提到”误当成“被引用”，也不能把“被引用”自动等同于商业成功。**
