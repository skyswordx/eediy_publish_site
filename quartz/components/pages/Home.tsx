import { QuartzComponent, QuartzComponentConstructor } from "../types"
import ContentConstructor from "./Content"
import SearchConstructor from "../Search"
import DarkmodeConstructor from "../Darkmode"
import { Date } from "../Date"
import { resolveRelative } from "../../util/path"
import style from "../styles/home.scss"
import { concatenateResources } from "../../util/resources"
// @ts-ignore
import homeScript from "../scripts/home.inline"

const MetaIcon = ({ kind }: { kind: "calendar" | "updated" | "tag" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    {kind === "calendar" ? (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 11h18M7 15h2m6 0h2m-10 3h2" />
      </>
    ) : kind === "updated" ? (
      <>
        <path d="M3 11a9 9 0 1 1 2.6 7M3 4v7h7" />
        <path d="M12 7v5l3 2" />
      </>
    ) : (
      <>
        <path d="M3 3h8l10 10-8 8L3 11Z" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    )}
  </svg>
)

export default (() => {
  const Content = ContentConstructor()
  const Search = SearchConstructor()
  const Darkmode = DarkmodeConstructor()
  const Home: QuartzComponent = (props) => {
    if (props.fileData.slug !== "index") return <Content {...props} />
    const posts = props.allFiles
      .filter((page) => page.slug?.startsWith("blog/") && !page.slug.endsWith("/index"))
      .sort((a, b) => (b.dates?.created?.getTime() ?? 0) - (a.dates?.created?.getTime() ?? 0))
      .slice(0, 8)
    return (
      <main class="home-page">
        <section class="home-cover" aria-label="欢迎来到 circLΣMoon">
          <img
            class="home-wallpaper"
            src="/static/interstellar-hero.webp"
            alt="星际穿越风格的黑洞与地平线上的房屋"
            width="1308"
            height="736"
            fetchPriority="high"
          />
          <nav class="home-nav" aria-label="首页导航">
            <a class="home-brand" href="/">
              circLΣMoon
            </a>
            <div class="home-nav-links">
              <a href="#latest">文章</a>
              <a href="/blog/">博客</a>
              <a class="home-github" href="https://github.com/skyswordx">
                GitHub
              </a>
              <Search {...props} />
              <Darkmode {...props} />
            </div>
          </nav>
          <div class="home-cover-copy">
            <h1>circLΣMoon</h1>
            <p class="home-quote" aria-label="knowledge isn't free. You have to pay attention">
              <span class="home-typed" aria-hidden="true">
                knowledge isn&apos;t free. You have to pay attention
              </span>
              <span class="home-cursor" aria-hidden="true">
                |
              </span>
            </p>
          </div>
          <a class="home-scroll" href="#latest" aria-label="向下阅读文章">
            <span aria-hidden="true">⌄</span>
          </a>
        </section>
        <div class="home-reading" id="latest">
          <section class="home-posts" aria-labelledby="home-posts-title">
            <div class="home-section-heading">
              <h2 id="home-posts-title">最近的记录</h2>
              <a href="/blog/">全部文章 ↗</a>
            </div>
            {posts.map((page) => (
              <article class="home-post">
                <h3>
                  <a href={resolveRelative(props.fileData.slug!, page.slug!)}>
                    {page.frontmatter?.title ?? "无题"}
                  </a>
                </h3>
                <div class="home-post-meta">
                  {page.dates?.created && (
                    <span>
                      <MetaIcon kind="calendar" />
                      发表于 <Date date={page.dates.created} locale={props.cfg.locale} />
                    </span>
                  )}
                  {page.dates?.modified && (
                    <span>
                      <MetaIcon kind="updated" />
                      更新于 <Date date={page.dates.modified} locale={props.cfg.locale} />
                    </span>
                  )}
                  <span>
                    <MetaIcon kind="tag" />
                    {page.frontmatter?.tags?.[0] ?? "笔记与写作"}
                  </span>
                </div>
                <p>{page.description?.replace(/\s+/g, " ").slice(0, 150)}</p>
              </article>
            ))}
          </section>
          <aside class="home-profile" aria-label="关于作者">
            <img
              src="/img/avatar/avatarX.jpg"
              alt="circLΣMoon"
              width="88"
              height="88"
              loading="lazy"
            />
            <h2>circLΣMoon</h2>
            <p>课程笔记、机器人、自动驾驶、强化学习，还有一些值得留下来的长期写作。</p>
            <a href="/blog/">走进我的博客 ↗</a>
            <div class="home-profile-links">
              <a href="https://github.com/skyswordx">GitHub</a>
              <a href="/index.xml">RSS</a>
              <a href="mailto:1140527828@qq.com">Email</a>
            </div>
          </aside>
        </div>
      </main>
    )
  }
  Home.css = [style, Search.css, Darkmode.css].join("\n")
  Home.afterDOMLoaded = concatenateResources(Search.afterDOMLoaded, homeScript)
  Home.beforeDOMLoaded = Darkmode.beforeDOMLoaded
  return Home
}) satisfies QuartzComponentConstructor
