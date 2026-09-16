---
title: "摩天大楼优化"
description: "把 SERP 竞争格局、页面评分、正文批注和改造优先级放在一起看：先知道差多少，再知道差在哪一段，最后知道先改什么。"
order: 7
updated: "2026-09-16"
---

> 这是个**可视化内容升级界面**：目标关键词的竞争格局、目标页得分、逐段批注、内容差距与改造顺序，集中在同一页里看完。

<div class="sk-badge">Skyscraper Analysis</div>

<div class="sk-keyword">media server software</div>

<p class="sk-sub">SERP content gap analysis for the target page.</p>

<dl class="sk-meta">
  <div><dt>Keyword</dt><dd>media server software</dd></div>
  <div><dt>Target</dt><dd>Target Page</dd></div>
  <div><dt>SERP Date</dt><dd>2026-04-02</dd></div>
  <div><dt>Market</dt><dd>US</dd></div>
  <div><dt>Device</dt><dd>Desktop</dd></div>
  <div><dt>Competitors</dt><dd>3</dd></div>
</dl>

## 01 总览

第一屏只回答三个问题：**现在强不强、和最强竞品差多少、最优先的问题是什么。**

<div class="q-overview">
  <div class="q-card">
    <span class="q-label">Skyscraper Score</span>
    <span class="q-score q-medium">62<span style="font-size:1rem">/100</span></span>
    <span class="q-note-line">Needs Work</span>
  </div>
  <div class="q-card">
    <span class="q-label">Best Competitor</span>
    <span class="q-score q-medium">78<span style="font-size:1rem">/100</span></span>
    <span class="q-note-line">Competitor A</span>
  </div>
  <div class="q-card">
    <span class="q-label">Content Gap</span>
    <span class="q-score q-low">-16</span>
    <span class="q-note-line">对最强竞品</span>
  </div>
  <div class="q-card">
    <span class="q-label">信息增益</span>
    <span class="q-score q-low">40<span style="font-size:1rem">/100</span></span>
    <span class="q-note-line">最大短板</span>
  </div>
  <div class="q-card">
    <span class="q-label">Priority</span>
    <span class="q-score q-low">High</span>
    <span class="q-note-line">两项 P0</span>
  </div>
</div>

状态分档是界面内部阈值，不是搜索平台标准：

| 分数 | 状态 |
| ---: | --- |
| 80–100 | Strong |
| 65–79 | Competitive |
| 50–64 | Needs Work |
| < 50 | Weak |

> **Internal evaluation model，非 Google 官方 Ranking Score。**

## 02 SERP 页面

当前结果页里，目标页和主要竞品各自是什么形态、强在哪里。示例数据已脱敏，不包含真实客户与竞品。

<div class="sk-rank-grid">
  <div class="sk-rank" data-who="target">
    <div class="sk-rank-top">
      <span class="sk-rank-no">#4</span>
      <span class="sk-rank-score q-medium">62</span>
    </div>
    <span class="sk-rank-name">Target Page</span>
    <span class="sk-rank-type">Guide · 已更新 2026</span>
    <dl>
      <div><dt>最强项：</dt><dd>Structure</dd></div>
      <div><dt>最弱项：</dt><dd>Information Gain</dd></div>
    </dl>
    <span class="sk-rank-url">xxxx.com/...</span>
  </div>

  <div class="sk-rank">
    <div class="sk-rank-top">
      <span class="sk-rank-no">#1</span>
      <span class="sk-rank-score q-medium">78</span>
    </div>
    <span class="sk-rank-name">Competitor A</span>
    <span class="sk-rank-type">List · 已更新 2026</span>
    <dl>
      <div><dt>最强项：</dt><dd>Coverage</dd></div>
      <div><dt>最弱项：</dt><dd>无原创数据</dd></div>
    </dl>
    <span class="sk-rank-url">xxxx.com/...</span>
  </div>

  <div class="sk-rank">
    <div class="sk-rank-top">
      <span class="sk-rank-no">#2</span>
      <span class="sk-rank-score q-medium">68</span>
    </div>
    <span class="sk-rank-name">Competitor B</span>
    <span class="sk-rank-type">Forum · 已更新 2026</span>
    <dl>
      <div><dt>最强项：</dt><dd>Freshness</dd></div>
      <div><dt>最弱项：</dt><dd>Structure</dd></div>
    </dl>
    <span class="sk-rank-url">xxxx.com/...</span>
  </div>
</div>

## 03 评分对比

七个维度、固定权重，先看形状再看数字。雷达只做趋势呈现，**核心数值在下面的表里**。

<div class="sk-radar-wrap">
<svg viewBox="0 0 280 280" class="sk-radar" role="img" aria-label="七维对比雷达图：目标页与两个竞品">
  <g class="sk-radar-grid">
    <polygon points="140.0,112.5 161.5,122.9 166.8,146.1 151.9,164.8 128.1,164.8 113.2,146.1 118.5,122.9" />
    <polygon points="140.0,85.0 183.0,105.7 193.6,152.2 163.9,189.6 116.1,189.6 86.4,152.2 97.0,105.7" />
    <polygon points="140.0,57.5 204.5,88.6 220.4,158.4 175.8,214.3 104.2,214.3 59.6,158.4 75.5,88.6" />
    <polygon points="140.0,30.0 226.0,71.4 247.2,164.5 187.7,239.1 92.3,239.1 32.8,164.5 54.0,71.4" />
    <line x1="140" y1="140" x2="140.0" y2="30.0" />
    <line x1="140" y1="140" x2="226.0" y2="71.4" />
    <line x1="140" y1="140" x2="247.2" y2="164.5" />
    <line x1="140" y1="140" x2="187.7" y2="239.1" />
    <line x1="140" y1="140" x2="92.3" y2="239.1" />
    <line x1="140" y1="140" x2="32.8" y2="164.5" />
    <line x1="140" y1="140" x2="54.0" y2="71.4" />
  </g>
  <polygon class="sk-series-b" points="140.0,52.0 203.6,89.2 215.1,157.1 166.2,194.5 109.0,204.4 54.2,159.6 88.4,98.8" />
  <polygon class="sk-series-a" points="140.0,41.0 217.4,78.3 221.5,158.6 172.5,207.4 105.6,211.4 64.9,157.1 81.5,93.4" />
  <polygon class="sk-series-target" points="140.0,41.0 195.9,95.4 202.2,154.2 159.1,179.6 120.0,181.6 81.0,153.5 66.9,81.7" />
  <g class="sk-radar-labels">
    <text x="140.0" y="10.2" text-anchor="middle" dominant-baseline="middle">Intent</text>
    <text x="241.5" y="59.1" text-anchor="middle" dominant-baseline="middle">Coverage</text>
    <text x="266.5" y="168.9" text-anchor="middle" dominant-baseline="middle">Depth</text>
    <text x="196.3" y="256.9" text-anchor="middle" dominant-baseline="middle">IG</text>
    <text x="83.7" y="256.9" text-anchor="middle" dominant-baseline="middle">Evidence</text>
    <text x="13.5" y="168.9" text-anchor="middle" dominant-baseline="middle">Freshness</text>
    <text x="38.5" y="59.1" text-anchor="middle" dominant-baseline="middle">Structure</text>
  </g>
</svg>
  <div class="sk-legend">
    <span class="sk-tag-target">Target</span>
    <span class="sk-tag-a">Competitor A</span>
    <span class="sk-tag-b">Competitor B</span>
  </div>
</div>

<div class="sk-table-wrap">
<table class="sk-compare">
  <thead>
    <tr><th>维度</th><th>Target</th><th>A</th><th>B</th><th>Gap</th></tr>
  </thead>
  <tbody>
    <tr><td>Intent</td><td>90</td><td>90</td><td>80</td><td class="gap-near">0</td></tr>
    <tr><td>Coverage</td><td>65</td><td>90</td><td>74</td><td class="gap-neg">-25</td></tr>
    <tr><td>Depth</td><td>58</td><td>76</td><td>70</td><td class="gap-neg">-18</td></tr>
    <tr><td>Information Gain</td><td>40</td><td>68</td><td>55</td><td class="gap-neg">-28</td></tr>
    <tr><td>Evidence</td><td>42</td><td>72</td><td>65</td><td class="gap-neg">-30</td></tr>
    <tr><td>Freshness</td><td>55</td><td>70</td><td>80</td><td class="gap-neg">-15</td></tr>
    <tr><td>Structure</td><td>85</td><td>68</td><td>60</td><td class="gap-pos">+17</td></tr>
  </tbody>
</table>
</div>

颜色语义：**绿 = 明显领先**，**橙 = 接近**，**红 = 明显落后**。

```text
Skyscraper Score
= Intent × 20% + Coverage × 15% + Depth × 15%
+ Information Gain × 20% + Evidence × 15%
+ Freshness × 5% + Structure × 10%

Target = 90×.20 + 65×.15 + 58×.15 + 40×.20 + 42×.15 + 55×.05 + 85×.10 = 62.0
A      = 90×.20 + 90×.15 + 76×.15 + 68×.20 + 72×.15 + 70×.05 + 68×.10 = 77.6
```

### 维度标准

| 维度 | 权重 | 高分表现 | 常见失分 |
| --- | ---: | --- | --- |
| Intent Match | 20% | 页面类型与答案和结果页意图一致 | 教程页去抢对比词 |
| Coverage | 15% | Core / Supporting / Conditional / Next-step 四层都覆盖 | 只答主问题，漏条件类追问 |
| Depth | 15% | What → Why → How → Condition → Boundary 逐层推进 | 同一结论换说法重复 |
| Information Gain | 20% | 有原创数据、实测、新框架、原始证据 | 全是 SERP 已有的通识 |
| Evidence & E-E-A-T | 15% | 一手测试 + 署名 + 方法与来源 | 只有结论没有口径 |
| Freshness | 5% | 时间、版本、价格、截图都当前 | 版本过期、已失效事实 |
| Structure & UX | 10% | 直答、任务型 H2、对比表、决策矩阵 | 长段落、结论难找 |

## 04 正文分析

这是整页最重要的部分：**左边是目标页正文，右边是对应段落的问题卡片。** 手机上按"正文 ↓ 批注"顺序堆叠。

<div class="sk-pair">
  <div class="sk-article">
    <p class="sk-line">Plex is one of the most popular media server applications and offers an easy-to-use interface.</p>
  </div>
  <div class="sk-bubble" data-sev="high">
    <div class="sk-bubble-head"><span class="sk-prio" data-p="p0">IG</span><span>High</span><span>Score Impact −6</span></div>
    <dl>
      <div><dt>问题：</dt><dd>竞品 A 与 B 都写过同样的泛化说法</dd></div>
      <div><dt>原因：</dt><dd>这一段没有测试数据、决策标准或一手经验，属于与结果页同质化的表述，信息增益为零</dd></div>
      <div><dt>改法：</dt><dd>补转码实测结果、客户端差异，或一个具体使用场景</dd></div>
    </dl>
  </div>
</div>

<div class="sk-pair">
  <div class="sk-article">
    <p class="sk-line">Hardware transcoding support depends on your CPU and GPU.</p>
  </div>
  <div class="sk-bubble" data-sev="high">
    <div class="sk-bubble-head"><span class="sk-prio" data-p="p0">EVIDENCE</span><span>High</span><span>Score Impact −5</span></div>
    <dl>
      <div><dt>问题：</dt><dd>提出了技术结论，却没有可复现的测试口径</dd></div>
      <div><dt>原因：</dt><dd>缺少测试环境、工具与判定标准，读者无法验证这句话是否适用于自己的硬件</dd></div>
      <div><dt>改法：</dt><dd>给出测试环境、所用命令与对比表，把结论绑定到条件上</dd></div>
    </dl>
  </div>
</div>

<div class="sk-pair">
  <div class="sk-article">
    <p class="sk-line">Choosing the best media server depends on your needs.</p>
  </div>
  <div class="sk-bubble" data-sev="medium">
    <div class="sk-bubble-head"><span class="sk-prio" data-p="p1">DEPTH</span><span>Medium</span><span>Score Impact −4</span></div>
    <dl>
      <div><dt>问题：</dt><dd>用"取决于需求"结束讨论，没有推进到条件与边界</dd></div>
      <div><dt>原因：</dt><dd>Depth 要求从 What 走到 Condition 与 Boundary；停在 What 层等于没有解释</dd></div>
      <div><dt>改法：</dt><dd>把"取决于需求"展开成条件表：人数、预算、客户端类型、是否需要远程访问</dd></div>
    </dl>
  </div>
</div>

<div class="sk-pair">
  <div class="sk-article">
    <p class="sk-line">Here are the top picks for 2024.</p>
  </div>
  <div class="sk-bubble" data-sev="medium">
    <div class="sk-bubble-head"><span class="sk-prio" data-p="p1">FRESHNESS</span><span>Medium</span><span>Score Impact −3</span></div>
    <dl>
      <div><dt>问题：</dt><dd>页面仍在用两年前的年份与版本信息</dd></div>
      <div><dt>原因：</dt><dd>时间、版本、价格属于时效性事实，过期会直接削弱可信度，并让读者判断为无人维护</dd></div>
      <div><dt>改法：</dt><dd>更新年份与版本号，核对价格与功能可用性，替换过期截图</dd></div>
    </dl>
  </div>
</div>

> All scores and deductions are internal diagnostic models. They are not Google ranking scores.

## 05 内容差距

正文批注汇总成五类差距。**不用"字数比竞品少多少"当指标**——篇幅不等于价值。

<div class="sk-gaps">
  <div class="sk-gap">
    <div class="sk-gap-label">Missing</div>
    <div class="sk-gap-n q-low">12</div>
    <div class="sk-gap-note">缺关键子问题</div>
  </div>
  <div class="sk-gap">
    <div class="sk-gap-label">Shallow</div>
    <div class="sk-gap-n q-medium">8</div>
    <div class="sk-gap-note">已覆盖但过浅</div>
  </div>
  <div class="sk-gap">
    <div class="sk-gap-label">Same</div>
    <div class="sk-gap-n q-low">14</div>
    <div class="sk-gap-note">与结果页同质</div>
  </div>
  <div class="sk-gap">
    <div class="sk-gap-label">Outdated</div>
    <div class="sk-gap-n q-medium">5</div>
    <div class="sk-gap-note">信息过期</div>
  </div>
  <div class="sk-gap">
    <div class="sk-gap-label">Unproven</div>
    <div class="sk-gap-n q-low">7</div>
    <div class="sk-gap-note">结论无证据</div>
  </div>
</div>

只展示差距最大的五个维度，对比基准是**结果页里观察到的最好水平**，不是第一名页面：

<div class="sk-bars">
  <div class="sk-bar" data-kind="crit">
    <span>Evidence</span><span class="sk-bar-track"><span class="sk-bar-fill" style="width:100%"></span></span><span class="sk-bar-val">-30</span>
  </div>
  <div class="sk-bar" data-kind="crit">
    <span>Information Gain</span><span class="sk-bar-track"><span class="sk-bar-fill" style="width:93%"></span></span><span class="sk-bar-val">-28</span>
  </div>
  <div class="sk-bar" data-kind="crit">
    <span>Coverage</span><span class="sk-bar-track"><span class="sk-bar-fill" style="width:83%"></span></span><span class="sk-bar-val">-25</span>
  </div>
  <div class="sk-bar" data-kind="crit">
    <span>Depth</span><span class="sk-bar-track"><span class="sk-bar-fill" style="width:60%"></span></span><span class="sk-bar-val">-18</span>
  </div>
  <div class="sk-bar" data-kind="crit">
    <span>Freshness</span><span class="sk-bar-track"><span class="sk-bar-fill" style="width:50%"></span></span><span class="sk-bar-val">-15</span>
  </div>
  <div class="sk-bar" data-kind="pos">
    <span>Structure</span><span class="sk-bar-track"><span class="sk-bar-fill" style="width:57%"></span></span><span class="sk-bar-val">+17</span>
  </div>
</div>

## 06 竞品

每个竞品只保留三段：为什么它现在更强、它缺什么、从哪里超越。

### Competitor A（#1，78 分）

**Why It Ranks**

- 覆盖完整，四层 Query 都有对应段落
- 内容当前，版本与价格都在有效期
- 内链结构强，相关长尾互相支撑

**What It Misses**

- 没有实测数据，所有结论都是转述
- 没有决策矩阵，读者还是要自己比
- 没有一手经验，看不出作者是否真的部署过

**What To Beat**

> 不要复制它的覆盖面。用**同等覆盖 + 原创实测**超越——它的短板正好是可以验证的那部分。

### Competitor B（#2，68 分）

**Why It Ranks**

- 讨论内容新鲜，社区回复带来持续更新
- 真实用户场景多，长尾问题覆盖广

**What It Misses**

- 结构松散，结论埋在对话里
- 缺少决策表格，扫读成本高
- 同样的结论重复出现，信息密度偏低

**What To Beat**

> 结构是你的强项（85 分）：把它的零散经验**整理成决策矩阵**，读者会选结构清晰的版本。

## 07 改造计划

只保留五个最高优先级的动作。每张卡写明修哪个维度、影响多大、成本多高、预计涨多少分、改在哪个位置、交付什么。

<div class="sk-actions">
  <div class="sk-action">
    <h3>Add original benchmark</h3>
    <dl>
      <div><dt>修复：</dt><dd>Information Gain + Evidence</dd></div>
      <div><dt>影响 / 成本：</dt><dd>High / Medium</dd></div>
      <div><dt>预计得分：</dt><dd class="sk-delta">+8</dd></div>
      <div><dt>位置：</dt><dd>H2 性能段</dd></div>
      <div><dt>交付：</dt><dd>基准测试表 + 测试方法说明</dd></div>
    </dl>
  </div>

  <div class="sk-action">
    <h3>Cover conditional queries</h3>
    <dl>
      <div><dt>修复：</dt><dd>Coverage</dd></div>
      <div><dt>影响 / 成本：</dt><dd>High / Medium</dd></div>
      <div><dt>预计得分：</dt><dd class="sk-delta">+6</dd></div>
      <div><dt>位置：</dt><dd>新增 H2 选型条件段</dd></div>
      <div><dt>交付：</dt><dd>条件问答清单 + 决策矩阵</dd></div>
    </dl>
  </div>

  <div class="sk-action">
    <h3>Add test methodology</h3>
    <dl>
      <div><dt>修复：</dt><dd>Evidence</dd></div>
      <div><dt>影响 / 成本：</dt><dd>Medium / Low</dd></div>
      <div><dt>预计得分：</dt><dd class="sk-delta">+5</dd></div>
      <div><dt>位置：</dt><dd>每个数据段后</dd></div>
      <div><dt>交付：</dt><dd>环境 / 工具 / 样本量三行口径</dd></div>
    </dl>
  </div>

  <div class="sk-action">
    <h3>Refresh version and pricing</h3>
    <dl>
      <div><dt>修复：</dt><dd>Freshness</dd></div>
      <div><dt>影响 / 成本：</dt><dd>Medium / Low</dd></div>
      <div><dt>预计得分：</dt><dd class="sk-delta">+4</dd></div>
      <div><dt>位置：</dt><dd>页首版本信息 + 各软件段</dd></div>
      <div><dt>交付：</dt><dd>版本核对表 + 新截图</dd></div>
    </dl>
  </div>

  <div class="sk-action">
    <h3>Rewrite generic paragraphs</h3>
    <dl>
      <div><dt>修复：</dt><dd>Information Gain / Depth</dd></div>
      <div><dt>影响 / 成本：</dt><dd>Medium / Low</dd></div>
      <div><dt>预计得分：</dt><dd class="sk-delta">+3</dd></div>
      <div><dt>位置：</dt><dd>Part 1 各软件介绍段</dd></div>
      <div><dt>交付：</dt><dd>逐段改写：结论 → 条件 → 边界</dd></div>
    </dl>
  </div>
</div>

## 08 优先级

优先级是内部排序公式，用来决定先做哪个，**不是任何平台的排名公式**：

```text
Priority = Impact × Gap × Confidence ÷ Effort
```

四个变量统一按 1–5 打分：

| 变量 | 含义 |
| --- | --- |
| Impact | 对用户与页面价值的提升 |
| Gap | 与结果页最好水平的差距 |
| Confidence | 判断的确定程度 |
| Effort | 执行成本（分母） |

| 等级 | 含义 | 对应动作 |
| --- | --- | --- |
| P0 | 立即修 | 补实测与证据、修过期事实 |
| P1 | 高影响 | 补条件类覆盖、加决策矩阵 |
| P2 | 增强 | 结构优化、段落改写 |
| P3 | 实验 | 新的内容形态与渠道测试 |

> **Internal prioritization formula**，不是 Google Ranking Formula。

## 这一页怎么用

1. **先看总览**：差多少、最优先的问题是什么
2. **再看对比**：形状比分数更重要——哪些维度是红的
3. **然后看正文分析**：每条批注都指到具体段落，说明为什么扣分、怎么改
4. **最后按优先级动手**：从 P0 开始，一次改一类，改完留基线

这套模型不预测排名，也不承诺结果。它只回答一个可执行的问题：**这一页现在输在哪一段，下一步最值得改什么。**
