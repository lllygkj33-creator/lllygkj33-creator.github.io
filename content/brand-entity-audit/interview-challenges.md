---
title: "品牌实体检测常见拷打点与回答"
description: "把品牌实体检测这套系统最容易被追问的 20 个问题逐条摊开：每条给标准回答、边界条件和 ZimaSpace 例子。"
order: 12
updated: "2026-09-17"
---

> 这一页把做这套系统时最容易被追问的 20 个问题连答案一起摊开。每条都先给判断、再给理由，需要时配一个 ZimaSpace 的对照例子，**读者可以直接拿去对齐团队认知或应对评审**——不用临场解释 `Canonical` 和 `Observation` 到底差在哪，也不用现场编一个“官网说了算”的说法。

这一页不引入新的架构主张，只把前面已经成立的判断收束成可以被追问的口径。所有 ZimaSpace 例子都只指到 source_id 级别（例如 `SRC_ZB2`、`SHOP_PDP_ZB2`、`BLOG_ZB2_AI`），不展开页面本身。

## Q1：为什么品牌官网就是标准答案？

**标准回答**：不是。品牌官网只是 Canonical Candidate 的 Seed Source，不是绝对真源。它进入 Canonical 之前仍然要经过人工审核，AI 抽出的只是候选。真正的原则是 **Source Authority depends on Fact Type**：不同字段有不同的优先来源，而不是整站对整站比高低。

所以既不要写“官网永远是标准答案”，也不要写“官网高于商城”这种笼统结论。

| 信息类型 | 优先来源 |
| --- | --- |
| 核心硬件规格 | 官方规格页 / Manual / 品牌产品页 |
| 产品定位 | 品牌官网 |
| 当前 SKU / Bundle / Price / Stock | Shop |
| 软件能力 | Docs / Release Notes |
| 当前软件 Edition 权益 | Pricing / Policy |
| 使用场景 | Brand / Shop Claim |
| 实测性能 | First-party Test |
| 用户体验 | Community / UGC（仅作为 Experience Evidence） |

ZimaSpace 例子：`SRC_ZB2` 的规格页把预装 OS 写成 `ZimaOS`，而 `SRC_ZOS_PRICE` 说官方硬件已经带 `ZimaOS+`。两条都是官网来源，仍然互相需要审核——这正好证伪了“官网就是答案”。

## Q2：为什么 PDP 不能直接当 Truth？

**标准回答**：官方 PDP 自己也可能出错，所以必须区分 Source 与 Canonical。PDP 常见的四类问题是：保留旧文案、FAQ 用泛称、多个 SKU 共用同一段内容、Edition 命名前后不一致。把 PDP 当 Truth，等于把商城的排版习惯直接升级成品牌知识。

更危险的是反向操作：**用 PDP 去覆盖已经人工确认的 Canonical**。Observation 只能和 Canonical 对比，不能回写。

| 问题形态 | 例子 | 正确处理 |
| --- | --- | --- |
| 同一 PDP 两处说法不同 | `SHOP_PDP_ZB2` 规格写 `ZimaOS Plus`，同页 FAQ 写 `ZimaOS` | `intra_page_ambiguity`，保留待审 |
| 旧文案未同步 | 产品页仍留“未来上线”的说明，而 Docs 已可用 | freshness 问题，需人工确认 |
| FAQ 泛称 | Model 级 FAQ 被读成 Variant 专属 | 回到 `scope` 字段判断 |
| SKU 共用内容 | 一段文案同时服务两个 Variant | `scope` 标 model，不标 variant |

## Q3：832 / 1664 算实体吗？

**标准回答**：算，但它们是 Variant，不是和 Model 平级的实体。只要不同 SKU 之间存在真实硬件差异（例如 RAM、Storage、eMMC），就值得记录成独立的 Product Variant。共享规格继承父 Model，这叫 **Parent Inheritance + Variant Override**。

这样做的意义不是“多建几个实体”，而是避免把某个 Variant 的数值误判成整个 Model 的数值。

| 层级 | 记录什么 | ZimaSpace 例子 |
| --- | --- | --- |
| Product Model | 全系共享规格（CPU、LAN、SATA、PCIe） | ZimaBoard 2 |
| Product Variant | 有真实差异的 SKU 级规格 | ZimaBoard 2 832 / ZimaBoard 2 1664 |
| Offer / Bundle | 商业打包内容 | Board Only / Starter Bundle / NAS Kit |

Pilot 里 `SHOP_PDP_ZB2` 两个 Variant 的 memory 与 onboard_storage 都与 Canonical 一致，父 Model 的 CPU 与接口也与 Variant 各自匹配——这正是 `scope` 分对了才不会产生误报。

## Q4：Mini NAS Kit / Firewall Kit 也算产品实体吗？

**标准回答**：第一版按 **Offer / Bundle** 管理，不和核心 Product Model 同级。理由是 Bundle 描述的是“这一单卖给你什么”，不是“这块硬件是什么”。一旦同级，配件信息就会覆盖产品硬件事实，制造出大量假冲突。

规则很简单：**Bundle 必须有独立 Scope**，它的事实只能和其他 Bundle Fact 比，不能和 Model Fact 比。

| 事实 | 正确 Scope | 错误理解 |
| --- | --- | --- |
| Board Only 不含 RAM / Power Adapter | bundle | ZimaBlade 硬件不支持内存 |
| Starter Bundle 含更多配件 | bundle | 产品标配变了 |
| NAS Kit 里的机器预装 CasaOS | bundle / page_context | 所有 ZimaBlade 都预装 CasaOS |

Pilot 里 `SHOP_PDP_ZBL` 的 `board_only_bundle` 被标成 `new_commercial_fact_needs_review`，而 Model 级的 memory_expandability 仍与 Canonical `match`——两件事分开之后，谁也没污染谁。

## Q5：Home Server 算实体吗？

**标准回答**：MVP 不需要。它可以先作为 **Scenario / Claim Object** 存在，而不是一个需要维护 Fact 的 Entity。理由是要控制实体爆炸：一旦把泛概念实体化，就会有人要求补充它的规格、兼容性、版本历史，而这些东西并不属于品牌自有知识。

判断标准是：**这个对象需不需要品牌来定义它“是什么”**。不需要，就只当 Claim 的宾语。

| 对象 | MVP 处理 | 例子 |
| --- | --- | --- |
| ZimaBoard 2 | 受管 Entity | 有 Fact，有 Claim |
| Home Server | Scenario / Claim Object | `suitable_for` → home server |
| Raspberry Pi | External Entity（仅作 Claim Object） | `more_powerful_and_flexible_than` → Raspberry Pi |
| Plex | External Entity（仅作 Claim Object） | `can_run` → Plex |

ZimaSpace 例子：Canonical 里记录 `suitable_for` → home server 这条 recommendation，但不为 Home Server 建规格表。

## Q6：竞争对手实体为什么不维护？

**标准回答**：因为第一版的目标是品牌自有知识的一致性，不是全互联网产品知识库。外部实体只允许两种处理：**Context Mention** 和 **Claim Object**。这是系统边界，也是成本边界。

具体到 ZimaSpace：`ZimaBoard 2` 说 `more_powerful_and_flexible_than` → Raspberry Pi，这条可以记录，因为它是品牌自己发布的 comparative Claim。但不要为了这一句话去维护 Raspberry Pi 5 的 CPU、RAM、Ports、Variants、Release Dates。

| 允许 | 不允许 |
| --- | --- |
| 记录品牌自己的比较性 Claim | 给竞争对手建 Canonical Entity 和 Fact 表 |
| 把外部实体当 Claim 宾语 | 维护对手的规格、价格、版本 |
| 在 Observation 里识别为外部提及 | 对对手实体跑一致性审计 |

一句话边界：**Our Truth + Our Claims，而不是 The Entire World's Truth。**

## Q7：Blog 抽出的 Fact 为什么不能直接写回知识库？

**标准回答**：因为 Blog 可能本来就是错的——它写的是“这个页面实际说了什么”，不是“事实是什么”。因此 Blog 抽取结果只能进入 **Observation**，必须和 Canonical 对比之后才能谈对错。系统不提供从页面反向自动写回 Canonical 的路径，这是设计要求不是实现妥协。

| | Canonical Knowledge | Page Observation |
| --- | --- | --- |
| 含义 | 人工确认的标准答案 | 这个页面实际说了什么 |
| 来源 | 官方来源 + 人工 Review | 任意页面抽取结果 |
| 可否回写对方 | 不因页面而改变 | 不能回写 Canonical |
| 状态字段 | `review_status` | `comparison_status` |

ZimaSpace 例子：Canonical 与 `SHOP_PDP_ZB2` 都说 ZimaBoard 2 1664 是 `16GB LPDDR5 4800MHz`，而 `BLOG_ZB2_AI` 写 `16GB DDR5`。正确结论是这条 Blog Observation 与 Canonical 存在 `terminology_conflict`，而不是“Blog 更新了硬件事实”。

## Q8：AI 会不会把营销语言抽得太强？

**标准回答**：会，而且要按它会来设计。所以 Claim 必须限制 **Relation 白名单**，并强制保留 `source_text`。最关键的一条规则是：**`can_run` 不能自动升级成 `best_for`**。

页面把“能跑”写成“完美适合”，不一定是事实错误，但它属于 `stronger_than_canonical`，必须进审核队列而不是静默通过。

| Relation | 含义 | 是否可自动升级 |
| --- | --- | --- |
| `can_run` | 能运行 | 否 |
| `suitable_for` | 适合 | 否 |
| `best_for` | 最佳选择 | 否，必须人工确认 |
| `supports` | 支持某能力 | 否 |

配套机制：`claim_type` 至少区分 capability / recommendation / positioning / comparative / policy，避免把定位句当成能力句，也避免把政策句（例如许可与订阅）当成营销形容词。

## Q9：ZimaOS 和 ZimaOS Plus 字符串不同就是冲突吗？

**标准回答**：不是。字符串不同只是起点，必须先检查 **alias、parent/child、edition、scope、version、specificity** 六个维度，再决定最终状态。多数情况下它是 `edition_ambiguity` 或 `less_specific`，而不是 `conflict`。

这也是本系统最典型的价值点：纯字符串比较会把它判成错误，而正确做法是保留为待审核歧义。

| 检查项 | 问的问题 | 结果可能 |
| --- | --- | --- |
| alias | 是不是同一实体的不同拼写？ | 归入 aliases |
| parent / child | 是不是基础系统与 Edition 的父子关系？ | `edition_ambiguity` |
| edition | Plus 是 Edition 还是 License entitlement？ | `edition_ambiguity` |
| scope | 说的是 Model 级还是 Bundle 级？ | `scope_mismatch` |
| version | 是不是历史版本说法？ | `stale_candidate` |
| specificity | 是不是粒度不同？ | `less_specific` |

ZimaSpace 例子：`SHOP_R001` 是 `intra_page_ambiguity`——同一 PDP 的规格区写 `ZimaOS Plus`、FAQ 写 `ZimaOS`，Canonical seed 写 `ZimaOS`。要人工确认的是四件事：ZimaOS 是 OS family 吗、ZimaOS Plus 是 Edition 吗、Plus 是 License entitlement 吗、`pre-installed` 指系统镜像还是权益激活。注意 `ZimaOS+` 与 `ZimaOS Plus` 这种纯拼写差异，规范做法是保留一个 Canonical Entity、另一个进 aliases。

## Q10：图片里的规格怎么办？

**标准回答**：走 Vision / OCR 抽 `evidence_text`，再进入同一套 Fact / Claim Pipeline，不给图片单独开一套逻辑。但必须保留 **source_type = image**、`image_url` 和 `evidence_text`，否则人工审核时根本不知道这条事实来自图片还是正文。

第一版不一定需要单独上 OCR 工具，多模态模型可以直接读规格图与表格截图；流程本身不变。

| 环节 | 产物 | 必须保留 |
| --- | --- | --- |
| 图片 | 原始图片 | `image_url` |
| Vision / OCR | evidence_text | `source_type = image` |
| Extraction | Fact / Claim Candidate | `source_locator`、置信度 |
| Review | Approve / Edit / Reject | 审核结论与时间 |

ZimaSpace Pilot 的范围内没有图片类来源，所以这一条目前是**机制要求而非已验证发现**：架构上预留，案例上不虚构。

## Q11：为什么还需要爬虫？

**标准回答**：因为 **AI 负责理解，Crawler 负责稳定获取页面**，两者是不同层。Crawler 属于 Ingestion Layer，它不参与判断谁对，只负责把页面内容稳定、可重复地拿下来。没有稳定的取数层，抽取结果就无法复现，也谈不上增量。

| 层 | 职责 | 不负责 |
| --- | --- | --- |
| Ingestion（Crawler / Export） | 拿到页面与结构化数据 | 判断事实对错 |
| Extraction（规则 + AI） | 产出 Entity / Fact / Claim Candidate | 决定 Canonical |
| Comparison | 对比 Observation 与 Canonical | 自动修页面 |
| Review | 人工 Approve / Edit / Reject | 批量静默通过 |

核心是 Canonical Schema + Observation Schema + Comparison Rules；抓取工具随时可换。

## Q12：一定要 Firecrawl 吗？

**标准回答**：不一定。优先级是：**CMS / Shopify Export / 内部数据 > 普通 Python 抓取 > Firecrawl 这类专业抓取工具**。自己的站能拿到原始数据，就不要为了“技术感”重新爬网站。

Firecrawl 适合的是 JS 渲染、复杂页面、自动转 Markdown、批量 Crawl、变化监控这些场景；它不是核心。

| 场景 | 建议做法 |
| --- | --- |
| 自有 Shop | Shopify Export / CMS 原始数据 |
| 普通 HTML 站 | `sitemap.xml` → requests → BeautifulSoup → clean body |
| JS 渲染 / 复杂批量 | Firecrawl 等专业工具 |
| 已有内部数据源 | 直接读，不爬 |

## Q13：一定要图数据库吗？

**标准回答**：5000 页面完全不用。**SQLite 就能完成 Page → Fact / Claim 的依赖反查**，也就是“这个知识变化会影响哪些 URL”。只有真正出现大量多跳复杂关系、且需要复杂图查询时，才考虑 Neo4j 这类图数据库。

| 判断维度 | MVP 现状 | 结论 |
| --- | --- | --- |
| 页面规模 | 约 5000 | SQLite 足够 |
| 受管实体 | 20–50 | 表之间关系浅 |
| Canonical Fact / Claim | 几百条 | 一次查询可覆盖 |
| 查询形态 | 按 fact_id / claim_id 反查 url | SQL 即可 |

一句 SQL 就能回答核心问题：`SELECT url FROM page_facts WHERE fact_id = 'F_ZB2_832_RAM';` 拿到受影响 URL，这就是 Dependency-based Incremental QA。真正值得升级的信号是关系形态变了：Entity → Variant、Claim → Source、Page → Claim、Author → Topic、Version → Compatibility 同时需要多跳查询。

一句话：**先用 JSON + SQLite 把流程跑通，再考虑知识图谱和图数据库。**

## Q14：5000 页面每天都重新 AI 抽一次吗？

**标准回答**：不需要。每次抓取保存 `url`、`last_modified`、`content_hash`，只有变化页面才重新抽取。`content_hash` 没变就 Skip，变了才 Re-extract。这直接把 AI 成本从“页面总数”降到“当天变化数”。

| 情况 | 动作 |
| --- | --- |
| `content_hash` 未变 | Skip，沿用已有 Observation |
| `content_hash` 变化 | Re-extract，重跑对比 |
| `last_modified` 变化但正文未变 | 按 hash 判定，不重复抽 |
| 模板结构变化 | 触发 `template_version` 相关检查 |

| 阶段 | 覆盖范围 |
| --- | --- |
| 首次 | 全量抓取并建立 Observation |
| 之后 | 只处理变化页面 |
| 补充 | 高风险页面 + 随机样本 + 最近更新 + 异常页面的抽样 QA |

抽样 QA 存在的原因必须说清：增量扫描只看变化，无法发现“一直没变但一直错”的页面。

## Q15：旧 Blog 写的是当时正确的信息怎么办？

**标准回答**：不能一律判错。需要 **freshness / version 语义**：旧文章的事实可能在发布时是对的，今天只是过期。MVP 先用 `stale_candidate` 表达这种状态，成熟后再引入 `valid_from`、`valid_to`、`version`、`freshness_status`。

把“过期”和“错误”区分开，是整个系统可信度的前提之一。

| 状态 | 含义 | MVP 处理 |
| --- | --- | --- |
| `conflict` | 两个值不能同时成立 | 进审核队列 |
| `stale_candidate` | 可能曾经正确、今天过期 | 标注 freshness，不当错误 |
| `new_claim_needs_review` | 页面出现 Canonical 未维护的新主张 | 待审核 |
| `match` | 与 Canonical 一致 | 无需动作 |

ZimaSpace 例子：Canonical seed 的 `R002` / `R003` 记录 ZimaBoard 与 ZimaBlade 的历史预装系统说明与当前 Shipping image 不一致，正确处理是确认“历史说法 vs 当前出货镜像”，而不是把旧说明判成错误。Pilot 里 `BLOG_MEMBER_DAY_2025` 的历史主张被标为 historical、需要 freshness 检查，同理。

## Q16：新产品出现了怎么办？

**标准回答**：如果它不存在于 Canonical，就标记 `new_entity_candidate`，并**绝对禁止继承旧一代产品的事实**。这一条不能靠“看起来像”来放宽：新一代产品的 CPU、内存、供电等都需要独立来源。

继承是这套系统最容易造成严重误报的动作，因为它会把错误数据伪装成有出处的数据。

| 步骤 | 动作 |
| --- | --- |
| 检测 | Shop 出现 Canonical 中没有的实体 |
| 标记 | `new_entity_candidate` / `canonical_gap` |
| 禁止 | 复用上一代事实作为兜底 |
| 补齐 | 从官方来源重新抽取并人工审核 |

ZimaSpace 例子：`SHOP_R002` 显示 Shop 已有 ZimaCube 2 / Pro / Creator Pack，而当前 Canonical 只覆盖第一代。正确动作是把 ZimaCube 2 作为新世代加入，并且明确不复用第一代 ZimaCube 的 Canonical Fact。

## Q17：一个页面没有任何品牌实体怎么办？

**标准回答**：Skip。这个系统不是全站内容质量评分器，只治理品牌实体一致性。一个页面没有受管实体，不代表它质量有问题，只代表它不属于这套治理范围。

这条边界必须守住，否则系统会被拉去做它没被设计去做的事。

| 页面 | 识别结果 | 处理 |
| --- | --- | --- |
| 纯技术科普、无品牌实体 | 0 个受管实体 | Skip |
| 只提到外部产品 | 0 个受管实体 | Skip |
| 品牌实体 + 外部对比对象 | 1 个受管实体 | 只治理受管实体 |
| 多个品牌实体 | N 个受管实体 | 逐个建 Observation |

## Q18：一个页面有多个品牌实体怎么办？

**标准回答**：每个实体分别建立 Observation，并保存各自的 Fact / Claim Dependency。不要把一页合成一条记录，否则一个知识变化就无法精确定位受影响范围。

| 页面 | 实体 | 依赖记录 |
| --- | --- | --- |
| 对比或合集类页面 | ZimaBoard 2 | 该页依赖 ZimaBoard 2 的哪些 Fact / Claim |
| 同一页面 | ZimaBlade 7700 | 该页依赖 ZimaBlade 7700 的哪些 Claim |

ZimaSpace 例子：`BLOG_MEMBER_DAY_2025` 一页同时涉及 ZimaBlade 3760、ZimaBlade 7700、ZimaBoard 2、ZimaCube。按实体拆分之后，“ZimaBoard 2 预装 OS 说法要改”只会命中真正依赖它的页面，不会把整页打包成一条模糊记录。

## Q19：同一 PDP 内部自己矛盾怎么办？

**标准回答**：可以直接形成 `intra_page_ambiguity`。这是本系统非常重要的价值：**不必等跨站比较之后才发现问题**。同一页面内部前后不一致，本身就说明品牌对外口径需要澄清。

| 对比类型 | 发现难度 | 例子 |
| --- | --- | --- |
| Intra-page Ambiguity | 单页即可发现 | 同页规格区与 FAQ 的 OS 命名不一致 |
| Cross-site Conflict | 需要 Canonical | Shop 与品牌页对同一字段说法不同 |
| Cross-page Conflict | 需要多页面 | PDP 与相关 Blog 的硬件术语不同 |

ZimaSpace 例子：`SHOP_R001` 在 ZimaBoard 2 的 PDP 内部就抓到了 `preinstalled_os` 的歧义——规格区 `ZimaOS Plus`、FAQ `ZimaOS`。这条不需要任何跨站数据就能成立，也说明审计不必等到全站扫完才有产出。

## Q20：这套系统是不是知识图谱？

**标准回答**：可以逐步演进成知识图谱，但 **MVP 本质是 Canonical Table + Observation Table + Dependency Index**。把它叫知识图谱不会让它更准，只会让人误以为必须先上图数据库和 GraphRAG。

建议的表述方式是分层，而不是一刀切。

| 阶段 | 形态 | 技术 |
| --- | --- | --- |
| MVP | 三张核心表 + 依赖索引 | JSON + SQLite |
| 中期 | 版本图、来源溯源、覆盖率视图 | 仍可在关系库内实现 |
| 成熟后 | 多跳关系查询、复杂溯源 | 才轮到 Neo4j / GraphRAG / OpenSPG 这类方案 |

**不要为了术语而过度工程化。** 判断升级时机的依据是查询形态，不是听起来先进不先进。

## 一句话总结

- **Canonical 是人工确认的标准答案，Page Observation 只是页面实际说了什么**，两者绝不互相自动写回。
- **Fact 管“它是什么”，Claim 管“它能做什么、适合什么、品牌怎么说”**，`can_run` 不得自动升级成 `best_for`。
- **Variant、Bundle、Edition、历史版本必须先分 Scope**，否则系统一定会制造大量误报。
- **官网只是 Seed Source，PDP 不是 Truth，外部实体只当 Claim Object**，这三条决定了系统的边界。
- **5000 页面用 JSON + SQLite + `content_hash` 增量就够**，图数据库和全量重抽都是以后的事。
