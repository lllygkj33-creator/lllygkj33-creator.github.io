---
title: "链接质量"
description: "链接质量不能由 DR、DA 或 Follow 单独判断。更可靠的判断框架包括来源真实性、主题相关性、编辑选择、上下文、链接位置、独立性、目标匹配和真实用户价值。"
order: 3
updated: "2026-09-16"
---

> 判断一个链接值不值得，最有用的问题是：**如果 Google 不存在，我还会不会希望这个页面把用户推荐给我？**

## 质量不是一个分数

常见错误：

```text
DR 80
=
高质量链接
```

或者：

```text
Follow
=
高价值
```

都过度简化。链接质量更接近：

```text
Source
+
Relevance
+
Editorial Choice
+
Context
+
Placement
+
Independence
+
Target Match
+
User Value
```

## 八个维度

| 维度 | 核心问题 |
| --- | --- |
| Source | 来源站真实吗 |
| Relevance | 主题相关吗 |
| Editorial | 是主动引用吗 |
| Context | 周围内容相关吗 |
| Placement | 链接在哪里 |
| Independence | 来源独立吗 |
| Target | 落地页匹配吗 |
| User Value | 真有人会点吗 |

## 来源真实性

先判断：

```text
这个网站为什么存在？
```

高质量来源通常有明确受众、稳定内容、可识别主体、正常导航、真实编辑内容和合理更新。风险来源常见大量无关主题、批量 AI 页、纯链接目录、大量 Sponsored Posts、页面之间几乎没有主题边界。

不要只看 Domain Metric。

## 主题相关性

可以分三层：

```text
Domain Relevance
Page Relevance
Paragraph Relevance
```

一个大型科技媒体的域名很强，但如果链接出现在完全无关的旅游文章，页面级相关性仍然很弱。相反，一个小型专业网站整篇都在讨论 Plex transcoding，即使第三方权威分数不高，也可能更有价值。

## 编辑选择

强链接通常有一个共同点：

```text
Editor chose to cite you
```

例如文章作者为了证明 Benchmark 主动链接你的测试，这比付费要求加入链接更接近独立认可。

| 类型 | 编辑独立性 |
| --- | --- |
| Editorial Citation | 高 |
| Earned Media | 高 |
| Partner Resource | 中 |
| Guest Post | 视情况 |
| Sponsored Placement | 低 |
| Link Exchange | 低 |
| Automated Directory | 低 |

## 上下文

链接周围的文字应该解释“为什么这里需要这个链接”。

例如：

```text
Our tests found that Intel Quick Sync handled
four simultaneous 1080p transcodes.
The full Plex benchmark contains the raw results.
```

其中 `Plex benchmark` 链接到真实测试页，关系完整。

## 链接位置

位置不是公开的固定排名公式，但可帮助判断编辑语义。

| 位置 | 常见意义 |
| --- | --- |
| Main Body | 强语境 |
| Citation / Reference | 证据 |
| Author Bio | 身份 |
| Resource List | 推荐集合 |
| Footer | 模板链接 |
| Sidebar | 模板 / 导航 |
| Comment | UGC |

正文引用通常比全站 Footer 重复链接更能表达具体页面关系。

## 独立来源

需要区分：

```text
Links
```

和：

```text
Independent Referring Domains
```

同一网站模板产生 1,000 个链接，不是 1,000 份独立验证。20 个新闻聚合页全部同步同一 Press Release，也不能当作 20 次独立编辑认可。

## Referring Domains

Referring Domain 可以帮助观察来源多样性，但也不能机械追求数量。

```text
50 个随机目录域名
```

不一定比：

```text
5 个行业核心媒体
```

更有价值。重点是 Relevant Independent Sources。

## Link Equity

Link Equity 可以理解成链接关系可能传递的搜索信号，但没有公开公式可以准确算：

```text
这个链接 = 7.4 分
```

影响 Link Equity 的因素可能包括来源页面重要性、相关性、Spam Detection、Link Attribute、页面结构、Target、Redirect、Canonical。

因此它更适合解释关系，而不是作为 KPI。

## Follow 和属性

`nofollow`、`sponsored`、`ugc` 是链接关系声明，但：

```text
Link Attribute
≠
完整质量判断
```

一个高相关媒体的 `nofollow` 链接仍可能有很强的 Brand、Referral、Discovery 和 Secondary Coverage；垃圾目录的 Follow 链接也不一定有意义。

## Anchor

Anchor 应描述目标、自然并符合上下文。不要主动追求大量 Exact Match。高质量外链往往自然混合 Brand、Partial Match、URL、Claim、Evidence、Page Title。

## 第三方指标

常见：

```text
DR
DA
AS
TF
CF
```

这些都是第三方工具指标，不是 Google Ranking Score。

正确用法：

```text
筛选
+
比较
+
发现异常
```

错误用法：

```text
DR > 60
→
自动买
```

## 流量

一个值得关注的链接，最好还有真实用户价值。可以问：

```text
这个页面有人看吗？
这个链接有人点吗？
点击进来的人是否相关？
```

Referral Traffic 不代表全部 SEO 价值，但它能帮助判断链接是不是活在真实互联网里。

## 质量矩阵

内部可以使用：

| 维度 | 低 | 中 | 高 |
| --- | --- | --- | --- |
| Relevance | 无关 | 相邻主题 | 高度相关 |
| Editorial | 自动 | 合作 | 主动引用 |
| Context | 模板 | 列表 | 正文证据 |
| Independence | 同源 | 部分独立 | 独立来源 |
| User Value | 无点击价值 | 有些价值 | 高度匹配 |

不要把结果包装成 Google Link Score，它只是内部 QA。

## 好链接示例

```text
一个存储媒体
测试 NAS 系统
引用你的 RAID Benchmark
并链接到完整原始数据
```

特点：

```text
相关
+
编辑主动
+
正文
+
Evidence Anchor
+
目标匹配
```

## 弱链接示例

```text
一个无关站点
Footer 出现
best home server
```

同时旁边有 `casino / VPN / loan / SEO`。即使是 Follow，也不应该自动视为高价值。

## 核心规范

```text
先看来源真实性
→
再看主题相关性
→
再看是否编辑主动
→
再看上下文和位置
→
再看独立性
→
最后参考第三方指标
```

> **链接质量的核心不是域名分数，而是一个独立、真实、相关的来源是否有充分理由，在正确上下文中主动推荐你的正确页面。**
