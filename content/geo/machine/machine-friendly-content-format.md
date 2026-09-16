---
title: "机器友好格式"
description: "机器友好内容格式通过语义 HTML、清晰标题、独立答案块、稳定实体、表格、列表、来源、时间与版本信息，降低搜索引擎和生成式系统理解页面的成本。"
order: 4
updated: "2026-09-16"
---

> 机器友好不是“为 AI 写机器人文案”，而是：**让同一份内容同时对人类清楚、对解析器稳定、对检索系统容易切分。**

## 核心目标

机器处理网页通常需要完成：

```text
Discover
→
Parse
→
Understand
→
Chunk
→
Retrieve
→
Answer
```

页面格式应该减少每一步的歧义。

机器友好的基础不是特殊隐藏文件，而是：

```text
标准 HTML
+
清晰信息架构
+
明确实体关系
```

## 语义 HTML

优先使用真实语义标签。

| 内容 | 推荐 |
| --- | --- |
| 主标题 | `<h1>` |
| 子标题 | `<h2>` / `<h3>` |
| 正文 | `<p>` |
| 列表 | `<ul>` / `<ol>` |
| 表格 | `<table>` |
| 链接 | `<a href>` |
| 图片 | `<img>` |
| 主内容 | `<main>` |
| 文章 | `<article>` |

不要所有内容都用：

```html
<div>
```

再靠 CSS 表示层级。

## 标题层级

推荐：

```text
H1
→ 页面唯一主任务

H2
→ 核心子问题

H3
→ 条件 / 分支 / 子步骤
```

例如：

```text
H1
Can a Mini PC Replace a NAS?

H2
Compute

H2
Storage

H2
Redundancy

H2
When a NAS Is Better
```

这比：

```text
Introduction
Performance
More Information
Conclusion
```

更容易理解。

## 标题要带语义

弱：

```text
Performance
```

强：

```text
How Much CPU Performance Does Plex Need?
```

强标题包含：

```text
Entity
+
Relation
+
Task
```

更容易形成独立 Chunk。

## 首段直接回答

显式 Query 应尽快回答。

例如：

```text
Can 16GB Run a Home Server?
```

首段：

```text
Yes, 16GB is enough for file sharing, Plex and lightweight Docker,
but VMs and local AI can require significantly more memory.
```

然后再解释。

机器不需要从 800 字背景中猜结论。

## 一段一个关系

推荐：

```text
Paragraph A
OLED → black level

Paragraph B
OLED → response time

Paragraph C
OLED → burn-in
```

不要一个段落同时塞：

```text
亮度
刷新率
价格
接口
寿命
```

语义越集中，检索越准确。

## 主体要明确

减少：

```text
it
this
that
they
the former
```

关键段落首次出现时写清：

```text
OLED
Mini-LED
RTX 5090
Product X
```

尤其是段落可能被独立抽取时。

## 表格

表格适合：

- 参数
- 比较
- 阈值
- 兼容性
- 时间线
- 决策矩阵

例如：

| RAM | Use Case |
| ---: | --- |
| 8GB | File server |
| 16GB | Plex + Docker |
| 32GB | VMs / AI |

比连续重复句式更容易解析。

## 列表

列表适合：

```text
Factors
Steps
Requirements
Warnings
```

但列表项应该有完整语义。

弱：

```text
- RAM
- CPU
- Storage
```

强：

```text
- RAM: 16GB is enough for most lightweight container workloads.
- CPU: Hardware transcoding matters for Plex.
- Storage: Drive expansion is often the main Mini PC limitation.
```

## 数字格式

数字必须带：

```text
Metric
+
Unit
+
Context
```

弱：

```text
38
```

强：

```text
38 tok/s under a 4-bit local inference test
```

比较也要带基线：

```text
30% faster than Model B
```

而不是：

```text
30% faster
```

## 时间

时间敏感信息写绝对时间。

推荐：

```text
As of September 2026
```

少用：

```text
currently
recently
today
```

因为机器在未来重新抓取时，这些词会失去时间语境。

## 版本

软件、产品和模型必须明确：

```text
Version
Generation
Firmware
SKU
```

例如：

```text
Ubuntu 26.04
```

比：

```text
Ubuntu
```

更机器友好。

## 来源

重要 Claim 最好明确：

```text
According to...
In our test...
The official specification states...
```

而不是：

```text
Reports say...
```

机器需要知道：

```text
Claim
→
Source
```

关系。

## 链接

使用描述性 Anchor。

推荐：

```text
HDMI 2.1 bandwidth requirements
```

而不是：

```text
click here
read more
this guide
```

同时链接应使用真实：

```html
<a href="...">
```

不要核心导航只依赖 JavaScript onclick。

## 图片

图片必须配合：

```text
Alt
Caption
正文解释
```

关键事实不能只写在图片像素里。

例如图表显示：

```text
38 tok/s
```

正文也应该至少总结：

```text
Model A reached 38 tok/s in the test.
```

## 视频

视频核心信息应同步提供：

- Transcript
- Key Steps
- Key Result
- 时间章节

不要让用户和机器只能完整看完视频才能获得事实。

## JavaScript

关键内容尽量：

```text
SSR
SSG
或稳定可渲染
```

高风险：

```text
HTML 只有空 Shell
→
JS
→
API
→
用户交互
→
才出现正文
```

越多依赖，失败点越多。

## 隐藏内容

不要为了机器在 HTML 中塞：

```text
用户看不到的关键词段落
```

机器友好应该是：

```text
Human-visible
=
Machine-readable
```

而不是两套内容。

## Markdown 版本

对于 Docs 或技术知识库，可以维护高质量 Markdown 源。

好处：

- 层级简单
- 标题明确
- 表格清晰
- 代码块稳定
- 容易用于 Agent / RAG

但 Markdown 版本应和正式页面：

```text
同源维护
```

避免两套内容长期漂移。

## llms.txt

`llms.txt` 可以作为：

```text
Agent-facing Router
```

帮助系统发现重要文档。

但它不是：

```text
机器友好内容的替代品
```

即使有 llms.txt，真正页面仍应保持：

- 清晰 HTML
- 稳定 URL
- 可抓取
- 内容完整

## Structured Data

Schema 负责：

```text
Entity
+
Properties
+
Relations
```

正文负责：

```text
Explanation
+
Evidence
+
Boundary
```

二者互补。

不要期待 Schema 替代正文。

## 页面模板

推荐一个机器友好页面：

```text
H1
↓
Direct Answer
↓
Summary Table
↓
H2 Core Question
↓
Evidence
↓
H2 Condition
↓
Boundary
↓
FAQ / Next Question
```

具体结构仍应根据 Query 类型调整。

## QA 表

| 检查 | 合格 |
| --- | --- |
| H1 唯一 | 是 |
| H2 对应真实子问题 | 是 |
| 首段直接回答 | 是 |
| 段落语义集中 | 是 |
| 主体明确 | 是 |
| 数字有单位 | 是 |
| 时间和版本明确 | 是 |
| 表格使用语义 HTML | 是 |
| 图片事实有文本备份 | 是 |
| 视频有 Transcript | 推荐 |
| 关键内容无需交互才出现 | 是 |
| Schema 与正文一致 | 是 |

## 核心规范

```text
标准 HTML
→
明确标题
→
独立答案块
→
实体清楚
→
数字、时间、版本完整
→
来源可追溯
→
不同模态保持一致
```

> **机器友好内容的终点不是“让 AI 更喜欢”，而是降低任何系统理解页面所需的推断成本。越少歧义、越清晰的实体和关系，越容易被准确检索、引用和组合。**
