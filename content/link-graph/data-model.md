---
title: "数据结构"
description: "节点与边的 JSON 结构：字段定义、状态标记、汇总字段，以及输出文件约定。"
order: 1
updated: "2026-09-16"
---

> 数据只有一个来源：**JSON**。界面只是它的可视化。所以字段定义要一次定清，后续扩展不用改结构。

## 核心模型

```text
一篇 Blog    = 一个节点 Node
一条内链     = 一条边 Edge
锚文本       = 边的属性
入链 / 出链  = 节点的状态
孤岛 / 死胡同 = 图的诊断结果
```

第一版只处理 **Blog → Blog**，不算产品页、文档页、导航、页脚、站点地图与外部链接。

## 顶层结构

```json
{
  "generated_at": "2026-09-16T17:00:00+08:00",
  "site": "https://xxxx.com",
  "scope": {
    "type": "blog-to-blog",
    "include_patterns": ["/blogs/"]
  },
  "summary": {
    "total_pages": 14,
    "total_edges": 25,
    "orphan_pages": 1,
    "dead_end_pages": 2,
    "weak_pages": 6,
    "broken_links": 1,
    "redirect_links": 1
  },
  "pages": [],
  "edges": []
}
```

`summary` 是必须字段——界面渲染总览时不用重新遍历全部页面。

## 节点字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `url` | string | 绝对地址，已标准化 |
| `path` | string | 站点内路径 |
| `title` | string | 页面标题 |
| `content_type` | string | 第一版固定 `blog`，预留扩展 |
| `topic` | string | 主题（来自既有分类，不自动猜测） |
| `cluster` | string | 主题簇 |
| `status` | number | 抓取时的响应状态 |
| `canonical` | string | 页面声明的规范地址 |
| `incoming_links` | array | 指向它的页面（去重） |
| `outgoing_links` | array | 它指向的页面（去重） |
| `incoming_count` | number | 入链数 |
| `outgoing_count` | number | 出链数 |
| `is_orphan` | boolean | 入链为 0 |
| `is_dead_end` | boolean | 出链为 0 |
| `is_weak` | boolean | 入链不超过阈值（默认 1） |
| `depth` | number / null | 从入口起算的层级，第一版可留空 |
| `last_crawled` | string | 抓取时间 |

```json
{
  "url": "https://xxxx.com/blogs/plex-guide",
  "path": "/blogs/plex-guide",
  "title": "Plex 家庭影音指南",
  "content_type": "blog",
  "topic": "Plex",
  "cluster": "media",
  "status": 200,
  "canonical": "https://xxxx.com/blogs/plex-guide",
  "incoming_links": ["https://xxxx.com/blogs/plex-hardware"],
  "outgoing_links": [
    "https://xxxx.com/blogs/plex-hardware",
    "https://xxxx.com/blogs/jellyfin-vs-plex"
  ],
  "incoming_count": 4,
  "outgoing_count": 3,
  "is_orphan": false,
  "is_dead_end": false,
  "is_weak": false,
  "depth": null,
  "last_crawled": "2026-09-16T17:00:00+08:00"
}
```

## 边字段

一条边不要只记 `A → B`，否则后面没法做链接质量分析。必须保留锚文本、位置、关系与目标状态。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `source` | string | 来源页 |
| `target` | string | 目标页 |
| `occurrences` | number | 同一来源链接同一目标的次数 |
| `anchors` | array | 全部锚文本（按出现顺序） |
| `location` | string | 位置，第一版固定 `body` |
| `nofollow` | boolean | 是否 nofollow |
| `target_status` | number | 目标状态码 |
| `final_url` | string | 目标为重定向时的最终地址 |
| `broken` | boolean | 目标失效 |

```json
{
  "source": "https://xxxx.com/blogs/plex-guide",
  "target": "https://xxxx.com/blogs/plex-hardware",
  "occurrences": 1,
  "anchors": ["Plex hardware requirements"],
  "location": "body",
  "nofollow": false,
  "target_status": 200,
  "broken": false
}
```

### 重复链接怎么记

同一页在正文里链接同一目标 3 次：

- **图层面**：只算 1 条边，避免图谱视觉重复、避免入链数虚高
- **边属性**：`occurrences: 3`，并把 3 个锚文本全部收进 `anchors`

### 自链与外部链接

| 情况 | 处理 |
| --- | --- |
| 自链（A → A） | 不计入图，单独记入自链清单，用于排查模板问题 |
| 外部链接 | 不计入图 |
| 邮件、电话、脚本链接 | 不计入图 |
| 参数与锚点变体 | 标准化后合并为同一个节点 |

## 汇总字段

顶层 `summary` 固定输出这些：

| 字段 | 含义 |
| --- | --- |
| `total_pages` | 节点数，应等于参与图谱的 Blog 数 |
| `total_edges` | 去重后的边数 |
| `orphan_pages` | 入链为 0 的页面数 |
| `dead_end_pages` | 出链为 0 的页面数 |
| `weak_pages` | 入链不超过阈值的页面数 |
| `broken_links` | 目标失效的边数 |
| `redirect_links` | 目标为重定向的边数 |

## 输出文件

```text
/data/link-graph.json           主数据（节点 + 边 + 汇总）
/data/link-graph-summary.json   仅汇总，供总览快速读取
/data/link-graph-errors.json    抓取失败清单（调试用）
```

错误清单结构：

```json
[
  { "url": "https://xxxx.com/blogs/a", "error": "fetch_failed", "status": 500 }
]
```

## 版本

每次抓取必须写 `generated_at`，并保留历史文件：

```text
2026-09-16.json
2026-09-23.json
```

这样才能比较两次抓取，检测新增孤岛、新增断链、丢失的内链与新增的内链，判断内链结构是否在改善。
