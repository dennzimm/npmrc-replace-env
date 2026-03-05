import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import {
  getConfigWithPlaceholdersMock,
  getConfigWithValuesMock,
  getEnvMock,
} from "./utils/test/test-mock.util";

const ROOT = path.resolve(__dirname, "..");
const CLI_PATH = path.join(ROOT, "dist", "cli.js");

describe("CLI E2E", () => {
  let tmpDir: string;

  beforeAll(() => {
    spawnSync("pnpm", ["build"], { cwd: ROOT, stdio: "inherit" });
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true });
  });

  function setup(prefix: string) {
    tmpDir = mkdtempSync(path.join(tmpdir(), "npmrc-e2e-"));
    writeFileSync(
      path.join(tmpDir, ".npmrc.config"),
      getConfigWithPlaceholdersMock(prefix),
    );
    return Object.fromEntries(getEnvMock(prefix));
  }

  function runCli(cliArgs: string[], envVars: Record<string, string>) {
    return spawnSync(process.execPath, [CLI_PATH, ...cliArgs], {
      cwd: tmpDir,
      env: envVars,
    });
  }

  it("replaces placeholders with default prefix (NPMRC_)", async () => {
    const env = setup("NPMRC_");
    const result = runCli([], env);

    expect(result.status).toBe(0);
    const output = await readFile(path.join(tmpDir, ".npmrc"), "utf-8");
    expect(output).toContain(getConfigWithValuesMock());
  });

  it("replaces placeholders with custom prefix (--prefix)", async () => {
    const prefix = "CUSTOM_";
    const env = setup(prefix);
    const result = runCli(["--prefix", prefix], env);

    expect(result.status).toBe(0);
    const output = await readFile(path.join(tmpDir, ".npmrc"), "utf-8");
    expect(output).toContain(getConfigWithValuesMock());
  });

  it("replaces placeholders without prefix (--without-prefix)", async () => {
    const env = setup("");
    const result = runCli(["--without-prefix"], env);

    expect(result.status).toBe(0);
    const output = await readFile(path.join(tmpDir, ".npmrc"), "utf-8");
    expect(output).toContain(getConfigWithValuesMock());
  });

  it("exits with non-zero code when config file is missing", () => {
    tmpDir = mkdtempSync(path.join(tmpdir(), "npmrc-e2e-"));
    const result = runCli([], {});

    expect(result.status).not.toBe(0);
  });
});
