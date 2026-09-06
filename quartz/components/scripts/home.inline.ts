document.addEventListener("nav", () => {
  if (document.body.dataset.slug !== "index") return
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const typed = document.querySelector<HTMLElement>(".home-typed")
  const quote = typed?.textContent ?? ""
  let timer: ReturnType<typeof setTimeout> | undefined
  let position = 0
  let deleting = false

  const tick = () => {
    if (!typed) return
    position += deleting ? -1 : 1
    typed.textContent = quote.slice(0, position)
    let delay = deleting ? 35 : 85
    if (position === quote.length) {
      deleting = true
      delay = 2800
    } else if (position === 0) {
      deleting = false
      delay = 700
    } else if (!deleting && quote[position - 1] === ".") {
      delay = 550
    }
    timer = setTimeout(tick, delay)
  }

  if (typed && !reducedMotion.matches) {
    typed.textContent = ""
    timer = setTimeout(tick, 500)
  }

  const links = document.querySelectorAll<HTMLAnchorElement>('.home-page a[href="#latest"]')
  const scrollToArticles = (event: MouseEvent) => {
    const target = document.getElementById("latest")
    if (!target) return
    event.preventDefault()
    event.stopPropagation()
    history.replaceState(null, "", "#latest")
    window.scrollTo({
      top: Math.ceil(window.scrollY + target.getBoundingClientRect().top),
      behavior: reducedMotion.matches ? "instant" : "smooth",
    })
  }
  links.forEach((link) => link.addEventListener("click", scrollToArticles))
  window.addCleanup(() => {
    clearTimeout(timer)
    if (typed) typed.textContent = quote
    links.forEach((link) => link.removeEventListener("click", scrollToArticles))
  })
})
