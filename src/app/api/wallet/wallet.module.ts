import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-wallet';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/wallet/v0` }),
        },
    ],
})
export class WalletModule {}
