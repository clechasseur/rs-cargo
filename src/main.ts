import * as os from "node:os";
import path from "path";

import * as core from "@actions/core";

import * as input from "./input.js";
import { run } from "./run.js";

async function main(): Promise<void> {
  // Note: the matchers used here were copied from here:
  // https://github.com/actions-rust-lang/setup-rust-toolchain/blob/12a4c2d9dc308e1b990c2f2e472947348bb41a20/rust.json
  const matchersPath = path.join(__dirname, ".matchers");
  process.stdout.write(
    `::add-matcher::${path.join(matchersPath, "rs-cargo.json")}${os.EOL}`,
  );

  const actionInput = input.get();

  try {
    await run(actionInput);
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

void main();
