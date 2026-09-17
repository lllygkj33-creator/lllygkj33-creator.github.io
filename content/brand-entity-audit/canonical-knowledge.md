---
title: "Canonical Knowledge：什么才是品牌的标准答案"
description: "Canonical 不是 AI 抽完就成立的知识库，也不是商城 PDP 的复制品；它由官方来源做种子、AI 只出候选、人审批准，并且必须记录来源与审核状态。"
order: 3
updated: "2026-09-17"
---

> **Canonical Knowledge 是"人工确认过的标准答案"，不是"抽取结果"。** 官方品牌页只是 seed source，PDP 也只是其中一个来源；AI 只产出 Candidate，Approve / Edit / Reject 必须由人完成。**AI 不能直接决定 Canonical Fact / Claim。**

## Canonical 到底在解决什么

先看一个具体处境：

```text
同一个产品，四个地方说它预装什么系统
品牌官网规格页：ZimaOS
商城 Specification：ZimaOS Plus
商城 FAQ：ZimaOS
定价页：所有官方设备都已附带 ZimaOS+
```

这时候系统需要回答的不是"哪句话写得漂亮"，而是"**我们承认的标准答案是什么**"。没有标准答案，比对器就没有基准；而比对一个不存在的基准，只会产出噪音。

所以 Canonical 的作用只有一个：**给全站比对提供一个被确认过的、可追溯的、可修改的基准。**

它必须同时满足三个条件，缺一不可：

| 条件 | 含义 | 缺失后果 |
| --- | --- | --- |
| 被人工确认 | 有人对这条知识的正确性负责 | 基准不可信，冲突无法裁决 |
| 可追溯 | 知道它来自哪个 source_id、哪个 source_locator | 审核时无法判断原始语境 |
| 可修改 | 有明确的状态字段与变更路径 | 知识一旦写进去就再也改不干净 |

## 官方品牌页只是 Seed Source

第一轮建 Canonical 时，最省事的做法是拿官方品牌页当输入。但这里有个必须说清楚的限度：

```text
Official Brand Page / Docs / Manual → Seed Source（种子来源）
                                    → 不是 automatically final truth
```

Seed 材料自己也写得很清楚：官方品牌页是 seed sources，**不是自动成立的最终答案**；冲突保留在 review_queue 里。这意味着拿官方页面抽出来的东西，进入系统时的身份是**候选**，不是标准答案。

为什么不能把官方页直接当真理？因为官方页面之间就会互相冲突。同一个产品的预装系统，品牌官网的规格区和另一个概览区块给出了不同说法；同一份 Support FAQ 与 Specification 列表，对第三方系统的兼容状态描述也不一致。这些都是**同一品牌自有来源之间的内部不一致**。

所以正确表述不是"官网永远对"，而是：**不同字段有不同权威源。**

| 信息类型 | 优先来源 |
| --- | --- |
| 核心硬件规格 | 官方规格页 / Manual / 品牌产品页 |
| 产品定位 | 品牌官网 |
| 当前 SKU / Bundle / Price / Stock | Shop |
| 软件能力 | Docs / Release Notes |
| 当前软件 Edition 权益 | Pricing / Policy |
| 使用场景 | Brand / Shop Claim |
| 实测性能 | First-party Test |
| 用户体验 | Community / UGC，仅作为 Experience Evidence |

**不要写 `官网 > 商城`。** 来源权威是字段级的，不是站点级的。Core hardware 看规格页，当前售卖形态看商城，软件权益看定价页——**同一条知识，在错误的地方找来源，得到的就不是答案。**

## PDP 为什么也不等于绝对真理

PDP（产品详情页）经常被当成"最权威的页面"，因为它是售卖入口、信息最完整。但它有三类固有偏差：

| 偏差 | 表现 | 例子 |
| --- | --- | --- |
| 销售语气强于事实 | 兼容性列表被放宽、能力被拔高 | PDP 列出的 compatible OS 集合明显宽于官方规格页 |
| 页面内部就不一致 | 同一页的规格区与 FAQ 说法不同 | 规格区写 ZimaOS Plus，同页 FAQ 写 ZimaOS |
| 时效性优先 | 营销文案比规格文案更新慢或更快 | 某功能在规格区还标"即将上线"，而软件页已经给出可用入口 |

第一类和第三类偏差，在观测材料里都有明确记录：Shop PDP 列出的兼容系统范围比 Canonical seed 显著更宽，被标记为 `canonical_gap_or_expanded_shop_fact`；某产品页仍保留"未来上线"的说明，而对应的软件页已经把它作为可用功能呈现，被标记为 freshness 待审。

**这三类偏差都不代表 PDP 不可信，而是说明 PDP 是"当前售卖叙事"，不能自动升级成"品牌标准答案"。**

## AI 只抽 Candidate

流程只有五个环节，AI 出现在第二个：

```text
Official Brand Page / Docs / Manual → AI Candidate Extraction → Human Review
→ Approve / Edit / Reject → Canonical Knowledge
```

角色分工必须写死：

```text
AI   = 候选抽取员
人   = 批准人
```

> **AI 不能直接决定 Canonical Fact / Claim。**

为什么这条不能松？因为 AI 抽取有两个系统性倾向，恰好都是知识治理最怕的：

| 倾向 | 后果 |
| --- | --- |
| 把页面原话当成事实 | 页面里的销售措辞被固化成品牌标准 |
| 把措辞强弱抹平 | `can run Plex` 与 `perfect for Plex` 被抽成同一件事 |

第二个问题在 Claim 上尤其危险。`can_run → Plex` 是能力，`best_for → Plex` 是推荐；一个页面把前者写成后者，属于 `stronger_than_canonical`——**不一定是事实错误，但改变了品牌承诺的强度，必须送审**。如果让 AI 直接落库，这种升级会被无声吞掉。

同样地，AI 也不能决定"两个说法谁对"。`ZimaOS` 与 `ZimaOS Plus` 的差异、同一产品兼容列表的宽窄差异，都不是抽取质量问题，而是**需要人来定义的术语与口径问题**。

## 人审做什么：Approve / Edit / Reject

人工审核不是"点一下通过"，它有三种不同性质的动作：

| 动作 | 适用情况 | 结果 |
| --- | --- | --- |
| **Approve** | 抽取准确，来源可靠 | 条目升级为已确认的 Canonical |
| **Edit** | 抽取方向对，但值、Scope 或措辞需要收窄 | 修正后成为 Canonical，保留来源记录 |
| **Reject** | 抽取结果不成立（页面表述不构成事实、Scope 错误、外部实体误入） | 不进入 Canonical，原始观测保留在 Observation |

还有第四类结果，比前三个都重要：**Needs Review —— 判不了，先挂着。**

判不了是常态，不是失败。典型判不了的情况包括：内部术语本身没定义清楚（OS 与 Edition 的关系）、两个官方来源口径不一致（兼容状态）、以及时敏内容的新旧不一致（某功能是否已上线）。

**裁决规则：判不了就不要判。** 保留为待审项、写清需要谁确认什么，远好于让人"拍一个"然后把它当事实固化。

## Canonical 不能被 Blog 自动污染

这是整套流程里最需要守住的一条边界。错误模型长这样：

```text
5000 Pages
↓
全部抽取
↓
直接汇总成 Knowledge Base    ← 错误页面污染知识库
```

正确模型是两个互不覆盖的对象：

```text
Canonical Knowledge  = 标准答案（人工确认）
Page Observation     = 这个页面实际说了什么（原始记录）
```

```text
Page Observation
↓
Compare
↑
Canonical Knowledge
```

方向是不可逆的：

> **页面抽出的结果只能进入 Observation，不得反向自动写回 Canonical。**

为什么？三个原因，每一个都足以致命：

1. **一旦被污染，就没有基准了。** Canonical 的用途是当裁判，裁判不能是当事人。
2. **Blog 措辞天生更强。** 产品相关 Blog 往往比规格页更敢说，自动回写会把营销强度带进标准答案。
3. **历史内容会固化过时事实。** 历史 Blog 保留旧系统名、旧 Bundle、旧 Claim 是正常的，把它当真相会把旧事实写成当前事实。

具体到观测材料里的一个典型：同一块内存，Canonical 与商城 PDP 都用 `LPDDR5 4800MHz`，而一篇产品相关 Blog 写成 `DDR5`。系统的产出应该是**一条待审条目**（属于术语 / 硬件事实冲突），而不是"两条都写进知识库"或"自动改成 Blog 的说法"。

还有一类更隐蔽：新出现的品牌主张。商城 PDP 与 Blog 提出了 Canonical 里没有的 Claim（新的适用场景、新的可运行应用），它们的正确身份是 `new_claim_needs_review`——**进候选队列等人看，不是立即成为标准答案。**

## Source Provenance：来源必须可追溯

AI 抽取结果至少保留四项来源信息，缺一项人工审核就没法做：

```text
source_id
source_section
source_locator
source_text
```

Seed 里的每条事实都遵守了这个格式：

| 事实 | source_id | source_locator |
| --- | --- | --- |
| 预装系统 | SRC_ZB2 | Specs > Software > Pre-installed OS |
| 内存类型 | SRC_ZB2 | Specs > Performance > Memory |
| Plus 授权期限 | SRC_ZOS_PRICE | Compare Plans > ZimaOS+ |
| Plus 授权绑定规则 | SRC_ZOS_PRICE | FAQ > License tied to single device or transferable? |

为什么必须到 `source_locator` 这一级？因为审核人看到的是一条孤立断言：

```text
suitable_for → VM
```

**没有来源，就无法判断这句话的语境**：它写在产品规格里，还是写在某个场景营销段落里？同一页不同区块的权威程度都可能不同。只有定位到具体区块，审核才可能做出判断。

来源记录还有第二个用途：**区分"同源内部矛盾"和"跨源冲突"**。同一条 FAQ 与同一页的规格区互相矛盾（例如第三方系统兼容状态在规格列表里是"兼容"，在 FAQ 里是"仍在测试"），和品牌官网与商城之间的矛盾，是完全不同的问题类型——前者是页面该改，后者可能是术语该定。

## Review Status：状态是必填字段

每一条 Fact / Claim 都要带审核状态，而且**状态必须真实反映审核进度**。整个 Seed 材料的状态是 `status: ai_candidate_needs_human_review`。

也就是说：这批知识**全部是候选**，尚无一条完成人工确认。这不是缺陷，这是准确的状态记录。相应地，治理规则里也写明了晋级路径：`Human-approved items are promoted from ai_candidate to canonical.`

状态语义对照：

| 状态 | 含义 | 允许的下一步 |
| --- | --- | --- |
| `ai_candidate_needs_human_review` | AI 抽取的候选，未经确认 | 人工 Approve / Edit / Reject |
| 已确认的 Canonical | 人工批准的标准答案 | 作为比对基准；变更需重新走审核 |
| `needs_review` / 待审条目 | 判不了，需要特定角色确认 | 确认后才有结论 |
| Conflict / 冲突 | 页面与 Canonical 不一致 | 人工决定改页面还是改知识 |

**最关键的一条纪律：Needs Review 不得被当成已确认。** 在内容里、在报表里、在任何对外表述里，待审项都要明确保留"未确认"标记。把待审项写成结论，比不检测更危险——因为它带着"系统说的"这层权威。

## 用 Seed 的 8 条待审项看这套机制怎么运作

Seed 的 `review_queue` 有 8 条待审项，正好覆盖了 Canonical 会遇到的各类问题：

| 编号 | 严重度 | 议题 | 类型 |
| --- | --- | --- | --- |
| R001 | high | ZimaBoard 2 预装 OS 与 ZimaOS+ 权益 | 术语 / Edition 歧义 |
| R002 | high | 一代 ZimaBoard 的 OS 不一致 | 同源内部矛盾 + 历史镜像 |
| R003 | high | ZimaBlade 的 OS 不一致 | 同上 |
| R004 | medium | ZimaCube 的 ZimaOS 与 ZimaOS+ 具体程度 | 基础 OS 名 vs 付费权益 |
| R005 | high | ZimaCube 的 Unraid 兼容状态 | 同源内部矛盾 |
| R006 | medium | ZimaBoard 存储容量表述 | 总量 vs 增量，或过时文案 |
| R007 | medium | ZimaBoard 2 备份功能上线状态 | 时敏内容新鲜度 |
| R008 | low | ZimaOS Edition 命名归一 | 纯命名，Alias 可解 |

逐条看，能看到四种完全不同的处理方式：

**第一种：术语没定义（R001 / R004）。** 观测到 `ZimaOS` 与 `ZimaOS Plus` 并存。可能解释是——ZimaOS 是 OS family 或基础镜像，ZimaOS+ 是 edition 或 entitlement。行动项是"在 Canonical 批准前先确认内部术语"。**注意这里没有正确答案被写进 Canonical，因为术语本身还没定。**

**第二种：同一来源内部矛盾（R002 / R003 / R005）。** R002 里，规格区写 CasaOS 预装，另一个概览区块写 Linux 预装，而定价页说这些设备已附带 ZimaOS+；三处说法涉及"当时出货镜像"与"当前权益"两件不同的事。R005 里，Specs 把某个第三方系统列进 Compatible OS，而 Support FAQ 说它仍在测试。行动项不是"二选一"，而是"确认当前状态并把两个区块对齐"。

**第三种：口径或新鲜度问题（R006 / R007）。** R006 需要先确认"36TB / 20TB"是总量还是增量、还是过时文案；R007 需要确认某个功能的上线状态，并更新或移除已过时的时间敏感文案。

**第四种：纯命名（R008）。** 定价与 FAQ 混用 `ZimaOS+` 和 `ZimaOS Plus`。行动项很轻：**保留一个 canonical 实体，把另一种拼写当作 alias**——除非品牌有特殊规则。

这 8 条里没有任何一条给出了"正确答案"，但它们给出了**全部该问的问题，以及每一条该由谁确认什么**。这就是 Canonical 机制的真实输出形态。

## 结论

Canonical Knowledge 的可信度不来自"抽取得多全"，而来自**三个可检查的性质**：

```text
1. 来源可追溯   —— 每条知识都能回到 source_id 与 source_locator
2. 状态诚实     —— 候选就是候选，待审就是待审，绝不写成已确认
3. 变更有人负责 —— Approve / Edit / Reject 由人做出，AI 只出候选
```

守住这三条，Canonical 才能当裁判；守不住，它就只是"另一个说法更多的页面"，而且比页面更危险——因为它看起来像权威。
