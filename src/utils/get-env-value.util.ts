/**
 * Retrieves the value of the specified environment variable.
 * Throws an error if the environment variable is not defined.
 *
 * @param env - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is not defined.
 */
export function getEnvValue(env: string): string {
  const value = process.env[env];

  if (typeof value !== "string" || !value) {
    throw new Error(
      `Environment variable ${env} is not defined. Please define it in your .env file or pass it as an environment variable.`
    );
  }

  return value;
}
