import dotenvFlow from "dotenv-flow";
import * as file from "fs";

dotenvFlow.config();

const DEFAULT_NPMRC_FILE = ".npmrc" as const;
const DEFAULT_CONFIG_FILE = ".npmrc.config" as const;

function readConfig(): string {
  try {
    return file.readFileSync(DEFAULT_CONFIG_FILE).toString();
  } catch (err) {
    throw new Error(
      `Config file not found: ${DEFAULT_CONFIG_FILE}. Please create a file named ${DEFAULT_CONFIG_FILE}`
    );
  }
}

function getEnvKeysFromConfig(config: string): string[] {
  return Array.from(new Set(config.match(/NPMRC_[A-Z_]+/g) || []));
}

function getEnvValue(env: string): string {
  const value = process.env[env];

  if (!value) {
    throw new Error(
      `Environment variable ${env} is not defined. Please define it in your .env file or pass it as an environment variable.`
    );
  }

  return value;
}

function generateNpmrc(config: string, envs: string[]): string {
  let npmrc = config;

  envs.forEach((env) => {
    npmrc = npmrc.replace(new RegExp(env, "g"), getEnvValue(env));
  });

  return npmrc;
}

export function writeNpmrc(): void {
  const config = readConfig();
  const envs = getEnvKeysFromConfig(config);
  const npmrc = generateNpmrc(config, envs);
  const lastModified = `# last modified: ${new Date().toISOString()}\n\n`;

  try {
    file.writeFileSync(DEFAULT_NPMRC_FILE, lastModified + npmrc);
  } catch (error) {
    throw new Error(
      `Error writing to .npmrc file: ${(error as Error).message ?? error}`
    );
  }
}
