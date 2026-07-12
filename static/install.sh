#!/bin/sh

# Install the latest Totally release. Override the destination with
# TOTALLY_INSTALL_DIR, for example: TOTALLY_INSTALL_DIR=/usr/local/bin sh install.sh

set -eu

repo="rybkr/totally"
install_dir="${TOTALLY_INSTALL_DIR:-$HOME/.local/bin}"

require() {
  command -v "$1" >/dev/null 2>&1 || {
    printf 'Error: %s is required to install Totally.\n' "$1" >&2
    exit 1
  }
}

require curl
require tar

os="$(uname -s)"
arch="$(uname -m)"

case "$os" in
  Darwin) os="darwin" ;;
  Linux) os="linux" ;;
  *)
    printf 'Error: Totally does not support %s.\n' "$os" >&2
    exit 1
    ;;
esac

case "$arch" in
  x86_64|amd64) arch="amd64" ;;
  arm64|aarch64) arch="arm64" ;;
  *)
    printf 'Error: Totally does not support %s.\n' "$arch" >&2
    exit 1
    ;;
esac

api_url="https://api.github.com/repos/$repo/releases/latest"
tag="$(curl -fsSL "$api_url" | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)"

if [ -z "$tag" ]; then
  printf 'Error: could not determine the latest Totally release.\n' >&2
  exit 1
fi

archive="totally-${tag}-${os}-${arch}.tar.gz"
base_url="https://github.com/$repo/releases/download/$tag"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT HUP INT TERM

printf 'Installing Totally %s for %s/%s...\n' "$tag" "$os" "$arch"
curl -fsSL "$base_url/$archive" -o "$tmpdir/$archive"
curl -fsSL "$base_url/checksums.txt" -o "$tmpdir/checksums.txt"

expected="$(awk -v archive="$archive" '$2 == archive { print $1; exit }' "$tmpdir/checksums.txt")"
if [ -z "$expected" ]; then
  printf 'Error: no checksum found for %s.\n' "$archive" >&2
  exit 1
fi

if command -v shasum >/dev/null 2>&1; then
  actual="$(shasum -a 256 "$tmpdir/$archive" | awk '{print $1}')"
elif command -v sha256sum >/dev/null 2>&1; then
  actual="$(sha256sum "$tmpdir/$archive" | awk '{print $1}')"
else
  printf 'Error: shasum or sha256sum is required to verify the download.\n' >&2
  exit 1
fi

if [ "$actual" != "$expected" ]; then
  printf 'Error: checksum verification failed for %s.\n' "$archive" >&2
  exit 1
fi

tar -xzf "$tmpdir/$archive" -C "$tmpdir"
mkdir -p "$install_dir"
install -m 755 "$tmpdir/totally" "$install_dir/totally"

printf 'Installed Totally to %s/totally\n' "$install_dir"
case ":$PATH:" in
  *":$install_dir:"*) ;;
  *) printf 'Add %s to your PATH to run it from any directory.\n' "$install_dir" ;;
esac
