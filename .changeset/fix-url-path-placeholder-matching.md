---
"npmrc-replace-env": patch
---

fix: replace placeholders that appear inside URL paths in .npmrc.config

Previously, the regex used a lookbehind requiring `=` to immediately precede a placeholder. This meant placeholders embedded in URL paths (e.g. `@myorg:registry=https://example.com/NPMRC_MY_ORG`) were silently skipped because the character before the placeholder was `/`, not `=`. The lookbehind is now broadened to `(?<=[=/])`, which covers both direct value assignments and URL path segments.
