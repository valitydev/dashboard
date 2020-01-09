import { Injectable } from '@angular/core';

import { ConfigService } from '../../config/config.service';
import { Configuration } from './swagger-codegen';

@Injectable()
export class AggrProxyConfigService extends Configuration {
    constructor({ apiEndpoint }: ConfigService) {
        super({ apiKeys: {}, basePath: `${apiEndpoint}/dark-api/v1` });
    }
}
