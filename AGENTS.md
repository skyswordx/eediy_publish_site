# eediy_publish_site 约定

## 仓库定位
- 这是发布站点仓，不是知识本体仓。
- 内容默认来自 `eediy_public_content`，通过同步脚本生成到本仓的 `docs/`。

## 原则
- 站点仓只负责渲染、构建、部署。
- 不手工长期维护 `docs/` 里的正文。
- 若需调整内容，应优先回到 `eediy_public_content` 或更上游的私有 / 派生层。

## 当前技术路线
- 当前 bootstrap 方案使用 VitePress。
- 后续若迁移到 Quartz，必须保持“内容仓与站点仓分离”的原则不变。
