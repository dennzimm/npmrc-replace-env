import dotenvFlow from "dotenv-flow";

dotenvFlow.config({
  silent: true,
});

export { type WriteNpmrcOptions, writeNpmrc } from "./utils/write-npmrc.util";
