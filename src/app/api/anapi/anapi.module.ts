import { NgModule } from '@angular/core';
import { Configuration as AnapiConfiguration } from '@vality/swag-anapi-v2/lib/configuration';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: AnapiConfiguration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new AnapiConfiguration({ basePath: `${configService.apiEndpoint}/anapi/v2` }),
        },
    ],
})
export class ClaimManagementModule {}
