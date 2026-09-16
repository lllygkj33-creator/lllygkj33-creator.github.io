---
title: "链接图谱"
description: "把站内 Blog 解析成节点与连线，用 JSON 管理每篇的入链、出链、锚文本与状态，识别孤岛页、弱连接页、断链和主题连接结构。"
order: 0
updated: "2026-09-16"
---

> 链接图谱把一个站的内链关系从"散在几百篇文章里"变成**可计算的数据**：谁是节点、谁连谁、用什么锚文本、哪些页面被支持、哪些被遗忘。

<div class="sk-badge">Link Graph</div>

<p class="sk-sub">把每一篇 Blog 的连接关系画出来。</p>

<div class="q-overview">
  <div class="q-card"><span class="q-label">Blog 页面</span><span class="q-score q-medium">14</span><span class="q-note-line">参与图谱的节点</span></div>
  <div class="q-card"><span class="q-label">内链</span><span class="q-score q-medium">25</span><span class="q-note-line">合并重复后的边</span></div>
  <div class="q-card"><span class="q-label">孤岛页</span><span class="q-score q-low">1</span><span class="q-note-line">无任何入链</span></div>
  <div class="q-card"><span class="q-label">断链</span><span class="q-score q-low">1</span><span class="q-note-line">目标 404</span></div>
</div>

<div class="q-overview">
  <div class="q-card"><span class="q-label">死胡同</span><span class="q-score q-medium">2</span><span class="q-note-line">无任何出链</span></div>
  <div class="q-card"><span class="q-label">弱连接页</span><span class="q-score q-medium">6</span><span class="q-note-line">入链仅 1 条</span></div>
  <div class="q-card"><span class="q-label">平均入链</span><span class="q-score q-medium">1.8</span><span class="q-note-line">每条边计入一次</span></div>
  <div class="q-card"><span class="q-label">平均出链</span><span class="q-score q-medium">1.8</span><span class="q-note-line">同上</span></div>
</div>

> 图谱里的"孤岛"只表示**在 Blog 内部链接图谱里没有入链**，不等于搜索引擎无法发现——页面依然可能通过站点地图、分类页、导航或外部链接被发现。

## 图谱

节点是一篇文章，连线是正文里的一条内链。**节点大小按入链数变化，颜色按状态区分。**

<div class="lg-panel">
<svg viewBox="0 0 900 600" class="lg-graph" role="img" aria-label="Blog 内链图谱：节点为文章，连线为正文内链">
  <defs>
    <marker id="lg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="lg-arrowhead" /></marker>
    <marker id="lg-arrow-broken" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="lg-arrowhead-broken" /></marker>
    <marker id="lg-arrow-redirect" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="lg-arrowhead-redirect" /></marker>
  </defs>
  <g class="lg-edges">
  <line class="lg-edge" x1="213.9" y1="304.8" x2="186.1" y2="311.8" data-s="plex-guide" data-t="plex-hardware" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="235.4" y1="282.1" x2="239.6" y2="260.0" data-s="plex-guide" data-t="jellyfin-vs-plex" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="249.5" y1="306.6" x2="323.5" y2="333.2" data-s="plex-guide" data-t="plex-transcoding" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="178.3" y1="313.7" x2="206.1" y2="306.8" data-s="plex-hardware" data-t="plex-guide" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="163.8" y1="327.4" x2="150.6" y2="369.7" data-s="plex-hardware" data-t="nas-hardware" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="355.9" y1="347.6" x2="384.5" y2="364.5" data-s="plex-transcoding" data-t="gpu-for-llm" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="241.1" y1="252.1" x2="236.9" y2="274.2" data-s="jellyfin-vs-plex" data-t="plex-guide" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="239.9" y1="225.3" x2="234.4" y2="205.6" data-s="jellyfin-vs-plex" data-t="media-server-software" marker-end="url(#lg-arrow)" />
  <line class="lg-edge lg-edge-dup" x1="229.4" y1="198.3" x2="231.3" y2="273.7" data-s="media-server-software" data-t="plex-guide" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="232.2" y1="197.9" x2="237.8" y2="217.6" data-s="media-server-software" data-t="jellyfin-vs-plex" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="228.4" y1="175.6" x2="224.9" y2="119.4" data-s="media-server-software" data-t="streaming-clients" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="181.1" y1="423.5" x2="160.4" y2="405.0" data-s="nas-os" data-t="nas-hardware" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="194.1" y1="450.4" x2="195.9" y2="480.6" data-s="nas-os" data-t="raid-basics" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="179.4" y1="442.8" x2="116.5" y2="481.9" data-s="nas-os" data-t="backup-strategy" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="154.4" y1="399.7" x2="175.1" y2="418.2" data-s="nas-hardware" data-t="nas-os" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="196.4" y1="488.6" x2="194.6" y2="458.4" data-s="raid-basics" data-t="nas-os" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="450.3" y1="416.0" x2="470.8" y2="409.4" data-s="local-ai" data-t="ollama-setup" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="425.8" y1="407.5" x2="418.8" y2="396.9" data-s="local-ai" data-t="gpu-for-llm" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="478.5" y1="407.0" x2="457.9" y2="413.6" data-s="ollama-setup" data-t="local-ai" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="478.4" y1="400.0" x2="428.4" y2="384.1" data-s="ollama-setup" data-t="gpu-for-llm" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="414.3" y1="390.3" x2="421.4" y2="400.9" data-s="gpu-for-llm" data-t="local-ai" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="391.4" y1="368.6" x2="362.8" y2="351.7" data-s="gpu-for-llm" data-t="plex-transcoding" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="326.0" y1="449.1" x2="411.4" y2="427.0" data-s="smart-home-hub" data-t="local-ai" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="308.4" y1="450.1" x2="217.1" y2="437.6" data-s="smart-home-hub" data-t="nas-os" marker-end="url(#lg-arrow)" />
  <line class="lg-edge" x1="197.6" y1="418.7" x2="224.5" y2="325.9" data-s="nas-os" data-t="plex-guide" marker-end="url(#lg-arrow)" />
  <line class="lg-edge lg-edge-broken" x1="144.1" y1="404.3" x2="239.1" y2="485.5" marker-end="url(#lg-arrow-broken)" />
  <text class="lg-broken-label" x="214.1" y="508.5">404</text>
  <line class="lg-edge lg-edge-redirect" x1="102.1" y1="595.0" x2="185.7" y2="520.0" marker-end="url(#lg-arrow-redirect)" />
  <text class="lg-redirect-label" x="92.1" y="618.0">301</text>
  </g>
  <g class="lg-nodes">
  <g class="lg-node lg-hub" data-k="plex-guide"><title>Plex 家庭影音指南｜主题 Plex｜入链 4｜出链 3</title><circle cx="231.9" cy="300.3" r="18.6" /><text x="231.9" y="332.9" text-anchor="middle">Plex 家庭影音指南</text></g>
  <g class="lg-node lg-weak" data-k="plex-hardware"><title>Plex 硬件要求｜主题 Plex｜入链 1｜出链 2</title><circle cx="167.3" cy="316.5" r="11.4" /><text x="167.3" y="341.9" text-anchor="middle">Plex 硬件要求</text></g>
  <g class="lg-node lg-healthy" data-k="jellyfin-vs-plex"><title>Jellyfin 对比 Plex｜主题 Plex｜入链 2｜出链 2</title><circle cx="243.7" cy="238.5" r="13.8" /><text x="243.7" y="266.3" text-anchor="middle">Jellyfin 对比 Plex</text></g>
  <g class="lg-node lg-healthy" data-k="plex-transcoding"><title>Plex 硬件转码配置｜主题 Plex｜入链 2｜出链 1</title><circle cx="344.0" cy="340.6" r="13.8" /><text x="344.0" y="368.4" text-anchor="middle">Plex 硬件转码配置</text></g>
  <g class="lg-node lg-hub" data-k="nas-os"><title>NAS 系统选型｜主题 NAS｜入链 3｜出链 4</title><circle cx="193.1" cy="434.3" r="16.2" /><text x="193.1" y="464.5" text-anchor="middle">NAS 系统选型</text></g>
  <g class="lg-node lg-healthy" data-k="nas-hardware"><title>NAS 硬件清单｜主题 NAS｜入链 2｜出链 1</title><circle cx="144.1" cy="390.5" r="13.8" /><text x="144.1" y="418.3" text-anchor="middle">NAS 硬件清单</text></g>
  <g class="lg-node lg-weak" data-k="raid-basics"><title>RAID 基础｜主题 NAS｜入链 1｜出链 1</title><circle cx="197.1" cy="500.0" r="11.4" /><text x="197.1" y="525.4" text-anchor="middle">RAID 基础</text></g>
  <g class="lg-node lg-hub" data-k="local-ai"><title>本地 AI 部署｜主题 Local AI｜入链 3｜出链 2</title><circle cx="434.8" cy="421.0" r="16.2" /><text x="434.8" y="451.2" text-anchor="middle">本地 AI 部署</text></g>
  <g class="lg-node lg-weak" data-k="ollama-setup"><title>Ollama 安装与调优｜主题 Local AI｜入链 1｜出链 2</title><circle cx="489.3" cy="403.5" r="11.4" /><text x="489.3" y="428.9" text-anchor="middle">Ollama 安装与调优</text></g>
  <g class="lg-node lg-hub" data-k="gpu-for-llm"><title>给大模型选显卡｜主题 Local AI｜入链 3｜出链 2</title><circle cx="405.3" cy="376.8" r="16.2" /><text x="405.3" y="407.0" text-anchor="middle">给大模型选显卡</text></g>
  <g class="lg-node lg-weak" data-k="media-server-software"><title>媒体服务器软件盘点｜主题 Media｜入链 1｜出链 3</title><circle cx="229.1" cy="186.9" r="11.4" /><text x="229.1" y="212.3" text-anchor="middle">媒体服务器软件盘点</text></g>
  <g class="lg-node lg-dead" data-k="streaming-clients"><title>各平台客户端差异｜主题 Media｜入链 1｜出链 0</title><circle cx="223.7" cy="100.0" r="11.4" /><text x="223.7" y="125.4" text-anchor="middle">各平台客户端差异</text></g>
  <g class="lg-node lg-orphan" data-k="smart-home-hub"><title>智能家居中枢｜主题 Smart Home｜入链 0｜出链 2</title><circle cx="317.3" cy="451.3" r="9.0" /><text x="317.3" y="474.3" text-anchor="middle">智能家居中枢</text></g>
  <g class="lg-node lg-dead" data-k="backup-strategy"><title>备份策略｜主题 NAS｜入链 1｜出链 0</title><circle cx="100.0" cy="492.1" r="11.4" /><text x="100.0" y="517.5" text-anchor="middle">备份策略</text></g>
  </g>
</svg>
<div class="lg-legend">
  <span><i class="i-hub"></i>Hub（入链 ≥ 3）</span>
  <span><i class="i-healthy"></i>健康</span>
  <span><i class="i-weak"></i>弱连接（入链 = 1）</span>
  <span><i class="i-orphan"></i>孤岛（入链 = 0）</span>
  <span><i class="i-dead"></i>死胡同（出链 = 0）</span>
  <span><i class="i-weak"></i>虚线 = 重复链接合并</span>
</div>
</div>

鼠标停在节点上可以看到标题、主题、入链与出链数；节点位置由力导向布局算出，**没有动效、不依赖脚本**，随时可截图。

## 需要回答的六个问题

这套图谱第一版要能一眼回答：

<div class="sk-gaps">
  <div class="sk-gap"><div class="sk-gap-label">孤岛</div><div class="sk-gap-n q-low">1</div><div class="sk-gap-note">哪些页面没有入链</div></div>
  <div class="sk-gap"><div class="sk-gap-label">死胡同</div><div class="sk-gap-n q-medium">2</div><div class="sk-gap-note">哪些页面没有出链</div></div>
  <div class="sk-gap"><div class="sk-gap-label">Hub</div><div class="sk-gap-n q-medium">4</div><div class="sk-gap-note">哪些页面被指向最多</div></div>
  <div class="sk-gap"><div class="sk-gap-label">断链</div><div class="sk-gap-n q-low">1</div><div class="sk-gap-note">哪些链接指向 404</div></div>
  <div class="sk-gap"><div class="sk-gap-label">弱连接</div><div class="sk-gap-n q-medium">6</div><div class="sk-gap-note">哪些只有 1 条入链</div></div>
  <div class="sk-gap"><div class="sk-gap-label">页面查看</div><div class="sk-gap-n q-medium">全部</div><div class="sk-gap-note">某篇的入链和出链是谁</div></div>
</div>

## 孤岛与弱连接

按入链数升序排列，这是最直接的修补清单。

<div class="sk-table-wrap">
<table class="lg-table">
  <thead><tr><th>路径</th><th>标题</th><th>入链</th><th>出链</th><th>主题</th><th>状态</th></tr></thead>
  <tbody>
| /blogs/backup-strategy | 备份策略 | 1 | 0 | NAS | 死胡同 |
| /blogs/media-server-software | 媒体服务器软件盘点 | 1 | 3 | Media | 弱连接 |
| /blogs/ollama-setup | Ollama 安装与调优 | 1 | 2 | Local AI | 弱连接 |
| /blogs/plex-hardware | Plex 硬件要求 | 1 | 2 | Plex | 弱连接 |
| /blogs/raid-basics | RAID 基础 | 1 | 1 | NAS | 弱连接 |
| /blogs/streaming-clients | 各平台客户端差异 | 1 | 0 | Media | 死胡同 |
| /blogs/smart-home-hub | 智能家居中枢 | 0 | 2 | Smart Home | 孤岛 |
  </tbody>
</table>
</div>

## 断链与重定向

正文里仍然指向失效地址或旧地址的链接，这是可直接执行的修复列表。

<div class="sk-table-wrap">
<table class="lg-table">
  <thead><tr><th>来源</th><th>锚文本</th><th>目标</th><th>状态</th><th>最终地址</th></tr></thead>
  <tbody>
    <tr><td>/blogs/nas-hardware</td><td>Plex guide</td><td>/blogs/old-plex-guide</td><td>404</td><td>—</td></tr>
    <tr><td>/blogs/raid-basics</td><td>NAS OS</td><td>/blogs/nas-os-v2</td><td>301</td><td>/blogs/nas-os</td></tr>
  </tbody>
</table>
</div>

重定向那条说明的是：**正文还在链旧地址**，虽然能跳转成功，但应该改成最终地址。

## 被指向最多的页面

<div class="sk-table-wrap">
<table class="lg-table">
  <thead><tr><th>路径</th><th>标题</th><th>入链</th><th>主题</th></tr></thead>
  <tbody>
| /blogs/plex-guide | Plex 家庭影音指南 | 4 | Plex |
| /blogs/gpu-for-llm | 给大模型选显卡 | 3 | Local AI |
| /blogs/local-ai | 本地 AI 部署 | 3 | Local AI |
| /blogs/nas-os | NAS 系统选型 | 3 | NAS |
  </tbody>
</table>
</div>

Hub 集中在各个主题簇内部，另外 **Plex 与 NAS 之间存在跨簇桥接**——这种桥接页面是把两组内容连成网络的关键。

## 页面查看

每一页的入链、出链与状态。这一张表就能回答"某篇 Blog 的入链和出链分别是谁"。

<div class="sk-table-wrap">
<table class="lg-table">
  <thead><tr><th>路径</th><th>标题</th><th>主题</th><th>入链</th><th>出链</th><th>状态</th></tr></thead>
  <tbody>
| /blogs/plex-guide | Plex 家庭影音指南 | Plex | 4 | 3 | Hub |
| /blogs/gpu-for-llm | 给大模型选显卡 | Local AI | 3 | 2 | Hub |
| /blogs/local-ai | 本地 AI 部署 | Local AI | 3 | 2 | Hub |
| /blogs/nas-os | NAS 系统选型 | NAS | 3 | 4 | Hub |
| /blogs/jellyfin-vs-plex | Jellyfin 对比 Plex | Plex | 2 | 2 | 健康 |
| /blogs/nas-hardware | NAS 硬件清单 | NAS | 2 | 1 | 健康 |
| /blogs/plex-transcoding | Plex 硬件转码配置 | Plex | 2 | 1 | 健康 |
| /blogs/backup-strategy | 备份策略 | NAS | 1 | 0 | 死胡同 |
| /blogs/media-server-software | 媒体服务器软件盘点 | Media | 1 | 3 | 弱连接 |
| /blogs/ollama-setup | Ollama 安装与调优 | Local AI | 1 | 2 | 弱连接 |
| /blogs/plex-hardware | Plex 硬件要求 | Plex | 1 | 2 | 弱连接 |
| /blogs/raid-basics | RAID 基础 | NAS | 1 | 1 | 弱连接 |
| /blogs/streaming-clients | 各平台客户端差异 | Media | 1 | 0 | 死胡同 |
| /blogs/smart-home-hub | 智能家居中枢 | Smart Home | 0 | 2 | 孤岛 |
  </tbody>
</table>
</div>

## 边明细

一条边 = 一条 Blog 到 Blog 的内链。同一个来源重复链接同一目标时，**图谱里只画一条，但保留出现次数与全部锚文本**。

<div class="sk-table-wrap">
<table class="lg-table">
  <thead><tr><th>来源</th><th>目标</th><th>锚文本（首个）</th><th>出现次数</th><th>目标状态</th></tr></thead>
  <tbody>
| /blogs/gpu-for-llm | /blogs/local-ai | local AI | 1 | 200 |
| /blogs/gpu-for-llm | /blogs/plex-transcoding | transcoding | 1 | 200 |
| /blogs/jellyfin-vs-plex | /blogs/media-server-software | media server software | 1 | 200 |
| /blogs/jellyfin-vs-plex | /blogs/plex-guide | Plex | 1 | 200 |
| /blogs/local-ai | /blogs/gpu-for-llm | GPU for LLM | 1 | 200 |
| /blogs/local-ai | /blogs/ollama-setup | Ollama setup | 1 | 200 |
| /blogs/media-server-software | /blogs/jellyfin-vs-plex | comparison | 1 | 200 |
| /blogs/media-server-software | /blogs/plex-guide | Plex guide | 2 | 200 |
| /blogs/media-server-software | /blogs/streaming-clients | streaming clients | 1 | 200 |
| /blogs/nas-hardware | /blogs/nas-os | NAS OS | 1 | 200 |
| /blogs/nas-os | /blogs/backup-strategy | backup strategy | 1 | 200 |
| /blogs/nas-os | /blogs/nas-hardware | NAS hardware | 1 | 200 |
| /blogs/nas-os | /blogs/plex-guide | Plex 指南 | 1 | 200 |
| /blogs/nas-os | /blogs/raid-basics | RAID basics | 1 | 200 |
| /blogs/ollama-setup | /blogs/gpu-for-llm | GPU | 1 | 200 |
| /blogs/ollama-setup | /blogs/local-ai | local AI | 1 | 200 |
| /blogs/plex-guide | /blogs/jellyfin-vs-plex | Jellyfin vs Plex | 1 | 200 |
| /blogs/plex-guide | /blogs/plex-hardware | Plex hardware requirements | 1 | 200 |
| /blogs/plex-guide | /blogs/plex-transcoding | transcoding setup | 1 | 200 |
| /blogs/plex-hardware | /blogs/nas-hardware | NAS hardware | 1 | 200 |
| /blogs/plex-hardware | /blogs/plex-guide | Plex guide | 1 | 200 |
| /blogs/plex-transcoding | /blogs/gpu-for-llm | GPU acceleration | 1 | 200 |
| /blogs/raid-basics | /blogs/nas-os | NAS OS | 1 | 200 |
| /blogs/smart-home-hub | /blogs/local-ai | local AI | 1 | 200 |
| /blogs/smart-home-hub | /blogs/nas-os | NAS OS | 1 | 200 |
  </tbody>
</table>
</div>

## 这一版做什么、不做什么

| 做 | 不做 |
| --- | --- |
| 抓取 Blog 正文里的内链 | 修改文章 HTML |
| 标准化 URL，合并重复节点 | 自动新增或删除链接 |
| 计算入链、出链与状态 | 自动生成锚文本 |
| 识别孤岛、死胡同、弱连接 | 自动做 301 跳转 |
| 检测断链与重定向目标 | 自动判断页面该不该删 |
| 输出 JSON 并可视化 | 自动判断搜索引擎是否视为孤岛 |

系统定位是**检测 + 可视化 + 报告**，不是自动改站。

> 所有状态判定都是**内部诊断规则**，不是任何搜索平台的官方标准。

## 下一步

- 字段与 JSON 结构见数据结构
- 孤岛、死胡同、弱连接、断链的判定规则见诊断规则
- 抓取范围、URL 标准化与配置项见配置
