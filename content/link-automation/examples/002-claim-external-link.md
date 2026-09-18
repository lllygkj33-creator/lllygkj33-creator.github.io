---
title: "示例 002 · Claim 外链"
description: "用一个技术 Claim 演示如何从搜索结果中筛选一手来源并完成外链 QA。"
order: 2
updated: "2026-09-18"
---

> 一句技术 Claim，先判断为什么必须有来源，再用 Source Ladder 筛掉"看起来相关"的候选，最后只有通过 QA 的才写回正文。
>
> **本页数据为教学示意图**：待处理 Claim、候选来源与证据匹配度均为示意，不是真实站点的抓取结果，也不是真实搜索结果。

## 待处理的 Claim

<div class="bae-card">
  <div class="bae-card-head">Intel N150 supports VT-x</div>
  <dl class="bae-rows">
    <dt>内容类型</dt><dd>技术事实（Claim）</dd>
    <dt>Link Intent</dt><dd>Claim / 技术事实</dd>
    <dt>系统需要找什么</dt><dd>一手来源或官方文档，能直接证实这句话</dd>
    <dt>Anchor 候选</dt><dd>Intel N150 specifications</dd>
  </dl>
</div>

这句话在讲一颗具体处理器的指令集能力，属于可被证实也可被证伪的技术事实。读者会拿它做采购和虚拟化部署判断，写错就是事实错误。

内链解决不了它：站内 Wiki 里没有 Intel 的规格说明，只能联网找外部来源。所以 Link Intent 落在 Claim 上，检索范围是外部信源而不是本地 Wiki。

## 候选来源对比

搜索会一次返回很多条。它们都"和主题有关"，但只有一部分能真正证明这句话，因此评估的是**证据匹配度**而不是内容相关度。

| 候选来源 | 来源性质 | 证据匹配度 | 结论 |
| --- | --- | --- | --- |
| 厂商官方规格页 | 一手来源 | 96% | 采用 |
| 标准组织 / 官方文档 | 一手来源 | 92% | 可作补充 |
| 维基百科条目 | Discovery Source | 74% | 只作发现，不作最终引用 |
| 二手博客转述 | 转述 | 61% | 不采用 |

<div class="la-score" data-tone="strong">
  <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">96%</span></div>
  <span class="la-score-track"><span class="la-score-fill" style="width: 96%"></span></span>
  <span class="la-score-note">厂商官方规格页 · 一手来源</span>
</div>

<div class="la-score" data-tone="strong">
  <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">92%</span></div>
  <span class="la-score-track"><span class="la-score-fill" style="width: 92%"></span></span>
  <span class="la-score-note">标准组织文档 · 一手来源</span>
</div>

<div class="la-score" data-tone="weak">
  <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">74%</span></div>
  <span class="la-score-track"><span class="la-score-fill" style="width: 74%"></span></span>
  <span class="la-score-note">维基百科条目 · 只用于发现线索</span>
</div>

<div class="la-score" data-tone="low">
  <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">61%</span></div>
  <span class="la-score-track"><span class="la-score-fill" style="width: 61%"></span></span>
  <span class="la-score-note">二手博客转述 · 只是转述</span>
</div>

厂商官方规格页直接列出该型号的指令集扩展，是这句话的原始出处。标准组织文档能佐证机制层面的定义，但不能单独确认具体型号。

维基百科条目胜在概览清楚，适合用来找线索，例如顺着它找到厂商页；它本身不承担最终引用。二手博客转述只是把别人的话又说了一遍，越往下越接近传闻。

## Source Ladder 判定

<div class="bae-flow">
  <div class="bae-node" data-tone="canonical"><b>1 · Primary Source</b><span>厂商官方规格页</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>2 · Official Docs</b><span>标准组织 / 官方文档</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>3 · Standards Body</b><span>规范条文</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>4 · Original Research</b><span>实测与论文</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>5 · Strong Secondary</b><span>有署名与出处的转述</span></div>
</div>

阶梯从上往下走，够用就停。本例在第一级就拿到厂商官方规格页，因此不需要再往下找二手来源，也不需要为了"多一个引用"而凑第二个链接。

停得早不是偷懒：引用越多，失效和漂移的面越大。一级来源能单独证实这句话时，再加第二名只会增加维护成本。

## QA 检查

<div class="bae-card">
  <div class="bae-card-head">写回之前的逐项检查</div>
  <dl class="bae-rows">
    <dt>来源可访问且仍然有效</dt><dd>通过则采用；不通过就重查，仍找不到则放弃</dd>
    <dt>来源真的支持这句话</dt><dd>逐句对照规格条目；只是泛泛相关就降级或不用</dd>
    <dt>Anchor 与来源内容对得上</dt><dd>用型号规格名；对不上就改写 Anchor 或换来源</dd>
    <dt>链接密度正常</dt><dd>一段一个外链；偏多就删掉最弱的那个</dd>
    <dt>同一来源没有重复引用过多</dt><dd>多句同源则合并为一次引用</dd>
    <dt>没有更好的来源被漏掉</dt><dd>回看搜索结果，确认一级来源确实不存在</dd>
  </dl>
</div>

QC 不是打勾仪式。任何一项不通过，处理方式都是"降级、改写或放弃"，而不是硬留着。

最容易漏的是第二项——来源确实谈虚拟化，但通篇没提 `N150`。这种"泛泛相关"如果放过去，读者点开会发现找不到依据。

## 写回结果

<div class="la-audit">
  <div class="la-audit-main">
    <p>The <b>Intel N150</b> ① supports VT-x, so entry-level virtualization workloads can run on it.</p>
  </div>
  <aside class="la-audit-panel">
    <div class="la-rec">
      <div class="la-rec-head"><b>①</b><span class="bae-status" data-s="link">建议添加链接</span></div>
      <div class="la-rec-title">Intel N150 <span class="la-rec-arrow">→</span> 厂商官方规格页</div>
      <div class="la-score" data-tone="strong">
        <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">96%</span></div>
        <span class="la-score-track"><span class="la-score-fill" style="width: 96%"></span></span>
        <span class="la-score-note">一级来源 · QA 全部通过</span>
      </div>
      <div class="la-rec-meta">Intent <b>Claim</b> · Anchor <b>Intel N150 specifications</b></div>
    </div>
  </aside>
</div>

Anchor 写成 `Intel N150 specifications`，而不是 `click here` 或光秃秃的 `official page`：读者不点开也知道会看到什么，搜索引擎也读得懂这段链接在说什么。

同一段里另外几个术语如果有本地 Wiki 页面，走的是内链流程，不要因为这句话已经挂了一个外链，就顺手给每个名词都补链接。

## 反例

<div class="bae-note" data-tone="warn"><b>不要做这三件事</b>：把 `.edu` / `.org` / `.tech` 当成自动权威；用维基百科当最终来源；找不到强来源就硬塞一个弱来源。</div>

域名后缀只说明注册类型，不说明内容质量。维基百科是 Discovery Source，它的引用列表往往才是真正该去的地方。弱来源不仅是证据不足，还会把一句本来中立的陈述写成可疑的断言。

三种做法的共同点是"必须挂上点什么"。这个执念才是外链自动化最容易出错的地方。

## 结论

外链的专业度体现在"找不到够强的来源时选择不加"，而不是"每句话都挂一个链接"。Claim 有了一级来源才写回，没有就留着不加，或者把它改成不需要外部证据的说法。
