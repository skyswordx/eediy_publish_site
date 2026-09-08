import test from "node:test"
import assert from "node:assert/strict"
import { fetchCanonical } from "./util"

test("SEO canonical does not cause a second fetch or leave the preview origin", async (t) => {
  const response = new Response('<link rel="canonical" href="https://www.circlemoon.top/blog/">', {
    headers: { "content-type": "text/html" },
  })
  const fetchMock = t.mock.method(globalThis, "fetch", async () => response)
  assert.equal(await fetchCanonical(new URL("http://localhost:8083/blog/")), response)
  assert.equal(fetchMock.mock.callCount(), 1)
})

test("alias refresh still follows its canonical target", async (t) => {
  const calls: string[] = []
  t.mock.method(globalThis, "fetch", async (url: string) => {
    calls.push(url)
    return new Response(
      '<link rel="canonical" href="../blog/"><meta http-equiv="refresh" content="0; url=../blog/">',
      { headers: { "content-type": "text/html" } },
    )
  })
  await fetchCanonical(new URL("https://www.circlemoon.top/old/"))
  assert.deepEqual(calls, ["https://www.circlemoon.top/old/", "https://www.circlemoon.top/blog/"])
})
