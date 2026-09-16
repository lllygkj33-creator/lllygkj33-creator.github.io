---
title: "拆解示范 001"
description: "用审计报告 001（Top 12 Media Servers for Home）演示这套评估系统怎么读：分档卡、熔断标记、以及按固定检查位组织的八条批注。"
order: 2
updated: "2026-09-16"
---

> 这是一页**示范**：分数取自审计系统对 001 号文章的实际输出，批注是为了演示格式而按正文位置重新组织的。目的只有一个——让人看懂这套评估是怎么判分的。

样本文章是 **Top 12 Media Servers for Home: Streaming & Transcoding**（家庭媒体服务器盘点类，横向对比 12 款方案）。它的结果很典型：**单看每一格都不算差，但总分是红的**。

## 分档卡

<div class="q-overview">
  <div class="q-card">
    <span class="q-label">内容质量总分</span>
    <span class="q-score q-low">6.84</span>
    <span class="q-note-line">加权 · 红档</span>
  </div>
  <div class="q-card">
    <span class="q-label">E-E-A-T</span>
    <span class="q-score q-low">6.55</span>
    <span class="q-note-line">四项均值</span>
  </div>
  <div class="q-card">
    <span class="q-label">HCU</span>
    <span class="q-score q-medium">7.2</span>
    <span class="q-note-line">橙档</span>
  </div>
  <div class="q-card">
    <span class="q-label">信息增益</span>
    <span class="q-score q-low">6.8</span>
    <span class="q-note-line">示范值，见文末说明</span>
  </div>
  <div class="q-card">
    <span class="q-label">YMYL 风险</span>
    <span class="q-score q-low">High</span>
    <span class="q-note-line">合规分 5.5 · 触顶</span>
  </div>
</div>

E-E-A-T 展开：Experience **7.2** · Expertise **7.0** · Authoritativeness **6.5** · Trust **5.5**

```text
E-E-A-T  = (7.2 + 7.0 + 6.5 + 5.5) ÷ 4 = 6.55
内容质量总分 = 6.55 × 0.40 + 7.2 × 0.35 + 6.8 × 0.25 = 6.84
```

**为什么总分是红的**：HCU 7.2 属于"能用"，但 Trust 和 YMYL 双双停在 5.5，而这两项落在加权里权重最大的那一块（E-E-A-T 占 40%）。这正是这套模型想说的事——**文章写得清楚，不等于可以信**。

## 熔断摘要

这一篇触发了四条硬规则，全部来自审计系统的确定性判定，与文笔无关：

<div class="q-fuse">
<strong>营销话术熔断</strong>：文中出现 gold standard / ultimate game-changer / unmatched 等厂商级赞美，相关维度分数锁定在 7.5 及以下。
</div>

<div class="q-fuse">
<strong>合规声明缺失熔断</strong>：涉及私有 Tracker 与商业流媒体录制等高版权风险话题，全文无免责声明，Trust 与 YMYL 双双封顶 5.5。
</div>

<div class="q-fuse">
<strong>假精确熔断</strong>：给出 72 小时压力测试、68°C、3.4GHz 持续 45 分钟等硬数值，却没有测试方法，Trust 封顶 6.5。
</div>

<div class="q-fuse">
<strong>代码缺失熔断</strong>：涉及容器部署与反向代理，只给文档链接、没有可复制的配置块，Expertise 封顶 7.0。
</div>

## 逐条批注

按固定检查位逐条过，每条批注都写清位置、维度、严重度、原句、问题、原因、改法。

<div class="q-note" data-dim="HCU" data-level="medium">
  <div class="q-head"><span class="q-no">批注 01</span><span class="q-tag">HCU</span><span class="q-tag">Medium</span></div>
  <p class="q-quote">开篇两段（约 150 字）为宏观背景描述……</p>
  <dl>
    <div><dt>检查位：</dt><dd>② Intro 前两段</dd></div>
    <div><dt>问题：</dt><dd>到达价值的时间被拉长，读者要读过半屏才看到正题</dd></div>
    <div><dt>原因：</dt><dd>触发 HCU 的废话熔断——开篇超过 100 字无信息背景描述，该维度封顶 7.5</dd></div>
    <div><dt>改法：</dt><dd>删掉背景段，直接从结论开始；如果一定要交代范围，压缩到一句话</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="IG" data-level="high">
  <div class="q-head"><span class="q-no">批注 02</span><span class="q-tag">IG</span><span class="q-tag">TRU</span><span class="q-tag">High</span></div>
  <p class="q-quote">300% IPC gain</p>
  <dl>
    <div><dt>检查位：</dt><dd>③ 第一条核心主张</dd></div>
    <div><dt>问题：</dt><dd>把厂商内测数据当成既定事实陈述</dd></div>
    <div><dt>原因：</dt><dd>数据断言没有外部来源支撑：Trust 触发假精确封顶 6.5；当全文数据断言多而外部链接为零时，Information Gain 另行封顶 7.0</dd></div>
    <div><dt>改法：</dt><dd>改为「官方宣称 IPC 提升约 300%，未见第三方独立验证」，并补规格书或基准测试链接</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="AUT" data-level="high">
  <div class="q-head"><span class="q-no">批注 03</span><span class="q-tag">AUT</span><span class="q-tag">High</span></div>
  <p class="q-quote">72 小时压力测试：3.4GHz 持续 45 分钟，温度 68°C</p>
  <dl>
    <div><dt>检查位：</dt><dd>④ 数据 / 示例段</dd></div>
    <div><dt>问题：</dt><dd>数字精确到小数点，却没有测试环境、工具与方法</dd></div>
    <div><dt>原因：</dt><dd>测试口径缺失熔断——给出精准性能数据但未说明测试条件，Authoritativeness 封顶 7.5；同一处数据同时触发 Trust 的假精确封顶 6.5</dd></div>
    <div><dt>改法：</dt><dd>补三行口径：室温与散热条件、测试工具（如 stress-ng）、样本量与判定标准。补上这三行，这一处就从扣分项变成加分项</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="EXR" data-level="medium">
  <div class="q-head"><span class="q-no">批注 04</span><span class="q-tag">EXR</span><span class="q-tag">TRU</span><span class="q-tag">Medium</span></div>
  <p class="q-quote">gold standard / ultimate game-changer / unmatched / 把 AVX2 称为 game changer</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑤ 对比 / 推荐段（贯穿全文）</dd></div>
    <div><dt>问题：</dt><dd>用厂商级赞美词替代量化参数</dd></div>
    <div><dt>原因：</dt><dd>营销话术熔断（全局规则）——出现绝对化营销词时，涉及的维度全部锁定 7.5 及以下。这条规则不判断文笔，只匹配词表</dd></div>
    <div><dt>改法：</dt><dd>每个赞美词换成一个可核对的数字：帧率、功耗、可同时转码路数。没有数字就不要用形容词</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="EXP" data-level="medium">
  <div class="q-head"><span class="q-no">批注 05</span><span class="q-tag">EXP</span><span class="q-tag">EXR</span><span class="q-tag">Medium</span></div>
  <p class="q-quote">对自有硬件的基准测试缺乏与其他硬件的直接对比，性能提升描述未注明测试条件</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑤ 对比 / 推荐段（Part 4）</dd></div>
    <div><dt>问题：</dt><dd>偏好代替客观对比；一手测试存在，但缺对照</dd></div>
    <div><dt>原因：</dt><dd>处在无一手证据熔断的边缘——有测试动作但无可复现口径，Experience 与 Expertise 都停在"动手过"这一档</dd></div>
    <div><dt>改法：</dt><dd>同一套测试脚本在两台设备上各跑一遍，把两张结果表并排放。对照比结论更有说服力</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="YMYL" data-level="high">
  <div class="q-head"><span class="q-no">批注 06</span><span class="q-tag">YMYL</span><span class="q-tag">TRU</span><span class="q-tag">High</span></div>
  <p class="q-quote">…提及「参与 Linux ISO 社区和私有 Tracker」作为媒体来源，并介绍 PlayOn 录制商业流媒体…</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑥ 风险建议句（Q1 / Part 3）</dd></div>
    <div><dt>问题：</dt><dd>把高版权风险的做法当作正常方案介绍，全文没有任何法律边界说明</dd></div>
    <div><dt>原因：</dt><dd>合规声明缺失熔断——涉及翻录与私有 Tracker 且无免责声明，Trust 与 YMYL 直接封顶 5.5。这不是"扣几分"，是整篇的可信度被钉死</dd></div>
    <div><dt>改法：</dt><dd>在对应段落末尾补免责声明，写明版权边界与不同法域的差异；把"推荐做法"改成"存在法律风险的做法的客观说明"</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="TRU" data-level="high">
  <div class="q-head"><span class="q-no">批注 07</span><span class="q-tag">TRU</span><span class="q-tag">AUT</span><span class="q-tag">High</span></div>
  <p class="q-quote">全文大量推荐自有硬件与系统，并多处提供指向自有站点的链接</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑦ Author / 利益关系（首屏与全篇）</dd></div>
    <div><dt>问题：</dt><dd>明显的商业导向，却没有利益披露</dd></div>
    <div><dt>原因：</dt><dd>隐瞒利益关联熔断——推销自有产品而无披露声明，Trust 封顶 7.0；同时拖累 Authoritativeness：结论全部来自自家口径，可复核性下降</dd></div>
    <div><dt>改法：</dt><dd>首屏加一句利益披露；对自有产品与竞品使用同一套评价标准，该写的缺点照写</dd></div>
  </dl>
</div>

<div class="q-note" data-dim="HCU" data-level="low">
  <div class="q-head"><span class="q-no">批注 08</span><span class="q-tag">HCU</span><span class="q-tag">Low</span></div>
  <p class="q-quote">列出了 12 种方案并按用户画像给出推荐，但缺少按预算或性能的快速决策总结</p>
  <dl>
    <div><dt>检查位：</dt><dd>⑧ 结论 / 推荐区（Part 2）</dd></div>
    <div><dt>问题：</dt><dd>有推荐但没有快速决策入口，读者仍需自行对比 12 行</dd></div>
    <div><dt>原因：</dt><dd>盘点类内容缺少明确决策指引时触发封顶 8.0，这是本篇 HCU 停在 7.2 的直接原因之一</dd></div>
    <div><dt>改法：</dt><dd>在推荐区之前加一个表格：预算有限 / 隐私优先 / 苹果生态 / 家庭影院，各给一个明确答案</dd></div>
  </dl>
</div>

## 这页示范了什么

1. **分档卡负责定位**：五格里两格红，一眼看出问题在 Trust 和 YMYL，而不是"文章写得不够好"
2. **熔断标记负责定性**：红色横幅是硬规则，与文笔无关，改起来目标明确
3. **批注卡负责落地**：每条批注都指到正文位置、说明触发的是哪条规则、给出可执行的改法

三条讲的都是同一件事：**评估要能被复现，才有意义**。同一篇文章换个人来审，只要规则一致，就该得出同样的分档和同样的熔断清单。

## 两点说明

- **Information Gain 的 6.8 是示范值**：001 号报告的导出里没有这一维度的结果（审计标准里列了 IG，但输出缺失），这里为保持模型完整用了示例值；换成真实分数后总分需要重算
- **本页只做示范，不改动任何真实系统**：分数取自既有报告的原始输出，批注是按本项目的批注规范重新组织的呈现方式，审计流程本身没有变化
