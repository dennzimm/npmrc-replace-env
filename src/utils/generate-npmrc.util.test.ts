import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_ENV_PREFIX } from "../constants/defaults.const";
import { generateNpmrc } from "./generate-npmrc.util";
import { getEnvValue } from "./get-env-value.util";
import {
  getConfigMock,
  getConfigWithShellCurlyPlaceholdersMock,
  getConfigWithShellDollarPlaceholdersMock,
  getEnvMock,
  getEnvPlaceholdersMock,
  getEnvValuesMock,
  getShellCurlyPlaceholdersMock,
  getShellDollarPlaceholdersMock,
} from "./test/test-mock.util";

vi.mock("./get-env-value.util");

const ENV_PREFIX = DEFAULT_ENV_PREFIX;
const ALL_ENV_MOCK = new Map([...getEnvMock(ENV_PREFIX), ...getEnvMock("")]);

describe("generateNpmrc", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getEnvValue).mockImplementation(
      (env: string) => ALL_ENV_MOCK.get(env) ?? "",
    );
  });

  it("should replace environment variables in the config string", () => {
    const envPlaceholders = getEnvPlaceholdersMock(ENV_PREFIX);
    const envValues = getEnvValuesMock();
    const config = getConfigMock(envPlaceholders);
    const expected = getConfigMock(envValues);
    const result = generateNpmrc(config, envPlaceholders);

    expect(result).toBe(expected);

    for (const env of envPlaceholders) {
      expect(getEnvValue).toHaveBeenCalledWith(env);
    }
  });

  it.each([
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
  ])("should replace %s placeholders in the config string", (_, getConfig, getPlaceholders) => {
    const config = getConfig();
    const expected = getConfigMock(getEnvValuesMock());
    const placeholders = getPlaceholders();
    const result = generateNpmrc(config, placeholders);

    expect(result).toBe(expected);
    expect(getEnvValue).toHaveBeenCalledWith("SOME_TOKEN");
    expect(getEnvValue).toHaveBeenCalledWith("SOME_OTHER_TOKEN_1");
    expect(getEnvValue).toHaveBeenCalledWith("FA_AUTH_TOKEN");
  });
});
