---
title: "AI Extraction Pipeline：怎么从 PDP 和 Blog 抽 Entity、Fact、Claim"
description: "HTML、JSON-LD、表格、图片四条入口，规则抽取优先，AI 只负责自然语言；source_text、source_locator、scope 与 raw_value 的处理。"
order: 6
updated: "2026-09-17"
---

> 抽取层的目标不是「把网页变成一段通顺的总结」，而是**把网页变成可逐条审核的记录**。所以规则抽取优先，AI 只处理自然语言，并且每一条结果都必须留下 `source_text` 和 `source_locator`。

## 先看一个直觉

把整页 HTML 直接丢给 AI，让它「总结这个产品的规格」，会得到一段很好读的文字。但它回答不了审核者真正要问的三个问题：

```text
这句话是从页面哪个位置来的？       → 需要 source_locator
页面上原话是什么？                 → 需要 source_text
这条说的是一整个型号还是某个 SKU？ → 需要 scope
```

**没有这三个字段，抽取结果就只能当摘要读，不能进审核队列。** 而这套系统的下游全部建立在逐条审核上——所以管线的形状，是被审核需求倒推出来的。

## 抓取与抽取是两层

最容易混淆的一点：

```text
Ingestion Layer（抓取层）    负责把网页拿下来
Extraction Layer（抽取层）   负责把页面变成 Entity / Fact / Claim
```

| 层 | 输入 | 输出 | 换成别的行不行 |
| --- | --- | --- | --- |
| 抓取层 | URL / sitemap / CMS | 干净的 HTML 或 body_text | 可以换，抽取逻辑不受影响 |
| 抽取层 | body_text / structured_data / images | Entity / Fact / Claim | 这是核心，不能省 |

**Firecrawl 不是必需的。** 它属于抓取层，是一个可替换的选项。抓取层的真实优先级是：

```text
CMS / Shopify Export / 内部数据
        >
普通 Python 抓取（sitemap.xml → requests → BeautifulSoup → clean body）
        >
Firecrawl 这类专业抓取工具
```

**如果是自己的站点，能拿到 CMS 或 Shopify 的原始数据，就不要为了「技术感」重新爬一遍网站。** Firecrawl 只在 JS 渲染、复杂页面、自动转 Markdown、批量 Crawl、变化监控这些情况下更划算——它解决的是**拿页面的难度**，不是**读懂页面的难度**。核心永远是这三样：

```text
Canonical Schema + Observation Schema + Comparison Rules
```

## 管线骨架

四条入口分派之后，汇入同一套记录格式，再和 Canonical 逐个字段比对：

```text
Ingestion（页面 + structured_data + images）
   ├─ 规格表 / DOM 节点 ──→ 规则抽取
   ├─ JSON-LD ──────────→ 规则抽取
   ├─ 自然语言正文 / FAQ ─→ AI 抽取
   └─ 图片 / 规格截图 ───→ Vision / OCR
        ↓
   标准化：raw_value → normalized_value，补 scope
        ↓
   挂上 source_id / source_locator / source_text
        ↓
   Page Observation → 与 Canonical 比对 → review_queue
```

**入口可以不同，记录格式必须统一。** 这一点决定了下面四张入口能不能共用一个审核界面。

## 四条入口

| 入口 | 典型位置 | 谁来做 |
| --- | --- | --- |
| HTML / DOM 规格表 | PDP 的 `Specs` 区块、键值对列表 | 规则抽取（依赖选择器） |
| JSON-LD | 页面内嵌的 structured data | 规则抽取 |
| 自然语言正文 / FAQ | `Overview` 段落、`Support` FAQ | AI 抽取（需人审） |
| 图片 / 规格截图 | 规格图、表格截图 | Vision / OCR，须标 `source_type = image` |

**入口选择本身就是一次降级判断。** 能从 DOM 里按选择器读到的值不要交给 AI——AI 只会给它一个「大概率正确」的版本，而规则抽取给的是**原文那个字符串**。

## 规则抽取优先

推荐的输入包（**不要把整页原始 HTML 直接扔给 AI**）：

```json
{
  "source_id": "SHOP_PDP_ZB2",
  "url": "...", "title": "...", "page_type": "pdp",
  "body_text": "...", "structured_data": {}, "images": []
}
```

输出的形状固定为三类，不要自由发挥：

```json
{ "entities": [], "facts": [], "claims": [] }
```

先规则、后 AI 的顺序有一个实际好处：**能被规则读到的字段，天然带 `source_locator`。**

```text
Specs > Model / Memory                                → F_ZB2_832_RAM
Specs > Software > Pre-installed OS                   → F_ZB2_OS
Compare Plans > ZimaOS+                               → F_ZOSP_PRICE
```

这些 locator 不是 AI 编的，是**抽取时从 DOM 路径上带下来的**。相比之下，AI 从 Overview 文案里抽出的主张，locator 只能粗略到小节级（例如 `Overview > Home is Theater`）——这也说明为什么它的 `confidence` 通常只能是 medium。

## Vision / OCR 用在图片规格

```text
Image → Vision / OCR → Evidence Text → Fact / Claim Extraction
```

第一版不一定要单独引入 OCR 工具，多模态模型可以直接处理**图片、表格截图、规格图**。但有三样东西必须保留：`source_type = image`、`image_url`、`evidence_text`。

原因很实际：**审核的人必须知道这条事实来自图片，而不是正文。** 否则正文和图片哪天不一致，没人知道该回头重新读哪一块。## 必须保留 source_text 与 source_locator

## 必须保留 source_text 与 source_locator

抽取结果至少留下四个字段：

```text
source_id / source_section / source_locator / source_text
```

没有 `source_text` 的后果很具体：审核界面上只看到一行 `suitable_for → VM`，**根本不知道 AI 为什么这么抽**。理想的人审表格：

| Type | Entity | Attribute / Relation | Value | Source Text | Action |
| --- | --- | --- | --- | --- | --- |
| Fact | ZB2 832 | RAM | 8GB | 原文 | Approve |
| Claim | ZB2 | suitable_for | Plex | 原文 | Edit |
| Claim | ZB2 | best_for | AI | 原文 | Reject |

动作只需要三个：**Approve / Edit / Reject**。每个动作的对象都是**一条带原文的记录**，而不是一段摘要。

## scope：不写 scope 就等于制造误报

```text
Specs > Model / Memory  → 832 是 8GB LPDDR5，1664 是 16GB LPDDR5
PDP FAQ「预装 ZimaOS」   → 更可能是 scope = model，而不是 832 专用
```

同一页可能同时在卖多个 SKU，而 FAQ 常常是整个型号共用的，所以每条记录都要标清层级：

```text
family / model / variant / bundle / software / edition / page_context
```

| 记录 | scope | 判定依据 |
| --- | --- | --- |
| `F_ZB2_832_RAM` / `F_ZB2_1664_RAM` | variant | 抽自 `Specs > Model / Memory` 的两列 |
| `C_ZB2_PLEX` | entity | 抽自 Overview，整个型号共用 |
| Bundle 内容（Board Only / Starter Bundle） | bundle | 只描述某个 Offer，不是产品属性 |

**Bundle 相关的记录必须和产品型号记录分开。** 否则「Board Only 不含电源适配器」会被拿去和型号级规格对比，直接报一堆假冲突。

## raw_value 与 normalized_value

```text
raw_value          "8GB LPDDR5 4800MHz"
raw_value          "Intel N150; 4 cores; 6M cache; up to 3.60 GHz"
        ↓ 归一化
normalized_value   memory = 8 GB, type = LPDDR5, speed = 4800 MHz
normalized_value   processor_family = Intel Processor N150, cores = 4
```

页面上的字符串是给人读的，不是给程序比对的；同一件事在不同来源上又有不同写法，所以需要第二层。

| | raw_value | normalized_value |
| --- | --- | --- |
| 用途 | 回到原文、支持人工判断 | 做字段级比对 |
| 是否可改 | 不可改，必须与页面一致 | 可重算，规则演进后重跑 |
| 是否保留 | 永远保留 | 永远和 raw 成对保留 |

**只留 normalized_value 的后果是「改了没法回退」**：一旦发现归一化规则写错，原文已经丢了，只能重新抓一遍。所以两个值成对保存是硬要求——它和「raw 用于审核、normalized 用于比较」的分工是同一件事。

## Prompt Schema

给 AI 的输出结构必须是**封闭枚举 + 强制出处**，字段设计如下：

```json
{
  "page": { "source_id": "SHOP_PDP_ZB2", "page_type": "pdp", "title": "..." },
  "entities": [
    { "entity_id": "zimaboard_2",
      "entity_status": "managed | new_entity_candidate | external_context",
      "evidence_text": "..." }
  ],
  "facts": [
    {
      "entity_id": "zimaboard_2_832",
      "attribute": "memory",
      "raw_value": "8GB LPDDR5 4800MHz",
      "normalized_value": { "size_gb": 8, "type": "LPDDR5", "speed_mhz": 4800 },
      "unit": null,
      "scope": "variant",
      "source_locator": "Specs > Model / Memory",
      "source_text": "Memory | 8GB LPDDR5 4800MHz",
      "confidence": "high"
    }
  ],
  "claims": [
    {
      "entity_id": "zimaboard_2",
      "claim_type": "capability",
      "relation": "can_run",
      "object": "Plex",
      "condition": null,
      "scope": "entity",
      "source_locator": "Overview > Home is Theater",
      "source_text": "…页面上那句原话…",
      "confidence": "medium"
    }
  ]
}
```

四条必须写进 Prompt 的约束：

```text
1. attribute / relation / claim_type 只能取给定枚举值
2. 每条记录必须带 source_locator 与 source_text，不许省略
3. scope 必须明确；不确定时标出候选 scope，不要默认成 variant
4. 原文没写的强度不许补：can_run 不得输出成 best_for
```

第 4 条要单独强调。Prompt 里不写这句话，模型很容易把页面上的营销形容「顺手润色」成更强的措辞，而这类升级在审核界面上看起来只是一次正常的抽取。

## LangExtract 是工程增强，不是核心

LangExtract 这类工具解决的是**执行效率**问题：

```text
批量调用 / 重试与限流 / 结果结构校验 / 落成统一格式
```

它**不解决**的是：Canonical Schema 长什么样、Observation 怎么和 Canonical 比对、冲突有哪些状态、人工审核怎么收口。

换句话说：**换掉 LangExtract，这套系统照样成立；换掉 Schema 和比对规则，系统就不成立了。** 所以第一版的技术选型可以非常朴素：

```text
Python + BeautifulSoup + GPT API + JSON
```

5000 个页面的规模，这个组合加一张 SQLite 表就够。**不要为了让抽取「看起来更专业」而先上框架**——真正的风险不在抽取速度，而在抽取结果没有出处、没有 scope、没法审核。

## 结论

1. **抓取层与抽取层是两层**：抓取层可换成 CMS 导出、普通 Python 抓取或 Firecrawl，**Firecrawl 不是必需**；抽取层才是核心。
2. **规则抽取优先**：规格表与 JSON-LD 走规则，AI 只负责自然语言——这样 `source_locator` 是从 DOM 路径带下来的，不是模型编的。
3. **Vision / OCR 服务于图片规格**，但结果必须标记 `source_type = image` 并保留 `evidence_text`。
4. **`source_text`、`source_locator`、`scope` 三者缺一不可**；`scope` 还必须在 model / variant / bundle 之间分清，否则 Bundle 事实会污染型号事实。
5. **`raw_value` 用于回原文、`normalized_value` 用于比对**，必须成对保留，否则归一化规则一改就没有退路。
6. **LangExtract 是工程增强**：它管调用与校验，不管 Schema 与规则。第一版用 Python + BeautifulSoup + GPT API + JSON 就够，**产出永远是 Candidate，不是 Canonical**。
