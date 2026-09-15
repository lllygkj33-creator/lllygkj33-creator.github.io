# 内容撰写规范

来源：`code.claude.com/docs` 的**原始 markdown**（Mintlify 每个页面都提供 `.md` 版本，例如 `https://code.claude.com/docs/en/overview.md`）。本规范的事实依据来自 6 个页面源码统计：`overview` / `quickstart` / `memory` / `cli-reference` / `hooks` / `mcp`，共约 3.2 万词。

统计口径：去掉代码块和组件标签后的正文。

---

## 1. 页面骨架（顺序固定）

```
H1 标题
> 一句话摘要                 ← 紧跟 H1 的引用行，就是 meta description
第一段：这是什么、能干什么      ← 不铺垫，直接给结论
## 正题小节（2-6 个）
## Next steps / Related resources   ← 收尾必须是链接清单
```

- **H1 后面那行 `>` 是硬规矩**，6 个页面全都有。三页实例：
  - overview：`> Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands...`
  - memory：`> Give Claude persistent instructions with CLAUDE.md files, and let Claude accumulate learnings automatically.`
  - 作用：这行同时是搜索摘要、卡片描述、AI 答案里被摘走的那句。**写它的时候不要复述标题**。
- **第一段不是背景介绍**。overview 的第一段直接说"它是什么 + 能干什么"；memory 第一段直接切入"每个会话都从空白上下文开始，有两种机制跨会话传递知识"。

## 2. 标题规范

| 层级 | 用法 | 证据 |
| --- | --- | --- |
| H1 | 一页一个，名词短语 | `# Overview` |
| H2 | 页面主干，全是名词短语或问句 | `Get started`、`What you can do`、`Next steps`、`What's next?`、`CLAUDE.md vs auto memory` |
| H3 | H2 下的分支，可带动词短语 | `When to add to CLAUDE.md`、`Set up a project CLAUDE.md`、`Write effective instructions` |
| H4 | 仅在超长参考页（cli-reference / hooks）里出现 | hooks.md 里有大量 H4 |

三条写法约定：

1. **教程类页面用 `Step N: 动作` 做 H2**：quickstart 有 `Step 1: Install Claude Code` … `Step 8: Test out other common workflows`，8 步全部同构。
2. **对比关系直接用 `A vs B` 当标题**：`CLAUDE.md vs auto memory`。
3. **H2 不要写成"关于 XXX"**：没有一页用这种空转标题。

## 3. 段落与句子（有量化基线）

| 指标 | 实测值 | 说明 |
| --- | --- | --- |
| 每段句数 | **平均 2.0 句** | 990 个正文段落 |
| 句子长度 | **平均 16.1 词，中位数 14** | 最长 60 词，属于例外 |
| 段落长度 | 大多 1-3 行 | 一屏能放下 3-4 段 |

可执行的含义：**一段只讲一件事，三句以上就该考虑拆段或改成清单**；句子超过 25 词就拆。

## 4. 语气与人称

- **第二人称 "you" 贯穿全文**：`Choose one from the tabs below to get started`、`By the end, you'll understand how to...`。没有"用户""人们""我们应该"这类第三人称。
- **祈使句做操作指令**：`Run /init`、`Verify you trust each server before connecting it`。
- **条件句先说条件**：`If you're using X, do Y`；警告类提示全部是"条件 + 后果"结构。
- **不做营销**：不写"强大的""革命性的"，只陈述能力和边界。

## 5. 提示块（四类语义，别混用）

统计分布：`Note` 19 / `Tip` 14 / `Warning` 11 / `Info` 6（6 个页面合计）。

| 块 | 装什么 | 真实样例 |
| --- | --- | --- |
| `Note` | **定义、术语、适用范围、例外** | hooks.md：`This page uses specific terms for each level: **hook event** for the lifecycle point, **matcher group** for...` |
| `Tip` | **省事的做法、相关延伸阅读** | memory.md：`Run /init to generate a starting CLAUDE.md automatically.` |
| `Warning` | **有破坏性、安全、会踩坑** | mcp.md：`Verify you trust each server before connecting it. Servers that fetch external content can expose you to...` |
| `Info` | **系统自动行为、背景事实** | overview.md：`Native installations automatically update in the background...` |

判定口径：**没有后果的补充信息用 Note；有后果的用 Warning**。Tip 一定是"你可以去做的一件事"，不是"你需要知道的事"。

## 6. 代码示例

- **语言标注从不省略**，实测分布：`json` 95、`bash` 37、`text` 32、`markdown` 3、`yaml` 1。
- 参考站写法带主题参数：` ```bash theme={null} `。本站不写这个参数。
- **命令输出用 `text`**，不假装成可执行代码。
- 命令块前后必有一句说明它干什么，没有"光秃秃的代码墙"。
- **配置类内容优先 JSON 示例**（95 个 json 块说明这是主格式），并且给可直接粘贴的完整片段。

## 7. 表格

用途固定在三类：**参数/字段说明**（cli-reference）、**选项对比**（A vs B）、**速查表**。

- 表头是名词，不用动词短语。
- 单元格短：超过一行的内容改用清单。
- 表格前后各有一句话交代这张表解决什么问题。

## 8. 链接

参考站的内链全部用绝对路径（cli-reference 单页就有 136 条）。**本站不这么做**：

- **正文里不写站内链接**。提到其他页面时直接写页面名称（如「见信息增益」），导航由顶部菜单和左栏自动生成。这样改一个 URL 不需要回头改几十篇文章
- **站外链接照写**，且只给一手来源：官方文档、原始研究、带日期的数据。这是可核实性的基础
- **收尾清单里每条以页面名开头，跟一个冒号 + 一句话说明**，说明"看它能得到什么"：
  ```markdown
  * 信息增益：写什么才算不是「换说法」
  ```

## 9. 收尾

6 个页面的最后一个 H2 全是链接清单，标题三选一：`Next steps` / `Related resources` / `What's next?`（quickstart 用 `Getting help`）。

- 上面常用一句过渡：`Once you've installed Claude Code, these guides help you go deeper.`
- 清单 3-5 条，每条以**页面名**开头 + 冒号 + 一句收益说明（不写链接）。
- **不放"总结"段**，不重复正文。

## 10. 组件对照（参考站 → 本站）

参考站的组件用量（6 页合计）：`<Step>` 28 / `<Tab>` 26 / `<Note>` 19 / `<Tip>` 14 / `<Accordion>` 13 / `<Warning>` 11 / `<Steps>` 10 / `<Tabs>` 9 / `<Info>` 6 / `<Card>` 4 / `<Frame>` 2（Mintlify 专有组件）。

| 参考站 | 本站现状 | 替代写法 |
| --- | --- | --- |
| `<Note>` `<Tip>` `<Warning>` `<Info>` | 暂无可渲染的提示块 | 先用引用块 `>` 顶，块首写 `注意：` / `提示：` / `警告：` |
| `<Tabs>` / `<Tab>` | 无 | 拆成 H3 小节分别写 |
| `<Steps>` / `<Step>` | 无 | `## Step N: 动作` 的 H2（quickstart 也是这么写的） |
| `<Accordion>` | 无 | 低频内容直接写正文，别折叠 |
| `<Card>` `<Frame>` | 无 | 用普通列表和图片 |

> 本站的取舍：**参考站靠内链把页面织成网，本站不写内链**——代价是少了一层发现路径，收益是改 URL 时不需要维护任何文章。

> 想要真提示块的话，本站加 4 类调用块需要一个小 remark 插件（约 15 行，无新依赖），说一声就加。

## 11. 页面模板

```markdown
---
title: 页面标题（= H1，同时也是左栏目录名）
description: 一句话，40-60 字，不复述标题
order: 10          # 左栏排序，小的在前
updated: 2026-01-15
---

> 摘要一行：这是什么、解决什么问题。这段会被搜索和 AI 直接摘走。

第一段：不铺垫，直接给结论。第二句可以补"能做到什么程度"。

## 怎么做

一段话交代这一步要达成什么。

1. 第一步
2. 第二步

```bash
实际可跑的命令
```

> 注意：这里补一句例外或适用范围。

## 常见坑

- 坑一：条件 + 后果
- 坑二：条件 + 后果

## Next steps

* 相关页面：看它能得到什么
* 另一个页面：看它能得到什么
```

## 12. 定稿前检查

- [ ] H1 下面有 `>` 摘要行，且没有复述标题
- [ ] 每个 H2 是名词短语或问句，没有"关于…"式空标题
- [ ] 段落 ≤3 句，句子 ≤25 词
- [ ] 全文第二人称，无"用户可以…"式第三人称
- [ ] 有后果的提醒用了警告写法，且条件在前、后果在后
- [ ] 每个代码块标了语言，输出用 `text`
- [ ] 正文里没有站内链接（只写页面名称），收尾清单每条有一句收益说明
- [ ] 没有总结段
