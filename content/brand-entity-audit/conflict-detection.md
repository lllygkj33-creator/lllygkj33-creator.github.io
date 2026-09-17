---
title: "Conflict Detection：什么才算真正的信息冲突"
description: "逐条解释 match、compatible、less_specific、conflict、scope_mismatch、edition_ambiguity、canonical_gap、new_entity_candidate、stronger_than_canonical、stale_candidate、unknown 十一个状态，并说明为什么不能用字符串比较判定冲突。"
order: 8
updated: "2026-09-17"
---

> **"字符串不一样"不等于"信息冲突"。** 真正要判断的是：两条说法能不能同时成立。这一层如果只做纯字符串比较，你会得到大量假冲突（同一个东西的两种写法）和大量漏报（写得更强、更笼统、已经过期的说法看起来都"差不多"）。所以判定结果必须是一组**语义状态**，而且 Fact 和 Claim 用的是两套不同的状态。

## 先讲直觉：为什么 Match / Error 两档不够用

假设你把所有不一致都标成"Error"，会发生什么？

```text
Canonical: 8GB LPDDR5 4800MHz
页面:      8GB DDR5
→ Error？

Canonical: ZimaOS Plus
页面:      ZimaOS
→ Error？

Shop 出现了 Canonical 里根本没有的新一代产品
→ Error？
```

三种情况被塞进同一个桶里，然后你面对一个三百条的 Error 列表，**无法排序、无法派工、也无法判断哪些是真问题**。第一条可能只是写法简化，第二条可能是产品体系里的基础版本与商业版本关系（完全正常，只是需要统一口径），第三条根本不是错误，而是知识库缺了一块。

所以判定结果至少需要这些档位：

```text
match / compatible / less_specific / conflict / scope_mismatch
edition_ambiguity / canonical_gap / new_entity_candidate
stronger_than_canonical / stale_candidate / unknown
```

它们回答的不是"一不一样"，而是三个更有用的问题：

| 问题 | 对应状态 |
| --- | --- |
| 能不能同时成立？ | `match` / `compatible` / `conflict` |
| 不能同时成立，是因为真的矛盾，还是因为粒度 / 范围 / 版本不同？ | `less_specific` / `scope_mismatch` / `edition_ambiguity` / `stale_candidate` |
| 问题出在页面上，还是出在我们的知识库上？ | `canonical_gap` / `new_entity_candidate` / `stronger_than_canonical` / `unknown` |

第三列是最容易被忽略的：**很多"页面的问题"其实是知识库的问题**。不区分开，你就会一直去改页面，而真正该补的知识库一直空着。

## Fact 与 Claim 用的是两套 comparison_status

这是本篇最重要的一个结构，先讲清楚再逐条解释。

**Fact 管"它是什么"**：处理器、内存、接口、存储、尺寸这类客观规格。比较的是**值**。

**Claim 管"它能做什么、适合什么、品牌怎么说"**：能力声明、推荐场景、对比、定位。比较的是**语义强度**。

所以两套词表不同：

| | Fact（值比较） | Claim（语义比较） |
| --- | --- | --- |
| 完全一致 | `match` | `compatible` |
| 真的互相排斥 | `conflict` | `conflict` |
| 一方更笼统 / 更弱 | `less_specific` | `unsupported`（Canonical 没有这条） |
| 范围错了 | `scope_mismatch` | `scope_mismatch`（同一套 Scope 口径） |
| 页面说得比 Canonical 更强 | 不适用 | `stronger_than_canonical` |
| 需要更多信息才能判 | `unknown` | `unknown` |

关键点：

- **Fact 侧用 `match` 表示"值一致"。** 值层面没有"兼容但不同"这回事——8GB 和 16GB 不可能兼容，它们就是不同。
- **Claim 侧用 `compatible` 而不是 `match`。** 页面说"可以跑 Plex"，Canonical 说"可以跑 Plex"，这是语义兼容；页面的措辞、条件、限定语通常不会一字不差，要求"完全相同"只会制造噪音。
- **`stronger_than_canonical` 只存在于 Claim 侧。** 值不会"更强"，措辞才会：`can_run` 被写成"最适合 / 完美 / 终极"就是这一类。**页面说得更强时，系统不得接受它，也不得把它当成 Canonical 的升级版**——正确动作是标记待审。
- **`unsupported` 是 Claim 侧的"知识库没这条"。** 页面上出现了一条合理的能力或推荐声明，Canonical 里没有对应条目。它不是冲突，是**知识库覆盖不足**。

> 简记：**Fact 比数值，Claim 比语义强度。** 把两套口径混用，`compatible` 会被误当 `match`，`can_run` 会被误升级成 `best_for`。

## 十一个状态总览

下表把每个状态的触发条件、属于哪一侧、以及处理动作放在一起。后面逐条展开。

| 状态 | 什么时候算 | 侧 | 处理动作 |
| --- | --- | --- | --- |
| `match` | 值与 Canonical 一致 | Fact | 记下，不派工 |
| `compatible` | 表述不同、语义兼容 | Claim | 记下，可留作措辞统一素材 |
| `less_specific` | 页面只是更笼统，没写错 | Fact（也见于 Claim 措辞） | 标注，视情况补精度 |
| `conflict` | 两个值不能同时成立 | Fact / Claim | 高优先派工，人工裁定 |
| `scope_mismatch` | 范围（变体 / 型号 / 套装）配错了 | Fact / Claim | 先修对齐关系，再谈值 |
| `edition_ambiguity` | 基础版本与版本 / 权益关系不清 | Fact / Claim | 保留待审，**不得**直接判冲突 |
| `canonical_gap` | 页面出现合理事实，Canonical 未维护 | Fact / Claim | 进知识库补录队列 |
| `new_entity_candidate` | 出现品牌自有新一代产品 | 实体级 | 新建实体候选，**不得**并入旧代际 |
| `stronger_than_canonical` | 页面把"能"写成"最适合 / 完美" | Claim | 保留待审，不升级 Canonical |
| `stale_candidate` | 发布时可能正确，今天已过期 | Fact / Claim | 加时效上下文，走版本审核 |
| `unknown` | 信息不足，无法判定 | Fact / Claim | 进待查队列并写明缺什么 |

## 逐条解释

### match

**什么时候算**：页面写的值与 Canonical 的值一致。

**ZimaSpace 的例子**：ZimaBoard 2 832 页面写的内存值，与 Canonical 里的变体内存事实一致，标为 `match`。同页的板载存储值同样一致。

**怎么处理**：记下，不派工。但要注意：**`match` 只说明和"当前的 Canonical"一致**，不说明这条值永久正确。它是一致性证明，不是质量背书。

### compatible

**什么时候算**：页面说法与 Canonical 表述不同，但语义兼容，可以同时成立。主要出现在 Claim 侧。

**ZimaSpace 的例子**：页面写"可以运行 Plex"，Canonical 里也有对应的能力声明；页面写"适合家庭服务器"，Canonical 的定位声明一致。两边措辞不同，语义不冲突。

**怎么处理**：记为一致，不需要修正页面。同一条 Canonical Claim 在全站有多种写法时可以顺手统一措辞，但那是内容工作，不是冲突处理。

### less_specific

**什么时候算**：页面的说法比 Canonical 更笼统，但**没有写错**。缺的是限定条件、精度或后缀，而不是值。

**ZimaSpace 的例子**：内存写法上，Canonical 与产品页给的是带代际与速率的完整写法，而某个 Blog 里只写了代际名称、省略了速率。供电描述同理：产品页是完整规格，Blog 简化成"某个电压的 USB-C 适配器"。这是**精度降级**，不是"说了另一个值"。

**怎么处理**：标注 `less_specific`，**不要**当成冲突派工。是否补精度取决于页面类型——规格页值得补，正文叙事段可以保留简化写法。

> 关键区分：`less_specific` 是"说得不够细"，`conflict` 是"说了矛盾的另一件事"。把前者报成后者，会淹没真正的冲突。

### conflict

**什么时候算**：两个值**不能同时成立**。通常同一实体、同一属性、同一 Scope，出现了两个互斥的取值。

**ZimaSpace 的例子（跨页）**：同一个产品代际的内存类型，产品页给的是带低功耗代际标识的完整写法，而一篇产品相关 Blog 给的是另一类内存代际名称。这种代际名称的对立在技术上是互斥的，所以是真正的 `conflict`。需要注意的是，本轮这条在待审项里还带着"术语必须精确"的附加确认要求，因此**结论是"存在互斥"，不是"已经确定哪边错"**。

**ZimaSpace 的例子（同页内部）**：一个 PDP 的规格段落写一个值，同一页的 FAQ 段落写另一个值。这同样是 `conflict`，只不过范围是页面内部——**这类冲突和对 Canonical 的比较无关**，是页面自己就不自洽。

**怎么处理**：

| 步骤 | 动作 |
| --- | --- |
| 1 | 进高优先审核队列，标注两侧来源与位置 |
| 2 | 人工核对哪一侧是当前正确口径 |
| 3 | 确认后**分别**处理：修页面 / 修 Canonical，两边都不许自动改 |
| 4 | 改完重新抽取，验证状态转为 `match` 或 `compatible` |

**系统绝不自动修正，也不自动判定谁对。** 冲突状态是"待裁定"，不是"已解决"。

### scope_mismatch

**什么时候算**：值的本身可能都对，但**范围配错了**——把变体级的说法配到了型号上，把套装的内容当成了产品硬件规格，或者反过来。

**ZimaSpace 的例子**：同一个型号下不同变体的内存容量不同，如果把某一条变体事实拿去和型号级说法比较，就会得到"冲突"；实际上两者各自都成立。另一个典型是**套装内容**：某个"仅主板"形式的销售单位明确不含内存与电源适配器，而组合套餐包含更多配套件。把套装内容当产品硬件事实来比，必然产出假冲突。

**怎么处理**：

- 先修**对齐关系**（实体、Scope），再谈值；很多 `scope_mismatch` 在对齐修正后会自动变成 `match`。
- 把套装 / 商业条款类事实与产品硬件事实**分表或分区存放**，不要混在一张比较表里。
- Scope 缺失是这一类问题的根因，所以 Scope 必须是必填字段。

### edition_ambiguity

**什么时候算**：两侧涉及的**不是同一个对象层级**，而是"基础版本"与"版本 / 权益"的关系还没确认。在确认之前，既不能说它们一致，也不能说它们冲突。

**ZimaSpace 的核心案例**：

```text
Canonical（来源：品牌站规格）: ZimaOS
页面（来源：商城规格段）:     ZimaOS Plus
```

这两种写法看起来只是字符串不同，但它的本质可能有三到四种完全不同的解释：

| 可能解释 | 含义 |
| --- | --- |
| 基础系统名 vs 版本名 | 一个是系统家族本身，一个是其中一个版本 |
| 安装镜像 vs 权益 | 机器里装的是基础系统，商业版本是一项随硬件获得的权益 |
| 文案不统一 | 同一件事两种叫法 |
| 真的是两条不同的产品线 | 会话性分歧 |

在品牌内部术语确认之前，**系统必须把它标成 `edition_ambiguity` 并保留在审核队列里**。这就是"不能做纯字符串比较"的最直观体现：

```text
纯字符串比较：   "ZimaOS" ≠ "ZimaOS Plus"  →  报冲突
正确判定：       层级 / 权益关系未确认     →  edition_ambiguity（待审）
```

**同一个页面里也可能出现这种歧义**：规格段落写一种写法、FAQ 段落写另一种写法，而 Canonical 采用的是 FAQ 那一种。这类观察非常值得记录，因为它说明**歧义已经存在于品牌自己的页面里**，不只是页面和知识库之间。

**怎么处理**：

| 步骤 | 动作 |
| --- | --- |
| 1 | 标 `edition_ambiguity`，**不标** `conflict` |
| 2 | 在队列里写明待确认的具体问题（是镜像、是权益、还是文案） |
| 3 | 内部确认术语后，**要么**统一为一个写法并把另一种登记为别名，**要么**拆成两个实体 |
| 4 | 确认前，任何一侧都不许被当作正确答案写进 Canonical |

> 判断口令：**"这两个名字指的会不会是同一件事的两种身份？"** 只要答不上来，它就是 `edition_ambiguity`，不是 `conflict`。

### canonical_gap

**什么时候算**：页面出现了一条**合理的新事实**，而 Canonical 里**根本没有维护这一项**。问题出在知识库的覆盖度，不在页面。

**ZimaSpace 的例子**：某个产品的商城页列出的兼容系统清单，比品牌站 Canonical 里记录的那一条更长，多出了若干项。这不能直接判"页面写错了"——它可能是知识库该扩，也可能是商城措辞把"社区可装"说成了"官方兼容"。

**怎么处理**：标 `canonical_gap`，进**知识库补录**队列（不是页面修正队列），审核问题写成一句话："该扩充 Canonical，还是收敛页面措辞？"确认后按 Source Priority 的字段级规则决定 Canonical 取值。

`canonical_gap` 和 `conflict` 必须分开排队，因为**处理人和动作都不同**：前者是补齐标准，后者是修正错误。

### new_entity_candidate

**什么时候算**：页面出现**品牌自有的新一代产品**，Canonical 里没有这个实体，只有它的上一代。

**ZimaSpace 的例子**：商城出现了新一代机型及其高配版本与创作者套装，而当前 Canonical 里只有上一代机型及其派生版本。这一整组都只能标成 `new_entity_candidate`。

**怎么处理**：新建实体候选，走人工审核后建实体；**绝对不得并入旧代际**——新一代产品的规格与上一代无关，复用旧代际的事实会污染 Canonical，并制造出整片看似有据可查、实际完全错误的"一致性"。新实体的所有事实初始状态都是待审，不得因为"页面写得很详细"就直接置为已确认。这是本轮 Pilot 里最容易做错的一类。判断口令：**"这是新东西，还是旧东西的新说法？"** 分不清就不要合并。

### stronger_than_canonical

**什么时候算**：页面把一条较弱的能力 / 推荐声明**写得更强**。只出现在 Claim 侧。

**ZimaSpace 的例子**：Canonical 只声明 `can_run` 某个应用，页面写成"最适合 / 完美 / 终极选择"；或者 Canonical 只说"支持某种用法"，页面写成"为某种用法而生"。

**怎么处理**：标 `stronger_than_canonical`，保留在待审队列，**不升级 Canonical**（`can_run` 不得自动变成 `best_for`），也不删除页面内容——措辞是否需要收敛是内容侧决策，不是系统决策。这一条保护的是整套系统的可信度：一旦系统接受了更强的措辞，Canonical 会在几轮增量之后被营销语言整体抬高。

### stale_candidate

**什么时候算**：页面的说法在**发布当时可能是正确的**，但现在已经过期。判断依据是页面级上下文——`last_modified`、页面性质、以及页面里带时间感的表述。

**ZimaSpace 的例子**：历史活动文章里的表述仍然沿用当时的系统名称与当时的用法推荐，而当前页面已经不是这个口径。另一个例子是产品页上残留的"即将上线"式前瞻说明，而软件侧页面已经把同一项功能当作可用功能在介绍。这两种都不是谁写错了，而是**时间差**。

**怎么处理**：

- 标 `stale_candidate`，**不要**直接标 `conflict`——它和"现在互相矛盾"是两件不同的事；
- 处理时带上版本与时效上下文：是保留历史、是加更新说明，还是改口径；
- 时间敏感字段应当支持"当时有效"的判定，而不是一律按当前口径判对错。

### unknown

**什么时候算**：信息不足，判不了。典型情形有四类：页面只给了模糊值、没有单位或代际，无法和 Canonical 的值语义对齐；抽取到的片段脱离上下文，不知道 Scope 是型号还是变体；页面本身是广告式表述，分不清属于能力声明还是推荐声明；来源可疑或页面不完整，不足以作为观察依据。

**怎么处理**：标 `unknown`，进待查队列，并在记录里**写明缺少什么信息**。`unknown` 是一个合法且有价值的终态——它比"猜一个状态"诚实得多。**不要为了清空队列把 `unknown` 硬判成 `match` 或 `conflict`。**

## 判定顺序

既然不能做字符串比较，那第一步做什么？顺序很重要，跳步就会产生假冲突：

```text
① 对齐实体
   这是哪个 entity_id？是同一代际吗？不是 → new_entity_candidate，停下
        ↓
② 对齐 Scope
   型号 / 变体 / 套装 / 软件 / 版本 / 页面上下文，两侧在同一层吗？
   不在同一层 → scope_mismatch，先修对齐
        ↓
③ 判断语义
   值一致           → match
   语义兼容         → compatible
   更笼统但不错     → less_specific
   说的是另一个身份 → edition_ambiguity（待审）
   互斥             → conflict
   更简单但更强     → stronger_than_canonical
```

一句话概括：**字符串差异是提示，不是结论。** 它只告诉你"这里值得看一眼"，至于算哪一种状态，取决于实体、Scope 和语义强度三层对齐之后的判断。

## 结论

- **判定结果是状态，不是布尔值。** Match / Error 两档必然失效：它会同时制造假冲突和漏报。
- **Fact 与 Claim 用两套 comparison_status**：Fact 侧 `match` / `conflict` / `less_specific` / `scope_mismatch`，Claim 侧 `compatible` / `conflict` / `stronger_than_canonical` / `unsupported`；`unknown` 两侧共用。
- **不能做纯字符串比较。** 基础系统名与版本名的关系（`edition_ambiguity`）、粒度差异（`less_specific`）、套装范围（`scope_mismatch`）、时间差（`stale_candidate`）在字符串层面长得差不多，语义上完全不同。
- **把"页面的问题"和"知识库的问题"分开排队**：`canonical_gap` / `new_entity_candidate` 要补 Canonical，`conflict` / `scope_mismatch` 要修对齐或修页面。
- **冲突状态是待裁定，不是已解决。** 系统不许自动修正，也不许把 Needs Review 说成已确认；`unknown` 是合法结果。

判定完成之后，接下来要回答的是另一个问题：**一条知识被确认改动以后，怎么快速找出所有引用了它的页面。**
