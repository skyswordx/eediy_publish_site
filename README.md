# circLΣMoon · eediy_publish_site

公开正文、Quartz 样式与发布流程统一在本仓维护。网站：<https://www.circlemoon.top/>。

## 内容与目录

```text
AAA/Notes                         私有写作源头（在本仓之外）
content/
  index.md                        首页内容
  blog/                           逐篇选定、整理后的公开正文
  img/                            公开图片，网址仍为 /img/…
quartz/                           Quartz 渲染器与现有样式
scripts/                          构建及验证工具
quartz.config.ts                  站点配置
quartz.layout.ts                  页面布局
.github/workflows/deploy.yml       构建并发布到 GitHub Pages
```

日常仍在 AAA/Notes 写作，公开稿才进入 `content/blog/`。公开稿可通过稳定的 `canonical_id` 关联源笔记；更新时先检查差异，保留面向读者的编辑整理。

不再依赖 `eediy_public_content`、外部内容目录或 submodule。原内容仓停用；旧文章已存于 AAA/References，不会自动重新发布。

## 本地使用

要求 Node >= 22、npm >= 10.9.2。

```bash
npm ci
npm run content:dir
npm run dev
```

`npm run dev` 启动预览；`npm run build` 从 `content/` 构建到 `public/`。文章、首页和图片更新与样式更新使用同一个提交和部署流程。

```bash
npm run build
node scripts/check_metadata.mjs
npm run check
```

`public/`、`node_modules/`、`.quartz-cache/` 不提交，也不需要自动备份。不要在公开仓中放入整个私有笔记库、账号凭证或本机绝对路径。

## 发布与元信息

推送 `main` 自动部署，也可手动运行部署工作流。域名和页面样式沿用现有配置，详见 [DEPLOY.md](DEPLOY.md)。

`quartz/siteMetadata.ts` 维护公开身份和介绍；页面提供 canonical、Open Graph 与结构化数据，`Discovery` 从公开内容生成 `llms.txt` 和 `robots.txt`。这些信息用于说明和索引，不保证搜索排名。

Notes 选稿工具、知乎导出、小红书卡片和公众号排版属于后续工作，目前尚未实现。
