---
title: "抽取流水线"
description: "页面按四条入口分流：结构化数据与规格表走规则抽取，正文与常见问答走模型，图片走视觉识别，最后汇成候选与观测。"
order: 2
updated: "2026-09-17"
---

> 抽取的目标不是把页面变成一段通顺的总结，而是把页面变成可逐条审核的记录。结构化的部分交给规则，模型只负责自然语言那一段。

## 管线形状：四条入口，一套记录

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>页面进入</b><span>HTML + 结构化数据 + 图片</span></div>
  <div class="bae-split">
    <div class="bae-lane">
      <div class="bae-lane-label">规则入口</div>
      <div class="bae-node"><b>JSON-LD</b><span>字段直读</span></div>
      <div class="bae-node"><b>规格表 / DOM</b><span>按选择器直读</span></div>
    </div>
    <div class="bae-lane">
      <div class="bae-lane-label">模型入口</div>
      <div class="bae-node"><b>正文 / FAQ</b><span>LLM 抽取</span></div>
      <div class="bae-node"><b>图片 / 截图</b><span>Vision / OCR</span></div>
    </div>
  </div>
  <div class="bae-join"></div>
  <div class="bae-node" data-tone="observation"><b>汇合成候选与观测</b><span>统一记录格式</span></div>
  <div class="bae-outs">
    <div class="bae-out" data-tone="info"><b>候选 Fact / Claim</b><span>等待人工审核</span></div>
    <div class="bae-out" data-tone="warn"><b>页面观测</b><span>拿去与标准知识比较</span></div>
  </div>
  <div class="bae-caption">入口可以不同，记录格式必须统一</div>
</div>

四条入口只是拿数据的方式不同，出口只有两个：等待审核的候选，和用来比较的页面观测。格式统一了，才能共用同一个审核界面。

## 入口分工：能用规则就别用模型

| 入口 | 典型位置 | 谁来做 |
| --- | --- | --- |
| JSON-LD | 页面内嵌的结构化数据 | 规则抽取 |
| 规格表 / DOM 节点 | 产品页的规格区、键值对列表 | 规则抽取 |
| 正文 / FAQ | 概览段落、客服问答 | LLM 抽取 |
| 图片 / 规格截图 | 规格图、表格截图 | Vision / OCR |

顺序是固定的：先规则、后模型。规则读出来的是页面上那个字符串，位置直接来自 DOM 路径；模型给出的是「大概率正确」的版本，位置只能粗略到某个小节。同一个字段两种读法都拿得到时，一律采信规则那一条。

入口还决定了后续怎么复查。规则入口的记录可以按选择器重跑一遍核对，模型入口的记录只能靠人读原文确认，所以两者在队列里的优先级并不相同。

## 一条记录的最小形状

```json
{
  "attribute": "memory",
  "value": "8GB LPDDR5 4800MHz",
  "scope": "variant",
  "source_locator": "Specs > Model / Memory"
}
```

| 字段 | 中文解释 |
| --- | --- |
| attribute | 这条说的是哪个属性，例如内存 |
| value | 页面上的取值，保留原始写法 |
| scope | 这条覆盖的层级：型号 / 变体 / 套餐 |
| source_locator | 回到页面位置的一条路径 |

四个字段缺一个，这条记录就只能当摘要读，进不了审核队列。除了这四个，页面级还要记住这条来自哪一类载体：正文、结构化数据，还是图片。

## 一个例子：同一台机器上的两种抽取

8GB LPDDR5 4800MHz 在规格表里是键值对，走规则抽取，位置精确到 Specs > Model / Memory，适用范围是 832 这个变体。「适合 Home Server」写在概览文案里，只能走模型抽取，位置粗略到某个小节，适用范围是整个型号。两条记录格式一样，可信程度不一样，所以最终都要过一遍人工。

产品页的图片里常常还有一张规格图，它走视觉识别入口。抽出来的值同样要写成上面那种记录，只是位置换成图片里的那一块。

## source_text 与 source_locator 为什么必须留

source_text 是页面上那句原话，它让审核者看到这条抽取凭什么成立，而不是只看到一个结论。source_locator 是这句话的位置，不一致被发现之后，人要能回到原处重新读一遍。少了任何一个，审核界面上的每一行都只能当摘要看，Approve / Edit / Reject 也就无从谈起。

两者都不能事后补。抽取的那一刻不记下来，页面改版之后就再也找不回那句话了。

## 错误边界：scope 不写就等于制造误报

<div class="bae-note" data-tone="warn"><b>最常见的默认错误</b>：把每条记录都当成变体级。同一个页面的 FAQ 往往整个型号共用，把它当成某个 SKU 专用，比较时就会报出一片假冲突。</div>

套餐内容必须和型号硬件分开记，否则「某套餐不含电源适配器」会被拿去和型号级规格对比。来自图片的记录要标明自己是图片，不然正文与图片哪天不一致，没人知道该回去重读哪一块。原文没写的强度也不许补：页面写「可以运行」，就不能抽成「最适合」。
