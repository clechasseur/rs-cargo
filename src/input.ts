/**
 * Parse action input into a some proper thing.
 */

import { input } from "@clechasseur/rs-actions-core";

import stringArgv from "string-argv";

// Parsed action input
export interface Input {
  command: string;
  toolchain?: string;
  args: string[];
  useCross: boolean;
  workingDirectory?: string;
}

export function get(): Input {
  const command = input.getInput("command", { required: true });
  const args = stringArgv(input.getInput("args"));
  let toolchain = input.getInput("toolchain");
  if (toolchain.startsWith("+")) {
    toolchain = toolchain.slice(1);
  }
  const useCross = input.getInputBool("use-cross");
  const workingDirectory = input.getInput("working-directory");

  return {
    command,
    args,
    useCross,
    toolchain: toolchain || undefined,
    workingDirectory: workingDirectory || undefined,
  };
}
