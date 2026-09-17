---
title: "Page Observation：页面说了什么，不等于标准答案"
description: "把页面扫描结果单独存成 Observation：它与 Canonical 彻底分离，一个页面可以有 0 / 1 / N 个品牌实体，external entity 只作上下文，Blog 抽出的内容不得反向更新标准知识库。"
order: 7
updated: "2026-09-17"
---

> **Page Observation 记录的是"这个页面实际说了什么"，不是"正确的答案是什么"。** 它和 Canonical Knowledge 是两张表、两条链路：Observation 只能被拿去和 Canonical 比较，永远不能反向写回 Canonical。这条边界一旦破掉，错误信息就会被系统自动"洗白"成标准答案。

## 先讲直觉：为什么不能"抓完直接汇总"

很多人第一反应是这样一条流水线：

```text
5000 Pages
↓
全部抽取
↓
汇总成 Knowledge Base
```

看起来很自然，但它有一个致命问题：**它假设页面上的内容是对的**。

只要有一个页面写错了，这个错误就会被抽出来、汇进知识库，然后被下一个页面引用、被下一个 Agent 当成事实再讲一遍。错误不会消失，它会**扩散**。而且一旦扩散，你已经无法回答一个最基本的问题：

```text
这个值是哪个页面写的？
还是我们内部确认过的？
```

所以正确的模型必须先把两件事拆开：

```text
Canonical Knowledge  = 标准答案（人工确认过）
Page Observation     = 这个页面实际说了什么（只记录，不判断）
```

两者的关系只有一个方向：

```text
Page Observation
        ↓
     Compare          ← 在这一步才产生 Conflict / Match / Needs Review
        ↑
Canonical Knowledge
```

注意箭头：**Observation 流向 Compare，不由 Compare 流回 Canonical。**

## 一句话原理

```text
Observation 是证据，Canonical 是结论。
证据可以推翻结论（进入人工审核），但不能自己变成结论。
```

举个最直观的例子：

```text
Canonical:
ZimaBoard 2 832 RAM = 8GB

页面 A 写了 8GB  → Match
页面 B 写了 16GB → Conflict
```

系统此时该做什么？

- **不该做**：把 16GB 写进知识库，或者把 8GB 改成 16GB；
- **该做**：把"页面 B 说 16GB，和 Canonical 不一致"记进 Needs Review，交给人。

这就是**分离**的全部意义：让系统有能力说"这里不一致"，而不是自己决定谁对。

## 两层结构对照

| 维度 | Canonical Knowledge | Page Observation |
| --- | --- | --- |
| 内容 | 人工确认过的标准答案 | 页面当时实际写了什么 |
| 来源 | 官方来源 + 人工审核 | 任意被抓取的页面 |
| 写入方式 | 审核通过后写入 | 抽取即写入，无需审核 |
| 是否可被引用为答案 | 是 | **否** |
| 出现不一致时 | 保持不动 | 标记 comparison_status，进队列 |
| 谁在上游 | 上游（标准） | 下游（被测对象） |
| 会不会被页面内容改写 | **永不** | — |

一句话记法：**Canonical 是我们要维护的东西，Observation 是我们用来检查它的东西。**

## Observation 不是什么

先把三个常见误解摘掉：

| 误解 | 实际情况 |
| --- | --- |
| "Observation 就是新抽出来的 Fact" | 不是。它只有 `observed_value`，没有 `fact_id`，也不进 Canonical |
| "Observation 会自动修正错误页面" | 不会。它只负责**发现并记录**差异，修改由人决定 |
| "Observation 是训练数据，可以喂回知识库" | 不行。回写等于让页面给自己判卷 |

还有一条容易被忽略的：**观察本身不带"对错"结论**。同一个值，`comparison_status: match` 也只表示"和当前 Canonical 一致"，不表示永久正确——Canonical 以后也可能被人工改。

## 字段结构

### 页面级与实体级

Observation 分两层，字段归属不能混：

```text
page_observation
├─ source_id            页面唯一标识（引用用）
├─ url                  页面地址
├─ page_type            blog | page | pdp | support | other
├─ page_context         页面级上下文（见下一节）
└─ entities[]           0 / 1 / N 个品牌实体
   ├─ entity_id         对齐到的 managed entity
   ├─ entity_status     managed | external_context | new_entity_candidate
   ├─ facts[]           attribute / observed_value / source_locator / comparison_status
   └─ claims[]          relation / object / source_locator / comparison_status
```

一个最小的结构示意：

```json
{
  "source_id": "BLOG_ZB2_AI",
  "page_type": "blog",
  "entities": [
    {
      "entity_id": "zimaboard_2_1664",
      "entity_status": "managed",
      "facts": [
        {
          "attribute": "memory",
          "observed_value": "16GB DDR5",
          "source_locator": "正文内存段落",
          "comparison_status": "conflict"
        }
      ]
    }
  ]
}
```

> 这里的 `comparison_status` 是**观察结论**，不是修改指令。它写 `conflict`，页面本身一个字都没变。

### page-level context 要留什么

实体级字段解决"这个实体在这个页面被怎么写"，页面级字段解决"这个页面的观察在什么条件下成立"。不要把所有东西都塞进实体里：

| 页面级字段 | 作用 |
| --- | --- |
| `source_id` | 所有下游引用都用它，不写完整 URL |
| `page_type` | 决定后续处理方式：PDP 与 Blog 的判定口径不同 |
| `page_context` | 页面性质、适用代际、页面级限定语（例如"针对某型号"） |
| `last_modified` | 时间敏感内容的基础 |
| `content_hash` | 决定下次要不要重新抽取 |
| `observed_at` | 这次观察是什么时候发生的 |

为什么要留 `content_hash` 和 `last_modified`？因为观察是**有保质期的**。页面改了内容却还用旧观察，就会出现"昨天说 8GB、今天页面已经改成 16GB"的幽灵冲突。相关处理不属于本篇。

而 `page_context` 的意义在于防止**跨 Scope 误判**：一个页面整体讲的是某个 Model，其中的 FAQ 段落却只对某个 Variant 成立。只记 `entity + attribute + value` 三个字段，这类问题永远查不出来。

## 一个页面可以有 0 / 1 / N 个品牌实体

这是**正常现象**，不是异常。系统必须能优雅处理三种情况。

| 情况 | 例子 | 系统动作 |
| --- | --- | --- |
| **0 个** 品牌实体 | 一篇讲 RAID 5 是什么的科普页 | `Skip`。不抽取、不建实体、不进队列 |
| **1 个** managed entity | 一个 ZimaBoard 2 的 PDP | 正常记录 Fact / Claim，进入 Compare |
| **N 个** managed entity | 一篇同时讲多个型号的活动页 | 按实体拆开存，各自独立判定 |
| **含 external entity** | 对比类文章里出现第三方产品 | 只作上下文，**skip**，不建完整知识库 |

要点：

- **0 个不等于页面质量有问题**。它只表示这个页面不属于这套治理系统。
- **N 个不等于要合并**。同一个页面里两个实体是两条观察记录，不共享结论。
- **external entity 的边界必须写死**：第三方或竞品产品只作为 Claim 的 `object` 出现、只作为上下文保留，**不建立完整的 canonical 记录**。做竞品知识库是另一个项目，混进来只会让审核队列失去焦点。

### 页面级上下文不是实体事实

这一点最容易出错。同一个 PDP 常常同时售卖多个 SKU，而 FAQ 段落往往是整个 Model 共用的。看这个模式：

```text
某 PDP 的 FAQ: 出厂预装某系统
```

不能自动理解为"只对该页面最小配置成立"。它更可能是：

```text
scope = model     （整个型号共用）
```

所以 Scope 是**必填字段**，候选值至少要覆盖：`family` / `model` / `variant` / `bundle` / `software` / `edition` / `page_context`。少了 Scope，系统就会把型号级结论误配到某个变体上，产出成片的假冲突。

## Observation 必须先对齐实体，再谈比较

抽取出来的值不能直接拿去比。中间有两步是**不可跳过**的：

```text
原文片段
   ↓  ① 对齐实体（这是哪个 entity_id？）
   ↓  ② 记录 scope（这个说法覆盖哪个层级？）
observed_value + scope + comparison_status
```

第 ① 步错了，后面全错。**新出现的产品代际绝不能被硬对到旧代际上**：旧代际的规格和新型号毫无关系，把它们对起来会得到一堆看起来很像冲突、其实完全无关的记录。正确做法是标成新实体候选，交给人工决定要不要新建实体。

## 本轮 Pilot 看到的样子

本轮 7 个页面的观察里，有几个很典型的形态，可以说明"观察"和"结论"为什么要分开：

| 观察到的现象 | 说明什么 |
| --- | --- |
| 同一个 PDP 的规格段落与 FAQ 段落对同一个字段说法不同 | **页面内部就能自相矛盾**，还没到和 Canonical 比就已经不一致了 |
| Shop 侧出现了 Canonical 完全没有的新一代产品 | 这是**覆盖缺口**，不是冲突；新代际不得继承旧代际的事实 |
| 同一个内存说法在产品页是完整写法、在 Blog 里是简写 | 属于**精度 / 术语差异**，不是"值不同" |
| 历史活动文章里的说法与当前页面不一致 | 需要**版本与时效**上下文，不能当永恒事实 |
| Bundle 包含内容与产品硬件规格混在一起 | Scope 不分开，就会制造假冲突 |

这些现象有一个共同点：**它们都是"观察层"的发现**。系统在这里的任务是如实记录 + 分级 + 进队列，**不是当场判定谁对**。

## 红线：Blog 不得反向更新 Canonical

这是整套系统里最硬的一条规则，值得单独写一节。

```text
允许：Page → Observation → Compare → Review Queue
禁止：Page → Observation → Canonical
禁止：Blog Observation → Canonical
```

为什么对 Blog 尤其严格？

| 原因 | 说明 |
| --- | --- |
| 时效性 | Blog 发布时可能正确，今天已经过期 |
| 目的不同 | Blog 为可读性和说服力写作，PDP 为规格准确性写作 |
| 激励不同 | 营销文案天然倾向把"能跑"写成"最适合" |
| 无审核 | Blog 没有规格审核流程 |

所以 Blog 里抽出的内容只有两个去向：**上报为待审项，或者作为页面上下文保留**。它不能成为任何 Canonical Fact 的来源。

还有一条同样硬的推论：**`can_run` 不允许自动升级成 `best_for`**。页面说某产品"可以运行"某个应用，这是一条能力型 Claim；页面说它"最适合"某个场景，这是一条推荐型 Claim。两者是不同的 Claim 类型，系统不得因为措辞更响亮就把它升级成更强的结论。措辞更强时，正确动作是标记为待审，而不是接受它。

## 操作口径

落到执行上，只需要守住四条：

| 编号 | 规则 |
| --- | --- |
| 1 | 一个页面一条 Observation，以 `source_id` 为引用单位，不写完整 URL |
| 2 | 每条观察保留 `source_locator`，抽出来的值必须能回到页面上的具体位置 |
| 3 | `comparison_status` 只能用固定词表，不允许自造状态 |
| 4 | 任何未确认的东西留在 Needs Review，**不得**表述为已确认 |

第 3 条容易被忽视，但它是队列能不能用的前提：如果每个抽取批次都造几个新状态名，审核队列就没法排序、没法统计、没法交接。状态词表固定了，不同人、不同批次看同一份数据，结论才一致。

## 结论

- **Observation 与 Canonical 是两条链路**：Observation 可以被比较，不可以被回写。这是整套系统的地基，破了这条，后面的审核、冲突检测、增量更新全部失去意义。
- **一个页面 0 / 1 / N 个品牌实体都是正常的**：0 个就 skip，N 个就按实体拆开，external entity 只作上下文、不建完整知识库。
- **Scope 是必填字段**，不是可选项；页面级上下文与实体级事实要分开存。
- **每一批抽取都要保留 `source_locator`**，否则审核无法定位，队列等于废纸。
- **Blog 抽出的内容不得反向更新 Canonical**：它只能进待审队列，`can_run` 也不会因为页面写得更响就变成 `best_for`。

下一篇把这个分离好的 Observation 拿去做真正的判定：**一条不一致到底算不算冲突**。
