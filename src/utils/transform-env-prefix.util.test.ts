import { transformEnvPrefix } from "./transform-env-prefix.util";
import { DEFAULT_ENV_PREFIX } from "../constants/defaults.const";

describe("transformEnvPrefix", () => {
  it("should return an empty string if envPrefix is null", () => {
    const envPrefix = null;
    const expected = "";
    const result = transformEnvPrefix(envPrefix);

    expect(result).toEqual(expected);
  });

  it("should return the default env prefix if envPrefix is undefined", () => {
    const envPrefix = undefined;
    const expected = DEFAULT_ENV_PREFIX;
    const result = transformEnvPrefix(envPrefix);

    expect(result).toEqual(expected);
  });

  it("should return the envPrefix if it is not null or undefined", () => {
    const envPrefix = "CUSTOM_PREFIX_";
    const expected = envPrefix;
    const result = transformEnvPrefix(envPrefix);

    expect(result).toEqual(expected);
  });
});
