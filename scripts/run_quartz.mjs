import path from "node:path"
import { spawnSync } from "node:child_process"

const root = process.cwd()
const sourceDir = path.resolve(root, "content")

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
