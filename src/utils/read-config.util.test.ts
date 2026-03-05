import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_CONFIG_FILE,
  DEFAULT_ENV_PREFIX,
} from "../constants/defaults.const";
import { readConfig } from "./read-config.util";
import { getConfigWithPlaceholdersMock } from "./test/test-mock.util";

const { mockReadFileSync } = vi.hoisted(() => ({
  mockReadFileSync: vi.fn(),
}));

vi.mock("fs", () => ({
  default: { readFileSync: mockReadFileSync },
  readFileSync: mockReadFileSync,
}));

describe("readConfig", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should read and return the content of the config file", () => {
    const configFilePath = DEFAULT_CONFIG_FILE;
    const expected = getConfigWithPlaceholdersMock(DEFAULT_ENV_PREFIX);
    mockReadFileSync.mockReturnValue(Buffer.from(expected));

    const result = readConfig(configFilePath);

    expect(mockReadFileSync).toHaveBeenCalledWith(configFilePath);
    expect(result).toEqual(expected);
  });

  it("should throw an error if the config file is not found", () => {
    const configFilePath = "/path/to/nonexistent/config/file";
    const expectedErrorMessage = `Config file not found: ${configFilePath}. Please create a file named ${configFilePath}`;
    mockReadFileSync.mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => {
      readConfig(configFilePath);
    }).toThrow(expectedErrorMessage);

    expect(mockReadFileSync).toHaveBeenCalledWith(configFilePath);
  });
});
