import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export function resolvePublicContentDir(root = process.cwd()) {
  const envCandidate = process.env.PUBLIC_CONTENT_DIR
    ? path.resolve(root, process.env.PUBLIC_CONTENT_DIR)
    : null

  const candidates = [
    envCandidate,
    path.resolve(root, "./_external/eediy_public_content"),
    path.resolve(root, "../eediy_public_content"),
    path.resolve(root, "../public_content"),
    path.resolve(root, "../../eediy_public_content"),
    path.resolve(root, "../modules/public_content"),
  ].filter(Boolean)

  return candidates.find((dir) => fs.existsSync(dir)) ?? null
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url)

if (isMainModule) {
  const sourceDir = resolvePublicContentDir()
  if (!sourceDir) {
    console.error("未找到 eediy_public_content，请检查目录结构或 PUBLIC_CONTENT_DIR。")
    process.exit(1)
  }

  console.log(sourceDir)
}
