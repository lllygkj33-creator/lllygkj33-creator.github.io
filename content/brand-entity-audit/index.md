---
title: "品牌实体检测"
description: "把品牌知识变成可检查的 Canonical Fact / Claim，再检测官网、商城、Blog 和 Support 是否保持一致。"
order: 0
updated: "2026-09-17"
---

> 不是检查 5000 个页面，而是检查 5000 个页面有没有偏离几百条标准知识。

这一页是地图：先看清有哪些概念、整条链路怎么走，再决定深入哪一块。

三条边界先记住：AI 只产出候选，不决定标准答案；页面检测只写观察结果，不回写标准知识；冲突只报差异，不自动判定谁对谁错。

## 四个核心概念

<div class="q-overview">
  <div class="q-card"><span class="q-label">Entity</span><span class="q-score q-medium">什么算一个实体</span><span class="q-note-line">品牌、产品、Variant、Edition 各自算一个对象</span></div>
  <div class="q-card"><span class="q-label">Fact 与 Claim</span><span class="q-score q-medium">它是什么 vs 它能做什么</span><span class="q-note-line">硬规格与品牌主张分开存放</span></div>
  <div class="q-card"><span class="q-label">Observation</span><span class="q-score q-medium">页面实际说了什么</span><span class="q-note-line">只记录，不改写标准知识</span></div>
  <div class="q-card"><span class="q-label">Dependency</span><span class="q-score q-medium">这条知识影响哪些页面</span><span class="q-note-line">页面 → 实体 → Fact / Claim</span></div>
</div>

四张卡是四个角色，不是四个步骤。实体划定检查范围，Fact 与 Claim 给出标准答案，Observation 记录页面实况，Dependency 负责反查影响面。

它们照应的正是站群最常见的一类问题：同一条知识在不同页面被说了不同的话。**先有可比较的标准，才有可比对的页面。**

## 整体架构

<div class="bae-flow">
  <div class="bae-node"><b>官方信源</b><span>品牌站 / Docs / Manual</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>AI 候选抽取</b><span>只产出候选，不下结论</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>人工审核</b><span>批准 / 修改 / 驳回</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-split">
    <div class="bae-lane">
      <div class="bae-lane-label">标准答案侧</div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="canonical"><b>Canonical Knowledge</b><span>人工确认后才成立</span></div>
      <div class="bae-arrow"></div>
    </div>
    <div class="bae-lane">
      <div class="bae-lane-label">页面实况侧</div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="observation"><b>Shop / Blog / Page</b><span>商城 PDP / Blog / Support</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="observation"><b>Page Observation</b><span>页面实际说了什么</span></div>
      <div class="bae-arrow"></div>
    </div>
  </div>
  <div class="bae-join">
    <div class="bae-lane">
      <div class="bae-lane-label">标准答案侧</div>
      <div class="bae-node" data-tone="canonical"><b>标准答案就绪</b><span>作为比对的基准</span></div>
    </div>
    <div class="bae-lane">
      <div class="bae-lane-label">页面实况侧</div>
      <div class="bae-node" data-tone="observation"><b>页面记录就绪</b><span>作为被比对的一方</span></div>
    </div>
  </div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>Compare</b><span>逐条比对，发现差异</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-outs">
    <div class="bae-out" data-tone="warn"><b>冲突</b><br>哪条知识不一致</div>
    <div class="bae-out" data-tone="info"><b>影响面</b><br>改动会波及哪些页面</div>
  </div>
  <div class="bae-caption">左边在造标准答案，右边在记录页面实况，两条链路永不互相写入。</div>
</div>

左边那条决定"正确答案是什么"，右边那条只回答"这个页面写了什么"。两者在 Compare 相遇，产出的是差异，不是判决。

两条路径必须分开：如果页面抽出的内容能自动写回标准知识，错误页面就会污染基准，之后再拿它做比对也就没有意义了。

## 它解决什么

- **规格冲突**：同一个产品在品牌官网、商城 PDP 和 Blog 里的硬规格写了不同数值。
- **场景主张漂移**：一个页面说"可以运行 Plex"，另一个页面升级成"最适合 Plex"。
- **SKU 与 Bundle 适用范围错位**：产品规格被直接套用到套装页，Bundle 的适用范围无人单独维护。
- **知识变化后影响面未知**：某条规格修正之后，不知道全站还有哪些页面引用它。

四条现象对应四种检查能力：比 Fact、比 Claim 强度、比适用范围、反查依赖。它们都是知识层面的问题，页面只是出口。

也正因为如此，修复动作通常落在知识一侧，而不是逐页改写措辞。

## 学习路径

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">01 概念</span>
    <p>先理解 Entity、Fact 与 Claim：什么算一个实体，硬规格和品牌主张为什么必须分开。</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">02 规范</span>
    <p>再学 Canonical、Observation 与冲突判定：怎么建立标准知识，怎么判断页面偏离。</p>
  </div>
</div>

<div class="bae-outs">
  <div class="bae-out" data-tone="info"><b>03 案例</b><br>最后看 ZimaSpace 怎么把这套流程跑一遍</div>
</div>

顺序不建议调换。概念没打底就直接看案例，容易把"页面检查"误当成"知识治理"。

## 示例 001 入口

<div class="bae-card">
  <div class="bae-card-head">ZimaSpace Pilot</div>
  <dl class="bae-rows">
    <dt>输入</dt><dd>6 个品牌信源、3 个商城 PDP、4 个产品 Blog</dd>
    <dt>第一步</dt><dd>建立 Canonical Knowledge</dd>
    <dt>第二步</dt><dd>做 Page Observation</dd>
    <dt>第三步</dt><dd>找冲突</dd>
    <dt>第四步</dt><dd>看影响面</dd>
    <dt>产出</dt><dd>待审条目与受影响页面清单</dd>
  </dl>
</div>

案例细节留给案例页，这里只记一条路径：先有标准知识，才有可比的页面检测。

> 结论：这套系统的判断力不在抓了多少页面，而在标准答案有多可信、差异有没有被正确分级。
