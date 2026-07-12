---
title: Getting started
---

Install Totally with the shell installer:

```sh
curl -fsSL https://totally.sh/install.sh | sh
```

The installer places the executable in `~/.local/bin` by default. Set
`TOTALLY_INSTALL_DIR` to choose another directory.

If you have Go installed, you can also install the latest version directly:

```sh
go install github.com/rybkr/totally/cmd/totally@latest
```

Run a first usage report:

```sh
totally stats --since 7d
```

Then list the sessions Totally found:

```sh
totally sessions
```

Totally discovers supported local agent homes automatically. Use `--home` when
you want to inspect a specific location or combine more than one location.

```sh
totally --home ~/.codex sessions
totally --home ~/.codex --home /path/to/another-agent stats --since 30d
```

Use `totally --help` or `totally <command> --help` to see the flags supported
by your installed version.
