---
title: "图片 SEO"
description: "图片 SEO 的目标是让搜索引擎理解图片是什么、它与页面主题有什么关系，并保证图片可抓取、加载高效、文件命名和 Alt 清晰，同时避免装饰性图片制造噪声。"
order: 5
updated: "2026-09-16"
---

> 图片 SEO 的核心不是“每张图都塞关键词”，而是：**让搜索引擎和用户都能快速理解图片内容、用途和它与当前页面的关系。**

## 图片 SEO 看什么

| 维度 | 核心问题 |
| --- | --- |
| Relevance | 图片是否和页面主题相关 |
| Alt | 图片内容能否被文本描述 |
| Filename | 文件名是否有语义 |
| Context | 图片周围文字是否解释它 |
| Crawlability | Google 能否访问图片 |
| Performance | 图片是否拖慢页面 |
| Originality | 是否有第一手视觉价值 |
| Structure | 是否有 Caption / Schema |

## Alt 怎么写

Alt 的第一任务是：

```text
描述图片
```

而不是：

```text
塞关键词
```

错误：

```text
best gaming monitor best oled monitor 240hz monitor
```

更好：

```text
27-inch OLED gaming monitor showing a 240Hz refresh-rate setting
```

Alt 应回答：

```text
图里是什么
+
必要时它在做什么
```

## 什么图需要 Alt

| 图片类型 | Alt |
| --- | --- |
| 产品图 | 需要 |
| 测试截图 | 需要 |
| 图表 | 需要 |
| 操作步骤 | 需要 |
| 信息图 | 需要 |
| 纯装饰背景 | 可空 |
| 分割线图标 | 可空 |
| 重复 Logo | 视场景 |

纯装饰图可以：

```html
alt=""
```

避免屏幕阅读器重复朗读。

## Alt 不要重复 Caption

如果 Caption 已经写：

```text
RTX 5090 running a local 70B model at 38 tokens/s.
```

Alt 可以更客观描述：

```text
RTX 5090 benchmark screen showing local 70B model inference
```

两者功能不同：

| 元素 | 作用 |
| --- | --- |
| Alt | 描述图像 |
| Caption | 解释意义 |
| 正文 | 解释上下文 |

## 文件名

推荐：

```text
oled-monitor-240hz-settings.webp
```

避免：

```text
IMG_7832.jpg
image-final-final2.png
12345.webp
```

命名规则：

```text
小写
+
短横线
+
描述性
+
不要堆词
```

## 图片格式

| 格式 | 适合 |
| --- | --- |
| WebP | 通用网页图片 |
| AVIF | 更高压缩率 |
| JPEG | 照片 |
| PNG | 透明 / UI 截图 |
| SVG | Logo / 图标 / 简单图形 |

不要为了 SEO 强行统一格式，优先：

```text
质量
+
加载速度
+
浏览器兼容
```

## 尺寸与性能

过大的图片会影响：

```text
LCP
页面加载
移动端体验
```

建议：

| 场景 | 原则 |
| --- | --- |
| Hero | 尺寸足够但压缩 |
| 正文图 | 不上传超大原图 |
| Thumbnail | 单独生成 |
| Retina | 适度提高分辨率 |
| Mobile | 使用响应式图片 |

推荐使用：

```html
srcset
sizes
width
height
loading="lazy"
```

但首屏 Hero 不应机械 Lazy Load。

## Context 很重要

图片周围的正文应该说明：

```text
这是什么
为什么重要
它证明什么
```

例如一张 Benchmark 图，如果正文没有解释：

```text
测试条件
结果
结论
```

图片本身的信息价值有限。

推荐结构：

```text
正文解释
↓
图片
↓
Caption
```

## Caption 怎么写

Caption 最适合补：

- 时间
- 测试条件
- 数据来源
- 对比结论
- 场景

例如：

```text
RTX 5090 local inference test at 4-bit quantization,
measured on September 2026.
```

比：

```text
RTX 5090 benchmark
```

更有信息价值。

## 原创图片

原创图片通常更有价值，尤其是：

| 类型 | GEO / SEO 价值 |
| --- | --- |
| 实测截图 | 高 |
| 原创图表 | 高 |
| 产品实拍 | 高 |
| 故障截图 | 高 |
| 架构图 | 高 |
| 普通图库图 | 低 |
| 无关装饰图 | 低 |

原创不是为了“Google 喜欢原创图片”这种简单结论，而是因为它能提供：

```text
第一手 Experience
+
可验证证据
+
信息增益
```

## 图片和实体

图片应该和正文实体一致。

例如正文写：

```text
RTX 5090
```

图片却是：

```text
RTX 4090
```

会制造语义冲突。

多模态内容最好保持：

| 模态 | 事实 |
| --- | --- |
| 正文 | RTX 5090 |
| Alt | RTX 5090 |
| Caption | RTX 5090 |
| 文件名 | rtx-5090 |
| Product Schema | RTX 5090 |

## 图片 Sitemap

大型图片站、图库、电商站可以使用 Image Sitemap 或在现有 Sitemap 中提供图片信息。

更重要的是：

```text
图片 URL 可抓取
```

如果图片被：

```text
robots.txt
CDN 权限
Hotlink 防护
```

阻止，Google Image Search 可能无法正常访问。

## CDN 与 URL

推荐：

```text
稳定图片 URL
```

避免频繁更换 CDN 路径。

如果迁移图片 CDN，要注意：

- 301
- 页面引用更新
- 缓存
- Sitemap
- Canonical 页面不受影响

## Lazy Load

Lazy Load 可以提升性能，但不能让图片在 Google 无法执行的交互后才出现。

高风险：

```text
必须点击按钮
→ 才请求图片
```

更稳妥：

```text
图片 URL 在 HTML / 可渲染 DOM 中可发现
```

## 电商图片

| 图片 | 重点 |
| --- | --- |
| 主图 | 产品清楚 |
| 细节图 | 接口 / 材质 / 尺寸 |
| 场景图 | 使用场景 |
| 尺寸图 | 准确标注 |
| 对比图 | 同一尺度 |
| Variant | 对应正确 SKU |

不要让 Alt 全部一样：

```text
gaming monitor
gaming monitor
gaming monitor
```

可以分别写：

```text
front view
rear ports
stand adjustment
side profile
```

## Blog 图片

Blog 图片的目标不是：

```text
每 300 字插一张
```

而是：

```text
在用户需要视觉理解的地方插图
```

例如：

- 架构
- 参数差异
- 操作步骤
- 测试结果
- 时间线
- 实际产品

无信息价值的 Stock Photo 不需要为了“SEO”硬加。

## 图片 QA

| 检查 | 合格标准 |
| --- | --- |
| Alt | 准确描述 |
| Filename | 有语义 |
| File Size | 已压缩 |
| Format | 合理 |
| Width / Height | 明确 |
| Lazy Load | 非首屏图适用 |
| Context | 有解释 |
| Caption | 必要时添加 |
| Crawlability | 可访问 |
| Originality | 高价值页优先原创 |
| Entity Match | 与正文一致 |

## 常见错误

| 错误 | 问题 |
| --- | --- |
| Alt 堆关键词 | Spam / 可读性差 |
| 所有图同 Alt | 无法区分 |
| Hero Lazy Load | 可能影响 LCP |
| 上传 10MB 原图 | 性能差 |
| Stock 图过多 | 信息增益低 |
| Caption 和正文冲突 | 语义不一致 |
| 图片 URL 被 robots 阻止 | 无法抓取 |
| 文件名全是 IMG123 | 语义弱 |

## 核心规范

```text
图片必须有用途
→ 描述必须准确
→ 图文事实一致
→ 图片必须可抓取
→ 文件大小合理
```

> **图片 SEO 的目标不是让图片“带关键词”，而是让图片成为页面知识的一部分。高质量图片应该能证明事实、解释结构、展示过程或提供第一手证据，而不是只承担装饰作用。**
