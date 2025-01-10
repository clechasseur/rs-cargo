import path from "path";

import * as core from "@actions/core";
import { issueCommand } from "@actions/core/lib/command";

import * as input from "./input";
import { run } from "./run";

async function main(): Promise<void> {
  // Note: the matchers used here were copied from here:
  // https://github.com/actions-rust-lang/setup-rust-toolchain/blob/12a4c2d9dc308e1b990c2f2e472947348bb41a20/rust.json
  const matchersPath = path.join(__dirname, ".matchers");
  issueCommand("add-matcher", {}, path.join(matchersPath, "rs-cargo.json"));

  const actionInput = input.get();

  try {
    await run(actionInput);
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

void main();
