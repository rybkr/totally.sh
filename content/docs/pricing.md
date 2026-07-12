---
title: Pricing
---

Totally estimates cost from a bundled local pricing catalog. It is useful for
understanding usage, not for reconciling a vendor invoice.

```sh
totally prices
totally prices --model gpt-5
totally prices --provider openai --format json
```

Price rows include input, cached-input, and output rates per million tokens,
along with their source and effective date.

You can overlay a bundled rate in Totally's TOML configuration. The default
configuration directory is `~/.config/totally`.

```toml
[prices."openai/gpt-5"]
input_per_million_usd = "1.25"
cached_input_per_million_usd = "0.125"
output_per_million_usd = "10.00"
effective_from = "2025-08-07"
source = "user"
```

Set `replace = true` in an override to replace the model's bundled price
history instead of adding an effective-date range.

Validate configured overrides before relying on them:

```sh
totally prices verify
totally prices verify --provider openai --model gpt-5
```

When a transcript lacks enough information to assign all usage to a price,
Totally reports an unavailable or partial estimate instead of treating it as
zero.
