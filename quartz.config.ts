import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import Home from "./quartz/components/pages/Home"

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
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        // OG images need a downloadable font; custom.scss supplies the browser's Butterfly stack.
        title: "Noto Sans SC",
        header: "Noto Sans SC",
        body: "Noto Sans SC",
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
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
