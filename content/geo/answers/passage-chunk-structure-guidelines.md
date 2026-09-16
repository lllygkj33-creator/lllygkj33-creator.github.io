---
title: "Passage 与 Chunk"
description: "Passage 与 Chunk 结构的目标是把长内容拆成语义完整、边界清晰的知识单元，使搜索引擎、RAG 和生成式系统更容易准确检索和组合答案。"
order: 4
updated: "2026-09-16"
---

> Chunk 的核心不是“每 500 字切一段”，而是：**每个知识单元只完成一个明确任务，并在被单独检索时仍然保持完整语义。**

## Passage 和 Chunk

可以简单区分：

| 概念 | 含义 |
| --- | --- |
| Passage | 页面中的自然语义段落 |
| Chunk | 检索系统切分出的处理单元 |

SEO 里更关注：

```text
Passage 是否容易被理解
```

RAG / GEO 更关注：

```text
Chunk 是否容易被检索
```

两者共同目标都是：

```text
语义边界清晰
```

## 不要机械按字数切

错误：

```text
每 500 tokens
强制切一块
```

可能把一个完整逻辑拆成：

```text
Chunk A
只有 Claim

Chunk B
只有 Evidence
```

导致检索后关系断裂。

更合理：

```text
按 H2
H3
概念
任务
关系
```

切分。

## 一个 Chunk 一个任务

例如 H2：

```text
How Much RAM Does Plex Need?
```

这一块应该只解决：

```text
Plex RAM Requirement
```

不要同时塞：

- 网络
- GPU
- 存储
- Docker 安装

否则 Chunk 语义变宽。

## 推荐结构

一个 Chunk 可以包含：

```text
Heading
+
Direct Answer
+
Evidence
+
Condition
+
Boundary
```

例如：

```text
H2: Is 16GB RAM Enough?

16GB RAM is enough for a basic home server running file sharing,
Plex and several lightweight containers. Virtual machines,
local AI and large databases can increase memory demand significantly.
```

被单独检索后仍然完整。

## H2 是天然边界

H2 最适合代表：

```text
一级子任务
```

H3 代表：

```text
H2 下面的条件 / 分支
```

例如：

```text
H2
How Much RAM Does a Home Server Need?

H3
8GB

H3
16GB

H3
32GB+
```

结构天然适合 Chunking。

## Chunk 太大

一个 Chunk 太大时：

```text
多个主题混在一起
```

会产生：

- 检索精度下降
- Embedding 语义平均化
- 引用不精确
- RAG 上下文浪费

典型信号：

```text
一个 H2 下面 1500 字
包含 5 个独立问题
```

应该拆 H3 或新的 H2。

## Chunk 太小

太小也有问题。

例如：

```text
Chunk 1:
16GB is enough.

Chunk 2:
For most basic workloads.

Chunk 3:
But local AI may need more.
```

任何一块单独拿出来都不完整。

这会降低：

```text
Retrieval Quality
```

所以目标是：

```text
最小完整语义单元
```

## Chunk Size

不存在统一最佳 Token 数。

可以内部使用大致参考：

| 内容 | 建议 |
| --- | --- |
| FAQ | 50–150 words |
| Definition | 50–200 |
| Direct Answer | 80–250 |
| Mechanism | 150–400 |
| Complex Comparison | 200–500 |

真正判断标准：

```text
任务是否完整
```

而不是 Token 数。

## Overlap

RAG 系统常使用 Chunk Overlap。

例如：

```text
Chunk A
最后 50 tokens

复制到

Chunk B
前 50 tokens
```

目的是避免边界处信息断裂。

但网页内容设计层面更理想的是：

```text
逻辑本身完整
```

不要依赖技术 Overlap 修复糟糕结构。

## Chunk 标题

每个 Chunk 最好有明确标题。

弱：

```text
Performance
```

强：

```text
How Much CPU Performance Does Plex Need?
```

后者本身包含：

```text
实体
问题
任务
```

对 Embedding 和检索更清楚。

## 代词问题

Chunk 被单独读取时：

```text
it
this
that
the former
```

可能失去实体。

建议关键 Chunk 的第一句重新写明主体。

例如：

```text
OLED can switch each pixel off independently...
```

而不是：

```text
It can switch each pixel off...
```

## 表格 Chunk

表格适合表达：

```text
同结构多实体关系
```

例如：

| RAM | Scenario |
| ---: | --- |
| 8GB | Basic file server |
| 16GB | Plex + Docker |
| 32GB | VMs / AI |

但表格前后最好有一句解释：

```text
For most home-server workloads, memory needs increase mainly with
virtual machines, databases and local AI rather than file sharing itself.
```

这样表格即使被抽取，语义也更完整。

## 列表 Chunk

列表适合：

- Steps
- Requirements
- Warning Signs
- Factors

但列表项不要只有关键词。

弱：

```text
- RAM
- CPU
- Storage
```

更好：

```text
- RAM: 16GB is enough for most lightweight Docker workloads.
- CPU: Hardware transcoding matters more than core count for Plex.
- Storage: Drive expansion is usually the main Mini PC limitation.
```

## Query Fan-Out

Query Fan-Out 决定：

```text
页面需要哪些 Chunk
```

Passage 结构决定：

```text
这些 Chunk 怎么组织
```

例如：

```text
Core Query
Can a Mini PC Replace a NAS?

Chunk 1
Compute

Chunk 2
Storage

Chunk 3
Redundancy

Chunk 4
Power

Chunk 5
Use Cases

Chunk 6
Boundary
```

形成完整阅读路径。

## Passage Ranking

Google 的 Passage Ranking 可以更好理解页面里的具体段落，但排名对象仍然是页面。

因此 SEO 不需要为每个 Passage 创建独立 URL。

应该做的是：

```text
一个 URL
+
多个清晰 Passage
```

而不是：

```text
为了每个长尾 Query
生成大量薄页面
```

## RAG 友好结构

适合 RAG 的页面通常具备：

| 特征 | 作用 |
| --- | --- |
| 明确 H2 | Chunk 边界 |
| 独立首句 | 实体清楚 |
| 少代词 | 降低歧义 |
| 一段一关系 | 检索精确 |
| 数据有单位 | 可解释 |
| 条件完整 | 防止误引 |
| 时间明确 | 避免过期 |

## Chunk QA

可以建立：

```text
Chunk Completeness Score
=
Subject
+
Claim
+
Evidence
+
Condition
+
Boundary
```

每项 0 / 1。

例如：

```text
5 / 5
```

说明块相对完整。

这不是搜索引擎官方指标。

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 固定 500 tokens 切块 | 破坏语义 |
| 一个 H2 写多个任务 | 检索发散 |
| Chunk 过短 | 缺上下文 |
| Chunk 过长 | 语义平均化 |
| 大量代词 | 单独检索后不清楚 |
| Heading 太泛 | 任务不明确 |
| FAQ 全堆一个大段 | 难独立检索 |

## 核心规范

```text
先按用户任务拆 H2
→
每个 H2 形成独立 Passage
→
Passage 内保持 Claim 和条件完整
→
需要时再拆 H3
→
避免机械按字数切分
```

> **最好的 Chunk 不是最短的 Chunk，而是最小的完整知识单元。只要一个块能独立回答一个明确问题，它就同时更适合用户阅读、搜索理解和 RAG 检索。**
