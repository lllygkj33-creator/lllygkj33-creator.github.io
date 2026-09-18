---
title: "链接自动化"
description: "从本地 LLM Wiki 到 Link Intent、目标检索与链接 QA 的自动化方法。"
order: 0
updated: "2026-09-18"
---

> 链接自动化不是关键词匹配，也不是让模型猜 URL，而是先把站内内容变成可检索的本地 Wiki，再判断"为什么需要链接"，最后才决定链接给谁。

## 四个核心概念

<div class="q-overview">
  <div class="q-card"><span class="q-label">LLM Wiki</span><span class="q-score">站内有什么</span><span class="q-note-line">Page Card + Passage Card</span></div>
  <div class="q-card"><span class="q-label">Link Intent</span><span class="q-score">为什么链接</span><span class="q-note-line">定义 / 术语 / Claim / 动作 / 产品</span></div>
  <div class="q-card"><span class="q-label">Retrieve</span><span class="q-score">链接给谁</span><span class="q-note-line">内链查本地 Wiki，外链查 SERP</span></div>
  <div class="q-card"><span class="q-label">QA</span><span class="q-score">能不能写回</span><span class="q-note-line">Anchor、重复、密度、来源质量</span></div>
</div>

四张卡是四个角色，不是四个步骤。Wiki 负责让站内内容可被检索，Link Intent 负责说清这一段为什么需要链接，Retrieve 负责找目标，QA 决定这条链接能不能真的写回正文。

少任何一张，系统就退化成关键词匹配：没有 Wiki 就只能猜 URL，没有 Intent 就只会挑分数最高的候选，没有 QA 就会把同一个链接重复插进十篇文章。

## 整体架构

<div class="bae-flow">
  <div class="bae-split">
    <div class="bae-lane">
      <div class="bae-lane-label">站点内容这条链</div>
      <div class="bae-node" data-tone="canonical"><b>站点内容</b><span>Blog / Page / Product</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="canonical"><b>Page Card</b><span>这篇页面整体讲什么</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="canonical"><b>Passage Card</b><span>哪一段能回答哪类问题</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="canonical"><b>LLM Wiki</b><span>可检索的本地知识地图</span></div>
    </div>
    <div class="bae-lane">
      <div class="bae-lane-label">待处理文章这条链</div>
      <div class="bae-node" data-tone="observation"><b>待处理文章</b><span>准备补链接的正文</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="observation"><b>Link Intent</b><span>这一句为什么需要链接</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="observation"><b>Candidate Match</b><span>两条链在这里汇合</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="observation"><b>分叉：内链还是外链</b><span>按 Intent 决定查哪一边</span></div>
      <div class="bae-outs">
        <div class="bae-out" data-tone="info"><b>Internal</b><br>查本地 Wiki</div>
        <div class="bae-out" data-tone="info"><b>External</b><br>查 SERP</div>
      </div>
    </div>
  </div>
  <div class="bae-join">
    <div class="bae-lane">
      <div class="bae-lane-label">候选来源</div>
      <div class="bae-node" data-tone="canonical"><b>本地 Wiki</b><span>Blog / Page / Product / Collection</span></div>
    </div>
    <div class="bae-lane">
      <div class="bae-lane-label">候选来源</div>
      <div class="bae-node" data-tone="observation"><b>SERP</b><span>一手来源 / 官方文档 / 标准组织</span></div>
    </div>
  </div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>Anchor + QA</b><span>选词、去重、看来源是否站得住</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>Final Page</b><span>带链接、可复核的正文</span></div>
  <div class="bae-caption">左边理解整个站点，右边理解这一篇文章，两边在 Candidate Match 汇合。</div>
</div>

左边那条只回答"站内有什么可链接的内容"，是链接的来源；右边那条只回答"这篇正文的哪一句需要链接、需要哪一种链接"。

两条链在 Candidate Match 相遇，才第一次出现具体目标：Intent 指向站内补充就查本地 Wiki，指向 Claim 或术语就查 SERP。之后才轮到 Anchor 与 QA 把关。

## 内链与外链的边界

内链不联网，只在本地 Wiki 里检索，范围是 Blog、Page、Product 与 Collection，用途是站内补充。外链联网搜索，面向一手来源、官方文档、标准组织与原始研究，用途是支撑 Claim、定义、证据与政策。

两者不能用同一套检索方式。把内链当成"网上找一个相关页面"，会拉来一堆既不属于站内、也支撑不住 Claim 的目标；反过来，只查本地 Wiki 也补不上一个需要外部证据的技术事实。

判断顺序是先看 Link Intent，再看该查哪一边：需要读者继续在站内读下去，就是内链；需要一句话站得住，就是外链。

Wikipedia 只作发现线索，默认不作为最终引用来源；权威性也不看域名后缀。

## 从哪开始

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">01 概念</span>
    <p>先分清 LLM Wiki、Link Intent 和 Feedback Loop：站内内容怎么变成可检索的地图，链接意图从哪里来，找不到好目标时又该往哪走。</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">02 规范</span>
    <p>再学内链选择、外链与信源、Anchor 与 QA：怎么在四类站内页面里选一个最合适的，怎么筛外部来源，怎么写 Anchor 才不会变成 click here。</p>
  </div>
</div>

<div class="bae-outs">
  <div class="bae-out" data-tone="info"><b>03 示例</b><br>最后看 Blog 内链与 Claim 外链各跑一遍完整流程</div>
</div>

顺序不建议调换。跳过概念直接看示例，容易把它读成"自动插链接的工具"；先有 Wiki 和 Intent，示例里的每一步才有理由。

## 两个示例入口

<div class="bae-card">
  <div class="bae-card-head">示例 001 · Blog 内链</div>
  <dl class="bae-rows">
    <dt>输入</dt><dd>一段 Blog 正文</dd>
    <dt>判断</dt><dd>先做 Link Intent，再检索本地 Wiki</dd>
    <dt>产出</dt><dd>从站内候选里挑出一个最合适的目标</dd>
    <dt>收尾</dt><dd>逐条看检测面板与相关度</dd>
  </dl>
</div>

<div class="bae-card">
  <div class="bae-card-head">示例 002 · Claim 外链</div>
  <dl class="bae-rows">
    <dt>输入</dt><dd>一个技术 Claim</dd>
    <dt>检索</dt><dd>联网搜一手来源，而不是先搜二手博客</dd>
    <dt>产出</dt><dd>候选来源对比后，证据匹配最好的那个胜出</dd>
    <dt>收尾</dt><dd>QA 通过后才写进正文</dd>
  </dl>
</div>

两个示例走的是同一套四层：Wiki、Intent、Retrieve、QA。差别只在检索那一侧查的是本地索引还是搜索结果。

示例里的正文与候选数据均为教学示意图，不是真实站点的抓取结果。细节留在示例页，这里只留路径。

> 这一栏的顺序是固定的：先让站内内容可检索，再问为什么链接，最后才决定链接给谁。
