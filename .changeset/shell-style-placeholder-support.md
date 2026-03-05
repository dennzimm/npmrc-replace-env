---
"npmrc-replace-env": minor
---

Add support for shell-style placeholder syntax (`$VAR` and `${VAR}`) in `.npmrc.config` templates. Previously only prefix-based placeholders (e.g. `NPMRC_TOKEN`) were recognised. With this change, users can write `_authToken=${TOKEN}` and the tool will replace it with the value of the `TOKEN` environment variable — resolving the GitHub Actions compatibility issue where npm requires the `${VAR}` syntax for runtime env var expansion.
