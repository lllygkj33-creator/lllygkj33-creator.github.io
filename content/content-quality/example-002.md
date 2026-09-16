---
title: "拆解示范 002"
description: "对一篇视频创作工具的资源页做全维度拆解：演示同一套模型换行业之后，YMYL 红线如何从版权问题换成肖像权与 AI 披露问题。"
order: 3
updated: "2026-09-16"
---

> 这是一页**示范**：样本是一篇视频创作工具的资源页（AI 虚拟人广告 vs 产品实拍广告），按本地这套模型拆解。重点演示一件事——**换行业时，七个维度和权重不动，变的是 YMYL 的红线内容**。

它和拆解示范 001正好互为镜像：001 是"有数据、但踩了合规红线"，002 是"没踩红线、但通篇没有证据"。

## 样本与行业适配

样本类型：视频创作 / AI 素材工具的营销资源页，主题是"AI 虚拟人广告和产品实拍广告该选哪种"。

硬件行业（原系统的默认场景）的 YMYL 红线是版权与数据安全：私有 Tracker、DRM 规避、端口暴露。**这些词在这篇里一个都不会出现**，但风险并没有消失，只是换了形态：

| 原系统红线（硬件） | 适配后的红线（视频 / AI 工具） |
| --- | --- |
| 盗版获取途径 | **真人肖像授权**：用真人形象生成虚拟代言人，授权链是否完整 |
| DRM 规避工具 | **AI 生成内容标注**：各平台与法域对 AI 素材的披露要求 |
| 破坏性系统指令 | **素材与音乐商用授权**：导出用于广告投放的授权范围 |
| 无来源性能数据 | **效果承诺**：宣称提升转化或曝光却无口径 |

判定逻辑不变：**只要可能让人损失钱、触犯法规或毁掉信誉，就进 YMYL**。所以 001 的"私有 Tracker + 无免责声明"和 002 的"虚拟代言 + 无授权说明"是同一类问题。

## 分档卡

<div class="q-overview">
  <div class="q-card">
    <span class="q-label">内容质量总分</span>
    <span class="q-score q-low">6.53</span>
    <span class="q-note-line">加权 · 红档</span>
  </div>
  <div class="q-card">
    <span class="q-label">E-E-A-T</span>
    <span class="q-score q-low">6.0</span>
    <span class="q-note-line">四项均值</span>
  </div>
  <div class="q-card">
    <span class="q-label">HCU</span>
    <span class="q-score q-medium">7.5</span>
    <span class="q-note-line">橙档</span>
  </div>
  <div class="q-card">
    <span class="q-label">信息增益</span>
    <span class="q-score q-low">6.0</span>
    <span class="q-note-line">无任何数据与来源</span>
  </div>
  <div class="q-card">
    <span class="q-label">YMYL 风险</span>
    <span class="q-score q-low">High</span>
    <span class="q-note-line">行业适配后 6.0</span>
  </div>
</div>

E-E-A-T 展开：Experience **5.5** · Expertise **6.5** · Authoritativeness **6.0** · Trust **6.0**

```text
E-E-A-T  = (5.5 + 6.5 + 6.0 + 6.0) ÷ 4 = 6.0
内容质量总分 = 6.0 × 0.40 + 7.5 × 0.35 + 6.0 × 0.25 = 6.53
```

**这页的可读性没问题**（HCU 7.5，是五格里最高的一格）：结论放在第一句，有小标题、目录和 FAQ，扫读体验甚至比 001 好。**但它的分数比 001 还低**，原因是四项证据类维度全部落在 5.5–6.5 区间——文章通篇在讲"应该怎么做"，却没有一个数字、一次对照、一个外部来源。

## 熔断摘要

<div class="q-fuse">
<strong>零外部来源熔断</strong>：正文里指向外部的链接全部是自家图床的图片资源，真实第三方权威来源为 0，Information Gain 封顶 7.5。
</div>

<div class="q-fuse">
<strong>隐瞒利益关联熔断</strong>：开头声明"不做工具排名"，全文结论却只落在自家工具上，且无利益披露，Trust 封顶 7.0。
</div>

<div class="q-fuse">
<strong>边界条件缺失</strong>：只讲自家工具能做什么，没有说明它不适合谁、替代路径是什么，Expertise 封顶 8.0。
</div>

<div class="q-fuse">
<strong>行业适配新增红线</strong>：涉及 AI 虚拟代言与真人形象，只给了"不要说谎、按法律要求披露"的伦理提醒，未触及肖像授权链与平台 AI 标注要求，YMYL 封顶 6.0。
</div>

<div class="q-fuse">
<strong>一手证据缺失</strong>：全文 1224 词，量化数据为 0 处，Experience 与 Information Gain 双双受限。
</div>

## 逐条批注

<div class="q-note" data-dim="HCU" data-level="medium">
  <div class="q-head"><span class="q-no">批注 01</span><span class="q-tag">HCU</span><span class="q-tag">Medium</span></div>
  <p class="q-quote">AI Avatar Ads or Product Led Ads — Which Format Fits the Campaign</p>
  <dl>
    <div><dt>检查位：</dt><dd>① Title / H1</dd></div>
    <div><dt>问题：</dt><dd>标题承诺解决"该选哪种格式"，但正文没有给出任何判断标准</dd></div>
    <div><dt>原因：</dt><dd>对比类内容缺少明确决策指引时触发封顶 8.0；标题提出的问题必须在正文里被回答，否则读者读完仍有被落空的感觉</dd></div>
    <div><dt>改法：</dt><dd>要么把标题收敛到正文能兑现的范围，要么在正文补一个二选一判断表（是否需要解释复杂卖点 / 是否拿得到产品实拍）</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="HCU" data-level="low">
  <div class="q-head"><span class="q-no">批注 02</span><span class="q-tag">HCU</span><span class="q-tag">Low</span></div>
  <p class="q-quote">Avatar-led ads work best when explanation and delivery matter; product-led ads work best when the product demonstration is the proof.</p>
  <dl>
    <div><dt>检查位：</dt><dd>② Intro 前两段</dd></div>
    <div><dt>问题：</dt><dd>同一句话在摘要、首段、「How to build this ad workflow」小节的段首**完整出现了三次**</dd></div>
    <div><dt>原因：</dt><dd>重复叙述不直接触发熔断，但占用篇幅、拉低信息密度；这是本篇 Information Gain 偏低的一个具体来源</dd></div>
    <div><dt>改法：</dt><dd>留摘要与首段各一处，第三处改为具体操作描述或直接删除</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="TRU" data-level="high">
  <div class="q-head"><span class="q-no">批注 03</span><span class="q-tag">TRU</span><span class="q-tag">AUT</span><span class="q-tag">High</span></div>
  <p class="q-quote">This guide focuses on creative format selection rather than repeating a general ranking of AI video tools.</p>
  <dl>
    <div><dt>检查位：</dt><dd>③ 第一条核心主张</dd></div>
    <div><dt>问题：</dt><dd>先声明"不做工具排名"以建立中立感，随后全文结论只落在自家工具上</dd></div>
    <div><dt>原因：</dt><dd>隐瞒利益关联熔断——明显服务于自有产品的文章若无披露声明，Trust 封顶 7.0；同时削弱 Authoritativeness，因为所有能力描述都只有自家口径</dd></div>
    <div><dt>改法：</dt><dd>首屏加利益披露；至少引入一个替代路径的对比，让"中立"有实际支撑</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="IG" data-level="high">
  <div class="q-head"><span class="q-no">批注 04</span><span class="q-tag">IG</span><span class="q-tag">EXP</span><span class="q-tag">High</span></div>
  <p class="q-quote">Test the message and proof before changing minor visual details.</p>
  <dl>
    <div><dt>检查位：</dt><dd>④ 数据 / 示例段（本文无此段落）</dd></div>
    <div><dt>问题：</dt><dd>全篇没有一处量化：没有制作耗时、没有对照结果、没有样本量，也没有一次真实投放的复盘</dd></div>
    <div><dt>原因：</dt><dd>一手数据缺失封顶 8.0；同时真实外部来源为 0，触发零外部来源熔断再封 7.5。这类"操作建议"如果没有数据支撑，读者无法判断它是否成立</dd></div>
    <div><dt>改法：</dt><dd>跑一次最小对照：同一预算下虚拟人版与实拍版各出三条，记录制作耗时、完播率与转化，把过程数字原样列出</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="EXR" data-level="medium">
  <div class="q-head"><span class="q-no">批注 05</span><span class="q-tag">EXR</span><span class="q-tag">Medium</span></div>
  <p class="q-quote">CapCut keeps generation close to practical editing. The benefit is not that review disappears; it is that review can lead to changes inside the same broader production environment.</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑤ 对比 / 推荐段</dd></div>
    <div><dt>问题：</dt><dd>只有定性描述，没有代价与边界：成本区间、导出限制、不适合的场景一律未提</dd></div>
    <div><dt>原因：</dt><dd>边界条件缺失封顶 8.0。真正专业的写法不是"我们的方案更好"，而是"我们的方案在什么条件下更好、什么条件下会拖慢你"</dd></div>
    <div><dt>改法：</dt><dd>补一张适用性表：适合什么团队规模、什么投放渠道、什么内容类型；并明确写出不适合的场景</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="YMYL" data-level="high">
  <div class="q-head"><span class="q-no">批注 06</span><span class="q-tag">YMYL</span><span class="q-tag">TRU</span><span class="q-tag">High</span></div>
  <p class="q-quote">Synthetic presenters should not imply a real endorsement or expertise that does not exist. Disclose or review AI use where required by law, platform policy, or brand standards.</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑥ 风险建议句</dd></div>
    <div><dt>问题：</dt><dd>方向是对的——这是全文唯一提到 AI 披露的地方，但停留在原则层面，没有落到可执行</dd></div>
    <div><dt>原因：</dt><dd>按视频 / AI 工具行业的适配红线，这里缺三样：**真人形象的授权链**（谁同意的、授权范围、是否可用作代言）、**各投放平台的 AI 素材标注要求**、**素材与音乐的商用授权范围**（平台内使用≠广告投放）。把判断推回"按法律要求"，等于没有回答</dd></div>
    <div><dt>改法：</dt><dd>把这一句展开成三行清单：授权从哪来、哪些平台要求标注、导出用途对应哪种授权；并注明适用于哪些法域</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="AUT" data-level="medium">
  <div class="q-head"><span class="q-no">批注 07</span><span class="q-tag">AUT</span><span class="q-tag">EXP</span><span class="q-tag">Medium</span></div>
  <p class="q-quote">署名：CapCut　日期：2026-09-16</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑦ Author / Reviewer</dd></div>
    <div><dt>问题：</dt><dd>只有品牌署名，没有具名作者与审核者；正文用"For US advertisers"限定了受众，却没有交代是谁在说</dd></div>
    <div><dt>原因：</dt><dd>作者与实体信号缺失会同时压低 E-E-A-T 四项。尤其在一篇讲"AI 代言合规"的文章里，没有署名的建议天然说服力更弱</dd></div>
    <div><dt>改法：</dt><dd>补具名作者与审核者（含领域背景），或明确写出内容由哪个团队审核</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="HCU" data-level="low">
  <div class="q-head"><span class="q-no">批注 08</span><span class="q-tag">HCU</span><span class="q-tag">Low</span></div>
  <p class="q-quote">Choose the format according to whether the ad must explain or demonstrate.</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑧ 结论 / CTA</dd></div>
    <div><dt>问题：</dt><dd>结论把标题的问题原样还给了读者——按"需要解释还是演示"来选，但没给判断依据</dd></div>
    <div><dt>原因：</dt><dd>决策指引缺失封顶 8.0；这也是全文 HCU 停在 7.5 的原因——结构很清晰，但清晰不等于好用</dd></div>
    <div><dt>改法：</dt><dd>给三行判断清单：卖点是否需要解释、能否在两周内拿到产品实拍、投放渠道是否吃真人信任感。三个问题答完就能定格式</dd></div>
  </dl>
</div>

## 和 001 的对照

同一套模型、不同行业，两条结论：

| | 拆解示范 001（硬件） | 拆解示范 002（视频工具） |
| --- | --- | --- |
| 总分 | 6.84 | 6.53 |
| 最高的一项 | HCU 7.2、Experience 7.2 | HCU 7.5 |
| 最低的一项 | Trust 5.5、YMYL 5.5 | Experience 5.5 |
| 数据与证据 | 有实测，但缺口径 | **完全没有** |
| 合规问题 | 触了版权红线（有高风险动作） | 没触红线，但缺披露与授权说明 |
| 典型失分模式 | **有证据但不敢信** | **通顺但不可验证** |

两篇都是红档，但坏的方式完全不同——这也是为什么分档卡要拆到七个维度：**只说"质量不行"没法改，指出是哪一格红了才能动手。**

## 两点说明

- **分数是本次评估值**，用于演示拆解方式；其中 YMYL 的判定采用了上面那张行业适配表，原系统里没有"AI 素材标注""肖像授权"这两条
- **本页只做示范**：批注按既有规范组织，不指向任何真实页面，也不改动审计系统的规则文件
