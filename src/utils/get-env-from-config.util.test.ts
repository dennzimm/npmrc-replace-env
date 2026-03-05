import { describe, expect, it } from "vitest";
import { DEFAULT_ENV_PREFIX } from "../constants/defaults.const";
import { getEnvKeysFromConfig } from "./get-env-from-config.util";
import {
  getConfigWithPlaceholdersMock,
  getConfigWithShellCurlyPlaceholdersMock,
  getConfigWithShellDollarPlaceholdersMock,
  getEnvPlaceholdersMock,
  getShellCurlyPlaceholdersMock,
  getShellDollarPlaceholdersMock,
} from "./test/test-mock.util";

const SHELL_STYLE_CASES = [
  [
    "shell curly-style",
    getConfigWithShellCurlyPlaceholdersMock,
    getShellCurlyPlaceholdersMock,
  ],
  [
    "shell dollar-style",
    getConfigWithShellDollarPlaceholdersMock,
    getShellDollarPlaceholdersMock,
  ],
] as const;

describe("getEnvKeysFromConfig", () => {
  it("should return an array of environment keys from the config with default env prefix", () => {
    const envPrefix = DEFAULT_ENV_PREFIX;
    const config = getConfigWithPlaceholdersMock(envPrefix);
    const expected = getEnvPlaceholdersMock(envPrefix);
    const result = getEnvKeysFromConfig(config, envPrefix);

    expect(result).toEqual(expected);
  });

  it("should return an array of environment keys from the config with custom env prefix", () => {
    const envPrefix = "CUSTOM_PREFIX_";
    const config = getConfigWithPlaceholdersMock(envPrefix);
    const expected = getEnvPlaceholdersMock(envPrefix);
    const result = getEnvKeysFromConfig(config, envPrefix);

    expect(result).toEqual(expected);
  });

  it("should return an array of environment keys from the config with no env prefix", () => {
    const envPrefix = "";
    const config = getConfigWithPlaceholdersMock(envPrefix);
    const expected = getEnvPlaceholdersMock(envPrefix);
    const result = getEnvKeysFromConfig(config, envPrefix);

    expect(result).toEqual(expected);
  });

  it("should return an empty array if no environment keys are found in the config", () => {
    const config = getConfigWithPlaceholdersMock("PREFIX_");
    const expected: string[] = [];
    const result = getEnvKeysFromConfig(config, DEFAULT_ENV_PREFIX);

    expect(result).toEqual(expected);
  });

  it.each(
    SHELL_STYLE_CASES,
  )("should return %s placeholders from config", (_, getConfig, getExpected) => {
    const result = getEnvKeysFromConfig(getConfig(), DEFAULT_ENV_PREFIX);

    expect(result).toEqual(getExpected());
  });
});
