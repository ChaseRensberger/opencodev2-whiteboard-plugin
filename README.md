# OpenCode V2 Whiteboard plugin

Connects OpenCode V2 to [dev.fast Whiteboard](https://dev.fast).
This unofficial port registers the local Whiteboard MCP server, which exposes Whiteboard tools to your agent.
It uses the native V2 plugin API. It does not support OpenCode V1.

## Use

Install [Whiteboard Desktop](https://dev.fast/install).
In Whiteboard, open Settings → Command line and install the `whiteboard` command.
On Linux and macOS, the plugin uses `~/.local/bin/whiteboard`.
On Windows, `whiteboard.cmd` must be on `PATH`.

Install the dependencies from this directory:

```sh
npm install
```

Add this directory to `plugins` in `~/.config/opencode/opencode.jsonc`.
Keep your other configuration entries:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/home/chase/Projects/opencodev2-whiteboard-plugin"]
}
```

Reload OpenCode and use `/mcps` to make sure that `whiteboard` connects.
Ask your agent to call Whiteboard's `session_get_instructions` tool to test the connection.
The plugin replaces any existing server named `whiteboard`. It leaves other servers unchanged.
OpenCode removes the registration when the plugin unloads.

## Development

```sh
npm test
npm run typecheck
npm pack --dry-run
```

Tests cover registration and launch commands. A live connection requires Whiteboard Desktop.

Based on [devdotfast/whiteboard](https://github.com/devdotfast/whiteboard/tree/main/packages/agent-plugins/opencode).
MIT licensed. The upstream copyright notice is retained in `LICENSE`.
