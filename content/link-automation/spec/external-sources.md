---
title: "外链与信源"
description: "针对 Claim、定义、证据和技术事实，通过搜索找到更匹配的一手或权威外部来源。"
order: 2
updated: "2026-09-18"
---

> 外链不是为了凑引用，而是为了支撑定义、术语、Claim、证据、政策与技术事实：先判断"为什么需要"，再判断"谁最适合"。

## Source Ladder：从强到弱排成五级

外链候选先按来源性质排队，再比内容是否对口。级别越靠前，越适合承担一句需要被相信的话。

<div class="bae-flow">
  <div class="bae-node" data-tone="canonical"><b>Primary Source</b><span>事件或规格的第一现场</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>Official Docs</b><span>厂商官方规格与说明</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>Standards Body</b><span>标准组织的正式定义</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>Original Research / Dataset</b><span>原始研究或公开数据</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>Strong Secondary Source</b><span>高质量二手整理</span></div>
</div>
<div class="bae-caption">Source Ladder：五级来源阶梯</div>

Level 1–2 回答"这个技术事实到底是什么"，产品规格、接口支持、版本行为都属于这里，能用官方就永远用官方。

Level 3–4 回答"这个术语、方法、指标的公认说法是什么"，标准组织文档与原始研究在被反复引用时最稳。

Level 5 是兜底：找不到更靠前的来源时，才用一篇写得扎实的二手整理，并且要清楚它只是转述。

阶梯的用法是自上而下，不是四选一：先看这句话能不能被第一手来源支撑，找不到才逐级下降。同一句话通常只需要一个链接，把最靠前的那一级给出去即可。

## 不要这样：把域名后缀当权威

<div class="bae-compare">
  <div class="bae-col" data-tone="wrong"><span class="bae-col-label">错误做法</span><p>看到 <code>.edu</code> / <code>.org</code> / <code>.tech</code> 就判定"这是权威来源"，直接加链。</p></div>
  <div class="bae-col" data-tone="right"><span class="bae-col-label">正确做法</span><p>先看这句话需要什么证据，再看这个来源是不是该事实的第一手出处。</p></div>
</div>

域名后缀描述的是注册主体和用途，与内容是否准确、是否一手没有必然关系。同样一个后缀下，既有值得引的标准文档，也有学生作品和营销页。

判断依据只有两条：这句话的 Claim 需要什么级别的证据，这个来源在多大程度上就是该证据本身。

## Wikipedia 的边界

<div class="bae-note" data-tone="warn"><b>Wikipedia 是 Discovery Source</b>：它擅长帮你找到该话题的正规名称、关键术语和原始来源入口，但默认<b>不作为最终引用来源</b>。</div>

正确用法是把它当路标：从条目页底部的来源列表跳到标准组织文档或厂商官方规格页，链给那个原始来源。只有当这句话本身就是在描述"Wikipedia 上的定义是这样"时，它才可以被引用。

## 外链判断流程：四步

四步是有顺序的，任何一步没有答案，就不要往下走。

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>1 · 这句话是哪种 Intent</b><span>定义 / 术语 / Claim / 证据 / 政策 / 技术事实</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>2 · 需要证据还是定义</b><span>决定要找哪一级来源</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>3 · 找一手来源</b><span>从 Source Ladder 顶往下找</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="warn"><b>4 · 找不到就不加</b><span>而不是硬塞一个弱来源</span></div>
</div>

第三步失败很常见，尤其是厂商改过文档或产品已经停产。这时正确的动作是把这句话改写得更保守，或者放弃加链。

硬塞一个弱来源，会把一个原本中性的句子变成需要被质疑的句子，比不加更糟。

## 同一个 Claim，两种来源

```text
Claim：这台设备的处理器支持硬件虚拟化
```

<div class="bae-compare">
  <div class="bae-col" data-tone="wrong"><span class="bae-col-label">弱来源 · 二手博客转述</span><p>作者复述了参数，可能抄自旧版本，也可能漏掉条件；页面还会改版、失效。</p></div>
  <div class="bae-col" data-tone="right"><span class="bae-col-label">强来源 · 厂商官方规格 / 标准文档</span><p>规格由厂商维护，指令集归属由标准组织定义，读者可以自己核对到字段。</p></div>
</div>

| 对比项 | 弱来源（二手博客） | 强来源（官方规格 / 标准文档） |
| --- | --- | --- |
| 一手程度 | 转述，隔了一层 | 就是该事实本身 |
| 可核对性 | 无法追溯到原始字段 | 读者可自行核对 |
| 时效 | 随页面改版失效 | 由发布方维护版本 |
| 证据匹配度 | 弱 | 强 |

<div class="la-score" data-tone="weak">
  <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">72%</span></div>
  <span class="la-score-track"><span class="la-score-fill" style="width: 72%"></span></span>
  <span class="la-score-note">二手博客：说得像，但追溯不到原始出处</span>
</div>

<div class="la-score" data-tone="strong">
  <div class="la-score-head"><span class="la-score-label">证据匹配度</span><span class="la-score-value">96%</span></div>
  <span class="la-score-track"><span class="la-score-fill" style="width: 96%"></span></span>
  <span class="la-score-note">厂商官方规格页 / 标准组织文档：直接支撑该 Claim</span>
</div>

差的不是字数，也不是页面好不好看，而是这句话能不能被读者顺着链回到事实本身。

## 收尾

找不到够强的来源时，跳过比硬链更专业。外链的价值来自它撑住了什么，而不是它出现了几次。
