---
title: GEO 概览
description: 生成式引擎优化的三块内容：概览、站内、平台
order: 0
updated: 2026-09-15
---

> GEO 优化的是"被 AI 答案引用"的概率。答案不来自十个蓝色链接，而来自模型写的一段话，所以单位从页面变成了段落。

GEO（生成式引擎优化）和 SEO 共用同一批素材，但考核的东西不一样：

| | SEO | GEO |
| --- | --- | --- |
| 目标 | 被点击 | 被引用 |
| 单位 | 页面 | 段落 |
| 证据 | 关键词覆盖、外链 | 可直接摘走的结论、日期、来源 |

**两者不冲突**：能被引用的段落，通常是本来就写得好的段落，所以做 GEO 的前提是页面已经能被搜到。

## 一、概览

AI 给出一个答案要经过四步：**检索候选 → 重排筛选 → 取段落 → 生成时决定引谁**。你的内容必须在每一步都活下来。

判断自己的内容有没有机会，问三件事：

- **抓得到**：AI 的爬虫能不能拿到页面（很多站点屏蔽了 GPTBot、PerplexityBot 还不自知）
- **摘得走**：有没有一句话能独立回答问题的段落
- **敢引用**：来源是不是可核实（署名、日期、口径清楚）

这一组的页面：

- [GEO 到底在优化什么](/geo/basics/what-geo-does/)：和 SEO 的分工，以及答案里的四步链路
- [AI 答案怎么选来源](/geo/basics/how-ai-picks-sources/)：检索、重排、引用各看什么
- [从哪开始查](/geo/basics/where-to-start/)：先搞清楚你现在的可见度

## 二、站内

站内是你能完全控制的部分，四项投入产出最高：

- **信息密度**：每段自带结论，别铺垫
- **llms.txt**：便宜但要认清它不解决什么
- **结构化数据**：把页面类型和字段说明白
- **作者与实体**：让"谁说的"可核实

这一组的页面：

- [信息密度](/geo/on-page/information-density/)：让段落能被整段摘走
- [llms.txt](/geo/on-page/llms-txt/)：2026 年它还值不值得做
- [结构化数据](/geo/on-page/structured-data/)：Schema 的最小可用写法
- [作者与实体](/geo/on-page/author-and-entity/)：署名、作者页、一致性

## 三、平台

**不同引擎的语料来源重叠度很低**，同一个话题在 Gemini 排第一的页面，在 Perplexity 可能完全不出现。所以要按平台分开看，不能用一个策略通吃。

这一组的页面：

- [Google AI Overviews](/geo/platforms/google-ai-overviews/)：UGC + 官方来源，和传统排名强相关
- [ChatGPT](/geo/platforms/chatgpt/)：引用少而稳，Reddit 权重在波动
- [Perplexity](/geo/platforms/perplexity/)：引用最多，最看重时效
- [Gemini](/geo/platforms/gemini/)：Google 系语料，和 AI Overviews 引用不同 URL
- [Grok](/geo/platforms/grok/)：X 内容有独特通道
