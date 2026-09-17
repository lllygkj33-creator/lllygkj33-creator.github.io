---
title: "Fact 与 Claim"
description: "事实回答它是什么，主张回答它能做什么、适合什么。两类知识的校对逻辑不同，能力描述更不能自动升级成推荐。"
order: 2
updated: "2026-09-17"
---

> **Fact 对错，Claim 强弱。** 「内存 8GB」可以拿来判对错，「适合 Home Server」只能判断谁在说、说到什么程度、有没有条件。

## 两种知识：它是什么，它能做什么

同一个产品页上，这两类句子长得几乎一样，但在系统里它们是两种记录。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">FACT · 它是什么</span>
    <p>处理器：Intel N150，4 核</p>
    <p>内存：ZimaBoard 2 832 为 8GB LPDDR5 4800MHz</p>
    <p>网络：2× 2.5GbE</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">CLAIM · 它能做什么</span>
    <p>可以运行 Plex</p>
    <p>适合 Home Server</p>
    <p>支持本地 AI，需要加一张 PCIe 显卡</p>
  </div>
</div>

Fact 的判断方式很硬：两个页面写出不同的值，至少有一处需要审核，8GB 和 16GB 不可能同时正确。Claim 没有对错，只有强度、依据和条件，品牌写「可以运行」和写「最适合」是两条不同的记录。

两者的来源也不一样。事实多半来自规格页的表格，主张常常来自标题、卖点和博客叙述，所以一条事实必须写清适用范围，一条主张必须写清条件和依据。

## 三个强度：可以运行、适合、最适合

同一句夸奖可以写成三个档位，而档位之间不能互相推导。

<div class="bae-flow">
  <div class="bae-node"><b>可以运行 Plex</b><span>能力 · can_run</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>适合做媒体服务器</b><span>推荐 · suitable_for</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="warn"><b>Plex 场景的最佳选择</b><span>最高级主张 · best_for</span></div>
  <div class="bae-caption">能力 ≠ 推荐 ≠ 最高级营销主张</div>
</div>

规矩只有一条：能力不得自动升级成推荐，更不得升级成最高级主张。页面真的写成「最适合」时，这不是硬件错误，而是主张被写强了，标记为「页面主张更强」（`stronger_than_canonical`）交给人判断依据。

条件也不能省。「支持本地 AI」背后有前提：需要 PCIe 3.0 显卡扩展。去掉这个条件，句子就从「加一张卡之后可以」变成「本来就可以」，强度被悄悄抬高了一档。

系统里这三个档位是三条独立记录：一条说能跑，一条说适合，一条说最好，同一句原文可以同时产生弱记录和强记录，但不能互相推导。

## 五类 Claim

类型不同，校对方式就不同，所以每条主张都要写清自己在回答什么。

| 类别 | 回答的问题 | ZimaSpace 例子 |
| --- | --- | --- |
| 能力 capability | 能不能做到 | 可以运行 Plex；本地 AI 需要外加一张 PCIe 显卡 |
| 推荐 recommendation | 品牌推荐给谁、用在什么场景 | 适合 mini NAS 与个人云；面向家庭和小团队的 ZimaOS+ |
| 定位 positioning | 品牌把它定义成什么 | ZimaBoard 2 是 Home Server；ZimaOS 是一套简化的 NAS 系统 |
| 对比 comparative | 它相对别的东西处在什么位置 | 比 Raspberry Pi 更强更灵活，属于对外部产品的比较 |
| 政策 policy | 品牌承诺了什么 | ZimaOS+ 不会变成订阅制，且随附于 ZimaBoard 2 等官方设备 |

对比类最容易出事：它天然想被写成结论，所以要额外看依据，指向外部产品的主张在系统里只作上下文。

标签写中文还是保留内部英文值不影响判断，重要的是别把能力当推荐用。推荐类必须能指回依据，政策类必须能和价格页、软件版本对齐。

## 边界：两套校对逻辑不能混用

<div class="bae-note" data-tone="info"><b>不要合并成一个字段</b>：Fact 判对错，Claim 判强弱，两者连状态值都不通用。</div>

一条事实的结论只有一致、事实冲突、适用范围不一致这几种；一条主张的结论则是相容、冲突、页面主张更强、缺少依据。把「支持 Plex」和「Plex 首选」压进同一条记录，审核时既不能说它对，也不能说它错，队列里就只剩下「暂无法判断」。

本页例子取自种子材料，目前都还是待人工确认的候选，不代表品牌已经定稿。
