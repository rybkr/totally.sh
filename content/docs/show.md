---
title: Show a session
---

Use `show` to inspect one session in detail. An unambiguous prefix of the
session ID is enough.

```sh
totally show 019f44e4
```

To inspect the most recently updated session instead, use `--latest`.

```sh
totally show --latest
totally show --latest --cwd .
totally show --latest --provider openai --model gpt-5
```

`--cwd`, `--provider`, and `--model` narrow `--latest`; they are not used when
you provide a session ID directly.

The report includes session metadata, transcript location, prompts, turns,
messages, tool calls, model and provider use, token breakdown, duration, and
estimated cost. Add `--full` to keep long display values intact.

```sh
totally show --latest --full
totally show 019f44e4 --format json
```

JSON output keeps the complete prompt even when table output would shorten it.
