---
title: "TDAU"
description: "用一套统一规则规范 Meta Title、Meta Description、图片 Alt 和 URL Slug，让页面在搜索结果、图片理解和站点结构上保持清楚、稳定、可维护。"
order: 2
updated: "2026-09-15"
---

> TDAU 可以理解成四个最基础的 On-page SEO 字段：**T = Title，D = Description，A = Alt，U = URL。**  
> 它们分别负责搜索结果里的主题表达、点击预期、图片语义和页面地址规范。四者都不是“写了就一定排名”，但写乱了会持续制造理解成本。

## T：Meta Title 是搜索结果里的主标题信号

Meta Title 主要给搜索引擎和用户看，用来表达：

> **这个页面最核心的主题是什么。**

例如一个卖手机壳的 Collection 页面：

```text
iPhone Cases | Shockproof, Clear & MagSafe Phone Cases
```

比：

```text
Our Best Products for Your Phone
```

更清楚，因为前者直接出现核心品类词。

Title 通常会出现在 SERP，但 **你改了 Title，不代表 Google 一定原样展示**。Google 可能根据：

- 页面正文
- H1
- 查询词
- 锚文本
- 页面整体主题

重新生成搜索结果标题。

这不是“Title 没用”，而是说明：

> **Title 是强提示，不是强制展示字段。**

实操上，英文页面建议把 Title 控制在大约 **45-60 个英文字符**。这不是硬性限制，而是为了减少 SERP 被截断，同时保证主题足够清楚。

一个好的 Title 通常包含：

```text
核心关键词
+
页面差异点
+
必要时加入品牌
```

例如：

```text
MagSafe Phone Cases for iPhone 17 | BrandName
```

而不是：

```text
Best Cheap New MagSafe Phone Cases iPhone 17 Cases Protective Cases
```

不要堆关键词。

## D：Meta Description 负责解释“为什么值得点”

Meta Description 不直接决定排名，但它会影响用户在 SERP 里对页面的理解。

它的任务不是重复 Title，而是补一句：

> **这个页面能解决什么问题，为什么值得点击。**

例如：

```text
Compare clear, protective and MagSafe phone cases for iPhone 17 by material, grip, drop protection and charging compatibility.
```

比：

```text
Shop the best phone cases online. Great products and great prices.
```

信息量更高。

英文 Description 建议控制在大约 **140-160 个英文字符**。

同样，Google 不保证原样展示你的 Description。它可能根据用户搜索词，从正文里截取更匹配的一段。

所以不要把 Description 当成固定广告位，而应该把它写成：

```text
清楚主题
+
补充差异
+
符合搜索意图
```

核心关键词可以出现一次，但不需要机械重复。

## T + D 为什么要允许 Google 重写

很多人看到 SERP 和后台设置不一致，会反复修改 Title 和 Description。

这不一定是问题。

搜索引擎会根据不同查询动态匹配。

例如同一页面同时覆盖：

```text
phone case
MagSafe phone case
clear iPhone case
protective case
```

对于不同搜索词，Google 可能展示不同的标题或摘要。

所以 T 和 D 的真正作用不是“控制 SERP 每一个字”，而是：

> **给搜索引擎一个清楚、稳定的页面主题基线。**

如果页面主题、H1、正文、锚文本和 T/D 一致，Google 更容易理解你想表达什么。

不要因为一次 SERP 改写，就一天改三次 Title。

## A：图片 Alt 是图片的文字说明

Alt 是图片无法直接被文字理解时的替代描述。

它主要服务三个场景：

```text
无障碍阅读
图片加载失败
搜索引擎理解图片内容
```

好的 Alt 应该回答：

> **这张图是什么，以及它为什么出现在这里。**

例如：

```html
alt="clear MagSafe phone case on iPhone 17"
```

比：

```html
alt="phone case best phone case iPhone case MagSafe case"
```

更自然。

Alt 不应该是关键词仓库。

建议：

- 描述图片真实内容
- 必要时自然包含核心词
- 一张图只描述一个主要对象
- 装饰性图片可以留空 `alt=""`
- 不要写“image of”“picture of”这类无意义前缀
- 尽量控制在 **80-125 个英文字符以内**

例如产品图：

```text
black shockproof iPhone 17 case with raised camera edges
```

例如教程截图：

```text
Shopify product editor showing the search engine listing section
```

Alt 的重点是准确，不是塞词。

## U：URL 是最应该一次设计好的字段

URL 和 T/D 最大的区别是：

> **Title 和 Description 可以反复改，URL 不应该频繁改。**

因为 URL 一旦被：

- Google 收录
- 外链引用
- 社交媒体分享
- 内链使用
- 用户收藏

再改就需要重定向和信号迁移。

所以 URL Slug 要尽量做到：

```text
短
稳定
可读
带主题
不依赖时间
```

例如：

```text
/collections/phone-cases/
```

比：

```text
/collections/our-best-products-for-phones-2026/
```

更稳定。

## Shopify 不同页面的 URL 应该怎么写

Shopify 常见的核心页面可以分成 Collection、Product、Page 和 Blog。

### Collection：用核心品类大词

Collection 是品类页，通常承接范围更大的商业搜索。

如果卖手机壳，推荐：

```text
/collections/phone-cases/
/collections/magsafe-phone-cases/
/collections/clear-phone-cases/
```

核心词应该是：

```text
phone cases
MagSafe phone cases
clear phone cases
```

原因很简单：

Collection 本身代表一整个产品集合，所以 URL 应该表达“这个集合是什么品类”。

不要写成：

```text
/collections/shop-all-new-arrivals-best-products/
```

这种 slug 不稳定，也没有清楚的主题。

### Product：品牌 / 型号 + 核心产品词

Product 页面更具体，slug 应该能区分具体产品。

例如：

```text
/products/brand-x100-magsafe-phone-case/
```

可以包含：

```text
品牌
型号
核心产品词
```

例如：

```text
brand
x100
phone case
```

这样 URL 即使脱离页面标题，也能知道它是什么。

但不要写成：

```text
/products/new-best-case-sale-2026-version-2/
```

产品 slug 一旦确定，尽量长期稳定。

### Page：用长期主题词

Page 常用于：

```text
compatibility
shipping
warranty
material guide
about
```

例如：

```text
/pages/phone-case-compatibility/
/pages/material-guide/
/pages/warranty/
```

Page 的 URL 应该偏长期，不要绑定短期活动。

### Blog：控制在 3-6 个英文实词

Blog URL 最容易写得过长。

标题可以是：

```text
How to Choose the Best Phone Case for iPhone 17
```

Slug 可以压缩成：

```text
choose-iphone-17-phone-case
```

通常建议 Blog Slug 控制在大约 **3-6 个英文实词**。

可以删除不影响理解的连接词，例如：

```text
a
an
the
for
in
of
to
with
```

例如：

```text
how-to-choose-the-best-phone-case-for-iphone-17
```

可以压成：

```text
choose-iphone-17-phone-case
```

但不要为了删词而让 URL 变得难读。

URL 的原则不是“越短越好”，而是：

> **在保持语义清楚的前提下尽量短。**

## 为什么 URL 不建议放年份

对于 Evergreen 内容：

```text
best-phone-cases-2026
```

通常不如：

```text
best-phone-cases
```

稳定。

原因是第二年你会面临两个选择：

```text
继续保留 2026
→ 显得过时

改成 2027
→ URL 发生变化
```

URL 一变，就需要：

- 301
- Sitemap 更新
- 内链更新
- Canonical 检查
- 信号重新整合

所以年份应该优先放在：

```text
Title
H1
正文
更新时间
```

而不是 URL。

例外是年份本身就是搜索对象，例如：

```text
Apple Event 2026
2026 tax deadline
2026 election results
```

这种内容年份属于主题，不是装饰。

## 多语言站点为什么也可以优先英文 Slug

多语言站并不要求每种语言都使用本地语言 slug。

例如：

```text
/en/phone-cases/
/de/phone-cases/
/fr/phone-cases/
```

可以比：

```text
/de/handyhuellen/
/fr/coques-telephone/
```

更容易维护。

英文 slug 的主要优势不是“英文更容易排名”，而是：

- URL 结构统一
- CMS 更容易管理
- 多语言映射更稳定
- 重定向更少
- 团队更容易识别页面
- 分享和复制更方便
- hreflang / canonical 排查更简单

尤其是大型 Shopify 多语言站，如果每个市场都单独翻译 slug，很容易出现：

```text
同一页面不同命名
路径历史版本太多
重定向变复杂
URL 不一致
```

所以优先考虑稳定和可维护性。

但如果某个本地市场的本地语言 slug 已经长期稳定、有大量外链和搜索历史，不应该为了“统一英文”强制改掉。

## 一套简单的 TDAU 检查标准

发布前可以快速检查：

| 字段 | 核心问题 |
| --- | --- |
| Title | 是否一眼知道页面主题 |
| Description | 是否补充点击理由 |
| Alt | 是否准确描述图片 |
| URL | 是否短、稳定、可读、能表达主题 |

再进一步：

```text
Title
→ 核心关键词是否自然出现

Description
→ 是否说明页面价值，而不是重复 Title

Alt
→ 是否真的描述图片，而不是堆词

URL
→ 三年后是否仍然愿意保留这个地址
```

> **T 和 D 可以持续测试，A 要准确描述图片，U 要尽量一次设计正确。URL 是四个字段里最不应该频繁修改的那个。**
