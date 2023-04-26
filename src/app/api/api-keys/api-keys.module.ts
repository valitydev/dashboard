import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-api-keys';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/apikeys/v1` }),
        },
    ],
})
export class ApiKeysModule {}
