---
title: "内链选择"
description: "从本地 LLM Wiki 中选择 Blog、Page、Product 或 Collection 作为最合适的站内目标。"
order: 1
updated: "2026-09-18"
---

> 内链的候选**只**来自本地 Wiki；选谁不看哪个页面关键词最多，只看这句话当下需要的是哪一种信息。

## 四种页面类型分别回答什么

四种 Page Type 不是四个档位，而是四种信息类型。Wiki 里的每一张 Page Card 都带着类型，命中哪一格，链接就给哪一格。

<div class="bae-outs">
  <div class="bae-out" data-tone="info"><b>BLOG</b><span>怎么做 / 为什么</span></div>
  <div class="bae-out" data-tone="info"><b>PAGE</b><span>是什么 / 长期定义</span></div>
  <div class="bae-out" data-tone="info"><b>PRODUCT</b><span>这个具体产品是什么</span></div>
  <div class="bae-out" data-tone="info"><b>COLLECTION</b><span>有哪些选择</span></div>
</div>
<div class="bae-caption">Page Type：四种信息类型的四格图</div>

一句话在讲步骤和取舍，就需要 Blog；在讲一个概念的稳定含义，就需要 Page。前两者的差别是「过程」与「定义」，不是新旧与深浅。

一句话在讲某台具体机器，就需要它的 Product 页；在讲"这一类里挑哪台"，就需要 Collection。读者想看的是"这台"还是"这类"，决定了链接的落点。

这一格判断之所以能提前做，是因为 Page Card 上写明了的类型。没有类型标注时，检索只能比相关度，最后总会挑到一个"看起来最像"的页面。

## 一句话该给谁：四个决策示例

判定的顺序是固定的：先读这句话的 Intent，再看 Wiki 里哪张 Card 的类型与之对齐。类型先对上，再比相关度。

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>local AI server</b><span>在解释一个概念</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>意图：定义</b><span>Page</span></div>
</div>

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>install Ollama</b><span>在描述一个动作</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>意图：动作</b><span>Blog</span></div>
</div>

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>prebuilt AI server</b><span>在指一个具体产品</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>意图：具体产品</b><span>Product</span></div>
</div>

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>AI server hardware options</b><span>在展开一组选择</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>意图：浏览选择</b><span>Collection</span></div>
</div>

同样一句"AI server"，落点可以完全不同：动词多就是 Blog，名词定义多就是 Page，带型号或"这台"就是 Product，带复数与比较就是 Collection。

判断时只问一个问题：读者读完这句，下一步想确认的是什么。想确认做法，就找 Blog；想确认含义，就找 Page。

## 站点类型会改变选择

同一个 Intent，在不同结构的站点上会落到不同位置。Wiki 只描述你站里实际有什么，所以选择的基准线要按站点类型定。

<div class="bae-compare">
  <div class="bae-col" data-tone="canonical"><span class="bae-col-label">大 SKU 电商站</span><p>几千个型号，Collection 承担品类导流，长尾解释性需求靠 Blog 承接。</p></div>
  <div class="bae-col" data-tone="observation"><span class="bae-col-label">产品少而明确的站</span><p>每条产品线就是少数几个重点型号，Product 页本身就能承接大量宽泛需求。</p></div>
</div>

| 站点类型 | 宽泛需求 | 精确型号 | 纯知识解释 |
| --- | --- | --- | --- |
| 大 SKU 电商站 | Collection | Product（PDP） | Blog / Page |
| 产品少、爆品明确的站 | Collection 或 Product | Product（PDP） | Blog / Page |
| 只有内容没有商品的站 | Blog / Page | 不适用 | Blog / Page |

大 SKU 站里，型号之间差异小、用户还在挑，Collection 才是正确落点；把宽泛需求直接塞进某个 PDP，读者会以为你在替他做决定。产品少而爆品明确的站（例如 ZimaSpace 这类）反过来成立：几个重点型号本身就代表了整条产品线，明确型号或明确产品场景可以直接给 PDP。

所以"所有站都大量直连 PDP"是错的。PDP 只在两种情况下最优：句子里出现了可识别的具体产品，或者这个站的产品线窄到 Product 页本身就承担了品类解释。

判断自己的站属于哪一类，看两件事就够了：同类产品有多少个可比较的型号，以及宽泛品类需求目前由哪个页面承接。承接页是谁，宽泛需求的落点就是谁。

## 候选很多，但通常只选一个

同一句话经常同时命中好几张 Card。类型对齐过滤掉大部分，剩下的再用相关度比较，通常只需要一个链接。

```text
句子：run a local AI server without a dedicated GPU
```
<div class="bae-card">
  <div class="bae-card-head">句子的需求</div>
  <dl class="bae-rows">
    <dt>Intent</dt><dd>动作 / 做法</dd>
    <dt>需要的类型</dt><dd>Blog</dd>
    <dt>读者要确认</dt><dd>没有独显能不能跑起来</dd>
  </dl>
</div>

| 候选页面 | 类型 | 信息类型 | 判断 |
| --- | --- | --- | --- |
| Run Ollama on a Low-Power Mini PC | Blog | 做法 | 建议添加链接 |
| GPU Guide | Blog | 选型解释 | 不建议链接 |
| Local AI Basics | Page | 定义 | 不建议链接 |

三个候选都跟 local AI server 相关，Wiki 里也可能都标了较高相关度。但是只有第一个的**信息类型**与 Intent 完全对上：读者在这句后面要的是做法，不是 GPU 选型，也不是概念定义。

被过滤掉的两个不等于没价值。它们更适合出现在别的句子里——讲显存时给 GPU Guide，讲定义时给 Local AI Basics。这一次先记为**不建议链接**，或者留到下一次。

<div class="bae-note" data-tone="warn"><b>容易做错</b>：把"相关度最高"当成"必须选它"。类型不对齐时，最高分候选也应该跳过。</div>

## 收尾

Page Type 不是等级，而是信息类型：Blog 讲怎么做，Page 讲是什么，Product 讲这一台，Collection 讲这一类。先对上类型，再比较相关度。
