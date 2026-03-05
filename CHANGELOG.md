# npmrc-replace-env

## 1.2.1

### Patch Changes

- c8849d3: fix: replace placeholders that appear inside URL paths in .npmrc.config

  Previously, the regex used a lookbehind requiring `=` to immediately precede a placeholder. This meant placeholders embedded in URL paths (e.g. `@myorg:registry=https://example.com/NPMRC_MY_ORG`) were silently skipped because the character before the placeholder was `/`, not `=`. The lookbehind is now broadened to `(?<=[=/])`, which covers both direct value assignments and URL path segments.

## 1.2.0

### Minor Changes

- a52b39f: Add support for shell-style placeholder syntax (`$VAR` and `${VAR}`) in `.npmrc.config` templates. Previously only prefix-based placeholders (e.g. `NPMRC_TOKEN`) were recognised. With this change, users can write `_authToken=${TOKEN}` and the tool will replace it with the value of the `TOKEN` environment variable — resolving the GitHub Actions compatibility issue where npm requires the `${VAR}` syntax for runtime env var expansion.

## 1.1.5

### Patch Changes

- b3db5eb: chore(deps): migrate to Vitest v4, bump yargs v18, Node 24 LTS
- 1a972ef: chore(deps-dev): upgrade @biomejs/biome to v2
- 2304a66: chore(deps-dev): bump @changesets/cli from 2.27.3 to 2.27.6

## 1.1.4

### Patch Changes

- 042c084: chore(deps): bump pnpm/action-setup from 3 to 4
- 5a7c108: chore(deps-dev): bump @types/node from 20.12.7 to 20.12.12
- add35ed: chore(deps-dev): bump @changesets/cli from 2.27.1 to 2.27.3
- f287f3a: chore(deps-dev): bump ts-jest from 29.1.2 to 29.1.3

## 1.1.3

### Patch Changes

- 35153ff: chore(deps-dev): bump typescript from 5.4.3 to 5.4.5
- f6f13af: chore(deps-dev): bump @types/node from 20.11.28 to 20.12.7

## 1.1.2

### Patch Changes

- 4e56835: Suppresses all kinds of warnings including ".env\*" files' loading errors from dotenv-flow

## 1.1.1

### Patch Changes

- 7c765d7: Add "Command Line Options" to TOC in README
- d9338fe: chore(deps-dev): bump @types/node from 20.11.27 to 20.11.28
- 4a66b5b: chore(deps-dev): bump typescript from 5.4.2 to 5.4.3

## 1.1.0

### Minor Changes

- 0b5737f: - Add utils with unit tests
  - Add command-line options for custom environment variable prefix and disabling prefix usage
  - Bump typescript, @types/node packages

## 1.0.3

### Patch Changes

- 580d9b2: Bump @types/node from 20.11.19 to 20.11.20
  Update contribution info for changesets

## 1.0.2

### Patch Changes

- Fix typo for keywords in package.json

## 1.0.1

### Patch Changes

- aebcf87: Update documentation & keywords

## 1.0.0

### Major Changes

- Version 1.0.0 marks the initial release of 'npmrc-replace-env,' introducing a utility for generating .npmrc files based on a configuration template and environment variables
