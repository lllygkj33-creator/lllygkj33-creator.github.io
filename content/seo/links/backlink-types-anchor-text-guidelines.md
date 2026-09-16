---
title: "外链"
description: "外链是其他网站指向你的链接。理解外链需要同时看链接关系、锚文本、来源语境、目标页面和商业属性，而不是只统计数量或 Follow 比例。"
order: 1
updated: "2026-09-16"
---

> 外链的核心不是“拿到一个链接”，而是：**其他网站在真实语境中选择引用你的页面。**

这里的外链指：

```text
Backlink
=
其他网站
→
你的页面
```

它和网站主动链接别人的 `Outbound Link` 不是同一个概念。

## 外链有什么用

| 作用 | 含义 |
| --- | --- |
| Discovery | 帮助发现页面 |
| Relevance | 建立主题关系 |
| Authority | 形成第三方引用 |
| Referral | 带来真实访问 |
| Brand | 增加品牌曝光 |

所以外链价值不能只理解成“传不传 PageRank”。一个 `nofollow` 链接仍然可能带来用户点击、品牌曝光、二次引用和页面发现。

## 普通链接

很多 SEO 会把普通链接叫 `dofollow`，但 HTML 中没有 `rel="dofollow"`。一个普通可抓取链接通常只是：

```html
<a href="https://www.xxxx.com/guide/">home server guide</a>
```

如果没有 `nofollow`、`sponsored`、`ugc` 等特殊属性，它就是普通链接关系。

## nofollow

```html
<a href="https://www.xxxx.com/" rel="nofollow">source</a>
```

更准确的理解不是“绝对不传权重”，而是：**网站不希望 Google 把这个链接按普通推荐关系处理。** 常见场景包括不愿明确背书的来源、某些不可控链接、无法确认目标站质量等。

不要因为“怕流失权重”而把所有外部链接统一写成 `nofollow`。

## sponsored

广告、付费发布、Affiliate 或其他商业关系应优先使用：

```html
rel="sponsored"
```

| 场景 | 属性 |
| --- | --- |
| Paid Placement | `sponsored` |
| Affiliate | `sponsored` |
| Sponsored Review | `sponsored` |
| 广告链接 | `sponsored` |

Google 当前仍接受 `nofollow` 标记付费链接，但 `sponsored` 更具体。核心原则是：**商业关系不要伪装成自然编辑推荐。**

## ugc

`ugc` 代表 User Generated Content，适合论坛、评论区、社区、用户资料和用户投稿区：

```html
<a href="https://www.xxxx.com/" rel="ugc">user shared link</a>
```

也可以组合：

```html
rel="ugc nofollow"
```

## rel 可以组合

| 链接来源 | 常见关系 |
| --- | --- |
| 编辑主动引用 | 默认普通链接 |
| 不愿明确背书 | `nofollow` |
| 广告 / 付费 | `sponsored` |
| 用户生成 | `ugc` |
| UGC 且不希望普通推荐 | `ugc nofollow` |

不要机械写 `rel="nofollow sponsored ugc"`，属性应该解释这个链接为什么存在。

## 锚文本

Anchor Text 是链接的可见文字。好的 Anchor 应该：

```text
简洁
+
描述目标页
+
符合当前语境
```

Google 当前的链接最佳实践同样强调锚文本应该描述清楚、措辞简洁，并与来源页和目标页相关。

## 常见锚文本

假设目标主题是 `home server`：

| 类型 | 示例 |
| --- | --- |
| Exact | `home server` |
| Partial | `home server hardware` |
| Brand | `BrandName` |
| Brand + Topic | `BrandName home server` |
| URL | `xxxx.com` |
| Claim | `reduces transcoding load` |
| Evidence | `Plex benchmark results` |

真实互联网不会所有链接都使用一个完全相同的关键词。

## 不要设计完美 Anchor 比例

没有必要建立“品牌词 40%、Exact 10%、Partial 25%”这类固定比例。更重要的是：

```text
真实来源
→
真实上下文
→
自然 Anchor
```

如果大量外链突然统一使用 `best home server`，而且来自低相关页面，这更像人为控制。

## 锚文本和页面要匹配

例如：

```text
Anchor:
Plex hardware requirements
```

目标页应该真正回答 CPU、RAM、GPU、Transcoding，而不是指向 About Us。

可以用一个简单测试：**只看 Anchor，能不能大致预测点击后会看到什么？**

## 上下文

评价外链不能只看 `<a>`，需要同时看：

```text
Source Page
↓
Surrounding Text
↓
Anchor
↓
Target Page
```

正文中为证明一个 Benchmark 主动链接原始测试页，通常比无关 Footer 里的关键词链接更有语义价值。

## 外链来源类型

| 类型 | 特征 |
| --- | --- |
| Editorial | 编辑主动引用 |
| Citation | 引用数据、研究、定义 |
| PR | 新闻报道与发布 |
| Community | Forum / Reddit / Community |
| Partner | 合作伙伴 |
| Directory | 目录 |
| Sponsored | 付费 |
| UGC | 用户生成 |
| Profile | 官方账号 / 资料页 |

类型本身不决定价值，真正要看“为什么链接你”。

## Referring Domain

需要区分 Backlinks 和 Referring Domains。同一网站模板产生 500 个链接，不等于 500 个独立网站认可。因此外链数量必须结合独立来源一起看。

## Link Equity

Link Equity 可以理解成链接关系可能传递的搜索信号，但没有公开公式可以准确算“这个链接 = X 分”。真实价值还受到来源页面质量、相关性、链接位置、目标匹配、Spam Detection 和链接属性等影响。

所以 Link Equity 更适合当概念，而不是公开可计算分数。

## 什么值得被引用

最健康的外链策略通常不是“先找链接”，而是先创造可引用资产，例如：

- Benchmark
- Original Research
- Data
- Compatibility Table
- Calculator
- Dataset
- Statistics
- Original Images
- Technical Docs
- Deep Tutorial

这些内容有明确引用理由。

## 快速判断

| 问题 | 判断 |
| --- | --- |
| 来源是真实网站吗 |  |
| 页面和我的主题相关吗 |  |
| 是编辑主动选择吗 |  |
| 链接在正文里自然吗 |  |
| Anchor 符合语境吗 |  |
| Target 真正匹配吗 |  |
| 即使没有 Google，我还想要它吗 |  |

最后一个问题最重要。如果答案是 Yes，它通常更接近健康链接。

## 常见误区

| 误区 | 问题 |
| --- | --- |
| Follow 越多越好 | 忽略来源 |
| nofollow 完全没价值 | 忽略 Referral / Brand |
| Exact Anchor 越准越好 | 容易人为化 |
| DR 高就一定好 | 第三方指标不能替代相关性 |
| 链接越多权重越高 | 重复来源可能价值有限 |
| 所有广告都做 Follow | 商业关系应正确标记 |

## 核心规范

```text
先看为什么产生链接
→
再看来源和上下文
→
再看 Anchor
→
再看目标页面
→
最后才看数量和第三方指标
```

> **外链最值得追求的不是“Follow 数量”，而是独立网站在相关语境中，主动把你的内容当作值得引用的来源。**
