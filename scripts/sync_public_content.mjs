import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const envCandidate = process.env.PUBLIC_CONTENT_DIR
  ? path.resolve(root, process.env.PUBLIC_CONTENT_DIR)
  : null

const candidates = [
  envCandidate,
  path.resolve(root, './_external/eediy_public_content'),
  path.resolve(root, '../eediy_public_content'),
  path.resolve(root, '../public_content'),
  path.resolve(root, '../../eediy_public_content'),
  path.resolve(root, '../modules/public_content')
].filter(Boolean)

const sourceDir = candidates.find((dir) => fs.existsSync(dir))

if (!sourceDir) {
  console.error('未找到 public_content 仓库，请检查目录结构。')
  process.exit(1)
}

const targetDir = path.resolve(root, 'docs')
fs.rmSync(targetDir, { recursive: true, force: true })
fs.mkdirSync(targetDir, { recursive: true })

const skipNames = new Set(['.git', '.gitignore', 'README.md', 'AGENTS.md'])

function copyRecursive(src, dest) {
  const stats = fs.statSync(src)
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src)) {
      if (skipNames.has(entry)) continue
      copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
    return
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync(src, dest)
}

for (const entry of fs.readdirSync(sourceDir)) {
  if (skipNames.has(entry)) continue
  copyRecursive(path.join(sourceDir, entry), path.join(targetDir, entry))
}

const vitepressSourceDir = path.resolve(root, '.vitepress')
const vitepressTargetDir = path.resolve(targetDir, '.vitepress')
if (fs.existsSync(vitepressSourceDir)) {
  copyRecursive(vitepressSourceDir, vitepressTargetDir)
}

console.log(`已同步 public_content: ${sourceDir} -> ${targetDir}`)
