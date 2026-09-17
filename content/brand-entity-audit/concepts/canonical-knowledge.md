---
title: "Canonical Knowledge"
description: "谁才有资格成为品牌的标准答案：候选怎么来、人审批什么、来源与状态为什么必须留痕，用一个 ZimaSpace 例子讲清。"
order: 3
updated: "2026-09-17"
---

> **Canonical Knowledge 是人工确认过的标准答案，不是抽取结果。** 页面抽得再准，得到的也只是候选；只有人批准之后，它才成为全站比对的基准。

## 标准答案为什么不能自动生成

这一页只回答一个问题：谁才有资格成为"标准答案"。

页面数量涨到几千之后，"哪句话写错了"本身已经没有意义，真正要回答的是"**我们承认哪一个说法**"。没有这份被承认的基准，比对就没有裁判，只会产出噪音。

所以 Canonical 的门槛不是"抽取得全"，而是**有人对它负责**。AI 能做的只有一件事：把页面上可能构成知识的内容抽成候选。

## 从页面到标准答案

<div class="bae-flow">
  <div class="bae-node"><b>品牌站 / Docs / Manual / 商城</b><span>只是来源，不是结论</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>候选池</b><span>AI 抽取出的候选条目</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>人工审核</b><span>批准 / 修改 / 驳回</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>Canonical</b><span>被确认的标准答案</span></div>
  <div class="bae-caption">AI = 候选抽取员，人 = 批准人</div>
</div>

这四个环节是整条链路的全部。**AI 只负责把候选摆到桌上，批准与否由人决定；即使候选来自品牌规格页，它的身份也仍然是候选。**

## 人在审什么

人审不是"点一下通过"，而是三种不同性质的动作。每一条候选都只会有这三种归宿之一。

| 动作 | 什么情况下用 | 之后它变成什么 |
| --- | --- | --- |
| 批准 | 抽取准确、来源支持得住 | 已确认的标准答案 |
| 修改 | 方向对，但取值或适用范围要收窄 | 修正后成为标准答案 |
| 驳回 | 页面表述根本不构成事实 | 不进标准答案，原始记录保留 |

审核还要看得到出处。每条候选都带着来源记录：来自哪个来源标识、哪个区块、页面原话是什么，缺一项审的人就无法判断语境。

<div class="bae-note" data-tone="info"><b>状态是必填的</b>：带人类判断的那部分只有三种写法——批准、驳回、需要确认。判不了就先挂着，不要"拍一个"当结论，待审项不能被当成已确认。</div>

## 一个例子：ZimaBoard 2 预装的是什么系统

同一个产品的同一个字段，三个地方给了三种说法。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">品牌规格页</span>
    <p>预装系统：ZimaOS</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">商城规格区</span>
    <p>预装系统：ZimaOS Plus</p>
  </div>
</div>

商城 FAQ 这一处又写回了 ZimaOS，和品牌规格页一样——但"两票对一票"不构成结论。三种说法都不能直接写进 Canonical。

<div class="bae-card">
  <div class="bae-card-head">候选条目 · ZimaBoard 2 预装系统</div>
  <dl class="bae-rows">
    <dt>属性</dt><dd>预装系统</dd>
    <dt>候选值</dt><dd>ZimaOS（品牌规格页）/ ZimaOS Plus（商城规格区）</dd>
    <dt>来源</dt><dd>品牌规格页、商城规格区、商城 FAQ</dd>
    <dt>状态</dt><dd><span class="bae-status" data-s="review">需要确认</span> <b>版本 / Edition 含义不清</b></dd>
  </dl>
</div>

挂起要问清的是一件事：ZimaOS 是系统本身、ZimaOS Plus 是它的一个版本，还是叠加在系统之上的付费权益？**这个问题没答案之前，Canonical 里就不该出现这个字段的标准值。**

## 页面抽出来的东西只有一个去处

<div class="bae-note" data-tone="warn"><b>Blog 抽出的内容不能自动回写 Canonical。</b>它记录的是"这个页面实际说了什么"，不是"事实是什么"；回写会把营销措辞和过时说法直接固化成标准答案。</div>

页面抽取结果只能进入页面观测，与 Canonical 比对之后才有对错可言。方向是不可逆的：**页面永远不能反向改写标准答案。**
