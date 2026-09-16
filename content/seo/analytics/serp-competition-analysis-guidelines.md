---
title: "SERP 竞争"
description: "SERP 竞争分析不是只看 DR、关键词难度和排名，而是判断 Google 当前偏好的搜索意图、页面类型、内容深度、实体覆盖、品牌强度与可突破缺口。"
order: 4
updated: "2026-09-16"
---

> SERP 竞争分析的核心不是“谁的权重最高”，而是：**Google 当前为什么选择这些页面，以及你的页面需要在哪个维度形成更强匹配。**

## 先看什么

分析一个关键词前，先确认：

| 维度 | 要回答的问题 |
| --- | --- |
| Query | 用户到底在搜什么 |
| Intent | Informational、Commercial、Transactional 还是混合 |
| Page Type | Blog、Collection、Product、Forum、Video 哪类占主导 |
| SERP Stability | Top 10 是否长期稳定 |
| Authority | 大站是否高度集中 |
| Freshness | 是否明显偏新内容 |
| Content Depth | 竞争页覆盖到什么程度 |
| Information Gain | 还有什么没被回答 |

不要一开始只看：

```text
KD
DR
Backlinks
```

这些只是竞争维度的一部分。

## 搜索意图

SERP 是 Google 对当前 Query 的最好解释之一。

例如：

```text
gaming monitor
```

如果 Top 10 主要是：

```text
Collection
Product Category
Retailer
```

说明用户意图更偏商业。

如果：

```text
best gaming monitor
```

Top 10 主要是：

```text
Buying Guide
Reviews
Comparison
```

则更偏 Commercial Investigation。

所以：

> **页面类型选错，比内容写得不够长更致命。**

## 页面类型

建立 SERP 类型表。

| 排名 | URL 类型 | Intent | 备注 |
| ---: | --- | --- | --- |
| 1 | Buying Guide | Commercial | 多产品推荐 |
| 2 | Reddit | UGC | 真实体验 |
| 3 | Collection | Transactional | 商品集合 |
| 4 | Review | Commercial | 单品实测 |
| 5 | YouTube | Visual | 视频演示 |

然后判断：

```text
Google 当前在给哪种页面“席位”
```

不要强行用 Blog 去竞争一个几乎全是 Collection 的 SERP。

## 看 SERP 组成

除了自然结果，还要记录：

- AI Overview
- Featured Snippet
- People Also Ask
- Reddit / Forum
- Video
- Images
- Shopping
- News
- Local Pack

因为 SERP Feature 会改变：

```text
点击分布
结果类型
内容机会
```

例如：

```text
How to clean OLED monitor
```

如果视频结果很强，说明视觉演示可能是用户需求的一部分。

## 看结果重叠

两个关键词是否应该做两篇页面，可以先看 Top 10 重叠。

内部公式：

```text
SERP Overlap
=
共同 URL 数
÷
Top N
```

例如：

```text
best home server
home server hardware
```

如果：

```text
8 / 10
```

相同，可以视为高度同意图。

如果只有：

```text
2 / 10
```

更可能应该拆页。

这不是 Google 官方阈值，只用于内部聚类。

## 看竞争强度

不要把竞争强度只等于 DR。

更完整可以拆成：

| 维度 | 强度判断 |
| --- | --- |
| Domain Strength | 是否都是强品牌 |
| Page Strength | 单页是否有大量外链 |
| Intent Match | 是否精准匹配 Query |
| Content Quality | 是否完整、原创 |
| Freshness | 是否近期更新 |
| Brand Demand | 是否有明显品牌偏好 |
| UGC Strength | Reddit / Forum 是否占位 |
| SERP Lock | Top 10 是否长期不变 |

可以建立内部模型：

```text
SERP Difficulty
=
Authority
+
Intent Precision
+
Content Quality
+
SERP Stability
+
Brand Dominance
```

不是 Google 指标，仅用于内部比较。

## 看内容结构

对 Top 5 做结构提取。

| 页面 | 首屏答案 | H2 数 | 表格 | 原创数据 | FAQ | 实测 |
| --- | --- | ---: | --- | --- | --- | --- |
| A | 有 | 8 | 有 | 无 | 有 | 无 |
| B | 弱 | 12 | 有 | 有 | 无 | 有 |
| C | 有 | 6 | 无 | 无 | 有 | 无 |

重点不是：

```text
别人有 10 个 H2
我就做 11 个
```

而是判断：

```text
哪些问题所有竞争页都回答了
哪些问题只有少数页面回答
哪些问题完全没人解决
```

## 找内容 Gap

Gap 可以分四类。

| Gap | 定义 | 示例 |
| --- | --- | --- |
| Topic Gap | 完全没覆盖 | 没人讲兼容性 |
| Depth Gap | 提到了但很浅 | 只说“需要更多 RAM” |
| Evidence Gap | 有结论没证据 | 没 Benchmark |
| Decision Gap | 信息很多但无法决策 | 没有场景阈值 |

真正值得做的是：

```text
竞争页已经证明用户需要什么
+
你再补他们没完成的部分
```

## 看信息增益

SERP 分析不能停在：

```text
Top 10 都写了什么
```

还要问：

> **如果我也写同样的东西，为什么 Google 要换成我？**

信息增益可以来自：

| 类型 | 例子 |
| --- | --- |
| 原始数据 | 自己 Benchmark |
| 第一手体验 | 实际部署 |
| 结构 | 新决策框架 |
| 场景 | 参数映射到真实用户 |
| 边界 | 说明什么时候不适用 |
| 失败案例 | 实操中什么会出错 |

如果 Top 10 已经高度成熟，新页面必须有更强差异化。

## 看品牌与权威

有些 SERP 不是内容问题，而是品牌和信任问题。

例如 Top 10 全是：

```text
Apple
Microsoft
NVIDIA
Wikipedia
Reddit
```

说明：

```text
Authority Barrier
```

可能很高。

这时可以考虑：

- 更长尾 Query
- 更具体场景
- 更新速度
- 独家测试
- 更强 Experience
- 构建主题集群

不要只通过“多写 2000 字”解决。

## 看小站机会

如果 Top 10 里出现多个：

```text
低 DR
独立博客
小型论坛
新站
```

说明这个 Query 可能更依赖：

```text
相关性
Freshness
Experience
Information Gain
```

而不是纯品牌。

可以记录：

| 信号 | 机会 |
| --- | --- |
| 小站进入 Top 5 | 高 |
| 新页面快速进入 | 高 |
| 多种页面类型混合 | 中高 |
| Top 10 长期全是巨头 | 低 |
| SERP 每周剧烈变化 | 高但不稳定 |

## 看时间变化

一次 SERP 截图不够。

对于重要关键词，至少记录：

```text
Day 0
Day 7
Day 28
```

观察：

| 变化 | 可能含义 |
| --- | --- |
| Blog 变 Collection | Intent Shift |
| Reddit 增加 | UGC 需求上升 |
| 新页面大量进入 | Freshness |
| Top 10 基本不变 | SERP 稳定 |
| 大量年份页面更新 | QDF / Freshness |

## 决策表

分析完后必须输出行动。

| 结果 | 行动 |
| --- | --- |
| Intent 不匹配 | 换页面类型 |
| SERP 高度成熟 | 找更窄切口 |
| 有明显 Gap | 新建页面 |
| 已有页面接近 | 更新现有页 |
| 两词高度重叠 | 合并关键词 |
| 两词低重叠 | 拆页 |
| 品牌壁垒过高 | 做长尾与集群 |
| Freshness 强 | 加快更新频率 |

## 一套评分

内部可以建立：

```text
Opportunity Score
=
Intent Fit
+
SERP Weakness
+
Information Gain
+
Business Value
+
Execution Advantage
```

每项 1–5 分。

例如：

| 维度 | 得分 |
| --- | ---: |
| Intent Fit | 5 |
| SERP Weakness | 4 |
| Information Gain | 5 |
| Business Value | 4 |
| Execution Advantage | 4 |
| 总分 | 22 / 25 |

高分词优先。

这不是 Google 官方指标，只用于资源排序。

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 只看 KD | 忽略真实 SERP |
| 只看 DR | 忽略意图匹配 |
| 抄 Top 10 H2 | 没信息增益 |
| 不看页面类型 | 容易 Intent 错配 |
| 一次 SERP 就下结论 | 忽略波动 |
| 忽略 UGC / Video | 错判用户需求 |
| 看到高权重站就放弃 | 可能仍有长尾机会 |
| 看到小站就认为容易 | 可能它有极强 Experience |

## 最终流程

```text
Query
→ Intent
→ SERP 类型
→ 竞争强度
→ 内容结构
→ Gap
→ Information Gain
→ 页面策略
```

> **SERP 竞争分析不是“看谁更强”，而是判断 Google 当前认可什么答案、什么页面类型、什么证据，以及你还能提供什么新的价值。只有把竞争分析转化成页面决策，它才真正有 SEO 意义。**
