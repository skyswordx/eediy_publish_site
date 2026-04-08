import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

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
        title: "Noto Serif SC",
        header: "Noto Serif SC",
        body: "Noto Sans SC",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#fffaf1",
          lightgray: "#e4dccd",
          gray: "#b7ab96",
          darkgray: "#4f463d",
          dark: "#1f1a14",
          secondary: "#2f6b62",
          tertiary: "#bd7d3a",
          highlight: "rgba(47, 107, 98, 0.12)",
          textHighlight: "#ffe08a88",
        },
        darkMode: {
          light: "#111413",
          lightgray: "#28312e",
          gray: "#55635e",
          darkgray: "#d7ddd8",
          dark: "#f4f1ea",
          secondary: "#8fd0c5",
          tertiary: "#f0b36e",
          highlight: "rgba(143, 208, 197, 0.15)",
          textHighlight: "#8f6a1188",
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
      Plugin.ContentPage(),
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
