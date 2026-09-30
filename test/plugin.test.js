import assert from "node:assert/strict"
import { test } from "node:test"
import plugin from "../index.js"
import { whiteboardCommand } from "../command.js"

test("exports a native V2 plugin definition", () => {
  assert.equal(plugin.id, "opencodev2-whiteboard-plugin")
  assert.equal(typeof plugin.setup, "function")
})

for (const platform of ["linux", "darwin"]) {
  test(`launches the installed Whiteboard CLI on ${platform}`, () => {
    assert.deepEqual(whiteboardCommand(platform), [
      "sh", "-c", 'exec "$HOME/.local/bin/whiteboard" mcp',
    ])
  })
}

test("launches Whiteboard through cmd on Windows", () => {
  assert.deepEqual(whiteboardCommand("win32"), [
    "cmd", "/d", "/c", "whiteboard", "mcp",
  ])
})

test("registers an enabled server without changing other servers", async () => {
  const unrelated = { type: "remote", url: "https://example.com/mcp" }
  const servers = new Map([["other", unrelated]])
  let transform
  await plugin.setup({
    mcp: {
      async transform(callback) {
        transform = callback
        callback({ set: (name, server) => servers.set(name, server) })
      },
    },
  })

  assert.deepEqual(servers.get("whiteboard"), {
    type: "local",
    command: whiteboardCommand(),
    disabled: false,
  })
  assert.equal(servers.get("other"), unrelated)

  // Transforms can be replayed by OpenCode without rerunning setup.
  transform({ set: (name, server) => servers.set(name, server) })
  assert.equal(servers.size, 2)
})
