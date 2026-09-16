---
title: "301、302 与 URL 重定向规范"
description: "重定向用于把用户和搜索引擎从旧 URL 引导到新 URL。301/308 表示长期迁移，302/307 表示临时切换，关键是目标相关、链路短、站内引用及时更新。"
order: 27
updated: "2026-09-16"
---

> 重定向的核心不是“把旧 URL 跳走”，而是：**明确告诉搜索引擎 URL 是否已经永久迁移，并尽量把历史信号集中到最相关的新页面。**

## 301 和 302

| 状态码 | 含义 | 常见用途 |
| --- | --- | --- |
| 301 | 永久重定向 | URL 永久迁移 |
| 308 | 永久重定向 | 与 301 类似，保留请求方法 |
| 302 | 临时重定向 | 短期替换 |
| 307 | 临时重定向 | 临时且保留请求方法 |

SEO 最常用：

```text
301
```

用于：

- URL 改版
- HTTP → HTTPS
- www / non-www 统一
- 页面合并
- 旧产品迁移
- 目录重构

## 什么时候用 301

例如：

```text
/old-seo-guide
→
/seo-guide
```

如果旧 URL 永久废弃：

```text
301
```

更合适。

## 什么时候用 302

例如：

```text
临时活动页
A/B 测试
短期维护
地区临时跳转
```

且原 URL 后续仍会恢复：

```text
302 / 307
```

更合理。

## 目标必须相关

错误：

```text
所有旧产品
→
Homepage
```

更好：

```text
Old Product
→
New Product Version
```

或：

```text
Old Category
→
Closest Relevant Category
```

如果没有相关替代页面，保留 404 / 410 有时比乱跳首页更合理。

## Redirect Chain

错误：

```text
A → B → C → D
```

问题：

- 多一次请求
- 延迟
- 抓取效率低
- 维护复杂

正确：

```text
A → D
B → D
C → D
```

并把所有站内链接直接更新到：

```text
D
```

## Redirect Loop

典型错误：

```text
A → B
B → A
```

结果：

```text
页面无法访问
```

上线后必须自动检测。

## 内链必须更新

不要长期让：

```text
Internal Link
→ 301
→ Final URL
```

虽然搜索引擎通常能跟随，但站内链接应该直接指向最终 URL。

原因：

| 问题 | 影响 |
| --- | --- |
| 增加请求 | 性能 |
| 抓取链增加 | Crawl |
| 架构不干净 | 维护 |
| Analytics 复杂 | 数据 |

## Sitemap 同步

重定向后：

```text
旧 URL
```

应该从 Sitemap 移除。

Sitemap 只保留最终：

```text
200 + Canonical
```

URL。

## Canonical 同步

目标页的 Canonical 应指向自身。

例如：

```text
A → 301 → B
```

则 B：

```html
<link rel="canonical" href="https://www.xxxx.com/b">
```

不要出现：

```text
A Redirect 到 B
B Canonical 又指回 A
```

这种冲突。

## 大规模迁移

网站改版时建议建立 Redirect Map。

| Old URL | New URL | Type | Status |
| --- | --- | --- | --- |
| /old-a | /new-a | 301 | Done |
| /old-b | /new-b | 301 | Done |
| /old-c | /new-c | 301 | Test |

上线前后检查：

- 1:1 映射
- 301 是否正确
- 无 Chain
- 无 Loop
- 无 404
- Sitemap 更新
- Canonical 更新
- Analytics 更新

## URL 变更原则

不要为了小改动频繁换 URL。

URL 变更有成本：

- 重抓取
- 重索引
- 历史链接重新传递
- 数据分裂
- 外部引用失效风险

所以：

> URL 应尽量长期稳定。

## 301 与 PageRank

现代 Google 对永久重定向的处理比早期 SEO 传言更成熟，不应再简单理解成：

```text
301 固定损失 10% PageRank
```

真正重要的是：

```text
目标相关
链路直接
迁移一致
```

## 302 会不会永远不传信号

不要机械理解：

```text
302 = 不传权重
```

Google 会根据实际情况理解长期存在的临时重定向。

但如果迁移本来就是永久的，就应该正确使用：

```text
301 / 308
```

不要依赖搜索引擎猜。

## 常见场景

| 场景 | 推荐 |
| --- | --- |
| HTTP → HTTPS | 301 |
| URL Slug 永久修改 | 301 |
| 产品永久替代 | 301 |
| 页面合并 | 301 |
| 临时促销页 | 302 |
| 短期维护 | 302 / 307 |
| A/B 实验 | 302 / 307 |
| 无替代内容 | 404 / 410 |

## 怎么检测

| 检查 | 工具 |
| --- | --- |
| 状态码 | Curl / DevTools |
| Chain | Screaming Frog |
| Loop | Crawler |
| Internal Redirects | Site Crawl |
| Sitemap 旧 URL | Sitemap Audit |
| Canonical 冲突 | Crawl |
| 外部链接旧地址 | Backlink Tool |

## 核心规范

```text
永久变化
→ 301 / 308

临时变化
→ 302 / 307

任何 Redirect
→ 目标相关
→ 链路最短
→ 内链和 Sitemap 同步更新
```

> **重定向的质量不取决于状态码本身，而取决于迁移意图是否准确、目标是否相关，以及站点是否把所有内部信号统一到了最终 URL。**
