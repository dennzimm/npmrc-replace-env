import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_NPMRC_FILE } from "../constants/defaults.const";
import { generateNpmrc } from "./generate-npmrc.util";
import { getEnvKeysFromConfig } from "./get-env-from-config.util";
import { readConfig } from "./read-config.util";
import { writeNpmrc } from "./write-npmrc.util";

const { mockWriteFileSync } = vi.hoisted(() => ({
  mockWriteFileSync: vi.fn(),
}));

vi.mock("fs", () => ({
  default: { writeFileSync: mockWriteFileSync },
  writeFileSync: mockWriteFileSync,
}));

vi.mock("./read-config.util");
vi.mock("./get-env-from-config.util");
vi.mock("./generate-npmrc.util");

describe("writeNpmrc", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should write the npmrc file with generated content", () => {
    const mockConfig = "mock config";
    const mockEnvs = ["NPMRC_TOKEN"];
    const mockNpmrc = "mock npmrc content";

    vi.mocked(readConfig).mockReturnValue(mockConfig);
    vi.mocked(getEnvKeysFromConfig).mockReturnValue(mockEnvs);
    vi.mocked(generateNpmrc).mockReturnValue(mockNpmrc);

    writeNpmrc({ envPrefix: "NPMRC_" });

    expect(mockWriteFileSync).toHaveBeenCalledWith(
      DEFAULT_NPMRC_FILE,
      expect.stringContaining(mockNpmrc),
    );
  });

  it("should throw an error if writing the file fails", () => {
    vi.mocked(readConfig).mockReturnValue("config");
    vi.mocked(getEnvKeysFromConfig).mockReturnValue([]);
    vi.mocked(generateNpmrc).mockReturnValue("content");
    mockWriteFileSync.mockImplementation(() => {
      throw new Error("disk full");
    });

    expect(() => writeNpmrc({ envPrefix: "NPMRC_" })).toThrow(
      `Error writing to ${DEFAULT_NPMRC_FILE} file: disk full`,
    );
  });

  it("should use the raw error as fallback when message is unavailable", () => {
    vi.mocked(readConfig).mockReturnValue("config");
    vi.mocked(getEnvKeysFromConfig).mockReturnValue([]);
    vi.mocked(generateNpmrc).mockReturnValue("content");
    mockWriteFileSync.mockImplementation(() => {
      throw "bare string error";
    });

    expect(() => writeNpmrc({ envPrefix: "NPMRC_" })).toThrow(
      `Error writing to ${DEFAULT_NPMRC_FILE} file: bare string error`,
    );
  });
});
