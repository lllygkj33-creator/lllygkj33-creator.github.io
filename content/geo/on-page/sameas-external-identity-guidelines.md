---
title: "SameAs 与外部身份"
description: "SameAs 用于把站内实体与外部能够验证的同一实体身份关联起来。重点是身份等价，而不是把所有社媒链接都写进 Schema。"
order: 16
updated: "2026-09-16"
---

> SameAs 的核心不是“外链”，而是：**声明这个外部页面和当前实体代表的是同一个真实对象。**

## SameAs 是什么

Schema.org 的：

```text
sameAs
```

用于连接同一实体在外部平台上的身份。

例如：

```text
Organization
→ sameAs
→ LinkedIn Company Page
```

或：

```text
Person
→ sameAs
→ GitHub Profile
```

它表达的是：

```text
Identity Equivalence
```

不是普通推荐链接。

## 适合哪些实体

| 实体 | SameAs 示例 |
| --- | --- |
| Organization | LinkedIn、GitHub、YouTube |
| Person | LinkedIn、GitHub、Scholar |
| Brand | 官方外部品牌页 |
| Software | 官方仓库 / 权威实体页 |
| Product | 通常谨慎使用 |

## 不是所有社媒都要加

只添加：

```text
真正代表同一个实体
```

的页面。

不要因为有：

```text
Facebook
Instagram
TikTok
Reddit
```

就全部加入。

如果账号：

- 非官方
- 停用
- 由粉丝维护
- 名称相同但主体不同

不应该使用。

## Person 示例

作者：

```text
Jane Doe
```

可以连接：

| 站外身份 | 用途 |
| --- | --- |
| LinkedIn | 职业经历 |
| GitHub | 技术项目 |
| Google Scholar | 研究身份 |
| YouTube | 专业内容 |

前提是这些页面确实属于：

```text
同一个 Jane Doe
```

## Organization 示例

品牌实体可以连接：

```text
Website
→
LinkedIn
→
GitHub Organization
→
YouTube
```

这些平台最好互相指向同一个官网。

## SameAs 与普通链接

| 链接 | 关系 |
| --- | --- |
| sameAs | 同一实体 |
| citation | 引用来源 |
| author | 作者关系 |
| brand | 品牌关系 |
| worksFor | 任职关系 |

不要用 SameAs 表达：

```text
合作伙伴
竞争对手
引用来源
客户
```

因为它们不是同一实体。

## 外部身份质量

优先选择：

| 类型 | 价值 |
| --- | --- |
| 官方机构页 | 高 |
| LinkedIn 公司 / 人物 | 高 |
| GitHub 官方组织 | 高 |
| Google Scholar | 高 |
| 官方视频频道 | 中高 |
| 任意社媒小号 | 低 |

核心是：

```text
可验证
```

不是平台权重。

## 网站反向验证

理想结构：

```text
Website
→ sameAs → LinkedIn

LinkedIn
→ Website → 官方域名
```

双向一致能增强身份确定性。

虽然不是技术强制，但对实体验证很有帮助。

## 作者页

作者页可以显示真实外部身份。

例如：

| 字段 | 内容 |
| --- | --- |
| Name | Jane Doe |
| Role | Technical Editor |
| LinkedIn | 官方个人页 |
| GitHub | 官方账号 |
| Published Articles | 站内作品 |

这样：

```text
Person
→ Topic
→ Content
→ External Identity
```

关系更完整。

## SameAs 不等于 E-E-A-T

添加：

```text
sameAs
```

不会自动让作者变成专家。

如果外部身份没有：

- 专业经历
- 作品
- 真实历史

SameAs 只能帮助：

```text
确认身份
```

不能制造 Expertise。

## 品牌改名

改品牌后要同步：

- Organization name
- sameAs
- Social profile names
- Website links
- Logo
- About

不要官网已经是新品牌，SameAs 还全部指旧主体。

## QA 表

| 检查 | 合格 |
| --- | --- |
| 外部页属于同一实体 | 是 |
| 外部页公开可访问 | 是 |
| 外部页指回官网 | 推荐 |
| 名称一致 | 是 |
| 头像 / Logo 一致 | 推荐 |
| 已停用账号删除 | 是 |
| 非官方账号不加入 | 是 |
| SameAs 不被滥用 | 是 |

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 合作伙伴写 SameAs | 关系错误 |
| 同名陌生人写 SameAs | 身份错误 |
| 粉丝账号写 SameAs | 实体污染 |
| 只为了 SEO 塞几十个平台 | 噪声 |
| 过期账号不维护 | 身份冲突 |
| SameAs 代替真实作者页 | 不够 |

## 核心规范

```text
先确认实体
→
找到真实外部身份
→
只连接同一实体
→
保持名称和官网一致
→
定期检查有效性
```

> **SameAs 是实体身份桥梁，不是外链清单。它的价值来自“这个外部身份真的就是我”，而不是来自链接数量。**
