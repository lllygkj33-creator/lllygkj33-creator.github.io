---
title: "ZimaSpace Pilot：Brand Site、Shop PDP 与 Blog 的实体一致性测试"
description: "ZimaSpace Pilot 的真实发现：7 个页面（3 PDP + 4 Blog）、15 个 Canonical 实体、6 条 review_queue 全记录，含 ZimaBoard 2 OS 歧义、ZimaCube 2 新实体候选、LPDDR5 与 DDR5 术语冲突、Bundle scope 与历史 Blog freshness 六个核心案例。"
order: 13
updated: "2026-09-17"
---

> 这一轮 Pilot 证明的不是"ZimaSpace 品牌已经一致"，而是**这套流程能从真实页面里跑出可复核的发现**：7 个页面里出现了 **1 条页内自相矛盾**、**1 个不在 Canonical Seed 里的新实体**、**2 条跨页硬件术语冲突**、**1 个必须单独 scope 的 Bundle 事实**、**1 组需要时间上下文的历史 Claim**。**6 条检测结果全部停在 Needs Review**，没有任何一条经过人工确认；本页所有事实都只来自两份 JSON。

## 这一轮 Pilot 是什么

Pilot 的性质是 **Observation（页面观测）**，不是 **Canonical（标准答案）**。

```text
品牌站（Brand Site）说过的            → Canonical Seed
商城（Shop）与产品强相关 Blog 实际写了什么 → Page Observation
两者对不上的地方                       → review_queue（待人工审核）
```

本轮规模：**7 个页面**（3 PDP + 4 Blog），Canonical 侧 **15 个实体 / 82 条 Fact / 47 条 Claim**，推出 **3 个新实体候选**，**6 条**进入 review_queue，**人工确认 0 条**。

两边的数据不混写：Canonical 是 `ai_candidate_needs_human_review` 状态的种子，Observation 是"页面实际说了什么"的记录，Observation **不得覆盖** Canonical。

## 处理页面范围

每个页面一个 `source_id`（本页一律用 source_id 指代来源，不写完整地址）。

| source_id | 类型 | 覆盖实体 | 备注 |
| --- | --- | --- | --- |
| SHOP_PDP_ZC2 | PDP | zimacube_2、zimacube_2_pro、zimacube_2_creator_pack | 1 个 entity scope + 2 个 variant scope |
| SHOP_PDP_ZB2 | PDP | zimaboard_2、zimaboard_2_832、zimaboard_2_1664 | 本页出现页内歧义（Case 1） |
| SHOP_PDP_ZBL | PDP | zimablade、zimablade_3760、zimablade_7700 | 本页出现 Bundle 事实（Case 5） |
| BLOG_ZC2_STANDARD | Blog | zimacube_2 | 与 PDP 跨页冲突（Case 3） |
| BLOG_ZB2_AI | Blog | zimaboard_2_1664、zimaboard_2 | 与 PDP 术语冲突（Case 4） |
| BLOG_ZBL_7700 | Blog | zimablade_7700、zimablade | 多为父实体事实在 Variant 层的复述 |
| BLOG_MEMBER_DAY_2025 | Blog | zimablade_3760、zimablade_7700、zimaboard_2、zimacube | `freshness: historical_sample`（Case 6） |

**重复 URL 的处理**：ZimaBoard 2 的 PDP 地址在输入里出现了两次。Pilot 层按 **page identity 去重，只处理一次**（`duplicate_user_url_ignored`: *The ZimaBoard 2 PDP URL was supplied twice; it was processed once.*），所以 PDP 计数是 **3 而不是 4**，这个页面也只产出**一份** Observation、一次候选冲突——它是后面所有计数的前提，不去重会重复计一次冲突，更麻烦的是同一页面抽两次会产出两条内容与地址都相同的 Observation，人工审核无法判断它们是**两个独立证据**还是**同一个证据的重复**。页面级去重必须在写库之前做。

**页面类型分布**：本轮 Blog 全部落在 Shop 站的 campaign hub 路径下，属于**产品强相关 Blog**——既是页面自述，也是跨页硬件事实验证的来源（Case 3、Case 4 由此产生）。

## 已有的 Canonical Entity

Canonical Seed 里 15 个实体，本轮**涉及或对照到** 11 个。

| entity_id | canonical_name | 类型 | 本轮来源 |
| --- | --- | --- | --- |
| zimaboard_2 | ZimaBoard 2 | product_model | SHOP_PDP_ZB2、BLOG_ZB2_AI、BLOG_MEMBER_DAY_2025 |
| zimaboard_2_832 / _1664 | ZimaBoard 2 832 / 1664 | product_variant | SHOP_PDP_ZB2（1664 另有 BLOG_ZB2_AI） |
| zimablade | ZimaBlade | product_model | SHOP_PDP_ZBL、BLOG_ZBL_7700 |
| zimablade_3760 / _7700 | ZimaBlade 3760 / 7700 | product_variant | SHOP_PDP_ZBL、BLOG_ZBL_7700、BLOG_MEMBER_DAY_2025 |
| zimacube | ZimaCube | product_model | 仅作对照（BLOG_MEMBER_DAY_2025） |
| zimacube_pro / _creator_pack | ZimaCube Pro / Pro Creator Pack (10 Core) | product_variant / bundle_or_variant | 仅作对照（Shop 出现的是 ZimaCube 2 Pro） |
| zimaos | ZimaOS | software | OS 命名的对照实体 |
| zimaos_plus | ZimaOS+ | software_edition | Edition 层的对照实体 |

分类本身就是判断依据：**product_model** 是成品型号，Fact 描述"这台机器是什么"（ZimaBoard 2、ZimaBlade、ZimaCube 在这一层）；**product_variant** 是同型号下的档位，832 / 1664 / 3760 / 7700 的 Fact 挂在 **variant scope**，不覆盖父型号；**software** 指软件实体，ZimaOS 的 Fact（架构、RAID 模式、免费版上限）不随某个硬件型号走；**bundle_or_variant** 这层也已被种子承认——Creator Pack 就单独标成 `bundle_or_variant`，说明"打包"与"档位"不是一回事（对应 Case 5）。

**software_edition** 这一层是 Case 1 的根源：**ZimaOS+**（别名 `ZimaOS Plus`、`ZimaOS+`）的 Fact 是价格 29、Lifetime 授权、无限磁盘/用户、单设备绑定、满一年后可转移；Claim 里有一条 `included_with`，对象是 ZimaBoard / ZimaBoard 2 / ZimaCube lineup / ZimaBlade。

**ZimaCube 与 ZimaCube 2 必须分开看**：Canonical 只有第一代 `ZimaCube` / `ZimaCube Pro` / `ZimaCube Pro Creator Pack`，**没有 ZimaCube 2**。上表 zimacube 一行是"对照"，不是"匹配"。

## Shop 出现的新实体候选

标为 `new_entity_candidate` 的实体有三个，全部来自 SHOP_PDP_ZC2。

| entity_id | scope | Shop 侧观测（片段） |
| --- | --- | --- |
| zimacube_2 | entity | Intel Core i3-1215U；8GB LPDDR5 4800MHz；256GB NVMe SSD；2x 2.5GbE；6x SATA3；240 x 221 x 220 mm；19V 13A 247W |
| zimacube_2_pro | variant | Intel Core i5-1235U；16GB LPDDR5 4800MHz；2x 2.5GbE + 1x 10GbE |
| zimacube_2_creator_pack | variant | Intel Core i5-1235U；NVIDIA RTX PRO 2000；64GB LPDDR5 4800MHz；1TB NVMe SSD |

这三个实体的**每一条** Fact 与 Claim 的 `comparison_status` 都是 `canonical_entity_missing`——不是"冲突"，而是"Canonical 里没有这个实体可以比"。

```text
zimacube（第一代，Canonical 有）
  CPU = 12th Gen Intel N100 ／ RAM = 8GB DDR4 3200 MT/s ／ Power = 19V 11.58A 220W

zimacube_2（Shop 观测，Canonical 没有）
  processor = Intel Core i3-1215U ／ memory = 8GB LPDDR5 4800MHz ／ power = 19V 13A 247W

→ CPU 平台不同、内存代际不同、电源不同：名字相近 ≠ 同一实体
→ 把上一代 facts 继承给新一代 = 用旧知识替新页面发言
```

这里有一组**看起来相同、实际不能混用**的对照：两代都是 6 bay、都是 240 x 221 x 220 mm、都是双 2.5GbE。这种"部分重合"最容易让人放松警惕，以为"就是同一台机器换了个名字"，顺手复制第一代的原生 Fact。正确做法是让每一项观测都留在 ZimaCube 2 **自己的候选记录**里等人工确认，而不是"借"第一代的值。对应 review：**SHOP_R002**。

## 六个核心案例

### Case 1：ZimaBoard 2 的 OS 命名——ZimaOS 还是 ZimaOS Plus（保留为待审歧义）

**观测到的现象**：同一个 SHOP_PDP_ZB2 页面内部，两个区块口径不一致。

该 Fact 的 `canonical_ref` 是 `F_ZB2_OS`，观测状态是 `conflict_or_edition_ambiguity`：**同一字段、同一页面、两个值**，再加上品牌站 Canonical 自己也只给出 ZimaOS。

**为什么它算问题 / 算什么状态**：把它判成 Error 是最糟的处理方式，因为 Canonical 侧本来就有一条待审项——品牌站规格页写 pre-installed OS 是 ZimaOS，定价页却说包括 ZimaBoard 2 在内的官方硬件**已经带 ZimaOS+**，品牌站自己也没把这事说清。正确状态是 **`edition_ambiguity`**：页内先自相矛盾（Specification vs FAQ），再叠加 Canonical 的 Edition 层不确定性。四个必须人工回答的问题：ZimaOS 是 **OS family** 吗？ZimaOS Plus 是 **Edition** 吗？Plus 是 **License entitlement** 吗？"pre-installed" 指**随机器烧录的镜像**还是**权益激活**？

**正确处置动作**：保留为待审歧义，**不合并两个字符串**、不改写任何页面措辞；在 review_queue 里挂 **SHOP_R001**（high / `intra_page_ambiguity` / field `preinstalled_os`），并关联 Canonical 的 R001、R004、R008（R008 已确认：定价与 FAQ 同时使用 `ZimaOS+` 与 `ZimaOS Plus` 两种拼写，应保留一个 Canonical 实体、另一种作为 alias）；人工先定清"family / edition / entitlement / 镜像"四个层次，再回头统一 Shop 的两个区块。

### Case 2：ZimaCube 2 不在 Canonical Seed

**观测到的现象**：Canonical 只有第一代 `ZimaCube` / `ZimaCube Pro` / `ZimaCube Pro Creator Pack (10 Core)`，Shop 侧已出现 `ZimaCube 2` / `ZimaCube 2 Pro` / `ZimaCube 2 Creator Pack`，3 个实体的每条观测都是 `canonical_entity_missing`。

**为什么它算问题 / 算什么状态**：这是 **`canonical_gap`** 里最重的一种——不是某个字段缺，而是**整个实体缺**。后果有两个：新一代产品的所有页面都拿不到对照基准；系统有强烈的"就近映射"倾向，会把 `ZimaCube 2` 挂到 `zimacube` 上，于是第一代的 DDR4、220W、N100 就成了第二代的"事实"。状态是 **`new_entity_candidate`**，实体记录只含三件事：**已观测、待确认、禁止继承**。

**正确处置动作**：不合并、不映射、不继承——`ZimaCube` 与 `ZimaCube 2` 是两代，不是一条记录的两种写法；在 Canonical 里开**新实体候选**（不改旧实体），把 3 个实体的观测挂上去；review 为 **SHOP_R002**（high / `canonical_coverage_gap` / field `entity`），动作是"把 ZimaCube 2 加为新产品代，绝不复用第一代 facts"。

### Case 3：ZimaCube 2 的内存类型——LPDDR5 与 DDR5

**观测到的现象**：SHOP_PDP_ZC2 写 `memory = 8GB LPDDR5 4800MHz`，而 BLOG_ZC2_STANDARD 写 `memory = 8GB DDR5`，状态标注为 `cross_page_conflict_with_shop_pdp`。

**为什么它算问题 / 算什么状态**：这是 **`cross_page_fact_conflict`**。判成冲突的关键不在"哪个对"，而在**系统没有资格决定哪个对**：一边是商城规格区块，一边是产品相关 Blog 的自述，两者都是页面文字、都不是人工确认的标准答案；机器自行选一个"赢家"，等于把未经确认的措辞写成了品牌事实。它还暴露一个分层顺序：这个冲突**先要等实体成立**——ZimaCube 2 本身还是 `new_entity_candidate`（Case 2），实体未确认前，字段冲突只能作为候选记录里的待审冲突存着。

**正确处置动作**：记为冲突并**并存两条观测**，不自动和解、不自动改写；review 为 **SHOP_R003**（high / `cross_page_fact_conflict` / field `memory_type`），动作是核实 ZimaCube 2 的内存技术，**并且**核实内存是 SODIMM 模块还是板载（是否可升级）——观测里已提示另有产品自述强调可升级 SODIMM 行为，所以内存术语必须精确；核实完成后由人工**同时**归一 PDP 与 Blog 的措辞，顺序不能颠倒。

### Case 4：ZimaBoard 2 1664 的内存——16GB LPDDR5 还是 16GB DDR5

**观测到的现象**：

```text
Canonical F_ZB2_1664_RAM : 16GB LPDDR5 4800MHz
SHOP_PDP_ZB2             : 16GB LPDDR5 4800MHz   （match）
BLOG_ZB2_AI              : 16GB DDR5             （terminology_conflict）
```

**为什么它算问题 / 算什么状态**：状态是 **`terminology_conflict`**，属于术语 / 硬件事实冲突。它与 Case 3 形状相似但性质不同：Case 3 是**两页对立**（PDP vs Blog）且实体尚未获确认；Case 4 是**两页一致、一页偏离**，实体是已有的 `zimaboard_2_1664`，Canonical 里就有 `F_ZB2_1664_RAM` 的确认值。它算问题，因为 LPDDR5 与 DDR5 不是同义写法，而是**不同的内存技术**，写错会直接影响读者对"能不能换内存条"的判断；同时它说明只做 PDP-vs-PDP 核对发现不了这类问题，必须把产品强相关 Blog 纳入观测范围。

**正确处置动作**：记录冲突来源为 Blog，`canonical_ref = F_ZB2_1664_RAM`，**不自动改 Blog 正文**；review 为 **SHOP_R005**（medium / `terminology_conflict` / field `memory`），动作原文是"如果 LPDDR5 是已验证的硬件事实，就修正或归一化该 Blog"——注意前提仍是"如果已验证"，**验证在前、修订在后**；与 Case 3 分开归档，两代产品的同类字段各自留一条记录，不合并成一条"内存术语问题"。

### Case 5：ZimaBlade 的 Bundle scope——Board Only / Starter Bundle / NAS Kit

**观测到的现象**：SHOP_PDP_ZBL 出现三类组合形态。

```text
Board Only      : 不含 RAM，不含 power adapter
Starter Bundle  : 含更多开箱即用配件
NAS Kit         : 含更多开箱即用配件
```

对应观测 `board_only_bundle = Does not include RAM or power adapter`，状态 `new_commercial_fact_needs_review`；同实体上还有 `power = 12V USB-C power adapter`，状态 `compatible_but_less_specific`（Canonical 写的 `USB-C PD 3.0 (12V/3A)` 更具体，并提示重载存储建议用官方电源）。历史 Blog 里还出现过"某个 NAS Kit 的 preinstalled_os = CasaOS"这类**带 scope 前缀**的说法。

**为什么它算问题 / 算什么状态**：这是 **Scope** 问题，不是硬件问题。`Board Only 不含 RAM` 是 **Offer / Bundle fact**——它描述"这一单卖什么"，不描述"ZimaBlade 这块板子支持什么"。

```text
错误路径：Board Only 不含 RAM → 误推为 ZimaBlade hardware has no RAM support
正确路径：Board Only 不含 RAM → bundle scope 的商业事实
          （Canonical F_ZBL_MEM = 1x SODIMM，最高 16GB DDR3L，未变）
```

`Board Only / Starter Bundle / NAS Kit` 三者的差异**必须各自独立 scope**：它们是三个不同 SKU 的内容物清单，只共享同一个产品型号。压平到 `zimablade` 一个 scope 上，结果一定是"同一字段有三个互斥值"，系统只能报冲突——而这些冲突**全是自己造出来的误报**。

**正确处置动作**：为 Bundle / Offer 事实单独建 scope（`bundle` / `offer`），与 `entity`、`variant` 并列，绝不写进产品型号的硬件事实；review 为 **SHOP_R006**（medium / `scope_separation` / field `bundle_contents`），动作原文是"把 Bundle / Offer 事实与产品型号硬件事实分开，以避免假冲突"；Starter Bundle 与 NAS Kit 本轮只观测到"含更多开箱即用配件"这一层，**不足以逐项记录**，需人工补充后再入库；`12V USB-C` 与 `USB-C PD 3.0 (12V/3A)` 按 `compatible_but_less_specific` 处理——Shop 说得更粗、Canonical 更具体，**不构成冲突**。

### Case 6：历史 Blog——必须带时间上下文，不能当 timeless truth

**观测到的现象**：BLOG_MEMBER_DAY_2025 带 `freshness: historical_sample`，它保留的是"当时正确"的内容。

| 实体 | 观测 | 状态 |
| --- | --- | --- |
| zimablade_3760 | preinstalled_os = CasaOS | match_parent_fact（F_ZBL_OS） |
| zimablade_3760 | memory_requirement = DDR3L RAM 8GB or 16GB | compatible_with_parent_fact |
| zimablade_3760 | Claim：suitable_for Pi-hole / VPN gateway / lightweight NAS / Nextcloud / Jellyfin / Home Assistant / n8n / Docker | historical_claims_needs_freshness_check |
| zimablade_7700 | preinstalled_os = CasaOS（**针对所引用的那个 NAS Kit**） | scope_sensitive_match |
| zimablade_7700 | Claim：Plex/Jellyfin、自动化备份、n8n、Docker | historical_claims_needs_freshness_check |
| zimaboard_2 | preinstalled_os = ZimaOS | match_canonical_but_conflicts_current_shop_spec |
| zimacube | preinstalled_os = ZimaOS | match（F_ZC_OS） |

**为什么它算问题 / 算什么状态**：历史文章里有三类"今天看起来不对"的东西——**CasaOS 这个旧预装系统名**、**旧 Bundle 组合**、**旧 Claim**。检测系统绝不能因为"今天的页面不这么写"就全部标红，那会把一篇在当时正确、至今仍有历史价值的文章判成错误内容。状态是 **`stale_candidate`**：**候选过时**，含义是"需要人工判断是否仍然有效"，不是"已经确认失效"。`zimaboard_2 preinstalled_os = ZimaOS` 这条尤其典型：它**与 Canonical 一致**、只**与当前 Shop 规格不一致**（Case 1）——若系统只跟商城比，就会把一篇正确文章标成错误。

**正确处置动作**：一律记 `stale_candidate`，附页面级 `freshness: historical_sample`，**不改写正文、不加免责声明、不删文章**；进 review 时带时间上下文，规格后续可扩展的字段是 `published_at` / `valid_from` / `valid_to` / `version` / `freshness_status`，**MVP 先用 `stale_candidate` 一个状态扛住**；`scope_sensitive_match` 那条要连 scope 一起保留——`CasaOS` 只对"所引用的那个 NAS Kit"成立，脱离前缀就会变成一句关于 ZimaBlade 全线的错误陈述。

## 可以直接当正常的 Match

以下观测与 Canonical 一致，**不需要进 review_queue**，可以直接当正常记录。它们也是这套流程"不制造噪音"的证据。

| 实体 | 字段 | 观测值 | canonical_ref | 状态 |
| --- | --- | --- | --- | --- |
| zimaboard_2 | processor、lan、sata_ports、usb、pcie 全部一致 | Intel N150；4 cores；6M cache；up to 3.60 GHz ／ 2x 2.5GbE ／ 2x SATA 3.0 6Gb/s with power ／ 2x USB 3.1 ／ 1x PCIe 3.0 | F_ZB2_CPU / LAN / SATA / USB / PCIE | match |
| zimaboard_2_832 | memory、onboard_storage | 8GB LPDDR5 4800MHz；32GB eMMC | F_ZB2_832_RAM / EMMC | match |
| zimaboard_2_1664 | memory、onboard_storage | 16GB LPDDR5 4800MHz；64GB eMMC（PDP 与 Blog 各一条） | F_ZB2_1664_RAM / EMMC | match |
| zimablade | memory_expandability | DDR3L SO-DIMM；up to 16GB | F_ZBL_MEM | match |
| zimablade_7700 | onboard_storage | 32GB eMMC | F_ZBL_EMMC | match_parent_fact |
| zimablade_7700 | memory / sata_ports / pcie | user-accessible DDR3L SO-DIMM 最高 16GB；2 个全尺寸 SATA 连接；外露 PCIe 扩展接口 | F_ZBL_MEM / F_ZBL_SATA / F_ZBL_PCIE | match_parent_fact |
| zimacube | preinstalled_os | ZimaOS | F_ZC_OS | match |

Claim 层另有 10 条 `compatible` 同样不进队列：

| 实体 | Claim（canonical_ref） |
| --- | --- |
| zimaboard_2 | can_run Plex（C_ZB2_PLEX）、can_run Home Assistant（C_ZB2_HA）、suitable_for home server（C_ZB2_HOME_SERVER）、suitable_for personal NAS（C_ZB2_MININAS）、suitable_for media server（C_ZB2_HOME_SERVER） |
| zimaboard_2_1664 | can_run local AI voice assistant、supports optional GPU expansion（均为 C_ZB2_LOCALAI） |
| zimablade | suitable_for personal cloud（C_ZBL_CLOUD）、lightweight homelab / self-hosting（C_ZBL_HOMELAB）、small DIY NAS（C_ZBL_CLOUD） |

两条要养成的判断：**`compatible` 不是 `match`**——它指"方向一致、说法不完全等同"，例如页面把 Canonical 的 `suitable_for home server` 展开成 `suitable_for media server`，相关但没有逐字对上，所以 Claim 的字段级一致比 Fact 更宽松、更依赖 scope 与前缀而非字符串相等。另外 **Claim 类型不允许互相升级**：Canonical 的 `C_ZB2_LOCALAI` 是 `capability can_support local AI experiments with an added GPU`，页面写成 `can_run local AI voice assistant` 属 `compatible`，但绝不等于把 `can_run` 自动升格成 `best_for`；Capability 说"能跑"、Recommendation 说"适合"，两者在 review 里必须分开讨论。

## 跨站冲突：Cross-site Conflict

本轮跨站（品牌站 Canonical vs 商城 / 商城上的 Blog）出现的冲突如下。**全部处于 Needs Review，无一条经过人工确认。**

| review_id | severity | 字段 | 观测 | 建议动作 |
| --- | --- | --- | --- | --- |
| SHOP_R001 | high | preinstalled_os | Shop Specification: ZimaOS Plus ／ Shop FAQ: ZimaOS ／ Canonical seed（品牌站）: ZimaOS | 澄清 ZimaOS Plus 到底是已安装的 OS 镜像、是 entitlement / edition，还是叠加在 ZimaOS 之上的一层授权 |
| SHOP_R002 | high | entity | Shop 有 ZimaCube 2 / Pro / Creator Pack；当前 Canonical seed 只有第一代 ZimaCube / Pro / Creator Pack | 把 ZimaCube 2 作为新产品代加入；绝不复用第一代 ZimaCube 的 Canonical facts |
| SHOP_R003 | high | memory_type | Shop PDP: 8GB/16GB/64GB LPDDR5 4800MHz；产品相关 Blog: 8GB DDR5；另有产品自述强调可升级 SODIMM 行为，内存术语必须精确 | 核实 ZimaCube 2 的内存技术，以及模块是否为 SODIMM / 可升级；然后归一 PDP 与 Blog |
| SHOP_R004 | medium | compatible_os | Shop PDP 列出的 OS 集合比品牌站 Canonical seed 更宽，包含 OMV、Unraid、Home Assistant OS、TrueNAS | 复核 Canonical 是否应扩展，或 Shop 措辞是否夸大了官方兼容性 |
| SHOP_R005 | medium | memory | Canonical + Shop PDP: 16GB LPDDR5 4800MHz；Local-AI Blog: 16GB DDR5 | 如果 LPDDR5 是已验证的硬件事实，则修正或归一化该 Blog |
| SHOP_R006 | medium | bundle_contents | Board Only 不含 RAM 与 power adapter；Starter Bundle / NAS Kit 含更多开箱即用配件 | 把 Bundle / Offer 事实与产品型号硬件事实分开，避免假冲突 |

六个案例与六条 review 的对应关系：

```text
Case 1 → SHOP_R001  + Canonical R001 / R004 / R008
Case 2 → SHOP_R002
Case 3 → SHOP_R003  （依赖 Case 2 的实体先成立）
Case 4 → SHOP_R005
Case 5 → SHOP_R006
Case 6 → 无独立 review_id，以页面级 freshness: historical_sample
         与 stale_candidate 状态进入人工复核
```

**Case 1 的跨站性质要单独说明**：它的 `type` 是 `intra_page_ambiguity`，但观测项里同时列了品牌站 Canonical 的值——因为这条歧义**只有在跨站对照时才完整**：商城页内两个区块打架，加上品牌站自己也没定论，三者叠加才构成 high 级别。

## 页内歧义：Intra-page Ambiguity

本轮页内自相矛盾只有一条（Case 1 的 `ZimaOS Plus` vs `ZimaOS`），但它一次性说明了这类问题的价值：**它在任何跨站对照之前就已经是问题。**

`pilot_summary.main_test_findings` 的第一条就是这个发现：*A page can contain internally inconsistent naming even before comparing against canonical knowledge.*

页内歧义为什么必须单独成一类：**它不需要 Canonical 就能发现**，是成本最低、最该先跑的一类检测；**它不能用"来源优先级"解决**——同一页面内部没有"更权威的一方"，不能靠区块排序裁决；**它往往指向一个更上游的术语问题**——Case 1 最终问的不是"哪个区块对"，而是"ZimaOS / ZimaOS Plus / entitlement / 镜像"四个概念在品牌内部怎么定义，这个定义不确定，抄到哪个页面都会再次打架。

同一页面上还有一类**不是歧义**的情况要区分清楚：SHOP_PDP_ZBL 的 `12V USB-C power adapter` 与 Canonical `USB-C PD 3.0 (12V/3A)` 是 `compatible_but_less_specific`——**同方向、详细程度不同**。若把它也报成页内歧义，review_queue 就会被低价值条目淹掉；`less_specific` 与 `ambiguity` 必须分开。

## Scope 问题

Scope 是必填字段，不是可选项。本轮涉及四层：

| scope | 含义 | 本轮例子 |
| --- | --- | --- |
| entity | 型号级事实，整条产品线共享 | ZimaBoard 2 的 processor、lan、pcie |
| variant | 档位级事实，只对某个档位成立 | 832 的 8GB / 32GB eMMC；1664 的 16GB / 64GB eMMC |
| bundle / offer | 这一单卖什么，包装内容物 | Board Only 不含 RAM 与电源适配器；Starter Bundle；NAS Kit |
| edition | 软件版本层 | ZimaOS+ 的 license_price 29、Lifetime、单设备绑定 |

用 Case 5 的 ZimaBlade Kit 类目说透为什么 Bundle / Offer 必须单独 scope：

```text
若把三类组合都压在 zimablade 一个 scope 上：
  board_contents = "不含 RAM"        ← Board Only
  board_contents = "含 RAM 与配件"    ← Starter Bundle
  board_contents = "含 RAM 与配件"    ← NAS Kit
  ↑ 同一字段出现互斥值 → 只能全部报冲突，而这些冲突没有一个是真的
  ↑ 三句话说的是三个 SKU，不是一个硬件属性

正确做法：
  zimablade            (entity)  → F_ZBL_MEM：1x SODIMM，最高 16GB DDR3L（不变）
  zimablade#board_only (offer)   → 不含 RAM / 不含 power adapter
  zimablade#starter    (offer)   → 含更多开箱即用配件（细节待补）
  zimablade#nas_kit    (offer)   → 含更多开箱即用配件（细节待补）
```

同一个坑还有两个变体，本轮都出现了：**Variant 被当成 parent 用**——BLOG_ZBL_7700 的 `power = 12V USB-C requirement` 记为 `match_parent_fact`，说明它是父实体事实在 Variant 层的复述，scope 要写 variant 而不是 entity；**Bundle 前缀被丢掉**——BLOG_MEMBER_DAY_2025 的 `preinstalled_os = CasaOS for the referenced NAS kit` 是 `scope_sensitive_match`，`CasaOS` 只对被引用的那个 NAS Kit 成立，脱离前缀就成了关于 ZimaBlade 全线的错误陈述。Canonical 自己也印证了这套分层：`zimacube_creator_pack` 的 `entity_type` 就是 `bundle_or_variant`，`zimaos_plus` 就是 `software_edition`。**Scope 分不清，系统一定会制造大量误报**。

## Freshness 问题

历史 Blog 的处置在 Case 6 已展开，这里只补一条判断规则：**今天的页面不这么写 ≠ 这篇历史文章是错的**；历史文章与 Canonical 一致、只与最新商城措辞不一致时，**仍然不是"错误"**。BLOG_MEMBER_DAY_2025 同时出现三种情况，正好把边界划清了：

| 情况 | 本轮例子 | 状态 |
| --- | --- | --- |
| 与 Canonical 一致 | zimacube preinstalled_os = ZimaOS（F_ZC_OS） | match |
| 与 Canonical 一致但与当前商城不一致 | zimaboard_2 preinstalled_os = ZimaOS | match_canonical_but_conflicts_current_shop_spec |
| 内容可能已随时间失效 | CasaOS 预装、旧 Bundle、旧 Claim（Pi-hole / n8n / Docker 等适合场景） | stale_candidate / historical_claims_needs_freshness_check |

第三行的处置是**标记 + 人工判断**，不是自动改写、不是删除、不是加"本文已过期"的徽标。规格为后续预留 `published_at` / `valid_from` / `valid_to` / `version` / `freshness_status`，**MVP 先用 `stale_candidate` 一个状态兜住**，等真正出现"必须知道哪一年有效"的需求再补字段。

## Canonical Gap 与怎么进审核队列

本轮暴露的 Canonical 缺口分四种，**状态和处理方式完全不同**：

| 缺口类型 | 本轮例子 | 记成什么状态 | 怎么进队列 |
| --- | --- | --- | --- |
| 缺整个实体 | ZimaCube 2 / ZimaCube 2 Pro / ZimaCube 2 Creator Pack | `new_entity_candidate` | 开新实体候选、挂观测，人工确认是否为独立产品代（SHOP_R002） |
| 缺字段覆盖 | ZimaBoard 2 的 compatible_os：Canonical 是 CasaOS / Linux / Windows / OpenWrt / pfSense / Android / LibreELEC，Shop 多出 OMV / Unraid / Home Assistant OS / TrueNAS | `canonical_gap_or_expanded_shop_fact` | 复核是 Canonical 该扩，还是 Shop 措辞夸大（SHOP_R004） |
| 缺 Claim 覆盖 | Proxmox homelab、media streaming / firewalls / homelabs / AI containers、Ollama；ZimaBlade 的 Docker 应用清单与 OS 清单 | `new_claim_needs_review` / `expanded_compatibility_claim_needs_review` | 作为新 Claim 候选存下，人工判断是否提升为 Canonical Claim |
| 不在治理范围 | `more_powerful_and_flexible_than Raspberry Pi` | `external_comparative_claim_not_governed` | **只保留为 ZimaSpace 的比较性 Claim**，不为 Raspberry Pi 建 Canonical 记录 |

任何缺口都走同一条路，**没有旁路**：

```text
页面观测（Observation）
  → comparison_status = match / compatible / less_specific / conflict /
    scope_mismatch / edition_ambiguity / canonical_gap /
    new_entity_candidate / stronger_than_canonical / stale_candidate
  → review_queue（字段级一条，带 review_id / severity / field / observations / recommended_action）
  → 人工审核
  → 通过后才从 ai_candidate 提升为 canonical
```

三条硬边界：**AI 只生成 Candidate**——种子自身 `status` 就是 `ai_candidate_needs_human_review`，人工审核是必要步骤而非可选优化；**Blog 抽取结果不得自动回写 Canonical**——BLOG_ZC2_STANDARD 的三条 Claim（NAS storage / Docker / light virtualization、ZFS workloads、Plex transcoding）都是 `blog_recommendation_claim` / `blog_capability_claim`，只能作候选；**冲突状态不止 Match / Error**——本轮实际用到 14 种，其中 `less_specific`、`edition_ambiguity`、`canonical_gap`、`new_entity_candidate` 四种若被压成二值判断，Case 1 会被误判成 Error、Case 5 会被误判成冲突。

## Pilot 的局限

必须读完这一节再引用本页任何结论。

| 局限 | 具体说明 |
| --- | --- |
| 样本极少 | 只有 7 个页面（3 PDP + 4 Blog），不足以代表整个站群，本轮所有"比例"都没有统计意义 |
| 只覆盖单语言 | 只覆盖英文页面，多语言一致性完全未测 |
| 页面类型与来源不全 | 只有 PDP 与产品强相关 Blog 两类（未覆盖对比页、帮助中心、定价页），且观测全部来自商城站与其上的 Blog，品牌站只作为种子来源 |
| 实体与深度不完整 | 15 个 Canonical 实体中本轮涉及或对照 11 个；部分观测只有一层描述（如 Starter Bundle / NAS Kit 的"含更多开箱即用配件"），不足以逐项入库 |
| 未经人工确认 | **6 条 review_queue 全部处于 Needs Review**，扫描它们的机器与写这一页的 Agent 都不是确认人 |

**结论的边界**：这一轮证明的是**"流程可跑通"**——页面能被去重、实体能被分层、观测能被对照、歧义与冲突能被打成待审条目、缺口能被记成候选而不被静默合并。

它**不证明"ZimaSpace 品牌已经一致"**：`ZimaCube` 与 `ZimaCube 2` 仍分属两代而不能合并；ZimaOS / ZimaOS Plus 仍是待审歧义；LPDDR5 与 DDR5 的措辞仍两处不一致；Bundle 内容物细节仍不全；历史 Blog 仍带时间上下文等待判断。这六条没有任何一条被修复，也**不应该**由这套流程自动修复——它们的正确终点是人工审核台，不是自动改写。本页同样不声称这套流程会提升任何搜索排名或 AI 引用率；它只做一件事：让"品牌到底说过什么"变成可复核的记录。
