import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const localNodeModules = path.resolve(root, 'node_modules')
const localVitepress = path.resolve(localNodeModules, 'vitepress')

if (fs.existsSync(localVitepress)) {
  console.log(`已找到本地 VitePress: ${localVitepress}`)
  process.exit(0)
}

const candidates = [
  path.resolve(root, '../rl-notes/node_modules'),
  path.resolve(root, '../../rl-notes/node_modules')
]

const externalNodeModules = candidates.find((dir) =>
  fs.existsSync(path.resolve(dir, 'vitepress'))
)

if (!externalNodeModules) {
  console.error('未找到可复用的 VitePress 运行时。请安装依赖后重试。')
  process.exit(1)
}

if (fs.existsSync(localNodeModules) && !fs.lstatSync(localNodeModules).isSymbolicLink()) {
  console.error(`本地已存在真实 node_modules 目录：${localNodeModules}，请手动处理后重试。`)
  process.exit(1)
}

if (!fs.existsSync(localNodeModules)) {
  fs.symlinkSync(externalNodeModules, localNodeModules, 'junction')
  console.log(`已桥接 node_modules -> ${externalNodeModules}`)
} else {
  console.log(`已存在 node_modules 链接：${localNodeModules}`)
}
