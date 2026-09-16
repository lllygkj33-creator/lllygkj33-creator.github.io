---
title: "内容质量评估"
description: "一套用于拆解文章质量的分档卡与批注系统：E-E-A-T 四个子维度 + HCU + YMYL + Information Gain，配确定性熔断规则。"
order: 0
updated: "2026-09-16"
---

> 内容质量评估把"这篇文章好不好"拆成**可打分、可批注、可复现**的 7 个维度，并叠加一层不由模型决定的**熔断规则**。

这套模型来自本地的内容审计系统（`seo_quality_analyzer`）：7 个维度各自出分与优缺点，再由 Python 硬限制层按确定性规则封顶。**模型会松口，规则不会**——所以页面上凡是触发熔断的地方都单独标红。

## 纵览：分档卡

一篇示例文章的整体表现长这样（这是 UI 示范，分数是示例值）：

<div class="q-overview">
  <div class="q-card">
    <span class="q-label">内容质量总分</span>
    <span class="q-score q-medium">74.6</span>
    <span class="q-note-line">加权，见下方公式</span>
  </div>
  <div class="q-card">
    <span class="q-label">E-E-A-T</span>
    <span class="q-score q-medium">74.5</span>
    <span class="q-note-line">四个子维度均值</span>
  </div>
  <div class="q-card">
    <span class="q-label">HCU</span>
    <span class="q-score q-medium">82</span>
    <span class="q-note-line">7.0–8.5 为橙档</span>
  </div>
  <div class="q-card">
    <span class="q-label">信息增益</span>
    <span class="q-score q-low">69</span>
    <span class="q-note-line">触发外链熔断</span>
  </div>
  <div class="q-card">
    <span class="q-label">YMYL 风险</span>
    <span class="q-score q-low">Medium</span>
    <span class="q-note-line">独立风险卡，不进总分</span>
  </div>
</div>

**加权评分**（只在总览里展示，用来给一个整体印象）：

```text
内容质量总分 = E-E-A-T × 0.40 + HCU × 0.35 + Information Gain × 0.25
E-E-A-T     = (Experience + Expertise + Authoritativeness + Trust) ÷ 4
```

**YMYL 不参与加权**。它是条件型维度：一篇普通显示器评测根本用不到它，硬加权进去只会稀释其他维度。它单独作为风险卡展示，看的是"有没有触红线"，不是"内容做得好不好"。

## 分档标准

所有维度共用同一套分档（沿用审计系统里的配色）：

| 分数 | 档位 | 含义 |
| --- | --- | --- |
| ≥ 8.5 | 绿 | 该维度没有明显扣分点 |
| 7.0 – 8.5 | 橙 | 可用，但有明确的改进空间 |
| < 7.0 | 红 | 触发熔断或存在结构性缺陷 |

## 熔断规则：不由模型决定的那一层

审计系统里有一段 Python 硬限制代码，在模型打分之后**强制改分**。这是整套模型里最硬的部分——它不看文笔，只看事实：

| 触发条件 | 结果 |
| --- | --- |
| 出现绝对化营销词（game-changer / unprecedented / revolutionary / the ultimate / gold standard） | 封顶 **7.5** |
| 高危词（private tracker / linux iso / playon / makemkv / 破解 / 盗版）且全文无免责声明 | 熔断 **5.5** |
| 内链密度 > 1.5 个/百字 | 封顶 **7.5** |
| 外部权威链接为 0 | 封顶 **7.5** |
| 数据断言 ≥ 3 处但外部链接为 0 | 封顶 **7.0** |

页面上这样标注：

<div class="q-fuse">
<strong>系统强制降级</strong>：算法统计出文章外部权威链接数为 0。缺乏第三方交叉验证，信息增益得分锁定在 7.5 以下。
</div>

各维度还有自己的熔断项（比如参数写错直接降到 5.0 以下），写在对应维度页里。

## 怎么读这套评估

1. **先看分档卡**：哪一格是红的，问题就在那里
2. **再看熔断标记**：红色横幅是硬伤，改起来最直接
3. **最后看批注卡**：逐条对应正文位置，说明扣分原因和改法

批注卡怎么排、字段怎么写，见[批注规范](/content-quality/annotation-spec/)。

## 七个维度

- Experience：有没有真实上手经验
- Expertise：技术严谨性与边界界定
- Authoritativeness：可复核性与行业公认度
- Trust：诚实度、透明度与安全底线
- HCU：到达价值的时间与决策效率
- YMYL：风险与合规
- Information Gain：相对现有资料的增量价值
