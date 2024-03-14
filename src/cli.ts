#!/usr/bin/env node

import yargs from "yargs";
import { writeNpmrc } from ".";
import { DEFAULT_ENV_PREFIX } from "./constants/defaults.const";

const args = yargs(process.argv.slice(2))
  .option("prefix", {
    alias: "p",
    description: "Custom environment variable prefix",
    string: true,
    default: DEFAULT_ENV_PREFIX,
  })
  .option("without-prefix", {
    alias: "w",
    description: "Do not use any prefix for environment variables",
    boolean: true,
    default: false,
  })
  .help()
  .alias("help", "h")
  .parseSync();

writeNpmrc({
  envPrefix: args.withoutPrefix ? null : args.prefix,
});
