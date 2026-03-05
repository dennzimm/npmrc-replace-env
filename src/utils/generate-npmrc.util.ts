import { getEnvValue } from "./get-env-value.util";

function extractEnvKey(placeholder: string): string {
  if (placeholder.startsWith("${") && placeholder.endsWith("}")) {
    return placeholder.slice(2, -1);
  }
  if (placeholder.startsWith("$")) {
    return placeholder.slice(1);
  }
  return placeholder;
}

/**
 * Generates an npmrc file by replacing environment variables with their corresponding values.
 *
 * @param config - The original npmrc configuration.
 * @param envs - An array of environment variables to replace.
 * @returns The generated npmrc file with replaced environment variables.
 */
export function generateNpmrc(config: string, envs: string[]): string {
  let npmrc = config;

  envs.forEach((env) => {
    npmrc = npmrc.replaceAll(env, getEnvValue(extractEnvKey(env)));
  });

  return npmrc;
}
