import * as file from "fs";
import {
  DEFAULT_CONFIG_FILE,
  DEFAULT_NPMRC_FILE,
} from "../constants/defaults.const";
import { generateNpmrc } from "./generate-npmrc.util";
import { getEnvKeysFromConfig } from "./get-env-from-config.util";
import { readConfig } from "./read-config.util";
import { transformEnvPrefix } from "./transform-env-prefix.util";

/**
 * Options for writing the .npmrc file.
 */
export interface WriteNpmrcOptions {
  /**
   * The prefix to be used for environment variables in the .npmrc file.
   */
  envPrefix?: string | null;
}

/**
 * Writes the npmrc file with the specified environment prefix.
 *
 * @param {WriteNpmrcOptions} options - The options for writing the npmrc file.
 * @returns {void}
 * @throws {Error} If there is an error writing to the npmrc file.
 */
export function writeNpmrc({ envPrefix }: WriteNpmrcOptions): void {
  const config = readConfig(DEFAULT_CONFIG_FILE);
  const envs = getEnvKeysFromConfig(config, transformEnvPrefix(envPrefix));
  const npmrc = generateNpmrc(config, envs);
  const lastModified = `# last modified: ${new Date().toISOString()}\n\n`;

  try {
    file.writeFileSync(DEFAULT_NPMRC_FILE, lastModified + npmrc);
  } catch (error) {
    throw new Error(
      `Error writing to ${DEFAULT_NPMRC_FILE} file: ${
        (error as Error).message ?? error
      }`
    );
  }
}
