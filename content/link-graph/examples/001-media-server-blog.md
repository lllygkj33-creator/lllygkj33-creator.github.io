---
title: "示例 001"
description: "一个 13 页 Blog 站的完整链接图谱：簇内连接、跨簇桥接、孤岛、死胡同、断链与重定向，附邻接矩阵与全部诊断表。"
order: 1
updated: "2026-09-16"
---

> 这是**示例 001**：站点为 13 篇 Blog 的媒体服务器主题站，数据为示例数据，不含真实客户与竞品。图谱、邻接矩阵与所有表格出自同一份 JSON。

## 总览

<div class="q-overview">
  <div class="q-card"><span class="q-label">Blog 页面</span><span class="q-score q-medium">13</span><span class="q-note-line">节点数</span></div>
  <div class="q-card"><span class="q-label">内链</span><span class="q-score q-medium">21</span><span class="q-note-line">去重后的边</span></div>
  <div class="q-card"><span class="q-label">孤岛页</span><span class="q-score q-low">1</span><span class="q-note-line">0 条入链</span></div>
  <div class="q-card"><span class="q-label">断链</span><span class="q-score q-low">1</span><span class="q-note-line">目标 404</span></div>
</div>

<div class="q-overview">
  <div class="q-card"><span class="q-label">死胡同</span><span class="q-score q-medium">2</span><span class="q-note-line">0 条出链</span></div>
  <div class="q-card"><span class="q-label">弱连接页</span><span class="q-score q-medium">7</span><span class="q-note-line">入链仅 1 条</span></div>
  <div class="q-card"><span class="q-label">平均入链</span><span class="q-score q-medium">1.6</span><span class="q-note-line">每条边计一次</span></div>
  <div class="q-card"><span class="q-label">重定向</span><span class="q-score q-medium">1</span><span class="q-note-line">正文仍链旧地址</span></div>
</div>

## 邻接矩阵

行是来源，列是目标。**● 表示存在一条内链，×2 表示重复链接（图谱里合并为一条），最后一列是图谱外的失效目标。**

<div class="lg-matrix-wrap">
<table class="lg-matrix">
  <thead>
    <tr><th></th><th><span>GL</span></th><th><span>JV</span></th><th><span>LA</span></th><th><span>MS</span></th><th><span>NH</span></th><th><span>NO</span></th><th><span>OS</span></th><th><span>PG</span></th><th><span>PH</span></th><th><span>PT</span></th><th><span>RB</span></th><th><span>SC</span></th><th><span>SH</span></th><th><span>404</span></th><th><span>301</span></th></tr>
  </thead>
  <tbody>
    <tr><th>GL 给大模型选显卡</th><td class="self"></td><td></td><td class="link" title="local AI">●</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="link" title="transcoding">●</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>JV Jellyfin 对比 Plex</th><td></td><td class="self"></td><td></td><td class="link" title="media server software">●</td><td></td><td></td><td></td><td class="link" title="Plex">●</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>LA 本地 AI 部署</th><td class="link" title="GPU for LLM">●</td><td></td><td class="self"></td><td></td><td></td><td></td><td class="link" title="Ollama setup">●</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>MS 媒体服务器盘点</th><td></td><td></td><td></td><td class="self"></td><td></td><td></td><td></td><td class="dup" title="Plex guide">×2</td><td></td><td></td><td></td><td class="link" title="streaming clients">●</td><td></td><td></td><td></td></tr>
    <tr><th>NH NAS 硬件清单</th><td></td><td></td><td></td><td></td><td class="self"></td><td class="link" title="NAS OS">●</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="broken" title="旧地址已失效">404</td><td></td></tr>
    <tr><th>NO NAS 系统选型</th><td></td><td></td><td></td><td></td><td class="link" title="NAS hardware">●</td><td class="self"></td><td></td><td class="link" title="Plex 指南">●</td><td></td><td></td><td class="link" title="RAID basics">●</td><td></td><td></td><td></td><td></td></tr>
    <tr><th>OS Ollama 安装调优</th><td class="link" title="GPU">●</td><td></td><td class="link" title="local AI">●</td><td></td><td></td><td></td><td class="self"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>PG Plex 家庭影音指南</th><td></td><td class="link" title="Jellyfin vs Plex">●</td><td></td><td></td><td></td><td></td><td></td><td class="self"></td><td class="link" title="Plex hardware requirements">●</td><td class="link" title="transcoding setup">●</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>PH Plex 硬件要求</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="link" title="Plex guide">●</td><td class="self"></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>PT Plex 硬件转码</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="self"></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><th>RB RAID 基础</th><td></td><td></td><td></td><td></td><td></td><td class="link" title="NAS OS">●</td><td></td><td></td><td></td><td></td><td class="self"></td><td></td><td></td><td></td><td class="redirect" title="/blogs/nas-os-v2 → /blogs/nas-os">301</td></tr>
    <tr><th>SC 各平台客户端差异</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="self"></td><td></td><td></td><td></td></tr>
    <tr><th>SH 智能家居中枢</th><td></td><td></td><td class="link" title="local AI">●</td><td></td><td></td><td class="link" title="NAS OS">●</td><td></td><td></td><td></td><td></td><td></td><td></td><td class="self"></td><td></td><td></td></tr>
  </tbody>
</table>
</div>

从矩阵里能直接看到四件事：

- **智能家居中枢那一行非空、那一列全空** → 它指向两个页面，但没有任何页面指向它，是孤岛
- **转码配置、客户端差异两列非空、对应行全空** → 只有入链没有出链，是死胡同
- **服务器盘点 → Plex 指南这一格是 ×2** → 重复链接，图谱里算一条
- **最后一列的两个标记** → 一条指向 404，一条指向 301

左下角到右上角的蓝点稀疏，说明跨簇连接少——站内链接主要发生在簇内。

## 诊断表

### 孤岛与弱连接

按入链数升序，可直接作为修补清单。

| 路径 | 标题 | 入链 | 出链 | 主题 | 状态 |
| --- | --- | ---: | ---: | --- | --- |
| /blogs/plex-transcoding | Plex 硬件转码 | 2 | 0 | Plex | 死胡同 |
| /blogs/jellyfin-vs-plex | Jellyfin 对比 Plex | 1 | 2 | Plex | 弱连接 |
| /blogs/media-server-software | 媒体服务器盘点 | 1 | 2 | Media | 弱连接 |
| /blogs/nas-hardware | NAS 硬件清单 | 1 | 1 | NAS | 弱连接 |
| /blogs/ollama-setup | Ollama 安装调优 | 1 | 2 | Local AI | 弱连接 |
| /blogs/plex-hardware | Plex 硬件要求 | 1 | 1 | Plex | 弱连接 |
| /blogs/raid-basics | RAID 基础 | 1 | 1 | NAS | 弱连接 |
| /blogs/streaming-clients | 各平台客户端差异 | 1 | 0 | Media | 死胡同 |
| /blogs/smart-home-hub | 智能家居中枢 | 0 | 2 | Other | 孤岛 |

### 断链与重定向

| 来源 | 锚文本 | 目标 | 状态 | 最终地址 |
| --- | --- | --- | ---: | --- |
| /blogs/nas-hardware | Plex guide | /blogs/old-plex-guide | 404 | — |
| /blogs/raid-basics | NAS OS | /blogs/nas-os-v2 | 301 | /blogs/nas-os |

### 被指向最多

| 路径 | 标题 | 入链 | 主题 |
| --- | --- | ---: | --- |
| /blogs/plex-guide | Plex 家庭影音指南 | 4 | Plex |
| /blogs/local-ai | 本地 AI 部署 | 3 | Local AI |
| /blogs/nas-os | NAS 系统选型 | 3 | NAS |
| /blogs/gpu-for-llm | 给大模型选显卡 | 2 | Local AI |

三个 Hub 分别落在三个主题簇里，另外 **Media 与 NAS 都指向 Plex 簇**——这说明 Plex 是站内的内容重心，也是跨簇桥接的枢纽。

## 页面查看

每一页的入链与出链。这一张表就回答"某篇 Blog 的入链和出链分别是谁"。

| 编号 | 路径 | 标题 | 主题 | 入链 | 出链 | 状态 |
| --- | --- | --- | --- | ---: | ---: | --- |
| PG | /blogs/plex-guide | Plex 家庭影音指南 | Plex | 4 | 3 | Hub |
| LA | /blogs/local-ai | 本地 AI 部署 | Local AI | 3 | 2 | Hub |
| NO | /blogs/nas-os | NAS 系统选型 | NAS | 3 | 3 | Hub |
| GL | /blogs/gpu-for-llm | 给大模型选显卡 | Local AI | 2 | 2 | 健康 |
| PT | /blogs/plex-transcoding | Plex 硬件转码 | Plex | 2 | 0 | 死胡同 |
| JV | /blogs/jellyfin-vs-plex | Jellyfin 对比 Plex | Plex | 1 | 2 | 弱连接 |
| MS | /blogs/media-server-software | 媒体服务器盘点 | Media | 1 | 2 | 弱连接 |
| NH | /blogs/nas-hardware | NAS 硬件清单 | NAS | 1 | 1 | 弱连接 |
| OS | /blogs/ollama-setup | Ollama 安装调优 | Local AI | 1 | 2 | 弱连接 |
| PH | /blogs/plex-hardware | Plex 硬件要求 | Plex | 1 | 1 | 弱连接 |
| RB | /blogs/raid-basics | RAID 基础 | NAS | 1 | 1 | 弱连接 |
| SC | /blogs/streaming-clients | 各平台客户端差异 | Media | 1 | 0 | 死胡同 |
| SH | /blogs/smart-home-hub | 智能家居中枢 | Other | 0 | 2 | 孤岛 |

## 边明细

一条边 = 一条 Blog 到 Blog 的内链。重复链接在图中只画一条，但保留出现次数与全部锚文本。

| 来源 | 目标 | 锚文本（首个） | 出现次数 | 跨簇 |
| --- | --- | --- | ---: | --- |
| /blogs/gpu-for-llm | /blogs/local-ai | local AI | 1 | 簇内 |
| /blogs/gpu-for-llm | /blogs/plex-transcoding | transcoding | 1 | 跨簇 |
| /blogs/jellyfin-vs-plex | /blogs/media-server-software | media server software | 1 | 跨簇 |
| /blogs/jellyfin-vs-plex | /blogs/plex-guide | Plex | 1 | 簇内 |
| /blogs/local-ai | /blogs/gpu-for-llm | GPU for LLM | 1 | 簇内 |
| /blogs/local-ai | /blogs/ollama-setup | Ollama setup | 1 | 簇内 |
| /blogs/media-server-software | /blogs/plex-guide | Plex guide | 2 | 跨簇 |
| /blogs/media-server-software | /blogs/streaming-clients | streaming clients | 1 | 簇内 |
| /blogs/nas-hardware | /blogs/nas-os | NAS OS | 1 | 簇内 |
| /blogs/nas-os | /blogs/nas-hardware | NAS hardware | 1 | 簇内 |
| /blogs/nas-os | /blogs/plex-guide | Plex 指南 | 1 | 跨簇 |
| /blogs/nas-os | /blogs/raid-basics | RAID basics | 1 | 簇内 |
| /blogs/ollama-setup | /blogs/gpu-for-llm | GPU | 1 | 簇内 |
| /blogs/ollama-setup | /blogs/local-ai | local AI | 1 | 簇内 |
| /blogs/plex-guide | /blogs/jellyfin-vs-plex | Jellyfin vs Plex | 1 | 簇内 |
| /blogs/plex-guide | /blogs/plex-hardware | Plex hardware requirements | 1 | 簇内 |
| /blogs/plex-guide | /blogs/plex-transcoding | transcoding setup | 1 | 簇内 |
| /blogs/plex-hardware | /blogs/plex-guide | Plex guide | 1 | 簇内 |
| /blogs/raid-basics | /blogs/nas-os | NAS OS | 1 | 簇内 |
| /blogs/smart-home-hub | /blogs/local-ai | local AI | 1 | 跨簇 |
| /blogs/smart-home-hub | /blogs/nas-os | NAS OS | 1 | 跨簇 |

## 这份数据能派什么活

| 发现 | 可执行动作 |
| --- | --- |
| 1 个孤岛，且有 2 条出链 | 从它指向的两个页面各回一条链接，孤岛立即消失 |
| 2 个死胡同 | 在正文里补一条指向同簇相关页的链接 |
| 7 个弱连接 | 从同簇 Hub 补一条入链，把入链提到 2 条 |
| 1 条断链 | 把正文里的旧地址改成新地址 |
| 1 条重定向 | 正文直接指向最终地址 |
| 跨簇边只有 3 条 | 在 Media 与 Local AI 之间找共同话题加一条桥接 |

> 所有状态判定都是**内部诊断规则**，不是任何搜索平台的官方标准。第一版只输出检测结果与建议，不自动修改任何内容。
