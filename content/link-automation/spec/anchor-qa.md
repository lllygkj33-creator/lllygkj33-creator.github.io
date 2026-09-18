---
title: "Anchor 与 QA"
description: "控制 Anchor、重复链接、链接密度、来源质量与 Freshness，避免自动链接产生新的内容问题。"
order: 3
updated: "2026-09-18"
---

> **找到目标，不等于可以写回。** Anchor 服务的是当前这句话的上下文，不是目标页面的关键词；任何链接写回页面之前，都必须先过一次 QA。

## Before / After：同一个目标，两种 Anchor

<div class="bae-compare">
  <div class="bae-col" data-tone="wrong">
    <span class="bae-col-label">❌ 不能写回</span>
    <p>click here</p>
    <p>完整复制目标页 Title：How to Install Ollama on a Home Server (2026 Guide)</p>
  </div>
  <div class="bae-col" data-tone="right">
    <span class="bae-col-label">✅ 可以写回</span>
    <p>install Ollama on a home server</p>
  </div>
</div>

Anchor 要能在正文里自然读通：读者只看这一句，就知道点进去会拿到什么。"click here" 把判断责任推给读者，整段复制 Title 则把目标页的营销措辞搬进了你的句子。

这里之所以需要链接，是因为读者读完这句话会立刻想问「具体怎么装」，而正文没有展开这个动作。Anchor 回答的是正文欠下的那个问题，不是目标页想被人搜到的那些词。

## Anchor 生成规则

| 规则 | 做法 | 反例 |
| --- | --- | --- |
| 优先用句子里已有的词 | 直接截取本句现成的短语 | 为了凑搜索词另造一个词组 |
| 控制长度 | 3–8 个词，或一个短名词短语 | 把整句话当成 Anchor |
| 同一目标不重复用同一个 Anchor | 第二次出现换说法，或干脆不加 | 全页反复写 local AI server |
| 锚文本与目标内容对得上 | 目标页确实在讲这件事 | 锚写 Ollama 安装，目标页只讲显存 |
| 不堆关键词 | 一条链接只表达一个意思 | 在一句话里塞三个近义短语 |

前两条决定 Anchor 好不好读，后三条决定它值不值得插。规则不通过时优先换锚，而不是换目标：目标选对、锚写得生硬，通常改几个词就能救回来。

## QA Checklist

<div class="bae-card">
  <div class="bae-card-head">写回前 QA Checklist · 6 项</div>
  <dl class="bae-rows">
    <dt>Anchor 在正文里读起来自然</dt><dd>读不通就换锚，换不到就放弃这条链接。</dd>
    <dt>目标页面足够具体</dt><dd>只是泛泛相关，就回到检索或记成内容缺口。</dd>
    <dt>同一 URL 没有重复过多</dt><dd>重复出现就只保留价值最高的那一处。</dd>
    <dt>页面链接密度正常</dt><dd>密度偏高就删掉价值最低的那条，而不是换锚。</dd>
    <dt>目标页面可访问</dt><dd>拿不到正常响应就改指向，或直接跳过。</dd>
    <dt>外部来源仍然有效</dt><dd>外链要额外再查一次，失效就换来源或不加。</dd>
  </dl>
</div>

<div class="bae-note" data-tone="warn"><b>容易做错</b>：六项里有一项不合格时，换一个 Anchor 蒙过去，只是把问题挪到了下一页。</div>

六项里只要有一项不合格，这条链接就不写回去。跳过不是失败，它是这一页的正常输出之一，但跳过必须带上原因，否则下一轮还会再犯同一件事。

## 链接密度与重复

| 观察点 | 正常 | 偏高 | 处理 |
| --- | --- | --- | --- |
| 同一段落连续插链 | 最多一条 | 相邻两句各插一条 | 只留最相关的一条 |
| 同一目标在整页出现次数 | 一次 | 三次以上 | 只保留首次或最关键那处 |
| 单句锚文本占比 | 少量词 | 半句话都是链接 | 缩短 Anchor |
| 全页链接密度 | 与段落长度匹配 | 每段都挂链接 | 删掉价值最低的一条 |

同一目标在一页里第一次出现的位置最适合作为锚点，读者的疑问就是在那里产生的，后面的重复出现大多只是复述。密度过高时优先删掉价值最低的那条，而不是换一个更短的锚：这是数量问题，减法比改写有效。

## Freshness 与 404 / 跳转

<div class="bae-mini-graph">
  <svg width="340" height="150" viewBox="0 0 340 150" role="img" aria-label="外链与站内目标的回查路径">
    <text x="170" y="20" text-anchor="middle" font-size="13" fill="currentColor">写回之后仍要回查</text>
    <path d="M170 28 v16 M170 44 H85 M170 44 H255" stroke="currentColor" stroke-opacity="0.35" fill="none"/>
    <text x="85" y="66" text-anchor="middle" font-size="12" fill="currentColor">外链</text>
    <text x="255" y="66" text-anchor="middle" font-size="12" fill="currentColor">站内目标</text>
    <path d="M85 76 v14 M255 76 v14" stroke="currentColor" stroke-opacity="0.35" fill="none"/>
    <text x="85" y="106" text-anchor="middle" font-size="11" fill="currentColor">来源失效 / 改版</text>
    <text x="255" y="106" text-anchor="middle" font-size="11" fill="currentColor">已合并 / 已跳转</text>
    <text x="85" y="130" text-anchor="middle" font-size="11" fill="currentColor">换来源或不加</text>
    <text x="255" y="130" text-anchor="middle" font-size="11" fill="currentColor">改指向或跳过</text>
  </svg>
</div>

外链会失效，也会在保留地址的前提下改版：昨天讲规格的页面今天变成营销页，链接还在，证据已经没了。站内目标则要检查是否已被合并或跳转，避免把链接写到已经 404 的地址上。

Freshness 不要求每轮写回都全站回查。新增外链的那一轮额外核一次，之后按固定周期回查曾经失效过的来源，就够了。

## 写回失败时的处理

<div class="bae-outs">
  <div class="bae-out" data-tone="warn"><b>Anchor 不自然</b><span>换锚，换不到就放弃</span></div>
  <div class="bae-out" data-tone="warn"><b>目标不够具体</b><span>回到检索，或记成缺口</span></div>
  <div class="bae-out" data-tone="info"><b>QA 不通过</b><span>跳过并记录原因</span></div>
  <div class="bae-out" data-tone="info"><b>外链失效</b><span>换来源，或不加</span></div>
</div>

四个出口对应四种失败原因，处理方向并不相同：前两种说明这次的选择有问题，后两种说明这条链接本身不该写回去。QA 不通过时跳过，并在反馈里记录原因，记录的是规则该改哪里，不是只标记这一条失败。

能安全写回才叫完成。写不回去的链接不要硬塞：回到 Feedback Loop，目标不够具体就转成建议补充现有页面，反复出现却没有合适去处就转成建议新增内容。
