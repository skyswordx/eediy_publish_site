import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

const output = path.resolve("public")
const files = await readdir(output, { recursive: true })
let checked = 0

async function checkLocalTarget(href) {
  const url = new URL(href)
  assert.equal(url.origin, "https://www.circlemoon.top")
  const pathname = decodeURIComponent(url.pathname).replace(/^\//, "")
  // Article slugs can contain dots (e.g. libxxx.so); match actual build outputs.
  const candidates = [pathname, `${pathname}.html`, `${pathname}index.html`]
  assert.ok(
    candidates.some((filename) => files.includes(filename)),
    `Missing target: ${href}`,
  )
}

for (const filename of files.filter((file) => file.endsWith(".html"))) {
  const html = await readFile(path.join(output, filename), "utf8")
  if (html.includes('http-equiv="refresh"')) continue
  if (filename === "404.html") {
    assert.match(html, /name="robots" content="noindex, follow"/)
    assert.doesNotMatch(html, /rel="canonical"/)
    continue
  }
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)]
  assert.equal(canonicals.length, 1, filename)
  const href = canonicals[0][1]
  await checkLocalTarget(href)
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  assert.equal(scripts.length, 1, filename)
  const data = JSON.parse(scripts[0][1])
  assert.equal(data["@context"], "https://schema.org")
  const graph = data["@graph"]
  const page = graph.find((node) => node["@type"] === "WebPage")
  assert.equal(page.url, href)
  assert.ok(page.description.length > 0, filename)
  assert.equal(
    graph.find((node) => node["@type"] === "Person").sameAs[0],
    "https://github.com/skyswordx",
  )
  assert.match(html, /property="og:site_name"/)
  assert.match(html, /rel="alternate" type="text\/plain"/)
  if (filename === "index.html") {
    assert.ok(html.includes(`<p>${page.description}</p>`), "Visible profile matches metadata")
  }
  checked++
}

const llms = await readFile(path.join(output, "llms.txt"), "utf8")
const links = [...llms.matchAll(/\]\((https:\/\/[^)]+)\)/g)]
assert.ok(checked > 0 && links.length > 4)
for (const [, href] of links) await checkLocalTarget(href)
const robots = await readFile(path.join(output, "robots.txt"), "utf8")
assert.match(robots, /User-agent: \*\nAllow: \/\n/)
assert.match(robots, /Sitemap: https:\/\/www\.circlemoon\.top\/sitemap\.xml/)
console.log(
  `Metadata verified: ${checked} HTML pages, ${links.length} reading-index links, robots.txt`,
)
