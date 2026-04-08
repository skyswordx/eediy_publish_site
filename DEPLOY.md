# publish_site 部署说明

## 当前结论

`https://www.circlemoon.top/` 现在仍然是旧 Hexo 页面，不是因为新站点没写好，而是因为：

- 域名 `www.circlemoon.top` 目前仍然解析到 `skyswordx.github.io`
- GitHub Pages 仍在服务旧站点内容
- 新的 `eediy_publish_site` 还没有推送到 GitHub，也没有启用新的 Pages 工作流

## 当前仓库已具备

- `public_content -> publish_site` 的同步脚本
- 本地构建成功的 VitePress 发布链路
- GitHub Pages Actions 工作流
- 自定义域名 `CNAME`

## 你需要在 GitHub 做的事

### 1. 创建两个仓库

- `skyswordx/eediy_public_content`
- `skyswordx/eediy_publish_site`

如果你准备保留 `eediy_wiki` 作为 super repo，也建议一并创建对应远程仓库。

### 2. 推送本地仓库

分别把以下本地仓库推送到 GitHub：

- `D:/repo/eediy_public_content`
- `D:/repo/eediy_publish_site`
- `D:/repo/eediy_wiki`

### 3. 在 `eediy_publish_site` 仓开启 GitHub Pages

仓库设置路径：

- `Settings -> Pages`

配置为：

- `Source: GitHub Actions`

### 4. 检查自定义域名

仓库设置路径：

- `Settings -> Pages -> Custom domain`

应填写：

```text
www.circlemoon.top
```

并保持启用 HTTPS。

### 5. 确认仓库可见性

当前工作流会直接 checkout：

```text
skyswordx/eediy_public_content
```

因此这个仓库至少应是：

- public

如果你未来想把它设为 private，则需要改工作流并提供可访问该仓的 token。

## 工作流说明

当前 GitHub Actions 流程是：

1. checkout `eediy_publish_site`
2. checkout `skyswordx/eediy_public_content`
3. 安装 `vitepress`
4. 同步公开内容到 `docs/`
5. 构建并发布到 GitHub Pages

## 迁移后为什么域名会变

当你把 `eediy_publish_site` 推上 GitHub 并启用新的 Pages 工作流后，`www.circlemoon.top` 虽然仍然解析到 GitHub Pages，但 GitHub Pages 服务的仓库内容会从旧站点切换到新站点。

也就是说，**DNS 不一定要改，关键是 GitHub Pages 当前绑定的仓库和内容要换掉**。

## 后续可选优化

- 将 `eediy_public_content` 的仓库名和 owner 抽成 workflow 变量
- 从 VitePress bootstrap 平滑迁移到 Quartz
- 在 Actions 中加入链接检查与 frontmatter 校验
