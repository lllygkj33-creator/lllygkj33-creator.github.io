---
title: "表格与结构化答案规范"
description: "表格适合表达重复结构、对比、阈值、兼容性和决策关系。结构化答案的目标不是增加视觉复杂度，而是把机器和用户需要比较的信息放到统一维度中。"
order: 11
updated: "2026-09-16"
---

> 表格的核心不是“看起来专业”，而是：**当多个实体需要按照相同维度比较时，用统一结构降低理解成本。**

## 什么时候用表格

表格最适合：

| 场景 | 示例 |
| --- | --- |
| Comparison | OLED vs Mini-LED |
| Threshold | 8GB / 16GB / 32GB |
| Compatibility | Device × Protocol |
| Specification | CPU / RAM / Ports |
| Decision | Scenario → Choice |
| Status | Supported / Not Supported |
| Timeline | Algorithm History |

不适合：

```text
长段解释
复杂因果
连续叙事
```

这些更适合正文。

## 比较表

比较必须使用相同评价轴。

例如：

| Factor | OLED | Mini-LED |
| --- | --- | --- |
| Black Level | Pixel-level | Local dimming |
| Peak Brightness | Lower in many models | Often higher |
| Response | Very fast | Depends on LCD panel |
| Burn-in | Possible | No OLED burn-in |

这种表格有意义，因为：

```text
同一 Factor
同时比较 A 和 B
```

错误：

| OLED | Mini-LED |
| --- | --- |
| Great colors | High brightness |
| Gaming | Local dimming |

评价轴不一致，无法形成决策。

## 阈值表

数字很多时，优先用阈值表。

例如：

| RAM | Suitable For | Limitation |
| ---: | --- | --- |
| 8GB | File sharing | Limited multitasking |
| 16GB | Plex + Docker | Heavy VMs limited |
| 32GB | VMs / Databases | Higher cost |

这种结构比连续五段描述更容易扫描。

## 兼容性表

兼容性最好明确：

```text
Entity A
×
Entity B
→
Result
```

例如：

| Device | 4K60 | 4K120 | Notes |
| --- | --- | --- | --- |
| Device A | Yes | Yes | HDMI 2.1 |
| Device B | Yes | No | Bandwidth limit |

不要只写：

```text
Compatible
```

而不说明：

```text
兼容到什么模式
```

## 决策表

GEO 特别适合：

```text
Condition
→
Recommendation
```

例如：

| Scenario | Better Choice | Why |
| --- | --- | --- |
| Dark room | OLED | Better black level |
| Bright room | Mini-LED | Higher sustained brightness |
| Low burn-in tolerance | Mini-LED | No OLED pixel wear |
| Fast response priority | OLED | Faster pixel transition |

这种表格天然可用于回答：

```text
Which should I choose?
```

## 表格前先给结论

不要：

```text
H2
→
直接塞一个 30 行表格
```

最好先有一句：

```text
OLED is generally stronger for black level and response,
while Mini-LED is better suited to sustained brightness and lower burn-in concern.
```

然后表格展开。

结构：

```text
Conclusion
→
Table
→
Interpretation
```

## 表格后解释

表格不是结论本身。

至少补：

```text
What matters most
```

例如：

```text
The decision mainly depends on room brightness and burn-in tolerance;
the specification differences alone do not determine the better option.
```

这样避免用户只看数据却不知道怎么选。

## 列名必须具体

弱：

```text
Feature
Details
Notes
```

强：

```text
Refresh Rate
Frame Interval
Best Use Case
```

列名越具体，机器抽取越稳定。

## 单元格不要太长

表格适合：

```text
短事实
短结论
短条件
```

不适合每个 Cell 写 150 字。

如果一格需要复杂解释：

```text
表格写摘要
+
正文写原因
```

## Yes / No 表格

如果兼容性复杂，不要只有：

```text
Yes
No
```

可以增加：

```text
Conditional
```

例如：

| Feature | Support | Condition |
| --- | --- | --- |
| 4K120 | Yes | HDMI 2.1 |
| VRR | Conditional | Firmware dependent |
| HDR | Yes | Mode dependent |

这比二元表更真实。

## 数据必须带单位

错误：

| Model | Speed |
| --- | ---: |
| A | 38 |
| B | 24 |

更好：

| Model | Speed |
| --- | ---: |
| A | 38 tok/s |
| B | 24 tok/s |

任何数字都尽量绑定：

```text
Metric
+
Unit
```

## 时间敏感表格

价格、版本、库存、Benchmark 需要时间标记。

例如：

```text
Prices checked: September 2026
```

或者新增列：

| Product | Price | Checked |
| --- | ---: | --- |
| A | $499 | 2026-09 |

否则半年后表格容易失真。

## 来源

关键数据表应说明来源类型：

- Official Spec
- Benchmark
- First-party Test
- Public Dataset

不一定每格都放 URL，但整张表的数据来源要清楚。

## HTML 表格

技术实现建议使用真实：

```html
<table>
<thead>
<tbody>
<tr>
<th>
<td>
```

不要用大量：

```text
div + CSS
```

模拟表格。

语义 HTML 对：

```text
Accessibility
+
Machine Parsing
```

更友好。

## 移动端

表格必须考虑 Mobile。

常见方案：

- 横向滚动
- 精简列
- 首列固定
- 避免 10+ 列

不要为了 Desktop 信息密度让 Mobile 完全不可读。

## 表格和 Schema

表格不是 Structured Data。

```text
HTML Table
≠
Schema
```

它们可以同时存在：

```text
Table
给用户和解析器看

Schema
明确实体属性
```

不要混淆。

## 结构化答案类型

除了表格，还可以使用：

| 结构 | 适合 |
| --- | --- |
| Numbered Steps | How-to |
| Definition Block | What |
| Decision Matrix | Which |
| Checklist | QA |
| Timeline | History |
| Pros / Cons | Trade-off |
| Threshold Table | How Much |

结构应该跟 Query 类型匹配。

## 常见错误

| 错误 | 问题 |
| --- | --- |
| 任何内容都表格化 | 阅读困难 |
| 比较轴不一致 | 无法决策 |
| 单元格太长 | 失去扫描价值 |
| 数字无单位 | 歧义 |
| 无来源 | Trust 弱 |
| 表格不解释 | 用户不知道重点 |
| Mobile 溢出 | UX 差 |
| 用 div 模拟 table | 语义较弱 |

## QA 表

| 检查 | 合格 |
| --- | --- |
| 同一评价轴 | 是 |
| 列名明确 | 是 |
| 数据有单位 | 是 |
| 条件清楚 | 是 |
| 表前有结论 | 推荐 |
| 表后有解释 | 推荐 |
| 来源明确 | 关键数据 |
| Mobile 可读 | 是 |
| HTML 语义正确 | 是 |

## 核心规范

```text
重复结构
→
用表格

因果解释
→
用正文

决策问题
→
用矩阵

步骤问题
→
用编号列表
```

> **结构化答案真正的价值，是把同类事实放进同一个比较框架。表格不是装饰，而是让关系、阈值和差异变得更容易被用户和机器同时读取。**
