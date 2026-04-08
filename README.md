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
- 未来部署配置

## 不负责的内容

- 私有原始笔记
- LLM 派生 wiki 本体
- 公开内容本体
