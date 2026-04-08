# eediy_publish_site

`eediy_publish_site` 是 `eediy_wiki` 的站点渲染与发布仓。

当前阶段采用 **VitePress bootstrap 方案**：

- 内容本体不保存在这个仓里
- 构建前从 `eediy_public_content` 同步内容到临时 `docs/`
- 先跑通新的发布链路，后续再评估是否升级到 Quartz

## 当前职责

- 站点配置
- 构建与预览脚本
- 内容同步脚本
- GitHub Pages 部署配置

## 不负责的内容

- 私有原始笔记
- LLM 派生 wiki 本体
- 公开内容本体

## 部署约定

- 当前仓已启用 GitHub Actions 驱动的 Pages 发布，公开地址为 `https://www.circlemoon.top/`
- 默认从同 owner 下的 `eediy_public_content` 拉取公开内容。
- 如果公开内容仓的 owner 或仓库名不同，在 `Settings -> Secrets and variables -> Actions -> Variables` 中设置：
  - `PUBLIC_CONTENT_REPOSITORY=<owner>/<repo>`
- 如果 `eediy_public_content` 是 private，在 `Settings -> Secrets and variables -> Actions -> Secrets` 中设置：
  - `PUBLIC_CONTENT_READ_TOKEN=<可读该仓的 PAT>`
- 当前仓的 Pages 已创建为 `workflow` 模式；若你复制这套方案到别的仓，仍应确认目标仓启用了 GitHub Pages。
- 自定义域名必须在 `Settings -> Pages` 中配置；当前仓里的 `CNAME` 仅作辅助记录，不是 GitHub Actions 模式下的权威配置源。
