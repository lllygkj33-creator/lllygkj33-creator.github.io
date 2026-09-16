---
title: "Agentic 页面"
description: "Agentic 页面是一种面向 AI 检索与智能体任务的公开机器可读页面架构。它强调语义清晰、事实一致、证据可追溯和动作可执行；所谓影子页面只是其中一种实现方式，不应演变成隐藏内容、门页或 Cloaking。"
order: 5
updated: "2026-09-16"
---

> Agentic 页面的核心不是“给 AI 再做一套网站”，而是：**让同一份公开事实以更低歧义、更低解析成本的形式，被 AI 检索、理解、引用，并在需要时继续执行下一步动作。**

## 定义

Agentic 页面可以理解为：

```text
Human-facing Page
+
Machine-readable Context
+
Evidence
+
Action Interface
```

它不是一个 Google 官方页面类型，也不是已统一标准化的 GEO 名词。更适合作为一种架构思想：

> **把 AI Agent 视为真实的信息使用者，而不是要求它模拟人类浏览器，从复杂视觉页面里猜产品、实体、政策和操作关系。**

这里需要区分两个概念：

| 概念 | 建议定义 |
| --- | --- |
| Agentic 页面 | 面向 AI 检索、理解、比较、引用和动作的页面或语义层 |
| 影子页面 | Agentic 页面的一种实现：在原页面旁提供一个公开、精简、机器友好的 Companion Page |

因此：

```text
Agentic Page
=
目标

Shadow / Companion Page
=
可能的实现方式
```

不要把二者当成完全相同的概念。

## 为什么出现

现代网页经常优先服务视觉体验：

```text
Hero
Carousel
Tabs
JavaScript
Personalization
Apps
Tracking
Interactive Components
```

人类浏览没有问题，但 AI Agent 可能需要先完成：

```text
加载
→
渲染
→
理解 DOM
→
排除模板噪声
→
寻找事实
→
确认版本
→
判断哪些 Claim 可信
```

真正需要的信息可能只有：

```text
产品是什么
适合谁
有哪些规格
有什么限制
证据在哪里
价格和库存是什么
能不能执行下一步
```

Agentic 页面的目的就是缩短：

```text
Page
→
Meaning
```

之间的距离。

## 先优化原页面

建立 Agentic 页面之前，第一原则不是复制页面。

优先顺序应是：

```text
原页面可抓取
→
语义 HTML
→
核心正文完整
→
实体明确
→
Structured Data
→
证据和版本清晰
→
再判断是否需要 Companion Page
```

如果原页面已经具备：

- SSR / SSG
- 清晰 HTML
- 完整正文
- Product / Article Schema
- 稳定 URL
- 明确实体
- 可读表格
- 当前事实

通常没有必要为了“GEO”机械生成另一套页面。

## 什么时候需要

影子 / Companion Page 更适合下面这些情况：

| 场景 | 是否值得考虑 |
| --- | --- |
| 主站极度依赖客户端 JS | 高 |
| 产品事实被大量交互组件拆散 | 高 |
| 价格、变体、政策难统一读取 | 高 |
| 页面视觉内容多、有效文本少 | 中高 |
| 大量 PDF / 图片承载关键事实 | 中高 |
| 页面本身已是干净 Docs | 低 |
| 只是想多建一个 URL 抢排名 | 不应该 |

核心判断：

```text
它解决的是机器理解问题
还是只是制造另一个搜索页面？
```

如果是后者，就不是 Agentic 架构。

## 影子页面

本文使用“影子页面”作为内部描述：

> **与主页面对应的公开语义镜像，它不替代主页面，而是把同一组事实重新组织成更适合机器读取的形式。**

例如：

```text
/products/server-x/
```

是正常产品页。

可选 Companion：

```text
/agent/server-x/
```

内容不再强调：

- Hero Banner
- 动画
- 营销模块
- 复杂 Tabs

而是强调：

```text
Entity
Specifications
Use Cases
Constraints
Evidence
Policies
Availability
Actions
```

但是：

> **影子页面绝不能理解成“用户看不到、只有 AI Bot 能看到的隐藏页”。**

## 不要 Cloaking

Google 将：

```text
对搜索引擎显示一套内容
对普通用户显示另一套内容
```

并以操纵搜索表现为目的的做法定义为 Cloaking 风险。

因此不要做：

```text
if User-Agent == AI Bot:
    return hidden optimized page
else:
    return normal page
```

更安全的基本原则：

```text
Public URL
+
Human Accessible
+
Bot Accessible
+
Same Core Facts
```

任何用户直接打开 Companion Page，也应该看到相同公开事实。

## 不要做门页

如果批量生成：

```text
/product-x-ai
/product-x-chatgpt
/product-x-perplexity
/product-x-gemini
```

内容几乎相同，只是为了覆盖不同平台或 Query，就会接近：

```text
Doorway
+
Scaled Duplicate Content
```

更合理：

```text
一个实体
→
一个清晰机器可读表示
```

而不是：

```text
一个平台
→
一张重复页面
```

## 内容一致

Agentic 页面最重要的规则是：

```text
Commercial Truth Parity
```

也就是主页面和机器页面必须共享同一事实源。

例如：

| Fact | Human Page | Agentic Page |
| --- | --- | --- |
| Product Name | Server X | Server X |
| RAM | 32GB | 32GB |
| Price | $699 | $699 |
| Availability | In Stock | In Stock |
| Warranty | 2 Years | 2 Years |
| Region | US | US |

不允许：

```text
Human Page:
Up to 10GbE

Agentic Page:
Guaranteed 10GbE performance
```

Agentic 页面不能偷偷把营销 Claim 写得更强。

## 单一事实源

最好采用：

```text
Product Database / CMS
          ↓
    Shared Fact Layer
       ↙       ↘
Human Page   Agentic Page
```

不要：

```text
Human Page
人工维护一份

Agentic Page
再人工维护一份
```

否则时间一长一定出现：

```text
价格冲突
版本冲突
库存冲突
产品名冲突
政策冲突
```

## 页面结构

推荐固定结构：

| 模块 | 内容 |
| --- | --- |
| Summary | 一句话说明实体是什么 |
| Entity | 品牌、类型、型号、版本 |
| Key Facts | 规格、价格、状态 |
| Best For | 适用场景 |
| Not For | 不适合场景 |
| Comparison | 与关键替代方案的关系 |
| Evidence | 测试、标准、来源 |
| Policies | Shipping、Warranty、Returns |
| Freshness | 更新时间、数据版本 |
| Actions | 查看、购买、配置、API / Tool |

页面不是越短越好，而是：

```text
Signal Density 高
+
Ambiguity 低
```

## Direct Answer

页面开头应该直接给机器和用户一个完整定义。

例如：

```text
Server X is a compact x86 home server with 32GB RAM,
dual 10GbE networking and two NVMe slots.
It is designed for self-hosting, media servers and lightweight local AI.
```

不要先写：

```text
Welcome to the next generation of computing.
```

第一种可以直接回答：

```text
它是什么？
有什么？
适合什么？
```

## Entity Block

建议至少表达：

| 字段 | 示例 |
| --- | --- |
| Name | Server X |
| Type | Home Server |
| Brand | Brand A |
| Model | X100 |
| Version | 2026 |
| Category | Mini Server |
| Status | Available |
| Updated | 2026-09-16 |

核心目的是降低：

```text
Entity Ambiguity
```

## Facts

事实应优先使用：

```text
短字段
+
明确单位
+
明确条件
```

例如：

| Fact | Value |
| --- | --- |
| Memory | 32GB DDR5 |
| Network | 2 × 10GbE |
| NVMe | 2 slots |
| Power | 65W adapter |
| OS | Linux / supported systems |

不要写成模糊营销句：

```text
Blazing-fast networking.
```

## 场景

Agent 进行推荐时不仅需要规格，还需要：

```text
规格
→
用户任务
```

所以必须回答：

| 问题 | 示例 |
| --- | --- |
| Best for | Plex、Docker、Home Assistant |
| Works when | 需要低功耗 24/7 服务 |
| Avoid when | 需要 8 个 SATA 盘位 |
| Upgrade when | VM / Local AI 内存需求上升 |

这一步比单纯 Schema 更重要。

## Comparison

不要建立几十个 SEO 式：

```text
X vs A
X vs B
X vs C
```

Companion Page 内可以直接给条件关系：

| Scenario | Better Fit |
| --- | --- |
| More drive bays | NAS |
| More compute flexibility | Mini Server |
| Local AI | Higher-memory system |
| Simple file storage | Entry NAS |

它帮助 Agent 做：

```text
Decision
```

而不只是读取 Product Facts。

## Evidence

强 Claim 应能够继续追溯。

例如：

```text
Supports four 1080p transcodes
```

应提供：

```text
Test Setup
Hardware
Software Version
Date
Result
Boundary
```

推荐模式：

```text
Claim
→
Evidence
→
Source
→
Boundary
```

Agentic Page 不应该成为：

```text
无来源的品牌自述集合
```

## 多模态转译

如果关键信息只存在：

- 图片
- 图表
- PDF
- 视频
- Screenshot

Agentic Layer 可以提供对应文本表示。

例如：

```text
Benchmark Chart
```

同时写：

```text
Model A reached 38 tok/s and Model B reached 24 tok/s
under the same 4-bit test configuration.
```

注意：

```text
转译
≠
编造图片中不存在的事实
```

## Structured Data

Agentic 页面仍应该使用真实语义 HTML，并可配合：

- Product
- Organization
- Person
- Article
- FAQPage（符合实际内容时）
- BreadcrumbList
- Offer

Structured Data 的角色：

```text
Entity / Property / Relation
```

正文的角色：

```text
Meaning / Evidence / Boundary
```

两者不能互相替代。

## Canonical

影子页面最容易出问题的地方之一就是 Canonical。

### 高度重复

如果 Companion Page 只是同一内容的机器重排：

```text
Human Page
≈
Agentic Page
```

通常应考虑：

```text
Agentic Page
→ rel=canonical
→ Human Page
```

这样可以明确：

```text
SEO 主页面仍是 Human Page
```

但要理解：

> Google 可能把 Companion Page 视为重复 URL 并主要索引 Canonical 页面，因此不能把它同时当成“另一个独立 SEO 排名页”。

### 有独立价值

如果所谓 Agentic Page 实际拥有：

- 明显不同任务
- 独立用户价值
- 大量独立内容
- 不只是原页改写

它才可能值得：

```text
Self Canonical
```

但这时它已经更接近：

```text
新的独立页面
```

而不是影子页。

## 发现

Agentic Page 仍然需要被发现。

可以使用：

- 正常 HTML Link
- Sitemap
- robots.txt 允许抓取
- llms.txt / agents.md 等机器导航文件
- 站点 Docs / API Catalog

但需要区分：

```text
Discovery Convention
```

和：

```text
Ranking Standard
```

例如 `llms.txt`、`agents.md` 等实践可以帮助导航，但不应宣传为所有 AI 平台都统一支持的官方排名协议。

## Crawler

如果希望 AI Search 获取页面，还要保证对应抓取器没有被：

- robots.txt
- WAF
- CAPTCHA
- JS Challenge
- Login
- Rate Limit

误封。

例如公开 Web 内容想进入 ChatGPT Search，应确保相关页面允许 OAI-SearchBot 访问。

Crawler Access 只是：

```text
可访问
```

并不等于：

```text
一定被引用
```

完整路径仍然是：

```text
Accessible
→
Retrieved
→
Relevant
→
Trusted
→
Selected
→
Cited
```

## Action Layer

真正的 “Agentic” 不应只停在：

```text
AI 能读
```

更高一级是：

```text
AI 能继续完成任务
```

例如产品页面可以暴露：

| Action | 示例 |
| --- | --- |
| View | 查看 Canonical Product |
| Compare | 获取 Variant / Spec |
| Configure | 选择配置 |
| Check | 查询库存 |
| Quote | 获取价格 |
| Buy | 进入安全 Checkout |
| Support | 打开 Docs / Support |

如果有正式 API、Tool、Commerce Protocol，可以进一步连接。

不要为了“Agentic”伪造：

```text
不存在的 API
不存在的 Action
```

## 成熟度

可以用内部四级模型：

| Level | 状态 |
| --- | --- |
| L0 | Human-only |
| L1 | Machine-readable |
| L2 | Agent-ready |
| L3 | Action-ready |

### L0 Human-only

```text
Visual Page
+
大量 JS
+
事实分散
```

### L1 Machine-readable

```text
Semantic HTML
+
Structured Data
+
明确 Facts
```

### L2 Agent-ready

进一步具备：

```text
Entity
+
Use Cases
+
Comparison
+
Evidence
+
Policies
+
Version
```

### L3 Action-ready

进一步提供：

```text
Tool / API / Protocol / Transaction
```

这套等级是内部架构模型，不是行业官方标准。

## 实操模板

一个简单 Agentic Product Page 可以使用：

```md
# Server X

> Compact x86 home server for Plex, Docker and lightweight local AI.

## Facts

| Field | Value |
| --- | --- |
| Brand | Brand A |
| RAM | 32GB DDR5 |
| Network | 2 × 10GbE |
| Storage | 2 × NVMe |
| Status | Available |
| Updated | 2026-09-16 |

## Best For

- Plex and Jellyfin
- Docker workloads
- Home automation
- Lightweight local AI

## Limits

- Not designed for eight-drive storage arrays
- Local AI capacity depends on model size and quantization

## Evidence

| Claim | Evidence | Date |
| --- | --- | --- |
| Four 1080p transcodes | Internal test | 2026-09 |

## Policies

| Policy | Value |
| --- | --- |
| Warranty | 2 years |
| Returns | 30 days |

## Actions

- View product
- View documentation
- Check compatibility
```

这已经比另建一个：

```text
AI SEO Landing Page
```

更符合 Agentic 思路。

## 不建议

| 做法 | 原因 |
| --- | --- |
| 只对 AI Bot 返回页面 | Cloaking 风险 |
| AI 页面写更强 Claim | Facts 不一致 |
| 每个平台一张影子页 | Doorway / Duplicate 风险 |
| 批量生成薄页 | Scaled Content 风险 |
| 完全复制原页 | 增量价值低 |
| 只放 Schema 没正文 | 语义上下文不足 |
| 只做 llms.txt | 不能替代页面 |
| 影子页抢原页排名 | 架构目标错误 |
| 自动同步但没有版本校验 | 容易产生错误事实 |

## 评估模型

内部可以定义：

```text
Agent Readiness
=
Readability 20%
+
Entity Clarity 15%
+
Fact Completeness 20%
+
Evidence 15%
+
Freshness 10%
+
Policy Clarity 10%
+
Actionability 10%
```

不是搜索引擎或 AI 平台官方指标。

建议检查：

| 维度 | 问题 |
| --- | --- |
| Readability | 不运行复杂 JS 能理解吗 |
| Entity | 能唯一识别对象吗 |
| Facts | 重要属性完整吗 |
| Evidence | Claim 可追溯吗 |
| Freshness | 时间和版本明确吗 |
| Policies | 商业约束明确吗 |
| Action | 下一步操作清楚吗 |

## 是否需要影子页

最后可以用决策树：

```text
原页面是否机器可读？
│
├─ Yes
│   └─ 直接优化原页面
│
└─ No
    │
    ├─ 能通过 SSR / Semantic HTML 修复？
    │   ├─ Yes → 修原页面
    │   └─ No
    │       └─ 考虑 Public Companion Page
    │
    └─ Companion 是否与原页面保持同一事实源？
        ├─ No → 不发布
        └─ Yes → 配置 Discovery / Canonical / Monitoring
```

## 核心规范

```text
优先修原页面
→
必要时才增加 Companion Layer
→
所有人都能访问
→
同一事实源
→
高语义密度
→
证据可追溯
→
正确 Canonical
→
允许目标 Crawler
→
最后再增加 Action Layer
```

> **Agentic 页面真正值得 GEO 补充，因为它把“机器友好内容”推进到了页面架构层；但“影子页面”不应成为隐藏 SEO 页面。最安全、最长期的方向，是公开、事实一致、可验证的 AI-readable Companion Layer，并且只在原页面确实难以满足机器读取需求时使用。**

## 参考边界

本文借鉴了 2026 年公开讨论中的 Agentic Page / semantic mirror 思路，但不把任何厂商实现视为行业标准。关键原则仍以公开 Web、搜索引擎 Spam Policies、Canonical 机制和各 AI 平台公开 Crawler 规则为边界。

外部参考：

- DeepLumen — Agentic Page / Agent Instructions
- Google Search Central — Spam Policies
- Google Search Central — Canonicalization
- OpenAI — Publishers and Developers FAQ
