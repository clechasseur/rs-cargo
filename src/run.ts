import path from "path";

import * as exec from "@actions/exec";

import * as input from "./input.js";
import { Cargo, CargoInstallOptions, CargoLike } from "@clechasseur/rs-actions-core";

export async function getProgram(actionInput: input.Input) {
  const options: CargoInstallOptions = {
    toolchain: actionInput.toolchain,
    primaryKey: actionInput.cacheKey,
  };

  if (actionInput.tool) {
    return await CargoLike.getOrInstall(actionInput.tool, options);
  }

  return await Cargo.get(options);
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
