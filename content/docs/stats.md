---
title: Stats
---

Use `stats` to aggregate session activity, token use, duration, and estimated
cost.

```sh
totally stats --since 7d
totally stats --cwd . --since 30d
totally stats --provider openai --model gpt-5
```

Group results with one or more `--by` flags:

```sh
totally stats --since 30d --by cwd
totally stats --since 30d --by model
totally stats --since 30d --by day --by model
```

Available group dimensions are `cwd`, `model`, `provider`, `day`, `week`,
`month`, and `session`.

The default output is a terminal table. Select JSON explicitly for scripts.

```sh
totally stats --since 30d --by week
totally stats --since 30d --format json
```

Totals are estimates. See [Pricing](pricing/) for the local rates and the cost
calculation rules.
