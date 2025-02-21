import { DEFAULT_ENVIRONMENT } from './default-environment';
import { Environment } from './types/environment';

export const environment: Environment = {
    ...DEFAULT_ENVIRONMENT,
    appConfigPath: '/appConfig.stage.json',
    authConfigPath: '/authConfig.stage.json',
    stage: true,
};
