import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-anapi-v2';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/anapi/v2` }),
        },
    ],
})
export class AnapiModule {}
