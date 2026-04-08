import path from "node:path"
import { spawnSync } from "node:child_process"
import { resolvePublicContentDir } from "./sync_public_content.mjs"

const root = process.cwd()
const sourceDir = resolvePublicContentDir(root)

if (!sourceDir) {
  console.error("未找到 eediy_public_content，请检查目录结构或 PUBLIC_CONTENT_DIR。")
  process.exit(1)
}

const quartzCli = path.resolve(root, "quartz/bootstrap-cli.mjs")
const args = [quartzCli, "build", "-d", sourceDir, ...process.argv.slice(2)]

console.log(`[eediy_publish_site] Quartz content dir: ${sourceDir}`)

const result = spawnSync(process.execPath, args, {
  cwd: root,
  env: process.env,
  stdio: "inherit",
})

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 0)
