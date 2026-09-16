---
title: "引用友好段落规范"
description: "引用友好段落应当在脱离全文后仍能表达完整事实，包括主体、关系、证据、条件与边界。目标不是迎合 AI，而是减少答案被抽取后失去上下文。"
order: 9
updated: "2026-09-16"
---

> 引用友好段落的核心是：**即使这一段被单独抽取，读者仍然知道“谁、是什么、为什么、在什么条件下”。**

生成式搜索和检索系统经常不是读取整篇文章后再逐字引用，而是：

```text
Query
→
Retrieve relevant passage
→
Extract / summarize
→
Answer
```

因此，一个段落如果高度依赖前文：

```text
它
这个
上述情况
前者
后者
```

被单独抽取后就容易失去意义。

## 什么是引用友好

一个段落至少应该满足：

| 维度 | 要求 |
| --- | --- |
| Subject | 主体清楚 |
| Claim | 核心结论明确 |
| Evidence | 有必要支持 |
| Condition | 条件明确 |
| Boundary | 限制明确 |
| Context | 不依赖大量上文 |
| Length | 足够完整但不过度 |

核心不是段落越短越好，而是：

```text
独立可理解
```

## 弱段落

```text
It is much faster in this case, but the difference may not always matter.
```

脱离上下文后完全不知道：

```text
It 是什么
This case 是什么
Difference 是什么
```

## 更强段落

```text
A 240Hz display refreshes every 4.2ms, compared with about 6.9ms at 144Hz.
The 2.7ms difference can improve display-side responsiveness,
but it matters most when the system can sustain high frame rates.
```

单独抽取后仍然完整。

## 主语不要丢

推荐：

```text
OLED uses self-emissive pixels...
```

少用：

```text
It uses self-emissive pixels...
```

尤其是：

```text
H2 下第一段
```

最好直接重复核心实体一次。

这是减少实体指代歧义最简单的方法。

## 一个段落一个核心关系

低质量：

```text
OLED has fast response, deep blacks, can burn in, Mini-LED is brighter,
240Hz is smoother, and HDMI bandwidth also matters.
```

包含太多关系。

更好拆成：

| Passage | 核心关系 |
| --- | --- |
| 1 | OLED → black level |
| 2 | OLED → response time |
| 3 | OLED → burn-in risk |
| 4 | Mini-LED → brightness |

这样每个段落更容易被精确检索。

## 首句写结论

推荐段落结构：

```text
Sentence 1
Direct Claim

Sentence 2
Evidence / Mechanism

Sentence 3
Condition / Meaning

Sentence 4
Boundary
```

例如：

```text
Mini-LED is usually better suited to very bright rooms because it can
sustain higher full-screen brightness than many OLED implementations.
OLED still retains an advantage in pixel-level black control,
so the preferred technology depends on room brightness and viewing priorities.
```

## 不要依赖标题补语义

H2：

```text
## RAM
```

正文：

```text
16GB is enough for most users.
```

如果正文被单独抽取：

```text
16GB of what?
Enough for what?
```

更好：

```text
16GB RAM is enough for a basic home server running file sharing,
Plex and lightweight Docker containers.
```

正文自身就成立。

## 数字必须有单位和对象

错误：

```text
It dropped from 6.9 to 4.2.
```

更好：

```text
The refresh interval drops from about 6.9ms at 144Hz to 4.2ms at 240Hz.
```

数字应该绑定：

```text
Metric
+
Unit
+
Entity
```

## 比较要带基线

错误：

```text
It is 30% faster.
```

缺：

```text
Compared with what?
Under what test?
```

更好：

```text
In the same 4-bit local inference test, Model A generated tokens
about 30% faster than Model B.
```

比较关系才完整。

## 时间要明确

时间敏感内容避免：

```text
currently
recently
today
```

长期内容更稳妥：

```text
As of September 2026...
```

尤其：

- Price
- Version
- Availability
- Software
- AI Model

否则段落半年后被抽取会失去上下文。

## 来源不要悬空

弱：

```text
According to reports...
```

强：

```text
According to the manufacturer's September 2026 specification sheet...
```

或者：

```text
In our 4-bit local inference test...
```

来源身份明确，机器更容易判断 Provenance。

## 表述不要营销化

低价值：

```text
This revolutionary monitor delivers an unbelievable gaming experience.
```

无法提取事实。

更强：

```text
The monitor supports 4K at up to 240Hz through DisplayPort,
subject to GPU output and cable bandwidth.
```

可验证、可引用。

## Passage 长度

不存在固定最佳字数。

但可以内部控制：

| 类型 | 建议 |
| --- | --- |
| Definition | 1–3 句 |
| Direct Answer | 2–4 句 |
| Mechanism | 3–6 句 |
| Comparison | 3–6 句 |
| Warning | 2–4 句 |

核心判断：

```text
最小完整单元
```

而不是：

```text
越短越好
```

## 段落自包含测试

把一个段落单独复制出来，检查：

| 问题 | 必须能回答 |
| --- | --- |
| 谁 / 什么 | 是 |
| 在说什么 | 是 |
| 为什么 | 重要 Claim 要有 |
| 条件 | 必要时 |
| 边界 | 必要时 |
| 时间 | 时间敏感时 |

如果离开标题后完全看不懂，就需要重写。

## 引用友好不等于重复

不需要每段都重复完整产品名 5 次。

例如同一 H2 下可以：

```text
第一段明确实体
后续使用有限代词
```

但关键结论段应尽量减少歧义。

## QA 表

| 检查 | 合格 |
| --- | --- |
| Subject 明确 | 是 |
| 首句有 Claim | 是 |
| 数字有单位 | 是 |
| 比较有基线 | 是 |
| 时间明确 | 需要时 |
| 来源明确 | 需要时 |
| 条件完整 | 是 |
| 可独立理解 | 是 |
| 不依赖营销词 | 是 |

## 核心规范

```text
一段
→
一个核心关系
→
首句给 Claim
→
后面补证据和条件
→
脱离全文仍能成立
```

> **引用友好段落不是专门为 AI 写的“机器文案”，而是高质量技术写作本身：主体明确、关系明确、证据明确、边界明确。这样的段落无论被搜索引擎、AI 还是用户单独读取，都不容易失真。**
