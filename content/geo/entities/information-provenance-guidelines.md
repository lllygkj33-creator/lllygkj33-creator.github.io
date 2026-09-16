---
title: "Provenance"
description: "Provenance 用于记录一条事实、数据、图片或结论从哪里来、经过了哪些处理以及最终由谁发布。它帮助 GEO 内容建立可追溯、可验证、可更新的证据链。"
order: 8
updated: "2026-09-16"
---

> Provenance 的核心是：**不仅知道“这条信息是什么”，还知道“它从哪里来、经过谁处理、什么时候产生、能不能追溯回原始证据”。**

## 什么是 Provenance

可以理解为：

```text
信息血缘
```

例如：

```text
Official Spec
→
Editor Extracts Data
→
Article Table
→
AI Cites Article
```

如果中间某一步错误，Provenance 可以帮助追溯。

## 应记录什么

| 字段 | 用途 |
| --- | --- |
| source | 原始来源 |
| author | 谁产生 |
| collected_at | 采集时间 |
| published_at | 发布时间 |
| version | 版本 |
| method | 如何获得 |
| transformed_by | 谁处理 |
| verified_by | 谁验证 |
| status | 当前是否有效 |

## 数据 Provenance

例如 Benchmark：

```text
38 tok/s
```

不能只存结果。

还要记录：

| 字段 | 示例 |
| --- | --- |
| Hardware | RTX 5090 |
| Model | 70B |
| Quantization | Q4 |
| Software | v1.2 |
| Context | 4K |
| Date | 2026-09 |
| Tester | Author A |

这样以后才能判断：

```text
新版本是否需要重测
```

## 图片 Provenance

图片也应该知道来源。

| 图片类型 | 记录 |
| --- | --- |
| 官方图 | 官方来源 |
| 自己拍摄 | 摄影者 |
| Screenshot | 软件版本 |
| Benchmark 图 | 数据源 |
| AI 图 | 明确 Generated / Illustration |

不要让：

```text
AI 生成图
```

被误认为真实实拍。

## 引用 Provenance

文章引用一个事实时，最好能追溯：

```text
Article Claim
→
Source
→
Original Source
```

而不是：

```text
Article
→
Another Blog
→
Unknown
```

链路越短越容易验证。

## 数据加工

如果原始数据经过计算，要记录方法。

例如：

```text
144Hz
→ 1000 / 144
→ 6.94ms
```

最终正文写：

```text
≈ 6.9ms
```

Provenance 应知道：

```text
原始参数
+
公式
+
结果
```

## AI 参与

如果 AI 用于：

- 摘要
- 翻译
- 改写
- 数据整理

内部最好记录：

```text
AI-assisted
```

但 AI 不应该成为无法追溯的事实来源。

正确：

```text
Original Source
→ AI Summary
→ Human Verification
```

错误：

```text
AI said...
→ Publish
```

## Provenance 与作者

作者负责：

```text
内容表达
```

Reviewer 负责：

```text
验证关键事实
```

Provenance 负责：

```text
记录事实来源链
```

三者不是同一个概念。

## Provenance 与版本

时间敏感内容必须绑定：

```text
Version
```

例如：

```text
Software v1.6
```

中的配置结论，不能自动扩展到：

```text
v2.0
```

所以记录：

```text
Claim
→ valid_for → Version
```

非常重要。

## 来源状态

建议维护：

| 状态 | 含义 |
| --- | --- |
| Active | 当前有效 |
| Superseded | 被新版本替代 |
| Archived | 历史参考 |
| Disputed | 有争议 |
| Invalid | 已失效 |

更新文章时优先检查：

```text
Superseded
Invalid
```

来源。

## Provenance 表

| Claim ID | Claim | Source | Version | Verified | Status |
| --- | --- | --- | --- | --- | --- |
| C001 | 4K120 supported | Spec | v2 | Yes | Active |
| C002 | 38 tok/s | Test | v1 | Yes | Superseded |

这样可以批量管理。

## GEO 价值

Provenance 可以帮助：

- 减少错误引用
- 提高事实一致性
- 管理版本变化
- 支持 Reviewer
- 快速更新旧内容
- 建立可验证知识库

它不是直接排名因子，而是：

```text
可信内容生产基础设施
```

## QA 表

| 检查 | 合格 |
| --- | --- |
| 原始来源可追溯 | 是 |
| 时间明确 | 是 |
| 版本明确 | 必要时 |
| 数据加工过程可解释 | 是 |
| AI 不作为最终事实源 | 是 |
| Reviewer 可回溯 | 是 |
| 旧来源有状态 | 是 |

## 核心规范

```text
每个重要事实
→
有来源
→
有时间
→
有版本
→
有处理方法
→
有验证状态
```

> **Provenance 让内容从“看起来可信”变成“可以追溯”。当任何 Claim 都能回到原始证据时，更新、审阅和 GEO 引用都会更稳定。**
