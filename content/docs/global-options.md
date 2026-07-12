---
title: Global options
---

These options apply to Totally commands unless a command's help text says
otherwise.

```text
--agent AGENT                 Session format to discover: all or codex
--home PATH                   Agent home directory; may be repeated
--config PATH                 Configuration file path
--archived                    Include archived sessions
--since TIME, --after TIME    Include sessions at or after TIME
--until TIME, --before TIME   Include sessions at or before TIME
--format table|json           Select output format
--no-pager                    Disable terminal paging
```

Time values accept relative durations such as `7d`, calendar dates such as
`2026-07-01`, RFC3339 timestamps, and the words `today`, `yesterday`, and
`now`.

Use JSON when you need stable machine-readable output:

```sh
totally stats --since 30d --format json
totally sessions --since 7d --format json
```

Specify `--home` more than once to include several agent homes in one report.

```sh
totally --home ~/.codex --home /path/to/agent-home sessions
```
