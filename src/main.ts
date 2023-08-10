import path from "path";

import * as core from "@actions/core";
import * as exec from "@actions/exec";
import { issueCommand } from "@actions/core/lib/command";

import * as input from "./input";
import { Cargo, Cross } from "@clechasseur/rs-actions-core";

export async function run(actionInput: input.Input): Promise<void> {
  let program;
  if (actionInput.useCross) {
    program = await Cross.getOrInstall();
  } else {
    program = await Cargo.get();
  }

  let args: string[] = [];
  if (actionInput.toolchain) {
    args.push(`+${actionInput.toolchain}`);
  }
  args.push(actionInput.command);
  args = args.concat(actionInput.args);

  const options: exec.ExecOptions = {};
  if (actionInput.workingDirectory) {
    options.cwd = path.join(process.cwd(), actionInput.workingDirectory);
  }

  await program.call(args, options);
}

async function main(): Promise<void> {
  // Note: the matchers used here were copied from here:
  // https://github.com/actions-rust-lang/setup-rust-toolchain/blob/12a4c2d9dc308e1b990c2f2e472947348bb41a20/rust.json
  const matchersPath = path.join(__dirname, ".matchers");
  issueCommand("add-matcher", {}, path.join(matchersPath, "rs-cargo.json"));

  const actionInput = input.get();

  try {
    await run(actionInput);
  } catch (error) {
    core.setFailed((<Error>error).message);
  }
}

void main();
