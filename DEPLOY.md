# 部署说明

- 仓库：`skyswordx/eediy_publish_site`
- 框架：Quartz 4；内容：本仓 `content/`
- 发布：GitHub Actions → GitHub Pages
- 域名：`www.circlemoon.top`

## 发布流程

1. Checkout 本仓，保留 Git 历史以供文章日期读取。
2. 安装 Node 22，将 npm 对齐到 10.9.2，运行 `npm ci`。
3. `npm run build` 读取 `content/`，生成 `public/`。
4. 上传 Pages artifact 并部署。

推送 `main` 自动触发；也可以在 Actions 页面手动运行 `Deploy Quartz Site to GitHub Pages`。

```bash
gh workflow run deploy.yml --repo skyswordx/eediy_publish_site
gh run list --repo skyswordx/eediy_publish_site --limit 3
```

## 本地检查

```bash
npm ci
npm run build
node scripts/check_metadata.mjs
npm run check
```

确认首页、头像、背景、文章链接、搜索和 RSS。旧文章下线后应从生成页面、搜索索引和 sitemap 中消失。

## 配置边界

内容与样式同仓分目录管理；不再检出第二个内容仓，不需要 `PUBLIC_CONTENT_DIR`、`PUBLIC_CONTENT_REPOSITORY` 或 `PUBLIC_CONTENT_READ_TOKEN`。

页面入口是 `content/index.md` 和 `content/blog/index.md`；公开图片放在 `content/img/`，网址保持 `/img/…`。站点框架资源仍放在 `quartz/static/`。

README 和 AGENTS 等说明文件由现有 Quartz `ignorePatterns` 排除。构建产物 `public/` 不提交。
