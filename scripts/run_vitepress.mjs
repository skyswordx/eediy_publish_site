import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const action = process.argv[2] || 'build'

const ensureRuntimeScript = path.resolve(root, 'scripts/ensure_vitepress_runtime.mjs')
const ensureRuntimeResult = spawnSync(process.execPath, [ensureRuntimeScript], { stdio: 'inherit' })
if (ensureRuntimeResult.status !== 0) process.exit(ensureRuntimeResult.status ?? 1)

const syncScript = path.resolve(root, 'scripts/sync_public_content.mjs')
const syncResult = spawnSync(process.execPath, [syncScript], { stdio: 'inherit' })
if (syncResult.status !== 0) process.exit(syncResult.status ?? 1)

const vitepressCandidates = [
  path.resolve(root, 'node_modules/vitepress/dist/node/cli.js'),
  path.resolve(root, '../rl-notes/node_modules/vitepress/dist/node/cli.js'),
  path.resolve(root, '../../rl-notes/node_modules/vitepress/dist/node/cli.js'),
  path.resolve(root, '../modules/publish_site/node_modules/vitepress/dist/node/cli.js')
]

const vitepressCli = vitepressCandidates.find((file) => fs.existsSync(file))
if (!vitepressCli) {
  console.error('未找到 VitePress CLI。请先安装依赖，或确保本地存在可复用的 VitePress。')
  process.exit(1)
}

const args = [vitepressCli, action, 'docs']
if (action === 'dev') args.push('--host', '0.0.0.0')

const result = spawnSync(process.execPath, args, { stdio: 'inherit' })
process.exit(result.status ?? 1)
