# publish_site 部署说明

## 当前结论

`https://www.circlemoon.top/` 现在仍然是旧 Hexo 页面，不是因为新站点没写好，而是因为：

- 域名 `www.circlemoon.top` 目前仍然解析到 `skyswordx.github.io`
- GitHub Pages 仍在服务旧仓对应的旧站点内容
- 新的 `eediy_publish_site` 还没有推送到 GitHub，也没有启用新的 Pages 工作流
- 截至 `2026-04-08`，本地 `eediy_publish_site` 构建已通过，但远程发布链路尚未接管这个域名

## 当前仓库已具备

- `public_content -> publish_site` 的同步脚本
- 本地构建成功的 VitePress 发布链路
- GitHub Pages Actions 工作流
- 自定义域名记录文件 `CNAME`

## 仓库内已经完成的配置

- `npm run docs:build` 可在本地成功完成
- 构建前会自动同步 `eediy_public_content` 到 `docs/`
- GitHub Actions 会默认拉取同 owner 下的 `eediy_public_content`
- 如果内容仓不是默认位置，可通过 Actions 变量覆盖
- 如果内容仓是 private，可通过 Actions Secret 提供只读 token

## 你需要在 GitHub 做的事

### 1. 创建两个仓库

- `skyswordx/eediy_public_content`
- `skyswordx/eediy_publish_site`

如果你准备保留 `eediy_wiki` 作为 super repo，也建议一并创建对应远程仓库。

### 2. 推送本地仓库

分别把以下本地仓库推送到 GitHub。推荐顺序是先推 `eediy_public_content`，再推 `eediy_publish_site`：

- `D:/repo/eediy_public_content`
- `D:/repo/eediy_publish_site`
- `D:/repo/eediy_wiki`

可直接使用下面这组命令，仓库 owner 先按 `skyswordx` 写；如果你最终用的是别的 owner，把其中 owner 改掉即可：

```bash
git -C "D:/repo/eediy_public_content" remote add origin "https://github.com/skyswordx/eediy_public_content.git"
git -C "D:/repo/eediy_public_content" push -u origin main

git -C "D:/repo/eediy_publish_site" remote add origin "https://github.com/skyswordx/eediy_publish_site.git"
git -C "D:/repo/eediy_publish_site" push -u origin main

git -C "D:/repo/eediy_wiki" remote add origin "https://github.com/skyswordx/eediy_wiki.git"
git -C "D:/repo/eediy_wiki" push -u origin main
```

### 3. 在 `eediy_publish_site` 仓开启 GitHub Pages

仓库设置路径：

- `Settings -> Pages`

配置为：

- `Source: GitHub Actions`

### 4. 在旧 Hexo 对应仓移除旧域名绑定

如果旧站点仓仍然绑定着 `www.circlemoon.top`，新仓切换时很容易冲突。

旧仓设置路径：

- `旧 Hexo 仓库 -> Settings -> Pages`

建议操作：

- 如果旧仓仍在使用 `www.circlemoon.top`，先点 `Remove` 移除这个 custom domain
- 或者直接先停用旧仓 Pages

### 5. 配置新站点自定义域名

仓库设置路径：

- `Settings -> Pages -> Custom domain`

应填写：

```text
www.circlemoon.top
```

并保持启用 HTTPS。

注意：

- GitHub 官方文档说明：如果你使用的是**自定义 GitHub Actions 工作流部署 Pages**，仓库里的 `CNAME` 文件不会作为权威配置来源，因此这里必须在 GitHub 页面设置里填一次自定义域名。

### 6. 确认仓库可见性

当前工作流会直接 checkout：

```text
<owner>/eediy_public_content
```

因此这个仓库至少应是：

- public

如果你未来想把它设为 private，则需要在 `eediy_publish_site` 仓里设置 Secret：

```text
PUBLIC_CONTENT_READ_TOKEN
```

当前工作流已经支持这个 Secret。

### 7. 可选：覆盖默认公开内容仓位置

如果你的公开内容仓不是：

```text
<当前 GitHub owner>/eediy_public_content
```

就在 `eediy_publish_site` 仓设置：

- `Settings -> Secrets and variables -> Actions -> Variables`

新增：

```text
PUBLIC_CONTENT_REPOSITORY=<owner>/<repo>
```

## 工作流说明

当前 GitHub Actions 流程是：

1. checkout `eediy_publish_site`
2. checkout `PUBLIC_CONTENT_REPOSITORY` 或默认的 `<owner>/eediy_public_content`
3. 安装 `vitepress`
4. 同步公开内容到 `docs/`
5. 构建并发布到 GitHub Pages

## 迁移后为什么域名会变

当你把 `eediy_publish_site` 推上 GitHub 并启用新的 Pages 工作流后，`www.circlemoon.top` 虽然仍然解析到 GitHub Pages，但 GitHub Pages 服务的仓库内容会从旧站点切换到新站点。

也就是说，**DNS 不一定要改，关键是 GitHub Pages 当前绑定的仓库和内容要换掉**。

## 官方文档

- GitHub Pages 自定义域名总览：https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- 管理自定义域名：https://docs.github.com/articles/setting-up-a-custom-domain
- 验证自定义域名：https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- GitHub Pages HTTPS：https://docs.github.com/articles/securing-your-github-pages-site-with-https

## 后续可选优化

- 从 VitePress bootstrap 平滑迁移到 Quartz
- 在 Actions 中加入链接检查与 frontmatter 校验
