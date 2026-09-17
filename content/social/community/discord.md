---
title: "Discord"
description: "把 Discord 实时聊天按时间戳、消息链接、频道和上下文归档，再从日报周报中提取独立意图，转成可长期搜索的页面。"
order: 3
updated: "2026-09-17"
---

> Discord 的价值不是把聊天记录原样发布，而是捕获**实时、连续、有上下文的用户行为**。先忠实记录，再按问题、场景和用户任务重构；日报和周报负责保存现场，独立站页面负责解决长期 Intent。

## 平台角色

Discord 最强的不是公开搜索，而是：

```text
实时问题
+
追问
+
多人补充
+
管理员回答
+
失败与成功反馈
```

一条真正有价值的需求经常不是一条消息，而是一段对话。

因此不能只抓：

```text
Message
```

而要保留：

```text
Conversation Context
```

## 两层产物

Discord 建议明确拆成两层：

| 层 | 作用 | 输出 |
| --- | --- | --- |
| 原始记录层 | 保存发生了什么 | 日报、周报、月度归档 |
| 内容转化层 | 判断用户真正要解决什么 | Support、FAQ、Guide、Comparison、Use Case |

第一层忠实。

第二层重构。

不要混在一起。

## 原始记录

日报 / 周报至少保留：

```text
日期
产品
频道
作者
时间戳
原消息
消息链接
回复关系
上下文
附件 / 图片
初步标签
```

推荐结构：

```json
{
  "date": "2026-08-12",
  "product": "ZimaOS",
  "channel": "zimaos-general",
  "author": "user_name",
  "timestamp": "2026-08-12T09:42:16Z",
  "message": "Original message",
  "message_url": "https://discord.com/channels/...",
  "reply_to": "message_id",
  "attachments": [],
  "tags": ["storage", "permissions"]
}
```

消息链接和时间戳必须保留，因为后面需要回到原始语境验证。

## 日报

日报回答：

```text
今天发生了什么？
```

但不要变成：

```text
09:01 A 说……
09:12 B 说……
09:43 C 说……
```

更好的日报结构：

| Topic | What Happened | Users | Evidence |
| --- | --- | ---: | --- |
| Storage permission | 多名用户遇到挂载后权限错误 | 4 | 消息链接 |
| Update issue | 升级后某服务未启动 | 2 | 消息链接 |
| Feature request | 希望支持某配置 | 3 | 消息链接 |

日报仍然是运营记录，不直接当 SEO 页面。

## 周报

周报回答：

```text
这一周哪些问题值得持续关注？
```

应该做：

```text
重复问题聚类
↓
新增问题
↓
已解决问题
↓
高影响问题
↓
内容机会
```

建议字段：

```text
Topic
First Seen
Last Seen
Message Count
Unique Users
Status
Current Answer
Content Exists
Content Opportunity
Source Messages
```

## 独立意图

真正发布到独立站时，不按“聊天主题”建页，而按：

```text
User Task
```

例如 Discord 一周出现：

```text
用户 A：升级之后 Docker App 起不来
用户 B：1.7.0 后容器一直 restarting
用户 C：升级完某个 App 502
```

不能直接发布：

```text
This Week's Docker Problems
```

应该继续诊断：

```text
是不是同一个根因？
```

如果根因不同：

```text
升级后容器无法启动
502 after app update
Container restart loop
```

可能是三个 Intent。

如果根因相同，则合并成一篇真正完整的 Troubleshooting Guide。

## 行为逻辑

页面不应该按照：

```text
谁先说
→ 谁回复
→ 最后解决
```

而应该按照：

```text
用户遇到什么
↓
先判断什么
↓
为什么会发生
↓
怎么修
↓
怎么验证
↓
什么情况下不适用
```

这是从聊天转成搜索页面最关键的一步。

## 页面类型

Discord 最适合生产：

| Discord 行为 | 独立站页面 |
| --- | --- |
| 高频排障 | Troubleshooting |
| “Can I...?” | Capability / FAQ |
| 多人比较两种方案 | Comparison |
| 用户分享完整配置 | Setup / Use Case |
| 新版本集中报错 | Version-specific Guide |
| 多人反复误解一个功能 | Concept / Explanation |
| Feature Request 集中出现 | Requirement / Roadmap Insight |
| 管理员反复回答同一问题 | Evergreen Support Page |

## 证据

独立页面可以来自 Discord，但需要区分：

```text
用户报告
官方确认
实测验证
推测
```

不能把：

```text
3 个用户都遇到了
```

直接写成：

```text
所有用户都会遇到
```

更好的表达是把用户报告作为问题发现来源，再用文档、复现、版本信息或内部测试验证。

## 多频道

如果有多个产品：

```text
CasaOS
ZimaOS
ZimaBoard
ZimaBlade
ZimaCube
```

建议先按：

```text
产品
→ 频道
→ Topic
→ Intent
```

归档。

最终 SEO 页面可以跨频道聚合，但原始证据必须保留来源频道。

## 图片与附件

用户贴出的：

- Screenshot
- Log
- YAML
- Docker Compose
- Photo

可能是解决问题的关键证据。

归档时保留附件引用。

发布到站内前必须判断：

```text
是否有公开使用权限？
是否包含私人信息？
是否应该重绘 / 匿名化？
```

## 不做

- 不把整段 Discord 对话复制成 Blog
- 不按时间顺序写流水账
- 不把日报直接索引成 SEO 页面
- 不因为一句用户反馈就生成页面
- 不删除原消息链接和时间戳
- 不让 AI 在缺少上下文时猜结论
- 不公开私人频道内容
- 不把未经验证的用户说法写成官方事实

## 转化流程

```text
Discord
↓
消息级归档
↓
日报
↓
周报
↓
Topic 聚类
↓
Intent 拆分
↓
根因判断
↓
页面机会
↓
补充验证
↓
独立站页面
```

核心原则：

> **记录按时间，分析按 Topic，发布按 Intent。**
