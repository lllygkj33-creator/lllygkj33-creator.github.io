---
title: "外链"
description: "解释 Follow、nofollow、sponsored、ugc 等外链类型的区别，以及外链为什么重要、锚文本应该怎么写、链接关系应该怎么设置。"
order: 1
updated: "2026-09-15"
---

> 外链的作用只有一句话：**让其他网站通过链接把“这个页面值得被引用、这个页面与某个主题有关”的信号传递给搜索引擎和用户。**

这里的“外链”指 **Backlink / Inbound Link**，也就是其他网站链接到你的网站。它和“出站链接”不是一回事。

外链真正有价值的地方，不只是多一个链接，而是同时带来：

```text
发现页面
+
主题关联
+
引用关系
+
品牌曝光
+
潜在推荐流量
```

## Follow 外链：默认的普通链接

很多人把普通链接叫做 `dofollow`，但 HTML 里实际上没有：

```html
rel="dofollow"
```

普通链接默认就是可被搜索引擎正常理解的链接关系。

例如：

```html
<a href="https://www.xxxx.com/phone-cases/">
  MagSafe phone cases
</a>
```

这类链接没有额外声明：

```text
nofollow
sponsored
ugc
```

通常就被称为 Follow Link。

如果一个行业媒体主动引用你的测试、指南或产品页面，这类自然产生的 Follow 外链通常最有价值，因为它表达的是：

> 这个网站主动选择引用你。

## nofollow：不希望把链接当作普通推荐

写法：

```html
<a href="https://www.xxxx.com/" rel="nofollow">
  source
</a>
```

`nofollow` 最初常被理解为“不传权重”，但现在更适合理解成：

> **告诉搜索引擎，这个链接不要按普通编辑推荐关系处理。**

常见场景包括：

- 无法确认目标站质量
- 某些用户自行添加的链接
- 不想表达明确推荐关系的链接
- 特殊合作场景

nofollow 并不代表链接“完全没用”。

它仍然可能带来：

```text
用户点击
品牌曝光
页面发现
自然二次传播
```

所以不要把外链价值只理解成“有没有传 PageRank”。

## sponsored：广告、付费合作和商业植入

如果链接是因为付费、赞助、广告、Affiliate 或商业合作产生，应该使用：

```html
rel="sponsored"
```

例如：

```html
<a href="https://www.xxxx.com/product/"
   rel="sponsored">
  protective phone case
</a>
```

适合：

```text
付费文章
赞助内容
广告链接
Affiliate Link
商业置换
付费测评
```

核心原则是：

> **如果链接存在的主要原因是商业关系，就不要伪装成自然编辑推荐。**

这也是为什么“买一批 Follow 外链”风险很高。

问题不在于外链数量，而在于链接关系和真实来源不一致。

## ugc：用户生成内容里的链接

`ugc` 代表 User Generated Content。

例如：

```html
<a href="https://www.xxxx.com/"
   rel="ugc">
  recommended phone case
</a>
```

适合：

- 论坛回复
- 评论区
- 社区帖子
- 用户个人资料
- 用户投稿区域

UGC 页面本身可以非常有价值，但站长通常无法完全控制每一个用户链接。

所以 `rel="ugc"` 更像是在告诉搜索引擎：

> 这个链接来自用户，而不是网站编辑主动推荐。

有些网站会同时使用：

```html
rel="ugc nofollow"
```

例如：

```html
<a href="https://www.xxxx.com/"
   rel="ugc nofollow">
  user submitted link
</a>
```

## 不同 rel 可以组合

一个链接可以同时具有多个属性。

例如：

```html
rel="nofollow sponsored"
```

或者：

```html
rel="ugc nofollow"
```

但不要为了“保险”把所有链接都写成：

```html
rel="nofollow sponsored ugc"
```

应该根据链接为什么产生来判断。

可以简单理解成：

| 链接来源 | 常见关系 |
| --- | --- |
| 编辑主动引用 | 默认 Follow |
| 普通不推荐链接 | `nofollow` |
| 付费 / 广告 / Affiliate | `sponsored` |
| 用户生成内容 | `ugc` |
| 用户链接且不想普通推荐 | `ugc nofollow` |

## 外链为什么重要

外链最核心的价值，是第三方网站对页面形成引用关系。

如果你自己说：

```text
这是最好的手机壳指南。
```

这只是自我陈述。

如果多个独立网站在相关语境里引用：

```text
phone case compatibility data
drop-test results
MagSafe case comparison
```

它形成的是外部验证。

从 SEO 角度，可以把外链价值拆成：

```text
链接页面本身的质量
+
来源网站与主题的相关性
+
链接所在正文的上下文
+
锚文本语义
+
链接是否自然
+
目标页面是否匹配
```

所以：

> **10 个高度相关的自然引用，通常比 500 个随机目录链接更有意义。**

## 外链锚文本不要只做完全匹配

假设你的 Collection 核心词是：

```text
phone cases
```

最危险的做法之一，是所有外链都使用：

```text
phone cases
phone cases
phone cases
phone cases
```

真实互联网里的链接不会这么整齐。

更自然的锚文本组合应该包含不同类型。

### 核心关键词锚文本

例如：

```text
phone cases
MagSafe phone cases
protective phone cases
```

适合高度相关页面，但不要让所有链接都完全匹配。

### Partial Match

例如目标关键词是：

```text
phone cases
```

可以写：

```text
protective cases for iPhone
MagSafe-compatible phone cases
clear cases for everyday use
```

既保留主题，又更自然。

### 品牌锚文本

例如：

```text
BrandName
BrandName phone cases
BrandName accessories
```

品牌锚文本通常非常自然，也是品牌实体信号的一部分。

### URL 锚文本

例如：

```text
xxxx.com
https://www.xxxx.com
```

这种 Naked URL 在新闻、资料页和论坛里很常见。

### Claim 锚文本

例如：

```text
reduced input latency in competitive gaming
```

目标页面应该真的提供这个结论的依据。

### Evidence 锚文本

例如：

```text
drop-test results
response-time measurements
battery test data
```

目标页应该提供对应测试、数据或证据。

## 锚文本和落地页必须一致

外链最重要的规范不是“关键词越准越好”，而是：

> **锚文本表达的内容，目标页面必须真的能满足。**

例如：

```text
锚文本：
MagSafe phone cases

目标：
Collection 页面
```

是合理的。

但如果：

```text
锚文本：
MagSafe phone cases

目标：
About Us
```

语义关系就很弱。

Shopify 可以简单对应：

| 目标页面 | 更适合的外链锚文本 |
| --- | --- |
| Collection | `phone cases`、`MagSafe phone cases` |
| Product | `Brand X100 MagSafe case` |
| Page | `phone case compatibility guide` |
| Blog | `why clear phone cases turn yellow` |
| 测试页面 | `drop-test results`、`latency measurements` |

核心原则和站内锚文本一样：

> **只看锚文本，就应该大致知道点进去会看到什么。**

## 外链所在上下文也很重要

不要只看 `<a>` 标签本身。

例如：

```text
For users who care about wireless charging,
these MagSafe phone cases support magnetic alignment
without requiring a separate mounting ring.
```

这里：

```text
MagSafe phone cases
```

周围的文字都在讨论：

```text
wireless charging
magnetic alignment
mounting
```

上下文高度相关。

相比一个完全无关的页面底部：

```text
Partner links:
phone cases
SEO tools
casino
VPN
hosting
```

即使锚文本完全匹配，价值和可信度也完全不同。

所以评价外链时要看：

```text
来源页面讲什么
↓
锚文本讲什么
↓
目标页面讲什么
```

三者最好形成连续语义。

## 不要把外链建设变成锚文本操控

健康的外链结构通常不会非常“完美”。

真实链接里会自然出现：

```text
品牌名
URL
核心词
长尾词
句子型 Claim
数据型 Evidence
```

如果一个站突然获得大量：

```text
best phone cases
best phone cases
best phone cases
```

而且都来自低质量或不相关站点，这种模式反而不自然。

外链策略应该优先创造“值得被引用的东西”，例如：

- 原创测试
- Benchmark
- 数据集
- 兼容性表
- 行业统计
- 原创图片
- 工具
- 计算器
- 深度教程
- 独家研究

然后让链接自然围绕这些资产产生。

## 怎么判断一个外链值不值得

可以用这几个问题快速判断：

```text
来源网站是否真实？
来源页面和我是否相关？
链接是不是正文自然出现？
锚文本是否符合上下文？
目标页是否真正匹配？
这个链接即使不考虑 SEO，会不会有人点击？
```

最后一个问题尤其重要。

如果答案是：

> 即使 Google 不存在，这个链接我仍然想要。

那它通常就是更健康的链接。

> **外链的目标不是制造一个“Follow 数量”，而是获得真实网站在真实上下文里对你内容的引用。Follow、nofollow、sponsored、ugc 只是链接关系的标记，真正决定价值的仍然是来源、相关性、上下文、锚文本和目标页面之间是否成立。**
