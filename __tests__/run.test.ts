import { Input } from "../src/input";
import { run } from "../src/run";

const SECONDS = 1000;

describe("run", () => {
  it.each([
    {
      name: "rust-tests-working",
      input: {
        command: "check",
        toolchain: "stable",
        args: ["--package", "working", "--all-targets", "--all-features"],
      },
    },
    {
      name: "rust-tests-not-working-default-features",
      input: {
        command: "build",
        args: ["--package", "not_working"],
      },
    },
    {
      name: "rust-tests-not-working-all-features",
      input: {
        command: "build",
        args: ["--package", "not_working", "--all-features"],
      },
      shouldThrow: true,
    },
    {
      name: "rust-tests-cross",
      input: {
        command: "build",
        toolchain: "stable",
        args: ["--target", "aarch64-unknown-linux-gnu"],
        workingDirectory: "rust_tests/working",
        tool: "cross",
      },
    },
    {
      name: "rust-tests-cargo-hack",
      input: {
        command: "check",
        toolchain: "stable",
        args: [],
        workingDirectory: "rust_tests/working",
        tool: "cargo-hack",
      },
    },
    {
      name: "rust-clippy-warnings",
      input: {
        command: "clippy",
        args: ["--package", "clippy_warnings"],
      },
    },
    {
      name: "  rust-fmt-warnings",
      input: {
        command: "fmt",
        args: ["--package", "fmt_warnings", "--check"],
      },
      shouldThrow: true,
    },
  ])(
    "$name",
    async ({ input, shouldThrow }: { input: Input; shouldThrow?: boolean }) => {
      const inputWithoutCache: Input = {
        ...input,
        ...(!process.env.CI && { cacheKey: "no-cache" }),
      };

      if (shouldThrow) {
        await expect(run(inputWithoutCache)).rejects.toThrow();
      } else {
        await expect(run(inputWithoutCache)).resolves.not.toThrow();
      }
    },
    240 * SECONDS,
  );
});
