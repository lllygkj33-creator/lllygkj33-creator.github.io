---
title: "MUM"
description: "MUM 是 Google 用于理解复杂任务、跨语言信息和多模态内容的 AI 系统。它不是通用排名算法，也不存在单独的 MUM SEO 开关，但它揭示了搜索从关键词匹配走向任务、实体、关系和多来源理解的方向。"
order: 5
updated: "2026-09-15"
---

> MUM 最值得 SEO 理解的地方，不是“怎么针对 MUM 做排名”，而是：**Google 越来越能够把一个复杂查询拆成多个子问题，理解不同实体之间的关系，并从不同语言、不同页面和不同内容形式中组合答案。**

MUM 全称：

```text
Multitask Unified Model
```

Google 在 2021 年公开介绍 MUM。它基于 T5 text-to-text 架构，能够同时理解和生成语言，并接受跨任务训练。Google 当时表示 MUM 在 75 种语言上训练，并具备多模态能力，可以理解文本和图像。

但需要先明确一个非常重要的边界：

> **MUM 不是一个当前用于 Google 全部自然搜索结果排序的通用 Ranking System。**

Google 当前的 Search Ranking Systems 文档明确说明，MUM 并未用于 Search 的一般排名，而是应用在一些特定场景，例如疫苗信息理解和 Featured Snippet callout 的质量改进。

所以不存在：

```text
MUM Score
MUM Penalty
MUM Update Recovery
```

这类可直接优化的官方指标。

## MUM 解决什么

传统搜索更接近：

```text
Query
→ 找匹配页面
```

复杂搜索则可能需要：

```text
一个问题
→ 多个子问题
→ 多种信息源
→ 多个实体
→ 多个条件
→ 最终回答
```

Google 介绍 MUM 时使用过一个典型场景：

```text
我爬过 Mount Adams，
明年秋天想爬 Mount Fuji，
我需要做哪些不同准备？
```

这个问题实际上同时包含：

- 两座山的高度
- 秋季天气
- 路线难度
- 训练要求
- 装备
- 当地条件

用户没有逐个输入这些 Query。

系统需要先理解：

> **为了完成这个任务，还需要查什么。**

这就是 MUM 对 SEO 最值得理解的部分。

## 从词到任务

MUM 背后的重要变化可以简单理解为：

| 旧式理解 | 更深层理解 |
| --- | --- |
| 用户输入了什么词 | 用户想完成什么任务 |
| 页面有没有关键词 | 页面提供了哪些事实和关系 |
| 一个 Query | Query Fan-Out |
| 一个页面 | 多来源信息组合 |
| 同一种语言 | 跨语言知识 |
| 纯文本 | 多模态信息 |

例如：

```text
Can a mini PC replace a NAS for Plex?
```

如果只按关键词理解：

```text
mini PC
NAS
Plex
```

信息是不够的。

真正需要判断：

| 子问题 | 为什么需要 |
| --- | --- |
| Plex 需要什么算力 | 判断计算需求 |
| NAS 的主要角色是什么 | 定义被替代对象 |
| Mini PC 存储扩展如何 | 判断容量限制 |
| 硬件转码要求 | 判断媒体场景 |
| 7×24 功耗 | 判断长期使用 |
| 磁盘冗余怎么做 | 判断数据安全 |
| 哪些场景不能替代 | 建立边界 |

MUM 的方向更接近理解这个完整任务，而不是只找出现三个词最多的页面。

## Query Fan-Out

MUM 和 Query Fan-Out 的逻辑非常接近。

复杂查询往往可以展开成：

```text
Core Query
+
Supporting Queries
+
Conditional Queries
+
Verification Queries
```

例如：

```text
Is 240Hz worth it?
```

可能展开成：

| 子查询 | 任务 |
| --- | --- |
| 144Hz vs 240Hz frame time | 数值差异 |
| can humans notice 240Hz | 感知 |
| does FPS need to match refresh rate | 前置条件 |
| GPU requirements for 240Hz | 硬件 |
| 240Hz for competitive gaming | 场景 |
| 240Hz for office work | 场景反例 |
| 240Hz price premium | 决策 |

一篇高质量页面不一定需要把所有问题都写进去。

但它应该覆盖：

> **直接影响主结论的必要子问题。**

否则用户还需要回到搜索结果继续查询。

## 实体关系

MUM 对复杂信息的理解，也不能只靠词频。

真正重要的是实体关系。

例如：

```text
240Hz
→ refresh interval
→ visual update frequency
→ perceived responsiveness
```

或者：

```text
OLED
→ self-emissive pixels
→ pixel-level light control
→ black level
→ perceived contrast
```

如果文章只是反复出现：

```text
240Hz
gaming
fast
smooth
```

机器能得到的关系非常有限。

更强的表达应该明确：

| Subject | Relation | Object |
| --- | --- | --- |
| 240Hz | reduces | refresh interval |
| Lower interval | can reduce | display-side wait |
| High FPS | increases | 240Hz usefulness |
| Low FPS | limits | refresh-rate benefit |

这也是为什么实体关系图谱对 GEO 很重要。

## 跨语言理解

MUM 的一个重要设计能力是：

```text
Cross-language knowledge transfer
```

意思不是：

> 英文页面一定能排所有国家。

而是系统可以从不同语言的信息里理解同一个主题。

例如用户用英文搜索：

```text
Mount Fuji autumn hiking conditions
```

有价值的信息可能只存在于日文来源。

系统可以理解这些信息之间的关系，而不完全受查询语言限制。

对国际 SEO 来说，这带来两个重要原则。

### 事实要一致

不同语言版本不能出现：

```text
英文：产品支持 240Hz
德文：产品最高 165Hz
日文：没有说明
```

这种冲突会降低实体事实的一致性。

### 本地化不是机械翻译

不同语言用户可能有不同问题。

例如：

```text
US
→ price / availability

Germany
→ warranty / EU compatibility

Japan
→ local ports / local product variants
```

所以多语言页面可以共享核心实体事实，但允许不同的 Query Fan-Out。

## 多模态理解

MUM 被设计为多模态系统。

Google 最初强调的是：

```text
Text
+
Image
```

并提到未来可扩展到更多形式。

SEO 不应该把这个理解成：

```text
加更多图片 = MUM 优化
```

真正重要的是：

> **不同模态表达的事实是否一致，并且是否共同支持同一实体关系。**

例如产品页写：

```text
2 × HDMI 2.1
```

但产品规格图只画出：

```text
1 × HDMI
```

这会制造信息冲突。

更合理：

| 模态 | 表达 |
| --- | --- |
| 正文 | 2 × HDMI 2.1 |
| 规格表 | 2 × HDMI 2.1 |
| 产品图 | 清楚展示两个接口 |
| Alt | 描述对应接口区域 |
| Schema | 保持同一产品信息 |

多模态不是内容数量问题。

是：

```text
跨模态语义一致
```

## 共识理解

Google 后来披露，MUM 被用于帮助 Featured Snippet 系统理解：

```text
Consensus
```

也就是多个高质量来源是否对某个事实达成一致。

例如：

```text
光从太阳到地球大约需要多长时间
```

系统可以检查不同高质量来源，即使它们使用不同表达方式，也能判断核心事实是否一致。

这对 SEO 有一个非常重要的启发：

> **重大事实不要故意写成和可靠来源相反，只为了制造“信息增益”。**

信息增益不是：

```text
别人都说 A
我故意说 B
```

真正的信息增益应该是：

```text
在可靠事实 A 上
增加新的数据
新的解释
新的场景
新的边界
```

## 共识不等于复制

假设行业共同事实是：

```text
60Hz frame interval ≈ 16.7ms
```

你不需要为了原创写：

```text
60Hz 其实是 12ms
```

正确做法是保留共识事实，再增加：

```text
60Hz → 16.7ms
144Hz → 6.9ms
240Hz → 4.2ms
```

并进一步解释：

```text
60 → 144Hz
改善约 9.8ms

144 → 240Hz
继续改善约 2.7ms
```

最后映射：

```text
办公
普通游戏
竞技 FPS
```

这样：

```text
共识事实
+
原创解释
```

可以同时存在。

## MUM 与 BERT

不要把两者简单理解成：

```text
MUM 替代 BERT
```

Google 的搜索系统由多个系统共同工作。

可以用功能差异理解：

| 能力方向 | BERT | MUM |
| --- | --- | --- |
| 语言理解 | 强 | 强 |
| Query 上下文 | 重要 | 更复杂任务 |
| 多任务 | 较有限 | 核心设计 |
| 跨语言迁移 | 有能力 | 强调重点 |
| 内容生成 | 不是核心 | 可以生成语言 |
| 多模态 | 非核心 | 设计能力 |
| 一般排名 | 广泛相关 | 官方明确不是通用排名系统 |

所以 SEO 不需要：

```text
BERT SEO
MUM SEO
```

分别创建完全不同套路。

更合理的是理解搜索系统对：

```text
语义
任务
关系
上下文
```

的理解能力越来越强。

## MUM 不等于 AI Overview

MUM 出现早于今天的 AI Overviews 和 AI Mode。

不要把所有生成式搜索都归因于 MUM。

当前 Google 的生成式搜索功能还会使用：

- Core Search ranking systems
- Retrieval systems
- RAG / grounding
- 其他 AI 模型和系统

因此：

```text
被 AI Overview 引用
≠
通过 MUM 排名
```

这是两个不同层级的问题。

## 对 SEO 的真正意义

不能直接“优化 MUM”，但 MUM 代表的能力方向可以帮助我们设计更强内容。

最值得关注六个维度：

| 维度 | 内容原则 |
| --- | --- |
| Task | 先确定用户最终任务 |
| Fan-Out | 覆盖必要子问题 |
| Entity | 明确核心实体 |
| Relation | 明确实体之间的边 |
| Evidence | 关键关系有证据 |
| Boundary | 说明什么时候不成立 |

例如标题：

```text
Can a Mini PC Replace a NAS?
```

弱内容：

```text
Mini PCs are small.
NAS devices store files.
Both are useful.
```

强内容：

| 用户需要 | 页面应该回答 |
| --- | --- |
| 是否能替代 | 先给条件化 Yes / No |
| 替代什么 | 文件服务、Plex、Docker |
| 不能替代什么 | 磁盘槽位、冗余、热插拔 |
| 条件 | 存储需求、网络、功耗 |
| 场景 | Home Media / Backup / AI |
| 边界 | 什么情况下仍应选 NAS |

这类结构更符合复杂任务理解。

## 页面设计规范

MUM 相关内容优化可以落实成一个简单结构。

### 首屏

先回答：

```text
用户核心 Query
```

不要先写行业历史。

### H2

每个 H2 对应一个必要子问题。

不要只写：

```text
Performance
Features
Benefits
```

更好：

```text
When Does CPU Performance Matter?
How Much Storage Expansion Do You Need?
When Does a Mini PC Stop Being Enough?
```

### 表格

适合表达：

```text
实体比较
变量
条件
阈值
场景
```

### 证据

重要事实优先：

```text
官方规格
原始研究
正式标准
一手测试
```

### 边界

明确：

```text
适用条件
不适用条件
例外
版本差异
```

## 检索标准

可以用下面的 QA 表判断页面是否适合复杂查询。

| 检查 | 合格标准 |
| --- | --- |
| Core Task | 只有一个主要任务 |
| Direct Answer | 首屏回答 |
| Fan-Out | 覆盖必要子查询 |
| Entity | 主要实体清楚 |
| Relation | 不只是关键词共现 |
| Evidence | 关键 Claim 可验证 |
| Cross-language | 多语言事实一致 |
| Multimodal | 图文事实一致 |
| Consensus | 基础事实不违背可靠共识 |
| Gain | 在共识之上增加价值 |
| Boundary | 条件和限制明确 |

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 把 MUM 当独立排名算法 | 官方并未这样描述 |
| 宣称有“MUM 分数” | 没有官方依据 |
| 为 MUM 堆更多相关词 | 不能建立真实关系 |
| FAQ 越多越好 | Fan-Out 可能失控 |
| 多语言机械翻译 | 不等于跨语言理解优化 |
| 图片越多越好 | 多模态重点是语义一致 |
| 故意反共识 | 可能降低可信度 |
| 一个页面解决所有意图 | 页面任务会变得混乱 |
| 把 AI Overview 全归因 MUM | 体系混淆 |

## 怎么检测

MUM 没有 Search Console 专属报告。

不能在 GSC 里看到：

```text
MUM Impressions
MUM Score
```

所以只能从页面质量和 Query 表现间接检测。

### Query 检测

观察一个页面是否开始获得更多：

```text
长尾
问题词
条件词
场景词
```

例如原本只有：

```text
home server
```

后来出现：

```text
home server for plex
home server for local ai
low power home server
how much ram home server
```

说明页面正在覆盖更完整的任务语义。

### SERP 检测

检查：

- People Also Ask
- Featured Snippet
- AI Overview
- Related Searches
- 视频 / 图片结果
- Top 10 页面类型

判断 Google 当前把这个 Query 拆成哪些子主题。

### 内容检测

随机抽一个核心问题。

然后问：

```text
如果用户只读这一页，
还需要去 Google 搜哪些必要问题？
```

剩下的问题越关键，说明 Fan-Out 越不完整。

## 一个实操评分

以下不是 Google 官方分数，只适合内部 QA。

```text
Complex Query Coverage
=
Task Fit 25%
+
Fan-Out Coverage 20%
+
Entity Relations 20%
+
Evidence 15%
+
Scenario Mapping 10%
+
Boundary 10%
```

可以按 0–5 分打分。

| 分数 | 判断 |
| ---: | --- |
| 4.5–5.0 | 复杂任务覆盖很完整 |
| 3.5–4.4 | 基本完整 |
| 2.5–3.4 | 有信息，但关系不足 |
| <2.5 | 更像关键词型内容 |

## 最终优化目标

理解 MUM 后，SEO 不应该问：

```text
我要加多少关键词才能适配 MUM？
```

更应该问：

```text
用户真正要完成什么任务？
这个任务还包含哪些必要子问题？
页面里的实体之间是什么关系？
关系有没有事实支持？
其他语言和图片有没有冲突？
用户在什么条件下应该得到不同答案？
```

最终结构可以浓缩成：

```text
Query
→ Task
→ Fan-Out
→ Entities
→ Relationships
→ Evidence
→ Conditions
→ Answer
```

> **MUM 最重要的意义，不是提供一个新的 SEO 技巧，而是说明搜索理解正在从“词是否匹配”走向“任务是否完整、实体是否关联、证据是否一致”。真正值得优化的不是 MUM 本身，而是让页面成为一个机器和用户都能清楚理解的完整知识单元。**
