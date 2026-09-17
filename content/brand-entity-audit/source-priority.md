---
title: "Source Priority：品牌官网、商城、Docs 谁更可信"
description: "来源权威是字段级的，不是域名级的；Brand / Shop / Docs / Manual / Release / Test / Community 各自的角色与适用字段。"
order: 5
updated: "2026-09-17"
---

> 不要问「哪个站点更可信」，要问「**这个字段**该信谁」。品牌官网不是绝对真源，Shop 也不是低一等的副本——**不同字段有不同权威源**，同一来源内部还可能自相矛盾。

## 为什么不能写成 `www > shop`

最省事的写法是把来源排成一条线：

```text
www > shop        ← 这条规则会在第一个真实字段上失效
```

失效得很快，两个字段就够：

```text
当前 SKU / Bundle / Price / Stock   → Shop 是唯一实时源
产品定位（品牌把自己定义成什么）      → Brand 更权威
```

如果坚持 `www > shop`，那么 Shop 上「Starter Bundle 含电源适配器、Board Only 不含」这条**只有 Shop 才知道**的信息，会永远被 Brand 页上过时的描述压住。

所以正确的原则是：

```text
Source Authority depends on Fact Type
```

## 字段级权威表

| 信息类型 | 优先来源 | 典型字段 / 例子 |
| --- | --- | --- |
| 核心硬件规格 | 官方规格页 / Manual / 品牌产品页 | `processor` `memory` `dimensions` |
| 产品定位 | 品牌官网 | `C_ZC_PERSONAL` = designed_for personal cloud |
| 当前 SKU / Bundle / Price / Stock | Shop | Bundle 内容、Offer 构成、库存 |
| 软件能力 | Docs / Release Notes | `can_run` `supports` 这类 capability |
| 当前软件 Edition 权益 | Pricing / Policy | `license_price` `license_term` `disk_limit` |
| 使用场景 | Brand / Shop Claim | `suitable_for` `positioning` |
| 实测性能 | First-party Test | 吞吐、转码、并发等实测结论 |
| 用户体验 | Community / UGC | 仅作为 Experience Evidence |

读这张表的正确方式是**横向**：

```text
同一个产品
├─ 规格字段    → 规格页 / Manual
├─ 权益字段    → Pricing 页
├─ SKU 字段    → Shop
└─ 使用感受    → Community（只能当经验证据）
```

一行一个字段，**没有哪一列能整行通吃**。

## 七类来源的角色

| 来源类型 | 角色 | 适用字段 | 不该拿它定什么 |
| --- | --- | --- | --- |
| Brand | Seed Source，第一轮候选的主要出处 | 定位、型号命名、硬件规格、capability | 当前价格与库存 |
| Shop | 交易事实源 | SKU、Bundle / Offer、Price、Stock、在售配置 | 产品定位、长期硬件规格 |
| Docs | 软件能力的权威 | 功能清单、支持矩阵、Edition 差异 | 硬件规格 |
| Manual | 硬件细节的最终依据 | 接口定义、供电、物理尺寸、兼容清单 | 产品定位 |
| Release | 时间敏感状态的依据 | 功能上线 / 灰度 / 已发布 | 硬件规格 |
| Test | 实测依据 | 性能结论 | 定位主张、权益 |
| Community | 经验证据 | 使用体验、踩坑 | 任何 Canonical Fact |

Community 的边界要写死：**只提供 Experience Evidence，永远不直接产生 Canonical Fact 或 Claim。**

## 已知来源清单

本轮实际使用到的来源（用 source_id 指代，不带完整 URL）：

| source_id | 类型 | 覆盖范围 |
| --- | --- | --- |
| SRC_ZB2 | Brand PDP | ZimaBoard 2 |
| SRC_ZB1 | Brand PDP | ZimaBoard |
| SRC_ZBL | Brand PDP | ZimaBlade |
| SRC_ZC | Brand PDP | ZimaCube / Pro / Creator Pack |
| SRC_ZOS | Brand 产品页 | ZimaOS |
| SRC_ZOS_PRICE | Brand Pricing 页 | ZimaOS / ZimaOS+ 权益 |
| SHOP_PDP_ZC2 / SHOP_PDP_ZB2 / SHOP_PDP_ZBL | Shop PDP | 在售 SKU 与规格表 |
| BLOG_ZC2_STANDARD / BLOG_ZB2_AI / BLOG_ZBL_7700 / BLOG_MEMBER_DAY_2025 | Shop Blog | 场景主张与使用描述 |

**Brand 侧只覆盖 6 个来源，Shop 侧有 3 个 PDP + 4 篇 Blog。** 也就是说本轮系统对「官方站群内部一致性」的检查，实际上是在**两个不同站点之间**做的——这正是第一阶段性价比最高的工作。

## 陷阱一：同一来源内部自相矛盾

来源优先级排得再细，也解决不了**同一个来源内部**的问题。这类冲突必须单独标记：

```text
intra_page_ambiguity
```

真实例子：

| 案例 | 同一来源内的两条观测 | 待确认的是什么 |
| --- | --- | --- |
| SHOP_PDP_ZB2 的 `preinstalled_os` | Shop Specification 写 **ZimaOS Plus**；同一页 Shop FAQ 写 **ZimaOS** | ZimaOS Plus 是预装镜像、Edition，还是叠在 ZimaOS 上的权益 |
| SRC_ZC 的 Unraid 兼容状态 | Specs 把 **Unraid** 列进 Compatible OS；Support FAQ 说 **still undergoing testing** | 当前兼容状态到底是哪一个 |
| SRC_ZB1 的存储容量 | Overview 说 **up to / over 36TB**；Support FAQ 说 SATA 可再加 **20TB** | 这是总容量还是新增容量，或者是过时文案 |
| SRC_ZOS_PRICE 的命名 | 同一页同时出现 **ZimaOS+** 与 **ZimaOS Plus** 两种写法 | 是否只是别名 |

**前三行都不需要跨站比较就能发现。** 只要对同一来源建 Observation 并做字段级比对，`intra_page_ambiguity` 就会自己浮出来——这是这套系统上线第一天就能交付的价值。

## 陷阱二：旧内容 vs 当前内容

历史内容写的是**当时正确**的信息，不能一律标红：

```text
BLOG_MEMBER_DAY_2025
freshness        historical_sample
CasaOS 作为 preinstalled_os → 与当时的父级 Fact 一致
```

关键词是 **match_parent_fact**——**它和它那个时代的父级事实是一致的**。今天看到不同，不代表当时写错。

MVP 的处理方式是先标记再判断：

```text
stale_candidate     ← 第一版只用这一个状态
```

成熟后可扩展的字段：

```text
published_at / valid_from / valid_to / version / freshness_status
```

对比一下两种做法：

| 处理方式 | 结果 |
| --- | --- |
| 看到不同就标 conflict | 历史 Blog 全部报警，审核队列被噪音淹没 |
| 标 `stale_candidate`，带 freshness 上下文 | 审核者先问「它当时对不对」，再决定是否更新 |

同一条原则的另一个例子是时效性文案：ZimaBoard 2 页面上留着 Backup 的「未来上线」说明，而当前的 ZimaOS 页面已经把 Backup 当作可用功能并提供入口。这不是硬件冲突，是**时间敏感文案没跟上**——审核方向是「更新或移除过时文案」，不是「改哪个数字」。

## source_type 与 confidence 的关系

`source_type` 和 `confidence` 是两个层级的东西，不能互相替代：

```text
source_type  →  这类来源对这个字段算不算权威   （结构性判断）
confidence   →  这条具体记录有多可信            （记录级判断）
```

三档输入，一级人工：

| 层级 | 依据 | 种子数据里的例子 |
| --- | --- | --- |
| 最高 | Manual / Pricing 页等规则化的硬来源 | `F_ZOSP_PRICE` = 29 USD，`confidence` = high |
| 中 | 有依据但表述需要解释 | `F_ZC_COMPAT_OS` 列了 11 个系统，`confidence` = medium |
| 待确认 | 主张强度或口径本身就模糊 | `C_ZBL_AUTOGPT`，`confidence` = low |
| 人工 | 任何 approve 都必须过这一步 | `review_status` = pending → approved |

**关键约束：`confidence` 再高也换不来 approve。**

```text
ai_candidate  --人工审核-->  canonical
```

`promotion_rule` 写得很清楚：只有**人工批准过**的条目才能从 `ai_candidate` 升级为 `canonical`。**AI 的角色是候选抽取，人的角色是批准。** 所以在来源权威这套逻辑里，`confidence: high` 只意味着「这条记录值得先审」，不意味着可以免审。

## source_type 怎么用

每条记录都要能回答：**这句话是从哪一类载体上、哪个字段里拿到的。**

```text
source_id        SRC_ZB2
source_section   Overview
source_locator   Overview > Build Your Mini-NAS
```

图片同样要留下类型标记：

```text
source_type = image
image_url
evidence_text
```

审核者必须一眼看出**这条事实来自图片，而不是正文**——否则图片里的规格被改动时，没人知道该重新抽哪一块。

## 冲突处理原则

```text
mismatch / scope ambiguity / stronger wording /
new claims / freshness risk / canonical coverage gap
→ 全部进 review_queue

Do not silently reconcile.
```

**不允许「静默和解」。** 系统只能报告，不能替人做合并决定。举一个必须靠人判断的字段级例子：

| 字段 | Brand 侧观测 | Shop 侧观测 | 为什么不能自动裁决 |
| --- | --- | --- | --- |
| `compatible_os`（ZimaBoard 2） | 7 项（CasaOS / Linux / Windows / OpenWrt / pfSense / Android / LibreELEC） | 11 项，多出 **OMV / Unraid / Home Assistant OS / TrueNAS** | 是 Canonical 覆盖不全，还是 Shop 措辞夸大了「官方兼容」 |

两边都「来自官方」，但**字段级权威在这一项上不成立**——Brand 的规格页和 Shop 的规格表都不足以判定「官方兼容到什么程度」。这类问题只能挂 `canonical_gap` 交人审。

## 结论

1. **来源权威是字段级的**：`www > shop` 这种域名级排序，在 SKU、Bundle、Price 字段上立刻失效。
2. **七类来源各有各的适用字段**：Brand 给定位与规格，Shop 给交易事实，Docs 给软件能力，Release 给时间敏感状态，Test 给实测，Community 只给经验证据。
3. **同一来源内部自相矛盾必须单独标记**（`intra_page_ambiguity`），不必等跨站比较——这是第一阶段最容易拿到的收益。
4. **旧内容要先分清「当时错」和「现在旧」**：MVP 用 `stale_candidate`，配合 freshness / version 语义再下判断。
5. **`source_type` 决定权威，`confidence` 决定审查顺序，人工批准决定 Canonical**——三者缺一不可，且 `confidence: high` 永远不能替代人工审核。
