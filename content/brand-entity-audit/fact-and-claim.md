---
title: "Fact 与 Claim：硬件事实和品牌主张为什么必须分开"
description: "Fact 管它是什么，Claim 管它能做什么、适合什么、品牌怎么说；五种 Claim 类型与 can_run 不能升级成 best_for 的原因。"
order: 4
updated: "2026-09-17"
---

> **Fact 管「它是什么」，Claim 管「它能做什么、适合什么、品牌怎么说」。** 两者混在同一个字段里，系统就会把一句营销形容当成硬件规格来校对，也会把一句能力描述自动升级成推荐结论。

## 先看一个直觉

同样一句话写在 PDP 上，性质可能完全不同：

```text
ZimaBoard 2 的 RAM 是 8GB          → 这是 Fact，全站必须一致
ZimaBoard 2 适合做 mini NAS        → 这是 Claim，品牌这么主张
ZimaBoard 2 是 Plex 的最佳选择      → 这也是 Claim，但强度明显更高
```

三句话在第一眼看上去都是「关于 ZimaBoard 2 的说法」。但只有第一句能拿来对错：**8GB 和 16GB 不可能同时正确**。第二、第三句没有对错，只有**强弱**和**有没有依据**。

这就是为什么必须拆开——**校对逻辑不同**。

## Fact 是什么

Fact 是客观、结构化、应当全站一致的属性：

| 类别 | 典型 attribute |
| --- | --- |
| 算力 | `processor` |
| 内存 | `memory` / `memory_type` |
| 存储 | `system_storage` / `onboard_storage` |
| 网络与接口 | `lan` / `usb` / `sata_ports` / `pcie` |
| 尺寸与供电 | `dimensions` / `power` / `tdp` |
| 软件 | `preinstalled_os` / `compatible_os` |

种子数据里的一条 Fact 长这样：

```text
fact_id        F_ZB2_832_RAM
entity_id      zimaboard_2_832
attribute      memory
value          8GB LPDDR5 4800MHz
scope          variant
source_id      SRC_ZB2
source_locator Specs > Model / Memory
```

Fact 的判定标准只有一句话：**如果两个页面写出了不同的值，至少有一处需要审核。**

## Claim 是什么

Claim 不是硬规格。它回答的是三个不同的问题：

```text
它能做什么        → capability
品牌推荐它做什么  → recommendation
品牌把它定义成什么 → positioning
它相对别的东西如何 → comparative
品牌承诺了什么    → policy
```

种子数据里的 claim 字段拆得更细：

```text
claim_id        C_ZB2_PLEX
entity_id       zimaboard_2
claim_type      capability
relation        can_run
object          Plex
condition       (可空)
scope           entity
confidence      medium
source_locator  Overview > Home is Theater
review_status   pending
```

注意这里的 **`relation` + `object` 是成对的**：`can_run → Plex` 和 `suitable_for → Plex` 用的是同一个 object，但说的是两件事。**这才是 Claim 必须结构化、不能当一句话存的原因。**

## 五种 Claim 类型

| 类型 | 回答的问题 | ZimaBoard 2 上的真实例子 | 关键字段 |
| --- | --- | --- | --- |
| capability | 能不能做到 | `can_run → Plex`、`can_run → Jellyfin`、`can_run → Home Assistant` | `condition` 常常是必需项 |
| recommendation | 品牌推荐给谁 / 什么场景 | `suitable_for → mini NAS / personal cloud` | 与 capability 是两条独立记录 |
| positioning | 品牌把它定义成什么 | `suitable_for → home server` | 常来自 Overview 标题词 |
| comparative | 与别的产品相比处于什么位置 | `positioned_as → more compact and budget-friendly than ZimaBoard, with reduced features` | 出现即应视为需要依据 |
| policy | 权益、许可、承诺 | `will_not_become → subscription`；`included_with → ZimaBoard / ZimaBoard 2 / ZimaCube lineup / ZimaBlade` | 与价格页、Edition 强绑定 |

**capability 的 `condition` 不是可选装饰。** 例子：

```text
C_ZB2_LOCALAI
relation    can_support
object      local AI experiments with an added GPU
condition   Uses PCIe 3.0 GPU expansion; page gives Ollama/Qwen examples
```

去掉 `condition`，这句就变成「ZimaBoard 2 能跑本地 AI」——**把「加一张卡之后可以」说成了「本来就可以」**。这类损失不是措辞问题，是事实强度被悄悄抬高了。

## `can_run Plex` ≠ `best_for Plex`

这是本页最需要记住的一条：

```text
can_run    Plex   =  这套硬件能跑起来
suitable_for Plex =  品牌认为这个场景适合它
best_for   Plex   =  品牌认为它在 Plex 场景里是最优解
```

三者是**三个强度档位，不是同义词**。可行的强度阶梯：

```text
can_run  <  supports  <  suitable_for  <  recommended_for  <  best_for
```

规则只有一条：

> **capability 不得自动升级成 recommendation，更不得自动升级成 best_for。**

### 系统怎么记录这种升级

当页面把 `can run Plex` 写成 `perfect for Plex`，这不是硬件事实错误，而是**主张被写强了**。系统给的标记是：

```text
stronger_than_canonical
```

含义是：**不一定错，但值得审核。** 页面上限是 `can_run`，实际写法到了 `best_for` 档位，落差需要人来判断——可能是有新的实测依据，也可能只是文案发挥。

### 一个容易踩的变体

博客页上的另一种写法：

```text
BLOG_ZC2_STANDARD
claim_type  capability
relation    suitable_for
object      ["NAS storage", "Docker", "light virtualization"]
```

`claim_type` 写 capability，`relation` 却是 `suitable_for`——**relation 比 claim_type 更接近推荐语气**。种子数据里把这句标为 `blog_recommendation_claim`，也就是**按原文实际语气归类，而不是按抽取器猜的类型归类**。

## 为什么不能合并成一个字段

假设只有一个 `attribute = use_case` 字段，会遇到四种处理不了的句子：

| 页面原文 | 真实性质 | 合并字段会怎么错 |
| --- | --- | --- |
| 支持 Plex | capability | 与「Plex 首选」无法区分 |
| 最适合 Plex | recommendation | 升级被静默吞掉 |
| 为个人云而设计 | positioning | 与「能当个人云用」混淆 |
| 比 ZimaBoard 更紧凑、更便宜 | comparative | 缺少依据标记，无法审核 |

四种句子最终都会变成同一条记录，**校对时既不能说它对，也不能说它错**——系统只能报 unknown，审核队列失效。

## scope：Fact 和 Claim 都躲不开的字段

同一个 PDP 上往往同时挂多个 SKU，所以每条记录都要写清楚它管到哪一层：

```text
family / model / variant / bundle / software / edition / page_context
```

具体例子：

| 记录 | scope | 说明 |
| --- | --- | --- |
| `F_ZB2_832_RAM` = 8GB LPDDR5 | variant | 只属于 832 |
| `F_ZB2_1664_RAM` = 16GB LPDDR5 | variant | 只属于 1664 |
| `C_ZB2_PLEX` = can_run Plex | entity | 整个 ZimaBoard 2 型号共用 |
| `C_ZOSP_INCLUDED`（ZimaOS+ 随附） | entity（software_edition） | ZimaOS+ 自己的权益声明 |

**PDP 的 FAQ 通常是 model 级共用的。** 一句写在该 PDP 上的「预装 ZimaOS」，不能自动读成「ZimaBoard 2 832 预装 ZimaOS」——它更可能是 `scope = model`。

## 数据落在哪

| 表 | 存放 | 关键字段 |
| --- | --- | --- |
| Canonical Facts | 一致性事实 | `fact_id` `attribute` `value` `scope` `source` `review_status` |
| Canonical Claims | 主张 | `claim_id` `claim_type` `relation` `object` `condition` `scope` `confidence` `review_status` |
| Page Observations | 页面实际说了什么 | `attribute_or_relation` `observed_value` `source_locator` `comparison_status` |

三张表都存**类型和强度**，而不是一句自然语言。Fact 的比对结果是 `match` / `conflict` / `less_specific` / `scope_mismatch`；Claim 的比对结果是 `compatible` / `conflict` / `stronger_than_canonical` / `unsupported`。

**两套状态值不通用**——这也是分开存的一个直接理由。

## 状态：Canonical 与 Needs Review 不是一回事

本页出现的所有 ZimaBoard 2、ZimaCube 例子，在种子数据里都还是：

```text
status         ai_candidate_needs_human_review
review_status  pending
```

也就是说：**它们是 Candidate，不是已经确认的 Canonical。** 上表的记录用于解释结构，不代表这些主张已经定稿。

已知需要人审的例子：`R001`（ZimaBoard 2 预装 OS 口径与「随附 ZimaOS+」权益之间的关系）属 **Needs Review**；`C_ZBL_AUTOGPT`（Auto-GPT / AI experimentation）的 `confidence` 是 **low**，是被标记为最弱的一档定位主张。

## 结论

1. **Fact 与 Claim 分开，是因为它们的校对逻辑不同**：Fact 对错，Claim 强弱。
2. **Claim 必须记录 `claim_type` + `relation` + `object`**，并且 capability 的 `condition` 不能省。
3. **`can_run Plex` 不得自动升级成 `best_for Plex`**；页面写强了，标记为 `stronger_than_canonical` 交人审，而不是直接判错。
4. **capability 与 recommendation 是两条独立记录**，同一句原文可以同时产生一条弱记录和一条强记录，但不能互相推导。
5. **所有例子当前都是 Needs Review**，把它们当成已确认结论，就是把这套系统最容易出错的地方又犯了一遍。
