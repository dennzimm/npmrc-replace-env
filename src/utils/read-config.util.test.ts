import fs from "fs";
import { DEFAULT_CONFIG_FILE, DEFAULT_ENV_PREFIX } from "../constants/defaults.const";
import { readConfig } from "./read-config.util";
import { getConfigWithPlaceholdersMock } from "./test/test-mock.util";

jest.mock("fs");

describe("readConfig", () => {
  it("should read and return the content of the config file", () => {
    const configFilePath = DEFAULT_CONFIG_FILE;
    const expected = getConfigWithPlaceholdersMock(DEFAULT_ENV_PREFIX);
    const mockReadFileSync = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(Buffer.from(expected));

    const result = readConfig(configFilePath);

    expect(mockReadFileSync).toHaveBeenCalledWith(configFilePath);
    expect(result).toEqual(expected);
  });

  it("should throw an error if the config file is not found", () => {
    const configFilePath = "/path/to/nonexistent/config/file";
    const expectedErrorMessage = `Config file not found: ${configFilePath}. Please create a file named ${configFilePath}`;
    const mockReadFileSync = jest
      .spyOn(fs, "readFileSync")
      .mockImplementation(() => {
        throw new Error("File not found");
      });

    expect(() => {
      readConfig(configFilePath);
    }).toThrow(expectedErrorMessage);

    expect(mockReadFileSync).toHaveBeenCalledWith(configFilePath);
  });
});
