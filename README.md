# eediy_publish_site

`eediy_publish_site` 是 `eediy_wiki` 体系里的公开发布站点仓。

它只负责 3 件事：

- 持有 Quartz 站点框架与主题配置
- 从 `eediy_public_content` 读取公开内容并构建
- 通过 GitHub Actions 发布到 GitHub Pages

它不负责保存公开内容本体，也不承载私有笔记、LLM 派生 wiki 或项目原始资料。

## 当前架构

- 内容仓：`eediy_public_content`
- 站点仓：`eediy_publish_site`
- 渲染框架：Quartz 4
- 线上域名：`https://www.circlemoon.top/`

这次升级后，`publish_site` 不再把内容复制到本地 `docs/` 再构建，而是直接把 `eediy_public_content` 当作 Quartz 的内容目录输入。

这意味着：

- 公开内容只有一份文件本体
- 发布站点和内容仓职责彻底分离
- 后续切换主题、插件、自动化规则时，不需要再碰内容仓结构

## 本地开发

默认会自动按以下优先级寻找公开内容仓：

1. `PUBLIC_CONTENT_DIR`
2. `./_external/eediy_public_content`
3. `../eediy_public_content`
4. `../public_content`
5. `../../eediy_public_content`
6. `../modules/public_content`

常用命令：

```bash
npm run content:dir
npm run dev
npm run build
npm run check
```

说明：

- `npm run content:dir` 只输出当前解析到的内容仓目录
- `npm run dev` 用 Quartz 本地预览公开内容
- `npm run build` 构建静态产物到 `public/`
- `npm run check` 执行 `tsc --noEmit` 与 Prettier 校验

## 环境要求

Quartz 官方当前要求：

- `Node >= 22`
- `npm >= 10.9.2`

本地如果系统 Node 版本略旧，可以像这次迁移一样使用便携版 Node 先完成验证，不必立即污染全局环境。

## GitHub Pages 约定

- 发布模式：GitHub Actions workflow
- 产物目录：`public/`
- 自定义域名：`www.circlemoon.top`
- 默认读取同 owner 下的 `eediy_public_content`

如果公开内容仓库不是默认仓名或不在同 owner 下：

- 在仓库 Variables 里设置 `PUBLIC_CONTENT_REPOSITORY=<owner>/<repo>`

如果公开内容仓是 private：

- 在仓库 Secrets 里设置 `PUBLIC_CONTENT_READ_TOKEN=<可读 PAT>`

## 设计边界

- 不在这里直接写公开文章正文
- 不在这里保存私有素材
- 不在这里维护项目级原始上下文
- 不让站点框架反向污染内容仓

站点仓应该始终保持为一个可替换的渲染层，而不是新的内容屎山。
