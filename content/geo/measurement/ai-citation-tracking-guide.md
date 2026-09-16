---
title: "AI Citation"
description: "AI Citation Tracking 用于记录生成式回答何时引用网站、引用哪个 URL、支持哪条 Claim，以及引用是否准确。重点不是单纯统计链接数量，而是观察 Citation 的来源、质量、稳定性和商业价值。"
order: 2
updated: "2026-09-16"
---

> AI Citation Tracking 的核心不是“有没有一个链接”，而是：**什么问题触发了引用、引用了哪个页面、引用支持了什么 Claim，以及这个引用是否长期稳定。**

## 什么是 Citation

GEO 中 Citation 通常指：

```text
AI Answer
→
明确引用一个 Source / URL
```

它和 Mention 不同。

| 指标 | 含义 |
| --- | --- |
| Mention | 答案出现品牌 / 实体 |
| Citation | 答案明确引用网站 |
| Referral | 用户点击引用进入网站 |

三个阶段：

```text
Mention
→
Citation
→
Referral
```

并不一定同时发生。

## 记录什么

建议最少记录：

| 字段 | 示例 |
| --- | --- |
| Prompt | Best home server for Plex |
| Platform | Platform A |
| Date | 2026-09-16 |
| Mention | Yes |
| Citation | Yes |
| Citation URL | /home-server-guide |
| Claim Supported | Plex recommendation |
| Position | First source |
| Accuracy | Correct |

## Citation URL

不要只记录：

```text
Domain cited
```

更有价值的是：

```text
哪个 URL 被引用
```

这样可以看：

- 哪类页面最容易被引用
- 哪个 Topic 最强
- 是否总引用旧页
- 是否引用商业页
- 是否引用 Support

## Citation Type

可以内部分类：

| 类型 | 含义 |
| --- | --- |
| Evidence | 支持事实 |
| Definition | 解释定义 |
| Recommendation | 支持选择 |
| Specification | 支持参数 |
| Experience | 支持一手测试 |
| Background | 背景信息 |

不同 Citation 的业务价值不同。

## Citation Position

生成式回答可能引用多个来源。

内部可以记录：

```text
Source Position
```

例如：

```text
1 / 5
```

但不要把它机械理解成传统 SERP Rank。

它只是：

```text
回答中的来源顺序
```

## 稳定性

一次 Citation 不足以说明稳定。

例如固定 Prompt 测 4 周：

| Week | Citation |
| --- | --- |
| 1 | Yes |
| 2 | Yes |
| 3 | No |
| 4 | Yes |

可以定义内部：

```text
Citation Stability
=
3 / 4
=
75%
```

这不是平台官方指标。

## Citation Drift

Citation 可能发生：

```text
URL A
→
URL B
```

或者：

```text
Your Site
→
Competitor
```

这叫 Citation Drift。

建议追踪：

| 变化 | 可能原因 |
| --- | --- |
| 新 URL 替代旧 URL | Freshness |
| Competitor 替代 | 对方证据更强 |
| Wikipedia 替代 | 实体背景 |
| 无 Citation | 回答模式变化 |

## Old Citation

如果 AI 仍然引用：

```text
2024 页面
```

而站内已经有：

```text
2026 页面
```

检查：

- 旧页权重
- Canonical
- Redirect
- 内容版本
- 新页引用证据
- 内链结构

不要只删除旧页面。

## Citation Accuracy

引用本站不代表一定正确。

需要检查：

```text
AI 是否正确理解了你的页面
```

例如页面说：

```text
16GB is enough for basic workloads.
```

AI 却总结：

```text
16GB is enough for all workloads.
```

Citation 存在，但：

```text
Boundary 丢失
```

所以建议同时记录：

```text
Citation Accuracy
```

## Accuracy 评分

内部可以使用：

| 分数 | 含义 |
| ---: | --- |
| 2 | 准确并保留条件 |
| 1 | 基本准确但缺边界 |
| 0 | 错误或失真 |

这样能识别：

```text
“被引用但被误解”
```

的问题。

## 哪些页面容易引用

通常值得单独观察：

- Original Data
- Benchmark
- Definition
- Comparison Table
- Technical Spec
- Current Documentation
- First-party Experience

不要假设：

```text
长文章
```

就更容易被引用。

更重要的是：

```text
Claim 是否清楚
+
证据是否强
+
Passage 是否独立
```

## Citation Inventory

可以维护：

| URL | Topic | Citations | Stable Prompts | Accuracy |
| --- | --- | ---: | ---: | ---: |
| /a | Plex | 12 | 8 | 1.9 |
| /b | NAS | 5 | 3 | 1.4 |

这样可以找到：

```text
Citation Assets
```

## 竞争对手

Citation Tracking 也应该记录：

```text
谁和你一起被引用
```

例如：

| Brand / Source | Frequency |
| --- | ---: |
| Your Site | 18 |
| Wikipedia | 25 |
| Competitor A | 30 |
| Reddit | 14 |

这能帮助判断：

```text
AI 当前信任哪些来源类型
```

## 核心规范

```text
固定 Prompt
→
记录 Citation
→
记录 URL
→
检查 Claim
→
评估 Accuracy
→
持续追踪 Stability
```

> **AI Citation Tracking 的价值不是证明“AI 喜欢你”，而是把引用行为变成可观察的数据：什么问题、什么页面、什么 Claim、什么时间，真正获得了来源位置。**
