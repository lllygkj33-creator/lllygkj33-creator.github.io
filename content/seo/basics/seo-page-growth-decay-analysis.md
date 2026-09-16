---
title: "SEO 页面增长与衰退分析"
description: "SEO 页面分析应识别增长页、衰退页、新增长页和高潜力页，并区分需求变化、排名变化、CTR、内容新鲜度和页面生命周期。"
order: 36
updated: "2026-09-16"
---

> 页面增长和衰退分析的核心不是列 Top 10，而是：**找到哪些 URL 正在创造新增价值、哪些 URL 正在失去价值，以及变化为什么发生。**

## 四类页面

每周至少分四组：

| 类型 | 定义 |
| --- | --- |
| Growth | Sessions / Clicks 明显增长 |
| Decline | Sessions / Clicks 明显下降 |
| New Growth | 上周期为 0，本周期开始增长 |
| Opportunity | 有 Impression / Position，但 Click 不足 |

这四组对应不同动作。

## 增长页

增长页不能只看绝对量。

例如：

| Page | 上周 | 本周 | 增长 |
| --- | ---: | ---: | ---: |
| A | 1,000 | 1,100 | +100 |
| B | 10 | 60 | +50 |

A 绝对增长更大。

B 增幅：

```text
+500%
```

所以同时看：

```text
Absolute Change
+
Growth Rate
```

## 衰退页

计算：

```text
Change
=
Current
-
Previous
```

```text
Change %
=
Change
÷
Previous
```

但要避免上一周期很小时比例失真。

例如：

```text
1 → 5
= +400%
```

绝对影响只有：

```text
+4
```

所以优先按：

```text
绝对变化
```

排序，再用比例辅助。

## 从 0 开始增长

这类页面很重要。

例如：

```text
0 → 50 Sessions
```

可能意味着：

- 新页面被索引
- 新 Query 出现
- 热点启动
- 内容开始进入 Top 10

建议单独建立：

```text
New Winners
```

而不是混在总体增长榜。

## 高潜力页

典型条件：

```text
Impressions 高
Position 5–20
Clicks 较低
```

这些页面往往比：

```text
Position 60
```

更值得优先优化。

内部可以定义：

```text
Opportunity
=
Impressions
×
Position Opportunity
×
Business Value
```

不是 Google 公式，只用于优先级。

## 生命周期

页面通常会经历：

```text
Publish
→ Discover
→ Growth
→ Peak
→ Stable
→ Decay
→ Refresh / Merge
```

不同阶段动作不同。

| 阶段 | 动作 |
| --- | --- |
| Discover | 等待索引 / 内链 |
| Growth | 不频繁大改 |
| Peak | 保持 |
| Stable | 监控 |
| Decay | 查原因 |
| Obsolete | 更新 / 合并 |

不要一个刚开始增长的页面频繁重写。

## 增长原因

| 信号 | 可能原因 |
| --- | --- |
| Position ↑ | 排名改善 |
| Impressions ↑ | Query 扩大 / Demand ↑ |
| CTR ↑ | Title 改善 |
| New Queries ↑ | Topic Coverage 扩大 |
| Referring Domains ↑ | 权威增加 |
| Trend ↑ | 市场热度 |

增长也要解释。

否则无法复制成功。

## 衰退原因

| 信号 | 可能原因 |
| --- | --- |
| Position ↓ | 排名问题 |
| Impressions ↓ | Demand ↓ |
| CTR ↓ | SERP / Meta |
| URL 轮换 | Cannibalization |
| 新竞争页 | Competitor |
| 旧事实 | Freshness |
| Indexing 异常 | Technical |

不要把所有 Decline 都归因于：

```text
Google Update
```

## 页面分组

建议按：

- Directory
- Content Type
- Author
- Topic Cluster
- Funnel Stage
- Publish Date

分组。

例如：

| Section | 变化 |
| --- | ---: |
| Technology | +18% |
| Support | +3% |
| Buying | -21% |
| Product | +7% |

比只看：

```text
全站 +2%
```

有用得多。

## Blog 和 Product 分开

如果目标是内容 SEO，Product 页最好单独看。

原因：

```text
Product Traffic
更容易受品牌和库存影响
```

Blog 则更适合观察：

```text
Topic Growth
```

不要混在一个榜单里后直接比较。

## 新旧页面

可以做 Cohort：

| Publish Month | Pages | Current Clicks |
| --- | ---: | ---: |
| Jun | 20 | 5,000 |
| Jul | 25 | 6,500 |
| Aug | 30 | 8,200 |

这样能看：

```text
新内容生产效率
```

而不只是页面单点。

## 页面价值

增长页还要看业务。

例如：

| Page | Sessions | Key Events |
| --- | ---: | ---: |
| A | 5,000 | 10 |
| B | 1,000 | 80 |

Page B 更值得继续支持。

所以 Page Value 至少包含：

```text
Traffic
+
Conversion
+
Business Relevance
```

## 更新优先级

对 Decline Page 可以定义：

```text
Recovery Priority
=
Traffic Loss
×
Business Value
×
Ranking Recoverability
```

例如：

```text
以前 500 Sessions
现在 300
仍然 Position 8
```

通常比：

```text
以前 10
现在 0
Position 70
```

更值得先修。

## 周报输出

| 模块 | 数量 |
| --- | ---: |
| Growth Top 10 | 10 |
| Decline Top 10 | 10 |
| New Winners | 10 |
| Opportunity | 10 |
| Zero Traffic | 10 |
| Updated Pages | 记录 |

每个页面建议附：

```text
变化
原因
动作
```

## 核心规范

```text
先按绝对变化找页面
→
再看增长比例
→
再拆 GSC 原因
→
再看 GA4 价值
→
最后决定更新或保持
```

> **页面增长与衰退分析真正要回答的不是“谁涨谁跌”，而是“为什么变化、这个变化是否值得行动、成功经验能不能复制”。**
