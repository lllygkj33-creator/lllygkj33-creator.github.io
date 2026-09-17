---
title: "001 · 页面检测"
description: "四个 ZimaSpace 案例走一遍页面检测：标准知识与页面实际写的值比对，得到一致、事实冲突、发现新实体与范围不一致。"
order: 3
updated: "2026-09-17"
---

> 页面检测只做一件事：把标准知识和页面实际写的值并排放在一起，给一个状态，然后停下来等人。它不判断谁对，也不改任何一侧的文字。

## 检测卡怎么读

每张检测卡分两栏：左边是标准知识，右边是页面实际写的。两栏下面是这条对照的状态标签，它决定这条记录直接归档，还是进人工队列。

本页四个案例来自同一轮 ZimaSpace 检测。标准知识取自品牌站规格页（SRC_ZB2），页面观测取自商城 PDP 与产品 Blog；来源一律用标识符指代，不写页面地址。

## 案例 A · 写法一致

ZimaBoard 2 832 的内存，标准知识和商城 PDP 写的是同一串值。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">标准知识</span>
    <p>内存：8GB LPDDR5 4800MHz</p>
    <p>来源：品牌站规格页 SRC_ZB2</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">页面实际写的</span>
    <p>内存：8GB LPDDR5 4800MHz</p>
    <p>来源：商城 PDP SHOP_PDP_ZB2</p>
  </div>
</div>
<p><span class="bae-status" data-s="match">一致</span> 系统动作：通过，直接归档，不占用人工审核。</p>

这是最常见的结局，也应该是检测结果里数量最多的一类。先把"大部分页面是对的"记清楚，少数待审条目才有分量。

## 案例 B · 内存出现两种技术名

ZimaBoard 2 1664 的内存，标准知识和商城 PDP 都写 LPDDR5 4800MHz，一篇讲本地 AI 的产品 Blog 写成了 DDR5。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">标准知识</span>
    <p>内存：16GB LPDDR5 4800MHz</p>
    <p>商城 PDP 写的也是 LPDDR5</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">页面实际写的</span>
    <p>内存：16GB DDR5</p>
    <p>来源：产品 Blog BLOG_ZB2_AI</p>
  </div>
</div>
<p><span class="bae-status" data-s="conflict">事实冲突</span> 系统动作：记一条待审，人工核实之后再决定改哪边。</p>

LPDDR5 和 DDR5 不是同义写法，是两种不同的内存技术，写错会直接影响读者判断这台机器能不能加内存条。内部把这条归在术语层冲突里（`terminology_conflict`），严重度是 medium，建议动作是"如果 LPDDR5 是已验证的硬件事实，就修正或归一化那篇 Blog"——验证在前，修订在后。

系统在这一步没有资格选赢家。一边是商城规格区块，一边是产品相关 Blog 的自述，两者都只是页面文字；自动挑一个"更可信的"，等于把未经确认的措辞写成了品牌事实。

<div class="bae-note" data-tone="warn"><b>容易漏掉</b>：只做商城 PDP 之间的对照，发现不了这条；产品强相关 Blog 必须纳入观测范围。</div>

## 案例 C · 出现标准知识里没有的新产品

标准知识里只有第一代 ZimaCube、ZimaCube Pro 与 Creator Pack，没有任何第二代记录；商城页面已经出现 ZimaCube 2。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">标准知识</span>
    <p>只有第一代 ZimaCube 系列</p>
    <p>没有 ZimaCube 2 这个对象</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">页面实际写的</span>
    <p>ZimaCube 2</p>
    <p>来源：商城 PDP SHOP_PDP_ZC2</p>
  </div>
</div>
<p><span class="bae-status" data-s="new">发现新实体</span> 系统动作：开新实体候选，把观测挂上去，不复用上一代的事实。</p>

这不是某个值写错，而是标准知识里根本还没有这个对象，所以拿它和第一代逐字段比较没有意义。第一代有自己的处理器、内存代际和电源值，名字相近不等于同一台机器。

把这套值继承给第二代，等于用旧知识替新页面发言。它在待审队列里是 high 条目，建议动作只有一句：把 ZimaCube 2 加为新产品代，绝不复用第一代的标准事实。

<div class="bae-note" data-tone="warn"><b>容易误判</b>：把 ZimaCube 2 挂到第一代实体上，看着省事，实际是静默改写标准知识。</div>

## 案例 D · 套装内容不等于型号规格

ZimaBlade 的商城页同时卖 Board Only 和 Kit 形态。Board Only 不含内存、不含电源适配器，说的是"这一单卖什么"，不是"这块板子支持什么"。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">型号层的标准知识</span>
    <p>内存：1 个 SODIMM 插槽，最高 16GB DDR3L</p>
    <p>这是 ZimaBlade 这块板子的规格</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">套装层实际写的</span>
    <p>Board Only：不含内存、不含电源适配器</p>
    <p>来源：商城 PDP SHOP_PDP_ZBL</p>
  </div>
</div>
<p><span class="bae-status" data-s="scope">范围不一致</span> 系统动作：按套装单独记录，不和型号规格混着比。</p>

两个值放到同一层才会打架。压平到型号上，同一字段就出现互斥值，系统只能报冲突，而这些冲突全是自己造出来的误报。

这条待审条目严重度是 medium，建议动作是把套装事实与型号硬件事实分开存放。套装里究竟装了什么，本轮只观测到"不含内存与电源适配器"这一层，细节还要人工补齐。

## 汇总：四种结果，四种动作

| 类型 | 示例 | 系统动作 |
| --- | --- | --- |
| 一致 | ZimaBoard 2 832 内存 8GB LPDDR5 | 归档通过，不进队列 |
| 事实冲突 | ZimaBoard 2 1664 内存 LPDDR5 与 DDR5 | 记待审，人工认定后再改页面 |
| 发现新实体 | 商城出现 ZimaCube 2 | 建实体候选，禁止继承上一代事实 |
| 范围不一致 | ZimaBlade Board Only 不含内存 | 按套装范围单独记录 |

四张卡共用同一种读法：先看两边各写了什么，再看状态决定这条记录的去向。中间没有"自动修复"这一步，状态只是分流器。
