---
title: "LLM Wiki"
description: "用 Page Card、Passage Card 和 Retrieval Layer 把站内内容变成可检索的本地知识地图。"
order: 1
updated: "2026-09-18"
---

> **光有页面级理解是不够的。** 知道每个页面"整体讲什么"只能缩小范围；链接要准，还必须知道**哪一段能补充什么**。

## 从整页到段落的三层结构

站内内容要变成可检索的地图，先得拆成三层各自独立、可以直接取用的卡片。

<div class="bae-flow">
  <div class="bae-node" data-tone="canonical"><b>Layer 1 · Page Card</b><span>这篇页面整体讲什么</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>Layer 2 · Passage Card</b><span>具体哪一段回答什么</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>Layer 3 · Retrieval</b><span>当前需求最该召回哪张卡</span></div>
  <div class="bae-caption">越往下越细：整页 → 段落 → 召回</div>
</div>

Page Card 管粗筛，一句话说清这个页面值不值得看；Passage Card 管定位，记录页面里每一段究竟能回答什么问题；Retrieval 管取用，在需要链接的那一刻决定该用哪一张卡。

粒度不同，用途就不同。整页级的信息适合回答"还有没有别的页面在讲这件事"，段落级的信息才适合回答"这句链接过去，读者会看到什么"。

这三层合起来才叫本地 LLM Wiki。**它不联网，只回答一件事：站内有什么。**

## Page Card 与 Passage Card 的差别

两张卡长得像，回答的问题完全不同。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">Layer 1 · Page Card</span>
    <div class="bae-card">
      <div class="bae-card-head">Run Plex on a Home Server</div>
      <dl class="bae-rows">
        <dt>类型</dt><dd>Blog</dd>
        <dt>主题</dt><dd>Plex · Home Server</dd>
        <dt>实体</dt><dd>Plex · ZimaBoard 2</dd>
        <dt>意图</dt><dd>Tutorial</dd>
        <dt>可以补充</dt><dd>Plex setup、media server、hardware requirements</dd>
      </dl>
    </div>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">Layer 2 · Passage Card</span>
    <div class="bae-card">
      <div class="bae-card-head">Passage 03 · Video Memory</div>
      <dl class="bae-rows">
        <dt>主题</dt><dd>VRAM</dd>
        <dt>类型</dt><dd>术语 · 解释</dd>
        <dt>回答</dt><dd>为什么显存限制模型大小</dd>
        <dt>适合链接</dt><dd>GPU、模型内存、推理硬件</dd>
      </dl>
    </div>
  </div>
</div>

Page Card 负责把几千页缩到少量候选，Passage Card 负责找到真正相关的那一段。两张卡都是教学示意，不是真实站点的抓取结果。

两层的字段写法可以相同，含义却不同。同样是"可以补充"，Page Card 列的是整个页面能覆盖的话题范围，Passage Card 列的是这一段具体适合被链过去解释什么。

## 只有 Page Card 会怎样

少一层，链接就只能停在页面级别。

<div class="bae-note" data-tone="info"><b>对比</b>：只有 Page Card 时，"Plex 页面"只是一个候选；有了 Passage Card，才知道该链到"硬件转码要求"，而不是整个页面。</div>

前者把读者丢到一篇长文的开头，后者直接指向他需要的那一段解释。链接的价值，恰恰落在这层差别上。

一层卡也不是没用，只是它的结论永远只能到"这个页面相关"。要让链接落到具体位置，就必须再往下一层。

## 站外内容不进来

这份 Wiki 的收录范围只有站内内容：Blog、Page、Product、Collection。

<div class="bae-note" data-tone="ok"><b>边界</b>：内链只查这份本地 Wiki；外链才联网找一手来源、官方文档和标准组织，两者不是同一次检索。</div>

站外材料偶尔会先以"发现线索"的身份出现，但它不能变成 Wiki 条目的内容，也不该被当成最终引用来源。一旦把外部材料也塞进来，卡片描述的就变成"别人怎么说"，而不是"我们站内写了什么"。

## Retrieval 参考什么

判断该用哪张卡时，Retrieval 看的是几件很朴素的事。

| Retrieval 依据 | 一句话说明 |
| --- | --- |
| 主题匹配 | 候选卡片和正文这句话是不是在讲同一件事 |
| 实体匹配 | Plex、ZimaBoard 2 这类具体名字对不对得上 |
| 意图匹配 | 需要的是定义、教程还是产品，卡片的意图能不能接住 |
| 段落相似度 | 候选段落本身离这句话有多近 |
| 页面类型 | Blog、Page、Product、Collection 里哪一种当目标更合适 |
| 时效性 | 内容是否已经过时，旧页面不该充当解释来源 |

这一层不展开向量数据库与 Embedding 原理，本栏目讲的是设计思想——**先有卡可检索，才谈得上召回。**

**Page Card 缩小页面范围，Passage Card 找到具体解释，Retrieval 决定谁最适合当链接目标。**
