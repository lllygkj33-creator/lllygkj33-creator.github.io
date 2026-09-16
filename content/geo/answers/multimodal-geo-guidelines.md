---
title: "多模态"
description: "多模态 GEO 的目标是让文本、图片、图表、视频与结构化数据共同表达一致事实。重点不是增加媒体数量，而是让不同模态互相验证，而不是互相冲突。"
order: 6
updated: "2026-09-16"
---

> 多模态 GEO 的核心不是“多放图片和视频”，而是：**同一个实体和 Claim 在文本、图片、图表、视频与 Schema 中保持一致，并让不同模态各自承担最适合的证据任务。**

## 什么是多模态

常见模态：

| 模态 | 适合表达 |
| --- | --- |
| Text | 定义、机制、条件 |
| Image | 外观、接口、截图 |
| Chart | 数值差异、趋势 |
| Table | 结构化比较 |
| Video | 动作、流程、真实演示 |
| Audio | 语音、声学体验 |
| Schema | 实体和属性 |

多模态不是数量问题，而是：

```text
不同形式
共同支持同一知识
```

## 文本和图片

例如正文写：

```text
The device includes two HDMI 2.1 ports.
```

图片应该真实展示：

```text
2 × HDMI ports
```

Alt 和 Caption 也应该一致。

完整关系：

| 模态 | 信息 |
| --- | --- |
| Body | 2 × HDMI 2.1 |
| Image | 两个接口 |
| Alt | rear panel with two HDMI ports |
| Caption | 两个 HDMI 2.1 接口 |
| Schema | 对应产品实体 |

如果图片实际只有一个 HDMI，就产生语义冲突。

## 图表

图表适合：

```text
Data
→
Visual Difference
```

例如刷新率：

| Hz | Frame Interval |
| ---: | ---: |
| 60 | 16.7ms |
| 144 | 6.9ms |
| 240 | 4.2ms |

然后可以做图表显示：

```text
Refresh Rate ↑
Frame Interval ↓
```

但图表必须配正文解释。

不要让关键结论只存在图片像素里。

## 图表必须文本化

一个 Benchmark 图应该同时有：

- 图表标题
- Axis Label
- Unit
- Caption
- 正文摘要

例如：

```text
Model A reached 38 tok/s while Model B reached 24 tok/s
under the same 4-bit test setup.
```

即使 AI 没有正确读取图像，也能从文本获得核心事实。

## 图片 Alt

Alt 负责：

```text
图里是什么
```

Caption 负责：

```text
为什么重要
```

正文负责：

```text
这说明什么
```

例如：

| 层 | 内容 |
| --- | --- |
| Alt | RTX 5090 local AI benchmark screen |
| Caption | 4-bit 70B model test |
| Body | 解释速度和限制 |

三个层级不要完全复制同一句。

## 视频

视频最适合：

- Setup
- Repair
- UI 操作
- Physical Test
- Product Demonstration

但不要让：

```text
核心步骤
```

只存在视频里。

同时提供：

```text
Transcript
+
Steps
+
Key Result
```

这能提高可访问性，也更适合搜索和 AI 检索。

## 视频章节

长视频建议：

```text
00:00 Intro
01:20 Hardware
03:40 Installation
08:10 Benchmark
```

章节同时帮助：

- 用户定位
- 搜索理解
- 内容复用

如果页面能对应这些章节提供 H2，会更清楚。

## Screenshot

操作教程截图应该展示：

```text
关键状态变化
```

而不是纯装饰。

例如：

```text
Before
→
Setting Disabled

After
→
Setting Enabled
```

Caption 写清：

```text
Enable Hardware Transcoding under Settings > Playback.
```

这样截图成为证据。

## 多模态一致性

建立内部一致性表。

| Fact | Text | Image | Table | Schema |
| --- | --- | --- | --- | --- |
| 240Hz | 240Hz | 240Hz UI | 240Hz | 240Hz |
| 2 HDMI | 2 | 2 ports | 2 | 2 |
| Price | $499 | 不显示 | $499 | $499 |

任何一列冲突都应该修。

## 产品内容

产品页最容易发生：

```text
正文更新
但图片没更新
```

例如新版本：

```text
USB-C 90W
```

旧图仍写：

```text
65W
```

这种冲突对用户和机器都很危险。

版本更新时要同时检查：

- Body
- Product Image
- Spec Table
- Download PDF
- Schema
- Caption

## 多模态证据

不同模态可以承担不同证据等级。

例如产品评测：

| Claim | 最合适证据 |
| --- | --- |
| 有两个 HDMI | 实拍 |
| 亮度 1000 nits | Benchmark |
| UI 支持 240Hz | Screenshot |
| 风扇噪音 | Audio / Test |
| 安装步骤 | Video |

不要用 Stock Photo 证明 Benchmark Claim。

## AI 图像风险

AI 生成图片可以用于：

- 概念图
- 装饰 Banner
- 抽象架构

不适合伪装成：

```text
真实产品实拍
真实 Benchmark
真实 UI 截图
真实事件现场
```

如果视觉是示意，应明确：

```text
Illustration
Concept
Diagram
```

避免伪造 Experience。

## Diagram

架构和机制特别适合 Diagram。

例如：

```text
Query
→ Retrieval
→ RAG
→ LLM
→ Answer
```

比 500 字纯文字更容易理解。

但 Diagram 中的重要关系也应该在正文解释一次。

## 多模态 Chunk

RAG 友好页面可以让：

```text
Text Passage
+
Image
+
Caption
+
Table
```

围绕同一个 H2。

例如：

```text
H2
240Hz Frame Timing

Paragraph
解释

Chart
展示

Caption
总结

Table
提供数值
```

形成一个完整知识单元。

## Schema

多模态内容可以通过：

- ImageObject
- VideoObject
- Product
- Article

等 Schema 补充机器可读关系。

但 Schema 只描述页面真实存在的信息。

不要把：

```text
不存在的视频
不存在的图片
不存在的作者
```

写进结构化数据。

## 多模态 QA

| 检查 | 合格 |
| --- | --- |
| Text 与 Image 一致 | 是 |
| 图表有单位 | 是 |
| 图表有文本摘要 | 是 |
| 视频有 Transcript | 推荐 |
| Screenshot 有说明 | 是 |
| Alt 准确 | 是 |
| Caption 有信息价值 | 是 |
| Schema 与页面一致 | 是 |
| AI 图不冒充实拍 | 是 |
| 版本同步 | 是 |

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 图片越多越 GEO | 错 |
| 关键事实只写在图里 | 不利检索 |
| Stock 图当证据 | 无意义 |
| 视频无 Transcript | 信息难提取 |
| 图文规格冲突 | Trust 下降 |
| Alt 和正文堆同词 | 信息重复 |
| AI 图冒充实拍 | Experience 风险 |
| Schema 与视觉不一致 | 实体冲突 |

## 核心规范

```text
先确定 Claim
→
选择最适合的模态证明
→
文本保留核心事实
→
图片 / 图表提供视觉证据
→
Schema 保持一致
→
版本更新同步所有模态
```

> **多模态 GEO 的目标不是让页面“更丰富”，而是让同一事实从不同模态都能被验证。文本负责解释，图像负责展示，图表负责比较，视频负责过程，Schema 负责实体关系；所有模态必须指向同一个事实。**
