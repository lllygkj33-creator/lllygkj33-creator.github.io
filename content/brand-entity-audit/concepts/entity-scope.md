---
title: "实体与 Scope"
description: "分清谁是实体、谁只是同一型号的配置、谁只是打包组合或场景。实体切错，后面所有比对都会变成误报。"
order: 1
updated: "2026-09-17"
---

> **Entity Scope 决定误报率。** 该建实体的建实体，只是配置差异的做 Variant，打包卖的做 Bundle，场景名就让它当主张的宾语。

## 实体树：谁挂在谁下面

实体树只回答一个问题：谁和谁是可以互相校对的关系。同一层的名字才有资格放在一起比对，跨层的名字必须先看 Scope。

<div class="bae-tree">
<pre>ZimaSpace（品牌）
└─ ZimaBoard（产品线）
   └─ ZimaBoard 2（型号 Model）
      ├─ ZimaBoard 2 832（Variant）
      └─ ZimaBoard 2 1664（Variant）</pre>
</div>

树里每一层都有自己的身份：品牌管名字怎么写，产品线只是聚合叙事，型号承载整代共享的规格，Variant 才承载逐 SKU 不同的字段。ZimaBoard 2 的处理器、网口、SATA、PCIe 属于型号，只有内存和板载存储分给 832 与 1664。

一代 ZimaBoard（232 / 432 / 832）和 ZimaBoard 2 是两代产品，平级而不是父子。把新代际挂进旧代际下面，它会继承上一代的规格，比对结果整片变红。

同一个东西的另一种写法不建实体，只加别名。ZimaBoard2 只是少了一个空格，ZimaOS Plus 是 ZimaOS+ 的写法，裸写的 832 是 ZimaBoard 2 832 的缩写。别名只负责让人找到实体，比对仍然落在实体上。

## Variant 与 Bundle 不是一回事

两者都长得像「名字后面加了个后缀」，但一个描述硬件本身，一个描述这次买到了什么。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">Variant · 同一型号的配置</span>
    <p>ZimaBoard 2 832：内存 8GB LPDDR5，板载 32GB eMMC</p>
    <p>ZimaBoard 2 1664：内存 16GB LPDDR5，板载 64GB eMMC</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">Bundle / Offer · 打包卖掉的东西</span>
    <p>NAS Kit（Mini NAS Kit）：主机之外再给一套装机配件</p>
    <p>Board Only：明确不含内存、不含电源适配器</p>
  </div>
</div>

Variant 的差异是真实硬件差异，所以它和父级型号一起读：父级给共享值，Variant 只覆盖真正不同的字段。Bundle 和 Offer 的差异来自「这次购买包含哪些东西」，它和产品规格不在同一个抽屉里。

同一份观测材料里，商城把 Board Only 那句标成新的商业事实、需要审核。这就是正确做法：新出现的商业口径进待审队列，而不是拿去和硬件事实比对。

## 应该治理与暂不治理

判据只有一条：**这个名词有没有属于它自己的、需要全站一致的硬事实。** 有就建实体，没有就降级成场景或主张的宾语。

| 名字 | 结论 | 理由 |
| --- | --- | --- |
| ZimaBoard 2 | 治理 | 型号级规格全站共用，改一次影响所有页面 |
| ZimaBoard 2 832 | 治理 | Variant，覆盖内存与板载存储这两个逐 SKU 字段 |
| ZimaOS+ | 治理 | 软件权益层，授权与随附关系必须口径一致 |
| Home Server | 暂不治理 | 场景，没有自己的硬件事实，只作为主张的宾语出现 |
| Plex | 暂不治理 | 主张对象，出现在「可以运行什么」的宾语位置 |
| Raspberry Pi | 暂不治理 | 外部参照，只在对比主张里被提到，不为它建知识库 |

暂不治理不等于忽略。它们照样进入系统，只是以场景标签或主张对象的身份参与，不参与硬件规格的硬约束。

反过来，一个只用于聚合叙事的名字，比如「ZimaBoard 系列」，是检索视角而不是实体。给它建实体，后面只会多出一层永远为空的字段。

## 边界：Bundle 不得覆盖产品硬件事实

<div class="bae-note" data-tone="warn"><b>最容易踩的坑</b>：把 Bundle 或 Offer 的说明写成产品硬件事实，系统就会得出「这个产品不含内存」这种荒唐结论。</div>

Bundle 可以有自己的硬件事实，比如打包里换了更大的内存或加了显卡，但它不能被反推成父级型号的规格。看到一条事实时先问一句：它说的是「这个产品是什么」，还是「这次购买包含什么」？
