import { NgModule } from '@angular/core';
import { Configuration } from '@vality/swag-organizations';

import { ConfigService } from '../../config';

@NgModule({
    providers: [
        {
            provide: Configuration,
            deps: [ConfigService],
            useFactory: (configService: ConfigService) =>
                new Configuration({ basePath: `${configService.apiEndpoint}/org/v1` }),
        },
    ],
})
export class NewOrganizationsModule {}
