# Dashboard

## Libraries

-   [Angular CLI](https://github.com/angular/angular-cli)
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)

## Guides

-   [Using typography](https://material.angular.io/guide/typography)
-   [Theming your components](https://material.angular.io/guide/theming-your-components)

## Installation

1. Add environment and configurations:

    - `src/appConfig.json`:

        ```json
        {
            "apiEndpoint": "https://api.xample.com",
            "urlShortenerEndpoint": "https://shrt.example.com",
            "checkoutEndpoint": "https://checkout.example.com",
            "docsEndpoints": {
                "payments": "https://example.com/docs"
            },
            "theme": {
                "name": "main"
            },
            "sentryDsn": "https://public@sentry.example.com/1",
            "keycloakEndpoint": "https://auth.example.com"
        }
        ```

    - `src/authConfig.json`:
        ```json
        {
            "realm": "external",
            "auth-server-url": "https://auth.example.com/auth/",
            "ssl-required": "external",
            "resource": "koffing",
            "public-client": true
        }
        ```

2. Install packages
    ```sh
    npm ci
    ```

## Development server

1. `npm start`

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
