---
title: "收录排查"
description: "系统排查页面为什么没有被 Google 收录，并根据 GSC 状态、抓取、Canonical、内容质量、内链和站点结构选择对应解决方案。"
order: 1
updated: "2026-09-15"
---

> 页面没有被收录，不代表 Google “讨厌”这个页面。先判断到底是 **没发现、没抓取、抓了没收录、被其他页面替代，还是被技术规则主动挡住**，再决定怎么处理。

最有效的方法不是反复点“请求编入索引”，而是先找到 GSC 对这个 URL 给出的真实状态。

## 先看结论：不同未收录状态怎么处理

| GSC / 页面状态 | 常见含义 | 优先处理 |
| --- | --- | --- |
| Discovered - currently not indexed | Google 已发现，但还没抓 | 内链、Sitemap、抓取优先级 |
| Crawled - currently not indexed | 已抓取，但暂时没收录 | 内容质量、重复、搜索价值 |
| Duplicate without user-selected canonical | Google 判断有重复版本 | Canonical、URL 统一 |
| Alternate page with proper canonical | 当前页被正确合并到主版本 | 通常无需处理 |
| Duplicate, Google chose different canonical | Google 不接受你指定的主版本 | 内链、Sitemap、Canonical 信号统一 |
| Excluded by `noindex` | 页面明确要求不收录 | 删除 noindex 或保持现状 |
| Blocked by robots.txt | 爬虫无法正常抓取 | 检查 robots.txt |
| Not found (404) | URL 不存在 | 恢复、301 或保持 404 |
| Soft 404 | 页面可打开，但 Google 认为没有有效内容 | 补内容或返回正确状态码 |
| Redirect error | 重定向链路异常 | 修复 301/302 链 |
| Server error (5xx) | Google 抓取时服务器失败 | 修复服务器 |
| URL unknown to Google | Google 还不知道这个 URL | Sitemap、内链、手动提交 |

## 1. Discovered - currently not indexed

这个状态表示：

```text
Google 知道 URL
↓
但还没有真正抓取
```

常见原因：

| 原因 | 结论 | 怎么解决 |
| --- | --- | --- |
| 页面很新 | 还没轮到抓 | 提交 Sitemap + 内链 |
| 页面层级太深 | 抓取优先级低 | 从高权重页面增加入口 |
| 大量低价值 URL | 抓取资源被浪费 | 清理参数页、重复页 |
| 页面几乎没有内链 | Google 难判断重要性 | 增加正文内链或导航入口 |
| 站点更新频率低 | 抓取频率低 | 保持稳定更新 |

不要只做：

```text
请求编入索引
请求编入索引
请求编入索引
```

如果站内没有任何页面链接它，手动提交只能解决“发现”，不能解决“重要性”。

## 2. Crawled - currently not indexed

这个状态更关键。

它表示：

```text
Google 已经看过页面
↓
但暂时没有选择收录
```

常见原因和解决方法：

| 原因 | 常见表现 | 处理方法 |
| --- | --- | --- |
| 内容太薄 | 只有几百字、信息少 | 增加真正有价值的信息 |
| 与已有页面重复 | 两个页面主题高度相同 | 合并、Canonical、301 |
| 搜索意图不匹配 | Blog 去打商业 Collection 词 | 调整页面类型 |
| 缺乏信息增益 | 内容和 SERP 差不多 | 增加数据、框架、实测 |
| 页面模板化严重 | 大量页面只换几个词 | 降低批量低质页比例 |
| 页面价值太低 | 没有明确用户需求 | 重做主题或删除 |

如果一个页面已经抓取但没收录，继续手动提交通常意义不大。

这时真正要改的是页面本身。

## 3. Duplicate without user-selected canonical

这个状态表示 Google 发现：

```text
当前 URL
≈
另一个 URL
```

但你没有明确告诉它哪个是主版本。

常见情况：

```text
/product-a/
/product-a/?ref=homepage
/product-a/?utm_source=email
```

解决方法：

| 动作 | 是否建议 |
| --- | --- |
| 主页面加 self-canonical | 是 |
| 参数页 canonical 到主页面 | 是 |
| Sitemap 只保留主 URL | 是 |
| 内链统一指向主 URL | 是 |
| 所有版本都提交 Sitemap | 否 |

核心原则：

> **站内所有信号都应该告诉 Google 同一个主版本。**

## 4. Google chose different canonical

这是比普通重复更值得关注的状态。

你可能设置：

```text
A canonical → B
```

但 Google 最后还是选择 A，或者选择另一个 C。

常见原因：

| 信号冲突 | 问题 |
| --- | --- |
| Canonical 指向 B | 你说 B 是主版本 |
| Sitemap 提交 A | Sitemap 又说 A 重要 |
| 内链大量指向 A | 站内结构支持 A |
| 外链主要指向 A | 外部信号也支持 A |

这时不要只改 canonical 标签。

应该同时统一：

```text
Canonical
Sitemap
内链
重定向
导航
```

## 5. 被 noindex 排除

如果页面包含：

```html
<meta name="robots" content="noindex">
```

Google 通常不会收录。

检查场景：

| 页面 | noindex 是否合理 |
| --- | --- |
| 登录页 | 合理 |
| 站内搜索页 | 通常合理 |
| Checkout | 合理 |
| 核心 Collection | 通常不合理 |
| 核心 Product | 通常不合理 |
| Blog | 通常不合理 |

如果误加 noindex：

```text
删除 noindex
↓
确认页面可抓取
↓
重新请求索引
```

## 6. robots.txt 阻止抓取

例如：

```txt
User-agent: *
Disallow: /blog/
```

如果 Blog 是 SEO 流量来源，这个规则就非常危险。

排查时看：

| 检查项 | 结果 |
| --- | --- |
| URL 是否被 Disallow | 是 / 否 |
| CSS / JS 是否被误挡 | 是 / 否 |
| Sitemap 是否正常 | 是 / 否 |
| 页面是否同时有 noindex | 是 / 否 |

注意：

> **robots.txt 管抓取，不等于管理索引。**

如果想明确阻止收录，应该考虑 noindex，而不是只靠 robots.txt。

## 7. Soft 404 和真正的 404

### 真正 404

页面不存在并返回：

```text
404
```

如果这个 URL 本来就应该消失，可以保持 404。

如果这个页面有旧流量或外链，可以：

```text
301 → 最相关的新页面
```

不要全部跳首页。

### Soft 404

页面状态码是：

```text
200
```

但页面内容像：

```text
没有产品
没有正文
页面为空
内容极少
```

Google 会认为它“实际上等于 404”。

解决方式：

| 情况 | 怎么做 |
| --- | --- |
| 页面应该存在 | 补完整内容 |
| 页面不该存在 | 返回 404 / 410 |
| 有替代页 | 301 到最相关页面 |

## 8. 内链不足导致页面长期不收录

一个页面即使出现在 Sitemap，也不代表它有足够重要性。

如果结构是：

```text
首页
↓
Collection
↓
Blog
↓
目标页
```

而目标页几乎没有其他入口，Google 可能认为它不重要。

可以检查：

| 指标 | 风险 |
| --- | --- |
| 0 条站内内链 | 很高 |
| 1 条弱内链 | 较高 |
| 多个相关页面引用 | 更健康 |
| 导航 / Hub 页面入口 | 更强 |

内链的作用是同时解决：

```text
页面发现
+
主题关系
+
重要性判断
```

## 9. Sitemap 不是收录保证

Sitemap 的作用是告诉 Google：

> **这些 URL 是我希望你发现和处理的页面。**

它不能保证：

```text
提交 = 收录
```

Sitemap 最好只放：

```text
200 状态
可索引
Canonical 主版本
真正希望出现在搜索结果里的 URL
```

不要把这些塞进去：

```text
404
重定向页
noindex 页
参数重复页
旧 URL
```

## 10. 老页面更新后要不要重新提交

建议根据更新幅度判断。

| 更新类型 | 是否建议手动请求索引 |
| --- | --- |
| 改了一个错别字 | 不需要 |
| 重写主要 H2 | 可以 |
| 更新大量数据 | 建议 |
| 修改 Title / Description | 可以 |
| 补充大量内链 | 建议 |
| 合并页面 | 建议 |
| 改 Canonical | 建议 |
| 修改 URL / 做 301 | 建议 |
| 大规模产品信息更新 | 视重要性而定 |

手动请求索引最适合：

> **重要页面发生了明显变化，希望 Google 尽快重新抓取。**

## 11. 合并页面后的正确处理

例如：

```text
旧页面 A
旧页面 B
↓
合并成新页面 C
```

应该做：

```text
A → 301 → C
B → 301 → C
```

同时：

| 项目 | 要处理 |
| --- | --- |
| 内链 | 改成 C |
| Sitemap | 只保留 C |
| Canonical | C 指向自己 |
| 旧 URL | 301 到 C |
| GSC | 检查 C 并请求索引 |

不要：

```text
A 保留
B 保留
C 再新建
```

如果三页内容高度重复，会继续制造重复和竞争。

## 12. 补充内链后为什么值得重新抓取

如果一个老页面原本几乎没有入口，后来你从：

```text
首页
Collection
高流量 Blog
相关 Page
```

增加了内链，它在站点里的重要性已经发生变化。

这时候可以：

```text
更新页面
↓
补充相关内链
↓
确认 Sitemap
↓
GSC URL Inspection
↓
Request Indexing
```

因为 Google 重新抓取后才能看到新的链接关系。

## 13. GSC 手动请求收录怎么做

在 Google Search Console 里：

```text
URL Inspection
↓
输入完整 URL
↓
检查当前状态
↓
确认页面可索引
↓
Request Indexing
```

建议先确认：

| 检查项 | 要求 |
| --- | --- |
| HTTP 状态 | 200 |
| robots.txt | 没阻止 |
| noindex | 没有 |
| canonical | 正确 |
| 页面内容 | 正常 |
| 内链 | 至少有相关入口 |
| Sitemap | 已提交 |

如果这些都没问题，再请求索引。

不要把手动提交当成“修复按钮”。

## 14. 什么情况下不应该反复请求索引

以下情况先不要提交：

```text
页面还是重复内容
Canonical 还没修
页面还是 noindex
robots.txt 还在阻止
页面内容还没完成
301 还没配置
```

否则结果通常还是：

```text
重新抓取
↓
继续不收录
```

## 页面未收录的排查顺序

最后可以按这张表处理：

| 顺序 | 检查什么 | 核心问题 |
| ---: | --- | --- |
| 1 | URL 是否可访问 | 是不是 200 |
| 2 | robots.txt | 能不能抓 |
| 3 | noindex | 能不能收录 |
| 4 | Canonical | 主版本是谁 |
| 5 | Sitemap | 是否提交正确版本 |
| 6 | 内链 | Google 是否容易发现 |
| 7 | 内容 | 是否值得独立收录 |
| 8 | 搜索意图 | 页面类型是否匹配 |
| 9 | 重复页面 | 是否需要合并 |
| 10 | GSC | 最后再请求索引 |

> **页面收录问题本质上分成三类：技术上能不能收录、Google 有没有足够理由收录、站点有没有明确告诉 Google 这个页面重要。先判断属于哪一类，再处理，比反复点击“请求编入索引”有效得多。**
