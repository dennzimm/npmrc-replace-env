# npmrc-replace-env

**A utility for dynamically generating .npmrc files based on configuration and environment variables.**

Managing npm registry configurations and authentication tokens across different projects and environments can be cumbersome. This package aims to simplify this process by providing a utility that dynamically generates the `.npmrc` file based on a configuration file (`.npmrc.config`) and corresponding environment variables (`.env`).

This approach prioritizes security, preventing inadvertent exposure of sensitive information, like auth tokens in your `.npmrc` file, in version control systems.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Define Environment Variables in .env](#define-environment-variables-in-env)
- [Command Line Options](#command-line-options)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install npmrc-replace-env

yarn add npmrc-replace-env

pnpm add npmrc-replace-env
```

**Note**: While installing the package is an option, it's important to note that it's not required to use the utility. The utility can be invoked directly with npx without installing the package.

## Usage

Run the utility using npx:

```bash
npx npmrc-replace-env
```

This will generate a `.npmrc` file (or override any existing `.npmrc` files) based on the configuration provided in a file named `.npmrc.config`.

## Configuration

Create a file named `.npmrc.config` in the root of your project. This file should contain the configuration for your `.npmrc` file. The utility will replace placeholders in this configuration with corresponding environment variables.

Example `.npmrc.config`:

```plaintext
# .npmrc.config

# Custom registry for @myorg packages
@myorg:registry=https://somewhere-else.com/myorg
//somewhere-else.com/myorg/:_authToken=NPMRC_MYTOKEN1

# Custom registry for @another packages
@another:registry=https://somewhere-else.com/another
//somewhere-else.com/another/:_authToken=NPMRC_MYTOKEN2

# Custom registry for @fortawesome packages
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=NPMRC_FA_AUTH_TOKEN
```

In this example, the `.npmrc.config` file defines custom registries for @myorg, @another, and @fortawesome. The authentication tokens are provided as environment variables (`NPMRC_MYTOKEN1`, `NPMRC_MYTOKEN2`, and `NPMRC_FA_AUTH_TOKEN`), which will be replaced during the generation process.

It's important to add `.npmrc` to your `.gitignore` file to prevent accidentally committing sensitive information, such as authentication tokens. Ensure that your `.npmrc` file is listed in `.gitignore` to maintain the security of your project.

## Define Environment Variables in .env

Define environment variables in your `.env` file to be replaced during the generation process. Ensure that every placeholder and defined environment variable starts with `NPMRC_` to be loaded and replaced correctly.

Create a file named `.env` in the root of your project. This file will contain the environment variables used in your application. You can also create environment-specific files like `.env.local`, `.env.development`, `.env.development.local`, etc.

Example `.env` file:

```dotenv
NPMRC_MYTOKEN1=your_myorg_token_value
NPMRC_MYTOKEN2=your_another_token_value
NPMRC_FA_AUTH_TOKEN=your_fontawesome_token_value
```

**Note**: By default, the utility expects environment variables to begin with the prefix `NPMRC_`, as shown in the example above. This default behavior can be customized using command-line options. For more information on customizing the prefix for environment variables, refer to the [Command Line Options](#command-line-options) section below.

For more detailed configuration options and information about using `.env` files, refer to the [dotenv-flow documentation](https://www.npmjs.com/package/dotenv-flow).

## Command Line Options

The utility supports the following command-line options for customization:

| Option             | Alias | Description                                     | Default  |
| ------------------ | ----- | ----------------------------------------------- | -------- |
| `--prefix`         | `-p`  | Custom environment variable prefix              | `NPMRC_` |
| `--without-prefix` | `-w`  | Do not use any prefix for environment variables | `false`  |

These options provide flexibility in configuring environment variables and allow tailoring the utility to your specific needs.

**Note**: To display the help message for command-line options, use the `--help` or `-h` option when invoking the utility:

## Contributing

Contributions are welcome! If you encounter issues or have suggestions, please feel free to open an [issue](https://github.com/dennzimm/npmrc-replace-env/issues) or submit a [pull request](https://github.com/dennzimm/npmrc-replace-env/pulls).

This package uses [Changesets](https://github.com/changesets/changesets/tree/main) for version management. For further information on contributing and working with Changesets, refer to the Changesets Documentation: [Using Changesets](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
