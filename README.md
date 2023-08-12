# `rs-cargo` Action

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/clechasseur/rs-cargo/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/clechasseur/rs-cargo/actions/workflows/ci.yml)

This GitHub Action runs specified [`cargo`](https://github.com/rust-lang/cargo)
command on a Rust language project.

This GitHub Action has been forked from [actions-rs/cargo](https://github.com/actions-rs/cargo). The original project published under the name [`rust-cargo`](https://github.com/marketplace/actions/rust-cargo). See [LICENSE](LICENSE) for copyright attribution details.

**Table of Contents**

* [Example workflow](#example-workflow)
* [Use cases](#use-cases)
* [Inputs](#inputs)
* [Toolchain](#toolchain)
* [Cross-compilation](#cross-compilation)
* [License](#license)

## Example workflow

```yaml
on: [push]

name: CI

jobs:
  build_and_test:
    name: Rust project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dtolnay/rust-toolchain@stable
      - uses: clechasseur/rs-cargo@v1
        with:
          command: build
          args: --release --all-features
```

## Use cases

Note that this Action is not usually required
and you can just use a [`run`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun)
step instead:

```yaml
jobs:
  build_and_test:
    name: Rust project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dtolnay/rust-toolchain@stable
      - run: cargo build --release --all-features
```

Why would you want to use this Action instead?

1. Transparent `cross` installation and execution with `use-cross: true` input enabled
2. Warnings and errors issued by `cargo` will be displayed in GitHub UI

## Inputs

| Name                | Required | Description                                                         | Type   | Default |
| --------------------| :------: | --------------------------------------------------------------------| ------ | --------|
| `command`           | ✓        | Cargo command to run, ex. `check` or `build`                        | string |         |
| `toolchain`         |          | Rust toolchain name to use                                          | string |         |
| `args`              |          | Arguments for the cargo command                                     | string |         |     
| `use-cross`         |          | Use [`cross`](https://github.com/cross-rs/cross) instead of `cargo` | bool   | false   |
| `working-directory` |          | Directory where to perform cargo command                            | string |         |

## Toolchain

By default this Action will call whatever `cargo` binary is available
in the current [virtual environment](https://help.github.com/en/articles/software-in-virtual-environments-for-github-actions).

You can use [`dtolnay/rust-toolchain`](https://github.com/dtolnay/rust-toolchain)
to install a specific Rust toolchain with `cargo` included.

## Cross-compilation

In order to make cross-compilation an easy process,
this Action can install [`cross`](https://github.com/cross-rs/cross)
on demand if `use-cross` input is enabled; the `cross` executable will be invoked
then instead of `cargo` automatically.

All consequent calls of this Action in the same job
with `use-cross: true` input enabled will use the same `cross` installed.

```yaml
on: [push]

name: ARMv7 build

jobs:
  linux_arm7:
    name: Linux ARMv7
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dtolnay/rust-toolchain@stable
        with:
          targets: armv7-unknown-linux-gnueabihf
      - uses: clechasseur/rs-cargo@v1
        with:
          use-cross: true
          command: build
          args: --target armv7-unknown-linux-gnueabihf
```

## License

[MIT license](LICENSE)
