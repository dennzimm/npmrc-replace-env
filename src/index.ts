import dotenvFlow from "dotenv-flow";

dotenvFlow.config({
  silent: true,
});

export { writeNpmrc, type WriteNpmrcOptions } from "./utils/write-npmrc.util";
