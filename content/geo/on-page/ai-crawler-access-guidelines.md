---
title: "AI Crawler 访问规范"
description: "AI Crawler 访问规范用于区分搜索索引、生成式检索、用户触发访问和模型训练等不同抓取目的，并通过 robots.txt、noindex、服务器访问控制和日志监控做精细化管理。"
order: 23
updated: "2026-09-16"
---

> AI Crawler 管理的核心不是“全部放行”或“全部封锁”，而是：**先分清每个 Bot 的用途，再决定哪些内容允许被搜索、引用、用户访问或用于模型训练。**

## 先区分用途

AI Bot 并不是同一种行为。

| 用途 | 典型目的 |
| --- | --- |
| Search / Index | 建立搜索索引 |
| Answer Retrieval | 为生成式回答检索网页 |
| User-triggered | 用户要求访问某个网页 |
| Training | 潜在模型训练数据 |
| Agent Interaction | 让 Agent 操作网页 |

所以不能简单：

```text
AI Bot = Training Bot
```

## 当前常见 Bot

截至 2026 年 9 月，常见公开控制包括：

| 平台 | Bot / Token | 主要用途 |
| --- | --- | --- |
| OpenAI | OAI-SearchBot | ChatGPT Search 的发现、摘要与引用 |
| OpenAI | GPTBot | 潜在模型训练数据抓取 |
| Anthropic | Claude-SearchBot | 搜索索引与搜索质量 |
| Anthropic | Claude-User | 用户触发网页访问 |
| Anthropic | ClaudeBot | 模型开发 / 训练相关抓取 |
| Perplexity | PerplexityBot | 搜索索引 |
| Google | Googlebot | Google Search 抓取与索引 |
| Google | Google-Extended | 控制 Google 已抓取内容用于部分 Gemini 训练与 grounding 的产品用途 |

不同平台会调整 Bot 名称和策略，因此应定期核对官方文档。

## 搜索与训练分开

例如 OpenAI：

```text
OAI-SearchBot
≠
GPTBot
```

如果目标是：

```text
允许 ChatGPT Search 发现和引用
但不希望内容被用于潜在模型训练
```

可以采用分别控制的思路。

示例：

```text
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /
```

这表达的是两个不同权限。

## Anthropic

Anthropic 当前公开区分：

| Bot | 用途 |
| --- | --- |
| Claude-SearchBot | 搜索结果优化 |
| Claude-User | 用户发起检索 |
| ClaudeBot | 模型训练相关抓取 |

因此可以按目标分别控制，而不是只写：

```text
User-agent: *
```

## Google-Extended

Google-Extended 是一个 robots.txt 产品控制 token。

它和 Google Search 排名要区分。

Google 当前公开说明：

```text
Google-Extended
不影响网站是否出现在 Google Search
也不是 Search Ranking Signal
```

它主要用于控制某些 Gemini 训练和 grounding 相关使用。

所以：

```text
Googlebot
```

和：

```text
Google-Extended
```

不要混为一谈。

## PerplexityBot

Perplexity 当前公开说明：

```text
PerplexityBot
遵守 robots.txt
```

其主要作用更接近：

```text
Search Indexing
```

而不是 Foundation Model Training。

如果阻止其抓取，可能降低内容被完整索引和用于回答检索的机会。

## robots.txt

基础示例：

```text
User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /
```

robots.txt 位于：

```text
https://www.xxxx.com/robots.txt
```

规则只作用于对应：

```text
Host
+
Protocol
+
Port
```

不同子域要分别管理。

## Allow 与 Disallow

例如只开放 Blog：

```text
User-agent: OAI-SearchBot
Allow: /blog/
Disallow: /
```

但 robots.txt 规则存在具体匹配逻辑，复杂规则上线前应该实际测试。

更简单、安全的策略通常更容易维护。

## robots.txt 不等于 noindex

必须区分：

| 控制 | 作用 |
| --- | --- |
| robots.txt | 是否允许抓取 |
| noindex | 是否允许索引 |
| nosnippet | 是否允许部分摘要展示 |
| CDN / WAF | 是否允许网络访问 |
| Login | 内容是否公开 |

如果一个 Bot 被 robots.txt 阻止，它通常也无法读取页面里的：

```html
<meta name="robots" content="noindex">
```

所以不要把两者混用。

## 搜索可见但不训练

这是 GEO 网站常见目标：

```text
Search Discovery
=
Allow

Training
=
Block
```

可以建立权限矩阵：

| 内容 | Search Bot | User Bot | Training Bot |
| --- | --- | --- | --- |
| Blog | Allow | Allow | 视政策 |
| Docs | Allow | Allow | 视政策 |
| Account | Block | Block | Block |
| Checkout | Block | Block | Block |
| Private Files | Block | Block | Block |

## 不要开放私密内容

AI Crawler 优化不应该突破基本安全边界。

以下内容通常不应公开：

- 用户后台
- Account
- Checkout
- 私有文件
- API Secret
- Internal Search
- Staging
- Admin
- 未发布 Draft

GEO 的前提仍然是：

```text
Public Content
```

## CDN 与 WAF

即使 robots.txt：

```text
Allow
```

Bot 仍可能因为：

```text
403
429
CAPTCHA
Bot Protection
Geo Blocking
```

无法访问。

所以要检查：

| 层 | 状态 |
| --- | --- |
| robots.txt | Allow |
| CDN | Allow |
| WAF | Allow |
| Server | 200 |
| JS / CSS | 可访问 |
| Image Host | 可访问 |

## 服务器日志

最可靠的监控方式之一：

```text
Server Logs
```

建议记录：

| 字段 | 用途 |
| --- | --- |
| User-Agent | Bot 类型 |
| URL | 抓哪些页面 |
| Status | 200 / 403 / 429 |
| Timestamp | 抓取时间 |
| Response Time | 性能 |
| IP | 验证来源时辅助 |

不要只因为 User-Agent 写着某个 Bot 就完全相信身份。

需要时参考平台公布的 IP / 验证方式。

## 不要只看 Bot Hits

Bot 抓过页面：

```text
≠
页面被 AI 引用
```

完整链条更接近：

```text
Accessible
→
Crawled
→
Indexed / Retrieved
→
Relevant
→
Selected
→
Cited
```

Crawler Access 只解决第一层。

## Citation 与 Referral

如果开放 AI Search，应监控：

- ChatGPT Referral
- Perplexity Referral
- Claude Referral
- Landing Page
- Citation Presence
- Mention Rate

不要把：

```text
Bot Requests ↑
```

直接当成 GEO 成功。

## 变更记录

AI Bot 政策变化很快。

建议维护：

| 日期 | Platform | Bot | Policy Change |
| --- | --- | --- | --- |
| 2026-09 | OpenAI | OAI-SearchBot | Current |
| 2026-09 | Anthropic | Claude-SearchBot | Current |
| 2026-09 | Perplexity | PerplexityBot | Current |

每季度复查一次官方文档。

## QA 表

| 检查 | 合格 |
| --- | --- |
| Search / Training 已分开 | 是 |
| robots.txt 可访问 | 是 |
| 关键 Bot 已按策略配置 | 是 |
| CDN / WAF 未误封 | 是 |
| 私有路径已保护 | 是 |
| Noindex 与 robots 未冲突 | 是 |
| Server Logs 可监控 | 推荐 |
| Bot 身份可验证 | 推荐 |
| 政策有更新时间 | 是 |

## 核心规范

```text
先确定内容权限
→
区分 Search / User / Training
→
配置 robots.txt
→
检查 CDN / WAF
→
验证真实抓取
→
监控 Citation 与 Referral
```

> **AI Crawler 访问控制不是“为了 GEO 全放开”，而是给不同用途的机器人不同权限。搜索可见性、用户触发访问和模型训练应该被分别管理。**
