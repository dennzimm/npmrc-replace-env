import * as file from "fs";

/**
 * Reads the contents of a configuration file.
 *
 * @param configFilePath - The path to the configuration file.
 * @returns The contents of the configuration file as a string.
 * @throws If the configuration file is not found.
 */
export function readConfig(configFilePath: string): string {
  try {
    return file.readFileSync(configFilePath).toString();
  } catch (err) {
    throw new Error(
      `Config file not found: ${configFilePath}. Please create a file named ${configFilePath}`
    );
  }
}
