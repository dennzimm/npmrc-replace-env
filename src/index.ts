import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export { writeNpmrc, type WriteNpmrcOptions } from "./utils/write-npmrc.util";
