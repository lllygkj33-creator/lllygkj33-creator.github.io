---
title: "Google PageRank 算法详解"
description: "PageRank 是 Google 最经典的链接分析算法之一。它通过网页之间的链接关系估算页面重要性，并奠定了后来链接权重、内部链接结构和外链分析的基础。"
order: 5
updated: "2026-09-15"
---

> PageRank 的核心只有一句话：**一个页面的重要性，不只取决于有多少页面链接它，还取决于“是谁在链接它”，以及这些链接页面自身有多重要。**

PageRank 是 Google 早期最经典的算法之一。

它解决的问题不是：

```text
这个页面写得好不好
```

而是：

```text
在整个网页链接网络中，
这个页面有多重要
```

它把互联网看成一个巨大的图结构：

```text
Page
= Node

Link
= Edge
```

然后通过链接关系，把“重要性”在页面之间不断传播。

## PageRank 的基本思想

最简单的理解是：

> **一个重要页面给你的链接，比一个无关小页面给你的链接更有价值。**

例如：

```text
Page A
被 100 个低质量页面链接

Page B
被 5 个强权威页面链接
```

Page B 不一定比 Page A 差。

因为 PageRank 不只是数链接数量。

它关注：

```text
链接来源
+
来源页面自身权重
+
来源页面一共链出去多少个页面
```

这也是后来 SEO 里：

```text
高质量外链
```

比：

```text
大量低质量外链
```

更重要的数学基础之一。

## 经典公式

PageRank 的经典形式可以写成：

```text
PR(A)
=
(1 - d)
+
d × [
PR(T1) / C(T1)
+
PR(T2) / C(T2)
+
...
+
PR(Tn) / C(Tn)
]
```

其中：

| 符号 | 含义 |
| --- | --- |
| `PR(A)` | 页面 A 的 PageRank |
| `T1...Tn` | 链接到 A 的页面 |
| `PR(T)` | 来源页面自己的 PageRank |
| `C(T)` | 来源页面的出站链接数量 |
| `d` | Damping Factor，阻尼系数 |

经典论文里常用：

```text
d = 0.85
```

所以公式也常被写成：

```text
PR(A)
=
0.15
+
0.85 × 链接传递值
```

现代 Google 的实际系统早已远比这个公式复杂，但经典 PageRank 的核心逻辑仍然非常重要。

## 为什么要除以出站链接数量

假设：

```text
Page A
PR = 100
```

如果它只链接：

```text
1 个页面
```

那么它能传出去的权重会高度集中。

如果它链接：

```text
100 个页面
```

那么这部分权重会被分散。

可以粗略理解成：

```text
Link Equity Per Link
≈
页面可传递权重
÷
出站链接数量
```

例如：

| 页面 | PageRank | 出站链接 | 单链接传递值 |
| --- | ---: | ---: | ---: |
| A | 100 | 1 | 高 |
| B | 100 | 10 | 中 |
| C | 100 | 100 | 低 |

所以：

> **同一个页面上的链接越多，每一条链接理论上能分到的 PageRank 越少。**

这也是内部链接布局为什么不能完全随机。

## Damping Factor 是什么

如果没有 Damping Factor，PageRank 可能在某些闭环结构里无限循环。

例如：

```text
A → B
B → C
C → A
```

权重会不断在这三个页面之间传递。

所以 PageRank 引入随机冲浪者模型。

假设一个用户：

```text
85%
概率继续点击页面上的链接

15%
概率随机跳到其他页面
```

于是：

```text
d = 0.85
```

这就是阻尼系数的直观含义。

它防止：

```text
权重无限循环
```

也让整个图最终能够收敛。

## 一个三页示例

假设只有三个页面：

```text
A → B
A → C
B → C
C → A
```

初始时可以先假设：

```text
PR(A) = 1
PR(B) = 1
PR(C) = 1
```

A 有两个出站链接：

```text
A → B
A → C
```

所以 A 的 PageRank 会分成两份。

B 只有：

```text
B → C
```

所以 B 的可传递部分全部给 C。

C 只有：

```text
C → A
```

所以 C 的可传递部分全部给 A。

经过多轮迭代以后，PageRank 会逐渐稳定。

这个例子的关键不是算最终数字。

而是理解：

```text
C
同时得到 A 和 B 的链接
```

因此 C 会获得较强权重。

而：

```text
A
只有 C 链接它
```

但如果 C 很强，这一条链接依然可能很有价值。

## PageRank 是递归算法

PageRank 最经典的地方就在这里：

```text
页面 A 的权重
取决于链接它的页面

链接它的页面权重
又取决于其他页面
```

也就是说：

```text
PR(A)
依赖
PR(B)

PR(B)
又依赖
PR(C)
```

这是一个递归关系。

最终整个网站甚至整个 Web，需要通过多轮计算才能逐渐收敛。

所以：

> **权重不是局部产生的，而是在整个链接图里流动。**

## 外链和 PageRank

外链的经典价值可以从 PageRank 直接理解。

假设：

```text
Site A
DR / Authority 很强

Site B
几乎没有外链
```

如果两个页面都链接到你：

```text
A → Your Page
B → Your Page
```

通常 A 的链接更有潜在价值。

因为：

```text
A 自身积累了更多链接权重
```

但真正评价外链不能只看：

```text
PageRank
```

现代搜索系统还会考虑：

- 相关性
- Spam
- 链接位置
- 锚文本
- 上下文
- 链接类型
- 页面质量
- 来源真实性

所以：

> **PageRank 是链接价值的基础逻辑，不是现代外链价值的全部。**

## 内链和 PageRank

PageRank 对站内 SEO 最实用的地方，是理解：

> **内部链接实际上是在分配网站已有的链接权重。**

假设首页积累了很多外链。

那么首页通常拥有较强的内部权重。

如果首页链接：

```text
Collection A
Collection B
Blog C
```

这部分权重会继续往下流动。

所以网站架构可以理解成：

```text
外部权重
→ 首页
→ Collection
→ Product
→ Blog / Support
```

如果一个重要页面：

```text
没有任何内链
```

即使内容很好，也很难获得站内 PageRank 支持。

## 内链深度

链接层级越深，理论上经过的权重衰减越多。

例如：

```text
Home
→ Collection
→ Subcategory
→ Blog
→ Deep Article
```

相比：

```text
Home
→ Deep Article
```

后者路径更短。

但不是说：

```text
所有页面都必须从首页直链
```

真正目标是：

```text
重要页面
应该获得更多、更合理的内部入口
```

常见经验：

| 页面 | 内链支持 |
| --- | --- |
| 核心 Collection | 强 |
| 核心 Product | 强 |
| Pillar Page | 强 |
| 普通 Blog | 中 |
| 极长尾内容 | 较低 |

## 内容集群和 PageRank

内容集群之所以有效，不只是主题相关性。

它还建立：

```text
内部权重循环
```

例如：

```text
Pillar
↔ Cluster A
↔ Cluster B
↔ Cluster C
```

同时：

```text
Cluster A
→ Pillar

Cluster B
→ Pillar

Cluster C
→ Pillar
```

那么 Pillar 会持续获得多个相关页面的内部支持。

可以理解成：

```text
Topic Relevance
+
Internal PageRank
```

同时增强。

这就是为什么核心页面应该成为内容集群中心。

## Collection 为什么重要

在 Shopify 架构里：

```text
Collection
```

往往非常适合承接核心商业词。

原因之一就是它通常位于：

```text
首页
→ Collection
→ Product
```

较高层级。

它天然容易获得：

- 首页链接
- 导航链接
- Blog 内链
- Product 反向链接
- 外部品类链接

所以 Collection 很容易成为：

```text
商业关键词权重中心
```

例如：

```text
/collections/phone-cases/
```

比一个深层 Blog 更适合长期承接：

```text
phone cases
```

这种核心大词。

## Product 页怎么获得权重

Product 通常通过几个来源获得内部权重：

| 来源 | 作用 |
| --- | --- |
| Collection | 核心商业路径 |
| Homepage | 重点产品曝光 |
| Blog | 场景和问题导流 |
| Comparison | 商业决策导流 |
| Related Products | 产品网络 |
| Breadcrumb | 层级关系 |

如果一个 Product：

```text
没有 Collection
没有 Blog
没有导航
没有相关推荐
```

它会成为典型孤岛页。

这会同时影响：

```text
发现
抓取
PageRank
用户路径
```

## Orphan Page

孤岛页是 PageRank 里非常容易理解的问题。

定义：

```text
页面存在
但没有其他站内页面链接它
```

即：

```text
Inlinks = 0
```

即使 Sitemap 里有这个 URL，Google 也可能发现它。

但它几乎得不到内部 PageRank。

所以：

> **Sitemap 能帮助发现，内链才能帮助权重流动。**

这两件事完全不同。

## 链接位置

经典 PageRank 公式不会区分：

```text
正文
Footer
Sidebar
Navigation
```

但现代 Google 显然会使用更复杂的链接理解。

所以 SEO 实操不能只问：

```text
有没有链接
```

还要问：

```text
链接为什么存在
```

一般来说：

| 链接 | 语义价值 |
| --- | --- |
| 正文相关链接 | 高 |
| Breadcrumb | 明确结构 |
| 主导航 | 强层级信号 |
| Footer 大量重复链接 | 相对弱 |
| 隐藏链接 | 风险 |
| 无关站点全局链接 | 风险 |

## 锚文本

PageRank 解决的是：

```text
权重传递
```

锚文本解决的是：

```text
这个权重在表达什么主题
```

例如：

```text
Page A
→ "phone cases"
→ Collection B
```

可以理解成：

```text
权重
+
语义
```

同时传递。

所以高质量内链需要同时满足：

```text
链接来源相关
目标页面合理
锚文本准确
```

这比：

```text
click here
read more
```

更有主题表达能力。

## nofollow

传统 PageRank 讨论里，经常出现：

```text
nofollow
```

历史上，nofollow 被理解成：

```text
不把 PageRank 正常传过去
```

但现代 Google 把：

```text
nofollow
sponsored
ugc
```

更多作为：

```text
Hints
```

处理。

所以不要把它理解成绝对开关。

尤其不要用：

```text
nofollow sculpting
```

去人为控制站内权重。

现代 SEO 更应该通过：

```text
真正的网站架构
```

分配重要性。

## PageRank Sculpting

早期 SEO 常尝试：

```text
把不重要链接 nofollow
```

希望：

```text
剩余链接获得更多 PageRank
```

这种做法叫：

```text
PageRank Sculpting
```

后来 Google 改变了 nofollow 的 PageRank 处理逻辑。

被 nofollow 的那部分权重不会简单重新分配给其他链接。

因此：

> **不要依赖 nofollow 做内部 PageRank 雕刻。**

正确方法是：

```text
减少无意义链接
改善导航
提高重要页面内链
清理重复页面
```

## Redirect 和 PageRank

301 Redirect 通常用于：

```text
旧页面
→ 新页面
```

Google 多年来已明确说明 30x Redirect 不再像早期 SEO 传言那样固定损失某个百分比 PageRank。

实操重点应该是：

```text
重定向目标是否相关
是否存在长链
是否产生 Loop
内链是否同步更新
```

例如：

```text
A → 301 → B
```

是正常。

但：

```text
A → B → C → D
```

就是不必要的重定向链。

最好直接：

```text
A → D
```

并更新所有内链。

## Canonical 和 PageRank

Canonical 不是 Redirect。

它的作用是告诉 Google：

```text
这些重复页面里
哪个应该作为主版本
```

例如：

```text
/product-a
/product-a?color=red
/product-a?utm_source=email
```

都指向：

```text
/product-a
```

Google 可以把多版本信号集中到主 URL。

所以 Canonical 也和：

```text
Signal Consolidation
```

有关。

但 Canonical 是 Hint，不是绝对命令。

## 404 和权重

如果一个页面：

```text
有很多外链
```

但后来直接变成 404：

```text
PageRank 信号可能无法继续有效传递
```

如果存在高度相关的替代页面，可以使用：

```text
301
```

例如：

```text
旧产品
→ 新版本产品
```

但不要：

```text
所有 404
→ 首页
```

因为不相关重定向可能被视为 Soft 404。

## PageRank 和点击量不同

PageRank 不是：

```text
页面访问量
```

一个页面可以：

```text
PageRank 很高
但搜索流量很低
```

例如：

```text
About
Press
Partner Page
```

获得大量外链，但没有什么搜索需求。

反过来：

```text
长尾 Blog
```

可能流量很高，但 PageRank 不一定非常强。

所以：

```text
PageRank
≠
Traffic
≠
Ranking
```

它们是不同概念。

## PageRank 和排名也不同

PageRank 从来都不是 Google 排名的唯一因素。

即使早期 Google，也会考虑：

- Query 相关性
- Anchor Text
- 内容
- 链接
- 页面结构

现代系统更复杂。

所以：

```text
PR 高
```

不代表：

```text
所有关键词都能排第一
```

正确理解：

> **PageRank 是“页面重要性”信号之一，排名还需要“这个页面是否适合当前 Query”。**

## 链接图怎么建模

可以把网站抽象成图。

例如：

```text
Homepage
├─ Collection A
│  ├─ Product A1
│  └─ Product A2
├─ Collection B
│  ├─ Product B1
│  └─ Product B2
└─ Blog Hub
   ├─ Blog 1
   └─ Blog 2
```

SEO 可以进一步分析：

| 指标 | 含义 |
| --- | --- |
| Inlinks | 有多少页面链接当前页 |
| Outlinks | 当前页链出多少页面 |
| Click Depth | 距首页多少层 |
| Internal PR | 内部权重估算 |
| Orphan | 是否无内链 |
| Link Concentration | 权重是否过度集中 |

这也是 Screaming Frog、Sitebulb、图数据库等工具经常做的事情。

## 一个内部权重模型

真实 Google PageRank 无法直接看到。

但可以做内部近似。

例如：

```text
Internal Link Score
=
Σ(
Source Importance
×
Context Relevance
÷
Source Outlinks
)
```

其中：

```text
Source Importance
```

可以用：

- 外链数量
- Organic Traffic
- 首页距离
- 自身内链数量

近似。

```text
Context Relevance
```

可以用：

```text
0.5–1.5
```

简单加权。

这不是 Google 公式。

只是内部排查：

> **哪些重要页面没有得到足够站内支持。**

## PageRank 检测

Google 已经不再公开 Toolbar PageRank。

所以今天无法直接看到：

```text
Google PageRank = 7
```

SEO 只能用代理指标。

| 工具 | 常见指标 |
| --- | --- |
| Ahrefs | URL Rating / Domain Rating |
| Semrush | Authority Score |
| Moz | Page Authority / Domain Authority |
| Majestic | Citation Flow / Trust Flow |
| Screaming Frog | Link Score / 内链数据 |

这些都不是 Google PageRank。

只能用来做：

```text
相对比较
```

## 站内怎么检测

可以重点检查：

### 1. 高价值页面 Inlinks

例如：

```text
核心 Collection
核心 Product
Pillar Page
```

是否有足够相关入口。

### 2. Click Depth

重要页面不要埋得过深。

### 3. Orphan Pages

是否存在：

```text
0 Internal Links
```

### 4. Link Waste

是否大量链接：

```text
过滤页
参数页
无价值标签页
重复页
```

### 5. Redirect Links

内部链接是否仍然指向 301。

### 6. Broken Links

是否大量：

```text
404
```

浪费链接路径。

## 外链怎么检测

外链分析不要只看数量。

可以用：

| 指标 | 目的 |
| --- | --- |
| Referring Domains | 独立来源数量 |
| Referring Pages | 页面数量 |
| Link Type | Follow / nofollow |
| Anchor | 主题 |
| Traffic | 来源是否真实 |
| Relevance | 主题是否相关 |
| Link Placement | 正文 / Footer |
| Target | 权重流向哪个页面 |

如果所有外链都指向：

```text
Homepage
```

但核心 Collection 没有直接外链和内链支持，商业页仍然可能偏弱。

## 常见错误

| 错误 | 问题 |
| --- | --- |
| PageRank = 外链数量 | 忽略来源质量 |
| PageRank = DR | 第三方指标不是 Google PR |
| nofollow 可以雕刻权重 | 过时理解 |
| 内链越多越好 | 权重和语义会被稀释 |
| 所有页面都链首页 | 没有有效架构 |
| Footer 塞几百链接 | 用户和语义价值低 |
| 改 URL 不做 301 | 信号损失 |
| 只靠 Sitemap | 发现不等于权重 |
| PageRank 高就一定排名 | 忽略 Query 和内容 |

## PageRank 的核心 SEO 原则

可以把 PageRank 对 SEO 的价值压缩成六条：

| 原则 | 含义 |
| --- | --- |
| 高质量来源更重要 | 谁链接你比数量更重要 |
| 权重会分配 | Outlinks 越多越分散 |
| 权重会流动 | 内链结构决定站内分配 |
| 核心页要集中支持 | Collection / Pillar / Product |
| 孤岛页很弱 | Sitemap 不能替代内链 |
| 链接同时有语义 | Anchor + Context 很重要 |

最终可以理解成：

```text
外链
给网站带来外部权重

内链
决定权重在站内怎么流动

锚文本
告诉搜索引擎权重在支持什么主题

页面内容
决定这个权重能不能真正转化成排名
```

> **PageRank 最经典的贡献，是把“链接”从普通导航变成了可计算的网页重要性信号。今天 Google 的系统早已远远复杂于最初公式，但 SEO 里的外链质量、内链结构、孤岛页、内容集群、Canonical 和重定向，本质上仍然可以从“链接权重如何在图中流动”这个模型里理解。**
