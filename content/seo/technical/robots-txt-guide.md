---
title: "robots.txt"
description: "robots.txt 用来告诉搜索引擎哪些路径可以抓、哪些路径不该抓，但它不能代替 noindex，也不能真正保护敏感内容。"
order: 2
updated: "2026-09-15"
---

> robots.txt 的作用只有一句话：**告诉爬虫哪些路径可以抓取、哪些路径不建议抓取，从而控制抓取资源，而不是直接控制页面是否收录。**

很多 SEO 问题都来自一个误解：把“禁止抓取”当成“禁止收录”。这两件事不是一回事。

## robots.txt 在控制什么

robots.txt 控制的是 **crawl**，也就是爬虫能不能访问某个路径。

最基本的结构是：

```txt
User-agent: *
Disallow: /admin/
```

意思是：

```text
所有爬虫
↓
不要抓取 /admin/ 目录
```

如果页面已经被外部链接发现，即使它被 robots.txt 阻止，搜索引擎仍有可能知道这个 URL 存在。

所以：

> **robots.txt 管抓取，不等于管索引。**

## 最常用的四个字段

### User-agent

指定规则针对哪个爬虫。

```txt
User-agent: *
```

`*` 代表所有遵守 robots.txt 的爬虫。

也可以单独指定某类爬虫：

```txt
User-agent: ExampleBot
Disallow: /private/
```

### Disallow

禁止抓取某个路径。

```txt
Disallow: /search/
Disallow: /checkout/
```

常用于：

- 站内搜索结果页
- 登录后台
- 购物车
- 重复参数页
- 没有搜索价值的系统目录

### Allow

在被禁止的大目录里重新开放某些路径。

```txt
User-agent: *
Disallow: /account/
Allow: /account/help/
```

意思是 `/account/` 大部分不抓，但 `/account/help/` 可以抓。

### Sitemap

告诉爬虫站点地图在哪里。

```txt
Sitemap: https://www.xxxx.com/sitemap.xml
```

这不是必须字段，但通常建议保留。

## 一个标准 robots.txt 示例

一个普通内容站可以从非常简单的版本开始：

```txt
User-agent: *
Disallow: /admin/
Disallow: /search/
Disallow: /checkout/

Sitemap: https://www.xxxx.com/sitemap.xml
```

如果站点没有这些目录，甚至可以写成：

```txt
User-agent: *
Disallow:

Sitemap: https://www.xxxx.com/sitemap.xml
```

空的 `Disallow:` 代表允许抓取。

**不要为了“看起来专业”随便屏蔽目录。**

## robots.txt 不能代替 noindex

这是最常见的错误。

如果你真正想表达的是：

> 这个页面不要出现在搜索结果里

应该使用：

```html
<meta name="robots" content="noindex">
```

而不是只写：

```txt
Disallow: /example-page/
```

因为一旦禁止抓取，搜索引擎可能反而看不到页面里的 `noindex`。

所以一个常见错误是：

```text
先 robots.txt 禁止抓取
+
再在页面里写 noindex
```

爬虫连页面都进不去，就不一定能读取 `noindex`。

更稳妥的逻辑是：

```text
要节省抓取资源
→ robots.txt

要阻止收录
→ noindex

要真正保护内容
→ 登录、鉴权、权限控制
```

## 哪些页面适合屏蔽

robots.txt 更适合处理“没有必要被抓”的页面，而不是所有低价值页面。

例如：

```txt
Disallow: /internal-search/
Disallow: /cart/
Disallow: /checkout/
Disallow: /wp-admin/
```

但对这些页面要谨慎：

```text
产品页
分类页
分页
筛选页
JS / CSS
图片资源
```

特别是 CSS 和 JavaScript，如果被误屏蔽，搜索引擎可能无法正常渲染页面。

不要使用这种过度规则：

```txt
Disallow: /assets/
Disallow: /js/
Disallow: /css/
```

除非你非常确定它们不参与页面渲染。

## 通配符怎么用

常见写法包括 `*` 和 `$`。

例如阻止带特定参数的 URL：

```txt
Disallow: /*?sort=
```

阻止所有 `.pdf` 结尾的 URL：

```txt
Disallow: /*.pdf$
```

但参数规则非常容易误伤。

例如：

```txt
Disallow: /*?
```

可能把所有带参数的页面都挡掉。

如果你的站有：

```text
?utm_source=
?page=
?sort=
?filter=
```

不要一次性全部处理，先确认哪些参数真的制造重复抓取。

## 最常见的 robots.txt 错误

### 1. 误屏蔽整站

```txt
User-agent: *
Disallow: /
```

这代表不允许抓取整个网站。

上线前一定检查。

### 2. 把 robots.txt 当安全工具

robots.txt 是公开文件。

任何人都可以访问：

```text
https://www.xxxx.com/robots.txt
```

所以不要把敏感目录写进去以后就认为安全。

真正敏感的内容应该使用：

- 登录
- 权限验证
- 服务端鉴权

### 3. 屏蔽需要排名的页面

例如：

```txt
Disallow: /blog/
```

如果博客本来就是 SEO 流量来源，这等于主动阻止搜索引擎抓正文。

### 4. 同时制造矛盾规则

例如：

```txt
Disallow: /docs/
Allow: /docs/
```

这种写法增加理解成本，也容易让后续维护的人误判。

规则越简单越好。

## 怎么检查 robots.txt

修改后至少检查三件事：

```text
1. 文件是否能直接访问
2. 重要页面有没有被误挡
3. Sitemap 地址是否正确
```

也可以手动对照：

```txt
User-agent: *
Disallow: /search/
```

然后确认你真正希望排名的 URL 不在 `/search/` 下面。

每次网站目录结构变化、CMS 更换、迁站或新增大量参数页后，都应该重新检查一次 robots.txt。

> **robots.txt 的目标不是“挡得越多越好”，而是让爬虫把时间花在真正值得抓取的页面上。**
