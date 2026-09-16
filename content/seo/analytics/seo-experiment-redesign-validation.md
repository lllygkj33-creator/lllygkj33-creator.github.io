---
title: "SEO 实验"
description: "SEO 改版不能只比较修改前后流量，因为搜索需求、算法、竞争和季节性同时变化。应明确假设、控制变量、记录时间，并使用对照组或差分方法验证效果。"
order: 8
updated: "2026-09-16"
---

> SEO 实验的核心不是“改完以后流量涨了”，而是：**尽可能证明增长确实由这次改动造成，而不是市场、算法或季节变化造成。**

## 先写假设

任何 SEO 改动前先写：

```text
Hypothesis
```

例如：

```text
如果把高曝光低 CTR 页面 Title 改得更匹配 Query，
则在 Position 稳定的情况下 CTR 应提升。
```

一个完整假设包含：

| 元素 | 示例 |
| --- | --- |
| Change | 改 Title |
| Target | 高曝光低 CTR |
| Metric | CTR |
| Condition | Position 稳定 |
| Expected Result | CTR 上升 |

## 一次只测一个核心变量

错误：

```text
Title
H1
正文
Schema
URL
内链
全部一起改
```

即使涨了，也不知道哪个动作有效。

更好：

```text
Experiment A
只改 Title

Experiment B
只补正文结构
```

大型改版无法完全单变量时，至少要记录：

```text
Change Set
```

## Before / After

最简单方法：

```text
改版前 28 天
vs
改版后 28 天
```

但它非常容易受：

- Seasonality
- Core Update
- Search Demand
- Competitor
- Event

影响。

所以只能用于初步观察。

## 对照组

更好的方法：

```text
Test Group
vs
Control Group
```

例如：

| 组 | 页面数 | 操作 |
| --- | ---: | --- |
| Test | 50 | 新 Title |
| Control | 50 | 不改 |

要求两个组尽量相似：

- Page Type
- Traffic Level
- Position
- Topic
- Seasonality

## Difference-in-Differences

可以使用简化差分：

```text
Effect
=
(Test After - Test Before)
-
(Control After - Control Before)
```

例如：

| 组 | Before | After | 变化 |
| --- | ---: | ---: | ---: |
| Test | 100 | 130 | +30 |
| Control | 100 | 110 | +10 |

实验净效果：

```text
+30 - +10
=
+20
```

比单纯说：

```text
Test +30%
```

更可信。

## 指标要匹配实验

| 实验 | 主指标 |
| --- | --- |
| Title | CTR |
| H1 / Intent | Position / Clicks |
| Content Update | Query Coverage / Position |
| Internal Links | Target Page Position |
| CWV | CWV + Conversion |
| Schema | Rich Result / CTR |
| Merge | Consolidated Clicks |
| 301 | New URL Signal Recovery |

不要用：

```text
Sessions
```

去判断一个只改 Canonical 的实验是否成功。

## SEO 延迟

SEO 实验不像 Paid Ads 立即生效。

需要经过：

```text
Crawl
→
Index
→
Re-evaluation
```

所以实验要记录：

| 日期 | 事件 |
| --- | --- |
| Day 0 | 修改 |
| Day 2 | Googlebot 抓取 |
| Day 5 | 新版本索引 |
| Day 14 | 初步观察 |
| Day 28 | 正式判断 |

不要改完第二天就下结论。

## GSC 数据

常见实验指标：

- Clicks
- Impressions
- CTR
- Position
- Queries
- Pages

Title 实验尤其需要控制：

```text
Position
```

如果 CTR 上升但 Position 从：

```text
8 → 3
```

就不能把全部提升归因于 Title。

## GA4 数据

改版可能影响：

- Organic Sessions
- Engagement
- Key Events
- Revenue

例如：

```text
Title CTR ↑
但 Conversion ↓
```

说明 Title 可能吸引了错误用户。

实验成功不能只看点击。

## Search Demand

实验期必须记录：

```text
Google Trends
```

如果整个市场：

```text
+50%
```

你的页面：

```text
+40%
```

其实可能表现变差。

所以趋势数据是重要外部控制变量。

## Core Update

如果实验期间发生大规模 Google Core Update，结果应标记：

```text
Confounded
```

不要强行归因。

最好：

- 延长观察周期
- 使用 Control
- 单独记录 Update 日期

## 页面改版

大型 Redesign 建议建立：

| 层 | 检查 |
| --- | --- |
| URL | 是否改变 |
| Status | 200 / Redirect |
| Canonical | 正确 |
| Meta | 保留 |
| H1 | 保留 |
| Content | 是否删减 |
| Internal Links | 是否减少 |
| Schema | 是否丢失 |
| JS | 是否可渲染 |
| CWV | 是否变化 |

很多所谓“改版后 SEO 掉了”并不是设计问题，而是：

```text
内容或技术信号被删除
```

## URL 迁移

如果 Redesign 同时改 URL：

```text
必须单独追踪
```

检查：

- Redirect Map
- 301
- Sitemap
- Canonical
- Internal Links
- Backlinks
- GSC

最好不要同时：

```text
换 CMS
改 URL
删内容
改导航
改 Title
```

如果可以拆阶段，更容易诊断。

## 实验记录表

| 字段 | 内容 |
| --- | --- |
| Experiment ID | SEO-2026-01 |
| Hypothesis | Title 改善 CTR |
| Test URLs | 50 |
| Control URLs | 50 |
| Start Date | 日期 |
| Crawl Date | 日期 |
| Main Metric | CTR |
| Secondary | Clicks |
| External Events | Core Update |
| Result | Win / Neutral / Loss |

长期维护可以形成自己的：

```text
SEO Playbook
```

## Win、Neutral、Loss

建议定义：

| 状态 | 含义 |
| --- | --- |
| Win | 主指标明确改善 |
| Neutral | 无显著变化 |
| Loss | 主指标下降 |
| Confounded | 外部因素无法判断 |

不要把所有实验都包装成成功案例。

失败实验同样有价值。

## 样本量

页面太少时，波动可能大于实验效果。

例如：

```text
2 个 URL
每周 10 Clicks
```

很难得出可靠结论。

更适合：

```text
多个相似页面
+
足够 Impression
+
稳定 Query
```

## 回滚

实验前必须知道：

```text
失败怎么办
```

例如：

```text
Title Experiment
→ CTR -20%
→ Rollback
```

大型改版尤其需要：

- Backup
- Redirect Map
- Old Metadata
- Old Templates
- Change Log

## 核心规范

```text
先写假设
→
选主指标
→
设 Control
→
记录改动
→
等待抓取和索引
→
排除 Demand / Update
→
判断 Win / Neutral / Loss
```

> **SEO 实验真正要解决的是因果，而不是相关。改版后上涨并不能自动证明改版有效，只有在控制时间、搜索需求、排名和对照组后，结果才更接近真实效果。**
