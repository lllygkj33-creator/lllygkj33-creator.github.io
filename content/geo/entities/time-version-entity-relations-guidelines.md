---
title: "时间与版本"
description: "实体关系不是永久静态事实。产品、软件、模型和标准会随着时间和版本变化，GEO 内容必须把 Claim 绑定到明确时间、版本和适用范围。"
order: 9
updated: "2026-09-16"
---

> 一个实体关系如果没有时间和版本，很多时候只是“暂时正确”。GEO 必须回答：**这条关系在什么时候、哪个版本、什么条件下成立。**

## 为什么时间重要

例如：

```text
Product X
→ supports → Wi-Fi 7
```

可能在：

```text
2025 Version
```

不成立。

在：

```text
2026 Revision
```

成立。

如果不记录版本，就会把两个不同实体状态混在一起。

## 时间型关系

常见：

| 关系 | 时间敏感 |
| --- | ---: |
| Price | 极高 |
| Availability | 极高 |
| Software Support | 高 |
| Firmware Feature | 高 |
| Product Spec | 中高 |
| Company Ownership | 中 |
| Mathematical Fact | 低 |

所以不是所有 Claim 都需要高频更新。

## 版本型实体

软件和模型尤其明显。

例如：

```text
DeepSeek V4.1 Flash
```

和：

```text
DeepSeek V4.1 Pro
```

即使属于同一系列，也可能拥有不同能力。

不要写成：

```text
DeepSeek V4.1 supports image input
```

如果实际上只有某个子版本支持。

## 实体状态

可以给关系增加属性：

```text
valid_from
valid_to
version
region
status
```

例如：

```text
Product A
→ supports
→ Feature X

valid_from: 2026-04
version: 2.1
region: Global
status: Active
```

这比静态：

```text
A supports X
```

准确。

## 时间切片

可以把实体看成多个时间状态。

例如：

| 时间 | Product X |
| --- | --- |
| 2024 | 60Hz |
| 2025 | 120Hz |
| 2026 | 144Hz |

不是一个实体“互相矛盾”，而是：

```text
不同时间状态
```

因此内容更新时不能直接删除历史语境。

## 版本关系

常见：

```text
Version B
→ supersedes → Version A
```

或：

```text
Firmware 2.0
→ adds → Feature X
```

这些关系非常适合进入知识图谱。

## Current 与 Historical

页面应该区分：

| 类型 | 写法 |
| --- | --- |
| 当前事实 | As of September 2026 |
| 历史事实 | In version 1.5 |
| 已废弃 | Deprecated in 2.0 |
| 未发布 | Announced, not yet released |

不要全部混成现在时。

## 发布时间

涉及：

- AI 模型
- 软件
- 产品
- 标准

时，首次出现建议给明确时间。

例如：

```text
Released in August 2026
```

比：

```text
recently released
```

更适合长期检索。

## 地区版本

时间之外还可能存在地区关系。

例如：

```text
Product X
US SKU
EU SKU
```

拥有不同：

- Ports
- Price
- Warranty
- Availability

所以完整关系可能是：

```text
Entity
+
Version
+
Region
+
Time
```

## 来源版本

来源本身也会变化。

例如官方文档：

```text
v1 Docs
→
v2 Docs
```

引用时最好知道：

```text
当前页面基于哪个版本
```

尤其是技术教程。

## 更新旧内容

检查：

| 项目 | 动作 |
| --- | --- |
| 新版本发布 | 更新当前结论 |
| 旧版本仍有用户 | 保留历史说明 |
| 功能被删除 | 标 Deprecated |
| 价格变化 | 更新 |
| 产品停售 | 标 Discontinued |
| 新地区上线 | 增 Region |

不要只修改：

```text
Updated Date
```

而不更新关系本身。

## 时间冲突

例如：

```text
Source A:
Feature unsupported

Source B:
Feature supported
```

第一步不是判断谁错。

先看：

```text
发布时间
版本
Firmware
地区
```

很多“冲突”其实是时间差。

## Entity Timeline

复杂产品可以维护：

| Date | Event | Relation Change |
| --- | --- | --- |
| 2025-01 | Launch | Feature A |
| 2025-08 | Firmware 1.5 | Adds B |
| 2026-02 | Version 2 | Removes C |

这样更容易管理旧文章。

## 版本 URL

不一定每个版本都建独立页面。

| 情况 | 页面策略 |
| --- | --- |
| 当前产品 | 主页面 |
| 老版本仍大量使用 | 保留版本文档 |
| 小 Firmware 差异 | 主页面内说明 |
| 完全不同代际 | 可独立页面 |
| 无独立搜索需求 | 不必拆 |

避免为了版本生成大量薄页。

## QA 表

| 检查 | 合格 |
| --- | --- |
| 时间敏感 Claim 有日期 | 是 |
| 软件有版本 | 是 |
| 产品代际明确 | 是 |
| 地区差异明确 | 必要时 |
| 当前 / 历史分开 | 是 |
| Deprecated 标记 | 是 |
| 来源版本可追溯 | 是 |
| 旧关系已更新状态 | 是 |

## 核心规范

```text
实体
→
关系
→
版本
→
时间
→
地区
→
状态
```

> **实体图谱不是静态地图，而是会随时间变化的知识系统。只有把关系绑定到版本、时间和适用范围，机器和用户才能知道一条事实“现在是否仍然成立”。**
