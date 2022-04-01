import { NgModule } from '@angular/core';
import { Configuration as ClaimManagementConfiguration } from '@vality/swag-claim-management';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: ClaimManagementConfiguration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new ClaimManagementConfiguration({ basePath: `${configService.apiEndpoint}/claim-api/v1` }),
        },
    ],
})
export class ClaimManagementModule {}
