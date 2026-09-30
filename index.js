import { Plugin } from "@opencode/plugin"
import { whiteboardCommand } from "./command.js"

export default Plugin.define({
  id: "opencodev2-whiteboard-plugin",
  async setup(ctx) {
    await ctx.mcp.transform((editor) => {
      editor.set("whiteboard", {
        type: "local",
        command: whiteboardCommand(),
        disabled: false,
      })
    })
  },
})
