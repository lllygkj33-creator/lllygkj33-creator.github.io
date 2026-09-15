---
title: llms.txt
description: 2026 年的证据：便宜，但别指望它带来引用
order: 2
updated: 2026-09-15
---

> llms.txt 是一份放在站点根目录的 markdown 目录，用来告诉模型"这个站有什么、从哪读"。它成本极低，但**目前的证据不支持它是引用增长的杠杆**。

## 先看结论

| 说法 | 2026 年的实际情况 |
| --- | --- |
| "加了就会被 AI 引用" | 没有证据支持。服务器日志里 AI 爬虫对它的请求量极低 |
| "Google 会用" | Google 明确不支持。Gary Illyes 在 2025 年 7 月的 Search Central Live 上确认不做，John Mueller 把它类比成早已废弃的 keywords meta 标签 |
| "对文档站有用" | 这是它比较站得住的价值：给 agent 和工具提供一份干净的站点结构 |

结论：**当便宜的保险做，别当排名手段做**（[llms.txt 2026 年证据汇总](https://www.geoly.ai/blog/does-llms-txt-work)）。

## 最小可用版本

```md
# 站点名

> 一句话说明这个站是干什么的

## 核心内容
- [关键词研究](/seo/basics/keyword-research/): 从种子词到可派工的页面清单
- [信息密度](/geo/on-page/information-density/): 让段落能被整段摘走

## 其他
- [博客](/blog/): 随笔与实测记录
```

三条写法约定：

- **必须是 markdown**，不是 XML 站点地图
- 每条链接后面跟一句说明，说明是给模型看的
- 只列值得被读的页面，低价值页面不要放

## 更该做的同类事

如果只想投入一件事，把时间花在**让页面本身可被抓、可被摘**上，收益比 llms.txt 明确得多：

- 检查 `robots.txt` 有没有挡掉 AI 爬虫
- 把答案写进每段第一句
- 加结构化数据

## 怎么生成

站点不大时手写一份就够；页面多了用构建脚本从内容目录自动生成，避免和实际页面脱节。

> 注意：llms.txt 只在站点根目录生效（`/llms.txt`），放进子目录没有意义。

## Next steps

- [结构化数据](/geo/on-page/structured-data/)：同样"写给机器看"，但它是被搜索引擎正式支持的
- [从哪开始查](/geo/basics/where-to-start/)：先确认爬虫抓得到，再谈这些
