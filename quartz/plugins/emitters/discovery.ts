import { QuartzEmitterPlugin } from "../types"
import { FullSlug, joinSegments, simplifySlug } from "../../util/path"
import { siteMetadata } from "../../siteMetadata"
import { unescapeHTML } from "../../util/escape"
import { write } from "./helpers"

// Generate from filtered public content so the reading index stays in sync with the site.
export const Discovery: QuartzEmitterPlugin = () => ({
  name: "Discovery",
  async emit(ctx, content) {
    const cfg = ctx.cfg.configuration
    if (!cfg.baseUrl) return []
    const base = `https://${cfg.baseUrl.replace(/\/$/, "")}/`
    const entries = content
      .map(([, file]) => file.data)
      .filter((page) => page.slug && page.slug !== "index")
      .sort((a, b) => a.slug!.localeCompare(b.slug!))
      .map((page) => {
        const title = String(page.frontmatter?.title ?? page.slug).replace(/[\r\n\[\]]/g, " ")
        const url = encodeURI(joinSegments(base, simplifySlug(page.slug!)))
        const summary = unescapeHTML(page.description ?? "")
          .replace(/\s+/g, " ")
          .slice(0, 180)
        return `- [${title}](${url}): ${summary}`
      })
    return Promise.all([
      write({
        ctx,
        slug: "robots" as FullSlug,
        ext: ".txt",
        content: `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`,
      }),
      write({
        ctx,
        slug: "llms" as FullSlug,
        ext: ".txt",
        content: [
          `# ${cfg.pageTitle}`,
          `> ${siteMetadata.description}`,
          `作者公开身份：${siteMetadata.author}。GitHub：${siteMetadata.github}。`,
          "内容性质：个人学习笔记与实践记录。各文章正文包含具体技术内容及相关引用来源。",
          `## 入口\n\n- [首页](${base})\n- [博客](${base}blog/)\n- [Sitemap](${base}sitemap.xml)\n- [RSS](${base}index.xml)`,
          `## 公开阅读索引\n\n${entries.join("\n")}`,
          "",
        ].join("\n\n"),
      }),
    ])
  },
})
