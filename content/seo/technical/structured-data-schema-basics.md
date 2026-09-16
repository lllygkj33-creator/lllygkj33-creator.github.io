---
title: "Structured Data"
description: "Structured Data 用标准化字段明确页面中的实体、属性和关系，帮助搜索引擎理解内容并使符合条件的页面获得 Rich Results。Schema 必须与页面可见内容一致，不能用于伪造事实。"
order: 11
updated: "2026-09-16"
---

> Structured Data 的核心不是“加代码就提升排名”，而是：**把页面里已经存在的实体、属性和关系，用机器能够稳定解析的格式明确表达出来。**

Google 使用 Structured Data 帮助理解页面内容，并在部分支持类型中决定页面是否有资格展示更丰富的搜索结果。

但必须区分：

```text
Structured Data
→ 帮助理解与 Rich Result Eligibility

不等于
→ 排名保证
```

## Schema 是什么

Schema.org 提供统一词汇。

例如：

```text
Product
Person
Organization
Article
BreadcrumbList
```

可以理解成：

```text
Entity Type
```

属性：

```text
name
author
brand
price
datePublished
```

可以理解成：

```text
Entity Properties
```

最终形成：

```text
实体
+
属性
+
关系
```

## 三种格式

常见格式：

| 格式 | 特点 |
| --- | --- |
| JSON-LD | 独立脚本，最容易维护 |
| Microdata | 写进 HTML 元素 |
| RDFa | 属性嵌入 HTML |

多数现代网站优先使用：

```text
JSON-LD
```

示例：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "JavaScript SEO 与渲染",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  }
}
</script>
```

## Schema.org 和 Google 支持

必须区分：

```text
Schema.org 支持的类型
```

和：

```text
Google Search 支持 Rich Result 的类型
```

Schema.org 有很多类型，但并不是所有类型都会在 Google 获得特殊展示。

所以实施前需要判断：

| 问题 | 是否 |
| --- | --- |
| Schema.org 是否存在这个类型 | 第一层 |
| Google 是否支持对应 Search Feature | 第二层 |
| 当前页面是否符合资格 | 第三层 |

## 常用类型

| 页面 | 常见 Schema |
| --- | --- |
| Blog | Article / BlogPosting |
| 新闻 | NewsArticle |
| 产品 | Product |
| 公司 | Organization |
| 作者 | Person |
| 面包屑 | BreadcrumbList |
| 视频 | VideoObject |
| 活动 | Event |
| 数据集 | Dataset |
| 软件 | SoftwareApplication |

不要因为可以添加，就一页堆几十种 Schema。

## 页面内容必须一致

最重要规则：

> **Schema 不能描述页面上不存在或用户看不到的重要事实。**

例如 Schema 写：

```text
ratingValue = 4.9
reviewCount = 1000
```

但页面没有任何真实 Review 数据。

这是高风险。

又例如：

```text
price = $99
```

而页面实际显示：

```text
$149
```

也是事实冲突。

## 实体一致性

Structured Data 最适合解决：

```text
谁
是什么
属于谁
由谁创作
```

例如：

```text
Article
→ author
→ Person

Product
→ brand
→ Organization
```

这和实体关系图谱是一致的。

页面应保持：

| 位置 | 信息 |
| --- | --- |
| 正文作者名 | John Smith |
| Article Schema | John Smith |
| Author Page | John Smith |
| Person Schema | John Smith |

不要出现多个名字或身份版本。

## Organization

Organization 适合描述：

- 公司名称
- Logo
- URL
- 联系信息
- SameAs
- 品牌实体

通常更适合放在：

```text
Homepage
或
About Page
```

不需要机械在所有页面重复完整 Organization Schema。

## Person

Person 可用于作者实体。

常见字段：

| 字段 | 用途 |
| --- | --- |
| name | 姓名 |
| url | 作者页 |
| image | 头像 |
| jobTitle | 职位 |
| worksFor | 所属组织 |
| sameAs | 外部身份 |

这些字段必须对应真实信息。

不要为了 E-E-A-T 创建：

```text
虚假专家 Schema
```

Schema 不会把假身份变成专家。

## Article

Article 常见：

```text
headline
author
datePublished
dateModified
image
publisher
```

重点保持：

```text
页面可见作者
=
Schema author
```

以及：

```text
真实更新时间
=
dateModified
```

不要每天自动修改 `dateModified`。

## Product

Product 常见字段：

- name
- image
- description
- brand
- sku
- offers
- review
- aggregateRating

价格和库存尤其要保持同步。

高风险：

```text
页面 Out of Stock
Schema 仍 InStock
```

或者：

```text
页面 $999
Schema $799
```

电商应把 Schema 和产品数据源连接，而不是手动维护两套。

## Breadcrumb

BreadcrumbList 用于表达页面层级。

例如：

```text
Home
→ SEO
→ Technical SEO
→ JavaScript SEO
```

Breadcrumb Schema 应与页面实际导航关系一致。

不要为了关键词额外创建不存在的层级。

## sameAs

`sameAs` 可以连接实体与外部权威身份。

例如 Organization：

```text
Website
→ LinkedIn
→ GitHub
→ YouTube
```

Person：

```text
Author Page
→ LinkedIn
→ GitHub
```

重点是：

```text
同一个真实实体
```

不是把所有社媒链接都塞进去。

## @id

复杂 Schema 可以使用 `@id` 把实体连接起来。

例如：

```text
Organization
@id = #organization

Article
publisher = #organization
```

这样可以减少重复定义，并形成更明确图结构。

简单理解：

```text
@id
=
实体唯一引用标识
```

## 页面图谱

一个 Article 页面可以形成：

```text
WebPage
├─ mainEntity → Article
├─ author → Person
├─ publisher → Organization
└─ breadcrumb → BreadcrumbList
```

这比多个彼此孤立 JSON-LD 块更容易维护。

但不要为了“图谱复杂度”人为制造不存在的关系。

## JavaScript 生成 Schema

Google 可以处理 JavaScript 生成的 JSON-LD。

但更稳定的做法仍然是：

```text
初始 HTML
或
服务端输出
```

尤其是：

- Product Price
- Author
- Canonical Entity
- Breadcrumb

如果 JS 失败，Schema 也可能消失。

## Rich Result 不是保证

即使：

```text
Schema Valid
```

也不代表：

```text
一定展示 Rich Result
```

还要满足：

- Search Guidelines
- 内容质量
- 技术可访问
- 页面资格
- Google 当前展示策略

所以：

```text
Valid
≠
Eligible 一定展示
```

## Required 和 Recommended

Google 支持的 Rich Result 类型通常会区分：

| 属性 | 作用 |
| --- | --- |
| Required | 缺失可能无法获得资格 |
| Recommended | 增强信息完整性 |

实施时先满足：

```text
Required
```

再补真实适用的：

```text
Recommended
```

不要为了“100% 完整”伪造不存在字段。

## FAQ Schema

FAQ 内容和 FAQ Schema 要分开。

即使网站有 FAQ，也不代表一定适合添加 FAQPage，也不代表 Google 一定展示 FAQ Rich Result。

Structured Data 应跟随：

```text
当前 Google 支持政策
```

而不是长期使用旧教程。

## 常见冲突

| 页面 | Schema | 问题 |
| --- | --- | --- |
| Author = Alice | author = Bob | 身份冲突 |
| Price = 99 | price = 79 | 价格冲突 |
| Out of Stock | InStock | 库存冲突 |
| Updated 2024 | dateModified 2026 | 假更新 |
| 无评分 | rating 5.0 | 虚假评价 |
| Product A | brand B | 实体错误 |

Structured Data 最怕：

```text
机器数据和用户可见数据不一致
```

## 验证工具

| 工具 | 用途 |
| --- | --- |
| Rich Results Test | Google Rich Result 资格 |
| Schema Markup Validator | Schema.org 语法 |
| URL Inspection | Google 实际看到什么 |
| Search Console Enhancements | 批量错误 |
| Crawler | 大规模 QA |

推荐流程：

```text
开发环境验证
→
上线少量页面
→
Rich Results Test
→
URL Inspection
→
批量部署
→
Search Console 监控
```

## 错误等级

| 类型 | 处理 |
| --- | --- |
| Critical Error | 优先修复 |
| Required Missing | 必须处理 |
| Warning | 判断是否适用 |
| Recommended Missing | 有真实信息再补 |

不要为了消灭 Warning 添加虚假值。

## SEO 与 GEO

Structured Data 对 GEO 的价值更接近：

```text
实体消歧
+
关系明确
+
机器可读
```

例如：

```text
Article
→ writtenBy → Person
→ worksFor → Organization
```

但不能把 Schema 当作：

```text
AI Citation 开关
```

AI 是否引用仍然取决于内容质量、可访问性、来源可信度和检索系统。

## QA 清单

| 检查 | 合格 |
| --- | --- |
| 页面类型匹配 Schema | 是 |
| Google 支持该 Feature | 已确认 |
| 内容可见 | 是 |
| 数据真实 | 是 |
| Author 一致 | 是 |
| Price 一致 | 是 |
| URL / @id 稳定 | 是 |
| Required Properties | 完整 |
| Rich Results Test | 通过 |
| URL Inspection | 可见 |

## 常见误区

| 误区 | 问题 |
| --- | --- |
| Schema 提升排名 | 不是直接保证 |
| Schema 越多越好 | 可能增加错误 |
| Schema.org 有就一定 Google 支持 | 不成立 |
| FAQ Schema 一定出富结果 | 不成立 |
| 可以写页面没有的数据 | 高风险 |
| Warning 必须全部清零 | 不一定 |
| JS 注入一定没问题 | 仍需渲染验证 |

## 核心规范

```text
先确定页面实体
→
选择匹配 Schema
→
只描述真实可见内容
→
保持实体和属性一致
→
验证 Required 字段
→
测试 Google 实际渲染结果
```

> **Structured Data 的真正价值不是“加 Schema”，而是把页面里的实体关系明确告诉机器。代码越准确、越稳定、越和页面事实一致，它的价值越高；伪造和过度标记反而会破坏信任。**
