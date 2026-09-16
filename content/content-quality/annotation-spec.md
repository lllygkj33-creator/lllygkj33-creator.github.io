---
title: "批注规范"
description: "每条批注的固定字段、维度短标签、三档严重度，以及每篇示例文章固定要检查的 8 个位置。"
order: 1
updated: "2026-09-16"
---

> 批注不统一，页面就会越写越乱。所以每条批注都用**同一套字段**，每个维度用**同一个短标签**，每篇示例都检查**同样 8 个位置**。

## 一条批注写什么

七个字段，一个都不能少：

| 字段 | 说明 |
| --- | --- |
| 编号 | 页面内唯一，01 起 |
| 位置 | 第几段 / 哪个 H2 下 |
| 维度 | 用下面的短标签 |
| 严重度 | High / Medium / Low |
| 原句 | 被标注的那一句，原样引用 |
| 问题 | 一句话说清犯的是什么 |
| 原因 | 为什么扣分，指到维度里的具体规则 |
| 改法 | 怎么改才对，给可执行的写法 |

## 维度短标签

| 标签 | 维度 |
| --- | --- |
| `EXP` | Experience |
| `EXR` | Expertise |
| `AUT` | Authoritativeness |
| `TRU` | Trust |
| `HCU` | Helpful Content |
| `YMYL` | YMYL 风险与合规 |
| `IG` | Information Gain |
| `FUSE` | 触发熔断规则 |

## 三档严重度

- **High**：明显错误、高风险、误导性强——必须改，不改不能上线
- **Medium**：信息不足、证据不足、结构不佳——影响判断质量
- **Low**：表达优化、细节补强

## 页面上的写法

批注用 HTML 块写在正文里，样式由站点统一提供，不用自己写样式：

```html
<div class="q-note" data-dim="YMYL" data-level="high">
  <div class="q-head">
    <span class="q-no">批注 03</span>
    <span class="q-tag">YMYL</span>
    <span class="q-tag">High</span>
  </div>
  <p class="q-quote">you can copy it!</p>
  <dl>
    <div><dt>问题：</dt><dd>鼓励读者直接复制执行</dd></div>
    <div><dt>原因：</dt><dd>没有适用条件、没有风险提示、没有免责边界，属于风险建议句</dd></div>
    <div><dt>改法：</dt><dd>改成条件化表达：在 A 场景下可用；B 场景需要先确认 C，否则有 D 风险</dd></div>
  </dl>
</div>
```

渲染出来是这样：

<div class="q-note" data-dim="YMYL" data-level="high">
  <div class="q-head">
    <span class="q-no">批注 03</span>
    <span class="q-tag">YMYL</span>
    <span class="q-tag">High</span>
  </div>
  <p class="q-quote">you can copy it!</p>
  <dl>
    <div><dt>问题：</dt><dd>鼓励读者直接复制执行</dd></div>
    <div><dt>原因：</dt><dd>没有适用条件、没有风险提示、没有免责边界，属于风险建议句</dd></div>
    <div><dt>改法：</dt><dd>改成条件化表达：在 A 场景下可用；B 场景需要先确认 C，否则有 D 风险</dd></div>
  </dl>
</div>

熔断用另一套标记，突出"这是规则不是意见"：

```html
<div class="q-fuse"><strong>系统强制降级</strong>：说明触发了哪条规则、扣到几分。</div>
```

## 固定 8 个检查位

每篇示例都按同样顺序拆，这样不同文章之间才能横向比较：

| 顺序 | 位置 | 主要看什么 |
| --- | --- | --- |
| 1 | Title / H1 | 意图匹配、是否夸张 |
| 2 | Intro 前两段 | 是否直答问题 |
| 3 | 第一条核心主张 | 有没有证据 |
| 4 | 数据 / 示例段 | 是否可复现、有无口径 |
| 5 | 对比 / 推荐段 | 有没有讲边界与代价 |
| 6 | 风险建议句 | 是否触发 YMYL |
| 7 | Author / Reviewer | 是否支撑 E-E-A-T |
| 8 | 结论 / CTA | 是否过度承诺 |

## 关于截图和箭头

**不在截图上画箭头**——Markdown 没有定位能力，硬做只能用绝对定位的图片叠层，改一个字就错位。

替代做法（效果更稳，也更好维护）：

1. 示例段落**原文引用**在批注卡里（就是上面的 `q-quote`）
2. 需要看整段排版时，放**整张截图**，在正文里用 ①②③ 标段落编号
3. 批注卡编号与段落编号对应

静态、可搜索、可复制，也不会因为换个屏幕宽度就错位。
