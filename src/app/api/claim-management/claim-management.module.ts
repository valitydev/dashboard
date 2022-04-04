import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-claim-management';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/claim-api/v1` }),
        },
    ],
})
export class ClaimManagementModule {}
