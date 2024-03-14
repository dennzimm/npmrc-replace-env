import { DEFAULT_ENV_PREFIX } from "../constants/defaults.const";

/**
 * Transforms the environment prefix.
 * If the provided `envPrefix` is `null`, an empty string is returned.
 * If the provided `envPrefix` is `undefined`, the default environment prefix is returned.
 * Otherwise, the provided `envPrefix` is returned.
 *
 * @param envPrefix - The environment prefix to transform.
 * @returns The transformed environment prefix.
 */
export function transformEnvPrefix(
  envPrefix: string | null | undefined
): string {
  return envPrefix === null ? "" : envPrefix || DEFAULT_ENV_PREFIX;
}
