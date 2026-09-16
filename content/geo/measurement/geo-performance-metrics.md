---
title: "GEO 指标"
description: "GEO 效果指标应覆盖品牌是否被提及、是否被引用、引用是否准确、是否进入商业推荐以及是否产生真实访问。单一 Citation 数量不足以评价 GEO 成效。"
order: 3
updated: "2026-09-16"
---

> GEO 不能只看“有没有被 AI 引用”。完整效果应该从：**可见度 → 引用 → 准确性 → 流量 → 商业价值** 五层判断。

## 指标框架

| 层 | 指标 |
| --- | --- |
| Visibility | Mention Rate |
| Source | Citation Rate |
| Accuracy | Entity Accuracy |
| Competitive | Source Share |
| Traffic | AI Referral Sessions |
| Business | Conversion / Revenue |
| Stability | Citation Stability |

## Mention Rate

定义：

```text
Mention Rate
=
出现品牌的 Prompt 数
÷
测试 Prompt 总数
```

例如：

```text
50 个 Prompt
17 个提到品牌
```

则内部：

```text
Mention Rate = 34%
```

这不是 AI 平台官方指标。

## Citation Rate

定义：

```text
Citation Rate
=
引用本站的 Prompt 数
÷
测试 Prompt 总数
```

例如：

```text
50 个 Prompt
9 个引用本站
```

则：

```text
Citation Rate = 18%
```

Mention 和 Citation 必须分开。

## Entity Accuracy

品牌被提到但事实错误，不算高质量 GEO。

可以记录：

| 分数 | 含义 |
| ---: | --- |
| 2 | 完全正确 |
| 1 | 基本正确但缺边界 |
| 0 | 错误 |

再计算：

```text
Entity Accuracy
=
总得分
÷
最高可能得分
```

## Source Share

在同一 Topic 的全部 Citation 中：

```text
本站占多少
```

内部定义：

```text
Source Share
=
本站 Citation
÷
该 Topic 全部 Citation
```

例如：

```text
Your Site = 20
All Sources = 100

Source Share = 20%
```

用于竞争比较。

## Answer Share

也可以看：

```text
Brand 出现在多少个答案里
```

和 Mention Rate 类似，但可以进一步按：

- Topic
- Funnel
- Market
- Language

拆分。

## Commercial Presence

商业 GEO 不能只测定义词。

例如：

```text
best home server
best NAS for Plex
mini PC for local AI
```

如果品牌进入这些答案的：

```text
Recommendation Set
```

商业价值通常更高。

可以记录：

| Prompt | Brand Recommended |
| --- | --- |
| Best X | Yes |
| X vs Y | No |
| Which X | Yes |

## Citation Stability

同一 Prompt 多次测试：

```text
Citation Stability
=
出现 Citation 的次数
÷
测试次数
```

例如：

```text
6 / 8
=
75%
```

帮助区分：

```text
偶然引用
vs
稳定来源
```

## Topic-level Metrics

不要只看全站。

例如：

| Topic | Mention | Citation | Accuracy |
| --- | ---: | ---: | ---: |
| Home Server | 60% | 35% | 95% |
| NAS | 30% | 15% | 90% |
| Local AI | 20% | 8% | 80% |

这样才能决定下一步投资方向。

## Funnel-level Metrics

| Funnel | 重点 |
| --- | --- |
| Learn | Definition Mention |
| Evaluate | Comparison Citation |
| Decide | Recommendation Presence |
| Buy | Product Citation |
| Support | Troubleshooting Citation |

不同 Funnel 的价值不同。

## Referral

最终还要看：

```text
AI Referral Sessions
```

以及：

- Engagement
- Key Events
- Revenue
- Assisted Conversion

如果 Citation 很高但没有 Referral，也不一定无价值，因为生成式回答可能已经完成用户任务。

所以：

```text
Citation
≠
必须产生 Click
```

## 业务指标

最终 GEO 可以连接：

```text
AI Referral
→
Lead
→
Signup
→
Purchase
```

例如：

| Source | Sessions | Conversion |
| --- | ---: | ---: |
| AI Platform A | 500 | 4.2% |
| Organic Search | 5000 | 2.3% |

这能判断：

```text
AI Traffic Quality
```

## Dashboard

建议每月固定：

| 指标 | 本月 | 上月 | 变化 |
| --- | ---: | ---: | ---: |
| Mention Rate | 34% | 29% | +5pp |
| Citation Rate | 18% | 15% | +3pp |
| Entity Accuracy | 92% | 90% | +2pp |
| Source Share | 12% | 10% | +2pp |
| AI Referrals | 420 | 300 | +40% |

## 核心规范

```text
Visibility
→
Citation
→
Accuracy
→
Referral
→
Business
```

> **GEO 指标不能只统计“AI 有没有提到我”。真正成熟的 GEO 测量，需要同时回答：品牌有没有进入答案、有没有被当作来源、事实是否正确、用户有没有访问，以及这些访问有没有商业价值。**
