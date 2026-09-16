---
title: "Freshness 与版本"
description: "GEO 中的 Freshness 不只是更新时间，而是确保 AI 检索到的 Claim 与当前产品、软件、模型和事实版本一致。应通过版本标记、状态管理和更新记录降低旧内容被错误引用的风险。"
order: 6
updated: "2026-09-16"
---

> GEO 的 Freshness 核心不是“新”，而是：**被检索和引用的内容在当前时间、版本和适用条件下仍然成立。**

## 为什么 GEO 更敏感

生成式系统可能把：

```text
旧页面中的一句话
```

单独检索出来。

如果页面写：

```text
Product X supports 120Hz.
```

但新版本已经：

```text
144Hz
```

AI 可能继续引用旧事实。

因此 GEO 需要管理：

```text
Claim Freshness
```

而不只是页面日期。

## 四类 Freshness

| 类型 | 变化对象 |
| --- | --- |
| Fact Freshness | 事实 |
| Version Freshness | 软件 / 产品版本 |
| Source Freshness | 引用来源 |
| SERP Freshness | 用户当前需求 |

一个页面可能：

```text
发布时间很新
但事实很旧
```

也可能：

```text
发布时间很旧
但基础原理仍有效
```

## Claim 状态

建议给重要事实定义状态。

| 状态 | 含义 |
| --- | --- |
| Current | 当前有效 |
| Superseded | 已被新版替代 |
| Deprecated | 功能仍在但不建议使用 |
| Historical | 仅历史参考 |
| Unverified | 待验证 |
| Removed | 已不存在 |

这种状态比单纯：

```text
Updated 2026
```

更有用。

## 版本绑定

重要 Claim 应尽量绑定版本。

例如：

```text
Feature X is available in Software 2.0 and later.
```

而不是：

```text
Feature X is available.
```

推荐记录：

| 字段 | 示例 |
| --- | --- |
| entity | Software X |
| version | 2.0 |
| claim | supports Feature Y |
| valid_from | 2026-05 |
| status | Current |

## 页面头部

时间敏感文章可以明确显示：

```text
Updated: September 2026
Tested on: Version 2.1
```

这样用户和机器都更容易理解当前适用范围。

## 更新记录

对于技术文档，可以保留简短 Changelog。

| Date | Change |
| --- | --- |
| 2026-09 | Updated for v2.1 |
| 2026-07 | Added new API behavior |
| 2026-05 | Initial version |

这能帮助：

```text
理解哪些内容发生过变化
```

## 旧版本

不要所有旧版本都删除。

| 情况 | 处理 |
| --- | --- |
| 老版本仍大量使用 | 保留版本文档 |
| 已完全淘汰 | Archive |
| 有新替代页面 | 301 或版本导航 |
| 历史有研究价值 | Historical |
| 旧信息有安全风险 | 明确警告 |

## 版本 URL

两种常见方式：

```text
/docs/v1/
/docs/v2/
```

或者：

```text
单页面
+
版本选择器
```

选择取决于：

- 用户规模
- 版本寿命
- 搜索需求
- 维护成本

关键是：

```text
机器能明确知道当前版本
```

## Source Freshness

引用也会过时。

例如：

```text
Official Docs v1
```

已经被：

```text
Official Docs v2
```

替代。

内部来源状态应至少包含：

| Source | Status |
| --- | --- |
| v1 Docs | Superseded |
| v2 Docs | Active |
| Old Forum | Historical |

## 时间敏感数字

价格、库存、Benchmark 应绑定时间。

例如：

```text
Price checked in September 2026.
```

而不是：

```text
Current price: $499
```

半年后“Current”会失去意义。

## AI 引用老内容

如果发现 AI 持续引用旧页面，可以检查：

- 旧 URL 是否仍可索引
- 新页面是否有明确版本
- Canonical 是否正确
- 旧页是否应该 301
- 新旧内容是否互相矛盾
- 当前页是否有更强证据

不要只修改日期。

## Prompt 测试

固定 Prompt 可以验证：

```text
AI 是否仍然引用旧版本
```

例如：

```text
Does Product X support 144Hz?
```

记录：

| Platform | Answer | Version | Citation |
| --- | --- | --- | --- |
| A | Yes | 2026 | Current page |
| B | No | 2024 | Old page |

然后针对旧来源治理。

## 更新优先级

内部可以定义：

```text
Freshness Priority
=
Fact Change Risk
×
Citation Risk
×
Traffic
×
Business Value
```

不是平台官方指标，只用于排期。

## QA 表

| 检查 | 合格 |
| --- | --- |
| Claim 有当前状态 | 重要内容 |
| 软件 / 产品有版本 | 是 |
| 日期明确 | 是 |
| 旧版本处理清楚 | 是 |
| 来源仍有效 | 是 |
| Changelog 可追溯 | 推荐 |
| AI 未持续引用旧事实 | 已测试 |
| 页面日期不是假更新 | 是 |

## 核心规范

```text
识别时间敏感 Claim
→
绑定版本
→
维护状态
→
同步来源
→
更新页面
→
用 Prompt 验证 AI 是否仍引用旧事实
```

> **GEO Freshness 的重点不是把页面变新，而是让任何被单独抽取的 Claim 都能明确回答：它现在是否仍然成立。**
