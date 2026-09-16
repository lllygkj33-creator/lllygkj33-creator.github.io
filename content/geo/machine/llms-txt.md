---
title: "llms.txt"
description: "llms.txt 是面向 AI Agent 和 LLM 的站点导航文件。它不是 Sitemap、robots.txt 或排名开关，而是用简洁 Markdown 告诉机器站点是谁、哪些页面最重要、应该从哪里获取可信上下文。"
order: 1
updated: "2026-09-15"
---

> llms.txt 的核心不是“把网站内容复制给 AI”，而是：**给 Agent 一份低噪声的站点说明书，让它先理解站点，再按任务访问最相关、最权威、最容易解析的页面。**

`llms.txt` 目前仍属于开放提案，而不是搜索引擎强制标准。它不能保证页面被 ChatGPT、Google AI Overview 或其他模型引用，也不能替代 SEO 基础设施。

它真正解决的是：

```text
机器来到网站
↓
先理解这个站点是谁
↓
知道哪些内容最重要
↓
知道不同问题应该访问哪个页面
↓
按需读取更详细的 Markdown / HTML
```

## 它解决什么问题

普通网页主要为人设计。

页面里通常包含：

- Header
- Footer
- Navigation
- Cookie Banner
- JavaScript
- 推荐模块
- 广告
- 图片
- UI 控件
- 大量重复模板

对 Agent 来说，这些内容会增加解析和上下文成本。

`llms.txt` 提供的是一个更短的入口。

例如一个技术网站可能有：

```text
12,000 个 URL
```

但真正代表网站核心知识的页面可能只有：

```text
30–100 个
```

`llms.txt` 不需要重新列出 12,000 个 URL。

它应该告诉机器：

> **如果你想理解这个网站，优先看这几十个页面。**

## 它不是什么

先把几个最容易混淆的文件分开。

| 文件 | 主要作用 | 是否控制抓取 | 是否应该列全部页面 |
| --- | --- | --- | --- |
| `robots.txt` | 告诉爬虫哪些路径允许或禁止访问 | 是 | 否 |
| `sitemap.xml` | 帮助搜索引擎发现可索引 URL | 否 | 通常较完整 |
| `llms.txt` | 给 Agent 提供站点说明和精选知识入口 | 否 | 否 |
| `llms-full.txt` | 某些平台生成的完整文本集合 | 否 | 可能很大 |

最重要的区别：

```text
robots.txt
= Access

sitemap.xml
= Discovery

llms.txt
= Context + Routing
```

不要把 `llms.txt` 当作：

```text
AI 版 robots.txt
AI Sitemap
排名配置文件
```

## 文件放在哪里

最常见位置：

```text
https://www.xxxx.com/llms.txt
```

也可以放在子目录：

```text
https://www.xxxx.com/docs/llms.txt
```

子目录版本负责它所在路径下面的内容。

例如：

```text
/llms.txt
→ 整站

/docs/llms.txt
→ /docs/ 下的内容

/blogs/llms.txt
→ /blogs/ 下的内容
```

当多个文件都适用时，更具体的路径应该提供更具体的上下文。

例如：

```text
用户访问：
/docs/api/authentication/

可以先使用：
/docs/llms.txt

而不是只依赖：
/llms.txt
```

对于大型网站，这种分层非常有用。

## 标准结构

目前规范采用 Markdown。

推荐顺序是：

```text
# H1

> 简短站点说明

补充说明

## Section

- [Page](URL): Description
```

其中只有：

```text
H1
```

是严格必需项。

但实际部署时，建议至少包含：

| 部分 | 作用 |
| --- | --- |
| H1 | 站点 / 项目名称 |
| Blockquote | 一句话定义网站 |
| Info | 告诉 Agent 如何理解内容 |
| H2 Sections | 内容分组 |
| Link List | 精选资源 |

## 最小版本

一个最小可用文件可以写成：

```md
# Example Brand

> Example Brand publishes technical guides, product documentation, and buying resources for display hardware.

## Documentation

- [Monitor Technology Guide](https://www.xxxx.com/docs/monitor-technology.md): Core reference for display technologies.
- [Compatibility Guide](https://www.xxxx.com/docs/compatibility.md): Verified interface and device compatibility information.
```

这个文件已经完成三件事：

```text
我是谁
我主要做什么
最重要的内容在哪里
```

## H1 怎么写

H1 不应该写成关键词列表。

错误：

```md
# Monitor Gaming Display OLED 4K 240Hz Best Monitor
```

正确：

```md
# Example Display
```

或者：

```md
# Example Display Documentation
```

H1 的任务是识别实体。

不是做 SEO Title。

如果品牌和文档系统是两个独立实体，可以写：

```md
# Example Display Developer Documentation
```

重点是稳定、一致、唯一。

## Summary 怎么写

Blockquote 是 Agent 进入文件后最重要的上下文之一。

不要写：

```md
> Welcome to our website. We provide great products and useful information.
```

信息价值太低。

更好的版本：

```md
> Example Display designs gaming and productivity monitors. This file points agents to authoritative product specifications, compatibility documentation, technical explanations, and support resources.
```

它明确给出了：

```text
实体是谁
做什么
文件包含什么
哪些内容最权威
```

## Info 区域怎么写

H1 和 Summary 后，可以放少量不带标题的补充说明。

例如：

```md
Use product specification pages for current hardware facts.
Use Technology Hub pages for mechanism explanations.
Use Support pages for troubleshooting procedures.
Do not infer compatibility from marketing pages when a compatibility matrix is available.
```

这部分非常重要。

因为它相当于告诉 Agent：

> **不同类型的问题应该信哪个来源。**

例如一个显示器网站，可以明确：

| 用户问题 | 优先来源 |
| --- | --- |
| 产品尺寸 | Product Specification |
| HDMI 支持 | Compatibility Matrix |
| 为什么 240Hz 更流畅 | Technology Hub |
| 黑屏怎么修 | Support |
| A vs B 怎么选 | Comparison |

这比单纯给一串 URL 更有价值。

## Section 怎么设计

H2 应该是内容分类。

例如：

```md
## Product Specifications
## Technology Guides
## Compatibility
## Support
## Comparisons
## Buying Guides
```

不要设计成：

```md
## Important Links
## More Links
## Useful Pages
## Other
```

这种分类对机器没有语义帮助。

好的 Section 本身就是一个路由信号。

## 链接怎么写

规范里的每一项最好使用：

```md
- [名称](绝对URL): 一句话说明
```

例如：

```md
- [OLED Monitor Technology](https://www.xxxx.com/technology/oled-monitor.md): Explains pixel-level light control, response behavior, black levels, and implementation limits.
```

这一行实际上包含三个信息：

```text
Anchor
URL
Description
```

三者必须一致。

### 不好的写法

```md
- [Learn More](https://www.xxxx.com/page123)
```

问题：

```text
不知道目标实体
不知道页面主题
不知道什么时候应该访问
```

### 更好的写法

```md
- [OLED Burn-In Guide](https://www.xxxx.com/technology/oled-burn-in.md): Explains burn-in mechanisms, risk variables, mitigation, and usage boundaries.
```

机器不用访问页面，就已经能判断：

> 这个 URL 是否与当前问题相关。

## Anchor 怎么写

`llms.txt` 里的 Anchor 不应该追求关键词密度。

它更接近：

```text
页面名称
+
实体名称
+
任务名称
```

例如：

| 目标页 | 好的 Anchor |
| --- | --- |
| OLED 定义 | `OLED Display Technology` |
| 兼容矩阵 | `Monitor Compatibility Matrix` |
| 产品规格 | `X27Q Product Specifications` |
| 故障排查 | `No Signal Troubleshooting` |
| 对比 | `OLED vs Mini-LED` |

避免：

```text
Click Here
Read More
Best Guide
This Page
More Information
```

因为 Agent 需要从 Anchor 直接判断目标页的语义。

## Description 怎么写

链接后的说明不是 Meta Description。

它的任务是：

> **告诉 Agent 什么时候应该使用这个页面。**

例如：

```md
- [X27Q Specifications](https://www.xxxx.com/products/x27q.md): Current authoritative specifications for ports, dimensions, refresh rate, resolution, and supported display modes.
```

比：

```md
- [X27Q Specifications](https://www.xxxx.com/products/x27q.md): Learn everything about this amazing monitor.
```

更好。

推荐说明包含：

```text
页面类型
+
核心内容
+
适用问题
+
必要时声明权威级别
```

## 点对点示例：产品事实

假设 Agent 要回答：

```text
Does X27Q support 4K 120Hz over HDMI?
```

错误的 `llms.txt`：

```md
## Products

- [X27Q](https://www.xxxx.com/products/x27q)
- [HDMI Guide](https://www.xxxx.com/blog/hdmi)
```

Agent 仍然不知道：

```text
哪个页面是规格真源
```

更好的版本：

```md
## Product Specifications

- [X27Q Product Specifications](https://www.xxxx.com/products/x27q.md): Authoritative source for X27Q resolution, refresh rate, ports, HDMI modes, dimensions, and current hardware specifications.

## Compatibility

- [HDMI Compatibility Matrix](https://www.xxxx.com/docs/hdmi-compatibility.md): Verified display modes by HDMI version, device class, resolution, and refresh rate.
```

这时路由会更清楚：

```text
具体产品是否支持
→ X27Q Specifications

协议整体能力
→ HDMI Compatibility Matrix
```

## 点对点示例：机制问题

用户问：

```text
Why does OLED have deeper blacks?
```

不要让 Agent 优先进入：

```text
OLED 产品 Collection
```

应该提供：

```md
## Technology Guides

- [Why OLED Produces Deeper Blacks](https://www.xxxx.com/technology/oled-black-levels.md): Explains self-emissive pixels, pixel-level light control, perceived contrast, ambient-light effects, and implementation boundaries.
```

这里的路由非常明确：

```text
Why 问题
→ Mechanism Page
```

而不是：

```text
Why 问题
→ Product Page
```

## 点对点示例：故障问题

用户问：

```text
Why is my 240Hz monitor stuck at 144Hz?
```

正确路由：

```md
## Support

- [240Hz Monitor Running at 144Hz](https://www.xxxx.com/support/240hz-stuck-at-144hz.md): Diagnostic guide covering GPU output, cable bandwidth, display settings, port limits, operating-system settings, and verification steps.
```

Description 已经告诉 Agent：

```text
这是诊断页
有检查步骤
覆盖哪些主要原因
```

这比给一个泛化：

```text
Monitor Support
```

更准确。

## 点对点示例：比较问题

用户问：

```text
OLED or Mini-LED for bright-room gaming?
```

正确：

```md
## Comparisons

- [OLED vs Mini-LED for Bright-Room Gaming](https://www.xxxx.com/comparisons/oled-vs-mini-led-bright-room.md): Compares brightness, black level, reflections, motion performance, HDR behavior, and room-light trade-offs under the same use case.
```

这里最关键的是：

```text
同一场景
+
同一评价轴
```

说明 Agent 可以用它做决策回答。

## 点对点示例：购买问题

用户问：

```text
Is 240Hz worth paying more for?
```

正确：

```md
## Buying Guides

- [When Is 240Hz Worth Paying More For?](https://www.xxxx.com/buying-guides/240hz-value.md): Decision guide based on game type, sustained FPS, GPU capability, latency sensitivity, budget, and expected upgrade cycle.
```

这和技术解释页不同。

技术页回答：

```text
240Hz 为什么有作用
```

Buying Guide 回答：

```text
什么时候值得花钱
```

`llms.txt` 应该把这两个意图分开。

## 优先链接 Markdown

v2 规范建议页面提供机器更容易读取的 Markdown 版本。

例如原页面：

```text
https://www.xxxx.com/docs/oled/
```

可以同时提供：

```text
https://www.xxxx.com/docs/oled/index.md
```

或者：

```text
https://www.xxxx.com/docs/oled.md
```

`llms.txt` 里可以优先指向 Markdown：

```md
- [OLED Technology](https://www.xxxx.com/docs/oled.md): Technical explanation of OLED display behavior.
```

原因是 Markdown 通常没有：

```text
导航
脚本
广告
UI 噪声
```

更适合按需读取。

但不要为了 Markdown 创建一个和网页内容完全不同、长期不同步的版本。

最理想的状态是：

```text
HTML
和
Markdown
来自同一内容源
```

## alternate 与 describedby

v2 增加了标准 Link Relation 的建议。

一个 HTML 页面可以声明自己的 Markdown 版本：

```html
<link
  rel="alternate"
  type="text/markdown"
  href="/docs/oled.md">
```

同时告诉 Agent 哪个 `llms.txt` 描述当前页面：

```html
<link
  rel="describedby"
  href="/docs/llms.txt">
```

也可以通过 HTTP `Link` Header 提供。

例如：

```http
Link: </docs/oled.md>; rel="alternate"; type="text/markdown",
      </docs/llms.txt>; rel="describedby"
```

这解决的是：

> Agent 已经落到一个具体页面后，怎么找到机器友好版本和对应的上下文入口。

## 根文件与子目录文件

大型站点不要把所有东西都塞进根目录的一个文件。

可以设计成：

```text
/llms.txt
/docs/llms.txt
/support/llms.txt
/blogs/llms.txt
```

根文件只负责最高层路由。

例如：

```md
# Example Display

> Example Display publishes monitor products, technical documentation, support resources, and research.

## Core Resources

- [Product Documentation](https://www.xxxx.com/docs/llms.txt): Product specifications and compatibility documentation.
- [Support Knowledge Base](https://www.xxxx.com/support/llms.txt): Diagnostics, setup, maintenance, and troubleshooting.
- [Editorial Knowledge](https://www.xxxx.com/blogs/llms.txt): Technology explanations, comparisons, and buying guides.
```

然后：

```text
/docs/llms.txt
```

再细分规格和兼容性。

这样比一个几千行的根文件更符合“按需读取”。

## Optional 怎么用

规范允许：

```md
## Optional
```

作为次要资源分组。

例如：

```md
## Optional

- [Brand History](https://www.xxxx.com/about/history.md): Historical background about the company.
- [Press Archive](https://www.xxxx.com/press/archive.md): Older press releases and announcements.
```

这里适合放：

```text
历史资料
补充案例
非核心背景
旧版本参考
```

不要把：

```text
关键规格
兼容信息
核心 API
```

塞进 Optional。

另外需要注意：

> `Optional` 在当前 v2 里更接近一种约定，不应该理解成具有特殊强制机器语义。

## llms-full.txt 怎么看

现在一些文档平台会额外生成：

```text
/llms-full.txt
```

它通常把大量甚至全部文档拼成一个完整文本。

但：

> **`llms-full.txt` 不是当前 llms.txt 核心规范的必需文件。**

可以这样理解：

```text
llms.txt
= Index / Router

llms-full.txt
= Large Context Bundle
```

对于大型站点，更推荐：

```text
小而清晰的 llms.txt
+
按需访问 Markdown 页面
```

而不是默认让 Agent 每次读取一个超大的 `llms-full.txt`。

## URL 应该选哪个版本

如果一个内容存在多个 URL：

```text
/products/x27q
/products/x27q?variant=1
/products/x27q?utm_source=email
```

`llms.txt` 应该只提供稳定主版本。

推荐：

```text
Canonical URL
```

不要列：

```text
参数 URL
追踪 URL
分页重复 URL
测试 URL
预览 URL
```

否则会制造实体和页面歧义。

## 不要把 Sitemap 复制进来

错误：

```md
## All Pages

- Page 1
- Page 2
- Page 3
...
- Page 3284
```

这失去了 `llms.txt` 的意义。

`llms.txt` 更适合：

```text
Curated
```

而不是：

```text
Exhaustive
```

一个简单选择标准：

| 页面 | 是否优先放 |
| --- | --- |
| 核心产品规格 | 是 |
| 官方兼容矩阵 | 是 |
| 重要技术解释 | 是 |
| 核心 Support | 是 |
| 高价值 Comparison | 是 |
| 标签页 | 否 |
| 分页页 | 否 |
| 重复专题 | 否 |
| 低价值新闻归档 | 通常否 |

## 一个完整示例

下面是一份更接近真实品牌站的结构。

```md
# Example Display

> Example Display designs gaming and productivity monitors. This file routes agents to authoritative specifications, compatibility documentation, technical explanations, support procedures, comparisons, and buying guidance.

Use Product Specifications for current product facts.
Use Compatibility resources for verified device and interface support.
Use Technology Guides for mechanism explanations.
Use Support for diagnostics and configuration procedures.
Use Comparisons and Buying Guides for conditional purchase decisions.

## Product Specifications

- [X27Q Product Specifications](https://www.xxxx.com/products/x27q.md): Authoritative specifications for resolution, refresh rate, ports, dimensions, supported modes, and current hardware configuration.
- [M32U Product Specifications](https://www.xxxx.com/products/m32u.md): Authoritative specifications for the M32U product family.

## Compatibility

- [HDMI Compatibility Matrix](https://www.xxxx.com/docs/hdmi-compatibility.md): Verified resolution and refresh-rate combinations by HDMI version and device type.
- [Console Compatibility](https://www.xxxx.com/docs/console-compatibility.md): Verified PlayStation and Xbox display-mode support.

## Technology Guides

- [Why OLED Produces Deeper Blacks](https://www.xxxx.com/technology/oled-black-levels.md): Explains self-emissive pixels, black-level control, contrast, ambient-light effects, and limitations.
- [How Refresh Rate Affects Frame Timing](https://www.xxxx.com/technology/refresh-rate-frame-time.md): Explains 60Hz, 144Hz, and 240Hz frame intervals and their practical latency effects.

## Support

- [240Hz Monitor Running at 144Hz](https://www.xxxx.com/support/240hz-stuck-at-144hz.md): Diagnostic guide for GPU output, cables, ports, display settings, and operating-system limits.
- [No Signal Troubleshooting](https://www.xxxx.com/support/no-signal.md): Step-by-step fault isolation for source, cable, port, monitor, and handshake failures.

## Comparisons

- [OLED vs Mini-LED for Gaming](https://www.xxxx.com/comparisons/oled-vs-mini-led-gaming.md): Same-axis comparison of motion, HDR, black level, brightness, longevity, and use-case trade-offs.

## Buying Guides

- [When Is 240Hz Worth Paying More For?](https://www.xxxx.com/buying-guides/240hz-value.md): Purchase framework based on game type, sustained FPS, GPU capability, budget, and latency sensitivity.

## Optional

- [Company Background](https://www.xxxx.com/about.md): Company history and general brand information.
```

这份文件没有试图“覆盖所有页面”。

它只建立：

```text
实体
栏目
权威来源
任务路由
```

## 内容站怎么设计

如果网站主要做 Editorial 内容，可以按用户任务分组。

例如：

```md
## Technology
## Support
## Product Comparisons
## Buying Guides
## Workspace
```

这和 GEO 标题决策树可以直接对应。

例如：

```text
Why / Mechanism
→ Technology

Fix / Diagnose
→ Support

A vs B
→ Comparisons

Should I Buy
→ Buying Guides

How to Build a Setup
→ Workspace
```

这样 `llms.txt` 不只是目录。

它实际上变成：

> **网站内容架构的机器可读版本。**

## 电商站怎么设计

Shopify 一类电商站更适合：

```md
## Collections
## Product Specifications
## Compatibility
## Buying Guides
## Support
## Policies
```

Collection 不需要全部列。

优先选择核心品类：

```md
## Collections

- [Gaming Monitors](https://www.xxxx.com/collections/gaming-monitors): Primary collection for gaming-focused displays.
- [OLED Monitors](https://www.xxxx.com/collections/oled-monitors): OLED monitor category and current product range.
```

Product 则优先：

```text
旗舰
长期销售
搜索需求高
规格复杂
经常被 Agent 查询
```

的型号。

## 更新规范

`llms.txt` 不应该创建后就不再维护。

建议在这些情况更新：

| 变化 | 是否更新 |
| --- | --- |
| 新核心产品上线 | 是 |
| 旧产品下线 | 是 |
| 重要 URL 改变 | 是 |
| 内容栏目重构 | 是 |
| 新 Compatibility Matrix | 是 |
| 普通 Blog 新增 | 不一定 |
| 改几个错字 | 不需要 |
| 权威来源发生变化 | 是 |

尤其注意：

```text
删除页面
301 页面
Canonical 改变
```

需要同步更新文件。

不要让 Agent 被导向：

```text
404
旧规格
过期文档
```

## 实操 QA

发布前可以使用下面的检查表。

| 检查 | 合格标准 |
| --- | --- |
| 路径 | `/llms.txt` 可直接访问 |
| Content-Type | 能正常返回文本内容 |
| H1 | 只有明确项目 / 站点名 |
| Summary | 一句话解释站点和用途 |
| Sections | 按任务或内容类型分类 |
| Anchors | 能直接识别目标内容 |
| Descriptions | 告诉 Agent 何时使用 |
| URLs | 使用稳定主 URL |
| Markdown | 关键页面优先提供机器友好版本 |
| Duplicates | 不重复列参数页和同义页 |
| Freshness | 没有过期产品和旧 URL |
| Scope | 没有复制整个 Sitemap |
| Security | 没有内部、私有或敏感信息 |

## Agent 测试

真正部署以后，不要只验证文件能打开。

应该拿它做任务测试。

例如只给 Agent：

```text
https://www.xxxx.com/llms.txt
```

然后问：

```text
Which source should you use to verify whether X27Q supports 4K 120Hz?
```

正确结果应该是：

```text
X27Q Product Specifications
或
HDMI Compatibility Matrix
```

再问：

```text
Why does OLED have deeper blacks?
```

应该路由到：

```text
Technology Guide
```

再问：

```text
My monitor is stuck at 144Hz. Where should you look?
```

应该路由到：

```text
Support
```

这种测试比：

```text
文件是否通过语法检查
```

更重要。

因为 `llms.txt` 的真正任务是：

> **Routing Accuracy。**

## Routing Accuracy

内部可以定义一个简单指标：

```text
Routing Accuracy
=
正确选择目标资源的测试问题数
÷
全部测试问题数
```

例如准备 20 个真实用户问题：

```text
18 个成功路由
2 个选错页面
```

则：

```text
18 / 20 = 90%
```

它不是官方标准，但非常适合作为 QA。

错误案例可以反向帮助修改：

```text
Section 名称
Anchor
Description
页面分组
```

## 最常见错误

| 错误 | 为什么有问题 |
| --- | --- |
| 把 Sitemap 全复制进去 | 信息噪声过高 |
| 没有 Description | Agent 难判断何时使用 |
| 全部链接 HTML UI 页面 | 解析成本更高 |
| Product、Support、Blog 混在一起 | 任务边界不清 |
| 写成关键词列表 | 没有关系和路由 |
| 放付费广告文案 | 降低可信度 |
| 列出过期页面 | 导致错误回答 |
| 把它当排名开关 | 对能力预期错误 |
| 放私有信息 | 文件公开可访问 |
| 创建后不更新 | 知识入口逐渐失真 |

## 最终规范

一个高质量 `llms.txt` 应该做到：

```text
小
清楚
稳定
精选
可验证
可路由
```

它应该回答：

| 问题 | 文件必须给出的答案 |
| --- | --- |
| 你是谁 | H1 + Summary |
| 你提供什么 | Info |
| 哪些知识最重要 | H2 Sections |
| 我该读哪个页面 | Link + Description |
| 哪个页面最权威 | Routing Rules |
| 哪里有干净正文 | Markdown URL |
| 内容是否还有效 | 持续更新 |

> **llms.txt 最好的形态不是“AI Sitemap”，而是一张面向 Agent 的知识路由表。它不负责把所有 URL 塞给模型，而是告诉模型：面对不同用户问题，应该从哪一个最稳定、最权威、最容易解析的页面开始。**
