---
title: Sessions
---

Use `sessions` to browse the agent sessions Totally has parsed.

```sh
totally sessions
totally sessions --since 7d
totally sessions --latest
```

The default table includes each session's identifier, working directory, model,
token use, estimated cost, and duration. Add `--full` to avoid truncating table
values.

```sh
totally sessions --full
```

For focused output, use one of these flags:

```sh
totally sessions --ids
totally sessions --paths
totally sessions --summary
totally sessions --limit 20
```

`--latest` orders by most recently updated session and returns one result unless
you provide a different `--limit`.

Use the global time and discovery options when needed:

```sh
totally sessions --since 2026-07-01 --until 2026-07-07
totally sessions --archived
totally sessions --agent codex
```

See [Show a session](show/) for a detailed report on one result.
