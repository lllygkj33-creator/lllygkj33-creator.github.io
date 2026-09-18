---
title: "Feedback Loop"
description: "找不到足够好的链接目标时，把检索失败转成内容缺口建议，并让新内容重新回到 Wiki。"
order: 3
updated: "2026-09-18"
---

> 链接自动化不应该为了"完成链接任务"强行返回一个 URL。找不到足够好的目标，本身就是一种有价值的结果。

本页数据为教学示意图，不是真实站点的抓取结果。

## 原流程缺的那条分支

<div class="bae-flow">
  <div class="bae-node"><b>Source Passage</b><span>待处理的正文段落</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>Link Intent</b><span>这句话为什么需要链接</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node"><b>Local Wiki Retrieval</b><span>只在本地 Wiki 里检索</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="key"><b>候选是否足够好？</b><span>够具体、够匹配才算好</span></div>
</div>

<div class="bae-outs">
  <div class="bae-out" data-tone="info"><b>是</b><span>直接给出链接目标</span></div>
  <div class="bae-out" data-tone="warn"><b>否</b><span>追问为什么没有好目标</span></div>
</div>

<div class="bae-outs">
  <div class="bae-out"><b>这句话本来就不需要链接</b><span>出口：跳过</span></div>
  <div class="bae-out"><b>现有页面只差一小块</b><span>出口：补充现有页面</span></div>
  <div class="bae-out"><b>存在独立内容意图</b><span>出口：新增内容</span></div>
</div>

这一步的差别不在检索做得更快，而在承认检索可以失败。失败了才需要解释原因，也正是原因决定了下一步该往哪里走。

## 四种输出

<div class="bae-outs">
  <div class="bae-out" data-tone="info"><b><span class="bae-status" data-s="link">建议添加链接</span></b><span>已找到足够具体、足够匹配的目标</span></div>
  <div class="bae-out" data-tone="warn"><b><span class="bae-status" data-s="skip">不建议链接</span></b><span>当前内容不需要额外链接，或加链接价值很低</span></div>
  <div class="bae-out" data-tone="info"><b><span class="bae-status" data-s="enrich">建议补充现有页面</span></b><span>已有页面主题正确，但缺当前需要的具体段落</span></div>
  <div class="bae-out" data-tone="warn"><b><span class="bae-status" data-s="new">建议新增内容</span></b><span>本地 Wiki 中没有页面真正覆盖当前独立主题</span></div>
</div>

| 结果 | 含义 |
| --- | --- |
| 建议添加链接 | 目标已存在且值得插 |
| 不建议链接 | 这句话不需要额外链接 |
| 建议补充现有页面 | 主题对，具体内容缺 |
| 建议新增内容 | 本地 Wiki 没有真正的覆盖 |

面向用户的输出只有这四种，没有第五种，也没有内部状态流到页面上。

## 不建议链接是正确答案

<div class="bae-note" data-tone="ok"><b>跳过的两种典型</b>：A central server becomes a shared dependency for client devices. 只是上下文解释时，即使 Wiki 里有相似页面也应跳过；最高候选 62%、但都只是泛泛相关时同样跳过。系统的价值不在"插得多"，而在"少插错"。</div>

强行插一个泛泛相关的页面，读者点进去会发现没解决问题，作者事后还得删掉它。跳过一次链接，比修一次错链接便宜得多。

## 建议补充现有页面，还是建议新增内容

<div class="bae-card">
  <div class="bae-card-head">建议补充现有页面 · Local AI Basics</div>
  <dl class="bae-rows">
    <dt>目标页面</dt><dd>Local AI Basics</dd>
    <dt>当前相关度</dt><dd><div class="la-score" data-tone="weak"><div class="la-score-head"><span class="la-score-label">内容相关度</span><span class="la-score-value">74%</span></div><span class="la-score-track"><span class="la-score-fill" style="width: 74%"></span></span><span class="la-score-note">主题对，内容缺</span></div></dd>
    <dt>缺少内容</dt><dd>多设备共享 inference endpoint</dd>
    <dt>建议动作</dt><dd>在现有页面补一个小节</dd>
    <dt>为什么先补而不是新建</dt><dd>避免主题重复、内容碎片化、同类相残</dd>
  </dl>
</div>

<div class="bae-note" data-tone="info"><b>顺序不能跳</b>：这是"新增文章"之前必须经过的一层。现有页面主题正确、只缺一小块时，先补它，而不是另起一页。</div>

<div class="bae-card">
  <div class="bae-card-head">建议新增内容 · 多设备共享 Local AI Server</div>
  <dl class="bae-rows">
    <dt>缺少主题</dt><dd>多设备共享 Local AI Server</dd>
    <dt>最佳已有候选</dt><dd>Local AI Basics</dd>
    <dt>候选相关度</dt><dd><div class="la-score" data-tone="low"><div class="la-score-head"><span class="la-score-label">最佳候选相关度</span><span class="la-score-value">63%</span></div><span class="la-score-track"><span class="la-score-fill" style="width: 63%"></span></span><span class="la-score-note">相关度不足</span></div></dd>
    <dt>为什么现有内容不够</dt><dd>只解释本地 AI 基础，没有 shared endpoint、concurrency</dd>
    <dt>建议标题</dt><dd>Share a Local AI Server Across Multiple Devices</dd>
    <dt>建议 URL</dt><dd><b>/blog/share-local-ai-server-multiple-devices</b>（路径形式示意）</dd>
    <dt>建议覆盖</dt><dd>Clients、Authentication、Concurrency、Resource Limits</dd>
  </dl>
</div>

<div class="bae-note" data-tone="warn"><b>容易做错</b>：不能因为它是第一名就强选 63% 的候选。第一名只是本地 Wiki 里相对最接近的，不代表它合适。</div>

先补还是新建，取决于内容意图是否独立：现有页面能不能自然容纳这一小块，能容纳就补，不能容纳才新建。

## 缺口不等于自动发布

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>Content Gap</b><span>本地 Wiki 覆盖不到</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>Recommendation</b><span>写成一条内容建议</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="warn"><b>人工 / SEO 复核</b><span>由人决定是否开工</span></div>
</div>

复核要问四件事：是不是独立搜索意图？会不会和已有内容重复？是否该是 Blog / Page / Collection？业务价值够不够？

<div class="bae-note" data-tone="warn"><b>绝对不做</b>：绝不因为 similarity < 70% 就自动生成并发布文章。缺口只是建议，没有复核就没有内容。</div>

人工复核同时留下反馈，但第一版只记录"建议 → 人接受 / 拒绝"三类动作。

## 闭环：新内容回到 Wiki

<div class="bae-mini-graph">
  <svg width="660" height="190" viewBox="0 0 660 190" role="img" aria-label="Wiki 到内容建设再回到 Wiki 的闭环">
    <text x="70" y="26" text-anchor="middle" font-size="13" fill="currentColor">Wiki</text>
    <text x="210" y="26" text-anchor="middle" font-size="13" fill="currentColor">Retrieval</text>
    <text x="390" y="26" text-anchor="middle" font-size="13" fill="currentColor">找到好目标？</text>
    <text x="555" y="26" text-anchor="middle" font-size="13" fill="currentColor">链接</text>
    <text x="390" y="78" text-anchor="middle" font-size="13" fill="currentColor">内容缺口</text>
    <text x="390" y="128" text-anchor="middle" font-size="13" fill="currentColor">补页面或新文章</text>
    <text x="390" y="178" text-anchor="middle" font-size="13" fill="currentColor">重新生成 Page / Passage Card</text>
    <path d="M70 38 H210 M210 38 H390 M480 38 H555" stroke="currentColor" stroke-opacity="0.35" fill="none"/>
    <path d="M390 46 V78 M390 90 V128 M390 140 V178" stroke="currentColor" stroke-opacity="0.35" fill="none"/>
    <path d="M300 184 H24 V34" stroke="currentColor" stroke-opacity="0.35" fill="none" stroke-dasharray="4 4"/>
    <polygon points="24,30 20,40 28,40" fill="currentColor" fill-opacity="0.35"/>
    <text x="470" y="34" text-anchor="middle" font-size="11" fill="currentColor">是</text>
    <text x="404" y="68" font-size="11" fill="currentColor">否</text>
  </svg>
</div>

关键在那条虚线：内容建设完成以后会重新进入 Wiki，不是一次性的建议。今天补的页面，明天就是别人的检索目标。

## 人工反馈不做复杂机器学习

<div class="bae-compare">
  <div class="bae-col" data-tone="right"><span class="bae-col-label">第一版只记录</span><p>建议 → 人接受 / 拒绝</p></div>
  <div class="bae-col" data-tone="wrong"><span class="bae-col-label">第一版不做</span><p>强化学习 / 自动训练 / 自学习 Agent</p></div>
</div>

记录下来的动作用来日后调规则，例如某类产品推荐常被拒，说明 Product 页面类型的权重可能过高；70–75% 的 Blog 候选常被接受，说明某类 Intent 的阈值可以放宽。这些是规则调整，不是模型训练。

于是一轮跑完可以这样结算：

<div class="q-overview">
  <div class="q-card"><span class="q-label">链接机会</span><span class="q-score">7</span><span class="q-note-line">建议添加链接</span></div>
  <div class="q-card"><span class="q-label">跳过</span><span class="q-score">2</span><span class="q-note-line">不建议链接</span></div>
  <div class="q-card"><span class="q-label">补充现有页</span><span class="q-score">1</span><span class="q-note-line">建议补充现有页面</span></div>
  <div class="q-card"><span class="q-label">新增内容</span><span class="q-score">1</span><span class="q-note-line">建议新增内容</span></div>
</div>

这让系统不只在"布链接"，还在反向检查 Wiki 的覆盖能力。

一轮跑完的产出，是链接建议、跳过判断、补页面建议、内容缺口建议四类之和。前两类是这一轮的工作结果，后两类是下一轮 Wiki 的输入。
