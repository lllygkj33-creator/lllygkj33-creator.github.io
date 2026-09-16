---
title: "实体消歧规范"
description: "实体消歧用于确认页面中的名称究竟指向哪个真实对象。GEO 应通过名称、类型、属性、关系、版本与外部标识减少同名、缩写和型号造成的歧义。"
order: 14
updated: "2026-09-16"
---

> 实体消歧的核心是：**不要只告诉机器一个名字，而要让它确定这个名字究竟指向谁。**

## 为什么会歧义

同一个名称可能对应多个实体。

| 名称 | 可能实体 |
| --- | --- |
| Apple | 公司 / 水果 |
| Java | 编程语言 / 岛屿 / 咖啡 |
| Gemini | AI 模型 / 星座 / 产品名 |
| Pro | 产品版本 / 套餐 |
| M4 | 芯片 / 道路 / 产品型号 |

如果上下文不足，机器只能猜。

## 五层消歧

推荐同时使用：

| 层 | 作用 |
| --- | --- |
| Name | 实体名称 |
| Type | 公司 / 产品 / 人物 / 技术 |
| Attributes | 版本、型号、规格 |
| Relations | 属于谁、支持什么 |
| External ID | 官方页、SameAs、@id |

例如：

```text
Gemini
```

太模糊。

更清楚：

```text
Google Gemini 3.0 AI model
```

再进一步：

```text
Gemini 3.0
→ developed by → Google
→ type → multimodal AI model
```

## 首次出现

正文首次出现实体时建议写完整。

例如：

```text
OpenAI GPT-6 Astra
```

后文再简称：

```text
GPT-6 Astra
```

不要一开始只写：

```text
Astra
```

除非上下文绝对清楚。

## 产品型号

产品实体最好包含：

- Brand
- Product Line
- Model
- Generation
- Version

例如：

```text
Apple MacBook Pro 14-inch (M6, 2026)
```

比：

```text
MacBook Pro
```

更不容易和旧代产品混淆。

## 软件版本

软件尤其需要版本消歧。

| 弱 | 强 |
| --- | --- |
| Ubuntu | Ubuntu 26.04 |
| Python | Python 3.14 |
| Plex | Plex Media Server 1.x |
| ZimaOS | ZimaOS 1.7 |

如果不同版本行为不同，版本必须进入正文关系。

## 人物

同名作者或专家需要：

| 字段 | 用途 |
| --- | --- |
| Full Name | 姓名 |
| Job Title | 职位 |
| Organization | 所属 |
| Author Page | 站内身份 |
| SameAs | 外部身份 |
| Expertise | 专业领域 |

不要只用：

```text
John
```

建立作者实体。

## 品牌与公司

品牌和公司不一定是同一个实体。

例如：

```text
Brand A
→ owned by
→ Company B
```

页面应该明确这种关系，而不是混用。

## 缩写

首次出现建议：

```text
Network Attached Storage (NAS)
```

后文使用：

```text
NAS
```

如果一个缩写有多个含义，更应该写完整名称。

## 页面标题

Title / H1 应避免只写模糊实体。

弱：

```text
Gemini Guide
```

强：

```text
Google Gemini AI Model Guide
```

尤其是品牌词、人物名、产品简称容易多义时。

## 关系帮助消歧

实体最强的消歧方式之一是关系。

例如：

```text
Apple
→ manufactures → iPhone
```

立刻说明：

```text
Apple Inc.
```

而不是水果。

因此：

> **关系比关键词重复更能帮助实体识别。**

## Structured Data

可以使用：

```text
Person
Organization
Product
SoftwareApplication
Article
```

配合：

```text
@id
sameAs
brand
manufacturer
author
```

明确实体。

例如：

```text
Product
→ brand
→ Organization
```

形成机器可读关系。

## Canonical 与实体

同一个实体不要长期有多个互相竞争主页面。

例如：

```text
/product-x
/product-x-new
/product-x-final
```

如果都是同一个产品实体，应明确：

```text
Canonical 主页面
```

减少实体碎片。

## 多语言

不同语言版本要保持实体名称稳定。

例如：

```text
GPT-6 Astra
```

不应该在另一个语言版本变成无法识别的自创译名。

可以翻译描述，但核心：

```text
Brand
Model
Product ID
```

应一致。

## 消歧 QA

| 检查 | 合格 |
| --- | --- |
| 首次出现写完整名称 | 是 |
| 类型明确 | 是 |
| 版本明确 | 必要时 |
| 品牌归属明确 | 是 |
| 同名实体已区分 | 是 |
| Structured Data 一致 | 是 |
| 多语言名称一致 | 是 |
| Canonical 主实体页唯一 | 是 |

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 只写简称 | 歧义 |
| 型号不写代际 | 旧新版本混淆 |
| 品牌和母公司混写 | 实体关系错误 |
| 多语言自创名称 | 实体断裂 |
| 同一产品多个主页面 | 信号分散 |
| SameAs 指向错误账号 | 身份错误 |

## 核心规范

```text
Name
+
Type
+
Version
+
Relation
+
External Identity
```

> **实体消歧不是把名称写得更长，而是让机器和用户都能唯一确定“这个名字到底指向哪个对象”。**
