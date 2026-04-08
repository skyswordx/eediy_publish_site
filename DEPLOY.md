# publish_site 部署说明

## 当前状态

- 仓库：`skyswordx/eediy_publish_site`
- 发布框架：Quartz 4
- 发布模式：GitHub Pages `workflow`
- 内容来源：`eediy_public_content`
- 自定义域名：`www.circlemoon.top`

## 当前发布链路

1. checkout `eediy_publish_site`
2. checkout `eediy_public_content`
3. 安装 Node 22 依赖
4. 对齐 npm 版本到 `10.9.2`
5. 用 Quartz 直接读取 `./_external/eediy_public_content`
6. 构建静态产物到 `public/`
7. 上传 Pages artifact
8. 部署到 GitHub Pages

## 关键文件

- workflow: `.github/workflows/deploy.yml`
- Quartz 配置：`quartz.config.ts`
- Quartz 布局：`quartz.layout.ts`
- 内容目录解析：`scripts/sync_public_content.mjs`
- Quartz 启动入口：`scripts/run_quartz.mjs`

## 首次迁移中踩过的坑

### 1. Quartz 当前实际上要求更高版本的 Node 22

本次本地验证发现：

- 系统 `Node 22.10.0 + npm 10.9.0` 不足以跑通 Quartz 当前依赖链
- 便携版 `Node 22.20.0 + npm 10.9.3` 可以正常安装与构建

这意味着：

- workflow 里不能只写 “Node 22”，还需要显式对齐 npm
- 本地如果版本略旧，优先用便携版或版本管理器验证

### 2. 不要再复制一份内容到站点仓

Quartz 官方支持 `-d <directory>` 直接指定内容目录。

这次升级后不再：

- 把 `eediy_public_content` 复制到本地 `docs/`
- 维护第二份发布候选内容镜像

改为：

- 站点仓直接消费内容仓
- 保持公开内容单一真源

### 3. 根目录说明文件会被 Quartz 误发出去

由于 Quartz 直接读取内容仓目录，像 `README.md`、`AGENTS.md` 这类仓库说明文件也可能被识别为页面。

当前已通过 `quartz.config.ts` 中的 `ignorePatterns` 排除：

- `**/README.md`
- `**/AGENTS.md`

### 4. 旧文章里的数学写法会产生 KaTeX 告警

当前旧文中存在一批“中文字符写在数学模式里”的历史写法。

这不会阻塞构建，但会污染日志。

当前已将 KaTeX 严格模式降为 `ignore`，保证迁移期先上线；后续可以在内容仓里分批清理。

## 日常验证命令

```bash
gh run list --repo skyswordx/eediy_publish_site --limit 3
gh api repos/skyswordx/eediy_publish_site/pages
curl.exe -I https://www.circlemoon.top/
curl.exe -L https://www.circlemoon.top/
```

重点确认：

- 最新 workflow 为 `success`
- `build_type` 为 `workflow`
- `cname` 为 `www.circlemoon.top`
- 返回内容来自 Quartz 新站点，而不是旧 Hexo / VitePress 残留

## 本地验证命令

如果本机系统 Node 不满足要求，可用便携版 Node：

```powershell
& "D:/repo/_tmp_node_v22_20_0/node-v22.20.0-win-x64/npm.cmd" install
& "D:/repo/_tmp_node_v22_20_0/node-v22.20.0-win-x64/npm.cmd" run build
& "D:/repo/_tmp_node_v22_20_0/node-v22.20.0-win-x64/npm.cmd" run check
```

## 发生这些变化时，记得同步更新本文

- GitHub 认证方式变化
- Pages 发布模式变化
- 自定义域名变化
- Quartz 主版本变化
- 内容目录解析规则变化
- 公开内容仓 owner / repo 变化
