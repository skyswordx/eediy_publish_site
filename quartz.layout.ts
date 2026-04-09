import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/skyswordx",
      Public_Content: "https://github.com/skyswordx/eediy_public_content",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      filterFn: (node) => {
        if (node.slugSegment === "tags") return false
        const hiddenPrefixes = [
          "blog/legacy/college-lessons",
          "blog/legacy/data-algo",
          "blog/legacy/draft",
          "blog/legacy/robotics",
        ]
        return !hiddenPrefixes.some(
          (prefix) => node.slug === `${prefix}/index` || node.slug.startsWith(`${prefix}/`),
        )
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      filterFn: (node) => {
        if (node.slugSegment === "tags") return false
        const hiddenPrefixes = [
          "blog/legacy/college-lessons",
          "blog/legacy/data-algo",
          "blog/legacy/draft",
          "blog/legacy/robotics",
        ]
        return !hiddenPrefixes.some(
          (prefix) => node.slug === `${prefix}/index` || node.slug.startsWith(`${prefix}/`),
        )
      },
    }),
  ],
  right: [],
}
