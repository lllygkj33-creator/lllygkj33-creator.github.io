---
title: "链接规范"
description: "以 Shopify 架构为例，说明 Collection、Product、Page、Blog 之间怎么做内链，什么时候需要出站链接，以及不同页面应该使用什么样的锚文本。"
order: 4
updated: "2026-09-15"
---

> 链接的作用只有一句话：**内链负责建立站内页面之间的主题关系和权重流动，出站链接负责给事实、术语和判断补充可信来源。**

链接不是“文章里有几个蓝色文字”这么简单。一个链接是否合理，要同时看三个东西：**当前页面是什么、目标页面是什么、锚文本在两者之间扮演什么角色。**

## 先理解 Shopify 的四类核心页面

一个典型 Shopify 内容站，最常见的页面可以分成四类：

| 页面类型 | 主要任务 | 常见 URL 结构 |
| --- | --- | --- |
| Collection | 承接品类搜索和商业意图 | `/collections/...` |
| Product | 承接具体产品和购买决策 | `/products/...` |
| Page | 承接品牌、政策、专题、长期说明 | `/pages/...` |
| Blog | 承接信息型搜索和长尾流量 | `/blogs/...` |

它们不是同一层级。

例如卖手机壳的网站：

```text
Collection
→ Phone Cases

Product
→ iPhone 17 Clear Case

Page
→ Shipping Policy / About / Compatibility Guide

Blog
→ Best Phone Cases for iPhone 17
```

内链的价值，就是把这些页面连接成一个清楚的主题结构。

## Collection 链接用“品类词”

Collection 页面最适合承接 broad commercial intent，也就是用户已经知道自己想买什么品类，但还没有决定具体产品。

如果你卖手机壳，Collection 的核心锚文本应该接近：

```text
phone cases
iPhone cases
clear phone cases
MagSafe phone cases
protective phone cases
```

而不是：

```text
see more
our products
shop here
this collection
```

因为 Collection 本身就是品类页面，锚文本最好直接表达品类。

例如正文在讨论“不同材质的手机壳怎么选”，如果需要把用户送到 Collection，锚文本可以是：

```text
MagSafe phone cases
clear phone cases
protective iPhone cases
```

原则是：

> **Collection 用品类词，不用具体型号词硬塞，也不要用没有主题信息的动作词。**

## Product 链接用“具体产品 + 场景”

Product 页面承接的是更具体的购买意图。

适合的锚文本通常包含：

```text
产品名称
产品特征
产品适用场景
产品关键卖点
```

例如：

```text
clear MagSafe case
shockproof iPhone case
slim protective case
anti-yellow phone case
```

如果正文在讲“透明壳长期发黄的问题”，链接到某个具体产品时，用：

```text
anti-yellow clear case
```

通常比：

```text
this product
buy now
our case
```

更清楚。

但不要为了 SEO 把每个产品链接都写成完全一样的产品关键词。Product 锚文本应该跟当前句子的语境变化。

## Page 链接用“问题词或主题词”

Page 往往不是直接销售页，而是承接长期说明、品牌解释或工具型内容。

例如：

```text
phone case compatibility guide
shipping policy
warranty information
material guide
device compatibility
```

这类页面的锚文本最好直接表达“用户为什么要点”。

例如正文里提到：

> 不同 iPhone 代际之间的尺寸变化会影响保护壳是否兼容。

此时更适合的锚文本是：

```text
iPhone case compatibility guide
```

而不是：

```text
learn more
this page
more information
```

Page 链接最重要的是让用户提前知道：**点进去会解决什么问题。**

## Blog 链接用“问题、场景和长尾词”

Blog 更适合承接信息型搜索。

例如：

```text
how to clean a clear phone case
best phone cases for travel
why clear cases turn yellow
MagSafe case buying guide
```

Blog 之间的内链不应该只是“相关内容推荐”。

更好的关系是：

```text
当前文章提出问题
↓
另一个 Blog 深挖这个问题
```

例如当前文章讲“透明壳材质区别”，提到发黄问题时，可以用：

```text
why clear phone cases turn yellow
```

作为锚文本指向更深入的文章。

Blog 锚文本通常比 Collection 更长，因为它需要表达具体问题或场景。

## 内链要按“页面任务”流动

Shopify 站点里常见的合理路径是：

```text
Blog
→ Collection
→ Product
```

例如：

```text
Best Phone Cases for iPhone
→ Phone Cases
→ Clear MagSafe Case
```

也可以反向补充：

```text
Product
→ Page
→ Blog
```

例如产品页里用户需要确认：

```text
兼容性
材质
安装
清洁
```

就可以把这些解释交给 Page 或 Blog。

关键不是“每个页面都互相链接”，而是：

> **一个页面在完成自己的任务以后，把用户送到最合理的下一步。**

如果 Blog 直接塞很多 Product 链接，却没有 Collection 或决策逻辑，很容易变成硬销售。

## 出站链接主要负责“证明”

这里的外链指的是 **outbound link / 出站链接**，不是别人链接到你的网站。

出站链接最适合四种情况：

```text
术语定义
官方规格
数据证据
原始研究
```

例如正文说：

> 某个材料标准要求达到特定测试等级。

这时候应该链接到：

```text
官方标准
官方技术文档
原始测试报告
```

而不是链接到另一个二手博客。

如果正文说：

> 某个品牌支持某项功能。

优先级通常是：

```text
品牌官方文档
>
官方产品页
>
可信媒体
>
普通博客
```

出站链接的核心不是“给权威网站投票”，而是：

> **让读者可以验证你的判断从哪里来。**

## 不同链接应该用不同锚文本

锚文本应该反映目标页的角色。

| 目标页面 | 更适合的锚文本 |
| --- | --- |
| Collection | `phone cases`、`MagSafe phone cases` |
| Product | `clear MagSafe case`、`shockproof case` |
| Page | `phone case compatibility guide` |
| Blog | `why clear cases turn yellow` |
| 官方文档 | `USB-C specification`、`official compatibility requirements` |
| 数据来源 | `drop-test results`、`material durability data` |

一个简单判断方式是：

> **不看 URL，只看锚文本，我能不能大概知道点过去会看到什么？**

如果不能，锚文本通常太泛。

少用：

```text
click here
read more
learn more
this page
this article
our products
see details
```

这些词可以承担 UI 动作，但不适合作为主要 SEO 锚文本。

## 最后检查链接有没有“任务关系”

上线前检查每个链接：

```text
当前页面为什么需要这个链接？
↓
锚文本有没有表达目标页主题？
↓
目标页面是不是用户合理的下一步？
```

如果一个链接只是因为“这里应该放个链接”，那通常可以删掉。

一个健康的 Shopify 链接结构应该是：

```text
Collection 承接品类
Product 承接具体购买
Page 承接解释和规则
Blog 承接问题与长尾
Outbound link 承接证据
```

> **链接规范的目标不是增加链接数量，而是让每一个链接都承担清楚的页面关系、用户路径和语义任务。**
