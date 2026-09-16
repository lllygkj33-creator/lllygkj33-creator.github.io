---
title: "链接图谱"
description: "把站内 Blog 解析成节点与连线：统计入链、出链、锚文本与状态，识别孤岛、弱连接、断链与主题连接结构。"
order: 0
updated: "2026-09-16"
---

> 链接图谱把内链关系从"散在几百篇文章里"变成**可计算的数据**：谁是节点、谁连谁、用什么锚文本、哪些页面被支持、哪些被遗忘。

<div class="q-overview">
  <div class="q-card"><span class="q-label">Blog 页面</span><span class="q-score q-medium">13</span><span class="q-note-line">参与图谱的节点</span></div>
  <div class="q-card"><span class="q-label">内链</span><span class="q-score q-medium">21</span><span class="q-note-line">合并重复后的边</span></div>
  <div class="q-card"><span class="q-label">孤岛页</span><span class="q-score q-low">1</span><span class="q-note-line">0 条入链</span></div>
  <div class="q-card"><span class="q-label">断链</span><span class="q-score q-low">1</span><span class="q-note-line">目标 404</span></div>
</div>

## 图谱

节点是文章，连线是正文里的一条内链。**四个主题簇各占一角，孤岛放在正中央**——它指向别人，却没有任何页面指向它。

<div class="lg-panel">
<svg viewBox="0 0 980 700" class="lg-graph" role="img" aria-label="Blog 内链图谱：簇内连接、跨簇桥接、孤岛、断链与重定向">
  <defs>
    <marker id="lg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="lg-arrowhead" /></marker>
    <marker id="lg-arrow-broken" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="lg-arrowhead-broken" /></marker>
    <marker id="lg-arrow-redirect" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" class="lg-arrowhead-redirect" /></marker>
  </defs>
  <rect class="lg-hull" x="78" y="58" width="330" height="232" rx="18" />
  <text class="lg-hull-label" x="92" y="79">Plex</text>
  <rect class="lg-hull" x="572" y="58" width="330" height="232" rx="18" />
  <text class="lg-hull-label" x="586" y="79">NAS</text>
  <rect class="lg-hull" x="572" y="352" width="330" height="250" rx="18" />
  <text class="lg-hull-label" x="586" y="373">Local AI</text>
  <rect class="lg-hull" x="78" y="352" width="330" height="250" rx="18" />
  <text class="lg-hull-label" x="92" y="373">Media</text>
  <rect class="lg-hull-orphan" x="418" y="258" width="144" height="146" rx="18" />
  <text class="lg-hull-label lg-hull-label-orphan" x="432" y="279">孤岛</text>
  <text class="lg-center-note" x="432" y="396">0 入链 / 2 出链</text>
  <line class="lg-edge" x1="226.1" y1="158.5" x2="157.1" y2="119.6"><title>Plex hardware requirements</title></line>
  <line class="lg-edge" x1="259.9" y1="158.5" x2="328.9" y2="119.6"><title>Jellyfin vs Plex</title></line>
  <line class="lg-edge" x1="243.0" y1="187.4" x2="243.0" y2="235.8"><title>transcoding setup</title></line>
  <line class="lg-edge" x1="150.1" y1="115.7" x2="219.1" y2="154.6"><title>Plex guide</title></line>
  <line class="lg-edge" x1="335.9" y1="115.7" x2="266.9" y2="154.6"><title>Plex</title></line>
  <line class="lg-edge lg-edge-cross" x1="342.8" y1="121.2" x2="248.4" y2="451.2"><title>media server software</title></line>
  <line class="lg-edge" x1="722.4" y1="159.8" x2="651.1" y2="119.6"><title>NAS hardware</title></line>
  <line class="lg-edge" x1="751.6" y1="159.8" x2="822.9" y2="119.6"><title>RAID basics</title></line>
  <line class="lg-edge" x1="644.1" y1="115.7" x2="715.4" y2="155.8"><title>NAS OS</title></line>
  <line class="lg-edge" x1="829.9" y1="115.7" x2="758.6" y2="155.8"><title>NAS OS</title></line>
  <line class="lg-edge" x1="722.4" y1="461.8" x2="651.1" y2="421.6"><title>Ollama setup</title></line>
  <line class="lg-edge" x1="751.6" y1="461.8" x2="820.7" y2="422.9"><title>GPU for LLM</title></line>
  <line class="lg-edge" x1="645.6" y1="412.0" x2="817.8" y2="412.0"><title>GPU</title></line>
  <line class="lg-edge" x1="644.1" y1="417.7" x2="715.4" y2="457.8"><title>local AI</title></line>
  <line class="lg-edge" x1="827.6" y1="419.0" x2="758.6" y2="457.8"><title>local AI</title></line>
  <line class="lg-edge" x1="234.3" y1="477.6" x2="154.8" y2="547.1"><title>streaming clients</title></line>
  <line class="lg-edge lg-edge-dup lg-edge-cross" x1="243.0" y1="458.4" x2="243.0" y2="195.4"><title>Plex guide</title></line>
  <line class="lg-edge lg-edge-cross" x1="720.2" y1="168.0" x2="270.4" y2="168.0"><title>Plex 指南</title></line>
  <line class="lg-edge lg-edge-cross" x1="826.3" y1="408.5" x2="264.5" y2="263.5"><title>transcoding</title></line>
  <line class="lg-edge lg-edge-cross" x1="497.8" y1="334.4" x2="715.4" y2="457.8"><title>local AI</title></line>
  <line class="lg-edge lg-edge-cross" x1="497.5" y1="325.1" x2="716.3" y2="181.6"><title>NAS OS</title></line>
  <line class="lg-edge lg-edge-broken" x1="628.0" y1="96.0" x2="546" y2="56" marker-end="url(#lg-arrow-broken)" />
  <g class="lg-ghost lg-ghost-broken"><circle cx="530" cy="38" r="15" /><text x="530" y="42" text-anchor="middle">404</text></g>
  <text x="530" y="72" text-anchor="middle" class="lg-ghost-label">旧地址已失效</text>
  <line class="lg-edge lg-edge-redirect" x1="846.0" y1="96.0" x2="906" y2="56" marker-end="url(#lg-arrow-redirect)" />
  <g class="lg-ghost lg-ghost-redirect"><circle cx="922" cy="38" r="15" /><text x="922" y="42" text-anchor="middle">301</text></g>
  <text x="922" y="72" text-anchor="middle" class="lg-ghost-label">→ NAS 选型</text>
  <g class="lg-node lg-hub"><title>Plex 家庭影音指南｜Plex｜入链 4｜出链 3</title><circle cx="243" cy="168" r="19.4" /><text x="243" y="202.4" text-anchor="middle">Plex 指南</text></g>
  <g class="lg-node lg-weak"><title>Plex 硬件要求｜Plex｜入链 1｜出链 1</title><circle cx="140" cy="110" r="11.6" /><text x="140" y="136.6" text-anchor="middle">Plex 硬件</text></g>
  <g class="lg-node lg-weak"><title>Jellyfin 对比 Plex｜Plex｜入链 1｜出链 2</title><circle cx="346" cy="110" r="11.6" /><text x="346" y="136.6" text-anchor="middle">对比 Jellyfin</text></g>
  <g class="lg-node lg-dead"><title>Plex 硬件转码｜Plex｜入链 2｜出链 0</title><circle cx="243" cy="258" r="14.2" /><text x="243" y="287.2" text-anchor="middle">转码配置</text></g>
  <g class="lg-node lg-hub"><title>NAS 系统选型｜NAS｜入链 3｜出链 3</title><circle cx="737" cy="168" r="16.8" /><text x="737" y="199.8" text-anchor="middle">NAS 选型</text></g>
  <g class="lg-node lg-weak"><title>NAS 硬件清单｜NAS｜入链 1｜出链 1</title><circle cx="634" cy="110" r="11.6" /><text x="634" y="136.6" text-anchor="middle">NAS 硬件</text></g>
  <g class="lg-node lg-weak"><title>RAID 基础｜NAS｜入链 1｜出链 1</title><circle cx="840" cy="110" r="11.6" /><text x="840" y="136.6" text-anchor="middle">RAID 基础</text></g>
  <g class="lg-node lg-hub"><title>本地 AI 部署｜Local AI｜入链 3｜出链 2</title><circle cx="737" cy="470" r="16.8" /><text x="737" y="501.8" text-anchor="middle">本地 AI</text></g>
  <g class="lg-node lg-weak"><title>Ollama 安装调优｜Local AI｜入链 1｜出链 2</title><circle cx="634" cy="412" r="11.6" /><text x="634" y="438.6" text-anchor="middle">Ollama</text></g>
  <g class="lg-node lg-healthy"><title>给大模型选显卡｜Local AI｜入链 2｜出链 2</title><circle cx="840" cy="412" r="14.2" /><text x="840" y="441.2" text-anchor="middle">选显卡</text></g>
  <g class="lg-node lg-weak"><title>媒体服务器盘点｜Media｜入链 1｜出链 2</title><circle cx="243" cy="470" r="11.6" /><text x="243" y="496.6" text-anchor="middle">服务器盘点</text></g>
  <g class="lg-node lg-dead"><title>各平台客户端差异｜Media｜入链 1｜出链 0</title><circle cx="140" cy="560" r="11.6" /><text x="140" y="586.6" text-anchor="middle">客户端差异</text></g>
  <g class="lg-node lg-orphan"><title>智能家居中枢｜Other｜入链 0｜出链 2</title><circle cx="490" cy="330" r="9.0" /><text x="490" y="354.0" text-anchor="middle">智能家居</text></g>
</svg>
<div class="lg-legend">
  <span><i class="i-hub"></i>Hub（入链 ≥ 3）</span>
  <span><i class="i-healthy"></i>健康</span>
  <span><i class="i-weak"></i>弱连接（入链 = 1）</span>
  <span><i class="i-orphan"></i>孤岛（入链 = 0）</span>
  <span><i class="i-dead"></i>死胡同（出链 = 0）</span>
  <span><i class="i-hub"></i>蓝色实线 = 跨簇桥接</span>
  <span><i class="i-weak"></i>虚线 = 重复链接合并</span>
</div>
</div>

### 这张图展示了哪些情况

| 情况 | 图上怎么看 | 本次出现 |
| --- | --- | --- |
| 簇内连接 | 同一个圆角框内的连线 | Plex 4 页、NAS 3 页、Local AI 3 页、Media 2 页 |
| Hub | 节点最大，入链最多 | Plex 指南（4）、NAS 选型（3）、本地 AI（3） |
| 弱连接 | 橙色描边 | 7 页只有 1 条入链 |
| 孤岛 | 红色虚线框内，位于正中 | 智能家居中枢 |
| 死胡同 | 紫色描边，只有入没有出 | 转码配置、客户端差异 |
| 跨簇桥接 | 蓝色实线，穿过画面中部 | NAS→Plex、Local AI→Plex、Media→Plex |
| 重复链接 | 虚线边 | 服务器盘点两次指向 Plex 指南 |
| 断链 | 红色虚线指向 404 幽灵节点 | NAS 硬件 → 旧地址 |
| 重定向 | 紫色虚线指向 301 幽灵节点 | RAID 基础 → 旧地址 |

节点大小按**入链数**变化，颜色按状态区分；鼠标悬停可看标题、主题与入链出链数。图谱是构建期算出的纯 SVG，**没有动效、不依赖脚本**，随时可截图。

> "孤岛"只表示**在 Blog 内链图谱里没有入链**，不等于搜索引擎无法发现——页面仍可能通过站点地图、分类页、导航或外链被发现。

## 六个核心问题

<div class="sk-gaps">
  <div class="sk-gap"><div class="sk-gap-label">孤岛</div><div class="sk-gap-n q-low">1</div><div class="sk-gap-note">哪些页面没有入链</div></div>
  <div class="sk-gap"><div class="sk-gap-label">死胡同</div><div class="sk-gap-n q-medium">2</div><div class="sk-gap-note">哪些页面没有出链</div></div>
  <div class="sk-gap"><div class="sk-gap-label">Hub</div><div class="sk-gap-n q-medium">3</div><div class="sk-gap-note">哪些被指向最多</div></div>
  <div class="sk-gap"><div class="sk-gap-label">断链</div><div class="sk-gap-n q-low">1</div><div class="sk-gap-note">哪些指向 404</div></div>
  <div class="sk-gap"><div class="sk-gap-label">弱连接</div><div class="sk-gap-n q-medium">7</div><div class="sk-gap-note">哪些只有 1 条入链</div></div>
  <div class="sk-gap"><div class="sk-gap-label">页面查看</div><div class="sk-gap-n q-medium">13</div><div class="sk-gap-note">某篇的入链出链是谁</div></div>
</div>

## 栏目结构

| 分组 | 页面 | 作用 |
| --- | --- | --- |
| 概览 | 本页 · 图谱模型 | 图谱怎么看、节点与边的定义、邻接矩阵 |
| 规范 | 数据结构 · 诊断规则 · 配置 | 字段定义、状态判定规则、抓取范围与只读原则 |
| 实例 | 示例 001 | 一个站点的完整图谱、邻接矩阵与全部诊断表 |

> 所有状态判定都是**内部诊断规则**，不是任何搜索平台的官方标准。
