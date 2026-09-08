import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import Home from "./quartz/components/pages/Home"
import { Discovery } from "./quartz/plugins/emitters/discovery"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "circLΣMoon",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "www.circlemoon.top",
    ignorePatterns: ["private", "templates", ".obsidian", "**/README.md", "**/AGENTS.md"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: { name: "Noto Sans SC", weights: [500, 700] },
        header: { name: "Noto Sans SC", weights: [400, 500, 600, 700] },
        body: { name: "Noto Sans SC", weights: [400, 500, 600, 700], includeItalic: false },
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf9fc",
          lightgray: "#e5e1eb",
          gray: "#938b9e",
          darkgray: "#514b5d",
          dark: "#25212d",
          secondary: "#6956a0",
          tertiary: "#7d60ad",
          highlight: "rgba(105, 86, 160, 0.10)",
          textHighlight: "#c9b8eb66",
        },
        darkMode: {
          light: "#17151c",
          lightgray: "#302b39",
          gray: "#9b92a8",
          darkgray: "#d8d2e1",
          dark: "#f3eff8",
          secondary: "#bca8e6",
          tertiary: "#d2bff2",
          highlight: "rgba(188, 168, 230, 0.15)",
          textHighlight: "#8063b366",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({
        renderEngine: "katex",
        katexOptions: {
          strict: "ignore",
        },
      }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage({ pageBody: Home() }),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.CNAME(),
      Discovery(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
