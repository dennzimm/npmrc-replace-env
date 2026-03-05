/**
 * Mock environment variables for testing purposes.
 */
const DEFAULT_ENV_MOCK = [
  ["SOME_TOKEN", "some-token"],
  ["SOME_OTHER_TOKEN_1", "some-other-token"],
  ["FA_AUTH_TOKEN", "fa-token"],
] as const;

/**
 * Returns an array of environment variable mocks with the specified prefix.
 *
 * @param envPrefix - The prefix to be added to each environment variable key.
 * @returns An array of environment variable mocks.
 */
export function getEnvMock(envPrefix: string) {
  return DEFAULT_ENV_MOCK.map(
    ([key, value]) => [`${envPrefix}${key}`, value] as const,
  );
}

/**
 * Returns an array of environment placeholders based on the provided environment prefix.
 *
 * @param envPrefix The prefix to be added to each environment key.
 * @returns An array of environment placeholders.
 */
export function getEnvPlaceholdersMock(
  envPrefix: string,
): `${typeof envPrefix}${(typeof DEFAULT_ENV_MOCK)[number][0]}`[] {
  return getEnvMock(envPrefix).map(([key]) => key);
}

/**
 * Returns an array of environment values from the mock data.
 *
 * @returns {Array<string>} An array of environment values.
 */
export function getEnvValuesMock() {
  return getEnvMock("").map(([, value]) => value);
}

/**
 * Generates a mock configuration string with the provided tokens.
 *
 * @param tokens - An array of tokens to be used in the configuration string.
 * @returns The generated mock configuration string.
 */
export function getConfigMock(tokens: string[]): string {
  return `
  @myorg:registry=https://somewhere-else.com/myorg
  //somewhere-else.com/myorg/:_authToken=${tokens[0]}
  @otherorg:registry=https://somewhere-else.com/otherorg
  //somewhere-else.com/otherorg/:_authToken=${tokens[1]}
  @fortawesome:registry=https://npm.fontawesome.com/
  //npm.fontawesome.com/:_authToken=${tokens[2]}
  `;
}

/**
 * Returns a mock configuration string with placeholders.
 *
 * @param envPrefix - The prefix for environment placeholders.
 * @returns The mock configuration string with placeholders.
 */
export function getConfigWithPlaceholdersMock(envPrefix: string): string {
  return getConfigMock(getEnvPlaceholdersMock(envPrefix));
}

/**
 * Returns a mock configuration with values.
 *
 * @returns {string} The mock configuration with values.
 */
export function getConfigWithValuesMock(): string {
  return getConfigMock(getEnvValuesMock());
}

/**
 * Returns a mock configuration string using ${VAR} shell-style placeholders.
 *
 * @returns The mock configuration string with shell curly placeholders.
 */
export function getConfigWithShellCurlyPlaceholdersMock(): string {
  return getConfigMock(getShellCurlyPlaceholdersMock());
}

/**
 * Returns an array of shell curly-style placeholders (e.g. ${TOKEN}).
 *
 * @returns An array of shell curly placeholders.
 */
export function getShellCurlyPlaceholdersMock(): string[] {
  return DEFAULT_ENV_MOCK.map(([key]) => `\${${key}}`);
}

/**
 * Returns a mock configuration string using $VAR shell-style placeholders.
 *
 * @returns The mock configuration string with shell dollar placeholders.
 */
export function getConfigWithShellDollarPlaceholdersMock(): string {
  return getConfigMock(getShellDollarPlaceholdersMock());
}

/**
 * Returns an array of shell dollar-style placeholders (e.g. $TOKEN).
 *
 * @returns An array of shell dollar placeholders.
 */
export function getShellDollarPlaceholdersMock(): string[] {
  return DEFAULT_ENV_MOCK.map(([key]) => `$${key}`);
}
