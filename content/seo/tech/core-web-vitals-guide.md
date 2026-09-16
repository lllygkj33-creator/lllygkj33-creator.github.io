---
title: "Core Web Vitals 详解"
description: "Core Web Vitals 用 LCP、INP 和 CLS 衡量真实用户的加载性能、交互响应与视觉稳定性。优化重点应基于真实用户数据的第 75 百分位，而不是只追求实验室满分。"
order: 31
updated: "2026-09-16"
---

> Core Web Vitals 的核心不是“PageSpeed 跑到 100 分”，而是：**真实用户能否快速看到主要内容、快速获得交互反馈，并且页面在使用过程中保持稳定。**

当前三项核心指标是：

| 指标 | 测量什么 | Good |
| --- | --- | ---: |
| LCP | 主要内容加载 | ≤ 2.5s |
| INP | 交互响应 | ≤ 200ms |
| CLS | 视觉稳定 | ≤ 0.1 |

评估通常看：

```text
真实用户数据
+
第 75 百分位
+
Mobile / Desktop 分开
```

## LCP

LCP：

```text
Largest Contentful Paint
```

衡量视口内最大主要内容元素何时完成显示。

常见 LCP 元素：

- Hero Image
- 主标题
- 大型 Banner
- 产品主图
- 大文本块

阈值：

| 状态 | LCP |
| --- | ---: |
| Good | ≤ 2.5s |
| Needs Improvement | 2.5–4.0s |
| Poor | > 4.0s |

## LCP 为什么慢

常见原因：

| 原因 | 影响 |
| --- | --- |
| TTFB 高 | HTML 到达慢 |
| Hero 图片过大 | 下载慢 |
| CSS 阻塞 | 页面无法绘制 |
| JS 阻塞 | 主线程延迟 |
| 图片发现太晚 | 请求启动晚 |
| CDN 距离远 | 网络慢 |
| Client Rendering | 主内容需要等 JS |

LCP 优化不是只压缩图片。

可以拆成：

```text
TTFB
+
Resource Load Delay
+
Resource Load Duration
+
Element Render Delay
```

## LCP 实操

优先：

| 动作 | 作用 |
| --- | --- |
| SSR / SSG | 更早输出主内容 |
| CDN | 降低网络延迟 |
| 优化 Hero | 减小资源 |
| preload | 提前发现关键资源 |
| fetchpriority=high | 提高主图优先级 |
| 减少阻塞 CSS | 更早绘制 |
| 延迟非关键 JS | 释放主线程 |

首屏 LCP 图片不要机械使用：

```html
loading="lazy"
```

否则可能反而变慢。

## INP

INP：

```text
Interaction to Next Paint
```

衡量用户点击、键盘输入或触摸后，页面多久能显示下一次视觉反馈。

阈值：

| 状态 | INP |
| --- | ---: |
| Good | ≤ 200ms |
| Needs Improvement | 200–500ms |
| Poor | > 500ms |

INP 重点不是页面第一次能点，而是整个访问过程中交互的响应质量。

## INP 为什么慢

常见：

- Long Tasks
- 大型 JavaScript Bundle
- React Hydration 过重
- 第三方 Script
- Analytics
- Chat Widget
- 大型 DOM
- 同步计算
- Event Handler 太复杂

本质：

```text
主线程太忙
```

用户点击后浏览器无法及时：

```text
处理输入
→
更新 DOM
→
Paint
```

## INP 实操

| 方法 | 作用 |
| --- | --- |
| 拆分 Long Task | 降低阻塞 |
| Code Splitting | 减少首屏 JS |
| 延迟第三方脚本 | 减少竞争 |
| Web Worker | 移出重计算 |
| 减少 Hydration | 主线程更轻 |
| 优化 Event Handler | 快速反馈 |
| 减少 DOM | 降低渲染成本 |

用户点击按钮后，即使后台工作还没结束，也可以先给：

```text
Loading
Pressed State
Skeleton
```

即时视觉反馈。

## CLS

CLS：

```text
Cumulative Layout Shift
```

衡量页面内容是否发生意外移动。

阈值：

| 状态 | CLS |
| --- | ---: |
| Good | ≤ 0.1 |
| Needs Improvement | 0.1–0.25 |
| Poor | > 0.25 |

典型问题：

```text
用户准备点按钮
→
广告突然插入
→
按钮移动
→
点错
```

## CLS 原因

| 原因 | 示例 |
| --- | --- |
| 图片无尺寸 | 图片加载后撑开页面 |
| Ads 无占位 | 广告加载后插入 |
| Font Swap | 字体变化造成位移 |
| 动态 Banner | 顶部突然出现 |
| Cookie Bar | 推动正文 |
| Embed | iframe 高度晚确定 |

## CLS 实操

图片明确：

```html
width="1200"
height="675"
```

或者使用 CSS：

```css
aspect-ratio: 16 / 9;
```

广告和动态组件提前预留空间。

不要在已加载内容上方突然插入大型模块。

## Field 与 Lab

必须区分：

| 数据 | 来源 | 用途 |
| --- | --- | --- |
| Field Data | 真实 Chrome 用户 | 判断真实 CWV |
| Lab Data | 模拟环境 | 调试问题 |

常见 Field 来源：

- Chrome UX Report
- PageSpeed Insights Field Data
- Search Console CWV

常见 Lab：

- Lighthouse
- DevTools
- WebPageTest

所以：

```text
Lighthouse 100
```

不代表：

```text
真实用户一定 Good
```

反过来也一样。

## 75 百分位

Google / web.dev 推荐用：

```text
75th percentile
```

判断大多数用户体验。

例如 100 次访问：

```text
75% 用户 LCP ≤ 2.4s
```

可以达到 Good。

如果平均值很好，但尾部用户很慢：

```text
Average = 1.8s
P75 = 3.1s
```

仍然说明大量用户体验不好。

## Mobile 和 Desktop

两端要分开。

常见：

```text
Desktop Good
Mobile Poor
```

原因可能是：

- 移动网络
- CPU 更弱
- 图片尺寸错误
- JS 更重
- 响应式布局复杂

不要拿 Desktop 数据代表全站。

## URL Group

Search Console CWV 报告常按相似 URL 分组。

如果：

```text
同一个模板
```

出现 CWV 问题，通常应该先修：

```text
Template
```

而不是逐页修。

例如整个 Product Template LCP 差：

```text
优化一次模板
→
影响数千产品页
```

## SEO 影响怎么理解

Core Web Vitals 是页面体验信号的一部分，但不要把它理解成：

```text
LCP 从 2.6s 到 2.4s
=
排名一定上涨
```

更合理的理解：

```text
内容和相关性仍然是基础
+
良好页面体验降低竞争劣势
```

CWV 更应该被视为：

```text
SEO
+
UX
+
Conversion
```

共同指标。

## 电商常见问题

| 模块 | 风险 |
| --- | --- |
| Hero Slider | LCP |
| Review Widget | INP |
| Chat | INP |
| Recommendation | CLS |
| Variant Selector | INP |
| Cookie Banner | CLS |
| 大产品图 | LCP |

不要为了一个第三方营销插件牺牲整个模板性能。

## 内容站常见问题

| 模块 | 风险 |
| --- | --- |
| Banner 图 | LCP |
| Ads | CLS |
| Embed Video | CLS / LCP |
| Table Script | INP |
| TOC Script | INP |
| Font | CLS |
| Analytics | INP |

## 检测顺序

推荐：

```text
Search Console
→
PageSpeed Field Data
→
Lab
→
DevTools Performance
→
代码定位
```

先确定真实问题，再进入技术调试。

## QA 表

| 项目 | 标准 |
| --- | --- |
| LCP P75 | ≤ 2.5s |
| INP P75 | ≤ 200ms |
| CLS P75 | ≤ 0.1 |
| Mobile | 单独检查 |
| Desktop | 单独检查 |
| Hero Lazy Load | 不使用 |
| Image Dimensions | 有 |
| Long Tasks | 控制 |
| Third-party JS | 审计 |
| Template Level | 优先优化 |

## 常见误区

| 误区 | 问题 |
| --- | --- |
| PageSpeed 100 = SEO 满分 | 不成立 |
| 只看 Lab | 忽略真实用户 |
| 只优化首页 | 模板页可能更差 |
| 图片都 Lazy Load | 首屏可能变慢 |
| JS 越少越好 | 重点是阻塞成本 |
| CWV 是唯一排名因素 | 错误 |
| 平均值好就够 | 应看 P75 |

## 核心规范

```text
先看真实用户数据
→
定位 LCP / INP / CLS
→
按模板修复
→
移动端优先检查
→
Lab 用来诊断
→
Field 用来验证
```

> **Core Web Vitals 真正测的是用户体验，而不是开发者跑分。优化的终点不是 Lighthouse 100，而是绝大多数真实用户都能快速看到内容、快速得到响应，并且页面不会突然乱跳。**
