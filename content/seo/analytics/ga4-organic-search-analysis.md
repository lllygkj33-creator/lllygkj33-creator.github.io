---
title: "GA4"
description: "GA4 用于观察用户从自然搜索进入网站后的行为、参与度和转化。GSC 负责搜索前，GA4 负责点击后的用户行为，两者应组合使用。"
order: 2
updated: "2026-09-16"
---

> GSC 告诉你“用户为什么点进来”，GA4 告诉你“点进来以后发生了什么”。SEO 分析只有把两者连起来，才能从排名进入业务结果。

## GSC 和 GA4 分工

| 平台 | 主要阶段 | 核心问题 |
| --- | --- | --- |
| GSC | 点击前 | 搜索表现如何 |
| GA4 | 点击后 | 用户进站后做了什么 |

可以理解：

```text
Google Search
→ GSC
→ Click
→ Website
→ GA4
→ Engagement
→ Conversion
```

## Organic Search

在 GA4 中，自然搜索通常进入默认渠道：

```text
Organic Search
```

分析时建议同时看：

- Session default channel group
- First user default channel group

两者含义不同。

| 维度 | 回答 |
| --- | --- |
| Session Channel | 这一次访问从哪里来 |
| First User Channel | 用户第一次从哪里来 |

SEO 周报通常优先看：

```text
Session
```

## Sessions

Organic Search Sessions 是最常用 SEO 流量指标之一。

例如：

| 周期 | Sessions |
| --- | ---: |
| 上周 | 6,200 |
| 本周 | 6,600 |

变化：

```text
+400
+6.5%
```

但 Sessions 增长不能直接等于 SEO 质量增长。

还要看：

```text
Engagement
+
Conversion
```

## Users

常看：

| 指标 | 含义 |
| --- | --- |
| Total Users | 总用户 |
| New Users | 新用户 |
| Returning Users | 回访用户 |

如果：

```text
Sessions ↑
Users →
```

可能说明：

```text
同一批用户访问次数增加
```

如果：

```text
New Users ↑
```

更可能说明搜索带来了新增受众。

## Engagement

GA4 更强调 Engaged Session。

一个 Session 是否 Engaged，取决于系统定义的参与条件，例如持续一定时间、发生关键事件或产生多个页面 / 屏幕浏览。

常见 SEO 指标：

| 指标 | 用途 |
| --- | --- |
| Engaged Sessions | 有效访问 |
| Engagement Rate | 参与比例 |
| Average Engagement Time | 实际参与时间 |
| Views per Session | 浏览深度 |

不要把“时间越长”简单等于“内容越好”。

例如：

```text
What Is My IP?
```

用户 5 秒得到答案，可能非常成功。

## Bounce Rate

GA4 的 Bounce Rate 可以理解为：

```text
1 - Engagement Rate
```

所以它和传统 Universal Analytics 的 Bounce Rate 逻辑不同。

分析时不要直接套旧标准。

例如：

```text
Bounce Rate 70%
```

不一定差。

关键还是：

```text
页面任务有没有完成
```

## Landing Page

SEO 分析建议以：

```text
Landing Page
```

为核心维度。

因为 Landing Page 是：

> 用户从搜索进入网站的第一张页面。

可以建立：

| Landing Page | Sessions | Engagement | Conversions |
| --- | ---: | ---: | ---: |
| /blog/a | 1,200 | 68% | 20 |
| /page/b | 900 | 74% | 45 |
| /product/c | 700 | 55% | 80 |

这样可以判断：

```text
哪种 SEO 页面真正产生业务价值
```

## Page 类型

建议给 URL 分类：

| 类型 | 示例 |
| --- | --- |
| Blog | `/blogs/` |
| Product | `/products/` |
| Collection | `/collections/` |
| Page | `/pages/` |
| Support | `/support/` |

然后分析：

```text
Sessions
Engagement
Conversion
Revenue
```

按 Page Type 汇总。

## Key Events

GA4 现在更适合用：

```text
Key Events
```

来表示重要业务行为。

SEO 常见：

- Form Submit
- Add to Cart
- Purchase
- Sign Up
- Download
- Contact
- Trial Start

不要把：

```text
Page View
```

本身当成最终 SEO 成功指标。

## Revenue

电商 SEO 最终应该看：

```text
Organic Revenue
```

以及：

```text
Revenue per Organic Session
```

内部公式：

```text
Revenue Efficiency
=
Organic Revenue
÷
Organic Sessions
```

例如：

| 页面 | Sessions | Revenue | Revenue / Session |
| --- | ---: | ---: | ---: |
| A | 5,000 | $2,000 | $0.40 |
| B | 1,000 | $3,000 | $3.00 |

Page B 流量更小，但商业价值更高。

## Search + Behavior

把 GSC 和 GA4 组合：

| GSC | GA4 | 判断 |
| --- | --- | --- |
| Clicks ↑ | Sessions ↑ | 正常增长 |
| Clicks ↑ | Sessions → | Tracking / Landing 问题 |
| Clicks → | Sessions ↑ | 其他搜索引擎或归因变化 |
| CTR ↑ | Engagement ↓ | Title 可能吸引错用户 |
| Position ↑ | Conversion ↓ | Intent 可能不匹配 |

这类联合判断比单平台更有价值。

## 内容质量分析

例如 Blog：

```text
Traffic ↑
Engagement ↓
Conversion →
```

可能说明：

- 进入更宽泛 Query
- Intent 扩大
- 内容吸引更多 TOFU
- Title 过度承诺

不能简单说：

```text
流量增长 = 成功
```

## 新页面

新页面分析可以看：

| 阶段 | 指标 |
| --- | --- |
| Search Discovery | GSC Impressions |
| Ranking | GSC Position |
| Traffic | GSC Clicks / GA4 Sessions |
| Engagement | GA4 Engagement |
| Business | Key Events / Revenue |

这样形成完整漏斗。

## Organic Landing Page QA

建议每月筛：

- Sessions Top 20
- Growth Top 20
- Decline Top 20
- High Traffic / Low Engagement
- High Traffic / Low Conversion
- Low Traffic / High Conversion
- New Pages

不同页面对应不同动作。

## Brand 影响

GA4 本身不直接告诉你：

```text
Brand Query
vs
Non-brand Query
```

这部分更适合从 GSC 分 Query，然后再和 GA4 Landing Page 结合分析。

不要直接把所有 Organic Sessions 都当成 SEO 新增。

品牌需求本身也可能带来大量 Organic。

## Country 与 Device

同样需要拆：

| 维度 | 原因 |
| --- | --- |
| Country | 市场差异 |
| Device | UX 差异 |
| Browser | 技术问题 |
| Landing Page | 页面表现 |
| New / Returning | 用户结构 |

例如：

```text
Mobile Organic Sessions ↑
但 Conversion ↓
```

需要检查 Mobile UX，而不是继续追流量。

## 周报表

| 指标 | 本周 | 上周 | 变化 |
| --- | ---: | ---: | ---: |
| Organic Sessions | 6,600 | 6,200 | +6.5% |
| Users | 5,200 | 4,900 | +6.1% |
| Engagement Rate | 67% | 69% | -2pp |
| Key Events | 310 | 280 | +10.7% |
| Revenue | $X | $Y | +Z% |

后面再接：

```text
Top Growth Pages
Top Decline Pages
High Conversion Pages
```

## 常见误区

| 误区 | 问题 |
| --- | --- |
| GA4 Session = GSC Click | 两个平台逻辑不同 |
| Engagement 越高越好 | 取决于页面任务 |
| Organic Sessions 都是 Non-brand | 错 |
| Traffic 就是 SEO 成功 | 应看业务 |
| 只看全站 | 必须拆 Landing Page |
| Bounce Rate 套 UA 标准 | 定义不同 |

## 核心规范

```text
GSC 看搜索前
→
GA4 看点击后
→
Landing Page 定位页面
→
Engagement 看体验
→
Key Events / Revenue 看业务
```

> **GA4 Organic Search 分析的终点不是 Session，而是用户从自然搜索进入以后是否真正完成了业务动作。SEO 只有连接 Search Visibility、Traffic、Engagement 和 Conversion，才能完整评价效果。**
