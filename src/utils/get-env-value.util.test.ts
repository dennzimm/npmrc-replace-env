import { getEnvValue } from "./get-env-value.util";

describe("getEnvValue", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return the value of an existing environment variable", () => {
    process.env.MY_VARIABLE = "my value";
    const result = getEnvValue("MY_VARIABLE");
    expect(result).toBe("my value");
  });

  it("should throw an error if the environment variable is not defined", () => {
    expect(() => {
      getEnvValue("UNDEFINED_VARIABLE");
    }).toThrow(
      `Environment variable UNDEFINED_VARIABLE is not defined. Please define it in your .env file or pass it as an environment variable.`
    );
  });

  it("should throw an error if the environment variable is empty", () => {
    process.env.EMPTY_VARIABLE = "";
    expect(() => {
      getEnvValue("EMPTY_VARIABLE");
    }).toThrow(
      "Environment variable EMPTY_VARIABLE is not defined. Please define it in your .env file or pass it as an environment variable."
    );
  });
});
