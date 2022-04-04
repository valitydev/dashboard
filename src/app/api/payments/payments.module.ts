import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-payments';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/v2` }),
        },
    ],
})
export class PaymentsModule {}
