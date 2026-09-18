---
title: "示例 001 · Blog 内链"
description: "用一个 Blog 段落演示 Link Intent 如何从本地 Wiki 找到最合适的站内目标。"
order: 1
updated: "2026-09-18"
---

> 同一个段落里的六句话，需要链接的理由各不相同：三句找到了足够好的站内目标，一句泛泛相关就该跳过，还有一句根本没目标——那说明缺的不是链接，是内容。
>
> **本页数据为教学示意图**：下面的 Blog 正文是示意正文，候选页面、相关度与判断结果都是示意的，不是真实站点的抓取结果。

## 这一段要处理的五句话

<div class="bae-flow">
  <div class="bae-node" data-tone="key"><b>示意 Blog 段落</b><span>Run Plex on a Home Server</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="observation"><b>Link Intent × 5</b><span>这一句为什么需要链接</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-node" data-tone="canonical"><b>本地 Wiki 检索</b><span>候选页 + 相关度</span></div>
  <div class="bae-arrow"></div>
  <div class="bae-outs">
    <div class="bae-out" data-tone="info">建议添加链接</div>
    <div class="bae-out">不建议链接</div>
    <div class="bae-out">建议补充现有页面</div>
    <div class="bae-out">建议新增内容</div>
  </div>
</div>

系统读到的只是一段普通博客正文。内链要做的不是找出所有名词，而是先判断哪几句在讲别的事情时只说了半句，读者会想点开看更多，再去本地 Wiki 里找那一页。

整段正文标出了 ① 到 ⑤ 五个位置，其中只有一个位置是找不到目标的。

## 示意段落与逐条建议

<div class="la-audit">
  <div class="la-audit-main">
    <p><b>示意 Blog 正文</b>（Run Plex on a Home Server · 教学示意）</p>
    <p>我把 Plex 和一台 <b>local AI server</b> ① 放在同一台家用服务器上，字幕生成和缩略图整理都交给它。模型能不能跑起来，主要看 <b>video memory</b> ② 够不够，而不是 CPU 有多少核心。为了塞进 8GB 显存，我用 <b>Quantization</b> ③ 把模型压到 4-bit，字幕质量几乎看不出差别。</p>
    <p>环境搭建本身并不复杂，按文档 <b>install Ollama</b> ④ 就能跑通第一个模型。真正麻烦的是访问方式：我想让多台设备共用一台推理服务器 ⑤，客厅电视、书房笔记本和手机都调用同一个模型。目前的办法是每台设备各装一份，模型重复下载，显存也各占一份。</p>
  </div>
  <aside class="la-audit-panel">
    <div class="la-rec">
      <div class="la-rec-head"><b>①</b><span class="bae-status" data-s="link">建议添加链接</span></div>
      <div class="la-rec-title">local AI server <span class="la-rec-arrow">→</span> Local AI Basics（/page/local-ai-basics）</div>
      <div class="la-score" data-tone="strong">
        <div class="la-score-head"><span class="la-score-label">内容相关度</span><span class="la-score-value">94%</span></div>
        <span class="la-score-track"><span class="la-score-fill" style="width: 94%"></span></span>
        <span class="la-score-note">强匹配</span>
      </div>
      <div class="la-rec-meta">Intent <b>定义</b> · Anchor <b>local AI server</b></div>
      <div class="la-rec-meta"><b>为什么不选别的</b>：其他候选都在讲某个具体工具，只有这一页解释"本地推理服务器"是什么。</div>
    </div>
    <div class="la-rec">
      <div class="la-rec-head"><b>②</b><span class="bae-status" data-s="link">建议添加链接</span></div>
      <div class="la-rec-title">video memory <span class="la-rec-arrow">→</span> GPU for Local AI（/blog/gpu-for-local-ai）</div>
      <div class="la-score" data-tone="strong">
        <div class="la-score-head"><span class="la-score-label">内容相关度</span><span class="la-score-value">91%</span></div>
        <span class="la-score-track"><span class="la-score-fill" style="width: 91%"></span></span>
        <span class="la-score-note">强匹配</span>
      </div>
      <div class="la-rec-meta">Intent <b>术语</b> · Anchor <b>video memory</b></div>
      <div class="la-rec-meta"><b>为什么不选别的</b>：硬件选购类候选只讲型号，不解释显存和模型大小的关系。</div>
    </div>
    <div class="la-rec">
      <div class="la-rec-head"><b>③</b><span class="bae-status" data-s="link">建议添加链接</span></div>
      <div class="la-rec-title">Quantization <span class="la-rec-arrow">→</span> LLM Quantization Explained（/blog/llm-quantization-explained）</div>
      <div class="la-score" data-tone="strong">
        <div class="la-score-head"><span class="la-score-label">内容相关度</span><span class="la-score-value">97%</span></div>
        <span class="la-score-track"><span class="la-score-fill" style="width: 97%"></span></span>
        <span class="la-score-note">强匹配</span>
      </div>
      <div class="la-rec-meta">Intent <b>定义</b> · Anchor <b>Quantization</b></div>
      <div class="la-rec-meta"><b>为什么不选别的</b>：入门页只把量化当补救手段提了一句，既没有定义，也没有精度与显存的取舍。</div>
    </div>
    <div class="la-rec">
      <div class="la-rec-head"><b>④</b><span class="bae-status" data-s="skip">不建议链接</span></div>
      <div class="la-rec-title">install Ollama <span class="la-rec-arrow">→</span> 最佳候选 /blog/run-local-ai-with-ollama（未采用）</div>
      <div class="la-score" data-tone="low">
        <div class="la-score-head"><span class="la-score-label">内容相关度</span><span class="la-score-value">62%</span></div>
        <span class="la-score-track"><span class="la-score-fill" style="width: 62%"></span></span>
        <span class="la-score-note">相关度不足，跳过</span>
      </div>
      <div class="la-rec-meta">Intent <b>动作</b> · Anchor <b>install Ollama</b></div>
      <div class="la-rec-meta"><b>为什么不选别的</b>：候选都只讲怎么装，而这一句已经给出了安装动作，链过去没有新增信息。</div>
    </div>
    <div class="la-rec">
      <div class="la-rec-head"><b>⑤</b><span class="bae-status" data-s="new">建议新增内容</span></div>
      <div class="la-rec-title">多台设备共用一台推理服务器 <span class="la-rec-arrow">→</span> /blog/share-local-ai-server-multiple-devices</div>
      <div class="la-score" data-tone="low">
        <div class="la-score-head"><span class="la-score-label">最佳候选相关度</span><span class="la-score-value">63%</span></div>
        <span class="la-score-track"><span class="la-score-fill" style="width: 63%"></span></span>
        <span class="la-score-note">最佳已有候选 Local AI Basics 63%</span>
      </div>
      <div class="la-rec-meta">Intent <b>定义</b> · Anchor <b>多台设备共用一台推理服务器</b></div>
      <div class="la-rec-meta"><b>缺的是什么</b>：shared endpoint 与 concurrency，已有页面都只讲单机运行，所以先转成内容缺口建议。</div>
    </div>
  </aside>
</div>

五个位置走的是同一套判断，结论却分成四种。相关度是每个 Link Intent 单独算的：同一篇 Local AI Basics 在 ① 那里是 94%，在 ③ 的候选里只有 74%，因为它讲的是入门与部署，不解释量化。

③ 的相关度最高并不说明它最重要，只说明这一句话在站内有对应得最准的一页。反过来，⑤ 一条链接都没插，恰恰是这一页最有价值的那条结论。

## 候选很多，只选一个

以 ③ 的 Quantization 为例，本地 Wiki 一次返回了五条候选，全部"和主题有关"，但只有一条讲的正是这句话在说的事。

| 候选 | 类型 | 相关度 | 最终 |
| --- | --- | --- | --- |
| LLM Quantization Explained（/blog/llm-quantization-explained） | Blog | 97% | 采用（③ 的链接目标） |
| Local AI Basics（/page/local-ai-basics） | Page | 74% | 不采用：讲本地 AI 入门，不解释量化 |
| GPU for Local AI（/blog/gpu-for-local-ai） | Blog | 68% | 不采用：只涉及显存与模型大小 |
| NAS + Local AI（/blog/nas-plus-local-ai） | Blog | 58% | 不采用：偏存储与网络 |
| Ollama 安装类页面（多篇） | Blog | 62% | 不建议链接（跳过，见 ④） |

看候选列表时要盯住的是 Intent：这句话是术语、是定义、是一个动作，还是某个具体产品。Intent 对了，再看哪一页真的把这件事讲清楚了，其余的全部放回候选池。

只有一条被选中是正常的检索结果；五条都插进去，正文就变成了导航页。

## 四种出口的汇总

| 类型 | 示例 | 系统动作 |
| --- | --- | --- |
| 建议添加链接 | ① local AI server → Local AI Basics | 给出 Anchor 与写回位置，人工确认后才写入正文 |
| 不建议链接 | ④ Ollama 安装句 | 记录跳过与理由，正文保持原样 |
| 建议补充现有页面 | 若复核认为不必新写：给 Local AI Basics 补一节 shared endpoint | 转成页面补充建议，人工 / SEO 复核后再改 |
| 建议新增内容 | ⑤ 多设备共用一台推理服务器 | 进入选题建议，复核后成稿，再回到本地 Wiki |

四个出口里只有第一个会改动正文。其余三个都不插链接，它们产出的是"下一步该做什么"，最终仍然由人来决定。

这也是内链自动化的价值所在：不是多插几条链接，而是少插错几条。

## 为什么 ④ 被跳过

<div class="bae-note" data-tone="ok"><b>最高分不等于必须选</b>：④ 的最佳候选是 62%，在它自己的候选列表里确实是第一名，但它只讲"怎么装 Ollama"，而正文这句已经把安装讲完了。链过去读者找不到新东西，这种泛泛相关就该跳过。</div>

如果规则写成"总分第一名就插链接"，④ 会被强行链上，站内就多出一条无意义的链接。跳过不是失败，是判断生效。

⑤ 的 63% 是另一种情况：分数低不是因为候选不好，而是因为站内确实没有这一页。跳过它，同时生成一条内容缺口建议，才是正确的下一步。

## 判断逻辑，不是链接结果

本页展示的是判断逻辑，不是真实站点的链接结果；真实运行时每条建议仍要人工确认后才写回。示意数据的作用是把四种出口摆在一起看清楚，具体分数不必记。

可带走的是三句话：先问这一句为什么需要链接，再在本地 Wiki 里找最匹配的那一页，找不到就如实说找不到。
