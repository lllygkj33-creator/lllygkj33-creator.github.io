---
title: "Crawl Budget"
description: "Crawl Budget 是搜索引擎愿意并能够在一定时间内抓取网站的资源规模。它主要由抓取能力和抓取需求共同决定，对大型、更新频繁或 URL 爆炸的网站更重要。"
order: 5
updated: "2026-09-16"
---

> Crawl Budget 的核心不是“Google 每天固定给你 N 次抓取”，而是：**搜索引擎会在服务器承受能力、页面价值、更新速度和 URL 数量之间动态分配抓取资源。**

## 抓取预算是什么

可以拆成两个概念：

| 维度 | 含义 |
| --- | --- |
| Crawl Capacity Limit | Googlebot 能抓多少而不压垮服务器 |
| Crawl Demand | Google 认为哪些 URL 值得更频繁抓取 |

所以：

```text
Crawl Budget
≈
抓取能力
×
抓取需求
```

它不是 Google 提供的固定公开额度。

## 谁最需要关注

| 网站类型 | 重要度 |
| --- | ---: |
| 小型企业站 500 页 | 低 |
| 普通博客 2,000 页 | 低 |
| 电商 50,000+ URL | 高 |
| 新闻站 | 高 |
| Programmatic SEO | 高 |
| 大型论坛 | 高 |
| Faceted Navigation | 极高 |
| 大型国际站 | 高 |

小站如果正常抓取和索引，不应该把 Crawl Budget 当主要问题。

## 什么消耗抓取

常见浪费：

| URL 类型 | 风险 |
| --- | --- |
| 参数页 | 高 |
| Filter / Facet | 高 |
| Session ID | 高 |
| 内部搜索页 | 高 |
| 日历无限翻页 | 高 |
| 重复 Tag | 中高 |
| Redirect Chain | 中 |
| 404 大量产生 | 中 |
| JS 无限 URL | 高 |

典型情况：

```text
/product
/product?color=red
/product?color=blue
/product?sort=price
/product?page=2
```

可能生成大量低价值组合。

## Crawl Demand

更值得抓的页面通常具备：

- 热门
- 经常更新
- 链接多
- 首页距离近
- 用户需求强
- 历史抓取价值高

如果一个页面：

```text
长期不更新
无内链
无流量
无外链
低价值
```

抓取频率通常会更低。

## 服务器性能

如果服务器响应慢或频繁：

```text
5xx
Timeout
```

搜索引擎可能降低抓取速率。

所以 Crawl Budget 也和：

- TTFB
- Server Capacity
- CDN
- 错误率
- 稳定性

有关。

## 抓取与索引不同

必须区分：

```text
Crawled
≠
Indexed
```

Google 可以抓取一个页面但不索引它。

如果大量 URL：

```text
Crawled - currently not indexed
```

重点通常是：

```text
页面价值
重复
质量
```

而不是单纯增加抓取频率。

## 优化方法

### 清理参数 URL

避免无意义组合产生数百万 URL。

### 统一 Canonical

重复版本统一到主 URL。

### 修复内部链接

不要让内链继续指向：

- 301
- 404
- 参数页
- 非 Canonical URL

### 控制 Facet

只有具备真实搜索价值的筛选组合才考虑索引。

### 清理 Sitemap

Sitemap 只保留：

```text
200
Canonical
Indexable
```

### 减少 Redirect Chain

错误：

```text
A → B → C → D
```

正确：

```text
A → D
```

## robots.txt 的作用

robots.txt 可以阻止抓取某些路径。

例如：

```text
/search/
```

但不要用 robots.txt 替代 Noindex。

因为：

```text
robots.txt
阻止抓取

noindex
控制索引
```

如果页面已经被索引，再用 robots.txt 完全阻止抓取，Google 可能无法读取页面上的 noindex。

## Log 分析

大型站最好使用服务器日志观察：

| 指标 | 看什么 |
| --- | --- |
| Googlebot Hits | 抓取量 |
| Status Code | 200 / 3xx / 4xx / 5xx |
| Crawl Frequency | 哪类页被频繁抓 |
| Wasted Crawl | 参数 / 重复页 |
| Response Time | 服务器性能 |
| Important URL Hits | 核心页是否被抓 |

日志比单纯猜 Crawl Budget 更直接。

## Search Console

GSC Crawl Stats 可观察：

- Total crawl requests
- Total download size
- Average response time
- Response codes
- File types
- Crawl purpose
- Googlebot type

如果抓取量突然下降，要同时检查：

```text
服务器
robots
5xx
站点更新
URL 数量
```

## 抓取优先级

内部可以建立：

```text
Crawl Priority
=
Business Value
+
Search Demand
+
Freshness
+
Internal Importance
```

然后让高优先级 URL：

- 距首页更近
- 获得更多内链
- 进入 Sitemap
- 保持低错误率

这不是 Google 公式，只是站内治理模型。

## 常见误区

| 误区 | 问题 |
| --- | --- |
| 小站也要天天优化 Crawl Budget | 通常没必要 |
| Sitemap 越大越好 | 低价值 URL 会制造噪声 |
| robots 可以解决索引 | 抓取和索引不同 |
| 抓得多就排名高 | 没有直接关系 |
| 404 一定浪费大量预算 | 要看规模 |
| Noindex 页完全不用抓 | Google 仍需抓取才能读取 noindex |

## 核心规范

```text
减少低价值 URL
→ 提高重要页可发现性
→ 保证服务器稳定
→ Sitemap 干净
→ 内链直达主 URL
→ 用日志和 GSC 验证
```

> **Crawl Budget 优化的本质，是减少搜索引擎在低价值 URL 上浪费资源，让重要、最新、可索引的页面更容易被持续抓取。**
