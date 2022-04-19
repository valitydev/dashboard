# Dashboard

## Libraries

-   [Angular CLI](https://github.com/angular/angular-cli)
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)

## Initialization

### Install packages

```sh
npm ci
```

## Development server

-   API (Production API default)

    -   With mocks:

        Change `./src/appConfig.json` API endpoints

1. Start

    - Real Keycloak: `npm start`

    - Stub Keycloak

        1. Change `./src/authConfig.json` / `"auth-server-url"`:

        1. `npm run stub`

1. Navigate to `http://localhost:8000/`

## Production build

1. Run `npm run build`
1. The build artifacts will be stored in the `dist/` directory.

## Tests

-   Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Utils

### Analyze bundle size

```sh
npm run build -- --prod --stats-json --extraWebpackConfig webpack.extra.js
npx webpack-bundle-analyzer dist/stats.json
```

## Guides

-   [Using typography](https://material.angular.io/guide/typography)
-   [Theming your components](https://material.angular.io/guide/theming-your-components)
