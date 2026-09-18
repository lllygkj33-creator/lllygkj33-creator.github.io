---
title: "Link Intent"
description: "先判断一段内容为什么需要链接，再决定应该寻找哪一种目标页面或外部信源。"
order: 2
updated: "2026-09-18"
---

> **先判断为什么要链接，再判断链接给谁。** 顺序反了，就会出现"词相同、意图不同"的错链。

## 为什么先问"为什么要链接"

正文里出现一个名字，不等于这里需要一条链接。

"VRAM limits…" 是要人解释概念，"Install Ollama…" 是要人照着做，"Quantization reduces…" 是要一份证据。三句话挤在同一段里，需要的目标内容却完全不同。

Link Intent 就是给每一句话先贴一个意图标签，再让检索去找那一类内容。**标签错了，后面检索得再准也是白费。**

同一个词在不同句子里还会换 Intent。"Docker" 出现在安装步骤里是动作，出现在解释为什么用容器的句子里就是术语。判断依据是这句话在做什么，不是它提到了哪个词。

## Intent 矩阵

系统不必读懂整篇文章，它只需要判断这句话落在哪一格。

| 正文内容 | Intent | 系统需要找什么 |
| --- | --- | --- |
| "A local AI server is…" | 定义 | 基础解释页 |
| "VRAM limits…" | 术语 | 专门解释 VRAM 的内容 |
| "Quantization reduces…" | Claim | 解释 + 证据 |
| "Install Ollama…" | 动作 | 教程 |
| "Choose a server…" | 产品 | Product / Collection |
| "Unlike a NAS…" | 比较 | 讲清两边差异的内容 |
| "Regulations require…" | 政策 | 官方条款或政策原文 |
| "Learn more about storage pools…" | 延伸阅读 | 更深入的 Blog / Page |

这张表就是 Link Intent 的全部：同一句话落在不同行，要找的东西就换了。它先回答"需要什么"，不回答"具体给谁"。

行与行之间不能互换。把 Claim 当定义处理，就会链到一篇只讲概念、没有依据的页面；把动作当术语处理，读者点了半天也装不上软件。**Intent 判错，检索只会更努力地跑错方向。**

## Intent 决定内链还是外链

Intent 判完，链接的方向基本已经定了。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical">
    <span class="bae-col-label">本地 Wiki 能回答的 → 内链</span>
    <p>定义、教程、产品、延伸阅读。</p>
    <p>这些内容站内本来就有，检索范围只限本地 Wiki，不联网。</p>
    <p>例如 "Install Ollama…" 要找的是教程页，"Choose a server…" 要找的是 Product 或 Collection。</p>
  </div>
  <div class="bae-col" data-tone="observation">
    <span class="bae-col-label">必须联网找证据的 → 外链</span>
    <p>Claim、术语、政策、技术事实。</p>
    <p>需要一手来源、官方文档或标准组织，站内页面自身说服力不够。</p>
    <p>例如 "Regulations require…" 要看条款原文，"Quantization reduces…" 要找到可核对的依据。</p>
  </div>
</div>

两边不能用同一套检索方式：内链只在本地 Wiki 里选，外链才出去找来源。把两者混在一次搜索里，结果就是拿站内页面去"支撑"一个本该由官方文档支撑的说法。

## 只认关键词会链错

不看 Intent，最典型的错误是见词就链。

<div class="bae-note" data-tone="warn"><b>容易做错</b>：正文里出现 "Docker"，就链到站内任意一个 Docker 页面。这句话是要定义、要教程，还是要产品？判断不出来，链过去的那一页大概率不是读者要的。</div>

缺的不是候选，是理由。同一个 "Docker" 至少有三种可能：解释它是什么、教人怎么装、介绍某个与之相关的产品。三种都需要，但一次只能选一种，而选哪一种完全取决于这句话想干什么。

Intent 缺位时，检索只剩字面相似可用，最后选中的往往只是"最像的那一页"，而不是"最对的那一页"。判断出 Intent，检索才有明确的靶子。

同一个词还可能同时是两种 Intent，这时要按这句话的主意图走，而不是两种都链一遍。链接密度本来就该由"读者在这里需不需要"决定，不是由词出现了几次决定。

**Intent 决定"需要什么"，Retrieval 才决定"具体是谁"。**
