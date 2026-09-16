---
title: "Structured Data"
description: "GEO 中的 Structured Data 不应被当作 AI 引用开关，而应作为实体消歧和关系表达层。重点是用稳定的 @id、类型、属性和关系，让页面中的品牌、作者、产品与内容形成一致机器图谱。"
order: 2
updated: "2026-09-16"
---

> GEO 中 Schema 的核心不是“多加几个 JSON-LD”，而是：**把页面里的实体、属性和关系，用机器能够稳定解析的方式表达出来。**

## GEO 中的作用

SEO 中 Structured Data 经常被理解成：

```text
Structured Data
→
Rich Result Eligibility
```

GEO 更应该理解成：

```text
Structured Data
→
Entity Identification
→
Relationship Mapping
→
Disambiguation
```

因此 Schema 对 GEO 的主要价值是：

| 作用 | 示例 |
| --- | --- |
| 实体识别 | 这是 Product，不是普通名词 |
| 作者关系 | Article → author → Person |
| 品牌关系 | Product → brand → Organization |
| 页面关系 | WebPage → mainEntity → Article |
| 外部身份 | Organization → sameAs → 外部官方身份 |
| 唯一标识 | `@id` 统一同一实体 |

它不能保证：

```text
AI 一定引用
Google 一定排名
获得 Knowledge Panel
```

## 先定义实体

不要先问：

```text
这页能加什么 Schema？
```

先问：

```text
页面里有哪些核心实体？
```

例如一篇产品评测：

| 实体 | 类型 |
| --- | --- |
| Article | Article |
| Product X | Product |
| Author A | Person |
| Brand B | Organization |
| Page | WebPage |
| Breadcrumb | BreadcrumbList |

然后再连接这些实体。

## 推荐关系

一篇内容页可以形成：

```text
WebPage
→ mainEntity → Article
→ author → Person
→ about → Product
→ publisher → Organization
```

产品可以继续：

```text
Product
→ brand → Organization
```

作者可以：

```text
Person
→ worksFor → Organization
```

这比五个彼此孤立的 Schema Block 更接近知识图谱。

## @id

`@id` 可以给实体一个稳定引用标识。

例如：

```json
{
  "@type": "Organization",
  "@id": "https://www.xxxx.com/#organization",
  "name": "Example Brand"
}
```

另一处无需重新定义全部字段：

```json
{
  "@type": "Article",
  "publisher": {
    "@id": "https://www.xxxx.com/#organization"
  }
}
```

推荐：

```text
同一个实体
→
同一个稳定 @id
```

不要不同页面随机生成不同 ID。

## Person

作者 Schema 应对应真实作者。

推荐字段：

| 字段 | 作用 |
| --- | --- |
| `name` | 姓名 |
| `url` | 作者主页 |
| `image` | 真实头像 |
| `jobTitle` | 职位 |
| `worksFor` | 所属组织 |
| `sameAs` | 外部身份 |
| `knowsAbout` | 可谨慎用于领域描述 |

但：

```text
Schema
不能制造 Expertise
```

如果作者身份、履历和作品不存在，填更多字段没有意义。

## Organization

Organization 负责稳定品牌实体。

常见字段：

```text
name
legalName
url
logo
sameAs
contactPoint
```

这些字段应和：

- About
- Footer
- Contact
- LinkedIn
- GitHub
- 其他官方身份

保持一致。

## Product

产品页建议确保：

| 字段 | 对齐对象 |
| --- | --- |
| name | 页面产品名 |
| brand | 品牌实体 |
| sku | SKU |
| image | 实际产品图 |
| description | 页面产品描述 |
| offers | 当前价格与库存 |
| review | 真实评价 |
| aggregateRating | 真实评分 |

最重要的是：

```text
Schema Fact
=
Visible Fact
```

不能页面显示 `$499`，Schema 写 `$399`。

## Article

Article / BlogPosting 可以明确：

```text
headline
author
publisher
datePublished
dateModified
image
about
```

GEO 更值得关注：

```text
author
about
publisher
dateModified
```

因为它们分别表达：

```text
谁写的
写什么实体
由谁发布
信息是否当前
```

## about 与 mentions

如果正文核心讨论一个实体，可以使用：

```text
about
```

如果只是正文提及，可以考虑：

```text
mentions
```

概念上：

| 关系 | 含义 |
| --- | --- |
| about | 页面核心主题 |
| mentions | 页面提到但不是主主题 |

不要把页面里出现的所有名词都塞成 `mentions`。

## sameAs

`sameAs` 用来表示：

```text
同一个实体
```

不是普通外链。

例如：

```text
Organization
→ sameAs
→ LinkedIn Company Page
```

不要把：

- 合作伙伴
- 媒体报道
- 竞争对手
- 引用来源

写成 `sameAs`。

## WebPage 与 mainEntity

对于定义页、产品页、作者页，可以建立：

```text
WebPage
→ mainEntity
→ Core Entity
```

例如：

```text
ProfilePage
→ mainEntity
→ Person
```

或者：

```text
Product Page
→ mainEntity
→ Product
```

它能帮助机器区分：

```text
页面本身
```

和：

```text
页面描述的实体
```

## Schema Graph

推荐采用 `@graph` 管理多个实体：

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.xxxx.com/#organization"
    },
    {
      "@type": "Person",
      "@id": "https://www.xxxx.com/authors/a/#person"
    },
    {
      "@type": "Article",
      "@id": "https://www.xxxx.com/article/#article"
    }
  ]
}
```

核心目标：

```text
减少重复
+
统一实体
+
明确边
```

## 不要为了 GEO 乱加类型

错误：

```text
Article
Product
FAQPage
HowTo
SoftwareApplication
Organization
Person
全部堆一页
```

更合理：

```text
页面实际存在什么实体
→
才标什么类型
```

Schema 数量不是 GEO 指标。

## 与正文一致

必须保持：

| 页面事实 | Schema |
| --- | --- |
| Author A | Author A |
| Updated 2026-09 | dateModified 2026-09 |
| Brand A | Brand A |
| Product 2 ports | 不写 3 ports |
| Price $499 | $499 |

机器可读层不能比可见正文“更会营销”。

## 与 Wikipedia / Wikidata

当一个公开实体已经存在稳定外部身份时，可以形成：

```text
Website Entity
→ sameAs
→ Wikipedia
→ Wikidata
```

但前提是：

```text
确实是同一个实体
```

不要为了 GEO 人工匹配错误 QID。

## GEO QA

| 检查 | 合格 |
| --- | --- |
| 核心实体已定义 | 是 |
| 每个实体有稳定 `@id` | 推荐 |
| Person 真实 | 是 |
| Organization 一致 | 是 |
| Product 数据同步 | 是 |
| sameAs 只连接同一实体 | 是 |
| 页面事实与 Schema 一致 | 是 |
| 时间和版本一致 | 是 |
| 无虚构评分 / 身份 | 是 |
| Rich Results Test 可解析 | 是 |

## 核心规范

```text
先识别实体
→
再定义类型
→
再建立关系
→
用 @id 统一身份
→
与可见内容保持一致
→
最后验证机器解析
```

> **GEO 中 Structured Data 最重要的价值不是“获得一个搜索特效”，而是让品牌、作者、产品和内容形成清晰、稳定、可验证的机器关系图。**
