import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_ENV_PREFIX } from "../constants/defaults.const";
import { generateNpmrc } from "./generate-npmrc.util";
import { getEnvValue } from "./get-env-value.util";
import {
  getConfigMock,
  getEnvMock,
  getEnvPlaceholdersMock,
  getEnvValuesMock,
} from "./test/test-mock.util";

vi.mock("./get-env-value.util");

const ENV_PREFIX = DEFAULT_ENV_PREFIX;
const ENV_MOCK = getEnvMock(ENV_PREFIX);

describe("generateNpmrc", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getEnvValue).mockImplementation(
      (env: string) => ENV_MOCK.find(([key]) => key === env)?.[1] ?? "",
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
});
