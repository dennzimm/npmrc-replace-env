/**
 * Retrieves environment variable keys from a configuration string.
 *
 * @param config - The configuration string to extract environment variable keys from.
 * @param envPrefix - Optional prefix for environment variable keys.
 * @returns An array of environment variable keys found in the configuration string.
 */
export function getEnvKeysFromConfig(config: string, envPrefix = ""): string[] {
  const prefixMatches =
    config.match(new RegExp(`(?<=[=/])${envPrefix}[A-Z0-9_]+`, "g")) || [];
  const curlyMatches = config.match(/\$\{[A-Z0-9_]+\}/g) || [];
  const dollarMatches = config.match(/\$[A-Z0-9_]+/g) || [];

  return Array.from(
    new Set([...prefixMatches, ...curlyMatches, ...dollarMatches]),
  );
}
