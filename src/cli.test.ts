import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockWriteNpmrc } = vi.hoisted(() => ({
  mockWriteNpmrc: vi.fn(),
}));

vi.mock(".", () => ({
  writeNpmrc: mockWriteNpmrc,
}));

describe("cli", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    vi.resetModules();
    mockWriteNpmrc.mockClear();
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  it("calls writeNpmrc with default prefix when no args given", async () => {
    process.argv = ["node", "cli.ts"];
    await import("./cli");
    expect(mockWriteNpmrc).toHaveBeenCalledWith({ envPrefix: "NPMRC_" });
  });

  it("calls writeNpmrc with null envPrefix when --without-prefix", async () => {
    process.argv = ["node", "cli.ts", "--without-prefix"];
    await import("./cli");
    expect(mockWriteNpmrc).toHaveBeenCalledWith({ envPrefix: null });
  });
});
