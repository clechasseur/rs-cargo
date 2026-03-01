import path from "path";

import * as exec from "@actions/exec";

import * as input from "./input.js";
import {
  Cargo,
  CargoHack,
  CargoHackOptions,
  Cross,
  CrossOptions,
} from "@clechasseur/rs-actions-core";

export async function getProgram(actionInput: input.Input) {
  switch (actionInput.tool) {
    case "cross": {
      const options: CrossOptions = {
        toolchain: actionInput.toolchain,
        primaryKey: actionInput.cacheKey,
      };
      return await Cross.getOrInstall(options);
    }
    case "cargo-hack": {
      const options: CargoHackOptions = {
        toolchain: actionInput.toolchain,
        primaryKey: actionInput.cacheKey,
      };
      return await CargoHack.getOrInstall(options);
    }
    default:
      return await Cargo.get(actionInput.toolchain);
  }
}

export async function run(actionInput: input.Input): Promise<void> {
  const program = await getProgram(actionInput);

  const args = [actionInput.command, ...actionInput.args];

  const options: exec.ExecOptions = {};
  if (actionInput.workingDirectory) {
    options.cwd = path.join(process.cwd(), actionInput.workingDirectory);
  }

  await program.call(args, options);
}
