---
title: "冲突检测"
description: "先判断字符串不同是否等于事实冲突，再给出状态矩阵与十一个比较状态，说明每个状态的触发条件与处理动作。"
order: 4
updated: "2026-09-17"
---

> **字符串不同，不等于事实冲突。** 页面写的值和标准知识不一样，可能只是别名、只是版本叫法不清、只是适用范围不同，也可能真的互斥。这一页教的是把这几件事分开判断。

## 先分层判断，再给状态

判断顺序是固定的三层：值是否相同、差异是否来自别名或版本、适用范围是否在同一层。三层都过不去，才叫事实冲突。

<div class="bae-flow">
  <div class="bae-node"><b>① 值相同吗？</b><span>观测值 vs 标准值</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>② 是别名或版本差异吗？</b><span>同一个东西的两种叫法</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>③ 适用范围相同吗？</b><span>型号 / 变体 / 套装 / 页面上下文</span></div>
</div>

<div class="bae-outs">
  <div class="bae-out">值相同 → 一致</div>
  <div class="bae-out" data-tone="info">别名或版本 → 需要确认</div>
  <div class="bae-out" data-tone="info">范围不同 → 范围不一致</div>
  <div class="bae-out" data-tone="warn">都不成立 → 事实冲突</div>
</div>

跳步的代价很具体：先比字符串再对范围，会把变体级和型号级的两条正确说法判成互斥；先比字符串再问别名，会把 ZimaOS 和 ZimaOS Plus 这种身份问题判成错误。

## 五种常见情形与状态

下表是最常见的五种走向。第三列用中文标签加内部值，方便和队列里的字段对上。

| 观测到的值 | 标准知识 | 判定 |
| --- | --- | --- |
| 8GB LPDDR5 4800MHz | 8GB LPDDR5 4800MHz | <span class="bae-status" data-s="match">一致 match</span> |
| ZimaOS Plus | ZimaOS | <span class="bae-status" data-s="review">需要确认 edition_ambiguity</span> |
| 16GB | 8GB | <span class="bae-status" data-s="conflict">事实冲突 conflict</span> |
| ZimaCube 2 | 无记录 | <span class="bae-status" data-s="new">发现新实体 new_entity_candidate</span> |
| 套装不含内存 | 型号内存 | <span class="bae-status" data-s="scope">范围不一致 scope_mismatch</span> |

后两行经常被误报成冲突：标准知识里根本没有的实体，第一动作是建实体候选，不是找它和上一代的差异；套装只说明这个销售单位装了什么，不能拿来当产品硬件事实比。

## 一个真实例子：ZimaBoard 2 的内存

标准知识和商城页给的是同一写法，一篇产品 Blog 写成了另一类内存代际名称。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">标准知识</span>
    <p>内存类型：LPDDR5 4800MHz</p>
    <p>变体内存：8GB / 16GB LPDDR5</p>
  </div>
  <div class="bae-col" data-tone="wrong">
    <span class="bae-col-label">Blog 页面写的</span>
    <p>内存：DDR5</p>
    <p>同一页的价格与接口写法与标准一致</p>
  </div>
</div>

两个代际名称在技术上互斥，所以判定为 <span class="bae-status" data-s="conflict">事实冲突</span>，并且只能进人工队列。这里要不要改、改哪边，都超出检测范围。

## 十一个比较状态

规范页需要把内部值写出来，所以下面用「中文主标签 + 英文内部值」两行写法。一个状态只解决一件事。

| 中文主标签 · 内部值 | 什么时候出现 / 接下来做什么 |
| --- | --- |
| 一致 · `match` | 值和标准知识一致；记下，不派工 |
| 兼容 · `compatible` | 措辞不同但语义相同；记下，措辞统一可顺手做 |
| 页面描述更宽泛 · `less_specific` | 说得更笼统但没写错；标注，按页面类型决定是否补精度 |
| 事实冲突 · `conflict` | 两个值不能同时成立；高优先人工裁定，两边都不自动改 |
| 范围不一致 · `scope_mismatch` | 值的范围配错了；先修对齐关系，再谈值 |
| 版本含义不清 · `edition_ambiguity` | 基础版本与版本权益的关系未确认；保留待审，不得直接判冲突 |
| 标准知识缺失 · `canonical_gap` | 页面有合理事实，标准里没维护；进知识库补录队列 |
| 发现新实体 · `new_entity_candidate` | 出现品牌自有新一代产品；建实体候选，不得并入旧代际 |
| 页面主张更强 · `stronger_than_canonical` | 把「能运行」写成「最适合」；保留待审，不升级标准知识 |
| 可能已过期 · `stale_candidate` | 发布时可能对，今天已过期；带上时效上下文走版本审核 |
| 暂无法判断 · `unknown` | 信息不足；写明缺什么，进待查队列 |

按处理动作看，前三个是「不用派人改页面」，中三个是「要人工看一眼才能定性」，后五个多半指向知识库、实体或时效问题，而不是页面写错了。

<div class="bae-note" data-tone="warn"><b>边界</b>：所有状态都只是待裁定的记录，系统不自动修正任何一侧，也不自动判定谁对。把冲突状态当成已解决，会直接污染标准知识。</div>

判定出状态之后，接下来要回答的是另一个问题：这条知识被确认改动以后，哪些页面需要跟着改。
