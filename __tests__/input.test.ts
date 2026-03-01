import * as input from "../src/input.js";

const testEnvVars = {
  INPUT_COMMAND: "build",
  INPUT_TOOLCHAIN: "+nightly",
  // There are few unnecessary spaces here to check that args parser works properly
  INPUT_ARGS:
    "   --release --target x86_64-unknown-linux-gnu    --no-default-features --features unstable       ",
  INPUT_TOOL: "cross",
  "INPUT_CACHE-KEY": "rs-cargo-tests",
};

describe("input", () => {
  beforeEach(() => {
    for (const key in testEnvVars) {
      process.env[key] = testEnvVars[key as keyof typeof testEnvVars];
    }
  });

  it("Parses action input into rs-cargo input", () => {
    const result = input.get();

    expect(result.command).toBe("build");
    expect(result.args).toStrictEqual([
      "--release",
      "--target",
      "x86_64-unknown-linux-gnu",
      "--no-default-features",
      "--features",
      "unstable",
    ]);
    expect(result.toolchain).toBe("nightly");
    expect(result.tool).toBe("cross");
    expect(result.cacheKey).toBe("rs-cargo-tests");
  });
});
