---
title: "排名下降诊断树"
description: "排名下降应按需求、索引、技术、意图、竞争、内容和算法变化逐层排查。不要看到 Position 下跌就立即重写页面。"
order: 35
updated: "2026-09-16"
---

> 排名下降不是一个原因，而是一种结果。正确排查顺序应该先确认“是不是真掉了”，再判断是需求、技术、意图、竞争还是内容问题。

## 第一步：确认下降

先排除：

```text
短期波动
```

建议同时看：

| 周期 | 用途 |
| --- | --- |
| 7d vs 前 7d | 短期 |
| 28d vs 前 28d | 中期 |
| YoY | 季节性 |

如果只是：

```text
#3 → #5
```

一两天，不一定需要动作。

如果：

```text
#4 → #20
```

持续数周，就值得深查。

## 诊断树

```text
Clicks ↓
│
├─ Impressions ↓
│  ├─ Position 稳定 → 搜索需求下降
│  └─ Position ↓ → 排名问题
│
├─ Impressions 稳定
│  ├─ Position 稳定 → CTR 问题
│  └─ Position ↓ → 排名问题
│
└─ Position 稳定
   └─ CTR ↓ → SERP / Title / Feature
```

这是最基础的第一层。

## 搜索需求

先看：

```text
Google Trends
```

如果：

```text
Search Demand ↓
Position 稳定
Clicks ↓
```

说明：

```text
SEO 本身可能没变
```

例如：

- Event 结束
- 新模型热度下降
- 季节结束
- Black Friday 结束

不要因为需求下降而重写本来排名稳定的页面。

## 索引问题

检查：

| 项目 | 风险 |
| --- | --- |
| URL 是否 Indexed | 高 |
| Noindex | 高 |
| Canonical 改变 | 高 |
| robots 阻止 | 高 |
| 404 / 5xx | 高 |
| Sitemap 移除 | 中 |
| Redirect | 高 |

如果页面已经不在索引：

```text
内容优化没有意义
```

先修技术问题。

## 页面改动

如果下降发生在：

```text
页面改版后
```

优先检查：

- Title
- H1
- 主内容
- Canonical
- URL
- 内链
- Schema
- JS 渲染
- 删除段落

尤其是：

```text
删除原来排名 Query 对应段落
```

很容易导致 Long-tail 流失。

## 意图变化

SERP 可能发生：

```text
Blog
→
Collection
```

或者：

```text
Evergreen
→
Fresh News
```

此时页面本身没变，但 Google 对 Query 的理解变了。

检查 Top 10：

| 过去 | 现在 |
| --- | --- |
| Blog 7 | Blog 3 |
| Product 1 | Product 4 |
| Reddit 1 | Reddit 2 |
| Video 1 | Video 1 |

如果页面类型“席位”减少，单纯增加字数无效。

## 竞争对手

看：

```text
谁超过了你
```

再比较：

| 维度 | 你 | 对手 |
| --- | --- | --- |
| Freshness | 旧 | 新 |
| Experience | 无 | 有 |
| Original Data | 无 | 有 |
| Backlinks | 少 | 多 |
| Intent Fit | 中 | 高 |
| Page Type | Blog | Buying Guide |

排名下降往往是：

```text
对手变强
```

而不是你被“处罚”。

## 内容衰退

页面可能因为事实变旧而自然衰退。

常见：

- 旧产品
- 旧版本
- 旧价格
- 旧截图
- 旧 Benchmark
- 旧推荐

如果 Top 10 全部更新到：

```text
2026
```

而页面仍然是：

```text
2024
```

Freshness 差距很明显。

## 蚕食

检查同 Query 是否出现多个 URL。

如果：

```text
URL A
URL B
```

交替排名，就可能是关键词蚕食。

解决：

- 合并
- 重定位
- 统一内链
- 301
- Canonical

不要只改 Title。

## 外链变化

如果重要页面突然下降，可以检查：

- 强外链是否丢失
- Referring Domain 是否消失
- Redirect 是否断开
- 页面 URL 是否更换

尤其是：

```text
旧 URL 有大量 Backlinks
→
改 URL 没 301
```

会直接损失历史信号。

## Core Update

如果下降发生在 Core Update 期间，不要立刻假设某个单一原因。

先看：

```text
是全站
还是局部
```

| 情况 | 判断 |
| --- | --- |
| 全站所有类型下降 | 站点级 |
| 只有 Buying Guide | 内容类型问题 |
| 只有 AI 内容 | 模板 / 质量问题 |
| 只有一个目录 | Section 问题 |
| 只有一个 URL | 单页问题 |

越能缩小范围，诊断越准确。

## 技术树

```text
页面还能访问？
↓
200？
↓
Indexable？
↓
Canonical 正确？
↓
Google Render 正常？
↓
内链存在？
↓
Sitemap 正常？
```

任何一层失败，都先修技术。

## 内容树

```text
Intent 还一样？
↓
页面类型还匹配？
↓
信息是否过时？
↓
竞争页是否新增价值？
↓
内容是否缺必要子问题？
↓
是否有信息增益？
```

## CTR 树

如果：

```text
Position 稳定
Impressions 稳定
Clicks ↓
```

重点查：

- Title
- Description
- SERP Features
- AI Overview
- Brand Result
- Competitor Title
- Rich Result

这时不一定要重写正文。

## 行动表

| 原因 | 动作 |
| --- | --- |
| Demand ↓ | 不急着改 |
| Indexing | 修技术 |
| Intent Shift | 改页面类型 |
| Content Decay | 更新 |
| Cannibalization | 合并 / 定位 |
| Competitor Stronger | 补 Gap |
| CTR ↓ | 优化 SERP 展示 |
| Backlink Loss | 修链接 / 重定向 |

## 核心规范

```text
先确认下降
→
再看需求
→
再看技术
→
再看 Intent
→
再看竞争
→
最后才改内容
```

> **排名下降诊断最大的错误是“看到跌就重写”。真正有效的 SEO 排查必须先判断下降发生在哪一层，再做对应动作。**
