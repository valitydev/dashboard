import { Environment } from './types/environment';

export const DEFAULT_ENVIRONMENT: Environment = {
    production: false,
    stage: window.location.host.split('.')[1] === 'stage',
    appConfigPath: '/assets/appConfig.json',
    authConfigPath: '/assets/authConfig.json',
};
