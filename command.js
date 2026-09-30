/** @param {NodeJS.Platform} platform */
export function whiteboardCommand(platform = process.platform) {
  // Preserve the launch commands used by the upstream Whiteboard plugin.
  return platform === "win32"
    ? ["cmd", "/d", "/c", "whiteboard", "mcp"]
    : ["sh", "-c", 'exec "$HOME/.local/bin/whiteboard" mcp']
}
