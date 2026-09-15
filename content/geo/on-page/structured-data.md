---
title: 结构化数据
description: 把页面类型和字段显式告诉机器，而不是让它自己猜
order: 3
updated: 2026-09-15
---

> 结构化数据（Schema）用一段 JSON-LD 说明"这是什么类型的页面、作者是谁、什么时候更新"。它不保证被引用，但它是少数被搜索引擎正式支持的机器可读格式。

## 它解决什么

页面上的信息对人是清楚的，对机器是模糊的：哪句是标题、哪个是作者、更新日期是哪个。Schema 把这些字段显式写出来。

三个直接收益：

1. **搜索结果里的增强展示**：评分、FAQ、面包屑
2. **AI 取段落时更容易判断可信度**：作者、发布方、日期都在结构化字段里
3. **减少误读**：避免 AI 把你的"相关阅读"当成正文

## 最小可用写法

文章页放这三个就够：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "信息密度",
  "description": "让每一段都能被单独摘走",
  "datePublished": "2026-09-15",
  "dateModified": "2026-09-15",
  "author": {
    "@type": "Person",
    "name": "你的名字",
    "url": "https://example.com/about-me/"
  }
}
</script>
```

FAQ 页用 `FAQPage`：

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "llms.txt 有用吗？",
    "acceptedAnswer": { "@type": "Answer", "text": "当作便宜的保险可以，不是引用增长的杠杆。" }
  }]
}
```

## 三条不能错的规则

1. **标注必须和页面内容一致**。标了 `FAQPage` 但页面上没有问答，属于违规，会被忽略
2. **一个页面一个主类型**。文章页就是 `Article`，别叠加 `Product`
3. **日期要真的更新**。`dateModified` 常年在过去的页面，时效信号反而吃亏

## 怎么验证

用官方的验证器检查语法，再看能不能被解析出预期字段。**语法通过 ≠ 生效**，最终以搜索结果里的实际展示为准。

## Next steps

- [作者与实体](/geo/on-page/author-and-entity/)：`author` 字段要和作者页对得上
- [信息密度](/geo/on-page/information-density/)：结构化数据描述的内容，本身要有东西

## 参考

- llms.txt 与结构化数据在 2026 年的实际效果对比：[GEOly 证据汇总](https://www.geoly.ai/blog/does-llms-txt-work)
