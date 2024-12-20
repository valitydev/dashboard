import { Environment } from './types/environment';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DEFAULT_ENVIRONMENT: Environment = {
    production: false,
    stage: window.location.host.split('.')[1] === 'stage',
    appConfigPath: '/assets/appConfig.json',
    authConfigPath: '/assets/authConfig.json',
};
