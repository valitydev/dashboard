import { getBaseClass } from '@dsh/utils';

export interface Config {
    apiEndpoint: string;
    urlShortenerEndpoint: string;
    checkoutEndpoint: string;
    docsEndpoints: {
        payments: string;
    };
    theme: {
        name: string;
    };
    sentryDsn?: string;
    keycloakEndpoint: string;
    fileStorageEndpoint: string;
}
export const BASE_CONFIG = getBaseClass<Config>();
