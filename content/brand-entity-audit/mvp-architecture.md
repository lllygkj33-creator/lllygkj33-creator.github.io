---
title: "MVP Architecture：5000 页面需要什么技术栈"
description: "用 Python、requests、BeautifulSoup、GPT API、JSON 与 SQLite 搭出五层架构，并说明什么时候才值得升级图数据库。"
order: 11
updated: "2026-09-17"
---

> 5000 页面的品牌实体检测，**SQLite 就够了**。真正决定系统能不能跑起来的是分层和 Schema，不是数据库选型——Neo4j、Kafka、GraphRAG、OpenSPG、Elastic 都是以后的事，不是第一版的事。

## 先看规模，再定技术栈

选型前先把数字摆出来，很多"必须上分布式"的直觉会当场消失：

| 项目 | 第一版规模 |
| --- | ---: |
| 页面数 | 约 5000 |
| 品牌自有实体 | 20–50 个 |
| Canonical Fact / Claim | 几百条 |
| 每轮需要重新 AI 抽取的页面 | 变化页面数，通常几十个 |

这是一个**数据量很小、但流程要求很严**的系统。难点在 Schema 设计、比对规则和人工审核，不在高并发、不在海量写入、也不在毫秒级图查询。拿这个规模去上集群、消息队列或图数据库，是拿基础设施的复杂度换一个本来不存在的性能问题。

第一版推荐：

```text
Python
requests
BeautifulSoup
GPT API
JSON
SQLite
```

| 组件 | 负责什么 | 为什么用它 |
| --- | --- | --- |
| **Python** | 全部流程脚本 | 抓取、解析、调用 API、写库都在同一个语言里，不用拼多套工具 |
| **requests** | 抓取层 | 拿 HTML、拿 sitemap.xml、读 last_modified 响应头 |
| **BeautifulSoup** | 解析层 | 定位正文区域、读表格、读 JSON-LD，够用且好调试 |
| **GPT API** | 抽取层 | 只负责从自然语言里抽 Entity / Fact / Claim，输出结构化候选 |
| **JSON** | 交换格式 | Canonical Seed 与 Page Observation 都以 JSON 落地，人和 AI 都能读 |
| **SQLite** | 存储层 | 单文件数据库，存几千条记录、做依赖反查，完全够用 |

一句话概括分工：**requests 和 BeautifulSoup 把页面变成干净文本，GPT API 把文本变成候选，JSON 承载候选，SQLite 保存关系与状态。**

## 五层架构

真正的架构不是技术栈清单，而是分层。每一层只做一件事：

```text
抓取层 Ingestion
  sitemap.xml / CMS 导出 / Shopify 导出 → requests → HTML
  产出：原始 HTML + last_modified + content_hash
        ↓
抽取层 Extraction
  规则优先：JSON-LD / 规格表 / 结构化字段
  AI 补充：自然语言里的 Claim 与叙述型 Fact
  产出：Candidate（带 source_text / source_locator）
        ↓
审核层 Human Review
  Expected / Observed / Source / Status → Approve / Edit / Reject / Ignore
  产出：Canonical Fact / Claim（人工确认）
        ↓
比对层 Comparison
  Observation × Canonical → comparison_status
  match / compatible / less_specific / conflict
  产出：Conflict Queue + Needs Review
        ↓
依赖层 Dependency
  Page → Entity → Fact / Claim → 知识变化反查受影响 URL
  产出：Affected URLs + 增量重核对清单
```

这五层里有两个边界必须守住，它们也是最常见的架构错误：

```text
抓取层 ≠ 抽取层
抓取只负责"把页面拿下来"，不理解内容；
抽取只负责"从文本里读出候选"，不判断对错。
两者写在一个脚本里，页面结构一变，抽取逻辑就一起崩。

AI 抽取 ≠ Canonical
AI 只产出 Candidate；Canonical 必须经过人工审核才能写入。
```

技术栈可以换，Schema 不能乱。核心是 **Canonical Schema + Observation Schema + Comparison Rules**，其他都是实现细节。

## 抓取层：requests 够用，Firecrawl 不是必需

抓取层只是 **Ingestion Layer**，优先级有顺序：

```text
CMS / Shopify Export / 内部数据  >  普通 Python 抓取  >  Firecrawl 等专业抓取工具

sitemap.xml → requests → BeautifulSoup → clean body
```

能拿到 CMS 或商城导出的原始数据，就不要为了"技术感"重新爬自己的网站。只能从网页拿的时候，上面这条路径对 5000 页面已经够。

Firecrawl 这类专业抓取工具更适合：JS 渲染、反爬与登录页、自动转 Markdown、批量 Crawl 托管、现成变化监控。**但它不是核心**——第一版完全可以用 requests 起步，甚至先用任何现成抓取工具把 HTML 拉下来存成文件，再自己写解析，抓取方式不影响后面的抽取、比对和依赖追踪。

## 最小表结构

第一版只需要四类表，字段照抄规格即可。

| 表 | 字段 |
| --- | --- |
| **Entities** | entity_id / parent_id / type / canonical_name / aliases |
| **Canonical Facts** | fact_id / entity_id / attribute / value / scope / source / verified_at / review_status |
| **Canonical Claims** | claim_id / entity_id / claim_type / relation / object / condition / scope / source / confidence / review_status |
| **Page Observations** | url / page_type / entity_id / observation_type / canonical_id / attribute_or_relation / observed_value / source_locator / comparison_status / content_hash |

落成 SQL：

```sql
CREATE TABLE entities (
  entity_id       TEXT PRIMARY KEY,
  parent_id       TEXT,
  type            TEXT NOT NULL,
  canonical_name  TEXT NOT NULL,
  aliases         TEXT
);

CREATE TABLE canonical_facts (
  fact_id        TEXT PRIMARY KEY,
  entity_id      TEXT NOT NULL,
  attribute      TEXT NOT NULL,
  value          TEXT,
  scope          TEXT NOT NULL,
  source         TEXT,
  verified_at    TEXT,
  review_status  TEXT NOT NULL
);

CREATE TABLE canonical_claims (
  claim_id       TEXT PRIMARY KEY,
  entity_id      TEXT NOT NULL,
  claim_type     TEXT NOT NULL,
  relation       TEXT NOT NULL,
  object         TEXT,
  condition      TEXT,
  scope          TEXT NOT NULL,
  source         TEXT,
  confidence     TEXT,
  review_status  TEXT NOT NULL
);

CREATE TABLE page_observations (
  url                 TEXT NOT NULL,
  page_type           TEXT NOT NULL,
  entity_id           TEXT NOT NULL,
  observation_type    TEXT NOT NULL,
  canonical_id        TEXT,
  attribute_or_relation TEXT,
  observed_value      TEXT,
  source_locator      TEXT,
  comparison_status   TEXT,
  content_hash        TEXT,
  PRIMARY KEY (url, entity_id, observation_type, canonical_id)
);
```

三处设计不能省：

| 字段 | 为什么不能省 |
| --- | --- |
| `entities.parent_id` | 让 Variant 挂在产品模型下面，而不是变成独立产品；`type` 再区分 product_model / product_variant / bundle / software / brand |
| `canonical_facts.scope`、`review_status` | Scope 是必填字段；`review_status` 决定这条记录能不能被当成标准答案使用 |
| `canonical_claims.condition`、`confidence` | "需要额外网卡才能扩展成多网口网关"这类表述，条件本身就是信息，丢掉就会被读成无条件能力 |

`page_observations` 同时承担两件事：**保存页面实际说了什么**，以及**保存依赖关系**。`canonical_id` 一列就是依赖索引——知识一变，按它反查就能拿到受影响 URL。

四张表之外**不需要第五张**。Canonical 与 Observation 必须是两张不同的表、两种不同的语义，绝不允许把页面抽取结果直接写进 Canonical 表——这是整套系统最容易崩的地方。

## 依赖反查用一条 SQL 就够

"MVP 不需要图数据库"最有力的证据，是它在关键查询上根本不慢：

```sql
SELECT url, observed_value, comparison_status
FROM page_observations
WHERE canonical_id = 'F_ZB2_832_RAM';
```

一条索引命中即可返回受影响 URL：

```text
F_ZB2_832_RAM
↓ used_by
/blog/a
/blog/b
/page/c
```

这就是 `Page → Entity → Fact / Claim` 这条链在 SQLite 里的全部实现。几千行到几十万行的量级，单文件数据库完全不需要优化。

## 暂时不需要的东西

第一版不要上：**Neo4j、Kafka、GraphRAG、OpenSPG、Elastic、ClickHouse**。

| 组件 | 它解决什么问题 | 为什么第一版不需要 |
| --- | --- | --- |
| **Neo4j** | 多跳关系、图算法、可视化探索 | 当前只有 Page → Entity → Fact/Claim 两层跳转，一条 JOIN 就能表达 |
| **Kafka** | 高吞吐事件流、削峰、多消费者 | 抓取是批处理，一天一轮，没有实时流 |
| **GraphRAG** | 用图结构增强检索与生成 | 系统产出是审核清单，不是问答检索 |
| **OpenSPG** | 大规模知识图谱构建框架 | 品牌自有实体只有 20–50 个，用不上框架级抽象 |
| **Elastic** | 全文检索与聚合 | 5000 页面用 SQL 索引足够定位记录 |
| **ClickHouse** | 海量分析型查询 | 数据量离分析型数据库的门槛还差几个数量级 |

判断标准很简单：**如果一个组件解决的是"规模问题"或"实时问题"，而当前既没有规模也没有实时，它就是负债而不是能力。** 部署、运维、调试成本立刻产生，收益却要等很久才可能出现。

## 什么时候才值得上图数据库

这一步必须说清楚，否则"不要过度工程化"会变成"永远不要图数据库"。出现下面三类情况时才值得升级：

| 触发条件 | 具体表现 |
| --- | --- |
| **关系查询变成多跳** | 要按 Entity → Variant → Software → Version → Compatibility 连跳几层才能回答一个问题 |
| **需要图算法** | 需要最短路径、连通分量、中心度、影响传播范围，SQL 写起来会失控 |
| **需要可视化探索** | 需要人在图上点开节点、顺边浏览、人工发现异常关系，而不是看表格 |

关键不在"关系变多"，而在**必须多跳才能回答**。上表前几行在 MVP 里本来就有：Entity → Variant 靠 `parent_id`，Entity → Claim 靠 `entity_id`，Page → Claim 靠 `canonical_id`，全是单跳。真正需要图数据库的是这种问题："某个软件版本升级后，经过几条关系能波及到哪些 Claim，再波及到哪些页面。"

## 审核 Dashboard 的最小形态

第一版不要做复杂图谱 UI。JSON 是过程产物与人工可读的原始记录，SQLite 是查询与运行状态，Dashboard 只需要回答"现在有多少问题"：

```text
Entities: 20            Conflicts: 37
Canonical Facts: 300    Ambiguities: 18
Canonical Claims: 120   Canonical Gaps: 22
Pages Scanned: 5000     New Entity Candidates: 3
```

点开 ZimaBoard 2，看到它挂着的 Canonical Facts、Canonical Claims、Used by X pages、Conflicts、Ambiguities、Affected URLs。每个审核项只要六个字段和四个按钮：

```text
Expected / Observed / Source / Source Text / URL / Status
Approve / Edit / Reject / Ignore
```

**Approve 是唯一能把 Candidate 变成 Canonical 的动作。** 没有人工点这一下，AI 抽出来的东西只能停在 Candidate 或 Needs Review，不能进 Canonical 表。这样的页面用最普通的表单就能做出来，不需要图组件和可视化引擎。

## Future Extension：以后可以加，但现在不是必需

Neo4j、Knowledge Graph、Source Provenance Graph、Entity Coverage、Version Graph、Multi-language Observation、Automated Pull Request、CMS Rewrite Suggestion、Alerting、Risk Scoring——都属于后续扩展，第一版不做也不影响系统成立。

## 落地顺序

搭 MVP 的顺序和重要性反过来——**先 Schema，再流程，最后才优化抓取**：

```text
Phase 1  定 Canonical Schema 与 Observation Schema
Phase 2  品牌官网 / 产品页与文档 → Candidate → 人工审核 → Canonical
Phase 3  商城 PDP → Observation → 站群内部一致性比对
Phase 4  高相关 Blog / Page → Observation
Phase 5  全站批量扫描 → Phase 6 content_hash 增量 + Dependency Impact
```

Phase 2 就能产出真实价值：**官方站群自己内部就会互相冲突**，这不需要等到扫完 5000 页才发现。

一句话收尾：**先用 JSON + SQLite 把流程跑通，再考虑知识图谱和图数据库。** 门槛在 Schema 和审核规则上，不在基础设施上。
