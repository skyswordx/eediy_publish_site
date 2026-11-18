# eediy_publish_site 约定

## 仓库定位
- 本仓统一维护公开正文、Quartz 样式和发布流程。
- 私有写作源头是本机 `AAA/Notes`；仅逐篇选定、整理后的公开稿进入 `content/blog/`。
- 用户已确定采用单仓结构，替代原来的内容仓与站点仓分离方式。

## 目录与职责
- `content/index.md`：首页内容；`content/blog/`：公开正文；`content/img/`：公开图片。
- `quartz/`、`quartz.config.ts`、`quartz.layout.ts`：现有渲染器、样式和布局。
- `scripts/`：构建与发布工具；`.github/workflows/deploy.yml`：GitHub Pages 部署。
- `public/`、`node_modules/` 和 `.quartz-cache/` 是本地生成产物，不提交。

## 内容维护
- 保持 Markdown-first；公开稿通过稳定的 `canonical_id` 与源笔记关联，避免重复导出。
- 更新已有公开稿时先检查差异，保留公开版本中的编辑整理。
- 不将整个 Notes 目录、私有素材、完整本机路径或平台凭证提交到本仓。
- 旧文章已存于 AAA/References，未经选稿不恢复到公开目录。

## 验证
- `npm run build` 构建本仓 `content/`；`node scripts/check_metadata.mjs` 检查站点元信息。
- 修改内容不应改动网站样式；修改构建流程须验证首页、图片、搜索索引和 Pages 部署。
