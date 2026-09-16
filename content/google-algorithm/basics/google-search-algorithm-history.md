---
title: "Google 搜索算法发展史"
description: "Google 搜索从 PageRank 的链接分析，逐步发展到质量分类、反垃圾、语义理解、神经网络、多模态与生成式搜索。理解算法历史的价值，是看清 Google 每个阶段试图解决的核心问题。"
order: 40
updated: "2026-09-16"
---

> Google 搜索算法的发展不是“旧算法不断被新算法替代”，而是：**搜索系统不断增加新的理解层，从链接重要性、内容质量、语义与实体，到神经网络、用户任务和生成式检索。**

今天的 Google Search 不是一个单独算法。

更准确的结构是：

```text
多个 Ranking Systems
+
Retrieval Systems
+
Quality Systems
+
Spam Systems
+
AI Models
+
Query-specific Systems
```

共同工作。

## 核心历程

| 时间 | 系统 / 阶段 | 核心变化 | 主要解决的问题 | 当前状态 |
| --- | --- | --- | --- | --- |
| 1998 | PageRank | 用链接图计算网页重要性 | 仅靠关键词无法判断权威 | 已大幅演进，仍属于核心系统 |
| 2000s | 链接与文本相关性持续演进 | 链接、Anchor、页面相关性结合 | 提高网页排序质量 | 持续演进 |
| 2011 | Panda | 强化高质量原创内容 | 内容农场、薄内容、低质页面 | 2015 并入核心排名系统 |
| 2012 | Penguin | 打击垃圾链接 | 买链接、操纵 Anchor、Link Spam | 2016 并入核心系统 |
| 2013 | Hummingbird | 重构整体查询理解能力 | 从词匹配走向语义和意图 | 后续能力持续演进 |
| 2015 | RankBrain | AI 理解词与概念关系 | 陌生 Query、概念匹配 | 当前仍是核心 AI 系统 |
| 2015 | Panda Core Integration | Panda 从专项更新转入核心 | 内容质量持续评估 | 核心系统组成 |
| 2016 | Penguin Core Integration | Penguin 更实时融入核心 | 持续识别 Link Spam | 核心系统组成 |
| 2018 | Neural Matching | 匹配 Query 与页面概念表示 | 词不同但概念相近 | 当前仍使用 |
| 2019 | BERT | 双向上下文语言理解 | 词序、介词、上下文、自然语言 | 当前仍广泛使用 |
| 2020–2021 | Passage Ranking | 理解网页内部具体段落 | 长页面中的局部答案 | 当前排名系统之一 |
| 2021 | MUM | 多任务、跨语言、多模态理解 | 更复杂信息任务 | 非通用排名，用于特定场景 |
| 2022 | Helpful Content System | 强调 People-first 内容 | Search-first、低价值内容 | 2024 并入核心系统 |
| 2022 | Ranking Systems Guide | Google 正式区分 System 与 Update | 减少“每次更新=新算法”误解 | 当前官方框架 |
| 2023–2024 | Core Systems 持续整合 | 多个质量系统进一步融合 | 页面级 + 站点级质量理解 | 持续演进 |
| 2024 | Helpful Content 并入 Core | 不再作为独立系统运行 | 实用内容成为核心质量框架 | 已并入核心 |
| 2025 | AI Overviews / AI Mode 扩展 | 核心搜索 + 生成式回答 | 复杂问题、综合答案 | 生成式搜索阶段 |
| 2026 | Generative Search 深化 | Core Search + Retrieval + RAG | 多步骤、对话式、复杂任务 | 当前发展方向 |

## 第一阶段：链接时代

Google 早期最重要的创新是：

```text
PageRank
```

传统搜索可以看：

```text
页面里有没有关键词
```

Google 加入：

```text
谁在链接这个页面
```

于是：

```text
Link
=
Vote
```

但不是所有 Vote 都一样。

来自重要页面的链接价值更高。

这让搜索第一次大规模利用：

```text
Web Graph
```

判断页面重要性。

## PageRank 的突破

核心思想：

```text
页面重要性
取决于
链接它的页面的重要性
```

形成递归：

```text
A 被 B 链接
B 又被 C 链接
```

这奠定了后来：

- 外链
- Anchor Text
- Internal PageRank
- Topic Cluster
- Link Equity

的基础。

## 第二阶段：质量与 Spam

互联网规模增长后，SEO 开始大量操纵搜索结果。

典型问题：

```text
Keyword Stuffing
Content Farm
Link Farm
Paid Links
Thin Content
```

Google 开始从：

```text
相关性
```

进一步进入：

```text
质量
+
反作弊
```

## Panda

2011 年 Panda 重点解决：

- Thin Content
- Low-quality Content
- Content Farm
- 大量低价值页面

核心变化：

```text
有内容
≠
有价值
```

后来 Panda 不再作为独立更新运行，并在 2015 年成为核心排名系统的一部分。

## Penguin

2012 年 Penguin 重点处理：

```text
Link Spam
```

典型风险：

- 买大量 Follow 外链
- Anchor Text 过度优化
- Link Network
- 人工链接操控

它改变了 SEO 对外链的理解：

```text
链接数量
≠
链接质量
```

2016 年 Penguin 被整合进核心排名系统。

## 第三阶段：语义搜索

2013 年 Hummingbird 是一个重要转折点。

搜索开始更明显从：

```text
Strings
```

走向：

```text
Things
```

也就是：

```text
关键词
→
概念
→
实体
→
意图
```

## Hummingbird

它不是简单：

```text
某一个排名因子
```

而是对整体搜索系统的重要改进。

SEO 的变化：

| 过去 | 后来 |
| --- | --- |
| 单词匹配 | Query 意义 |
| Exact Keyword | Search Intent |
| 单页单词 | Topic |
| 关键词密度 | 语义关系 |

这也是后续 RankBrain、BERT 等 AI 系统出现的基础环境。

## 第四阶段：机器学习

2015 年 RankBrain 标志着 Google Search 更深入使用机器学习。

RankBrain 帮助理解：

```text
词
和
概念
```

之间的关系。

所以即使页面没有用户输入的全部 Exact Words，也可能因为概念相关而被召回和排序。

## RankBrain

典型变化：

```text
Query:
用户使用陌生表达

System:
映射到已有概念

Result:
返回语义相关页面
```

SEO 因此进一步从：

```text
Keyword Density
```

转向：

```text
Concept Coverage
+
Intent Match
```

## 第五阶段：神经语义匹配

2018 年 Neural Matching 进一步加强：

```text
Query
和
Page
```

之间的概念匹配。

它可以理解：

```text
字面不同
但含义接近
```

的内容。

例如：

```text
low power Plex machine
```

和：

```text
energy-efficient home media server
```

可能存在强语义关系。

## Neural Matching

它特别适合从 Retrieval 角度理解：

```text
巨大索引
↓
找到概念相关候选页
↓
后续系统继续排序
```

SEO 从：

```text
关键词有没有出现
```

进一步进入：

```text
页面是否完整表达这个概念
```

## 第六阶段：自然语言理解

2019 年 BERT 是另一个重要里程碑。

核心能力：

```text
Bidirectional Context
```

即同时理解一个词前后的上下文。

例如：

```text
from
to
for
without
with
```

这些小词可能改变整个 Query 意图。

## BERT

BERT 让 Search 更好理解：

```text
自然语言问句
长尾 Query
复杂关系
词序
否定
条件
```

Google 后来表示 BERT 在几乎所有英文 Query 中都发挥重要作用。

这进一步降低了：

```text
机械关键词优化
```

的价值。

## 第七阶段：段落理解

Passage Ranking 让 Google 更好理解：

```text
页面里的具体 Passage
```

例如一个 5,000 字页面可能整体主题不是完全针对某个长尾 Query，但其中一个段落非常准确。

搜索系统可以更好判断：

```text
这个页面中的某一部分
对 Query 很相关
```

需要注意：

> Google 排名的仍然是页面，不是把段落变成独立索引 URL。

## Passage Ranking

SEO 对应变化：

```text
H2
+
独立答案段落
+
高信息密度
+
清晰子问题
```

变得更加重要。

这和：

```text
Query Fan-Out
```

高度相关。

## 第八阶段：多任务理解

2021 年 Google 公开 MUM：

```text
Multitask Unified Model
```

它能够：

- 理解语言
- 生成语言
- 跨语言
- 处理多个任务
- 支持多模态方向

Google 当前仍明确说明：

```text
MUM 不用于 Search 的一般排名
```

而是用于某些特定搜索场景。

## MUM 的意义

MUM 更重要的是代表：

```text
复杂用户任务
```

开始成为 Search 的核心研究方向。

例如：

```text
一个问题
→
多个隐含子问题
→
多个来源
→
多个实体
→
综合答案
```

这和现代 GEO 的 Query Fan-Out 非常接近。

## 第九阶段：Helpful Content

2022 年 Google 推出 Helpful Content System。

目标：

```text
People-first
```

而不是：

```text
Search-engine-first
```

重点关注：

- 内容是否真正帮助用户
- 是否存在第一手经验
- 是否只是为流量生产
- 是否大量覆盖不相关主题
- 用户读完是否得到完整答案

2024 年，这套系统经过演进，被并入核心排名系统。

所以现在不应再把：

```text
HCU
```

理解成一个独立开关。

## 第十阶段：系统化排名

2022 年 Google 发布 Ranking Systems Guide，一个重要变化是明确区分：

```text
Ranking System
```

和：

```text
Ranking Update
```

例如：

```text
Helpful Content System
```

是一套系统。

而：

```text
一次 Core Update
```

是对一个或多个系统的改进。

这帮助 SEO 避免把每次波动都想象成：

```text
Google 新发明一个算法
```

## 当前核心系统

Google 当前公开的知名系统包括：

| 系统 | 主要作用 |
| --- | --- |
| BERT | 上下文与意图 |
| RankBrain | 词与概念关系 |
| Neural Matching | Query / Page 概念匹配 |
| Passage Ranking | 页面内部段落理解 |
| Freshness Systems | 时效性 |
| PageRank / Link Systems | 链接关系 |
| Original Content Systems | 原创内容 |
| Reliable Information Systems | 可靠信息 |
| Reviews System | 高质量评测 |
| Site Diversity | 域名多样性 |
| Spam Detection Systems | 垃圾内容防御 |

它们不是互相替代，而是共同工作。

## 算法演进逻辑

把整个历史压缩，可以看到五次明显升级。

| 阶段 | Search 主要问题 | 代表系统 |
| --- | --- | --- |
| 1 | 谁更重要 | PageRank |
| 2 | 谁在作弊 / 内容是否低质 | Panda、Penguin |
| 3 | Query 到底什么意思 | Hummingbird |
| 4 | 词与概念怎样关联 | RankBrain、Neural Matching |
| 5 | 自然语言和复杂任务 | BERT、Passage、MUM |
| 6 | 内容是否真正有用 | Helpful Content / Core |
| 7 | 如何综合多来源生成答案 | AI Overviews / AI Mode |

这比背每个算法名字更重要。

## SEO 目标如何变化

| 时代 | 主要 SEO 做法 |
| --- | --- |
| 早期 | Keyword + Links |
| Panda / Penguin | Quality + Clean Links |
| Hummingbird | Intent + Topic |
| RankBrain | Concepts |
| Neural Matching | Semantic Coverage |
| BERT | Natural Language |
| Passage | Answer Units |
| HCU | People-first |
| AI Search | Retrieval + Citation + Entity |

可以看到：

```text
SEO 并没有消失
```

而是在不断扩大。

## 从关键词到知识结构

搜索发展的长期趋势：

```text
Keyword
↓
Page
↓
Topic
↓
Entity
↓
Relationship
↓
Task
↓
Answer
```

所以今天只做：

```text
关键词密度
```

已经远远不够。

需要同时考虑：

- Search Intent
- Entity
- Information Gain
- E-E-A-T
- Query Fan-Out
- Passage
- Technical SEO
- Machine Readability

## AI Search 阶段

2025–2026 Google 的 AI Overviews 与 AI Mode 把 Search 再往前推进。

Google 当前官方说明，生成式 AI Search 仍然依赖：

```text
核心 Search Ranking Systems
+
Search Index
+
Retrieval
+
RAG / Grounding
```

因此：

> GEO 不是替代 SEO，而是在 SEO 检索基础上增加“被综合、被引用、被理解”的新层级。

## 历史系统和当前系统

需要区分：

| 类型 | 示例 |
| --- | --- |
| 当前公开系统 | BERT、RankBrain、Freshness |
| 已并入 Core | Panda、Penguin、Helpful Content |
| 历史架构升级 | Hummingbird |
| 特定用途 AI | MUM |
| 生成式 Search Layer | AI Overviews / AI Mode |

不要把所有名字都称为：

```text
当前独立算法
```

## 常见误区

| 误区 | 问题 |
| --- | --- |
| 每次 Update 都是一个新算法 | 错 |
| Panda 现在仍独立运行 | 已并入核心 |
| Penguin 是单独定期更新 | 已并入核心 |
| MUM 控制所有排名 | 官方明确不是 |
| AI Overview 完全替代传统排名 | 仍依赖核心 Search |
| 新算法出现旧算法就消失 | 多系统通常共存 |
| Google 只有一个 Ranking Algorithm | 实际是多个系统组合 |

## 一条时间线

```text
1998
PageRank
↓
2011
Panda
↓
2012
Penguin
↓
2013
Hummingbird
↓
2015
RankBrain
↓
2018
Neural Matching
↓
2019
BERT
↓
2020–2021
Passage Ranking
↓
2021
MUM
↓
2022
Helpful Content
↓
2024
Helpful Content → Core
↓
2025–2026
AI Overviews / AI Mode
```

## 核心结论

Google 搜索的长期演进可以概括成：

```text
先判断重要性
→
再判断质量
→
再理解语义
→
再理解上下文
→
再理解复杂任务
→
再综合多个来源形成答案
```

> **Google 算法发展史真正值得 SEO 学习的不是每个更新的名字，而是搜索系统每一个阶段在解决什么问题。只要理解这条主线，就能理解为什么现代 SEO 必须同时做好链接、内容质量、语义、实体、用户任务、技术可访问性与 GEO。**
