---
title: "配置"
description: "抓取范围、URL 标准化规则、正文区域定位、配置文件与抓取流程，以及只读原则。"
order: 3
updated: "2026-09-16"
---

> 配置决定图谱准不准。**范围划错、正文区域找错，图就失去意义**——最常见的错误是把页脚和导航的链接也算进来。

## 范围

默认只纳入 Blog：

```json
{
  "include_patterns": ["/blogs/"],
  "exclude_patterns": ["/blogs/tag/", "/blogs/category/"]
}
```

排除项固定剔除：参数、锚点、自链、外部域名、邮件、电话、脚本链接。

## URL 标准化

```text
https://xxxx.com/blogs/example/?utm_source=x#section
→ https://xxxx.com/blogs/example
```

规则：

- 去掉 `#锚点`
- 去掉追踪参数
- 去掉结尾多余的 `/`
- 统一 HTTPS
- 统一域名大小写
- 相对地址转绝对地址
- 读取页面声明的规范地址
- 重定向归一到最终地址

这样下面三种写法最终只会有一个节点：

```text
/blogs/test
/blogs/test/
/blogs/test?utm_source=abc
```

## 正文区域

**不要解析整页的所有链接**，否则页脚、导航、侧栏、相关阅读、语言切换都会污染图谱。

优先按语义容器定位：

```html
<article>
```

定位不到时，用配置指定选择器：

```json
{ "content_selector": ".article-content" }
```

如果正文区域始终识别不稳定，先在单页上把选择器调准，再全量跑——**选择器错一次，整张图都要重跑**。

## 配置文件

```json
{
  "site": "https://xxxx.com",
  "include_patterns": ["/blogs/"],
  "exclude_patterns": ["/blogs/tag/", "/blogs/category/"],
  "content_selector": ".article-content",
  "weak_incoming_threshold": 1,
  "ignore_query": true,
  "ignore_fragment": true
}
```

这样同一套系统可以换站点复用，只改配置文件。

## 抓取流程

```text
1. 收集全部 Blog 地址
2. 标准化地址
3. 抓取 HTML
4. 读取规范地址
5. 定位正文区域
6. 提取正文内的链接
7. 过滤出 Blog 内链
8. 标准化目标地址
9. 生成边
10. 聚合入链与出链
11. 检查目标状态
12. 计算孤岛 / 死胡同 / 弱连接
13. 输出 JSON
14. 渲染图谱
```

第 11 步要真的请求目标地址拿状态码——**不检查状态就发现不了断链**，而断链恰恰是最容易修的一类问题。

## 只读原则

第一版严格只读：

- 不修改文章 HTML
- 不新增链接
- 不删除链接
- 不生成锚文本
- 不做跳转
- 不自动发布
- 抓取失败不影响原站

系统的定位是**检测 + 可视化 + 报告**。任何改写动作都留给人工确认之后手动执行。

## 阶段划分

| 阶段 | 内容 |
| --- | --- |
| 第一版 | Blog 图谱、状态标记、断链清单、页面查看 |
| 第二阶段 | 全站图谱、历史对比、链接机会建议（仅建议，不自动实施） |
| 第三阶段 | 接入搜索表现数据做优先级排序 |

后续扩展方向明确：把范围从 Blog 扩到文档、产品页，把节点类型从单一变成多类型——**JSON 结构不需要推翻重做**，因为第一版已经预留了 `content_type` 字段。
