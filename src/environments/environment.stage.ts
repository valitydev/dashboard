import { DEFAULT_ENVIRONMENT } from './default-environment';
import { Environment } from './types/environment';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const environment: Environment = {
    ...DEFAULT_ENVIRONMENT,
    appConfigPath: '/appConfig.stage.json',
    authConfigPath: '/authConfig.stage.json',
    stage: true,
};
