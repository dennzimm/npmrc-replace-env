import { getEnvValue } from "./get-env-value.util";

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
    npmrc = npmrc.replace(new RegExp(env, "g"), getEnvValue(env));
  });

  return npmrc;
}
