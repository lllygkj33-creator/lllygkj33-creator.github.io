---
title: "链接审计"
description: "链接审计用于识别链接增长、丢失、来源结构、锚文本异常、迁移损失、Link Spam 和人工处置风险。重点是诊断真实问题，而不是看到低质量链接就批量 Disavow。"
order: 5
updated: "2026-09-16"
---

> 链接审计不是“找 Toxic Links”，而是：**判断哪些链接真正支持网站、哪些重要链接正在丢失，以及是否存在人为制造的 Spam 风险。**

## 审计看什么

| 层 | 检查 |
| --- | --- |
| Growth | 新增链接 |
| Loss | 丢失链接 |
| Sources | Referring Domains |
| Targets | 被链接页面 |
| Anchors | 链接文字 |
| Quality | 来源与上下文 |
| Spam | 人工操纵风险 |
| Migration | 旧 URL 链接 |
| Manual Actions | Google 人工处置 |

## 数据来源

不要只依赖一个工具。

```text
Google Search Console
+
Third-party Link Index
+
Analytics
+
Server / Redirect Data
```

Search Console Links Report 可以查看 Top Linking Sites、Top Linked Pages、Top Linking Text，但 Google 明确说明 Links Report 不是完整的所有链接清单。

因此：

```text
GSC 数量
≠
互联网全部 Backlinks
```

## Referring Domains

第一步先看哪些独立网站在链接，而不是总 Backlinks。

例如：

```text
100,000 Links
来自 3 个 Sitewide Templates
```

和：

```text
1,000 Links
来自 500 个独立相关站点
```

结构完全不同。

## Top Linked Pages

检查哪些页面获得最多外链，可以发现 Citation Assets、老文章、404 URL、被迁移页面、意外高链接页面。

如果一个历史 URL 有大量外链但已经 404，应优先判断是否有相关新页面可以 301 承接。

## Lost Links

丢链不一定是问题。

| 原因 | 是否异常 |
| --- | --- |
| 页面删除 | 正常 |
| 新闻过期 | 正常 |
| 网站改版 | 需检查 |
| 自己 URL 迁移 | 高优先 |
| 竞争对手替换 | 值得分析 |
| Linkable Asset 过时 | 值得更新 |

优先修高质量、相关、曾带流量的 Lost Links。

## 迁移

网站改版后尤其要检查：

```text
External Link
→
Old URL
→
301
→
New URL
```

Google 当前 Site Move 指南建议重要 Redirect 长期保留，并尽量联系高价值外部来源更新链接。

检查：

- 301 是否存在
- 是否有 Redirect Chain
- 是否跳到最相关新页面
- Canonical 是否正确
- 新页面是否 200

## Anchor

Anchor Audit 不是为了追求完美比例。重点找异常：

- 大量 Exact Match
- 与业务完全无关的词
- Casino / Loan / Adult 等 Spam Anchor
- 大量同一句 Anchor
- 品牌名被错误描述

自然链接通常混合 Brand、URL、Partial、Page Title、Claim、Evidence。

## 新增链接

突然新增很多链接时，不要先庆祝。检查：

```text
New Referring Domains
Source Type
Topic Relevance
Anchor
Placement
Commercial Relationship
```

一天增加 20,000 Links 可能只是一个 Footer Sitewide Link，不是 20,000 次独立认可。

## Link Spam

Google 当前 Spam Policies 把以下行为明确列为风险：

- 为排名买卖链接
- 产品 / 服务换 Follow Link
- 过度 Reciprocal Links
- 低质量目录
- Keyword-rich Widget Links
- Sitewide Template Links
- Forum Optimized Links
- 为操纵链接信号创建低价值内容

审计时真正应该找的是：

```text
我们是否主动参与过这些行为
```

而不是“互联网上有没有垃圾网站链接我”。

## Random Spam

正常网站经常会收到 Scraper Links、Auto-generated Domains、Spam Directories、Random Foreign Sites。

Google 当前对 Disavow 的官方指导仍然非常谨慎：

```text
大多数网站不需要使用 Disavow
```

所以不要“看到 Spam → 全部提交 Disavow”。

## Toxic Score

第三方工具常提供 Toxic Score、Spam Score、Risk Score。这些不是 Google 指标。

正确用法：发现异常线索。

错误用法：

```text
Score > 60
→
自动 Disavow
```

## Disavow

Google 当前说明，只有同时满足这类条件时才值得认真考虑：

```text
存在大量 Spam / Artificial / Low-quality Links
AND
这些链接已经导致或很可能导致 Manual Action
```

Disavow 是高级工具，错误使用可能伤害搜索表现。

所以流程应该是：

```text
确认历史人为 Link Scheme
→
尽可能移除
→
确认 Manual Action / 明显风险
→
再谨慎考虑 Disavow
```

## Manual Actions

如果 Search Console 出现 `Unnatural links to your site`，处理优先级明显提高。这时应找出人为建立链接、联系移除、保留处理记录、必要时 Disavow，再提交 Reconsideration。

不要只上传 Disavow 文件然后等待。

## Link Gap

审计也可以用于竞争分析。

例如：

```text
Competitor A
拥有 100 个相关媒体 Referring Domains

Your Site
只有 20 个
```

下一步不是复制所有来源，而是找为什么这些网站愿意引用 Competitor，可能是 Original Data、Tool、Statistics、Better Resource、Strong PR、Industry Position。

Link Gap 的价值是发现资产差距，不是批量复制链接。

## 月度审计表

| 指标 | 本月 | 上月 | 变化 |
| --- | ---: | ---: | ---: |
| Referring Domains | 520 | 500 | +20 |
| New Relevant Domains | 15 | 11 | +4 |
| Lost Relevant Domains | 4 | 8 | -4 |
| Linked 404 URLs | 12 | 20 | -8 |
| Editorial Links | 30 | 22 | +8 |
| Manual Actions | 0 | 0 | 0 |

这比单独写 `Backlinks +50,000` 更有解释力。

## 审计优先级

```text
P0
Manual Action

P1
重要外链指向 404 / 错 Redirect

P1
历史主动 Link Scheme

P2
高价值 Lost Links

P2
异常 Anchor / Source

P3
Random Spam
```

不要把所有垃圾链接都当成 P0。

## QA

| 检查 | 完成 |
| --- | --- |
| Referring Domains 已看 |  |
| Top Linked Pages 已看 |  |
| Lost Links 已看 |  |
| Linked 404 已看 |  |
| Anchor 异常已看 |  |
| Link Scheme 风险已看 |  |
| GSC Manual Actions 已看 |  |
| Disavow 是否真的必要 |  |
| Link Gap 已做 |  |

## 核心规范

```text
先看结构
→
再看重要链接
→
再看丢失和迁移
→
再检查人为 Spam
→
最后才考虑 Disavow
```

> **高质量链接审计的目标不是把所有“看起来差”的链接删掉，而是保护真正重要的链接资产、修复可恢复的损失，并识别是否存在真实的操纵性链接风险。**
