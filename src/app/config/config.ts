import { getBaseClass } from '@dsh/utils';

import type AppConfigJson from '../../appConfig.json';

interface AppConfig {
    apiEndpoint: string;
    urlShortenerEndpoint: string;
    checkoutEndpoint: string;
    docsEndpoints: {
        help: string;
        developer: string;
        rbk: string;
    };
    theme: {
        name: string;
    };
    sentryDsn?: string;
    keycloakEndpoint: string;
    fileStorageEndpoint: string;
}

export type Config = typeof AppConfigJson extends AppConfig ? AppConfig : never;
export const BASE_CONFIG = getBaseClass<Config>();
