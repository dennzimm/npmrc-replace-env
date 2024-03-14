import { DEFAULT_ENV_PREFIX } from "../constants/defaults.const";
import { getEnvKeysFromConfig } from "./get-env-from-config.util";
import {
  getConfigWithPlaceholdersMock,
  getEnvPlaceholdersMock,
} from "./test/test-mock.util";

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

  it("should return an empty array if no environment keys are found in the config", () => {
    const config = getConfigWithPlaceholdersMock("PREFIX_");
    const expected: string[] = [];
    const result = getEnvKeysFromConfig(config, DEFAULT_ENV_PREFIX);

    expect(result).toEqual(expected);
  });
});
