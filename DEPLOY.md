# publish_site 部署说明

## 当前状态

- `skyswordx/eediy_publish_site` 已启用 GitHub Pages
- 发布模式为 `workflow`
- 自定义域名 `www.circlemoon.top` 已绑定到当前仓
- 旧 `skyswordx.github.io` 已解除 `www.circlemoon.top` 绑定
- 最近一次完整部署链路已成功跑通

## 当前发布链路

1. checkout `eediy_publish_site`
2. checkout `eediy_public_content`
3. 安装站点依赖
4. 补装 Linux runner 需要的 Rollup 原生包
5. 同步公开内容到 `docs/`
6. 构建 VitePress 站点
7. 上传 Pages artifact
8. 部署到 GitHub Pages

## 首次落地时踩过的坑

### 1. Windows 本机把 GitHub 指到了 `127.0.0.1`

排查命令：

```powershell
Resolve-DnsName github.com
Test-NetConnection github.com -Port 443
Get-Content "C:\Windows\System32\drivers\etc\hosts"
```

如果 `github.com` 被第三方工具劫持到 `127.0.0.1`，先解除相关 `hosts` 条目，再刷新 DNS。

### 2. `gh auth login` 在不稳定网络下不一定可靠

当前可复用方案是：

- 让 Git Credential Manager 负责存储 GitHub 凭据
- 临时从 `git credential fill` 取出 token 注入 `GH_TOKEN`
- 用 `gh` 完成仓库创建、Actions 查询和 Pages API 调用

### 3. HTTPS push 不稳定时，优先走 SSH over 443

推荐在 `~/.ssh/config` 中为 `github.com` 配置：

```sshconfig
Host github.com
  HostName ssh.github.com
  Port 443
  User git
  IdentityFile C:\Users\c1rcLEmoon\.ssh\id_rsa
  IdentitiesOnly yes
```

验证命令：

```powershell
ssh -T github.com
```

### 4. Pages 站点不存在时，`actions/configure-pages` 会直接失败

这时不要只改 workflow，要先创建 Pages 站点：

```powershell
gh api -X POST repos/<owner>/<site_repo>/pages -f build_type=workflow -f source[branch]=main -f source[path]=/
```

### 5. Linux runner 上可能缺少 Rollup 原生包

如果 Actions 日志里出现：

```text
Cannot find module @rollup/rollup-linux-x64-gnu
```

就在 workflow 里补：

```yaml
- name: Install dependencies
  run: npm install

- name: Install Linux Rollup runtime
  run: npm install --no-save @rollup/rollup-linux-x64-gnu
```

## 日常验证命令

```powershell
gh run list --repo skyswordx/eediy_publish_site --limit 3
gh api repos/skyswordx/eediy_publish_site/pages
curl.exe -I https://www.circlemoon.top/
curl.exe -L https://www.circlemoon.top/
```

重点确认：

- 最新部署任务为 `success`
- `build_type` 为 `workflow`
- `cname` 为 `www.circlemoon.top`
- 首页返回的是新 VitePress 站点，而不是旧 Hexo 内容

## 变更后记得同步更新

只要以下任一事实发生变化，就要同步更新本文档与相关说明：

- GitHub 认证方式
- 远程仓库 owner / repo 名称
- Pages 发布模式
- 自定义域名绑定
- CI 构建依赖或补丁
