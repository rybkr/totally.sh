---
title: Files and discovery
---

`files` is a diagnostic command for the raw local transcripts Totally finds.
Use [Sessions](sessions/) for normal browsing.

```sh
totally files
totally files --archived
totally files --latest
```

Use focused output when diagnosing storage or discovery:

```sh
totally files --paths
totally files --count
totally files --summary
totally files --limit 20
```

`files verify` parses transcript files and reports malformed records and
impossible token counters. With no paths, it verifies all discovered files.

```sh
totally files verify
totally files verify ~/.codex/sessions/.../rollout-*.jsonl
totally files verify --format json
```

The command exits with a non-zero status when it finds an issue. It accepts
`.jsonl` and `.jsonl.zst` transcript paths.
