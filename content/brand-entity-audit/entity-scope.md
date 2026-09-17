---
title: "Entity Scope：品牌、产品、Variant、Bundle 应该怎么分"
description: "把 ZimaBoard、ZimaBoard 2、832、1664、ZimaOS、ZimaOS+ 拆成正确的层级与 Scope，是这套系统里最容易被问倒、也最值钱的一步。"
order: 2
updated: "2026-09-17"
---

> **Entity Scope 决定误报率。** 把 `ZimaBoard`、`ZimaBoard 2`、`832`、`1664`、`Mini NAS Kit` 平铺成同一级实体，系统上线第一天就会制造大量"假冲突"；而把 `Bundle` 的事实当成产品硬件事实，会直接得出"这个产品没有内存"这种荒谬结论。

## 为什么必须先分层

一套品牌实体一致性系统里，**最容易出错的地方不是抓取，也不是 AI，而是分不清谁是谁**。

举个例子。商城上 `Board Only` 这个售卖形态写着"不含 RAM / Power Adapter"。如果系统把这句话记成产品硬件事实，比对结果就是：

```text
Canonical: ZimaBlade 支持 up to 16GB DDR3L SO-DIMM
Observation: 不含 RAM
→ 冲突？
```

这不是冲突，这是**两个不同 Scope 的事实被放进了同一个抽屉**。类似的假冲突还有：

| 假冲突 | 真实原因 |
| --- | --- |
| `832` 与 `1664` 内存不同 | 它们是同一 Model 的两个 Variant，本来就该不同 |
| 某页说"预装 ZimaOS"，另一页说"预装 ZimaOS Plus" | 命名 / Edition 层级未定义（属于待审歧义，不是字符串错误） |
| `ZimaCube 2` 的规格与 `ZimaCube` 不一致 | 它们是两代产品，不是同一个实体 |
| 某页说"不含电源适配器" | 这是 Offer 事实，不是硬件事实 |

**Scope 分对了，这些问题一半以上不会变成冲突；Scope 分错了，系统会淹没在误报里。**

## 层级长什么样

标准层级只有五层，从左到右粒度逐渐变细：

```text
Brand → Product Family → Product Model → Variant → Offer / Bundle

ZimaSpace（Brand）
├─ ZimaBoard（Family）→ ZimaBoard / ZimaBoard 2（Model）→ 232 / 432 / 832 / 1664（Variant）
├─ ZimaBlade（Family）→ ZimaBlade（Model）→ 3760 / 7700（Variant）
└─ ZimaCube（Family）→ ZimaCube / ZimaCube Pro（Model）→ Bundle: Creator Pack
```

但真实品牌往往不会这么整齐。ZimaSpace 的实体在 Canonical Seed 里实际是这样落地的（15 个实体，父子关系来自 seed）：

```text
ZimaBoard 2                        product_model
├─ ZimaBoard 2 832                 product_variant
└─ ZimaBoard 2 1664                product_variant

ZimaBoard                          product_model
├─ ZimaBoard 232                   product_variant
├─ ZimaBoard 432                   product_variant
└─ ZimaBoard 832                   product_variant

ZimaBlade                          product_model
├─ ZimaBlade 3760                  product_variant
└─ ZimaBlade 7700                  product_variant

ZimaCube                           product_model
└─ ZimaCube Pro                    product_variant
   └─ ZimaCube Pro Creator Pack (10 Core)   bundle_or_variant

ZimaOS                             software
└─ ZimaOS+                         software_edition
```

注意两件事：

1. **`ZimaBoard` 与 `ZimaBoard 2` 是平级的两个 product_model，不是父子。** 它们是两代产品，不是同一产品的版本号。把第二代挂在第一代下面会直接导致规格继承错误。
2. **实体类型不止一种。** 硬件有 model / variant / bundle，软件有 software / software_edition——软件版本的层级语义和硬件完全不同。

## 每一层是什么，边界在哪里

| 层级 | 回答的问题 | ZimaSpace 实例 | 典型 Fact |
| --- | --- | --- | --- |
| **Brand** | 这是谁 | ZimaSpace（别名 Zima、Zima Space） | 品牌名与写法 |
| **Family** | 同一产品线 | ZimaBoard / ZimaBlade / ZimaCube 这类产品线概念 | 通常**不直接承载硬件 Fact** |
| **Model** | 具体哪个产品 | ZimaBoard 2、ZimaBlade、ZimaCube、ZimaCube Pro | 整个型号共享的规格 |
| **Variant** | 同一型号的哪个 SKU | ZimaBoard 2 832 / 1664、ZimaBlade 3760 / 7700 | 存在真实硬件差异的字段 |
| **Bundle** | 打包卖什么 | Creator Pack、NAS Kit、Starter Bundle | 包含哪些配件 |
| **Offer** | 以什么形态卖 | Board Only | 含 / 不含哪些部件 |
| **Software** | 软件本体 | ZimaOS | 架构、存储模式、能力 |
| **Edition** | 软件的哪个版本 / 权益 | ZimaOS+ | 授权与权益类事实 |
| **Alias** | 同一个东西的另一种写法 | `ZimaBoard2`、`832`、`ZimaOS Plus` | 不是实体，是实体的别名 |

这张表里最需要谨慎的是 **Family**。

### Family 的边界：可以存在，但不要乱用它承载事实

`ZimaBoard` 在产品线叙事里是 Family，但 Canonical Seed 把它建成了 `product_model`，因为它有自己完整的规格、自己的 Variant（232 / 432 / 832）、自己的预装系统。**如果一个名字既能当产品线讲、又能落到具体规格，就按 Model 建，不要按 Family 建。**

反之，如果某个名字只用于聚合叙事（"ZimaBoard 系列"）而没有独占的硬件事实，那它就是**检索视角，不是实体**。给它建实体只会让后面的比对多出一层永远为空的字段。

### Model 与 Variant 的切分规则

规则只有一条：**不同 SKU 之间存在真实硬件差异，就值得拆成 Variant。** 以 ZimaBoard 2 为例：

```text
ZimaBoard 2（父级保留共享事实）
→ processor / memory_type / lan / sata_ports / pcie / preinstalled_os

ZimaBoard 2 832（Variant 覆盖）
→ memory: 8GB LPDDR5 4800MHz    → onboard_storage: 32GB eMMC

ZimaBoard 2 1664（Variant 覆盖）
→ memory: 16GB LPDDR5 4800MHz   → onboard_storage: 64GB eMMC
```

这个模式叫 **Parent Inheritance + Variant Override**：

```text
父级实体  = 共享规格（CPU、LAN、SATA、PCIe …）
Variant   = 只覆盖真正不同的字段（memory、onboard_storage …）
```

不这么做的代价很具体：如果把 `8GB` 写成 `ZimaBoard 2` 的 model 级事实，那么 `1664` 的页面永远会被判成冲突；反过来，如果把 model 级事实复制到每个 Variant 上，一次 CPU 修正就要改两遍、四遍，依赖索引也失去意义。

### Variant 要记录什么

Variant 不是"型号加后缀"，它必须携带可核对的差异字段：

| 要记录 | 说明 |
| --- | --- |
| 差异 Fact 本身 | 例如 `memory`、`onboard_storage`、`tdp` 这类真正逐 SKU 不同的字段 |
| **Scope = variant** | 同一条 Fact 的层级必须写清楚，否则会与父级事实串台 |
| Source Provenance | 这个值来自哪个 source_id、哪个 source_locator |
| Review Status | 未审核的值不能被当成已确认（Seed 里的条目整体处于待审状态） |

ZimaBoard 2 的两个 Variant 在商城 PDP 上的观测结果与 Canonical 完全一致（`F_ZB2_832_RAM`、`F_ZB2_832_EMMC`、`F_ZB2_1664_RAM`、`F_ZB2_1664_EMMC` 全部 match）——这正说明**只要 Variant 层级分对了，比对结果就是干净的**。

### Bundle / Offer 不得覆盖产品硬件事实

`Board Only` / `Starter Bundle` / `NAS Kit` 这一类，属于商业 Offer / Bundle Fact，**必须独立 Scope**：

```text
Board Only      → 不含 RAM / 不含 Power Adapter
Starter Bundle  → 含更多配件
NAS Kit         → 含更多配置
```

它们**绝不能被解释成** `ZimaBlade 不支持内存` / `ZimaBlade 硬件不含电源`。同一份观测材料里，Shop PDP 把这句标为 `board_only_bundle`，并注明是 `new_commercial_fact_needs_review`——**这正是正确做法：新出现的商业事实进待审，而不是去和硬件事实比对。**

Bundle 还有一个更隐蔽的坑：**Bundle 可能包含自己的硬件升级。** ZimaCube Pro Creator Pack (10 Core) 在 Seed 里是 `bundle_or_variant` 类型，它带有独立的 processor、memory、storage、gpu 事实。**Bundle 可以有自己的硬件事实，但不能被反推成父级 Model 的规格。** 判断标准很简单：**这条事实说的是"这个产品是什么"，还是"这次购买包含什么"？** 前者归 Model / Variant，后者归 Bundle / Offer。

## Software 与 Edition：ZimaOS 和 ZimaOS+ 是两层

软件实体的分法和硬件不同，因为软件有"本体 + 版本 / 权益"两层：

```text
ZimaOS        entity_type = software          软件本体
└─ ZimaOS+    entity_type = software_edition  版本 / 权益层

ZimaOS     可能是 OS family / 基础镜像
ZimaOS+    可能是 Edition / Entitlement / License Layer
```

ZimaOS 作为软件本体承载的是产品级能力事实，例如 `supported_architecture = x86-64`、存储模式（JBOD / RAID 0 / 1 / 5 / 6）。ZimaOS+ 作为 Edition 承载的是**权益类事实**，例如授权价格、授权期限、磁盘与成员上限、授权绑定设备、授权转让规则，以及 `included_with` 这类 policy Claim。

**它们的关系是父子或 edition 关系，不是字符串归一化关系。** 如果把 ZimaOS+ 直接当成 ZimaOS 的别名，系统就再也无法表达"预装 ZimaOS，但设备附带 Plus 权益"这种真实情况。

同时必须明确区分三类写法，它们在系统里的地位完全不同：

| 写法 | 地位 | 处理方式 |
| --- | --- | --- |
| `ZimaOS` | software 实体 | 正常实体 |
| `ZimaOS+` | software_edition 实体（Canonical Name） | 正常实体 |
| `ZimaOS Plus` | ZimaOS+ 的 Alias | 归一化即可，不新建实体 |
| `ZimaOS` 与 `ZimaOS+` 混用 | **edition_ambiguity** | 进待审，不做字符串比较定胜负 |

同一个产品的预装系统这件事，在两份材料里的说法是：

```text
品牌官网规格：ZimaOS
商城 Specification：ZimaOS Plus
商城 FAQ：ZimaOS
```

它属于 **edition_ambiguity**，是需要人工确认的待审项，不是"字符串不同 → 报错"。要确认的问题也很具体：ZimaOS 是 OS family 还是基础镜像？ZimaOS Plus 是 Edition 还是 License entitlement？"pre-installed" 指系统镜像还是权益激活？

**这正是分层的价值所在**——它把一个看起来是"页面对不上"的问题，还原成一个"内部术语没定清楚"的问题。后者才是真正要解决的。

## Alias：不要看到名字不同就建实体

命名差异的第一反应应该是**加 Alias**，而不是**建新 Entity**。

```text
Entity:  ZimaSpace        Aliases: Zima / Zima Space
Entity:  ZimaOS+          Aliases: ZimaOS Plus / ZimaOS+
Entity:  ZimaBoard 2      Aliases: ZimaBoard2
Entity:  ZimaBoard 2 832  Aliases: ZimaBoard2 832 / 832
Entity:  ZimaBoard        Aliases: ZimaBoard 1
```

Alias 的判断标准是**它是否指向同一个实体**，而不是"看起来像"。三条硬规则：

1. **同一个产品名的不同拼写 → Alias。** `ZimaBoard2` 只是少了空格。
2. **上下位关系不能当 Alias。** `ZimaOS` 不能当 `ZimaOS+` 的别名；`ZimaCube` 不能当 `ZimaCube 2` 的别名。
3. **同一产品的 Variant 不能用裸数字当独立实体名。** `832` 是别名，`ZimaBoard 2 832` 才是实体——注意 `832` 在 ZimaBoard 一代下也作为别名出现，**裸数字一旦脱离上下文就无法判归属**，所以它只能作为别名存在，不能作为比对入口。

## 特殊处理：Home Server 不一定是完整 Entity

有一点必须讲清楚，因为它决定了知识库会不会无边界膨胀：**`Home Server` 在 MVP 里不一定是完整 Entity**，它可以是以下两者之一：

```text
Scenario（场景）
or
Claim Object（品牌主张的宾语）
```

理由很直接。`Home Server` 没有独占的硬件事实——你不会为它维护 CPU、RAM、Ports。它出现在系统里的方式，是作为品牌自己发布的 Claim 的宾语：

```text
ZimaBoard 2 → positioning → suitable_for → home server
```

所以它的处理方式是：

| 处理方式 | 说明 |
| --- | --- |
| 作为 Claim Object | 记录在 `object` 字段里，参与 Claim 比对 |
| 作为 Scenario | 用于页面分组与检索，不承载 Fact |
| **不建 canonical 实体** | 不为它维护规格、Variant、发布时间 |
| 不做跨页一致性硬约束 | 场景措辞本来就是渠道语气差异 |

判断标准可以复用前面那条：**一个名词有没有"属于它自己的、需要全站一致的硬事实"？** 有，就建实体；没有，就让它作为 Claim Object 存在。

同理，`mini NAS / personal cloud`、`Plex`、`Raspberry Pi` 这类名字，在 MVP 里同样只应作为 Claim Object 或 Context Mention 出现，**不要因为一句话就去建竞争对手的完整知识库**。

## 三个最容易踩的坑

| 坑 | 后果 | 正确做法 |
| --- | --- | --- |
| 新代际被映射到旧代际 | `ZimaCube 2` 继承 `ZimaCube` 的 CPU / RAM / 电源事实，产出成片假冲突 | 新代际标为 `new_entity_candidate`，**绝不复用上一代的 canonical facts** |
| Bundle 事实写进产品事实 | 得出"产品不含内存 / 电源"的荒谬结论 | Bundle / Offer 独立 Scope，走商业事实待审 |
| 命名差异当成事实冲突 | 待审队列被无意义条目淹没 | 先走 Canonical Name + Aliases + edition 关系，判不出来才进待审 |

顺带补一条与 Scope 直接绑定的工程建议：**Scope 必须是每条 Fact / Claim 的必填字段**，取值至少覆盖 `family / model / variant / bundle / software / edition / page_context`。

为什么 `page_context` 也要有？因为同一个 PDP 可能同时售卖多个 SKU，而 FAQ 可能是整个 Model 共用。例如产品页 FAQ 里写"预装 ZimaOS"，它**不能**被自动理解成"只有 832 这个 Variant 是这样"，它更可能是 `scope = model`。**没有 Scope，比对器就只能猜，而猜错的方向永远是误报。**

## 结论

分层不是为了画得好看，而是为了让"不一样"这件事能够被正确解释成三种不同的东西：

```text
真正的冲突        → 该改页面或改知识
Scope 不同        → 本来就不该比较
命名 / 层级未定义 → 该定术语，不是该改页面
```

只要把 Model / Variant / Bundle / Edition / Alias 分清，误报会立刻掉一个数量级，而 `needs_review` 队列里剩下的，才是真正值得人花时间的问题。
