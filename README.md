# Dashboard

## Libraries

- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io/)
- [Prettier](https://prettier.io/)

## Guides

- [Using typography](https://material.angular.io/guide/typography)
- [Theming your components](https://material.angular.io/guide/theming-your-components)

## Installation

1. Add environment and configurations:

    - `src/.env`
    - `src/assets/appConfig.json`
    - `src/assets/authConfig.json`

You can copy from examples like this one: [`_appConfig.json`](./src/assets/_appConfig.json)

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

- Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
