---
title: "示例 001 · ZimaSpace"
description: "用真实数据说明这套流程怎么跑通：品牌信源怎么建出 Canonical、商城页面怎么比对、结论为什么停在待审。"
order: 1
updated: "2026-09-17"
---

> 这一轮案例证明的是**流程能跑通**，不是**品牌已经一致**：来自两份数据的 14 条待审信号全部停在人工审核之前，没有一条被机器判成错误、也没有一条被自动改写。

## 案例规模

本轮用一个小数据集把全流程跑了一遍。规模刻意压得很小，为的是让每个环节都能被逐条看完，而不是先看一堆统计数字。

<div class="q-overview">
  <div class="q-card"><span class="q-label">品牌信源</span><span class="q-score">6</span><span class="q-note-line">产品页 / 软件页 / 定价页</span></div>
  <div class="q-card"><span class="q-label">商城 PDP</span><span class="q-score">3</span><span class="q-note-line">页面级去重后</span></div>
  <div class="q-card"><span class="q-label">产品 Blog</span><span class="q-score">4</span><span class="q-note-line">产品强相关文章</span></div>
  <div class="q-card"><span class="q-label">待审信号</span><span class="q-score">14</span><span class="q-note-line">8 建库 + 6 比对</span></div>
</div>

品牌侧产出 15 个实体、82 条硬件与软件事实、47 条能力与定位主张，但建库状态本身就是"AI 候选，等待人工审核"。商城侧一共 7 个页面，其中 3 个 PDP、4 个产品 Blog；ZimaBoard 2 的 PDP 地址在输入里出现两次，按页面身份去重后只处理一次，所以 PDP 是 3 不是 4。

品牌侧 15 个实体里，本轮实际涉及或对照到 11 个；商城侧另外出现 3 个品牌侧完全没有的新实体候选，全部来自同一个页面。这 3 个候选不允许继承上一代的任何事实，只能先挂着等人工确认。

两层的数据分开存放：品牌侧产出标准答案的候选，商城侧只记录"页面实际写了什么"，观测结果不允许覆盖标准答案。

| 数据集 | 来源 | 产出 |
| --- | --- | --- |
| 品牌信源（6 个） | 官方产品页、软件页、定价页 | 15 实体 / 82 事实 / 47 主张 |
| 建库阶段待审 | 品牌信源内部的不一致 | 8 条待审信号 |
| 商城页面（7 个） | 3 PDP + 4 产品 Blog | 逐页观测 + 6 条待审信号 |

## 两条路径怎么分工

左边一条造标准答案，右边一条拿真实页面去对照。两条路径的数据不许互相写入，只在人工审核台汇合。

<div class="bae-flow">
  <div class="bae-split">
    <div class="bae-lane">
      <span class="bae-lane-label">CANONICAL 路径</span>
      <div class="bae-node"><b>品牌信源</b><span>产品页 / 软件页 / 定价页</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node"><b>AI 候选抽取</b><span>实体 + 事实 + 主张</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="warn"><b>人工审核</b><span>判定 / 补充 / 退回</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="canonical"><b>Canonical 知识</b><span>人工确认后才成立</span></div>
    </div>
    <div class="bae-lane">
      <span class="bae-lane-label">OBSERVATION 路径</span>
      <div class="bae-node"><b>商城 PDP + 产品 Blog</b><span>只记录页面实际写了什么</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node"><b>页面观测</b><span>按实体挂上观测值</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node"><b>逐项比对</b><span>一致 / 冲突 / 范围不一致</span></div>
      <div class="bae-arrow"></div>
      <div class="bae-node" data-tone="observation"><b>回到 Canonical</b><span>差异挂成待审，不改页面</span></div>
    </div>
  </div>
  <div class="bae-caption">左边造标准答案，右边检测页面有没有偏离它</div>
</div>

这就是"流程能跑通"的全部内容：页面能被去重、实体能被分层、观测能被对照、差异能被记成待审、缺失能被记成候选而不被静默合并。反过来，这一轮也没有修好任何一条差异——它们的终点是人工审核台。

两条路径最容易混的地方是"哪边说了算"。品牌信源写了什么，不等于它已经成立；商城页写了什么，也不等于它在骗人。两条路径各自留下记录，唯一有权决定哪种说法算数的环节是中间那次人工审核。

## 这个案例能教你什么

- **标准答案和页面记录是两套东西。** 哪边都不自动代表真理，差异只负责被记录，不负责被裁决。
- **不是所有不一致都叫错误。** 说法更宽泛、版本含义不清、页面描述更强，这些各有各的状态，压成"对 / 错"会把真问题判错。
- **范围写不清就会自己造冲突。** 同一台机器的不同包装、型号的不同档位，混在一层里比，报出来的全是误报。

## 四页阅读路径

四个页面各自只回答一个问题，按顺序读一遍就够。

<div class="bae-outs">
  <div class="bae-out" data-tone="info">① 总览<br><span>范围与两条路径</span></div>
  <div class="bae-out" data-tone="info">② 建立 Canonical<br><span>实体怎么分层</span></div>
  <div class="bae-out" data-tone="info">③ 页面检测<br><span>观测怎么比对</span></div>
  <div class="bae-out" data-tone="info">④ 影响面<br><span>一条改动波及哪些页</span></div>
</div>

后续三页都从这一页的数据集里取材，各用一小段就够，不重复铺开。本页只负责让你知道这一轮到底跑了什么、跑出了什么规模。

## 来源一览

全部结论只来自下面这些页面，本页一律用来源编号指代，不给地址。

| 来源编号 | 页面类型 |
| --- | --- |
| SRC_ZB2 | 品牌产品规格页 |
| SRC_ZOS / SRC_ZOS_PRICE | 品牌软件页 / 定价页 |
| SHOP_PDP_ZB2 | 商城产品详情页 |
| BLOG_ZB2_AI | 产品 Blog，本地 AI 主题 |
| BLOG_ZC2_STANDARD | 产品 Blog，机型规格主题 |
| BLOG_MEMBER_DAY_2025 | 产品 Blog，历史活动文章 |
